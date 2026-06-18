import { useState } from 'react';
import { useRef, useEffect, useCallback } from 'react';

interface Station {
  id: number;
  name: string;
  arm: number;   // pulgadas desde datum
  weight: number; // lb
  fixed: boolean;
}

const DEFAULT_STATIONS: Station[] = [
  { id: 1, name: 'Avión vacío', arm: 85.0, weight: 1640, fixed: true },
  { id: 2, name: 'Piloto', arm: 80.5, weight: 170, fixed: false },
  { id: 3, name: 'Copiloto / Pasajero', arm: 80.5, weight: 0, fixed: false },
  { id: 4, name: 'Pasajeros traseros', arm: 118.1, weight: 0, fixed: false },
  { id: 5, name: 'Combustible', arm: 75.0, weight: 228, fixed: false },
  { id: 6, name: 'Equipaje', arm: 142.8, weight: 0, fixed: false },
];

// Envolvente típica Cessna 172S (Weight lbs vs CG inches)
const ENVELOPE = [
  { w: 1500, cgMin: 35.0, cgMax: 47.3 },
  { w: 1950, cgMin: 35.0, cgMax: 47.3 },
  { w: 2200, cgMin: 37.0, cgMax: 47.3 },
  { w: 2400, cgMin: 39.0, cgMax: 47.3 },
  { w: 2550, cgMin: 41.0, cgMax: 47.3 },
];
const MAX_WEIGHT = 2550;

function lbsToKg(lb: number) { return lb * 0.453592; }
function inToM(i: number) { return i * 0.0254; }

export default function PesoYCentrado() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stations, setStations] = useState<Station[]>(DEFAULT_STATIONS);

  const totalWeight = stations.reduce((s, st) => s + st.weight, 0);
  const totalMoment = stations.reduce((s, st) => s + st.arm * st.weight, 0);
  const cg = totalWeight > 0 ? totalMoment / totalWeight : 0;

  // CG in % MAC (example: MAC = 59.5 in, LEMAC = 35.0 in)
  const LEMAC = 35.0, MAC = 59.5;  // Cessna 172S typical
  const cgMac = ((cg - LEMAC) / MAC) * 100;

  const withinEnvelope = (() => {
    if (totalWeight > MAX_WEIGHT) return false;
    for (let i = 0; i < ENVELOPE.length - 1; i++) {
      const e = ENVELOPE[i], e2 = ENVELOPE[i + 1];
      if (totalWeight >= e.w && totalWeight <= e2.w) {
        const t = (totalWeight - e.w) / (e2.w - e.w);
        const minCG = e.cgMin + t * (e2.cgMin - e.cgMin);
        const maxCG = e.cgMax + t * (e2.cgMax - e.cgMax);
        return cg >= minCG && cg <= maxCG;
      }
    }
    return false;
  })();

  const updateWeight = (id: number, weight: number) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, weight } : s));
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0f1e'; ctx.fillRect(0, 0, W, H);

    const pad = { l: 60, r: 20, t: 20, b: 40 };
    const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;

    const cgMin = 33, cgMax = 50;
    const wMin = 1400, wMax = 2650;

    const tx = (cg: number) => pad.l + ((cg - cgMin) / (cgMax - cgMin)) * pw;
    const ty = (w: number) => pad.t + (1 - (w - wMin) / (wMax - wMin)) * ph;

    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 1;
    for (let cg2 = 34; cg2 <= 49; cg2 += 2) {
      ctx.beginPath(); ctx.moveTo(tx(cg2), pad.t); ctx.lineTo(tx(cg2), pad.t + ph); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(String(cg2), tx(cg2), pad.t + ph + 14);
    }
    for (let w = 1500; w <= 2600; w += 250) {
      ctx.beginPath(); ctx.moveTo(pad.l, ty(w)); ctx.lineTo(pad.l + pw, ty(w)); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(String(w), pad.l - 4, ty(w) + 4);
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('CG (pulgadas desde datum)', pad.l + pw / 2, H - 4);

    // Envelope
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(tx(ENVELOPE[0].cgMin), ty(ENVELOPE[0].w));
    ENVELOPE.forEach(e => ctx.lineTo(tx(e.cgMin), ty(e.w)));
    [...ENVELOPE].reverse().forEach(e => ctx.lineTo(tx(e.cgMax), ty(e.w)));
    ctx.closePath();
    ctx.fillStyle = 'rgba(16,185,129,0.12)'; ctx.fill();
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#10b981'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('ENVOLVENTE', tx(41), ty(2100));

    // Max weight line
    ctx.save(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(pad.l, ty(MAX_WEIGHT)); ctx.lineTo(pad.l + pw, ty(MAX_WEIGHT)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('MTOW 2550 lb', pad.l + 4, ty(MAX_WEIGHT) - 4);
    ctx.restore();

    // Current point
    if (totalWeight > 0) {
      const px = tx(cg), py = ty(totalWeight);
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = withinEnvelope ? '#3b82f6' : '#ef4444';
      ctx.fill(); ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
    }
  }, [cg, totalWeight, withinEnvelope]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas ref={canvasRef} width={560} height={380} />
        <div className="result-cards">
          <div className={`result-card ${withinEnvelope ? 'result-ok' : 'result-warn'}`}>
            <div className="result-label">Estado</div>
            <div className="result-value" style={{ fontSize: '1rem' }}>
              {totalWeight > MAX_WEIGHT ? 'SOBREPESO' : withinEnvelope ? 'DENTRO DE ENVOLVENTE' : 'FUERA DE ENVOLVENTE'}
            </div>
          </div>
          <div className="result-card">
            <div className="result-label">Peso total</div>
            <div className="result-value">{totalWeight.toFixed(0)} lb</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lbsToKg(totalWeight).toFixed(0)} kg</div>
          </div>
          <div className="result-card">
            <div className="result-label">CG</div>
            <div className="result-value">{cg.toFixed(2)}"</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inToM(cg).toFixed(3)} m  |  {cgMac.toFixed(1)}% MAC</div>
          </div>
          <div className="result-card">
            <div className="result-label">Momento total</div>
            <div className="result-value">{(totalMoment / 1000).toFixed(2)} klb·in</div>
          </div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Estaciones de carga</h3>
        <div className="param-group">
          {stations.map(st => (
            <div key={st.id} className="param-row">
              <label>
                {st.name}
                <span>{st.weight} lb</span>
              </label>
              {st.fixed ? (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Brazo: {st.arm}" — peso fijo
                </div>
              ) : (
                <input
                  type="range" min={0} max={st.name.includes('Combustible') ? 348 : st.name.includes('Equipaje') ? 120 : 300}
                  step={1} value={st.weight}
                  onChange={e => updateWeight(st.id, Number(e.target.value))}
                />
              )}
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>
                Momento: {(st.arm * st.weight).toFixed(0)} lb·in
              </div>
            </div>
          ))}
        </div>
        <hr className="divider" />
        <div className="info-box">
          Referencia: Cessna 172S POH §6<br />
          Datum: firewall (cara delantera)<br />
          MTOW: 2 550 lb (1 157 kg)<br />
          MAC: 59.5 in, LEMAC: 35.0 in
        </div>
      </div>
    </div>
  );
}
