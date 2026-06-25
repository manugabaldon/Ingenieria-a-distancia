import { useRef, useState, useEffect, type RefObject } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';

// ─── Physics ──────────────────────────────────────────────────────────────────
// Dato: aceleración  ẍ = −(v²/a)·cos(ωt),  ÿ = −(v²/a)·sen(ωt)   con ω = v/a
// Velocidad (1ª integral):  ẋ = −v·sin(ωt),  ẏ = v·cos(ωt)
// Ecuaciones horarias (2ª integral):  x = a·cos(ωt),  y = a·sin(ωt)
// La aceleración es centrípeta de módulo v²/a:  ax = −ω²x,  ay = −ω²y
// Ley horaria:  s = v·t

function physics(t: number, a: number, vsp: number) {
  const w  = vsp / a;
  const th = w * t;
  const x  = a * Math.cos(th);
  const y  = a * Math.sin(th);
  const vx = -vsp * Math.sin(th);
  const vy = vsp * Math.cos(th);
  const ax = -w * w * x;   // = −(v²/a)·cos(ωt)
  const ay = -w * w * y;   // = −(v²/a)·sen(ωt)
  const speed = vsp;
  const acc   = w * w * a;   // v²/a
  const s     = vsp * t;
  return { w, th, x, y, vx, vy, ax, ay, speed, acc, s };
}

function arrow(
  ctx: CanvasRenderingContext2D,
  x0: number, y0: number, x1: number, y1: number,
  color: string, label: string, lw = 2.5
) {
  const len = Math.hypot(x1 - x0, y1 - y0);
  if (len < 3) return;
  const ang = Math.atan2(y1 - y0, x1 - x0);
  const hl  = Math.min(12, len * 0.35);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - hl * Math.cos(ang - 0.38), y1 - hl * Math.sin(ang - 0.38));
  ctx.lineTo(x1 - hl * Math.cos(ang + 0.38), y1 - hl * Math.sin(ang + 0.38));
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    ctx.fillText(label, x1 + nx * 14, y1 + ny * 14);
  }
  ctx.restore();
}

