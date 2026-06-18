import { useRef, useState, useEffect } from 'react';
import { evaluate, derivative, parse } from 'mathjs';
import { useCanvasLoop } from '../hooks/useCanvasLoop';
import { drawArrow, drawGrid, toCanvas } from './utils';

function evalAt(expr: string, t: number): number {
  try { return Number(evaluate(expr, { t })); } catch { return 0; }
}
function derivAt(expr: string, t: number): number {
  try { return Number(evaluate(derivative(parse(expr), 't').toString(), { t })); } catch { return 0; }
}

export default function MovimientoGeneral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [xt,   setXt]   = useState('2*t');
  const [yt,   setYt]   = useState('4*t - 0.5*9.8*t^2');
  const [tMax, setTMax] = useState(3);
  const [scale,setScale]= useState(60);
  const [showV,  setShowV]  = useState(true);
  const [showA,  setShowA]  = useState(true);
  const [showHod,setShowHod]= useState(false);
  const [running, setRunning] = useState(false);

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const ox = W / 2, oy = H / 2;

    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H, ox, oy, scale);

    // Full trajectory
    ctx.strokeStyle = 'rgba(6,182,212,0.45)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const ti = (i / 300) * tMax;
      const { cx, cy } = toCanvas(evalAt(xt, ti), evalAt(yt, ti), ox, oy, scale);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke(); ctx.setLineDash([]);

    const px = evalAt(xt, t), py = evalAt(yt, t);
    const { cx, cy } = toCanvas(px, py, ox, oy, scale);

    // Velocity vector
    if (showV) {
      const vx = derivAt(xt, t), vy = derivAt(yt, t);
      const vscale = scale * 0.25;
      drawArrow(ctx, cx, cy, cx + vx * vscale, cy - vy * vscale, '#10b981', 'v', 2);
    }

    // Acceleration (numerical 2nd derivative)
    if (showA) {
      const dt = 0.002;
      const axn = (derivAt(xt, t + dt) - derivAt(xt, t - dt)) / (2 * dt);
      const ayn = (derivAt(yt, t + dt) - derivAt(yt, t - dt)) / (2 * dt);
      const ascale = scale * 0.12;
      drawArrow(ctx, cx, cy, cx + axn * ascale, cy - ayn * ascale, '#f59e0b', 'γ', 2);
    }

    // Hodograph (top-right corner)
    if (showHod) {
      const hoOx = W * 0.78, hoOy = H * 0.22;
      ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(hoOx, hoOy, 3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(16,185,129,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 300; i++) {
        const ti = (i / 300) * tMax;
        const vx = derivAt(xt, ti), vy = derivAt(yt, ti);
        const hx = hoOx + vx * scale * 0.18, hy = hoOy - vy * scale * 0.18;
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.stroke();
      const vx = derivAt(xt, t), vy = derivAt(yt, t);
      drawArrow(ctx, hoOx, hoOy, hoOx + vx * scale * 0.18, hoOy - vy * scale * 0.18, '#10b981', '', 1.5);
      ctx.font = '11px sans-serif'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
      ctx.fillText('Hodógrafa', hoOx + 8, hoOy - 10);
    }

    // Position vector
    drawArrow(ctx, ox, oy, cx, cy, '#3b82f6', 'r', 1.5);

    // Particle
    ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();

    // HUD
    const vx = derivAt(xt, t), vy = derivAt(yt, t);
    const vmod = Math.sqrt(vx * vx + vy * vy);
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(2)} s`, 16, H - 44);
    ctx.fillText(`r = (${px.toFixed(2)}, ${py.toFixed(2)}) m`, 16, H - 28);
    ctx.fillText(`v = (${vx.toFixed(2)}, ${vy.toFixed(2)})  |v| = ${vmod.toFixed(2)} m/s`, 16, H - 12);
  }

  useEffect(() => { draw(tRef.current); });

  useCanvasLoop(draw, running, tRef, (t) => {
    if (timeSpan.current) timeSpan.current.textContent = t.toFixed(2);
  }, tMax);

  const reset = () => {
    setRunning(false);
    tRef.current = 0;
    if (timeSpan.current) timeSpan.current.textContent = '0.00';
    draw(0);
  };

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas ref={canvasRef} width={700} height={440} />
        <div className="canvas-controls">
          <button className="btn btn-primary" onClick={() => setRunning(r => !r)}>
            {running ? '⏸ Pausar' : '▶ Animar'}
          </button>
          <button className="btn btn-outline" onClick={reset}>↺ Reiniciar</button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>
            t = <span ref={timeSpan}>0.00</span> s
          </span>
        </div>
        <div className="legend">
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showV} onChange={e => setShowV(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#10b981' }} />Vector v
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showA} onChange={e => setShowA(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#f59e0b' }} />Vector γ
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showHod} onChange={e => setShowHod(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#8b5cf6' }} />Hodógrafa
          </label>
        </div>
      </div>

      <div className="params-panel">
        <h3>Ecuaciones horarias</h3>
        <div className="param-group">
          <div className="param-row">
            <label>x(t) =</label>
            <input type="text" value={xt} onChange={e => { setXt(e.target.value); reset(); }} />
          </div>
          <div className="param-row">
            <label>y(t) =</label>
            <input type="text" value={yt} onChange={e => { setYt(e.target.value); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="param-group">
          <div className="param-row">
            <label>Tiempo máximo <span>{tMax} s</span></label>
            <input type="range" min={0.5} max={10} step={0.1} value={tMax}
              onChange={e => { setTMax(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Escala <span>{scale} px/m</span></label>
            <input type="range" min={10} max={150} step={5} value={scale}
              onChange={e => { setScale(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="formula-box">
          v = dr/dt<br />γ = dv/dt<br />
          v = ẋ·i + ẏ·j<br />γ = ẍ·i + ÿ·j
        </div>
        <div className="info-box">
          <strong>Ejemplos:</strong><br />
          Tiro: x=20*cos(0.78)*t, y=20*sin(0.78)*t-4.9*t^2<br />
          Círculo: x=3*cos(t), y=3*sin(t)<br />
          Espiral: x=t*cos(t), y=t*sin(t)
        </div>
      </div>
    </div>
  );
}
