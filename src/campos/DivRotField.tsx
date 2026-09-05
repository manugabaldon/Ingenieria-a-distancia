/**
 * DivRotField.tsx — Visualizador de divergencia y rotacional (Campos y Ondas · Tema 1)
 *
 * Entrada tipo calculadora Ax(x,y), Ay(x,y) + 10 campos de ejemplo. Vista 2D con
 * mapa de color de ∇·A o (∇×A)_z, campo de flechas de A, sonda arrastrable que
 * lee ambos operadores en el punto, y partículas de flujo opcionales.
 *
 * Derivadas: analíticas con math.derivative (+ simplify) y, si no es posible,
 * por diferencias centradas — igual que GradientField. Colores del gráfico
 * hardcodeados a propósito (series de datos), como el resto de simuladores.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { parse, derivative, simplify } from 'mathjs';
import type { EvalFunction } from 'mathjs';
import './DivRotField.css';

const DOM = 3.2; // dominio [-DOM, DOM] en x e y

type Vec = { x: number; y: number };
type Overlay = 'none' | 'div' | 'curl';

interface Field {
  fx: EvalFunction; // Ax(x,y)
  fy: EvalFunction; // Ay(x,y)
  dAxDxF: EvalFunction | null;
  dAxDyF: EvalFunction | null;
  dAyDxF: EvalFunction | null;
  dAyDyF: EvalFunction | null;
}

interface Preset { name: string; tag: string; ax: string; ay: string }
const PRESETS: Preset[] = [
  { name: 'Fuente radial', tag: '(x, y)', ax: 'x', ay: 'y' },
  { name: 'Sumidero', tag: '(−x, −y)', ax: '-x', ay: '-y' },
  { name: 'Remolino', tag: '(−y, x)', ax: '-y', ay: 'x' },
  { name: 'Uniforme', tag: '(1, 0.4)', ax: '1', ay: '0.4' },
  { name: 'Cizalla', tag: '(y, 0)', ax: 'y', ay: '0' },
  { name: 'Punto de silla', tag: '(x, −y)', ax: 'x', ay: '-y' },
  { name: 'Fuente + giro', tag: '(x−y, x+y)', ax: 'x-y', ay: 'x+y' },
  { name: 'Sumidero espiral', tag: '(−x−y, x−y)', ax: '-x-y', ay: 'x-y' },
  { name: 'Vórtice físico', tag: '(−y, x)/r²', ax: '-y/(x^2+y^2+0.05)', ay: 'x/(x^2+y^2+0.05)' },
  { name: 'Ondas', tag: '(sen y, cos x)', ax: 'sin(y)', ay: 'cos(x)' },
];

// ── colores del gráfico (hardcodeados a propósito) ──
const MID: [number, number, number] = [243, 236, 221]; // crema
const DIV_POS: [number, number, number] = [138, 45, 59];  // granate — fuente
const DIV_NEG: [number, number, number] = [31, 122, 114]; // teal — sumidero
const CURL_POS: [number, number, number] = [91, 122, 58];  // verde — antihorario
const CURL_NEG: [number, number, number] = [163, 113, 29]; // ámbar — horario
const INK = '42,32,21';
const C_ARROW = 'rgba(42,32,21,0.5)';
const C_PROBE = '#7a2e28';
const C_SURF = '#f7f0e0';

function mix(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function divColor(t: number): [number, number, number] { return t >= 0 ? mix(MID, DIV_POS, t) : mix(MID, DIV_NEG, -t); }
function curlColor(t: number): [number, number, number] { return t >= 0 ? mix(MID, CURL_POS, t) : mix(MID, CURL_NEG, -t); }

function safeEval(fn: EvalFunction, x: number, y: number): number {
  try {
    const v = fn.evaluate({ x, y });
    return typeof v === 'number' ? v : NaN;
  } catch {
    return NaN;
  }
}

function buildField(axExpr: string, ayExpr: string): Field {
  const nx = parse(axExpr), ny = parse(ayExpr);
  const fx = nx.compile(), fy = ny.compile();
  const t1 = fx.evaluate({ x: 0.31, y: -0.22 }), t2 = fy.evaluate({ x: 0.31, y: -0.22 });
  if (typeof t1 !== 'number' || typeof t2 !== 'number') throw new Error('La expresión no da un número');

  let dAxDxF: EvalFunction | null = null, dAxDyF: EvalFunction | null = null;
  let dAyDxF: EvalFunction | null = null, dAyDyF: EvalFunction | null = null;
  try { dAxDxF = simplify(derivative(nx, 'x')).compile(); } catch { dAxDxF = null; }
  try { dAxDyF = simplify(derivative(nx, 'y')).compile(); } catch { dAxDyF = null; }
  try { dAyDxF = simplify(derivative(ny, 'x')).compile(); } catch { dAyDxF = null; }
  try { dAyDyF = simplify(derivative(ny, 'y')).compile(); } catch { dAyDyF = null; }

  return { fx, fy, dAxDxF, dAxDyF, dAyDxF, dAyDyF };
}

function evalA(f: Field, x: number, y: number): Vec {
  return { x: safeEval(f.fx, x, y), y: safeEval(f.fy, x, y) };
}

function divAt(f: Field, x: number, y: number): number {
  const h = 1e-4;
  let dxdx = f.dAxDxF ? safeEval(f.dAxDxF, x, y) : NaN;
  let dydy = f.dAyDyF ? safeEval(f.dAyDyF, x, y) : NaN;
  if (!isFinite(dxdx)) dxdx = (safeEval(f.fx, x + h, y) - safeEval(f.fx, x - h, y)) / (2 * h);
  if (!isFinite(dydy)) dydy = (safeEval(f.fy, x, y + h) - safeEval(f.fy, x, y - h)) / (2 * h);
  return dxdx + dydy;
}

function curlAt(f: Field, x: number, y: number): number {
  const h = 1e-4;
  let dydx = f.dAyDxF ? safeEval(f.dAyDxF, x, y) : NaN;
  let dxdy = f.dAxDyF ? safeEval(f.dAxDyF, x, y) : NaN;
  if (!isFinite(dydx)) dydx = (safeEval(f.fy, x + h, y) - safeEval(f.fy, x - h, y)) / (2 * h);
  if (!isFinite(dxdy)) dxdy = (safeEval(f.fx, x, y + h) - safeEval(f.fx, x, y - h)) / (2 * h);
  return dydx - dxdy;
}

function fmt(v: number): string {
  if (!isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a < 0.005) return '0.00';
  return (v >= 0 ? '+' : '') + v.toFixed(2);
}

export default function DivRotField() {
  const [axExpr, setAxExpr] = useState('x');
  const [ayExpr, setAyExpr] = useState('y');
  const [applied, setApplied] = useState({ ax: 'x', ay: 'y' });
  const [activePreset, setActivePreset] = useState(0);
  const [error, setError] = useState('');
  const [probe, setProbe] = useState<Vec>({ x: 1.2, y: 0.8 });
  const [overlay, setOverlay] = useState<Overlay>('div');
  const [showArrows, setShowArrows] = useState(true);
  const [showFlow, setShowFlow] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const staticRef = useRef<HTMLCanvasElement | null>(null);
  const dimsRef = useRef({ w: 10, h: 10 });
  const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
  const maxRef = useRef({ div: 1, curl: 1 });
  const particlesRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const rafRef = useRef(0);

  const field = useMemo<Field | null>(() => {
    try {
      const f = buildField(applied.ax, applied.ay);
      setError('');
      return f;
    } catch (e) {
      setError('⚠ ' + ((e as Error).message || 'Expresión no válida') +
        '  ·  usa x, y, +, -, *, /, ^, sqrt, exp, sin, cos…');
      return null;
    }
  }, [applied]);

  // mantén la sonda en un punto válido al cambiar de campo
  useEffect(() => {
    if (field) {
      const a = evalA(field, probe.x, probe.y);
      if (!isFinite(a.x) || !isFinite(a.y)) setProbe({ x: 1.2, y: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  const w2px = (x: number) => ((x + DOM) / (2 * DOM)) * dimsRef.current.w;
  const h2py = (y: number) => ((DOM - y) / (2 * DOM)) * dimsRef.current.h;
  const px2w = (px: number) => (px / dimsRef.current.w) * 2 * DOM - DOM;
  const py2w = (py: number) => DOM - (py / dimsRef.current.h) * 2 * DOM;

  const seedParticles = () => {
    const arr: { x: number; y: number; age: number }[] = [];
    for (let i = 0; i < 200; i++) {
      arr.push({ x: (Math.random() * 2 - 1) * DOM, y: (Math.random() * 2 - 1) * DOM, age: Math.random() * 90 });
    }
    particlesRef.current = arr;
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, head: number) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(ang - 0.4), y2 - head * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - head * Math.cos(ang + 0.4), y2 - head * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fill();
  };

  // ── capa estática: heatmap + campo de flechas ──
  const renderStatic = () => {
    const f = field; if (!f) return;
    const { w, h } = dimsRef.current;
    let sc = staticRef.current;
    if (!sc) { sc = document.createElement('canvas'); staticRef.current = sc; }
    sc.width = w; sc.height = h;
    const ctx = sc.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = 'rgb(242,232,211)'; ctx.fillRect(0, 0, w, h);

    if (overlay !== 'none') {
      const N = 100;
      const fn = overlay === 'div' ? (x: number, y: number) => divAt(f, x, y) : (x: number, y: number) => curlAt(f, x, y);
      const vals = new Float32Array(N * N);
      let k = 0;
      for (let j = 0; j < N; j++) {
        const y = DOM - (2 * DOM * (j + 0.5)) / N;
        for (let i = 0; i < N; i++) {
          const x = -DOM + (2 * DOM * (i + 0.5)) / N;
          let v = fn(x, y); if (!isFinite(v)) v = 0;
          vals[k++] = v;
        }
      }
      const absSorted = Array.from(vals, Math.abs).sort((a, b) => a - b);
      const max = Math.max(absSorted[Math.floor(absSorted.length * 0.92)] || 1e-6, 1e-6);
      if (overlay === 'div') maxRef.current.div = max; else maxRef.current.curl = max;

      const colorFn = overlay === 'div' ? divColor : curlColor;
      const img = ctx.createImageData(N, N);
      k = 0;
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const v = vals[k];
          const t = Math.max(-1, Math.min(1, v / max));
          const c = colorFn(t);
          const o = k * 4;
          img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255;
          k++;
        }
      }
      const tmp = document.createElement('canvas'); tmp.width = N; tmp.height = N;
      tmp.getContext('2d')!.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(tmp, 0, 0, w, h);
    }

    if (showGrid) {
      ctx.lineWidth = Math.max(1, DPR * 0.7);
      ctx.strokeStyle = `rgba(${INK},0.10)`;
      for (let gx = -3; gx <= 3; gx++) { const sx = w2px(gx); ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke(); }
      for (let gy = -3; gy <= 3; gy++) { const sy = h2py(gy); ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke(); }
      ctx.strokeStyle = `rgba(${INK},0.32)`;
      ctx.lineWidth = Math.max(1.2, DPR);
      const sy0 = h2py(0), sx0 = w2px(0);
      ctx.beginPath(); ctx.moveTo(0, sy0); ctx.lineTo(w, sy0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx0, 0); ctx.lineTo(sx0, h); ctx.stroke();
    }

    if (showArrows) {
      const K = 15;
      const mags: number[] = [];
      for (let a = 0; a < K; a++) for (let b = 0; b < K; b++) {
        const x = -DOM + (2 * DOM * (a + 0.5)) / K, y = -DOM + (2 * DOM * (b + 0.5)) / K;
        const v = evalA(f, x, y); const m = Math.hypot(v.x, v.y);
        if (isFinite(m)) mags.push(m);
      }
      mags.sort((p, q) => p - q);
      const ref = mags[Math.floor(mags.length * 0.75)] || 1;
      const cell = w / K, maxLen = cell * 0.6;
      ctx.strokeStyle = C_ARROW; ctx.fillStyle = C_ARROW;
      ctx.lineWidth = Math.max(1.4, DPR * 1.3);
      for (let a = 0; a < K; a++) for (let b = 0; b < K; b++) {
        const x = -DOM + (2 * DOM * (a + 0.5)) / K, y = -DOM + (2 * DOM * (b + 0.5)) / K;
        const v = evalA(f, x, y); const m = Math.hypot(v.x, v.y);
        if (!isFinite(m) || m < 1e-9) continue;
        const ux = v.x / m, uy = v.y / m;
        const len = Math.min(maxLen, maxLen * (m / ref));
        const px = w2px(x), py = h2py(y);
        drawArrow(ctx, px, py, px + ux * len, py - uy * len, Math.max(3.5, len * 0.26));
      }
    }
  };

  const drawDynamic = () => {
    const f = field; const canvas = canvasRef.current; if (!f || !canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const { w, h } = dimsRef.current;
    ctx.clearRect(0, 0, w, h);
    if (staticRef.current) ctx.drawImage(staticRef.current, 0, 0);

    if (showFlow) {
      ctx.fillStyle = 'rgba(122,46,40,0.55)';
      for (const p of particlesRef.current) {
        const px = w2px(p.x), py = h2py(p.y);
        ctx.beginPath(); ctx.arc(px, py, Math.max(1.6, DPR * 1.5), 0, 7); ctx.fill();
      }
    }

    const px = w2px(probe.x), py = h2py(probe.y);
    ctx.beginPath(); ctx.arc(px, py, Math.max(6.5, DPR * 6.5), 0, 7);
    ctx.fillStyle = C_SURF; ctx.fill();
    ctx.lineWidth = Math.max(2.5, DPR * 2.5); ctx.strokeStyle = C_PROBE; ctx.stroke();
    ctx.beginPath(); ctx.arc(px, py, Math.max(2.6, DPR * 2.6), 0, 7); ctx.fillStyle = C_PROBE; ctx.fill();
  };

  const resizeAndRender = () => {
    const c = canvasRef.current;
    if (c) {
      const r = c.getBoundingClientRect();
      dimsRef.current = { w: Math.max(10, Math.round(r.width * DPR)), h: Math.max(10, Math.round(r.height * DPR)) };
      c.width = dimsRef.current.w; c.height = dimsRef.current.h;
    }
    renderStatic(); drawDynamic();
  };

  useEffect(() => {
    seedParticles();
    const onResize = () => resizeAndRender();
    window.addEventListener('resize', onResize);
    resizeAndRender();
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { renderStatic(); drawDynamic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, overlay, showArrows, showGrid]);

  useEffect(() => { drawDynamic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [probe, showFlow]);

  // ── animación de partículas de flujo ──
  useEffect(() => {
    if (!showFlow) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const f = field;
      if (f) {
        for (const p of particlesRef.current) {
          const v = evalA(f, p.x, p.y);
          let vx = v.x, vy = v.y;
          if (!isFinite(vx) || !isFinite(vy)) { vx = 0; vy = 0; }
          const sp = Math.hypot(vx, vy) || 1;
          const k = 0.9 / Math.max(1, sp);
          p.x += vx * dt * k; p.y += vy * dt * k; p.age += dt * 60;
          if (p.age > 90 || Math.abs(p.x) > DOM * 1.05 || Math.abs(p.y) > DOM * 1.05) {
            p.x = (Math.random() * 2 - 1) * DOM; p.y = (Math.random() * 2 - 1) * DOM; p.age = 0;
          }
        }
      }
      drawDynamic();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFlow, field]);

  // ── interacción ──
  const dragging = useRef(false);
  const moveProbe = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const px = ((ev.clientX - r.left) / r.width) * dimsRef.current.w;
    const py = ((ev.clientY - r.top) / r.height) * dimsRef.current.h;
    setProbe({
      x: Math.max(-DOM, Math.min(DOM, px2w(px))),
      y: Math.max(-DOM, Math.min(DOM, py2w(py))),
    });
  };

  const applyExpr = (ax: string, ay: string) => { setAxExpr(ax); setAyExpr(ay); setApplied({ ax, ay }); };
  const applyPreset = (i: number) => { setActivePreset(i); applyExpr(PRESETS[i].ax, PRESETS[i].ay); };
  const applyCustom = () => { setActivePreset(-1); applyExpr(axExpr.trim(), ayExpr.trim()); };

  const dv = field ? divAt(field, probe.x, probe.y) : NaN;
  const cu = field ? curlAt(field, probe.x, probe.y) : NaN;

  let divVerdict = '—', divClass = '';
  if (isFinite(dv)) {
    if (Math.abs(dv) < 0.01) { divVerdict = 'Solenoidal · ni fuente ni sumidero'; divClass = 'muted'; }
    else if (dv > 0) { divVerdict = 'Fuente · el campo sale del punto'; divClass = 'pos'; }
    else { divVerdict = 'Sumidero · el campo entra al punto'; divClass = 'neg'; }
  }
  let curlVerdict = '—', curlClass = '';
  if (isFinite(cu)) {
    if (Math.abs(cu) < 0.01) { curlVerdict = 'Irrotacional · la ruedecita no gira'; curlClass = 'muted'; }
    else if (cu > 0) { curlVerdict = 'Giro antihorario (+)'; curlClass = 'pos'; }
    else { curlVerdict = 'Giro horario (−)'; curlClass = 'neg'; }
  }

  return (
    <div className="dr">
      <div className="dr-layout">
        <aside className="dr-console">
          <label className="dr-lbl">Campo vectorial</label>
          <div className="dr-presets">
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                className={'dr-preset' + (activePreset === i ? ' active' : '')}
                onClick={() => applyPreset(i)}
              >
                <span className="dr-pname">{p.name}</span>
                <span className="dr-ptag">{p.tag}</span>
              </button>
            ))}
          </div>

          <div className="dr-custom">
            <div className="dr-row">
              <span className="dr-prefix">Ax =</span>
              <input
                value={axExpr} spellCheck={false} autoCapitalize="off" autoComplete="off"
                onChange={(e) => setAxExpr(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') applyCustom(); }}
                aria-label="Componente Ax del campo"
              />
            </div>
            <div className="dr-row">
              <span className="dr-prefix">Ay =</span>
              <input
                value={ayExpr} spellCheck={false} autoCapitalize="off" autoComplete="off"
                onChange={(e) => setAyExpr(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') applyCustom(); }}
                aria-label="Componente Ay del campo"
              />
            </div>
            <button className="dr-apply" onClick={applyCustom}>Dibujar mi campo</button>
            {error && <div className="dr-err">{error}</div>}
            <p className="dr-hint">Variables x, y. Funciones: sin, cos, tan, exp, log, sqrt, abs, atan, atan2. Ej.: -y/(x^2+y^2)</p>
          </div>

          <label className="dr-lbl" style={{ marginTop: 18 }}>Fondo de color</label>
          <div className="dr-seg">
            <button className={overlay === 'none' ? 'on' : ''} onClick={() => setOverlay('none')}>Ninguno</button>
            <button className={overlay === 'div' ? 'on' : ''} onClick={() => setOverlay('div')}>∇·A</button>
            <button className={overlay === 'curl' ? 'on' : ''} onClick={() => setOverlay('curl')}>∇×A</button>
          </div>

          <label className="dr-lbl" style={{ marginTop: 18 }}>Mostrar</label>
          <div className="dr-toggles">
            <label className="dr-check"><input type="checkbox" checked={showArrows} onChange={(e) => setShowArrows(e.target.checked)} /> Vectores del campo</label>
            <label className="dr-check"><input type="checkbox" checked={showFlow} onChange={(e) => setShowFlow(e.target.checked)} /> Partículas (flujo)</label>
            <label className="dr-check"><input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} /> Rejilla y ejes</label>
          </div>
        </aside>

        <main className="dr-stage">
          <div className="dr-canvas-hold">
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); moveProbe(e); }}
              onPointerMove={(e) => { if (dragging.current) moveProbe(e); }}
              onPointerUp={() => { dragging.current = false; }}
              onPointerCancel={() => { dragging.current = false; }}
            />
            <div className="dr-hud">x={probe.x.toFixed(2)} · y={probe.y.toFixed(2)}</div>
          </div>

          <div className="dr-readouts">
            <section className="dr-card divg">
              <h3>Divergencia <span className="op">∇·A</span></h3>
              <div className={'dr-value ' + divClass}>{fmt(dv)}</div>
              <p className={'dr-verdict ' + divClass}>{divVerdict}</p>
              <p className="dr-desc">Cuánto flujo neto sale de un entorno diminuto del punto. Positivo = fuente, negativo = sumidero, cero = solenoidal.</p>
            </section>
            <section className="dr-card rotc">
              <h3>Rotacional <span className="op">(∇×A)_z</span></h3>
              <div className={'dr-value ' + curlClass}>{fmt(cu)}</div>
              <p className={'dr-verdict ' + curlClass}>{curlVerdict}</p>
              <p className="dr-desc">Cuánto haría girar el campo a una ruedecita colocada en el punto. Positivo = antihorario, cero = irrotacional (deriva de un potencial).</p>
            </section>
          </div>
        </main>
      </div>

      <div className="dr-facts">
        <div className="dr-fact one"><h4>∇·A = 0 → solenoidal</h4><p>El flujo que entra iguala al que sale: no hay fuentes ni sumideros. Un remolino puro lo cumple — prueba el preset <b>Remolino</b>.</p></div>
        <div className="dr-fact two"><h4>∇×A = 0 → irrotacional</h4><p>Si además ∇×A = 0 en todo el plano, el campo deriva de un potencial V. La ruedecita no gira aunque las partículas se muevan.</p></div>
        <div className="dr-fact three"><h4>∇·(∇×A) = 0</h4><p>La divergencia de un rotacional siempre es cero: un campo que es «el giro de otro» nunca tiene fuentes. Buen chequeo de tus cálculos.</p></div>
      </div>
    </div>
  );
}
