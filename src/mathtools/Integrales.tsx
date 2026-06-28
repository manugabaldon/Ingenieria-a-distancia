/**
 * Integrales.tsx — Calculadora de integrales
 *
 *  · Integral indefinida (simbólica) con resultado en LaTeX
 *  · Integral definida (numérica, Simpson) con área sombreada
 *
 * Variable de integración: x.  Sintaxis mathjs:  ^  *  /  sin  cos
 * exp  sqrt  log (ln)  pi  e …
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { parse } from 'mathjs';
import { BlockMath, InlineMath } from '../components/Math';
import {
  integrateExpr,
  integrationSteps,
  definiteIntegral,
  evalDefiniteSymbolic,
  generateIntegralProblem,
} from './integrate';
import Practica from './Practica';

type Mode = 'indef' | 'def';

interface Example {
  label: string;
  expr: string;
  a?: string;
  b?: string;
}

const EXAMPLES: Example[] = [
  { label: 'x²', expr: 'x^2', a: '0', b: '2' },
  { label: '3x² + 2x − 5', expr: '3*x^2 + 2*x - 5', a: '0', b: '3' },
  { label: 'sin(x)', expr: 'sin(x)', a: '0', b: 'pi' },
  { label: 'cos(2x)', expr: 'cos(2*x)', a: '0', b: 'pi/4' },
  { label: 'eˣ', expr: 'exp(x)', a: '0', b: '1' },
  { label: '1/x', expr: '1/x', a: '1', b: 'e' },
  { label: '√x', expr: 'sqrt(x)', a: '0', b: '4' },
  { label: 'x·sin(x)*', expr: 'x*sin(x)', a: '0', b: 'pi' },
];

/** Formatea un número con precisión razonable. */
function fmt(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) !== 0 && (Math.abs(v) >= 1e6 || Math.abs(v) < 1e-4)) {
    return v.toExponential(5);
  }
  return parseFloat(v.toFixed(6)).toString();
}

