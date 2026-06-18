import { useRef, useEffect, useCallback, useState } from 'react';

// ISA helpers
const T0 = 288.15, P0 = 101325, rho0 = 1.225, L = 0.0065, g = 9.80665, R = 287.05287, gamma = 1.4;

function isaAtFt(altFt: number) {
  const altM = altFt * 0.3048;
  let T: number, P: number;
  if (altM <= 11000) {
    T = T0 - L * altM;
    P = P0 * Math.pow(T / T0, g / (L * R));
  } else {
    const T11 = T0 - L * 11000;
    const P11 = P0 * Math.pow(T11 / T0, g / (L * R));
    T = T11;
    P = P11 * Math.exp(-g * (altM - 11000) / (R * T11));
  }
  const rho = P / (R * T);
  return { T, P, rho, a: Math.sqrt(gamma * R * T), sigma: rho / rho0 };
}

// CAS from qc using compressibility correction (subsonic)
function casFromQc(qc: number): number {
  const term = Math.pow(qc / P0 + 1, 2 / 7) - 1;
  if (term <= 0) return 0;
  return Math.sqrt(5 * P0 / rho0 * term);  // m/s
}

// TAS from CAS at altitude
function tasFromCas(cas_ms: number, alt_ft: number): number {
  const { P, rho } = isaAtFt(alt_ft);
  const qc = P0 * (Math.pow(1 + rho0 * cas_ms * cas_ms / (7 * P0), 7 / 2) - 1);
  // TAS from qc at altitude
  const term = Math.pow(qc / P + 1, 2 / 7) - 1;
  if (term <= 0) return 0;
  return Math.sqrt(5 * P / rho * term);
}

function mach(tas_ms: number, alt_ft: number): number {
  const { a } = isaAtFt(alt_ft);
  return tas_ms / a;
}

const ms2kt = (v: number) => v * 1.94384;
const kt2ms = (v: number) => v / 1.94384;

