import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';

// ─── Physics ──────────────────────────────────────────────────────────────────
// r(t) = 3(2 − e^−t)   →  ṙ = 3e^−t   →  r̈ = −3e^−t
// θ(t) = 4(t + 2e^−t)  →  θ̇ = 4−8e^−t →  θ̈ = 8e^−t
// Velocity:     vᵣ = ṙ              vθ = r·θ̇
// Acceleration: aᵣ = r̈ − r·θ̇²     aθ = r·θ̈ + 2·ṙ·θ̇

function physics(t: number) {
  const et  = Math.exp(-t);
  const r   = 3 * (2 - et);
  const rd  = 3 * et;             // ṙ
  const rdd = -3 * et;            // r̈
  const th  = 4 * (t + 2 * et);
  const thd = 4 - 8 * et;         // θ̇
  const thdd = 8 * et;            // θ̈
  const vr  = rd;
  const vth = r * thd;
  const ar  = rdd - r * thd * thd;
  const ath = r * thdd + 2 * rd * thd;
  const v   = Math.sqrt(vr * vr + vth * vth);
  const a   = Math.sqrt(ar * ar + ath * ath);
  return { r, rd, rdd, th, thd, thdd, vr, vth, ar, ath, v, a };
}

function arrowPolar(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number,
  theta: number,       // angle of the local frame axis (eᵣ direction)
  perpAngle: number,   // angle of transverse direction
  cx: number, cy: number,
  component: number,   // signed magnitude in px
  color: string, label: string, along: 'r' | 'th', lw = 2
) {
  const baseAngle = along === 'r' ? theta : perpAngle;
  const ex = cx + component * Math.cos(baseAngle);
  const ey = cy - component * Math.sin(baseAngle);
  void ox; void oy;
  const len = Math.abs(component);
  if (len < 4) return;
  const ang = Math.atan2(ey - cy, ex - cx);
  const hl = Math.min(12, len * 0.35);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - hl * Math.cos(ang - 0.38), ey - hl * Math.sin(ang - 0.38));
  ctx.lineTo(ex - hl * Math.cos(ang + 0.38), ey - hl * Math.sin(ang + 0.38));
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    ctx.fillText(label, ex + nx * 14, ey + ny * 14);
  }
  ctx.restore();
}

