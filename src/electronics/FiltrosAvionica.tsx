import { useRef, useEffect, useCallback, useState } from 'react';

type FilterType = 'LP-RC' | 'HP-RC' | 'BP-RLC' | 'LP-RLC';

function magnitude(f: number, type: FilterType, R: number, L: number, C: number): number {
  const w = 2 * Math.PI * f;
  if (type === 'LP-RC') {
    const fc = 1 / (2 * Math.PI * R * C);
    return 1 / Math.sqrt(1 + (f / fc) ** 2);
  }
  if (type === 'HP-RC') {
    const fc = 1 / (2 * Math.PI * R * C);
    return (f / fc) / Math.sqrt(1 + (f / fc) ** 2);
  }
  if (type === 'LP-RLC') {
    const w0 = 1 / Math.sqrt(L * C);
    const Q = w0 * L / R;
    const num = w0 * w0;
    const re = w0 * w0 - w * w;
    const im = w * w0 / Q;
    return num / Math.sqrt(re * re + im * im);
  }
  // BP-RLC
  const w0 = 1 / Math.sqrt(L * C);
  const Q = w0 * L / R;
  const re = 1 - (w0 / w) ** 2;
  const im = 1 / (Q * w / w0);
  return 1 / Math.sqrt(re * re + im * im);
}

function phase_deg(f: number, type: FilterType, R: number, L: number, C: number): number {
  const w = 2 * Math.PI * f;
  if (type === 'LP-RC') {
    const fc = 1 / (2 * Math.PI * R * C);
    return -Math.atan(f / fc) * 180 / Math.PI;
  }
  if (type === 'HP-RC') {
    const fc = 1 / (2 * Math.PI * R * C);
    return 90 - Math.atan(f / fc) * 180 / Math.PI;
  }
  if (type === 'LP-RLC') {
    const w0 = 1 / Math.sqrt(L * C);
    const Q = w0 * L / R;
    return -Math.atan((w * w0 / Q) / (w0 * w0 - w * w)) * 180 / Math.PI;
  }
  // BP-RLC
  const w0 = 1 / Math.sqrt(L * C);
  const Q = w0 * L / R;
  return -Math.atan((1 / (Q * w / w0)) / (1 - (w0 / w) ** 2)) * 180 / Math.PI;
}

const AVIONICS_PRESETS: Record<string, { type: FilterType; R: number; L: number; C: number; desc: string }> = {
  'Audio cabina (LPF 4 kHz)':   { type: 'LP-RC',  R: 3978,  L: 0.001,   C: 10e-9,   desc: 'Filtra ruido HF en headsets, intercom' },
  'Desacoplador ARINC 429 (LP)':{ type: 'LP-RC',  R: 100,   L: 0.001,   C: 100e-9,  desc: 'Bus de datos aviación, filtro de entrada' },
  'VOR/ILS (BPF 108-112 MHz)':  { type: 'BP-RLC', R: 5,     L: 22e-9,   C: 100e-12, desc: 'Navegación por radiofrecuencia VHF' },
  'Sensor presión (LP 10 Hz)':  { type: 'LP-RC',  R: 15915, L: 0.001,   C: 1e-6,    desc: 'Acondicionamiento señal sensor pitot/estático' },
  'Filtro ADS-B (1090 MHz BP)': { type: 'BP-RLC', R: 2,     L: 5e-9,    C: 45e-12,  desc: 'Vigilancia ADS-B Mode S, 1090 MHz' },
  'Filtro GPS (1575 MHz LP)':   { type: 'LP-RLC', R: 10,    L: 5e-9,    C: 22e-12,  desc: 'Frente de RF receptor GPS L1' },
  'Personalizado':               { type: 'LP-RC',  R: 1000,  L: 100e-6,  C: 100e-9,  desc: 'Ajusta los parámetros libremente' },
};

