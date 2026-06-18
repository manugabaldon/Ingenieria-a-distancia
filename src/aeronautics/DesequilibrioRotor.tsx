import { useRef, useState, useEffect } from 'react';

const K = 5e6;
const TRAIL_MAX = 600;

interface Mass { m: number; r: number; phi: number; z: number; }

function computeState(masses: Mass[], rpm: number, t: number) {
  const omega = rpm * 2 * Math.PI / 60;
  let FLx = 0, FLy = 0, FRx = 0, FRy = 0;
  const mfArr: { ang: number; z: number }[] = [];
  for (const mass of masses) {
    const U = mass.m * mass.r;
    const ang = omega * t + mass.phi;
    const Fx = U * omega * omega * Math.cos(ang);
    const Fy = U * omega * omega * Math.sin(ang);
    FLx += Fx * (1 - mass.z); FLy += Fy * (1 - mass.z);
    FRx += Fx * mass.z;       FRy += Fy * mass.z;
    mfArr.push({ ang, z: mass.z });
  }
  const dLx = FLx / K, dLy = FLy / K, dRx = FRx / K, dRy = FRy / K;
  const ampL = Math.sqrt(dLx * dLx + dLy * dLy) * 1e6;
  const ampR = Math.sqrt(dRx * dRx + dRy * dRy) * 1e6;
  let phaseDiff = Math.abs(Math.atan2(FLy, FLx) - Math.atan2(FRy, FRx)) * 180 / Math.PI;
  if (phaseDiff > 180) phaseDiff = 360 - phaseDiff;
  const FLpeak = Math.sqrt(FLx * FLx + FLy * FLy);
  const FRpeak = Math.sqrt(FRx * FRx + FRy * FRy);
  return { omega, mfArr, dLx, dLy, dRx, dRy, ampL, ampR, phaseDiff, FLpeak, FRpeak };
}

function drawBearingSupport(ctx: CanvasRenderingContext2D, x: number, cy: number, col: string, label: string) {
  const hw = 9, bh = 18, th = 22;
  ctx.fillStyle = col + '25'; ctx.strokeStyle = col + '99'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.rect(x - hw, cy - 8, hw * 2, bh); ctx.fill(); ctx.stroke();
  ctx.fillStyle = col + '18';
  ctx.beginPath(); ctx.moveTo(x - hw, cy + bh - 8); ctx.lineTo(x + hw, cy + bh - 8); ctx.lineTo(x, cy + th + bh - 8); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = col + '40'; ctx.fillRect(x - 14, cy + th + bh - 10, 28, 4);
  ctx.fillStyle = col + 'aa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(label, x, cy + th + bh + 12);
}

function drawOrbit(ctx: CanvasRenderingContext2D, W: number, H: number, trail: { x: number; y: number }[], col: string, showTrail: boolean) {
  const cx = W / 2, cy = H / 2;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#05051a'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#0f0f28'; ctx.lineWidth = 1;
  for (let r = W / 5; r < W / 2; r += W / 5) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
  ctx.strokeStyle = '#141432';
  ctx.beginPath(); ctx.moveTo(cx, 2); ctx.lineTo(cx, H - 2); ctx.moveTo(2, cy); ctx.lineTo(W - 2, cy); ctx.stroke();
  if (trail.length < 3) { ctx.fillStyle = '#2a2a50'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('…', cx, cy); return; }
  let maxR = 1e-12;
  for (const pt of trail) { const r = Math.sqrt(pt.x * pt.x + pt.y * pt.y); if (r > maxR) maxR = r; }
  const sc = (W / 2 - 12) / maxR;
  if (showTrail) {
    for (let i = 1; i < trail.length; i++) {
      const a = Math.floor((i / trail.length) * 220).toString(16).padStart(2, '0');
      ctx.strokeStyle = col + a; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(cx + trail[i - 1].x * sc, cy - trail[i - 1].y * sc);
      ctx.lineTo(cx + trail[i].x * sc, cy - trail[i].y * sc); ctx.stroke();
    }
  } else {
    ctx.strokeStyle = col + 'cc'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx + trail[0].x * sc, cy - trail[0].y * sc);
    for (const pt of trail) ctx.lineTo(cx + pt.x * sc, cy - pt.y * sc);
    ctx.stroke();
  }
  const last = trail[trail.length - 1];
  ctx.shadowColor = col; ctx.shadowBlur = 8; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(cx + last.x * sc, cy - last.y * sc, 4, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = col + '88'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
  ctx.fillText(`A≈${(maxR * 1e6).toFixed(2)}μm`, W - 3, H - 3);
}

