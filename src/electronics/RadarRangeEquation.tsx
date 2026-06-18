import { useRef, useEffect, useCallback, useState } from 'react';

// Rmax = [ (Pt * G² * λ² * σ) / ((4π)³ * Smin) ]^(1/4)
function radarRange(Pt: number, G_dB: number, freq_GHz: number, sigma: number, Smin_dBm: number): number {
  const G     = Math.pow(10, G_dB / 10);
  const lam   = 3e8 / (freq_GHz * 1e9);
  const Smin  = Math.pow(10, (Smin_dBm - 30) / 10); // dBm → W
  const num   = Pt * G * G * lam * lam * sigma;
  const den   = Math.pow(4 * Math.PI, 3) * Smin;
  return Math.pow(num / den, 0.25);
}

// Sidelobe pattern approximation (sinc² for a simple aperture)
function pattern(theta_deg: number, beamwidth_deg: number): number {
  const bw = beamwidth_deg * Math.PI / 180;
  const th = theta_deg * Math.PI / 180;
  const x = Math.PI * Math.sin(th) / bw;
  if (Math.abs(x) < 1e-9) return 1;
  const sinc = Math.sin(x) / x;
  return sinc * sinc;
}

const TARGETS: Record<string, number> = {
  'Pájaro pequeño':      0.01,
  'Persona': 1,
  'Avión ligero (Cessna)': 2,
  'Caza (F-16)': 5,
  'Airliner (B737)': 40,
  'Helicóptero': 3,
  'Misil cruise': 0.5,
  'Dron pequeño': 0.005,
};

