/**
 * Funciones.tsx — Representación y análisis de funciones
 *
 *  · Dibuja una o varias funciones f(x) en un rango ajustable
 *  · Análisis de la función principal: raíces, máximos/mínimos, corte con eje Y
 *  · Opción de superponer la derivada f'(x)
 *
 * Reutiliza los estilos .integ-* de las demás calculadoras.
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import { parse } from 'mathjs';
import {
  compileExpr,
  derivativeFn,
  findRoots,
  findExtrema,
  type Fn,
  type Extremum,
} from './analyze';

const COLORS = ['#0071e3', '#f59e0b', '#10b981', '#8b5cf6'];

interface FnEntry {
  expr: string;
  color: string;
}

interface Preset {
  label: string;
  expr: string;
  min: string;
  max: string;
}

const PRESETS: Preset[] = [
  { label: 'x² − 2', expr: 'x^2 - 2', min: '-5', max: '5' },
  { label: 'x³ − 3x', expr: 'x^3 - 3*x', min: '-3', max: '3' },
  { label: 'x³ − 3x² + 2', expr: 'x^3 - 3*x^2 + 2', min: '-2', max: '4' },
  { label: 'sin(x)', expr: 'sin(x)', min: '-6.5', max: '6.5' },
  { label: '1/x', expr: '1/x', min: '-6', max: '6' },
  { label: 'e^(−x²)', expr: 'exp(-x^2)', min: '-4', max: '4' },
];

function fmt(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) !== 0 && (Math.abs(v) >= 1e5 || Math.abs(v) < 1e-4)) {
    return v.toExponential(3);
  }
  return parseFloat(v.toFixed(4)).toString();
}

function parseNum(s: string): number | null {
  try {
    const v = Number(parse(s).evaluate());
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

// ─── Gráfica ────────────────────────────────────────────────────────────────
function Plot({
  fns,
  xMin,
  xMax,
  showDeriv,
  showAnalysis,
  roots,
  extrema,
}: {
  fns: { f: Fn; color: string }[];
  xMin: number;
  xMax: number;
  showDeriv: boolean;
  showAnalysis: boolean;
  roots: number[];
  extrema: Extremum[];
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
      if (!fns.length || !(xMax > xMin)) {
        ctx.fillStyle = '#aeaeb2';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Introduce una función y un rango válidos', W / 2, H / 2);
        return;
      }

      const primary = fns[0].f;
      const fp = showDeriv ? derivativeFn0(primary) : null;

      const NS = 700;
      const samples = fns.map((s) => {
        const ys: number[] = [];
        for (let i = 0; i <= NS; i++) {
          const x = xMin + ((xMax - xMin) * i) / NS;
          ys.push(s.f(x));
        }
        return ys;
      });
      const derivYs: number[] = [];
      if (fp) {
        for (let i = 0; i <= NS; i++) {
          const x = xMin + ((xMax - xMin) * i) / NS;
          derivYs.push(fp(x));
        }
      }

      let yMin = Infinity;
      let yMax = -Infinity;
      const track = (v: number) => {
        if (Number.isFinite(v) && Math.abs(v) < 1e6) {
          if (v < yMin) yMin = v;
          if (v > yMax) yMax = v;
        }
      };
      samples.forEach((ys) => ys.forEach(track));
      derivYs.forEach(track);
      extrema.forEach((e) => track(e.y));
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
      const pad = (yMax - yMin) * 0.12;
      yMin -= pad;
      yMax += pad;

      const PADL = 46;
      const PADB = 26;
      const PADT = 12;
      const PADR = 12;
      const plotW = W - PADL - PADR;
      const plotH = H - PADT - PADB;
      const sx = (x: number) => PADL + ((x - xMin) / (xMax - xMin)) * plotW;
      const sy = (y: number) => PADT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

      // Rejilla + etiquetas
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

      const drawCurve = (ys: number[], color: string, width: number, dash: number[] = []) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= NS; i++) {
          const y = ys[i];
          if (!Number.isFinite(y) || Math.abs(y) > 1e6) {
            started = false;
            continue;
          }
          const px = sx(xMin + ((xMax - xMin) * i) / NS);
          const py = sy(y);
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      if (fp) drawCurve(derivYs, '#94a3b8', 1.6, [5, 4]);
      samples.forEach((ys, i) => drawCurve(ys, fns[i].color, 2.2));

      // Marcadores de análisis (solo función principal)
      if (showAnalysis) {
        // Raíces
        ctx.fillStyle = '#0071e3';
        roots.forEach((r) => {
          ctx.beginPath();
          ctx.arc(sx(r), sy(0), 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#0071e3';
          ctx.stroke();
        });
        // Extremos
        extrema.forEach((e) => {
          ctx.beginPath();
          ctx.arc(sx(e.x), sy(e.y), 4.5, 0, Math.PI * 2);
          ctx.fillStyle = e.kind === 'max' ? '#e24b4a' : '#1d9e75';
          ctx.fill();
        });
      }

      // Leyenda
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      let lx = PADL + 6;
      const ly = PADT + 13;
      fns.forEach((s, i) => {
        ctx.fillStyle = s.color;
        ctx.fillRect(lx, PADT + 6, 16, 3);
        const label = `f${fns.length > 1 ? (i + 1) : ''}(x)`;
        ctx.fillText(label, lx + 21, ly);
        lx += 21 + ctx.measureText(label).width + 16;
      });
      if (fp) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(lx, PADT + 6, 16, 3);
        ctx.fillText("f'(x)", lx + 21, ly);
      }
    } catch {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#aeaeb2';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No se pudo dibujar la gráfica', W / 2, H / 2);
    }
  }, [fns, xMin, xMax, showDeriv, showAnalysis, roots, extrema]);

  return <canvas ref={ref} width={620} height={360} className="integ-canvas" />;
}

// Derivada numérica de respaldo para el dibujo (cuando solo tenemos f)
function derivativeFn0(f: Fn): Fn {
  return (x: number) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;
}

export default function Funciones() {
  const [fnList, setFnList] = useState<FnEntry[]>([{ expr: 'x^3 - 3*x', color: COLORS[0] }]);
  const [xMinStr, setXMinStr] = useState('-3');
  const [xMaxStr, setXMaxStr] = useState('3');
  const [showDeriv, setShowDeriv] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);

  const xMin = useMemo(() => parseNum(xMinStr), [xMinStr]);
  const xMax = useMemo(() => parseNum(xMaxStr), [xMaxStr]);

  // Funciones compiladas (válidas)
  const compiled = useMemo(
    () =>
      fnList
        .map((e) => ({ entry: e, f: compileExpr(e.expr) }))
        .filter((c): c is { entry: FnEntry; f: Fn } => c.f !== null)
        .map((c) => ({ f: c.f, color: c.entry.color })),
    [fnList]
  );

  // Análisis de la función principal
  const analysis = useMemo(() => {
    const primaryExpr = fnList[0]?.expr;
    if (!primaryExpr || xMin == null || xMax == null || !(xMax > xMin)) return null;
    const f = compileExpr(primaryExpr);
    if (!f) return null;
    const fp = derivativeFn(primaryExpr) ?? derivativeFn0(f);
    const roots = findRoots(f, xMin, xMax);
    const extrema = findExtrema(f, fp, xMin, xMax);
    const yInt = xMin <= 0 && xMax >= 0 ? f(0) : null;
    return { roots, extrema, yInt: Number.isFinite(yInt as number) ? (yInt as number) : null };
  }, [fnList, xMin, xMax]);

  const updateExpr = (i: number, value: string) => {
    setFnList((list) => list.map((e, idx) => (idx === i ? { ...e, expr: value } : e)));
  };
  const addFn = () => {
    setFnList((list) =>
      list.length >= COLORS.length ? list : [...list, { expr: '', color: COLORS[list.length] }]
    );
  };
  const removeFn = (i: number) => {
    setFnList((list) => (list.length <= 1 ? list : list.filter((_, idx) => idx !== i)));
  };

  return (
    <div className="integ-wrap">
      {/* ── Entrada ── */}
      <div className="integ-card">
        <label className="integ-label">Funciones f(x)</label>
        {fnList.map((e, i) => (
          <div key={i} className="fn-row">
            <span className="fn-swatch" style={{ background: e.color }} />
            <input
              className="integ-input fn-input"
              value={e.expr}
              onChange={(ev) => updateExpr(i, ev.target.value)}
              spellCheck={false}
              placeholder="p. ej. x^3 - 3*x"
            />
            {fnList.length > 1 && (
              <button className="fn-remove" onClick={() => removeFn(i)} aria-label="Quitar función">
                ✕
              </button>
            )}
          </div>
        ))}
        {fnList.length < COLORS.length && (
          <button className="fn-add" onClick={addFn}>+ Añadir función</button>
        )}

        <div className="integ-limits" style={{ marginTop: '1rem' }}>
          <div className="integ-field">
            <label className="integ-label">x mínimo</label>
            <input className="integ-input small" value={xMinStr}
              onChange={(e) => setXMinStr(e.target.value)} spellCheck={false} />
          </div>
          <div className="integ-field">
            <label className="integ-label">x máximo</label>
            <input className="integ-input small" value={xMaxStr}
              onChange={(e) => setXMaxStr(e.target.value)} spellCheck={false} />
          </div>
        </div>

        <div className="integ-modes" style={{ marginTop: '1rem' }}>
          <button
            className={`integ-mode-btn ${showAnalysis ? 'active' : ''}`}
            onClick={() => setShowAnalysis((s) => !s)}
          >
            Análisis
          </button>
          <button
            className={`integ-mode-btn ${showDeriv ? 'active' : ''}`}
            onClick={() => setShowDeriv((s) => !s)}
          >
            Mostrar f′(x)
          </button>
        </div>

        <div className="integ-examples" style={{ marginTop: '1rem' }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              className="integ-chip"
              onClick={() => {
                setFnList([{ expr: p.expr, color: COLORS[0] }]);
                setXMinStr(p.min);
                setXMaxStr(p.max);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Resultado ── */}
      <div className="integ-card">
        <div className="integ-result-title">Análisis de la función</div>

        {!analysis ? (
          <div className="integ-note warn">
            Introduce una función y un rango válidos (x máximo &gt; x mínimo).
          </div>
        ) : (
          <>
            {showAnalysis && (
              <div className="integ-values">
                <div className="integ-value-row">
                  <span className="integ-value-label">
                    Raíces (f(x) = 0) <span style={{ color: 'var(--blue)' }}>●</span>
                  </span>
                  <span className="integ-value-num" style={{ fontSize: '0.9rem' }}>
                    {analysis.roots.length
                      ? analysis.roots.map((r) => fmt(r)).join(',  ')
                      : 'ninguna en el rango'}
                  </span>
                </div>

                {analysis.extrema.filter((e) => e.kind === 'max').length > 0 && (
                  <div className="integ-value-row">
                    <span className="integ-value-label">
                      Máximos <span style={{ color: '#e24b4a' }}>●</span>
                    </span>
                    <span className="integ-value-num" style={{ fontSize: '0.9rem' }}>
                      {analysis.extrema.filter((e) => e.kind === 'max')
                        .map((e) => `(${fmt(e.x)}, ${fmt(e.y)})`).join('  ')}
                    </span>
                  </div>
                )}

                {analysis.extrema.filter((e) => e.kind === 'min').length > 0 && (
                  <div className="integ-value-row">
                    <span className="integ-value-label">
                      Mínimos <span style={{ color: '#1d9e75' }}>●</span>
                    </span>
                    <span className="integ-value-num" style={{ fontSize: '0.9rem' }}>
                      {analysis.extrema.filter((e) => e.kind === 'min')
                        .map((e) => `(${fmt(e.x)}, ${fmt(e.y)})`).join('  ')}
                    </span>
                  </div>
                )}

                {analysis.yInt != null && (
                  <div className="integ-value-row">
                    <span className="integ-value-label">Corte con eje Y</span>
                    <span className="integ-value-num" style={{ fontSize: '0.9rem' }}>
                      (0, {fmt(analysis.yInt)})
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="integ-note">
              El análisis (raíces, máximos y mínimos) se calcula numéricamente
              sobre la <strong>primera función</strong> en el rango mostrado.
              Amplía o reduce el rango para localizar más puntos.
            </div>
          </>
        )}

        <div className="integ-plot">
          <Plot
            fns={compiled}
            xMin={xMin ?? -6}
            xMax={xMax ?? 6}
            showDeriv={showDeriv}
            showAnalysis={showAnalysis}
            roots={analysis?.roots ?? []}
            extrema={analysis?.extrema ?? []}
          />
        </div>
      </div>
    </div>
  );
}
