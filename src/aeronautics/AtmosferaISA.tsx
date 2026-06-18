import { useState } from 'react';

const T0 = 288.15;   // K
const P0 = 101325;   // Pa
const rho0 = 1.225;  // kg/m³
const L = 0.0065;    // K/m lapse rate (troposphere)
const g = 9.80665;
const R = 287.05287;
const gamma = 1.4;
const H_TROP = 11000; // m tropopause

function isaAt(altM: number) {
  let T: number, P: number;
  if (altM <= H_TROP) {
    T = T0 - L * altM;
    P = P0 * Math.pow(T / T0, g / (L * R));
  } else {
    const T11 = T0 - L * H_TROP;
    const P11 = P0 * Math.pow(T11 / T0, g / (L * R));
    T = T11;
    P = P11 * Math.exp(-g * (altM - H_TROP) / (R * T11));
  }
  const rho = P / (R * T);
  const a = Math.sqrt(gamma * R * T);
  const sigma = rho / rho0;
  return { T, P, rho, a, sigma };
}

function ftToM(ft: number) { return ft * 0.3048; }
function mToFt(m: number) { return m / 0.3048; }

export default function AtmosferaISA() {
  const [altFt, setAltFt] = useState(10000);
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');

  const altM = unit === 'ft' ? ftToM(altFt) : altFt;
  const displayAlt = unit === 'ft' ? altFt : altFt;
  const { T, P, rho, a, sigma } = isaAt(altM);

  const rows = [
    { label: 'Temperatura', value: `${(T - 273.15).toFixed(2)} °C`, sub: `${T.toFixed(2)} K` },
    { label: 'Presión', value: `${(P / 100).toFixed(2)} hPa`, sub: `${(P / 133.322).toFixed(2)} mmHg  |  ${(P / 6894.76).toFixed(4)} psi` },
    { label: 'Densidad ρ', value: `${rho.toFixed(4)} kg/m³`, sub: `σ = ρ/ρ₀ = ${sigma.toFixed(4)}` },
    { label: 'Velocidad del sonido', value: `${a.toFixed(1)} m/s`, sub: `${(a * 1.94384).toFixed(1)} kt` },
    { label: 'Altitud densidad', value: `${mToFt((1 - Math.pow(sigma, 1 / 0.234969)) / 6.8756e-6 * 1e-3 > 0 ? altM / sigma : altM).toFixed(0)} ft`, sub: 'Aprox. para pilotaje' },
  ];

  // Table for altitude sweep
  const sweepAlts = [0, 2000, 4000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 35000, 40000];

  return (
    <div className="sim-body" style={{ flexDirection: 'column', overflow: 'auto', padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Calculator */}
        <div style={{ flex: '1', minWidth: 280 }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className={`btn ${unit === 'ft' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setUnit('ft')}>ft</button>
              <button className={`btn ${unit === 'm' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setUnit('m')}>m</button>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Altitud: {displayAlt.toLocaleString()} {unit}  ({altM < H_TROP ? 'Troposfera' : 'Estratosfera'})
              </label>
              <input
                type="range" min={0} max={unit === 'ft' ? 65000 : 20000}
                step={unit === 'ft' ? 500 : 100}
                value={displayAlt}
                onChange={e => setAltFt(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {rows.map(r => (
              <div key={r.label} className="result-card result-ok" style={{ textAlign: 'left' }}>
                <div className="result-label">{r.label}</div>
                <div className="result-value" style={{ fontSize: '1.3rem' }}>{r.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.sub}</div>
              </div>
            ))}
          </div>

          <div className="formula-box" style={{ marginTop: '1.5rem' }}>
            <strong>ISA — Troposfera (0 – 11 000 m):</strong><br />
            T = 288.15 − 6.5·h/1000  [K]<br />
            P = 101325 · (T/288.15)^5.2561  [Pa]<br /><br />
            <strong>Estratosfera (11 000 – 20 000 m):</strong><br />
            T = 216.65 K  (isoterma)<br />
            P = 22632 · e^(−0.0001577·(h−11000))
          </div>
        </div>

        {/* Sweep table */}
        <div style={{ flex: '1', minWidth: 320 }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            Tabla ISA estándar
          </h3>
          <table className="isa-table">
            <thead>
              <tr>
                <th>Alt (ft)</th>
                <th>T (°C)</th>
                <th>P (hPa)</th>
                <th>ρ (kg/m³)</th>
                <th>a (kt)</th>
              </tr>
            </thead>
            <tbody>
              {sweepAlts.map(ft => {
                const m = ftToM(ft);
                const v = isaAt(m);
                const isActive = Math.abs(ft - altFt) < 1500 && unit === 'ft';
                return (
                  <tr key={ft} style={{ background: isActive ? 'rgba(59,130,246,0.12)' : undefined }}>
                    <td>{ft.toLocaleString()}</td>
                    <td>{(v.T - 273.15).toFixed(1)}</td>
                    <td>{(v.P / 100).toFixed(1)}</td>
                    <td>{v.rho.toFixed(4)}</td>
                    <td>{(v.a * 1.94384).toFixed(0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
