import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';
import { drawArrow } from './utils';

export default function MovimientoCircular() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [R,     setR]     = useState(120);
  const [w0,    setW0]    = useState(1);
  const [alpha, setAlpha] = useState(0);
  const [running, setRunning] = useState(false);

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // Circle
    ctx.strokeStyle = 'rgba(6,182,212,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);

    // Center
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#475569'; ctx.fill();

    // Current angle and angular velocity
    const theta = w0 * t + 0.5 * alpha * t * t;
    const w     = w0 + alpha * t;

    // Particle position (start at top: θ measured from -π/2)
    const px = cx + R * Math.cos(theta - Math.PI / 2);
    const py = cy + R * Math.sin(theta - Math.PI / 2);

    // Arc swept (shows progress)
    ctx.save();
    ctx.strokeStyle = 'rgba(59,130,246,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2, theta - Math.PI / 2, w < 0);
    ctx.stroke(); ctx.restore();

    // Radius vector
    drawArrow(ctx, cx, cy, px, py, '#3b82f6', 'r', 1.5);

    // Tangent unit vector (perpendicular to radius)
    const tx = -Math.sin(theta - Math.PI / 2);
    const ty =  Math.cos(theta - Math.PI / 2);
    const vsign = w >= 0 ? 1 : -1;
    const vscale = Math.abs(w) * R * 0.35;
    if (vscale > 3)
      drawArrow(ctx, px, py, px + tx * vscale * vsign, py + ty * vscale * vsign, '#10b981', 'v');

    // Normal acceleration (centripetal, toward center)
    const gn = w * w * R;
    const nscale = gn * 0.3;
    const nx = cx - px, ny = cy - py;
    const nlen = Math.sqrt(nx * nx + ny * ny);
    if (nlen > 0 && nscale > 3)
      drawArrow(ctx, px, py, px + (nx / nlen) * nscale, py + (ny / nlen) * nscale, '#f59e0b', 'γₙ');

    // Tangential acceleration
    const gt = alpha * R;
    if (Math.abs(gt) > 3)
      drawArrow(ctx, px, py, px + tx * gt * 0.3, py + ty * gt * 0.3, '#ef4444', 'γₜ');

    // Particle
    ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();

    // HUD
    const turns = (theta / (2 * Math.PI));
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(2)} s`, 16, H - 62);
    ctx.fillText(`ω = ${w.toFixed(3)} rad/s`, 16, H - 46);
    ctx.fillText(`θ = ${(theta * 180 / Math.PI).toFixed(1)}°  (${turns.toFixed(2)} vueltas)`, 16, H - 30);
    ctx.fillText(`|v| = ω·R = ${(Math.abs(w) * R).toFixed(1)} px/s    γₙ = ω²·R = ${gn.toFixed(1)}`, 16, H - 14);
  }

  useEffect(() => { draw(tRef.current); });

  useCanvasLoop(draw, running, tRef, (t) => {
    if (timeSpan.current) timeSpan.current.textContent = t.toFixed(2);
  });

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
          <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />v tangencial</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} />γₙ centrípeta</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />γₜ tangencial</div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Parámetros</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Radio R <span>{R} px</span></label>
            <input type="range" min={40} max={180} step={5} value={R}
              onChange={e => { setR(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Vel. angular ω₀ <span>{w0} rad/s</span></label>
            <input type="range" min={-4} max={4} step={0.1} value={w0}
              onChange={e => { setW0(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Acel. angular α <span>{alpha} rad/s²</span></label>
            <input type="range" min={-3} max={3} step={0.1} value={alpha}
              onChange={e => { setAlpha(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="formula-box">
          θ(t) = ω₀·t + ½α·t²<br />
          ω(t) = ω₀ + α·t<br />
          v = ω·R  (tangencial)<br />
          γₙ = ω²·R  (centrípeta)<br />
          γₜ = α·R  (tangencial)
        </div>
        <div className="info-box">
          {alpha === 0
            ? <><strong>MCU</strong> — α=0, ω=cte, γₜ=0<br />Solo existe γₙ (centrípeta).</>
            : <><strong>MCUA</strong> — α≠0, ω varía<br />Existen γₙ y γₜ simultáneamente.</>
          }
        </div>
      </div>
    </div>
  );
}
