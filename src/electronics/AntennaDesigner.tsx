import { useRef, useEffect, useCallback, useState } from 'react';

// Friis: Pr = Pt + Gt + Gr - FSPL - losses  (all in dB)
// FSPL = 20·log10(4πd/λ)
function fspl_dB(d_km: number, freq_GHz: number): number {
  const lam = 3e8 / (freq_GHz * 1e9);
  return 20 * Math.log10((4 * Math.PI * d_km * 1000) / lam);
}

// Approximate antenna efficiency
function aperture_m2(G_dBi: number, freq_GHz: number): number {
  const lam = 3e8 / (freq_GHz * 1e9);
  const G = Math.pow(10, G_dBi / 10);
  return G * lam * lam / (4 * Math.PI);
}

// HPBW approximation for circular aperture
function hpbw(G_dBi: number): number {
  const G = Math.pow(10, G_dBi / 10);
  return (70 * Math.PI / 180) / Math.sqrt(G) * 180 / Math.PI;
}

// Radiation pattern: cos^n approximation
function patternDb(theta_deg: number, G_dBi: number): number {
  const bw = hpbw(G_dBi);
  const n = Math.log(0.5) / Math.log(Math.cos(bw * Math.PI / 180 / 2));
  const th = theta_deg * Math.PI / 180;
  const val = Math.pow(Math.max(Math.cos(th), 0), n);
  return 10 * Math.log10(Math.max(val, 1e-10)) + G_dBi;
}

const ANTENNA_TYPES: Record<string, { G: number; desc: string }> = {
  'Dipolo λ/2':            { G: 2.15,  desc: 'Omnidireccional, patrón toroidal' },
  'Yagi 5 elementos':      { G: 10,    desc: 'Directiva, usada en VHF/UHF' },
  'Bocina piramidal':      { G: 20,    desc: 'Microondas, referencia de calibración' },
  'Paraboloide (1 m)':     { G: 34,    desc: 'Radar, radioenlace' },
  'Paraboloide (3 m)':     { G: 43,    desc: 'Satélite, telemetría' },
  'Antena plana (patch)':  { G: 6,     desc: 'ADS-B, GPS, transponder' },
  'Array fase 64 elementos':{ G: 30,   desc: 'Radar AESA (phased array)' },
};