/** Evalúa una expresión constante (a, b) que puede contener pi, e… */
function parseConst(s: string): number | null {
  try {
    const v = Number(parse(s).evaluate());
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/** Convierte la expresión del usuario a LaTeX para previsualizarla. */
function exprTex(expr: string): string | null {
  try {
    return parse(expr).toTex();
  } catch {
    return null;
  }
}

// ─── Gráfica (canvas) con área sombreada ────────────────────────────────────
function AreaPlot({
  expr,
  a,
  b,
  mode,
  areaValue,
}: {
  expr: string;
  a: number | null;
  b: number | null;
  mode: Mode;
  areaValue?: number | null;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    try {

    let f: (x: number) => number;
    try {
      const code = parse(expr).compile();
      f = (x: number) => Number(code.evaluate({ x }));
    } catch {
      ctx.fillStyle = '#aeaeb2';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Expresión no válida', W / 2, H / 2);
      return;
    }

    // Dominio horizontal: alrededor de [a, b] o un rango por defecto
    let xMin: number;
    let xMax: number;
    if (mode === 'def' && a != null && b != null) {
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const pad = Math.max((hi - lo) * 0.35, 1);
      xMin = lo - pad;
      xMax = hi + pad;
    } else {
      xMin = -6;
      xMax = 6;
    }

    // Muestreo y rango vertical
    const NS = 600;
    const xs: number[] = [];
    const ys: number[] = [];
    let yMin = Infinity;
    let yMax = -Infinity;
    for (let i = 0; i <= NS; i++) {
      const x = xMin + ((xMax - xMin) * i) / NS;
      const y = f(x);
      xs.push(x);
      ys.push(y);
      if (Number.isFinite(y)) {
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
      yMin = -1;
      yMax = 1;
    }
    if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
    }
    // Incluye y = 0 y añade margen
    yMin = Math.min(yMin, 0);
    yMax = Math.max(yMax, 0);
    const yPad = (yMax - yMin) * 0.12;
    yMin -= yPad;
    yMax += yPad;

    const PADL = 44;
    const PADB = 26;
    const PADT = 12;
    const PADR = 12;
    const plotW = W - PADL - PADR;
    const plotH = H - PADT - PADB;

    const sx = (x: number) => PADL + ((x - xMin) / (xMax - xMin)) * plotW;
    const sy = (y: number) => PADT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

    // Rejilla
    ctx.strokeStyle = 'rgba(148,163,184,0.18)';
    ctx.lineWidth = 1;
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#aeaeb2';
    for (let g = 0; g <= 6; g++) {
      const x = xMin + ((xMax - xMin) * g) / 6;
      const px = sx(x);
      ctx.beginPath();
      ctx.moveTo(px, PADT);
      ctx.lineTo(px, PADT + plotH);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillText(parseFloat(x.toFixed(2)).toString(), px, H - 10);
    }
    for (let g = 0; g <= 4; g++) {
      const y = yMin + ((yMax - yMin) * g) / 4;
      const py = sy(y);
      ctx.beginPath();
      ctx.moveTo(PADL, py);
      ctx.lineTo(PADL + plotW, py);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.fillText(parseFloat(y.toFixed(2)).toString(), PADL - 6, py + 3);
    }

    // Ejes (x=0, y=0) si quedan dentro
    ctx.strokeStyle = 'rgba(110,110,115,0.55)';
    ctx.lineWidth = 1.4;
    if (yMin < 0 && yMax > 0) {
      ctx.beginPath();
      ctx.moveTo(PADL, sy(0));
      ctx.lineTo(PADL + plotW, sy(0));
      ctx.stroke();
    }
    if (xMin < 0 && xMax > 0) {
      ctx.beginPath();
      ctx.moveTo(sx(0), PADT);
      ctx.lineTo(sx(0), PADT + plotH);
      ctx.stroke();
    }

    // Área sombreada [a, b]
    if (mode === 'def' && a != null && b != null) {
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      ctx.fillStyle = 'rgba(0,113,227,0.18)';
      ctx.beginPath();
      ctx.moveTo(sx(lo), sy(0));
      for (let i = 0; i <= NS; i++) {
        const x = xs[i];
        if (x < lo || x > hi) continue;
        const y = Number.isFinite(ys[i]) ? ys[i] : 0;
        ctx.lineTo(sx(x), sy(y));
      }
      ctx.lineTo(sx(hi), sy(0));
      ctx.closePath();
      ctx.fill();

      // Bordes verticales a y b
      ctx.strokeStyle = 'rgba(0,113,227,0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      for (const xv of [lo, hi]) {
        ctx.beginPath();
        ctx.moveTo(sx(xv), sy(0));
        ctx.lineTo(sx(xv), sy(f(xv)));
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Curva f(x)
    ctx.strokeStyle = '#0071e3';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= NS; i++) {
      const y = ys[i];
      if (!Number.isFinite(y) || Math.abs(y) > 1e6) {
        started = false;
        continue;
      }
      const px = sx(xs[i]);
      const py = sy(y);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Etiqueta del valor del área dentro de la región sombreada
    if (mode === 'def' && a != null && b != null && areaValue != null) {
      const cx = sx((Math.min(a, b) + Math.max(a, b)) / 2);
      const cy = sy(0);
      const label = `∫ = ${
        Math.abs(areaValue) >= 1e5 || (areaValue !== 0 && Math.abs(areaValue) < 1e-3)
          ? areaValue.toExponential(3)
          : parseFloat(areaValue.toFixed(4)).toString()
      }`;
      ctx.font = 'bold 13px Inter, sans-serif';
      const tw = ctx.measureText(label).width;
      const bx = Math.min(Math.max(cx, PADL + tw / 2 + 6), PADL + plotW - tw / 2 - 6);
      const by = Math.min(Math.max(cy, PADT + 22), PADT + plotH - 10);
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.fillRect(bx - tw / 2 - 6, by - 24, tw + 12, 20);
      ctx.fillStyle = '#0071e3';
      ctx.textAlign = 'center';
      ctx.fillText(label, bx, by - 9);
    }

    // Leyenda f(x)
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0071e3';
    ctx.fillRect(PADL + 6, PADT + 6, 16, 3);
    ctx.fillText('f(x)', PADL + 27, PADT + 13);

    } catch {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#aeaeb2';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No se pudo dibujar la gráfica', W / 2, H / 2);
    }
  }, [expr, a, b, mode, areaValue]);

  return <canvas ref={ref} width={620} height={340} className="integ-canvas" />;
}

// ─── Pasos de resolución ────────────────────────────────────────────────────
function StepsPanel({ steps }: { steps: ReturnType<typeof integrationSteps> }) {
  const [open, setOpen] = useState(false);

  if (!steps) return null;

  // Reglas únicas usadas (para el resumen)
  const usedRules = Array.from(
    new Map(steps.terms.map((t) => [t.rule.name, t.rule])).values()
  );

  return (
    <div className={`integ-steps${open ? ' open' : ''}`}>
      <button
        type="button"
        className="integ-steps-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="integ-steps-title">Pasos de resolución</span>
        <span className="integ-steps-arrow" aria-hidden="true">▾</span>
      </button>

      {!open ? null : (
        <div className="integ-steps-content">

      {steps.linearity && (
        <div className="integ-step">
          <span className="integ-step-badge">Linealidad</span>
          <div className="integ-step-body">
            <span className="integ-step-desc">
              La integral de una suma es la suma de las integrales; las
              constantes salen fuera. Integramos término a término:
            </span>
            <BlockMath>
              {'\\int \\sum_i a_i\\,f_i(x)\\,dx = \\sum_i a_i \\int f_i(x)\\,dx'}
            </BlockMath>
          </div>
        </div>
      )}

      {steps.terms.map((t, i) => (
        <div className="integ-step" key={i}>
          <span className="integ-step-num">{i + 1}</span>
          <div className="integ-step-body">
            <div className="integ-step-rule">
              <span className="integ-step-badge">{t.rule.name}</span>
              {t.chain && (
                <span className="integ-step-badge chain">Regla de la cadena</span>
              )}
            </div>
            <span className="integ-step-desc">Aplicando </span>
            <InlineMath>{t.rule.formula}</InlineMath>
            <BlockMath>{`\\int ${t.termTex}\\,dx = ${t.resultTex} + C`}</BlockMath>
          </div>
        </div>
      ))}

      {usedRules.length > 0 && (
        <div className="integ-step-summary">
          Reglas utilizadas:{' '}
          {usedRules.map((r) => r.name).join(' · ')}
        </div>
      )}

        </div>
      )}
    </div>
  );
}

export default function Integrales() {
  const [view, setView] = useState<'calc' | 'practica'>('calc');
  const [expr, setExpr] = useState('x^2');
  const [mode, setMode] = useState<Mode>('indef');
  const [aStr, setAStr] = useState('0');
  const [bStr, setBStr] = useState('2');

  const tex = useMemo(() => exprTex(expr), [expr]);
  const symbolic = useMemo(() => integrateExpr(expr), [expr]);
  const steps = useMemo(() => integrationSteps(expr), [expr]);

  const a = useMemo(() => parseConst(aStr), [aStr]);
  const b = useMemo(() => parseConst(bStr), [bStr]);

  const numeric = useMemo(() => {
    if (mode !== 'def' || a == null || b == null) return null;
    return definiteIntegral(expr, a, b);
  }, [expr, a, b, mode]);

  const exact = useMemo(() => {
    if (mode !== 'def' || a == null || b == null || !symbolic) return null;
    return evalDefiniteSymbolic(symbolic.raw, a, b);
  }, [symbolic, a, b, mode]);

  return (
    <div className="mathtool">
      <div className="mathtool-tabs">
        <button
          className={`mathtool-tab ${view === 'calc' ? 'active' : ''}`}
          onClick={() => setView('calc')}
        >
          🧮 Calculadora
        </button>
        <button
          className={`mathtool-tab ${view === 'practica' ? 'active' : ''}`}
          onClick={() => setView('practica')}
        >
          🎯 Practica
        </button>
      </div>

      {view === 'practica' ? (
        <Practica kind="integral" generate={generateIntegralProblem} />
      ) : (
    <div className="integ-wrap">
      {/* ── Entrada ── */}
      <div className="integ-card">
        <div className="integ-field">
          <label className="integ-label">Función f(x)</label>
          <div className="integ-input-row">
            <span className="integ-prefix">∫</span>
            <input
              className="integ-input"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              spellCheck={false}
              placeholder="p. ej. 3*x^2 + 2*x - 5"
            />
            <span className="integ-suffix">dx</span>
          </div>
          {tex ? (
            <div className="integ-preview">
              <InlineMath>{`f(x) = ${tex}`}</InlineMath>
            </div>
          ) : (
            <div className="integ-error">Expresión no válida</div>
          )}
        </div>

        {/* Ejemplos */}
        <div className="integ-examples">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              className="integ-chip"
              onClick={() => {
                setExpr(ex.expr);
                if (ex.a) setAStr(ex.a);
                if (ex.b) setBStr(ex.b);
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Modo */}
        <div className="integ-modes">
          <button
            className={`integ-mode-btn ${mode === 'indef' ? 'active' : ''}`}
            onClick={() => setMode('indef')}
          >
            Integral indefinida
          </button>
          <button
            className={`integ-mode-btn ${mode === 'def' ? 'active' : ''}`}
            onClick={() => setMode('def')}
          >
            Integral definida
          </button>
        </div>

        {mode === 'def' && (
          <div className="integ-limits">
            <div className="integ-field">
              <label className="integ-label">Límite inferior a</label>
              <input
                className="integ-input small"
                value={aStr}
                onChange={(e) => setAStr(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className="integ-field">
              <label className="integ-label">Límite superior b</label>
              <input
                className="integ-input small"
                value={bStr}
                onChange={(e) => setBStr(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Resultado ── */}
      <div className="integ-card">
        {mode === 'indef' ? (
          <>
            <div className="integ-result-title">Integral indefinida</div>
            {symbolic ? (
              <>
                <BlockMath>{`\\int ${tex ?? 'f(x)'}\\,dx = ${symbolic.tex} + C`}</BlockMath>
                <StepsPanel steps={steps} />
              </>
            ) : (
              <div className="integ-note warn">
                No se ha podido resolver simbólicamente esta integral.
                Prueba con la <strong>integral definida</strong> (resolución
                numérica) o revisa la sintaxis.
              </div>
            )}
            <div className="integ-note">
              Variable de integración: <code>x</code>. Usa <code>^</code> para
              potencias, <code>*</code> para productos y funciones como{' '}
              <code>sin</code>, <code>cos</code>, <code>exp</code>,{' '}
              <code>sqrt</code>, <code>log</code> (logaritmo natural).
            </div>
          </>
        ) : (
          <>
            <div className="integ-result-title">Integral definida</div>
            {a == null || b == null ? (
              <div className="integ-note warn">
                Introduce límites válidos (puedes usar <code>pi</code>,{' '}
                <code>e</code>, fracciones…).
              </div>
            ) : (
              <>
                <BlockMath>
                  {`\\int_{${parse(aStr).toTex()}}^{${parse(bStr).toTex()}} ${
                    tex ?? 'f(x)'
                  }\\,dx ${
                    exact != null
                      ? `= ${symbolic ? symbolic.tex : ''}\\Big|_{${parse(
                          aStr
                        ).toTex()}}^{${parse(bStr).toTex()}}`
                      : ''
                  }`}
                </BlockMath>

                <div className="integ-values">
                  {exact != null && (
                    <div className="integ-value-row exact">
                      <span className="integ-value-label">
                        Resultado exacto (primitiva)
                      </span>
                      <span className="integ-value-num">{fmt(exact)}</span>
                    </div>
                  )}
                  <div className="integ-value-row">
                    <span className="integ-value-label">
                      Resultado numérico (Simpson)
                    </span>
                    <span className="integ-value-num">
                      {numeric != null ? fmt(numeric) : '—'}
                    </span>
                  </div>
                </div>

                <div className="integ-note">
                  El valor representa el <strong>área neta con signo</strong>{' '}
                  entre la curva y el eje X en [a, b]. La región sombreada en la
                  gráfica corresponde a esta integral.
                </div>

                {steps && (
                  <>
                    <div className="integ-note">
                      Por el <strong>Teorema Fundamental del Cálculo</strong>,
                      primero hallamos la primitiva y luego evaluamos{' '}
                      <InlineMath>{'F(b) - F(a)'}</InlineMath>:
                    </div>
                    <StepsPanel steps={steps} />
                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="integ-plot">
          <AreaPlot
            expr={expr}
            a={a}
            b={b}
            mode={mode}
            areaValue={mode === 'def' ? exact ?? numeric : null}
          />
        </div>
      </div>
    </div>
      )}
    </div>
  );
}
