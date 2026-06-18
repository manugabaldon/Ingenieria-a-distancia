import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';
import { drawArrow, drawGrid, toCanvas } from './utils';

export default function ComposicionMovimientos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [vEx,  setVEx]  = useState(2);
  const [vEy,  setVEy]  = useState(0);
  const [Rrel, setRrel] = useState(60);
  const [wRel, setWRel] = useState(2);
  const [running, setRunning] = useState(false);
  const SCALE = 50;

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const ox = W / 2, oy = H / 2;

    ctx.clearRect(0, 0, W, H);
    drawGrid(ctx, W, H, ox, oy, SCALE);

    // Absolute trajectory (dashed)
    ctx.strokeStyle = 'rgba(59,130,246,0.4)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const ti = (i / 400) * 6;
      const xAbs = vEx * ti + Rrel * Math.cos(wRel * ti);
      const yAbs = vEy * ti + Rrel * Math.sin(wRel * ti);
      const { cx, cy } = toCanvas(xAbs / SCALE, yAbs / SCALE, ox, oy, SCALE);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke(); ctx.setLineDash([]);

    // Moving origin
    const oMx = ox + vEx * t;
    const oMy = oy - vEy * t;

    // Relative circle (moving frame)
    ctx.strokeStyle = 'rgba(245,158,11,0.22)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(oMx, oMy, Rrel, 0, Math.PI * 2);
    ctx.stroke(); ctx.setLineDash([]);

    // Moving origin dot
    ctx.beginPath(); ctx.arc(oMx, oMy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b'; ctx.fill();
    ctx.fillStyle = '#f59e0b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText("O'", oMx + 8, oMy - 8);

    // Particle absolute position
    const xRel = Rrel * Math.cos(wRel * t);
    const yRel = Rrel * Math.sin(wRel * t);
    const xAbs = vEx * t + xRel;
    const yAbs = vEy * t + yRel;
    const { cx, cy } = toCanvas(xAbs / SCALE, yAbs / SCALE, ox, oy, SCALE);

    // Vectors
    drawArrow(ctx, ox, oy, cx, cy, '#3b82f6', 'r', 1.5);
    drawArrow(ctx, oMx, oMy, cx, cy, '#f59e0b', "r'", 1.5);
    drawArrow(ctx, cx, cy, cx + vEx * 12, cy - vEy * 12, '#6366f1', 'vₑ', 2);

    const vRelX = -wRel * Rrel * Math.sin(wRel * t);
    const vRelY =  wRel * Rrel * Math.cos(wRel * t);
    drawArrow(ctx, cx, cy, cx + vRelX * 0.12, cy - vRelY * 0.12, '#10b981', "v'", 2);

    const vTotX = vEx + vRelX / SCALE;
    const vTotY = vEy + vRelY / SCALE;
    drawArrow(ctx, cx, cy, cx + vTotX * 12, cy - vTotY * 12, '#e879f9', 'vₐ', 2);

    // Particle
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();

    // HUD
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(2)} s`, 16, H - 32);
    ctx.fillText(`r = rₑ + r'    v = vₑ + v'`, 16, H - 16);
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
          <div className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }} />r absoluta</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} />r' relativa</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />v' relativa</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#6366f1' }} />vₑ arrastre</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: '#e879f9' }} />vₐ absoluta</div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Sistema de arrastre</h3>
        <div className="param-group">
          <div className="param-row">
            <label>vEx (arrastre X) <span>{vEx} u/s</span></label>
            <input type="range" min={-5} max={5} step={0.5} value={vEx}
              onChange={e => { setVEx(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>vEy (arrastre Y) <span>{vEy} u/s</span></label>
            <input type="range" min={-5} max={5} step={0.5} value={vEy}
              onChange={e => { setVEy(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <h3>Movimiento relativo</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Radio R' <span>{Rrel} px</span></label>
            <input type="range" min={20} max={140} step={5} value={Rrel}
              onChange={e => { setRrel(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Vel. angular ω' <span>{wRel} rad/s</span></label>
            <input type="range" min={-5} max={5} step={0.25} value={wRel}
              onChange={e => { setWRel(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="formula-box">
          r = rₑ + r'<br />v = vₑ + v'<br />γ = γₑ + γ' + 2ω×v'
        </div>
        <div className="info-box">
          La trayectoria azul es la <strong>absoluta</strong>.<br />
          El círculo amarillo se mueve con el sistema de arrastre.
        </div>
      </div>
    </div>
  );
}