export default function FiltrosAvionica() {
  const magRef   = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<HTMLCanvasElement>(null);

  const [preset, setPreset] = useState('Sensor presión (LP 10 Hz)');
  const [ftype, setFtype]   = useState<FilterType>('LP-RC');
  const [R, setR]     = useState(15915);
  const [L, setL]     = useState(0.001);
  const [C, setC]     = useState(1e-6);

  const fc = ftype.includes('RC') ? 1 / (2 * Math.PI * R * C)
           : 1 / (2 * Math.PI * Math.sqrt(L * C));
  const Q  = ftype.includes('RLC') ? (1 / R) * Math.sqrt(L / C) : null;

  const drawBode = useCallback(() => {
    const magCanvas = magRef.current, phCanvas = phaseRef.current;
    if (!magCanvas || !phCanvas) return;

    const fMin = fc * 0.01, fMax = fc * 100;
    const N = 300;
    const freqs = Array.from({ length: N }, (_, i) => fMin * Math.pow(fMax / fMin, i / (N - 1)));
    const mags  = freqs.map(f => 20 * Math.log10(Math.max(magnitude(f, ftype, R, L, C), 1e-10)));
    const phases = freqs.map(f => phase_deg(f, ftype, R, L, C));

    const drawCanvas = (canvas: HTMLCanvasElement, data: number[], yLabel: string, color: string, yMin: number, yMax: number) => {
      const ctx = canvas.getContext('2d')!;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const pad = { l: 48, r: 20, t: 16, b: 32 };
      const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;

      // Background
      ctx.fillStyle = '#07091a'; ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = pad.l + (i / 10) * pw;
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ph); ctx.stroke();
      }
      for (let i = 0; i <= 5; i++) {
        const y = pad.t + (i / 5) * ph;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + pw, y); ctx.stroke();
        const val = yMax - i * (yMax - yMin) / 5;
        ctx.fillStyle = 'rgba(148,163,184,0.4)'; ctx.font = '9px Inter'; ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(0), pad.l - 4, y + 3);
      }
      ctx.restore();

      // Axes labels
      ctx.fillStyle = 'rgba(148,163,184,0.35)'; ctx.font = '9px Inter';
      ctx.textAlign = 'center'; ctx.fillText('Frecuencia (Hz) — escala logarítmica', pad.l + pw / 2, H - 4);
      ctx.save(); ctx.translate(12, pad.t + ph / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText(yLabel, 0, 0); ctx.restore();

      // Freq axis ticks
      const decades = Math.log10(fMax / fMin);
      for (let d = 0; d <= Math.ceil(decades); d++) {
        const f2 = fMin * Math.pow(10, d);
        if (f2 > fMax) break;
        const x = pad.l + (Math.log10(f2 / fMin) / Math.log10(fMax / fMin)) * pw;
        ctx.fillStyle = 'rgba(148,163,184,0.35)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
        ctx.fillText(f2 >= 1e6 ? `${(f2 / 1e6).toFixed(0)}M` : f2 >= 1e3 ? `${(f2 / 1e3).toFixed(0)}k` : f2.toFixed(0), x, pad.t + ph + 14);
      }

      // Curve
      ctx.save();
      const lineGrad = ctx.createLinearGradient(pad.l, 0, pad.l + pw, 0);
      lineGrad.addColorStop(0, color + '88');
      lineGrad.addColorStop(0.5, color);
      lineGrad.addColorStop(1, color + '88');
      ctx.strokeStyle = lineGrad; ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.shadowColor = color; ctx.shadowBlur = 6;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = pad.l + (Math.log10(freqs[i] / fMin) / Math.log10(fMax / fMin)) * pw;
        const y = pad.t + (1 - (v - yMin) / (yMax - yMin)) * ph;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke(); ctx.shadowBlur = 0; ctx.restore();

      // -3 dB / fc line
      const fcX = pad.l + (Math.log10(fc / fMin) / Math.log10(fMax / fMin)) * pw;
      ctx.save();
      ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(fcX, pad.t); ctx.lineTo(fcX, pad.t + ph); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`fc=${fc < 1e3 ? fc.toFixed(1) + 'Hz' : fc < 1e6 ? (fc / 1e3).toFixed(2) + 'kHz' : (fc / 1e6).toFixed(3) + 'MHz'}`, fcX, pad.t + ph + 26);
      ctx.restore();
    };

    drawCanvas(magCanvas, mags, 'Módulo (dB)', '#3b82f6', Math.min(...mags) - 5, 5);
    drawCanvas(phCanvas, phases, 'Fase (°)', '#10b981', -200, 200);
  }, [ftype, R, L, C, fc]);

  useEffect(() => { drawBode(); }, [drawBode]);

  useEffect(() => {
    const resize = () => {
      [magRef, phaseRef].forEach(ref => {
        const c = ref.current; if (!c?.parentElement) return;
        c.width = c.parentElement.clientWidth;
        c.height = c.parentElement.clientHeight;
      });
      drawBode();
    };
    setTimeout(resize, 30);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawBode]);

  const applyPreset = (key: string) => {
    const p = AVIONICS_PRESETS[key];
    if (!p) return;
    setPreset(key); setFtype(p.type); setR(p.R); setL(p.L); setC(p.C);
  };

  return (
    <div className="sim-body">
      <div className="canvas-area" style={{ padding: '1rem', gap: '0.6rem' }}>
        <div style={{ flex: 1, minHeight: 160, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: 12, fontSize: '0.65em', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Diagrama de Bode — Módulo</div>
          <canvas ref={magRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 12 }} />
        </div>
        <div style={{ flex: 1, minHeight: 140, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: 12, fontSize: '0.65em', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Diagrama de Bode — Fase</div>
          <canvas ref={phaseRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 12 }} />
        </div>
        <div className="result-cards">
          <div className="result-card result-ok">
            <div className="result-label">Frec. de corte</div>
            <div className="result-value" style={{ fontSize: '1.1rem' }}>
              {fc < 1e3 ? `${fc.toFixed(1)} Hz` : fc < 1e6 ? `${(fc / 1e3).toFixed(2)} kHz` : `${(fc / 1e6).toFixed(3)} MHz`}
            </div>
          </div>
          {Q !== null && <div className="result-card">
            <div className="result-label">Factor Q</div>
            <div className="result-value" style={{ fontSize: '1.1rem' }}>{Q.toFixed(2)}</div>
          </div>}
          <div className="result-card">
            <div className="result-label">Tipo</div>
            <div className="result-value" style={{ fontSize: '0.9rem' }}>{ftype}</div>
          </div>
          <div className="result-card">
            <div className="result-label">ω₀</div>
            <div className="result-value" style={{ fontSize: '1.1rem' }}>{(fc * 2 * Math.PI).toExponential(2)} rad/s</div>
          </div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Presets aviónica</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {Object.keys(AVIONICS_PRESETS).map(k => (
            <button key={k} onClick={() => applyPreset(k)}
              style={{ padding: '0.4rem 0.6rem', borderRadius: 7, border: '1px solid', textAlign: 'left', fontSize: '0.74rem', cursor: 'pointer', transition: 'all 0.15s',
                background: preset === k ? 'rgba(59,130,246,0.12)' : 'transparent',
                borderColor: preset === k ? 'rgba(59,130,246,0.4)' : 'var(--border)',
                color: preset === k ? 'var(--text)' : 'var(--text-2)' }}>
              {k}
            </button>
          ))}
        </div>

        <hr className="divider" />
        <h3>Tipo de filtro</h3>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {(['LP-RC', 'HP-RC', 'LP-RLC', 'BP-RLC'] as FilterType[]).map(t => (
            <button key={t} onClick={() => setFtype(t)}
              style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                background: ftype === t ? 'var(--blue)' : 'transparent',
                borderColor: ftype === t ? 'var(--blue)' : 'var(--border)',
                color: ftype === t ? '#fff' : 'var(--text-2)' }}>
              {t}
            </button>
          ))}
        </div>

        <hr className="divider" />
        <h3>Componentes</h3>
        <div className="param-group">
          <div className="param-row">
            <label>R <span>{R >= 1e3 ? `${(R / 1e3).toFixed(1)} kΩ` : `${R} Ω`}</span></label>
            <input type="range" min={1} max={100000} step={1} value={R} onChange={e => setR(Number(e.target.value))} />
          </div>
          {ftype.includes('RLC') && <>
            <div className="param-row">
              <label>L <span>{L >= 1e-3 ? `${(L * 1e3).toFixed(2)} mH` : `${(L * 1e6).toFixed(2)} μH`}</span></label>
              <input type="range" min={1e-9} max={1e-1} step={1e-9} value={L} onChange={e => setL(Number(e.target.value))} />
            </div>
            <div className="param-row">
              <label>C <span>{C >= 1e-6 ? `${(C * 1e6).toFixed(2)} μF` : C >= 1e-9 ? `${(C * 1e9).toFixed(2)} nF` : `${(C * 1e12).toFixed(2)} pF`}</span></label>
              <input type="range" min={1e-12} max={100e-6} step={1e-12} value={C} onChange={e => setC(Number(e.target.value))} />
            </div>
          </>}
          {!ftype.includes('RLC') && (
            <div className="param-row">
              <label>C <span>{C >= 1e-6 ? `${(C * 1e6).toFixed(2)} μF` : C >= 1e-9 ? `${(C * 1e9).toFixed(2)} nF` : `${(C * 1e12).toFixed(2)} pF`}</span></label>
              <input type="range" min={1e-12} max={100e-6} step={1e-12} value={C} onChange={e => setC(Number(e.target.value))} />
            </div>
          )}
        </div>

        <div className="info-box" style={{ fontSize: '0.74rem' }}>
          {AVIONICS_PRESETS[preset]?.desc}
        </div>
      </div>
    </div>
  );
}
