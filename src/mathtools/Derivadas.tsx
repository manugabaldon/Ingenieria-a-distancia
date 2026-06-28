/**
 * Derivadas.tsx — Calculadora de derivadas
 *
 *  · Derivada simbólica f'(x) con resultado en LaTeX y pasos
 *  · Derivada en un punto f'(x₀) con recta tangente
 *
 * Variable: x. Sintaxis mathjs: ^ * / sin cos exp sqrt log (ln) pi e …
 * Reutiliza los estilos .integ-* de la calculadora de integrales.
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { parse } from 'mathjs';
import { BlockMath, InlineMath } from '../components/Math';
import { derivativeExpr, evalAt, derivativeSteps } from './derivate';

type Mode = 'simbolica' | 'punto';

interface Example {
  label: string;
  expr: string;
  x0?: string;
}

const EXAMPLES: Example[] = [
  { label: 'x³', expr: 'x^3', x0: '2' },
  { label: '3x² + 2x − 5', expr: '3*x^2 + 2*x - 5', x0: '1' },
  { label: 'sin(x)', expr: 'sin(x)', x0: '0' },
  { label: 'cos(2x)', expr: 'cos(2*x)', x0: 'pi/4' },
  { label: 'eˣ', expr: 'exp(x)', x0: '0' },
  { label: 'ln(x)', expr: 'log(x)', x0: '1' },
  { label: 'x·sin(x)', expr: 'x*sin(x)', x0: 'pi/2' },
  { label: 'x²/(x+1)', expr: 'x^2/(x+1)', x0: '1' },
];

function fmt(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) !== 0 && (Math.abs(v) >= 1e6 || Math.abs(v) < 1e-4)) {
    return v.toExponential(5);
  }
  return parseFloat(v.toFixed(6)).toString();
}

function parseConst(s: string): number | null {
  try {
    const v = Number(parse(s).evaluate());
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

function exprTex(expr: string): string | null {
  try {
    return parse(expr).toTex();
  } catch {
    return null;
  }
}

// ─── Gráfica (canvas): f(x), f'(x) y recta tangente ─────────────────────────
function DerivPlot({
  expr,
  derivRaw,
  mode,
  x0,
}: {
  expr: string;
  derivRaw: string | null;
  mode: Mode;
  x0: number | null;
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

      // f'(x): simbólica si la hay, si no diferencia central numérica
      let fp: (x: number) => number;
      if (derivRaw) {
        try {
          const dc = parse(derivRaw).compile();
          fp = (x: number) => Number(dc.evaluate({ x }));
        } catch {
          fp = (x: number) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;
        }
      } else {
        fp = (x: number) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;
      }

      let xMin: number;
      let xMax: number;
      if (mode === 'punto' && x0 != null) {
        xMin = x0 - 4;
        xMax = x0 + 4;
      } else {
        xMin = -6;
        xMax = 6;
      }

      const NS = 600;
      const xs: number[] = [];
      const ys: number[] = [];
      const yps: number[] = [];
      let yMin = Infinity;
      let yMax = -Infinity;
      const track = (v: number) => {
        if (Number.isFinite(v) && Math.abs(v) < 1e6) {
          if (v < yMin) yMin = v;
          if (v > yMax) yMax = v;
        }
      };
      for (let i = 0; i <= NS; i++) {
        const x = xMin + ((xMax - xMin) * i) / NS;
        const y = f(x);
        const yp = fp(x);
        xs.push(x);
        ys.push(y);
        yps.push(yp);
        track(y);
        track(yp);
      }
      if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
        yMin = -1;
        yMax = 1;
      }
      if (yMin === yMax) {
        yMin -= 1;
        yMax += 1;
      }
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

      // Ejes
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

      const drawCurve = (data: number[], color: string, width: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= NS; i++) {
          const y = data[i];
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
      };

      // f'(x) detrás, f(x) delante
      drawCurve(yps, '#f59e0b', 1.8);
      drawCurve(ys, '#0071e3', 2.2);

      // Recta tangente en x0
      if (mode === 'punto' && x0 != null) {
        const y0 = f(x0);
        const m = fp(x0);
        if (Number.isFinite(y0) && Number.isFinite(m)) {
          const tan = (x: number) => y0 + m * (x - x0);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(sx(xMin), sy(tan(xMin)));
          ctx.lineTo(sx(xMax), sy(tan(xMax)));
          ctx.stroke();
          ctx.setLineDash([]);
          // Punto de tangencia
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(sx(x0), sy(y0), 4.5, 0, Math.PI * 2);
          ctx.fill();
          // Pendiente
          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.fillStyle = '#0a7a55';
          ctx.textAlign = 'left';
          const lx = Math.min(sx(x0) + 8, PADL + plotW - 90);
          const ly = Math.max(sy(y0) - 8, PADT + 14);
          ctx.fillText(`m = ${parseFloat(m.toFixed(3))}`, lx, ly);
        }
      }

      // Leyenda
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0071e3';
      ctx.fillRect(PADL + 6, PADT + 6, 16, 3);
      ctx.fillText('f(x)', PADL + 27, PADT + 13);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(PADL + 70, PADT + 6, 16, 3);
      ctx.fillText("f'(x)", PADL + 91, PADT + 13);
    } catch {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#aeaeb2';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No se pudo dibujar la gráfica', W / 2, H / 2);
    }
  }, [expr, derivRaw, mode, x0]);

  return <canvas ref={ref} width={620} height={340} className="integ-canvas" />;
}

// ─── Pasos de resolución (plegable) ─────────────────────────────────────────
function StepsPanel({ steps }: { steps: ReturnType<typeof derivativeSteps> }) {
  const [open, setOpen] = useState(false);
  if (!steps) return null;

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

      {open && (
        <div className="integ-steps-content">
          {steps.linearity && (
            <div className="integ-step">
              <span className="integ-step-badge">Linealidad</span>
              <div className="integ-step-body">
                <span className="integ-step-desc">
                  La derivada de una suma es la suma de las derivadas; las
                  constantes multiplicativas se mantienen. Derivamos término a término:
                </span>
                <BlockMath>{"\\frac{d}{dx}\\sum_i a_i\\,f_i(x) = \\sum_i a_i\\,f_i'(x)"}</BlockMath>
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
                {t.rule.formula && (
                  <>
                    <span className="integ-step-desc">Aplicando </span>
                    <InlineMath>{t.rule.formula}</InlineMath>
                  </>
                )}
                <BlockMath>{`\\frac{d}{dx}\\left[${t.termTex}\\right] = ${t.resultTex}`}</BlockMath>
              </div>
            </div>
          ))}

          {usedRules.length > 0 && (
            <div className="integ-step-summary">
              Reglas utilizadas: {usedRules.map((r) => r.name).join(' · ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Derivadas() {
  const [expr, setExpr] = useState('x^3');
  const [mode, setMode] = useState<Mode>('simbolica');
  const [x0Str, setX0Str] = useState('2');

  const tex = useMemo(() => exprTex(expr), [expr]);
  const symbolic = useMemo(() => derivativeExpr(expr), [expr]);
  const steps = useMemo(() => derivativeSteps(expr), [expr]);

  const x0 = useMemo(() => parseConst(x0Str), [x0Str]);

  const slope = useMemo(() => {
    if (mode !== 'punto' || x0 == null || !symbolic) return null;
    return evalAt(symbolic.raw, x0);
  }, [symbolic, x0, mode]);

  const fx0 = useMemo(() => {
    if (mode !== 'punto' || x0 == null) return null;
    return evalAt(expr, x0);
  }, [expr, x0, mode]);

  return (
    <div className="integ-wrap">
      {/* ── Entrada ── */}
      <div className="integ-card">
        <div className="integ-field">
          <label className="integ-label">Función f(x)</label>
          <div className="integ-input-row">
            <span className="integ-prefix" style={{ fontSize: '1.1rem' }}>d⁄dx</span>
            <input
              className="integ-input"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              spellCheck={false}
              placeholder="p. ej. 3*x^2 + 2*x - 5"
            />
          </div>
          {tex ? (
            <div className="integ-preview">
              <InlineMath>{`f(x) = ${tex}`}</InlineMath>
            </div>
          ) : (
            <div className="integ-error">Expresión no válida</div>
          )}
        </div>

        <div className="integ-examples">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              className="integ-chip"
              onClick={() => {
                setExpr(ex.expr);
                if (ex.x0) setX0Str(ex.x0);
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="integ-modes">
          <button
            className={`integ-mode-btn ${mode === 'simbolica' ? 'active' : ''}`}
            onClick={() => setMode('simbolica')}
          >
            Derivada f′(x)
          </button>
          <button
            className={`integ-mode-btn ${mode === 'punto' ? 'active' : ''}`}
            onClick={() => setMode('punto')}
          >
            Derivada en un punto
          </button>
        </div>

        {mode === 'punto' && (
          <div className="integ-field">
            <label className="integ-label">Punto x₀</label>
            <input
              className="integ-input small"
              value={x0Str}
              onChange={(e) => setX0Str(e.target.value)}
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* ── Resultado ── */}
      <div className="integ-card">
        {mode === 'simbolica' ? (
          <>
            <div className="integ-result-title">Derivada</div>
            {symbolic ? (
              <>
                <BlockMath>{`\\frac{d}{dx}\\left[${tex ?? 'f(x)'}\\right] = ${symbolic.tex}`}</BlockMath>
                <StepsPanel steps={steps} />
              </>
            ) : (
              <div className="integ-note warn">
                No se ha podido derivar esta expresión. Revisa la sintaxis.
              </div>
            )}
            <div className="integ-note">
              Variable: <code>x</code>. Usa <code>^</code> para potencias,{' '}
              <code>*</code> para productos y funciones como <code>sin</code>,{' '}
              <code>cos</code>, <code>exp</code>, <code>sqrt</code>,{' '}
              <code>log</code> (logaritmo natural).
            </div>
          </>
        ) : (
          <>
            <div className="integ-result-title">Derivada en un punto</div>
            {x0 == null ? (
              <div className="integ-note warn">
                Introduce un punto válido (puedes usar <code>pi</code>,{' '}
                <code>e</code>, fracciones…).
              </div>
            ) : (
              <>
                <BlockMath>
                  {`f'(${parse(x0Str).toTex()}) = ${
                    symbolic ? symbolic.tex : "f'(x)"
                  }\\Big|_{x=${parse(x0Str).toTex()}}`}
                </BlockMath>

                <div className="integ-values">
                  <div className="integ-value-row exact">
                    <span className="integ-value-label">
                      Pendiente de la tangente f′(x₀)
                    </span>
                    <span className="integ-value-num">
                      {slope != null ? fmt(slope) : '—'}
                    </span>
                  </div>
                  {fx0 != null && slope != null && (
                    <div className="integ-value-row">
                      <span className="integ-value-label">Recta tangente</span>
                      <span className="integ-value-num" style={{ fontSize: '0.95rem' }}>
                        y = {fmt(slope)}·(x − {fmt(x0)}) + {fmt(fx0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="integ-note">
                  La derivada en un punto es la <strong>pendiente de la recta
                  tangente</strong> a la curva en ese punto (la línea verde
                  discontinua de la gráfica).
                </div>
              </>
            )}
          </>
        )}

        <div className="integ-plot">
          <DerivPlot expr={expr} derivRaw={symbolic?.raw ?? null} mode={mode} x0={x0} />
        </div>
      </div>
    </div>
  );
}
