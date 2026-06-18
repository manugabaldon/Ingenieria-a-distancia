import { useRef, useState, useEffect } from 'react';
import { useCanvasLoop } from '../hooks/useCanvasLoop';

// ─── 3D projection  (Z = up axis) ────────────────────────────────────────────
// rotX: tilt (0 = top view, π/2 = side view)
// rotZ: horizontal spin
function proj(
  x: number, y: number, z: number,
  rotX: number, rotZ: number,
  cx: number, cy: number
): [number, number] {
  const x1 =  x * Math.cos(rotZ) - y * Math.sin(rotZ);
  const y1 =  x * Math.sin(rotZ) + y * Math.cos(rotZ);
  // + sign makes Z=up → screen-up
  const y2 = y1 * Math.cos(rotX) + z * Math.sin(rotX);
  return [cx + x1, cy - y2];
}

function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, label = '', lw = 2
) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 4) return;
  const ang = Math.atan2(dy, dx), hl = Math.min(13, len * 0.35);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color;
  ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(ang - 0.38), y2 - hl * Math.sin(ang - 0.38));
  ctx.lineTo(x2 - hl * Math.cos(ang + 0.38), y2 - hl * Math.sin(ang + 0.38));
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    ctx.fillText(label, x2 + nx * 16, y2 + ny * 16);
  }
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS (all distances in pixels, R = visual radius)
// θ(t) = π/2 + ω·t    where  ω = speed   (speed is in rad/s, R only visual)
// x = R·cosθ,  y = R·sinθ,  z = √3·R·θ
// v = R·ω·(−sinθ, cosθ, √3)   |v| = 2·R·ω = cte ✓
// γ = R·ω²·(−cosθ, −sinθ, 0)  →  |γ| = R·ω²
// γₙ = R·ω²  (= v²/4R since v=2Rω)
// ρ   = v²/γₙ = 4R
// ─────────────────────────────────────────────────────────────────────────────