export default function CircularCP40() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [running, setRunning] = useState(false);
  const [showV,    setShowV]    = useState(true);
  const [showA,    setShowA]    = useState(true);
  const [showComp, setShowComp] = useState(true);   // componentes de la aceleración (el dato)
  const [a,        setA]        = useState(3);    // radio (m)
  const [vsp,      setVsp]      = useState(6);    // velocidad lineal (m/s)
  const [scale,    setScale]    = useState(58);   // px por metro

  // Live values for the info panel (updated via DOM refs)
  const thSpan = useRef<HTMLSpanElement>(null);
  const xSpan  = useRef<HTMLSpanElement>(null);
  const ySpan  = useRef<HTMLSpanElement>(null);
  const axSpan = useRef<HTMLSpanElement>(null);
  const aySpan = useRef<HTMLSpanElement>(null);
  const vSpan  = useRef<HTMLSpanElement>(null);
  const aSpan  = useRef<HTMLSpanElement>(null);
  const sSpan  = useRef<HTMLSpanElement>(null);

  function updatePanel(p: ReturnType<typeof physics>) {
    if (thSpan.current) thSpan.current.textContent = p.th.toFixed(3);
    if (xSpan.current)  xSpan.current.textContent  = p.x.toFixed(3);
    if (ySpan.current)  ySpan.current.textContent  = p.y.toFixed(3);
    if (axSpan.current) axSpan.current.textContent = p.ax.toFixed(3);
    if (aySpan.current) aySpan.current.textContent = p.ay.toFixed(3);
    if (vSpan.current)  vSpan.current.textContent  = p.speed.toFixed(3);
    if (aSpan.current)  aSpan.current.textContent  = p.acc.toFixed(3);
    if (sSpan.current)  sSpan.current.textContent  = p.s.toFixed(3);
  }

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const OX = W * 0.42, OY = H * 0.52;
    const SC = scale;
    const w  = vsp / a;

    ctx.clearRect(0, 0, W, H);

    // ── Axes ──────────────────────────────────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(OX - 7.5 * SC, OY); ctx.lineTo(OX + 7.5 * SC, OY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(OX, OY + 7.5 * SC); ctx.lineTo(OX, OY - 7.5 * SC); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('x', OX + 7.5 * SC + 12, OY + 4);
    ctx.fillText('y', OX, OY - 7.5 * SC - 8);
    ctx.restore();

    // ── Trajectory circle  x²+y² = a² ──────────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(6,182,212,0.55)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(OX, OY, a * SC, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(6,182,212,0.6)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('x²+y² = a²', OX + a * SC * 0.70, OY - a * SC * 0.70);
    ctx.restore();

    // ── Starting point A(a,0) ──────────────────────────────────────────────────
    const axc = OX + a * SC, ayc = OY;
    ctx.beginPath(); ctx.arc(axc, ayc, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,116,139,0.8)'; ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('A(a,0)  t=0', axc + 4, ayc + 16);

    // ── Current state ──────────────────────────────────────────────────────────
    const p = physics(t, a, vsp);
    updatePanel(p);
    const px = OX + p.x * SC, py = OY - p.y * SC;

    // radius line
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(OX, OY); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('a', (OX + px) / 2 + 8, (OY + py) / 2);
    ctx.restore();

    // θ = ωt arc
    ctx.save();
    ctx.strokeStyle = 'rgba(245,158,11,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(OX, OY, 22, 0, -((p.th) % (Math.PI * 2)), true); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('θ=ωt', OX + 26, OY - 8);
    ctx.restore();

    // acceleration components ax, ay (the given data) — fixed visual scale ½·radio
    if (showComp) {
      const k = 0.5 * SC * a / p.acc;   // |a|·k = ½·a·SC px
      // dashed guide lines to form the rectangle
      ctx.save();
      ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(px + p.ax * k, py);            ctx.lineTo(px + p.ax * k, py - p.ay * k);
      ctx.moveTo(px,            py - p.ay * k);  ctx.lineTo(px + p.ax * k, py - p.ay * k);
      ctx.stroke();
      ctx.restore();
      arrow(ctx, px, py, px + p.ax * k, py,            '#f97316', 'ax', 2);
      arrow(ctx, px, py, px,            py - p.ay * k, '#8b5cf6', 'ay', 2);
    }

    // velocity (tangent) — drawn at a fixed visual length (½·radio)
    if (showV) {
      const k = 0.5 * SC * a / vsp;   // |V|·k = ½·a·SC px
      arrow(ctx, px, py, px + p.vx * k, py - p.vy * k, '#10b981', 'V');
    }
    // acceleration (centripetal, toward centre) — same visual length
    if (showA) {
      const k = 0.5 * SC * a / p.acc; // |aₙ|·k = ½·a·SC px
      arrow(ctx, px, py, px + p.ax * k, py - p.ay * k, '#ef4444', 'a');
    }

    // particle
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2.5; ctx.stroke();

    // HUD
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(2)} s   ω = ${w.toFixed(3)} rad/s   s = ${p.s.toFixed(2)} m`, 16, H - 16);
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

  const period = (2 * Math.PI * a / vsp);

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas ref={canvasRef} width={680} height={500} />
        <div className="canvas-controls">
          <button className="btn btn-primary" onClick={() => setRunning(r => !r)}>
            {running ? '⏸ Pausar' : '▶ Animar'}
          </button>
          <button className="btn btn-outline" onClick={reset}>↺ Reiniciar (t=0)</button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>
            t = <span ref={timeSpan}>0.00</span> s
          </span>
        </div>
        <div className="legend">
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showV} onChange={e => setShowV(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#10b981' }} />V (tangente)
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showA} onChange={e => setShowA(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#ef4444' }} />a (centrípeta)
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showComp} onChange={e => setShowComp(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#8b5cf6' }} />ax, ay (dato)
          </label>
        </div>
      </div>

      {/* ── Panel derecho ── */}
      <div className="params-panel">

        <h3>Valores en t actual</h3>
        <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '0.75rem', fontSize: '0.82rem', lineHeight: 2 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {([
                { lbl: 'θ = ωt', ref: thSpan, unit: 'rad',  col: '#f59e0b' },
                { lbl: 'x(t)',   ref: xSpan,  unit: 'm',    col: '#94a3b8' },
                { lbl: 'y(t)',   ref: ySpan,  unit: 'm',    col: '#94a3b8' },
                { lbl: 'ax',     ref: axSpan, unit: 'm/s²', col: '#f97316' },
                { lbl: 'ay',     ref: aySpan, unit: 'm/s²', col: '#8b5cf6' },
                { lbl: '|V|',    ref: vSpan,  unit: 'm/s',  col: '#10b981' },
                { lbl: '|a|',    ref: aSpan,  unit: 'm/s²', col: '#ef4444' },
                { lbl: 's = vt', ref: sSpan,  unit: 'm',    col: '#e2e8f0' },
              ] as { lbl: string; ref: RefObject<HTMLSpanElement>; unit: string; col: string }[])
                .map(({ lbl, ref, unit, col }) => (
                <tr key={lbl}>
                  <td style={{ color: '#64748b', paddingRight: 6, whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{lbl}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: col }}>
                    <span ref={ref}>—</span>
                  </td>
                  <td style={{ color: '#475569', paddingLeft: 4, fontSize: '0.78rem' }}>{unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="divider" />

        <h3>Parámetros</h3>
        <div className="param-row">
          <label>Radio a <span>{a} m</span></label>
          <input type="range" min={1} max={6} step={0.5} value={a}
            onChange={e => { setA(Number(e.target.value)); }} />
        </div>
        <div className="param-row">
          <label>Velocidad v <span>{vsp} m/s</span></label>
          <input type="range" min={1} max={12} step={0.5} value={vsp}
            onChange={e => { setVsp(Number(e.target.value)); }} />
        </div>
        <div className="param-row">
          <label>Escala <span>{scale} px/m</span></label>
          <input type="range" min={25} max={80} step={1} value={scale}
            onChange={e => setScale(Number(e.target.value))} />
        </div>

        <hr className="divider" />

        <h3>Resultados analíticos</h3>
        <div className="formula-box" style={{ fontSize: '0.78rem', lineHeight: 1.9 }}>
          <span style={{ color: '#f97316' }}>ax = −(v²/a)·cos(ωt)</span>,{' '}
          <span style={{ color: '#8b5cf6' }}>ay = −(v²/a)·sen(ωt)</span> (dato)<br />
          Velocidad: ẋ = −v·sen(ωt), &nbsp; ẏ = v·cos(ωt)<br />
          Horarias: x = a·cos(ωt), &nbsp; y = a·sen(ωt)<br />
          Trayectoria: <strong>x²+y² = a²</strong><br />
          <span style={{ color: '#10b981' }}>|V| = v = {vsp} m/s</span> (constante)<br />
          <span style={{ color: '#ef4444' }}>|a| = v²/a = {(vsp * vsp / a).toFixed(2)} m/s²</span><br />
          ω = v/a = {(vsp / a).toFixed(3)} rad/s<br />
          T = 2πa/v = {period.toFixed(2)} s<br />
          <strong>s = v·t</strong>
        </div>

        <div className="info-box" style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
          <strong>Observa:</strong><br />
          • El <strong>dato</strong> son las componentes <strong>ax, ay</strong> de la aceleración<br />
          • Su suma (la aceleración total) apunta siempre al <strong>centro</strong> (centrípeta)<br />
          • Tras integrar dos veces, la velocidad es <strong>tangente</strong> y de módulo constante v<br />
          • Activa <strong>ax, ay</strong> para ver la descomposición del dato
        </div>
      </div>
    </div>
  );
}
