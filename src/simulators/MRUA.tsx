import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';
import { drawArrow } from './utils';

export default function MRUA() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const tRef       = useRef(0);
  const timeSpan   = useRef<HTMLSpanElement>(null);

  const [x0, setX0]   = useState(0);
  const [v0, setV0]   = useState(5);
  const [a,  setA]    = useState(-2);
  const [running, setRunning] = useState(false);

  const tStop = a !== 0 ? -v0 / a : Infinity;
  const tMax  = Math.min(Math.abs(a) > 0 ? Math.max(Math.abs(tStop) + 1, 5) : 8, 12);
  const SCALE = 30; // px per metre
  const ORIGIN_X = 120;

  function X(t: number) { return x0 + v0 * t + 0.5 * a * t * t; }
  function V(t: number) { return v0 + a * t; }

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx    = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const trackY = H * 0.4;

    ctx.clearRect(0, 0, W, H);

    // Track
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, trackY - 15, W, 30);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.strokeRect(0, trackY - 15, W, 30);
    ctx.strokeStyle = '#475569'; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(0, trackY); ctx.lineTo(W, trackY); ctx.stroke();
    ctx.setLineDash([]);

    // Origin
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ORIGIN_X, trackY - 30); ctx.lineTo(ORIGIN_X, trackY + 30); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('O', ORIGIN_X, trackY - 36);

    // Trajectory dots
    ctx.fillStyle = 'rgba(6,182,212,0.18)';
    for (let i = 0; i <= 80; i++) {
      const xi = X((i / 80) * tMax);
      const bx = ORIGIN_X + xi * SCALE;
      if (bx > 0 && bx < W) {
        ctx.beginPath(); ctx.arc(bx, trackY, 2, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Block
    const xt = X(t), bx = ORIGIN_X + xt * SCALE;
    const bw = 50, bh = 30;
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    (ctx as any).roundRect(bx - bw / 2, trackY - bh - 15, bw, bh, 6);
    ctx.fill();
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = 'white'; ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('m', bx, trackY - bh / 2 - 15);
    ctx.textBaseline = 'alphabetic';

    // Velocity arrow
    const vt = V(t);
    if (Math.abs(vt) > 0.1)
      drawArrow(ctx, bx, trackY - 30, bx + vt * 5, trackY - 30, '#10b981', 'v');

    // Acceleration arrow
    if (Math.abs(a) > 0.01)
      drawArrow(ctx, bx, trackY + 22, bx + a * 5, trackY + 22, '#f59e0b', 'a');

    // x dimension line
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(ORIGIN_X, trackY + 42); ctx.lineTo(bx, trackY + 42); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`x = ${xt.toFixed(2)} m`, (ORIGIN_X + bx) / 2, trackY + 58);

    // Mini charts
    const chartY = trackY + 90;
    const chartH = 75, chartW = (W - 80) / 3, gap = 20, startX = 30;

    const charts = [
      { label: 'x(t)', color: '#3b82f6', fn: (ti: number) => X(ti) },
      { label: 'v(t)', color: '#10b981', fn: (ti: number) => V(ti) },
      { label: 'a(t)', color: '#f59e0b', fn: ()           => a },
    ];

    charts.forEach(({ label, color, fn }, idx) => {
      const ox = startX + idx * (chartW + gap);
      const vals = Array.from({ length: 100 }, (_, i) => fn((i / 99) * tMax));
      const yMin = Math.min(...vals), yMax2 = Math.max(...vals);
      const range = Math.max(yMax2 - yMin, 0.001);
      const toY = (v: number) => chartY + chartH - ((v - yMin) / range) * (chartH - 12) - 6;

      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); (ctx as any).roundRect(ox, chartY, chartW, chartH, 6); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();

      ctx.strokeStyle = color + '70'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      vals.forEach((v, i) => {
        const px = ox + (i / 99) * chartW;
        i === 0 ? ctx.moveTo(px, toY(v)) : ctx.lineTo(px, toY(v));
      });
      ctx.stroke();

      const curV = fn(t);
      const curX = ox + (t / tMax) * chartW;
      ctx.beginPath(); ctx.arc(curX, toY(curV), 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();

      ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(`${label} = ${curV.toFixed(2)}`, ox + 6, chartY + 13);
    });

    // HUD bottom
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(
      `t = ${t.toFixed(2)} s    x = ${xt.toFixed(2)} m    v = ${vt.toFixed(2)} m/s    a = ${a} m/s²`,
      16, H - 12
    );
  }

  // Draw on param change
  useEffect(() => { draw(tRef.current); });  // no deps → runs after every render

  // Animation loop (robust, never restarts)
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
      </div>

      <div className="params-panel">
        <h3>Parámetros</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Posición inicial x₀ <span>{x0} m</span></label>
            <input type="range" min={-5} max={5} step={0.5} value={x0}
              onChange={e => { setX0(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Velocidad inicial v₀ <span>{v0} m/s</span></label>
            <input type="range" min={-15} max={15} step={0.5} value={v0}
              onChange={e => { setV0(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Aceleración a <span>{a} m/s²</span></label>
            <input type="range" min={-8} max={8} step={0.5} value={a}
              onChange={e => { setA(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <div className="formula-box">
          x(t) = x₀ + v₀·t + ½a·t²<br />
          v(t) = v₀ + a·t<br />
          v² = v₀² + 2a·(x−x₀)
        </div>
        <div className="info-box">
          {a === 0 ? (
            <><strong>MRU</strong> — v = cte, a = 0</>
          ) : (
            <>
              <strong>MRUA</strong> — a = {a} m/s²<br />
              {isFinite(tStop) && tStop > 0 && <>Paro en t = {tStop.toFixed(2)} s</>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
