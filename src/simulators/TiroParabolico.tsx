import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';
import { drawArrow, toCanvas } from './utils';

const G = 9.8;
const OX = 40, OY = 400;

export default function TiroParabolico() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [v0,    setV0]    = useState(20);
  const [alpha, setAlpha] = useState(45);
  const [h0,    setH0]    = useState(0);
  const [running, setRunning] = useState(false);

  const alphaRad = (alpha * Math.PI) / 180;
  const v0x = v0 * Math.cos(alphaRad);
  const v0y = v0 * Math.sin(alphaRad);
  const tFlight = (v0y + Math.sqrt(v0y * v0y + 2 * G * h0)) / G;
  const xMax = v0x * tFlight;
  const yMax = h0 + (v0y * v0y) / (2 * G);
  const scale = Math.min(580 / (xMax || 1), 340 / ((yMax + 5) || 1)) * 0.85;

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 50) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 50) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // Ground
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, OY); ctx.lineTo(W, OY); ctx.stroke();

    // Full trajectory (dashed)
    ctx.strokeStyle = 'rgba(6,182,212,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const ti = (i / 300) * tFlight;
      const { cx, cy } = toCanvas(v0x * ti, h0 + v0y * ti - 0.5 * G * ti * ti, OX, OY, scale);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke(); ctx.setLineDash([]);

    const tc = Math.min(t, tFlight);
    const px = v0x * tc;
    const py = h0 + v0y * tc - 0.5 * G * tc * tc;
    const { cx, cy } = toCanvas(px, py, OX, OY, scale);

    // Velocity vector
    const vx = v0x, vy = v0y - G * tc;
    const vscale = scale * 0.3;
    drawArrow(ctx, cx, cy, cx + vx * vscale * 0.3, cy - vy * vscale * 0.3, '#10b981', 'v');

    // Gravity vector
    drawArrow(ctx, cx, cy, cx, cy + G * scale * 0.12, '#f59e0b', 'g');

    // Particle
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();

    // Landing marker
    const { cx: lx } = toCanvas(xMax, 0, OX, OY, scale);
    ctx.beginPath(); ctx.arc(lx, OY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.fillStyle = '#ef4444'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`x=${xMax.toFixed(0)}m`, lx + 6, OY - 6);

    // HUD
    const vmod = Math.sqrt(vx * vx + vy * vy);
    const angV = Math.atan2(vy, vx) * 180 / Math.PI;
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${tc.toFixed(2)} s`, 16, H - 62);
    ctx.fillText(`x = ${px.toFixed(1)} m   y = ${py.toFixed(1)} m`, 16, H - 46);
    ctx.fillText(`|v| = ${vmod.toFixed(1)} m/s   θ = ${angV.toFixed(1)}°`, 16, H - 30);
    ctx.fillText(`Alcance = ${xMax.toFixed(1)} m   H_máx = ${yMax.toFixed(1)} m`, 16, H - 14);
  }

  useEffect(() => { draw(tRef.current); });

  useCanvasLoop(draw, running, tRef, (t) => {
    if (timeSpan.current) timeSpan.current.textContent = Math.min(t, tFlight).toFixed(2);
  }, tFlight);

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
            t = <span ref={timeSpan}>0.00</span> / {tFlight.toFixed(2)} s
          </span>
        </div>
      </div>

      <div className="params-panel">
        <h3>Parámetros</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Velocidad inicial v₀ <span>{v0} m/s</span></label>
            <input type="range" min={1} max={50} step={1} value={v0}
              onChange={e => { setV0(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Ángulo α <span>{alpha}°</span></label>
            <input type="range" min={1} max={89} step={1} value={alpha}
              onChange={e => { setAlpha(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Altura inicial h₀ <span>{h0} m</span></label>
            <input type="range" min={0} max={50} step={1} value={h0}
              onChange={e => { setH0(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="formula-box">
          x(t) = v₀·cos(α)·t<br />
          y(t) = h₀ + v₀·sin(α)·t − ½g·t²<br />
          vₓ = v₀·cos(α)  (cte)<br />
          vᵧ = v₀·sin(α) − g·t
        </div>
        <div className="info-box">
          <strong>Resultados:</strong><br />
          v₀ₓ = {v0x.toFixed(2)} m/s<br />
          v₀ᵧ = {v0y.toFixed(2)} m/s<br />
          t vuelo = {tFlight.toFixed(2)} s<br />
          Alcance = {xMax.toFixed(2)} m<br />
          H máx = {yMax.toFixed(2)} m
        </div>
      </div>
    </div>
  );
}