export default function HeliceCP2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef      = useRef(0);
  const timeSpan  = useRef<HTMLSpanElement>(null);
  const dragX     = useRef<number | null>(null);

  const [R,      setR]      = useState(80);    // visual radius (px)
  const [speed,  setSpeed]  = useState(0.8);   // ω (rad/s) — NOT v/(2R)
  const [rotZ,   setRotZ]   = useState(-0.5);
  const [running, setRunning] = useState(false);
  const [showV,  setShowV]  = useState(true);
  const [showA,  setShowA]  = useState(true);
  const [showRho,setShowRho]= useState(false);

  const rotZRef = useRef(rotZ);
  rotZRef.current = rotZ;

  // Derived quantities (physics with ω = speed)
  const omega  = speed;                    // rad/s
  const vMod   = 2 * R * omega;           // |v| = 2Rω
  const gammaN = R * omega * omega;        // = v²/4R
  const rho    = 4 * R;                   // ρ = 4R

  function draw(t: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    // Origin at bottom-centre so helix rises upward
    const cx = W * 0.42, cy = H * 0.80;
    const RZ = rotZRef.current;
    const RX = 0.50;  // ~29° tilt — gentle enough to see the 3D structure

    const p = (x: number, y: number, z: number): [number, number] =>
      proj(x, y, z, RX, RZ, cx, cy);

    ctx.clearRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = 'rgba(148,163,184,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 50) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,H); ctx.stroke(); }
    for (let i = 0; i < H; i += 50) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(W,i); ctx.stroke(); }

    // ── Axes ─────────────────────────────────────────────────────────────────
    const AL = R * 1.6;
    [[AL,0,0,'x','rgba(148,163,184,0.2)'],[0,AL,0,'y','rgba(148,163,184,0.2)'],[0,0,AL*3.5,'z','rgba(148,163,184,0.4)']].forEach(
      ([ex,ey,ez,lbl,col]: any) => {
        const [ox2,oy2] = p(0,0,0);
        const [tx,ty]   = p(ex,ey,ez);
        ctx.save();
        ctx.strokeStyle = col; ctx.lineWidth = lbl==='z' ? 1.5 : 1;
        ctx.setLineDash(lbl==='z' ? [] : [4,5]);
        ctx.beginPath(); ctx.moveTo(ox2,oy2); ctx.lineTo(tx,ty); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#64748b'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lbl, tx + 4, ty - 4);
        ctx.restore();
      }
    );

    // ── Cylinder ghost ────────────────────────────────────────────────────────
    const th0 = Math.PI / 2;
    const theta = th0 + omega * t;
    const zTop  = Math.sqrt(3) * R * (theta + 2.0 * Math.PI);

    ctx.save(); ctx.strokeStyle = 'rgba(59,130,246,0.06)'; ctx.lineWidth = 1;
    const CSEG = 24;
    for (const zC of [0, zTop]) {
      ctx.beginPath();
      for (let i = 0; i <= CSEG; i++) {
        const a = (i / CSEG) * Math.PI * 2;
        const [px2, py2] = p(Math.cos(a)*R, Math.sin(a)*R, zC);
        i === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
      }
      ctx.stroke();
    }
    for (let i = 0; i < CSEG; i++) {
      const a = (i / CSEG) * Math.PI * 2;
      const [px1,py1] = p(Math.cos(a)*R, Math.sin(a)*R, 0);
      const [px2,py2] = p(Math.cos(a)*R, Math.sin(a)*R, zTop);
      ctx.beginPath(); ctx.moveTo(px1,py1); ctx.lineTo(px2,py2); ctx.stroke();
    }
    ctx.restore();

    // ── Full helix ahead (ghost, dashed) ─────────────────────────────────────
    ctx.save(); ctx.strokeStyle = 'rgba(6,182,212,0.18)'; ctx.lineWidth = 1.5; ctx.setLineDash([3,5]);
    ctx.beginPath();
    const N = 500;
    for (let i = 0; i <= N; i++) {
      const th = th0 + (i / N) * (omega * t + 2.5 * Math.PI);
      const [hx,hy] = p(Math.cos(th)*R, Math.sin(th)*R, Math.sqrt(3)*R*th);
      i === 0 ? ctx.moveTo(hx,hy) : ctx.lineTo(hx,hy);
    }
    ctx.stroke(); ctx.setLineDash([]); ctx.restore();

    // ── Travelled path (solid) ────────────────────────────────────────────────
    if (t > 0) {
      const M = Math.max(3, Math.floor(60 * omega * t) + 10);
      ctx.save(); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= M; i++) {
        const th = th0 + (i / M) * (theta - th0);
        const [hx,hy] = p(Math.cos(th)*R, Math.sin(th)*R, Math.sqrt(3)*R*th);
        i === 0 ? ctx.moveTo(hx,hy) : ctx.lineTo(hx,hy);
      }
      ctx.stroke(); ctx.restore();
    }

    // ── Particle ──────────────────────────────────────────────────────────────
    const PX = Math.cos(theta)*R;
    const PY = Math.sin(theta)*R;
    const PZ = Math.sqrt(3)*R*theta;
    const [sx, sy] = p(PX, PY, PZ);

    // Vertical projection to base
    const [bx, by] = p(PX, PY, 0);
    ctx.save(); ctx.strokeStyle = 'rgba(148,163,184,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([2,4]);
    ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(bx,by); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();

    // Velocity  v = Rω(-sinθ, cosθ, √3)
    if (showV) {
      const sc = 0.4;
      const VX = -Math.sin(theta)*R*omega*sc;
      const VY =  Math.cos(theta)*R*omega*sc;
      const VZ =  Math.sqrt(3)*R*omega*sc;
      const [ex,ey] = p(PX+VX, PY+VY, PZ+VZ);
      arrow(ctx, sx, sy, ex, ey, '#10b981', 'v', 2.5);
    }

    // Acceleration  γ = Rω²(-cosθ, -sinθ, 0)  →  toward axis, horizontal
    if (showA) {
      const sc = 0.55;
      const AX = -Math.cos(theta)*R*omega*omega*sc;
      const AY = -Math.sin(theta)*R*omega*omega*sc;
      const [ex,ey] = p(PX+AX, PY+AY, PZ);     // PZ stays same (z-component=0)
      arrow(ctx, sx, sy, ex, ey, '#f59e0b', 'γₙ', 2.5);
    }

    // Osculating circle
    if (showRho) {
      const Nx = -Math.cos(theta), Ny = -Math.sin(theta); // unit normal
      const Tx = -Math.sin(theta)/2, Ty = Math.cos(theta)/2, Tz = Math.sqrt(3)/2; // unit tangent
      const Ccx = PX + rho*Nx, Ccy = PY + rho*Ny, Ccz = PZ;
      ctx.save(); ctx.strokeStyle='rgba(168,85,247,0.55)'; ctx.lineWidth=1.5; ctx.setLineDash([3,4]);
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const phi = (i/80)*Math.PI*2;
        const ox2 = Ccx + rho*(Math.cos(phi)*Nx + Math.sin(phi)*Tx);
        const oy2 = Ccy + rho*(Math.cos(phi)*Ny + Math.sin(phi)*Ty);
        const oz2 = Ccz + rho*(Math.cos(phi)*0  + Math.sin(phi)*Tz);
        const [ppx,ppy] = p(ox2,oy2,oz2);
        i===0 ? ctx.moveTo(ppx,ppy) : ctx.lineTo(ppx,ppy);
      }
      ctx.stroke(); ctx.setLineDash([]);
      const [ccx,ccy] = p(Ccx,Ccy,Ccz);
      ctx.beginPath(); ctx.arc(ccx,ccy,4,0,Math.PI*2); ctx.fillStyle='#a855f7'; ctx.fill();
      ctx.restore();
    }

    // t=0 marker
    const [s0x,s0y] = p(0, R, Math.sqrt(3)*R*th0);
    ctx.beginPath(); ctx.arc(s0x,s0y,5,0,Math.PI*2); ctx.fillStyle='rgba(100,116,139,0.7)'; ctx.fill();
    ctx.fillStyle='#94a3b8'; ctx.font='11px sans-serif'; ctx.textAlign='center';
    ctx.fillText('t=0', s0x, s0y-10);

    // Particle dot
    ctx.beginPath(); ctx.arc(sx,sy,9,0,Math.PI*2);
    ctx.fillStyle='#3b82f6'; ctx.fill(); ctx.strokeStyle='white'; ctx.lineWidth=2.5; ctx.stroke();

    // HUD
    const turns = (theta - th0) / (2*Math.PI);
    ctx.font='12px monospace'; ctx.fillStyle='#94a3b8'; ctx.textAlign='left';
    ctx.fillText(`t = ${t.toFixed(2)} s   θ = ${(theta*180/Math.PI).toFixed(1)}°  (${turns.toFixed(2)} vueltas)`, 16, H-32);
    ctx.fillText(`γₜ = 0  |  γₙ = Rω² = ${gammaN.toFixed(1)}  |  ρ = 4R = ${rho}`, 16, H-16);
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

  // Mouse drag to spin
  const onDown  = (e: React.MouseEvent) => { dragX.current = e.clientX; };
  const onMove  = (e: React.MouseEvent) => {
    if (dragX.current === null) return;
    setRotZ(r => r + (e.clientX - dragX.current!) * 0.012);
    dragX.current = e.clientX;
  };
  const onUp = () => { dragX.current = null; };

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas
          ref={canvasRef} width={700} height={480}
          style={{ cursor: 'grab' }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        />
        <div className="canvas-controls">
          <button className="btn btn-primary" onClick={() => setRunning(r => !r)}>
            {running ? '⏸ Pausar' : '▶ Animar'}
          </button>
          <button className="btn btn-outline" onClick={reset}>↺ Reiniciar</button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>
            t = <span ref={timeSpan}>0.00</span> s · <em>Arrastra para girar</em>
          </span>
        </div>
        <div className="legend">
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showV} onChange={e => setShowV(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#10b981' }} />v (tangente)
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showA} onChange={e => setShowA(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#f59e0b' }} />γₙ (→ eje)
          </label>
          <label className="legend-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showRho} onChange={e => setShowRho(e.target.checked)} />
            <span className="legend-dot" style={{ background: '#a855f7' }} />Círculo osculador ρ=4R
          </label>
        </div>
      </div>

      <div className="params-panel">
        <h3>Parámetros</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Radio R <span>{R} px</span></label>
            <input type="range" min={40} max={110} step={5} value={R}
              onChange={e => { setR(Number(e.target.value)); reset(); }} />
          </div>
          <div className="param-row">
            <label>Vel. angular ω <span>{speed.toFixed(2)} rad/s</span></label>
            <input type="range" min={0.1} max={2.5} step={0.05} value={speed}
              onChange={e => { setSpeed(Number(e.target.value)); reset(); }} />
          </div>
        </div>
        <hr className="divider" />
        <h3>Solución — CP-2</h3>
        <div className="formula-box">
          <strong>1) θ(t):</strong><br />
          |v|² = 4R²θ̇²  →  θ̇ = v/2R = cte<br />
          θ(t) = π/2 + (v/2R)·t<br /><br />
          <strong>2) Aceleración:</strong><br />
          γₜ = 0  (v = cte)<br />
          γₙ = v²/4R = Rω²<br />
          ρ = 4R
        </div>
        <hr className="divider" />
        <div className="info-box">
          <strong>Con R={R}px, ω={speed.toFixed(2)} rad/s:</strong><br />
          |v| = 2Rω = {vMod.toFixed(1)} px/s<br />
          γₙ = Rω² = {gammaN.toFixed(2)}<br />
          ρ = 4R = {rho} px<br /><br />
          γ apunta siempre <strong>hacia el eje Z</strong><br />
          (componente Z de γ = 0)
        </div>
      </div>
    </div>
  );
}