export default function PolaresCP3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);

  const [running,  setRunning]  = useState(false);
  const [showV,    setShowV]    = useState(true);
  const [showA,    setShowA]    = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [scale,    setScale]    = useState(52);   // px per metre
  const [tInf,     setTInf]     = useState(false); // jump to t→∞ view

  // Live values for the info panel (updated via DOM refs)
  const rSpan   = useRef<HTMLSpanElement>(null);
  const thSpan  = useRef<HTMLSpanElement>(null);
  const vrSpan  = useRef<HTMLSpanElement>(null);
  const vthSpan = useRef<HTMLSpanElement>(null);
  const vSpan   = useRef<HTMLSpanElement>(null);
  const arSpan  = useRef<HTMLSpanElement>(null);
  const athSpan = useRef<HTMLSpanElement>(null);
  const aSpan   = useRef<HTMLSpanElement>(null);

  function updatePanel(p: ReturnType<typeof physics>) {
    if (rSpan.current)   rSpan.current.textContent   = p.r.toFixed(3);
    if (thSpan.current)  thSpan.current.textContent  = p.th.toFixed(3);
    if (vrSpan.current)  vrSpan.current.textContent  = p.vr.toFixed(3);
    if (vthSpan.current) vthSpan.current.textContent = p.vth.toFixed(3);
    if (vSpan.current)   vSpan.current.textContent   = p.v.toFixed(3);
    if (arSpan.current)  arSpan.current.textContent  = p.ar.toFixed(3);
    if (athSpan.current) athSpan.current.textContent = p.ath.toFixed(3);
    if (aSpan.current)   aSpan.current.textContent   = p.a.toFixed(3);
  }

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const OX = W * 0.42, OY = H * 0.52; // canvas origin (= polar origin)
    const SC = scale;

    ctx.clearRect(0, 0, W, H);

    // ── Polar grid ────────────────────────────────────────────────────────────
    if (showGrid) {
      // Radial circles r = 1…7 m
      ctx.save();
      ctx.setLineDash([4, 6]);
      for (let ri = 1; ri <= 7; ri++) {
        ctx.beginPath();
        ctx.arc(OX, OY, ri * SC, 0, Math.PI * 2);
        ctx.strokeStyle = ri === 6 ? 'rgba(59,130,246,0.25)' : 'rgba(148,163,184,0.1)';
        ctx.lineWidth = ri === 6 ? 1.5 : 1;
        ctx.stroke();
        ctx.fillStyle = '#475569'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(`${ri}m`, OX + ri * SC + 3, OY - 3);
      }
      // Radial lines every 30°
      for (let deg = 0; deg < 360; deg += 30) {
        const ang = deg * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(OX, OY);
        ctx.lineTo(OX + 7 * SC * Math.cos(ang), OY - 7 * SC * Math.sin(ang));
        ctx.strokeStyle = 'rgba(148,163,184,0.08)'; ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    }

    // ── Axes ──────────────────────────────────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(OX - 30, OY); ctx.lineTo(OX + 7.5 * SC, OY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(OX, OY + 30); ctx.lineTo(OX, OY - 7.5 * SC); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = '12px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('x', OX + 7.5 * SC + 12, OY);
    ctx.fillText('y', OX, OY - 7.5 * SC - 8);
    ctx.restore();

    // ── Full trajectory (spiral) ──────────────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(6,182,212,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 5]);
    ctx.beginPath();
    const TT = 10; // show 10 seconds
    for (let i = 0; i <= 600; i++) {
      const ti = (i / 600) * TT;
      const { r, th } = physics(ti);
      const px = OX + r * SC * Math.cos(th);
      const py = OY - r * SC * Math.sin(th);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.setLineDash([]); ctx.restore();

    // ── Asymptotic circle r=6 ─────────────────────────────────────────────────
    ctx.save();
    ctx.strokeStyle = 'rgba(59,130,246,0.15)'; ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.beginPath(); ctx.arc(OX, OY, 6 * SC, 0, Math.PI * 2);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(59,130,246,0.4)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('r → 6m (t→∞)', OX + 6 * SC + 4, OY - 8);
    ctx.restore();

    // ── t=0 marker ────────────────────────────────────────────────────────────
    const p0 = physics(0);
    const x0 = OX + p0.r * SC * Math.cos(p0.th);
    const y0 = OY - p0.r * SC * Math.sin(p0.th);
    ctx.beginPath(); ctx.arc(x0, y0, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,116,139,0.7)'; ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('t=0', x0, y0 - 10);

    // ── Current state ─────────────────────────────────────────────────────────
    const p = physics(t);
    updatePanel(p);

    const { r, th, vr, vth, ar, ath } = p;
    const px = OX + r * SC * Math.cos(th);
    const py = OY - r * SC * Math.sin(th);

    // Radial vector from origin
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(OX, OY); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([]);
    // r label at midpoint
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('r', (OX + px) / 2 - 8, (OY + py) / 2);
    ctx.restore();

    // eᵣ and eθ unit vectors (thin, light)
    const erX = Math.cos(th), erY = -Math.sin(th);  // eᵣ direction in canvas coords
    const ethX = -Math.sin(th), ethY = -Math.cos(th); // eθ direction (90° CCW from eᵣ)
    const unitLen = 25;
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + erX * unitLen, py + erY * unitLen); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + ethX * unitLen, py + ethY * unitLen); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(148,163,184,0.6)'; ctx.font = 'italic 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('eᵣ', px + erX * (unitLen + 10), py + erY * (unitLen + 10));
    ctx.fillText('eθ', px + ethX * (unitLen + 10), py + ethY * (unitLen + 10));
    ctx.restore();

    // θ arc
    ctx.save();
    ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(OX, OY, 20, 0, th % (Math.PI * 2), false);
    ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('θ', OX + 24, OY - 6);
    ctx.restore();

    // ── Velocity components ───────────────────────────────────────────────────
    if (showV) {
      // vᵣ along eᵣ
      arrowPolar(ctx, OX, OY, th, th + Math.PI / 2, px, py,
        vr * SC * 0.18, '#10b981', 'vᵣ', 'r', 2.5);
      // vθ along eθ (perpendicular, CCW positive)
      const vthPx = SC * 0.18;
      const ex2 = px + vth * vthPx * (-Math.sin(th));
      const ey2 = py - vth * vthPx * Math.cos(th);  // note: canvas y inverted
      const lenV = Math.abs(vth * vthPx);
      if (lenV > 4) {
        const angV = Math.atan2(ey2 - py, ex2 - px);
        const hl = Math.min(12, lenV * 0.35);
        ctx.save();
        ctx.strokeStyle = '#06b6d4'; ctx.fillStyle = '#06b6d4'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex2, ey2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ex2, ey2);
        ctx.lineTo(ex2 - hl * Math.cos(angV - 0.38), ey2 - hl * Math.sin(angV - 0.38));
        ctx.lineTo(ex2 - hl * Math.cos(angV + 0.38), ey2 - hl * Math.sin(angV + 0.38));
        ctx.closePath(); ctx.fill();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const nx = -Math.sin(angV), ny = Math.cos(angV);
        ctx.fillText('vθ', ex2 + nx * 14, ey2 + ny * 14);
        ctx.restore();
      }
    }

    // ── Acceleration components ───────────────────────────────────────────────
    if (showA) {
      // aᵣ along eᵣ
      arrowPolar(ctx, OX, OY, th, th + Math.PI / 2, px, py,
        ar * SC * 0.06, '#f59e0b', 'aᵣ', 'r', 2.5);
      // aθ along eθ
      const athSC = SC * 0.06;
      const ex3 = px + ath * athSC * (-Math.sin(th));
      const ey3 = py - ath * athSC * Math.cos(th);
      const lenA = Math.abs(ath * athSC);
      if (lenA > 4) {
        const angA = Math.atan2(ey3 - py, ex3 - px);
        const hl = Math.min(12, lenA * 0.35);
        ctx.save();
        ctx.strokeStyle = '#ef4444'; ctx.fillStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex3, ey3); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ex3, ey3);
        ctx.lineTo(ex3 - hl * Math.cos(angA - 0.38), ey3 - hl * Math.sin(angA - 0.38));
        ctx.lineTo(ex3 - hl * Math.cos(angA + 0.38), ey3 - hl * Math.sin(angA + 0.38));
        ctx.closePath(); ctx.fill();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const nx = -Math.sin(angA), ny = Math.cos(angA);
        ctx.fillText('aθ', ex3 + nx * 14, ey3 + ny * 14);
        ctx.restore();
      }
    }

    // ── Particle ──────────────────────────────────────────────────────────────
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2.5; ctx.stroke();

    // ── HUD bottom ────────────────────────────────────────────────────────────
    ctx.font = '12px monospace'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(`t = ${t.toFixed(3)} s`, 16, H - 16);
  }

  useEffect(() => { draw(tRef.current); });

  useCanvasLoop(draw, running && !tInf, tRef, (t) => {
    if (timeSpan.current) timeSpan.current.textContent = t.toFixed(3);
  }, 10);

  const reset = () => {
    setRunning(false); setTInf(false);
    tRef.current = 0;
    if (timeSpan.current) timeSpan.current.textContent = '0.000';
    draw(0);
  };

  const jumpToInf = () => {
    setRunning(false); setTInf(true);
    tRef.current = 12; // t=12 ≈ t→∞  (e^-12 ≈ 0)
    if (timeSpan.current) timeSpan.current.textContent = '∞';
    draw(12);
  };

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas ref={canvasRef} width={680} height={500} />
        <div className="canvas-controls">
          <button className="btn btn-primary" onClick={() => { setTInf(false); setRunning(r => !r); }}>
            {running ? '⏸ Pausar' : '▶ Animar'}
          </button>
          <button className="btn btn-outline" onClick={reset}>↺ Reiniciar (t=0)</button>
          <button className="btn btn-outline" onClick={jumpToInf}
            style={{ borderColor: '#6366f1', color: '#818cf8' }}>
            t → ∞
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>
            t = <span ref={timeSpan}>0.000</span> s
          </span>
        </div>
        <div className="legend">
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showV} onChange={e => setShowV(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#10b981' }} />vᵣ
            <span className="legend-dot" style={{ background: '#06b6d4', marginLeft: 8 }} />vθ
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showA} onChange={e => setShowA(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#f59e0b' }} />aᵣ
            <span className="legend-dot" style={{ background: '#ef4444', marginLeft: 8 }} />aθ
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#475569' }} />Grid polar
          </label>
        </div>
      </div>

      {/* ── Panel derecho ── */}
      <div className="params-panel">

        {/* Live values table */}
        <h3>Valores en t actual</h3>
        <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '0.75rem', fontSize: '0.82rem', lineHeight: 2 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {([
                { lbl: 'r(t)',          ref: rSpan,   unit: 'm',    col: '#94a3b8' },
                { lbl: 'θ(t)',          ref: thSpan,  unit: 'rad',  col: '#94a3b8' },
                { lbl: 'vᵣ = ṙ',       ref: vrSpan,  unit: 'm/s',  col: '#10b981' },
                { lbl: 'vθ = r·θ̇',    ref: vthSpan, unit: 'm/s',  col: '#06b6d4' },
                { lbl: '|v|',           ref: vSpan,   unit: 'm/s',  col: '#e2e8f0' },
                { lbl: 'aᵣ = r̈−rθ̇²', ref: arSpan,  unit: 'm/s²', col: '#f59e0b' },
                { lbl: 'aθ=rθ̈+2ṙθ̇',  ref: athSpan, unit: 'm/s²', col: '#ef4444' },
                { lbl: '|a|',           ref: aSpan,   unit: 'm/s²', col: '#e2e8f0' },
              ] as { lbl: string; ref: React.RefObject<HTMLSpanElement>; unit: string; col: string }[])
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

        {/* Solución analítica */}
        <h3>Solución — t = 0</h3>
        <div className="formula-box" style={{ fontSize: '0.78rem', lineHeight: 1.9 }}>
          r(0) = 3 m,  θ(0) = 8 rad<br />
          ṙ(0) = 3 m/s,  θ̇(0) = −4 rad/s<br />
          r̈(0) = −3,  θ̈(0) = 8<br />
          <span style={{ color: '#10b981' }}>vᵣ = 3 m/s</span>
          {'  '}
          <span style={{ color: '#06b6d4' }}>vθ = −12 m/s</span><br />
          <strong>|v| = √(9+144) = 3√17 ≈ 12.37 m/s</strong><br />
          <span style={{ color: '#f59e0b' }}>aᵣ = −3−3·16 = −51 m/s²</span><br />
          <span style={{ color: '#ef4444' }}>aθ = 3·8+2·3·(−4) = 0</span><br />
          <strong>|a| = 51 m/s²</strong>
        </div>

        <h3 style={{ marginTop: '0.75rem' }}>Solución — t → ∞</h3>
        <div className="formula-box" style={{ fontSize: '0.78rem', lineHeight: 1.9 }}>
          r → 6 m,  ṙ → 0,  θ̇ → 4 rad/s<br />
          r̈ → 0,   θ̈ → 0<br />
          <span style={{ color: '#10b981' }}>vᵣ = 0</span>
          {'  '}
          <span style={{ color: '#06b6d4' }}>vθ = 6·4 = 24 m/s</span><br />
          <strong>|v| = 24 m/s  (solo transversal)</strong><br />
          <span style={{ color: '#f59e0b' }}>aᵣ = 0 − 6·16 = −96 m/s²</span><br />
          <span style={{ color: '#ef4444' }}>aθ = 0</span><br />
          <strong>|a| = 96 m/s²  (solo centrípeta)</strong>
        </div>

        <hr className="divider" />
        <div className="param-row">
          <label>Escala <span>{scale} px/m</span></label>
          <input type="range" min={25} max={80} step={5} value={scale}
            onChange={e => setScale(Number(e.target.value))} />
        </div>

        <div className="info-box" style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
          <strong>Observa:</strong><br />
          • La espiral converge al círculo r=6m<br />
          • En t=0: aθ=0 aunque θ̈≠0 (se cancelan 2ṙθ̇ y rθ̈)<br />
          • En t→∞: movimiento <strong>circular uniforme</strong> r=6, ω=4 rad/s<br />
          • Usa <strong>t→∞</strong> para ver el estado final
        </div>
      </div>
    </div>
  );
}
