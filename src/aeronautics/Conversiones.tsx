import { useState } from 'react';

interface ConvGroup {
  title: string;
  icon: string;
  units: { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
}

const GROUPS: ConvGroup[] = [
  {
    title: 'Velocidad',
    icon: '💨',
    units: [
      { label: 'kt (nudos)', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
      { label: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { label: 'm/s', toBase: v => v, fromBase: v => v },
      { label: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { label: 'ft/min', toBase: v => v * 0.00508, fromBase: v => v / 0.00508 },
    ],
  },
  {
    title: 'Distancia / Altitud',
    icon: '📏',
    units: [
      { label: 'ft (pies)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { label: 'm', toBase: v => v, fromBase: v => v },
      { label: 'nm (milla náutica)', toBase: v => v * 1852, fromBase: v => v / 1852 },
      { label: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { label: 'mi (milla terrestr.)', toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
    ],
  },
  {
    title: 'Presión',
    icon: '🌡',
    units: [
      { label: 'hPa / mbar', toBase: v => v * 100, fromBase: v => v / 100 },
      { label: 'Pa', toBase: v => v, fromBase: v => v },
      { label: 'psi', toBase: v => v * 6894.76, fromBase: v => v / 6894.76 },
      { label: 'inHg', toBase: v => v * 3386.39, fromBase: v => v / 3386.39 },
      { label: 'mmHg (torr)', toBase: v => v * 133.322, fromBase: v => v / 133.322 },
      { label: 'bar', toBase: v => v * 100000, fromBase: v => v / 100000 },
      { label: 'atm', toBase: v => v * 101325, fromBase: v => v / 101325 },
    ],
  },
  {
    title: 'Temperatura',
    icon: '🌡',
    units: [
      { label: '°C', toBase: v => v + 273.15, fromBase: v => v - 273.15 },
      { label: 'K', toBase: v => v, fromBase: v => v },
      { label: '°F', toBase: v => (v - 32) * 5 / 9 + 273.15, fromBase: v => (v - 273.15) * 9 / 5 + 32 },
      { label: '°R (Rankine)', toBase: v => v * 5 / 9, fromBase: v => v * 9 / 5 },
    ],
  },
  {
    title: 'Masa / Peso',
    icon: '⚖',
    units: [
      { label: 'kg', toBase: v => v, fromBase: v => v },
      { label: 'lb (libras)', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      { label: 'g', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { label: 'oz', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { label: 'ton (métrica)', toBase: v => v * 1000, fromBase: v => v / 1000 },
    ],
  },
];

function ConvCard({ group }: { group: ConvGroup }) {
  const [inputIdx, setInputIdx] = useState(0);
  const [value, setValue] = useState('1');

  const num = parseFloat(value);
  const base = isNaN(num) ? null : group.units[inputIdx].toBase(num);

  return (
    <div className="conv-card">
      <div className="conv-card-title">{group.icon} {group.title}</div>
      <div className="conv-input-row">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="conv-input"
        />
        <select
          value={inputIdx}
          onChange={e => setInputIdx(Number(e.target.value))}
          className="conv-select"
        >
          {group.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
        </select>
      </div>
      <div className="conv-results">
        {group.units.map((u, i) => {
          if (i === inputIdx) return null;
          const result = base !== null ? u.fromBase(base) : null;
          return (
            <div key={i} className="conv-result-row">
              <span className="conv-result-label">{u.label}</span>
              <span className="conv-result-value">
                {result !== null ? (Math.abs(result) >= 1000 ? result.toExponential(4) : result.toPrecision(6).replace(/\.?0+$/, '')) : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Conversiones() {
  return (
    <div style={{ padding: '1.5rem 2rem', overflow: 'auto', flex: 1 }}>
      <div className="conv-grid">
        {GROUPS.map(g => <ConvCard key={g.title} group={g} />)}
      </div>
    </div>
  );
}