export default function DesequilibrioRotor() {
  const cvMainRef = useRef<HTMLCanvasElement>(null);
  const cvOLRef   = useRef<HTMLCanvasElement>(null);
  const cvORRef   = useRef<HTMLCanvasElement>(null);

  // All mutable state lives in a single ref — no React state in the hot path
  const stateRef = useRef({
    mode: 'static' as 'static' | 'dynamic',
    playing: true, trail: true,
    rpm: 600, escala: 80,
    m1: 50, r1: 30, phi1: 0, z1: 50,
    dm1: 50, dr1: 30, dphi1: 0, dz1: 25,
    dm2: 50, dr2: 30, dphi2: 180, dz2: 75,
    time: 0, lastTS: null as number | null,
    trailL: [] as { x: number; y: number }[],
    trailR: [] as { x: number; y: number }[],
  });

  // React state only for controls (re-render on user action, not every frame)
  const [mode, setModeUI]     = useState<'static' | 'dynamic'>('static');
  const [playing, setPlayingUI] = useState(true);
  const [trail, setTrailUI]   = useState(true);
  const [rpm, setRpmUI]       = useState(600);
  const [escala, setEscalaUI] = useState(80);
  const [m1, setM1UI]   = useState(50);
  const [r1, setR1UI]   = useState(30);
  const [phi1, setPhi1UI] = useState(0);
  const [z1, setZ1UI]   = useState(50);
  const [dm1, setDm1UI]   = useState(50);
  const [dr1, setDr1UI]   = useState(30);
  const [dphi1, setDphi1UI] = useState(0);
  const [dz1, setDz1UI]   = useState(25);
  const [dm2, setDm2UI]   = useState(50);
  const [dr2, setDr2UI]   = useState(30);
  const [dphi2, setDphi2UI] = useState(180);
  const [dz2, setDz2UI]   = useState(75);

  // Readout DOM refs (updated directly, no setState)
  const roAmpL   = useRef<HTMLSpanElement>(null);
  const roAmpR   = useRef<HTMLSpanElement>(null);
  const roPhase  = useRef<HTMLSpanElement>(null);
  const roFLpeak = useRef<HTMLSpanElement>(null);
  const roFRpeak = useRef<HTMLSpanElement>(null);
  const roUtot   = useRef<HTMLSpanElement>(null);

  // Helpers to set params and sync ref
  const set = <K2 extends keyof typeof stateRef.current>(key: K2, val: typeof stateRef.current[K2]) => {
    (stateRef.current as any)[key] = val;
    stateRef.current.trailL = [];
    stateRef.current.trailR = [];
  };

  const getMasses = (): Mass[] => {
    const s = stateRef.current;
    if (s.mode === 'static') return [{ m: s.m1 / 1000, r: s.r1 / 1000, phi: s.phi1 * Math.PI / 180, z: s.z1 / 100 }];
    return [
      { m: s.dm1 / 1000, r: s.dr1 / 1000, phi: s.dphi1 * Math.PI / 180, z: s.dz1 / 100 },
      { m: s.dm2 / 1000, r: s.dr2 / 1000, phi: s.dphi2 * Math.PI / 180, z: s.dz2 / 100 },
    ];
  };

  // Animation loop — pure canvas, no setState
  useEffect(() => {
    let rafId: number;
    let frameCount = 0;

    const frame = (ts: number) => {
      const s = stateRef.current;
      if (!s.lastTS) s.lastTS = ts;
      const dt = Math.min((ts - s.lastTS) / 1000, 0.05);
      s.lastTS = ts;
      if (s.playing) s.time += dt;

      const masses = getMasses();
      const st = computeState(masses, s.rpm, s.time);

      if (s.playing) {
        s.trailL.push({ x: st.dLx, y: st.dLy });
        s.trailR.push({ x: st.dRx, y: st.dRy });
        if (s.trailL.length > TRAIL_MAX) s.trailL.shift();
        if (s.trailR.length > TRAIL_MAX) s.trailR.shift();
      }

      // ── Main canvas ──
      const cvMain = cvMainRef.current;
      if (cvMain) {
        const ctx = cvMain.getContext('2d')!;
        const W = cvMain.width, H = cvMain.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#06061a'; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#0d0d24'; ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
        for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

        const margin = 90, shaftPx = W - 2 * margin, cy2 = H * 0.52, SR = 7;
        const disp = shaftPx * s.escala * 1000;
        const bLx = margin, bRx = margin + shaftPx;
        const bLy = cy2 - st.dLx * disp, bRy = cy2 - st.dRx * disp;
        const zX = (z: number) => margin + z * shaftPx;
        const sY = (z: number) => bLy + (bRy - bLy) * z;

        ctx.setLineDash([4, 6]); ctx.strokeStyle = '#1a1a40'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(bLx, cy2); ctx.lineTo(bRx, cy2); ctx.stroke(); ctx.setLineDash([]);

        ctx.shadowColor = '#3060aa'; ctx.shadowBlur = 8;
        ctx.lineWidth = SR * 2; ctx.strokeStyle = '#1e2e60';
        ctx.beginPath(); ctx.moveTo(bLx, sY(0));
        for (let zi = 0; zi <= 1; zi += 0.05) ctx.lineTo(zX(zi), sY(zi));
        ctx.stroke();
        ctx.lineWidth = SR * 0.5; ctx.strokeStyle = '#3a5a90';
        ctx.beginPath(); ctx.moveTo(bLx, sY(0) - SR * 0.35);
        for (let zi = 0; zi <= 1; zi += 0.05) ctx.lineTo(zX(zi), sY(zi) - SR * 0.35);
        ctx.stroke(); ctx.shadowBlur = 0;

        const cols = ['#4a90ff', '#ff6060'];
        for (let i = 0; i < st.mfArr.length; i++) {
          const mf = st.mfArr[i], c = cols[i % 2];
          const dx = zX(mf.z), dy = sY(mf.z), DR = Math.min(H * 0.22, 38);
          ctx.shadowColor = c; ctx.shadowBlur = 10; ctx.strokeStyle = c; ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.ellipse(dx, dy, 5, DR, 0, 0, Math.PI * 2);
          ctx.fillStyle = c + '18'; ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
          const mx = dx + Math.sin(mf.ang) * 4, my = dy - Math.cos(mf.ang) * DR * 0.75;
          ctx.shadowColor = c; ctx.shadowBlur = 14; ctx.fillStyle = c;
          ctx.beginPath(); ctx.arc(mx, my, 5.5, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = c + '99'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(mx, my); ctx.stroke();
          ctx.fillStyle = c + 'cc'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(s.mode === 'static' ? 'Plano 1' : `Plano ${i + 1}`, dx, dy + DR + 16);
        }

        drawBearingSupport(ctx, bLx, cy2, '#5a9aff', 'Cojinete Izq.');
        drawBearingSupport(ctx, bRx, cy2, '#ff7070', 'Cojinete Der.');
        for (const [bx, by, c] of [[bLx, bLy, '#5a9aff'], [bRx, bRy, '#ff7070']] as [number, number, string][]) {
          ctx.shadowColor = c; ctx.shadowBlur = 12; ctx.fillStyle = c;
          ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#334455'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(classifyLabel(s), 12, 20);
      }

      // ── Orbit canvases ──
      const cvOL = cvOLRef.current, cvOR = cvORRef.current;
      if (cvOL) drawOrbit(cvOL.getContext('2d')!, cvOL.width, cvOL.height, s.trailL, '#5a9aff', s.trail);
      if (cvOR) drawOrbit(cvOR.getContext('2d')!, cvOR.width, cvOR.height, s.trailR, '#ff7070', s.trail);

      // ── Readout (direct DOM, ~6 Hz) ──
      frameCount++;
      if (frameCount % 10 === 0) {
        const Utot = masses.reduce((acc, m) => acc + m.m * 1000 * m.r * 1000, 0);
        if (roAmpL.current)   roAmpL.current.textContent   = st.ampL.toFixed(2);
        if (roAmpR.current)   roAmpR.current.textContent   = st.ampR.toFixed(2);
        if (roPhase.current)  roPhase.current.textContent  = st.phaseDiff.toFixed(0);
        if (roFLpeak.current) roFLpeak.current.textContent = st.FLpeak.toFixed(2);
        if (roFRpeak.current) roFRpeak.current.textContent = st.FRpeak.toFixed(2);
        if (roUtot.current)   roUtot.current.textContent   = Utot.toFixed(1);
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Resize canvases on mount
  useEffect(() => {
    const resize = () => {
      const cvMain = cvMainRef.current;
      if (cvMain?.parentElement) {
        cvMain.width  = cvMain.parentElement.clientWidth;
        cvMain.height = cvMain.parentElement.clientHeight;
      }
      const cvOL = cvOLRef.current, cvOR = cvORRef.current;
      if (cvOL?.parentElement && cvOR) {
        const sz = Math.max(80, Math.min(cvOL.parentElement.clientWidth - 10, cvOL.parentElement.clientHeight - 28));
        cvOL.width = cvOL.height = sz;
        cvOR.width = cvOR.height = sz;
      }
    };
    setTimeout(resize, 50);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* ── Controls ── */}
      <div style={{ width: 270, flexShrink: 0, background: '#0e0e20', borderRight: '1px solid #1e1e3e', overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>

        <div style={{ display: 'flex', gap: 4, background: '#070714', padding: 4, borderRadius: 8 }}>
          {(['static', 'dynamic'] as const).map(m => (
            <button key={m} onClick={() => { set('mode', m); setModeUI(m); stateRef.current.trailL = []; stateRef.current.trailR = []; }}
              style={{ flex: 1, padding: '7px 4px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78em', fontWeight: 600, lineHeight: 1.4,
                background: mode === m ? '#2a5090' : 'transparent', color: mode === m ? '#fff' : '#555' }}>
              {m === 'static' ? <>Estático<br /><span style={{ fontWeight: 400, fontSize: '0.85em' }}>(1 plano)</span></>
                              : <>Dinámico<br /><span style={{ fontWeight: 400, fontSize: '0.85em' }}>(2 planos)</span></>}
            </button>
          ))}
        </div>

        <Sec title="Velocidad de rotación">
          <Slide label="RPM" value={rpm} min={60} max={3000} unit="rpm" onChange={v => { set('rpm', v); setRpmUI(v); }} />
        </Sec>

        {mode === 'static' && (
          <Sec title="Masa de desequilibrio">
            <Slide label="Masa (g)"    value={m1}   min={0}   max={200} unit="g"  onChange={v => { set('m1', v);   setM1UI(v); }} />
            <Slide label="Radio (mm)"  value={r1}   min={1}   max={100} unit="mm" onChange={v => { set('r1', v);   setR1UI(v); }} />
            <Slide label="Ángulo (°)"  value={phi1} min={0}   max={359} unit="°"  onChange={v => { set('phi1', v); setPhi1UI(v); }} />
            <Slide label="Pos. axial"  value={z1}   min={5}   max={95}  unit="%"  onChange={v => { set('z1', v);   setZ1UI(v); }} />
          </Sec>
        )}

        {mode === 'dynamic' && (
          <Sec title="Masas de desequilibrio">
            <Badge col="#6ab4ff" bg="#0e2a4a" border="#1a4a7a">Plano 1</Badge>
            <Slide label="Masa (g)"   value={dm1}   min={0}  max={200} unit="g"  onChange={v => { set('dm1', v);   setDm1UI(v); }} />
            <Slide label="Radio (mm)" value={dr1}   min={1}  max={100} unit="mm" onChange={v => { set('dr1', v);   setDr1UI(v); }} />
            <Slide label="Ángulo (°)" value={dphi1} min={0}  max={359} unit="°"  onChange={v => { set('dphi1', v); setDphi1UI(v); }} />
            <Slide label="Pos. axial" value={dz1}   min={5}  max={45}  unit="%"  onChange={v => { set('dz1', v);   setDz1UI(v); }} />
            <Badge col="#ff9090" bg="#3a0e1a" border="#6a1a2a" style={{ marginTop: 8 }}>Plano 2</Badge>
            <Slide label="Masa (g)"   value={dm2}   min={0}  max={200} unit="g"  onChange={v => { set('dm2', v);   setDm2UI(v); }} />
            <Slide label="Radio (mm)" value={dr2}   min={1}  max={100} unit="mm" onChange={v => { set('dr2', v);   setDr2UI(v); }} />
            <Slide label="Ángulo (°)" value={dphi2} min={0}  max={359} unit="°"  onChange={v => { set('dphi2', v); setDphi2UI(v); }} />
            <Slide label="Pos. axial" value={dz2}   min={55} max={95}  unit="%"  onChange={v => { set('dz2', v);   setDz2UI(v); }} />
          </Sec>
        )}

        <Sec title="Visualización">
          <Slide label="Escala vib." value={escala} min={5} max={300} unit="×" onChange={v => { set('escala', v); setEscalaUI(v); }} />
          <label style={{ fontSize: '0.74em', color: '#889', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={trail} onChange={e => { stateRef.current.trail = e.target.checked; setTrailUI(e.target.checked); }} />
            Traza de órbita
          </label>
        </Sec>

        <button onClick={() => { stateRef.current.playing = !stateRef.current.playing; setPlayingUI(p => !p); }}
          style={{ width: '100%', padding: 8, borderRadius: 7, border: '1px solid', cursor: 'pointer', fontSize: '0.82em', fontWeight: 600,
            background: playing ? '#0e3a1e' : '#3a0e0e', borderColor: playing ? '#2a6a3a' : '#6a2a2a', color: playing ? '#6eff8a' : '#ff8a8a' }}>
          {playing ? '⏸  Pausar' : '▶  Reanudar'}
        </button>
        <button onClick={() => { stateRef.current.trailL = []; stateRef.current.trailR = []; }}
          style={{ width: '100%', padding: '5px 8px', borderRadius: 7, border: '1px solid #2a2a4a', cursor: 'pointer', fontSize: '0.75em', background: '#131328', color: '#778' }}>
          ↺  Limpiar órbitas
        </button>

        <Sec title="Resultados en tiempo real">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72em' }}>
            <tbody>
              {[
                ['Vib. izq.', roAmpL, 'μm'],
                ['Vib. der.', roAmpR, 'μm'],
                ['Δ fase', roPhase, '°'],
                ['F izq. (pico)', roFLpeak, 'N'],
                ['F der. (pico)', roFRpeak, 'N'],
                ['U total', roUtot, 'g·mm'],
              ].map(([lbl, ref, unit]) => (
                <tr key={lbl as string}>
                  <td style={{ color: '#6688aa', padding: '3px 5px', fontFamily: 'sans-serif' }}>{lbl as string}</td>
                  <td style={{ textAlign: 'right', padding: '3px 5px', fontFamily: 'monospace' }}>
                    <span ref={ref as React.RefObject<HTMLSpanElement>} style={{ color: '#aaccff' }}>—</span>
                    {' '}<span style={{ color: '#445566', fontSize: '0.85em' }}>{unit as string}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sec>

        <Sec title="Acerca de este modo">
          <p style={{ fontSize: '0.73em', color: '#7ab4ff', lineHeight: 1.7 }}>
            {mode === 'static'
              ? 'Una masa excéntrica genera una fuerza centrífuga en un plano. Ambos cojinetes vibran en fase. Las órbitas son iguales y en fase.'
              : 'Masas en dos planos generan fuerza resultante y/o par. Los cojinetes pueden vibrar con diferencia de fase. Masas opuestas (180°): par puro — vibración en antifase, F neta ≈ 0.'}
          </p>
        </Sec>
      </div>

      {/* ── Visualization ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: 10, overflow: 'hidden', background: '#07071a' }}>
        <div style={{ flex: 1, background: '#07071a', border: '1px solid #1a1a38', borderRadius: 8, position: 'relative', overflow: 'hidden', minHeight: 200 }}>
          <div style={{ position: 'absolute', top: 7, left: 11, fontSize: '0.65em', color: '#334', textTransform: 'uppercase', letterSpacing: 1 }}>Vista lateral del rotor</div>
          <canvas ref={cvMainRef} style={{ display: 'block' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, height: 210 }}>
          {[{ ref: cvOLRef, col: '#5a9aff', label: 'Órbita — Cojinete Izquierdo' }, { ref: cvORRef, col: '#ff7070', label: 'Órbita — Cojinete Derecho' }].map(({ ref, col, label }) => (
            <div key={label} style={{ flex: 1, background: '#07071a', border: '1px solid #1a1a38', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 6, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.68em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, color: col }}>{label}</div>
              <canvas ref={ref} style={{ display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function classifyLabel(s: { mode: string; dphi1: number; dphi2: number; dm1: number; dr1: number; dm2: number; dr2: number; dz1: number; dz2: number }) {
  if (s.mode === 'static') return 'Desequilibrio estático (1 plano)';
  const dp = Math.abs(s.dphi1 - s.dphi2) % 360, ad = dp > 180 ? 360 - dp : dp;
  if (ad < 15) return 'Desequilibrio estático generalizado (2 planos, en fase)';
  if (ad > 165 && Math.abs(s.dm1 * s.dr1 - s.dm2 * s.dr2) < 5 && Math.abs((s.dz1 / 100 - 0.5) + (s.dz2 / 100 - 0.5)) < 0.05)
    return 'Par puro / Momento (fuerzas opuestas, F neta ≈ 0)';
  return 'Desequilibrio dinámico general (fuerza + momento)';
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#131328', border: '1px solid #1e1e40', borderRadius: 8, padding: 10 }}>
      <div style={{ fontSize: '0.7em', color: '#6090cc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingBottom: 5, borderBottom: '1px solid #1e1e40', fontWeight: 600 }}>{title}</div>
      {children}
    </div>
  );
}

function Slide({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
      <label style={{ fontSize: '0.74em', color: '#889', minWidth: 76 }}>{label}</label>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ flex: 1, height: 3, accentColor: '#4a80c0' }} />
      <span style={{ fontSize: '0.72em', color: '#7aaeff', minWidth: 52, textAlign: 'right', fontFamily: 'monospace' }}>{value}{unit}</span>
    </div>
  );
}

function Badge({ col, bg, border, children, style }: { col: string; bg: string; border: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'inline-block', fontSize: '0.75em', fontWeight: 700, padding: '2px 8px', borderRadius: 4, marginBottom: 5, color: col, background: bg, border: `1px solid ${border}`, ...style }}>{children}</div>
  );
}