export default function RadarRangeEquation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [Pt_kW,   setPt]    = useState(250);    // kW
  const [G_dB,    setG]     = useState(34);     // dBi
  const [freq,    setFreq]  = useState(9.4);    // GHz (X-band)
  const [sigma,   setSigma] = useState(5);      // m²
  const [Smin,    setSmin]  = useState(-110);   // dBm
  const [targetKey, setTarget] = useState('Avión ligero (Cessna)');

  const Pt = Pt_kW * 1e3;
  const lam = 3e8 / (freq * 1e9);
  const G_lin = Math.pow(10, G_dB / 10);
  const bw = 70 / (Math.PI * Math.sqrt(G_lin)); // approx HPBW in deg for circular aperture
  const bw_deg = bw * 180 / Math.PI;

  const sig = TARGETS[targetKey] ?? sigma;
  const Rmax = radarRange(Pt, G_dB, freq, sig, Smin);
  const RmaxKm = Rmax / 1000;

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W * 0.38, cy = H * 0.85;
    const Rscale = Math.min(cx * 0.88, cy * 0.88) / RmaxKm;

    // Range rings
    const rings = [RmaxKm * 0.25, RmaxKm * 0.5, RmaxKm * 0.75, RmaxKm];
    rings.forEach((r, i) => {
      ctx.save();
      ctx.strokeStyle = i === rings.length - 1 ? 'rgba(59,130,246,0.5)' : 'rgba(148,163,184,0.08)';
      ctx.lineWidth = i === rings.length - 1 ? 1.5 : 1;
      ctx.setLineDash(i === rings.length - 1 ? [] : [3, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, r * Rscale, -Math.PI, 0); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = i === rings.length - 1 ? '#3b82f6' : 'rgba(148,163,184,0.35)';
      ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`${r.toFixed(0)} km`, cx + r * Rscale + 2, cy - 4);
      ctx.restore();
    });

    // Beam pattern (upper half)
    const N = 360;
    ctx.save();
    ctx.beginPath();
    let first = true;
    for (let i = 0; i <= N; i++) {
      const th = (i / N) * 180 - 90; // -90 to +90 (upper half)
      const g = pattern(th, bw_deg);
      const r = g * RmaxKm * Rscale;
      const rad = (th - 90) * Math.PI / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, RmaxKm * Rscale);
    grad.addColorStop(0, 'rgba(59,130,246,0.25)');
    grad.addColorStop(1, 'rgba(59,130,246,0.04)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = 'rgba(59,130,246,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();

    // Radar position
    ctx.save();
    ctx.shadowColor = '#3b82f6'; ctx.shadowBlur = 14;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(148,163,184,0.6)'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('RADAR', cx, cy + 16);
    ctx.restore();

    // Example target at 60% range
    const tR = RmaxKm * 0.6 * Rscale;
    const tAngle = -65 * Math.PI / 180;
    const tx = cx + tR * Math.cos(tAngle), ty = cy + tR * Math.sin(tAngle);
    ctx.save();
    ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 10;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(tx, ty, 4, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(245,158,11,0.7)'; ctx.font = '9px Inter'; ctx.textAlign = 'left';
    ctx.fillText(targetKey, tx + 6, ty + 3);
    ctx.restore();

    // Ground line
    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.1)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.restore();

    // Info
    ctx.fillStyle = 'rgba(148,163,184,0.4)'; ctx.font = '10px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`Banda: ${freq >= 8 && freq <= 12 ? 'X' : freq >= 2 && freq < 4 ? 'S' : freq >= 1 && freq < 2 ? 'L' : '?'}-band  (${freq} GHz)`, 12, 18);
    ctx.fillText(`λ = ${(lam * 100).toFixed(2)} cm  |  HPBW ≈ ${bw_deg.toFixed(1)}°`, 12, 32);
  }, [RmaxKm, bw_deg, lam, freq, targetKey]);

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

  const bandLabel = freq >= 8 && freq <= 12 ? 'X-band (meteorología, navegación costera)'
    : freq >= 2 && freq < 4 ? 'S-band (ATC, vigilancia)'
    : freq >= 1 && freq < 2 ? 'L-band (ATC long-range, ADS-B)'
    : freq >= 4 && freq < 8 ? 'C-band (largo alcance)'
    : 'Banda personalizada';

  return (
    <div className="sim-body">
      <div className="canvas-area" style={{ padding: '1rem' }}>
        <div style={{ flex: 1, minHeight: 320, position: 'relative' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 14 }} />
        </div>
        <div className="result-cards">
          <div className="result-card result-ok">
            <div className="result-label">Alcance máximo</div>
            <div className="result-value">{RmaxKm.toFixed(1)} km</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: 2 }}>{(RmaxKm * 0.539957).toFixed(1)} nm</div>
          </div>
          <div className="result-card">
            <div className="result-label">Longitud de onda</div>
            <div className="result-value">{(lam * 100).toFixed(2)} cm</div>
          </div>
          <div className="result-card">
            <div className="result-label">Ancho de haz (HPBW)</div>
            <div className="result-value">{bw_deg.toFixed(1)}°</div>
          </div>
          <div className="result-card">
            <div className="result-label">Potencia tx</div>
            <div className="result-value">{Pt_kW} kW</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: 2 }}>{(10 * Math.log10(Pt) + 30).toFixed(1)} dBm</div>
          </div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Transmisor</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Potencia Pt <span>{Pt_kW} kW</span></label>
            <input type="range" min={1} max={2000} step={1} value={Pt_kW} onChange={e => setPt(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Ganancia G <span>{G_dB} dBi</span></label>
            <input type="range" min={10} max={50} step={0.5} value={G_dB} onChange={e => setG(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Frecuencia <span>{freq} GHz</span></label>
            <input type="range" min={0.1} max={35} step={0.1} value={freq} onChange={e => setFreq(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Receptor</h3>
        <div className="param-group">
          <div className="param-row">
            <label>S_min <span>{Smin} dBm</span></label>
            <input type="range" min={-140} max={-60} step={1} value={Smin} onChange={e => setSmin(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Objetivo (RCS)</h3>
        <div className="param-group">
          <div className="param-row">
            <label style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              Tipo de blanco
              <select value={targetKey} onChange={e => { setTarget(e.target.value); setSigma(TARGETS[e.target.value] ?? sigma); }}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: '0.35rem 0.5rem', fontSize: '0.8rem', width: '100%', marginTop: 4 }}>
                {Object.keys(TARGETS).map(k => <option key={k} value={k}>{k} — σ={TARGETS[k]} m²</option>)}
              </select>
            </label>
          </div>
          <div className="param-row">
            <label>σ (RCS) <span>{sig} m²</span></label>
            <input type="range" min={0.001} max={100} step={0.001} value={sig} onChange={e => setSigma(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <div className="formula-box">
          <strong>Ecuación del Radar (Friis)</strong><br />
          R_max = ⁴√[ Pt·G²·λ²·σ / (4π)³·Smin ]<br /><br />
          λ = c / f = {(lam * 100).toFixed(2)} cm<br />
          G = 10^(G_dBi/10) = {G_lin.toFixed(0)}<br />
        </div>
        <div className="info-box">
          {bandLabel}<br />
          Ref: ITU-R M.1849 · ICAO Annex 10
        </div>
      </div>
    </div>
  );
}