export default function AntennaDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [typeKey, setTypeKey] = useState('Paraboloide (1 m)');
  const [G_tx, setGtx] = useState(34);
  const [G_rx, setGrx] = useState(34);
  const [freq, setFreq] = useState(5.5);
  const [d_km, setDist] = useState(50);
  const [Pt_dBm, setPt] = useState(40);
  const [losses, setLosses] = useState(3);

  const lam_cm = (3e8 / (freq * 1e9)) * 100;
  const fspl = fspl_dB(d_km, freq);
  const Pr_dBm = Pt_dBm + G_tx + G_rx - fspl - losses;
  const bw_tx = hpbw(G_tx);
  const Aeff = aperture_m2(G_rx, freq);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H * 0.55;
    const Rmax = Math.min(cx * 0.82, cy * 0.82);
    const dB_range = 40;

    // Grid circles
    for (let db = 0; db <= dB_range; db += 10) {
      const r = Rmax * (1 - db / dB_range);
      ctx.save();
      ctx.strokeStyle = db === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      if (db > 0) {
        ctx.fillStyle = 'rgba(148,163,184,0.3)'; ctx.font = '9px Inter'; ctx.textAlign = 'left';
        ctx.fillText(`−${db} dB`, cx + r + 2, cy - 2);
      }
      ctx.restore();
    }

    // Axes
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    for (const ang of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const rad = ang * Math.PI / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Rmax * Math.cos(rad), cy + Rmax * Math.sin(rad)); ctx.stroke();
    }
    const labels: [number, string][] = [[0, '0°'], [90, '90°'], [180, '180°'], [270, '270°']];
    labels.forEach(([ang, lbl]) => {
      const rad = ang * Math.PI / 180;
      ctx.fillStyle = 'rgba(148,163,184,0.4)'; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(lbl, cx + (Rmax + 14) * Math.cos(rad), cy + (Rmax + 14) * Math.sin(rad));
    });
    ctx.restore();

    // Pattern
    const N = 720;
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const ang_deg = (i / N) * 360;
      const rad = ang_deg * Math.PI / 180;
      const gdb = patternDb(ang_deg > 180 ? 360 - ang_deg : ang_deg, G_tx);
      const norm = Math.max(0, 1 - (G_tx - gdb) / dB_range);
      const r = norm * Rmax;
      const x = cx + r * Math.cos(rad - Math.PI / 2);
      const y = cy + r * Math.sin(rad - Math.PI / 2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rmax);
    grad.addColorStop(0, 'rgba(59,130,246,0.3)');
    grad.addColorStop(1, 'rgba(59,130,246,0.04)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();

    // Main beam HPBW arc
    ctx.save();
    ctx.strokeStyle = 'rgba(16,185,129,0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    const bwRad = bw_tx * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, Rmax * 0.5, -Math.PI / 2 - bwRad / 2, -Math.PI / 2 + bwRad / 2);
    ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#10b981'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`HPBW: ${bw_tx.toFixed(1)}°`, cx, cy - Rmax * 0.56);
    ctx.restore();

    // Gain label
    ctx.fillStyle = '#3b82f6'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`${G_tx} dBi`, cx, cy + Rmax + 20);
  }, [G_tx, bw_tx]);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current; if (!c?.parentElement) return;
      c.width = c.parentElement.clientWidth;
      c.height = c.parentElement.clientHeight;
      draw();
    };
    setTimeout(resize, 30);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [draw]);

  const linkMargin = Pr_dBm - (-100); // assume -100 dBm sensitivity

  return (
    <div className="sim-body">
      <div className="canvas-area" style={{ padding: '1rem' }}>
        <div style={{ flex: 1, minHeight: 300, position: 'relative' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 14 }} />
        </div>
        <div className="result-cards">
          {[
            { label: 'Pr recibida', val: `${Pr_dBm.toFixed(1)} dBm`, ok: Pr_dBm > -90 },
            { label: 'FSPL', val: `${fspl.toFixed(1)} dB`, ok: true },
            { label: 'Margen de enlace', val: `${linkMargin.toFixed(1)} dB`, ok: linkMargin > 10 },
            { label: 'HPBW TX', val: `${bw_tx.toFixed(2)}°`, ok: true },
            { label: 'λ', val: `${lam_cm.toFixed(2)} cm`, ok: true },
            { label: 'Aef. RX', val: `${Aeff.toFixed(3)} m²`, ok: true },
          ].map(r => (
            <div key={r.label} className={`result-card ${r.ok ? '' : 'result-warn'}`}>
              <div className="result-label">{r.label}</div>
              <div className="result-value" style={{ fontSize: '1.1rem' }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="params-panel">
        <h3>Tipo de antena TX</h3>
        <div className="param-group">
          <div className="param-row">
            <label style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              Modelo
              <select value={typeKey} onChange={e => { setTypeKey(e.target.value); setGtx(ANTENNA_TYPES[e.target.value]?.G ?? G_tx); }}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: '0.35rem 0.5rem', fontSize: '0.78rem', width: '100%', marginTop: 4 }}>
                {Object.keys(ANTENNA_TYPES).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </label>
          </div>
          <div className="param-row">
            <label>G TX <span>{G_tx} dBi</span></label>
            <input type="range" min={2} max={50} step={0.5} value={G_tx} onChange={e => setGtx(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>G RX <span>{G_rx} dBi</span></label>
            <input type="range" min={2} max={50} step={0.5} value={G_rx} onChange={e => setGrx(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Enlace de radio</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Frecuencia <span>{freq} GHz</span></label>
            <input type="range" min={0.1} max={30} step={0.1} value={freq} onChange={e => setFreq(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Distancia <span>{d_km} km</span></label>
            <input type="range" min={1} max={500} step={1} value={d_km} onChange={e => setDist(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Pt <span>{Pt_dBm} dBm</span></label>
            <input type="range" min={0} max={60} step={1} value={Pt_dBm} onChange={e => setPt(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Pérdidas sistema <span>{losses} dB</span></label>
            <input type="range" min={0} max={20} step={0.5} value={losses} onChange={e => setLosses(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <div className="formula-box">
          <strong>Ecuación de Friis</strong><br />
          Pr = Pt + Gt + Gr − FSPL − L<br /><br />
          FSPL = 20·log(4πd/λ)<br />
          = {fspl.toFixed(1)} dB @ {d_km} km<br /><br />
          Aef = G·λ²/4π = {Aeff.toFixed(3)} m²
        </div>
        <div className="info-box" style={{ fontSize: '0.75rem' }}>{ANTENNA_TYPES[typeKey]?.desc}</div>
      </div>
    </div>
  );
}