export default function PitotEstatico() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ias_kt, setIas] = useState(250);
  const [alt_ft, setAlt] = useState(35000);

  const { P, rho, T, a, sigma } = isaAtFt(alt_ft);
  const ias_ms = kt2ms(ias_kt);

  // Dynamic pressure (incompressible IAS)
  const q_dyn = 0.5 * rho0 * ias_ms * ias_ms;
  // Total impact pressure (compressible, pitot)
  const qc = P0 * (Math.pow(1 + ias_ms * ias_ms * rho0 / (7 * P0), 3.5) - 1);

  // CAS
  const cas_ms = casFromQc(qc);
  const cas_kt = ms2kt(cas_ms);

  // TAS
  const tas_ms = tasFromCas(cas_ms, alt_ft);
  const tas_kt = ms2kt(tas_ms);

  // EAS = TAS * sqrt(sigma)
  const eas_kt = tas_kt * Math.sqrt(sigma);

  // Mach
  const M = mach(tas_ms, alt_ft);

  const drawGauge = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const gauges = [
      { label: 'IAS', value: ias_kt, max: 450, unit: 'kt', color: '#3b82f6' },
      { label: 'CAS', value: cas_kt, max: 450, unit: 'kt', color: '#06b6d4' },
      { label: 'TAS', value: tas_kt, max: 600, unit: 'kt', color: '#10b981' },
      { label: 'EAS', value: eas_kt, max: 450, unit: 'kt', color: '#8b5cf6' },
    ];

    const gW = W / gauges.length;
    const cx_base = gW / 2;
    const cy = H * 0.52;
    const R_gauge = Math.min(gW * 0.36, cy * 0.78);
    const startAng = Math.PI * 0.75, endAng = Math.PI * 2.25;

    gauges.forEach((g, i) => {
      const cx = cx_base + i * gW;
      const ratio = Math.min(g.value / g.max, 1);
      const sweepAng = startAng + ratio * (endAng - startAng);

      // Background arc
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx, cy, R_gauge, startAng, endAng); ctx.stroke();

      // Value arc
      const arcGrad = ctx.createLinearGradient(cx - R_gauge, cy, cx + R_gauge, cy);
      arcGrad.addColorStop(0, g.color + '88');
      arcGrad.addColorStop(1, g.color);
      ctx.strokeStyle = arcGrad; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.shadowColor = g.color; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(cx, cy, R_gauge, startAng, sweepAng); ctx.stroke();
      ctx.shadowBlur = 0; ctx.restore();

      // Tick marks
      for (let t2 = 0; t2 <= 10; t2++) {
        const ang = startAng + (t2 / 10) * (endAng - startAng);
        const inner = R_gauge - (t2 % 5 === 0 ? 14 : 8);
        ctx.save();
        ctx.strokeStyle = t2 % 5 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = t2 % 5 === 0 ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(cx + (R_gauge + 2) * Math.cos(ang), cy + (R_gauge + 2) * Math.sin(ang));
        ctx.lineTo(cx + inner * Math.cos(ang), cy + inner * Math.sin(ang));
        ctx.stroke(); ctx.restore();
        if (t2 % 5 === 0) {
          const val = Math.round(g.max * t2 / 10);
          const lx = cx + (R_gauge - 24) * Math.cos(ang), ly = cy + (R_gauge - 24) * Math.sin(ang);
          ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.font = `${R_gauge * 0.16}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(String(val), lx, ly);
        }
      }

      // Needle
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(sweepAng);
      const needleLen = R_gauge - 12;
      ctx.strokeStyle = '#f0f2f7'; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.shadowColor = '#fff'; ctx.shadowBlur = 4;
      ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(needleLen, 0); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = g.color;
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // Value text
      ctx.save();
      ctx.fillStyle = g.color; ctx.font = `bold ${R_gauge * 0.26}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(g.value.toFixed(1), cx, cy + R_gauge * 0.05);
      ctx.fillStyle = 'rgba(148,163,184,0.6)'; ctx.font = `${R_gauge * 0.15}px Inter`;
      ctx.fillText(g.unit, cx, cy + R_gauge * 0.25);
      ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = `bold ${R_gauge * 0.17}px Inter`;
      ctx.fillText(g.label, cx, cy - R_gauge * 0.85);
      ctx.restore();
    });

    // Mach indicator
    ctx.save();
    const mColor = M > 0.8 ? '#ef4444' : M > 0.6 ? '#f59e0b' : '#10b981';
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(W / 2 - 70, H - 44, 140, 32, 8); ctx.fill();
    ctx.fillStyle = mColor; ctx.font = 'bold 18px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`M = ${M.toFixed(4)}`, W / 2, H - 28);
    if (M > 0.8) { ctx.fillStyle = '#ef4444'; ctx.font = '11px Inter'; ctx.fillText('⚠ ZONA TRANSSÓNICA', W / 2, H - 10); }
    ctx.restore();
  }, [ias_kt, alt_ft, cas_kt, tas_kt, eas_kt, M]);

  useEffect(() => { drawGauge(); }, [drawGauge]);

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current; if (!c?.parentElement) return;
      c.width = c.parentElement.clientWidth;
      c.height = c.parentElement.clientHeight;
      drawGauge();
    };
    setTimeout(resize, 30);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawGauge]);

  return (
    <div className="sim-body">
      <div className="canvas-area" style={{ padding: '1rem' }}>
        <div style={{ flex: 1, minHeight: 260, position: 'relative' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 14 }} />
        </div>
        <div className="result-cards">
          {[
            { label: 'IAS', val: ias_kt.toFixed(1), unit: 'kt', color: '#3b82f6' },
            { label: 'CAS', val: cas_kt.toFixed(1), unit: 'kt', color: '#06b6d4' },
            { label: 'TAS', val: tas_kt.toFixed(1), unit: 'kt', color: '#10b981' },
            { label: 'EAS', val: eas_kt.toFixed(1), unit: 'kt', color: '#8b5cf6' },
            { label: 'Mach', val: M.toFixed(4), unit: '', color: M > 0.8 ? '#ef4444' : '#f59e0b' },
            { label: 'q_dyn', val: (q_dyn / 100).toFixed(1), unit: 'hPa', color: 'var(--text-2)' },
          ].map(r => (
            <div key={r.label} className="result-card">
              <div className="result-label">{r.label}</div>
              <div className="result-value" style={{ fontSize: '1.2rem', color: r.color }}>{r.val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{r.unit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="params-panel">
        <h3>Condiciones de vuelo</h3>
        <div className="param-group">
          <div className="param-row">
            <label>IAS <span>{ias_kt} kt</span></label>
            <input type="range" min={50} max={450} step={1} value={ias_kt} onChange={e => setIas(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Altitud <span>{alt_ft.toLocaleString()} ft</span></label>
            <input type="range" min={0} max={51000} step={500} value={alt_ft} onChange={e => setAlt(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Atmósfera ISA en vuelo</h3>
        <div className="formula-box" style={{ fontSize: '0.72rem' }}>
          T = {(T - 273.15).toFixed(1)} °C  ({T.toFixed(1)} K)<br />
          P = {(P / 100).toFixed(1)} hPa<br />
          ρ = {rho.toFixed(4)} kg/m³<br />
          a = {a.toFixed(1)} m/s  ({ms2kt(a).toFixed(0)} kt)<br />
          σ = ρ/ρ₀ = {sigma.toFixed(4)}
        </div>

        <hr className="divider" />
        <div className="formula-box">
          <strong>IAS → TAS (compresibilidad)</strong><br />
          qc = P₀[(1 + ρ₀V²/7P₀)^3.5 − 1]<br />
          TAS = √[5P/ρ · ((qc/P+1)^(2/7)−1)]<br /><br />
          <strong>EAS</strong><br />
          EAS = TAS · √(ρ/ρ₀)
        </div>
        <div className="info-box">
          IAS: indica el anemómetro (pitot)<br />
          CAS: corregida por posición e inst.<br />
          TAS: velocidad real respecto al aire<br />
          EAS: equivalente en nivel del mar<br />
          Ref: ICAO Doc 8643 · FAA AC 25-1629
        </div>
      </div>
    </div>
  );
}
