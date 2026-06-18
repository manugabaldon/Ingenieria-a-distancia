import { useRef, useState, useEffect, useCallback } from 'react';

// Complex number helpers
const cSub = (a: [number, number], b: [number, number]): [number, number] => [a[0] - b[0], a[1] - b[1]];
const cMul = (a: [number, number], b: [number, number]): [number, number] => [
  a[0] * b[0] - a[1] * b[1],
  a[0] * b[1] + a[1] * b[0],
];
const cDiv = (a: [number, number], b: [number, number]): [number, number] => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};
const cMod = (a: [number, number]) => Math.sqrt(a[0] * a[0] + a[1] * a[1]);
const cArg = (a: [number, number]) => (Math.atan2(a[1], a[0]) * 180) / Math.PI;
const polar = (mag: number, deg: number): [number, number] => [
  mag * Math.cos((deg * Math.PI) / 180),
  mag * Math.sin((deg * Math.PI) / 180),
];

function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, label = '', lw = 2
) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 4) return;
  const ang = Math.atan2(dy, dx), hl = Math.min(14, len * 0.3);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color;
  ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(ang - 0.4), y2 - hl * Math.sin(ang - 0.4));
  ctx.lineTo(x2 - hl * Math.cos(ang + 0.4), y2 - hl * Math.sin(ang + 0.4));
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    ctx.fillText(label, x2 + nx * 18, y2 + ny * 18);
  }
  ctx.restore();
}

export default function BalanceoHelice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initial run
  const [a0, setA0] = useState(8.5);   // mm/s
  const [phi0, setPhi0] = useState(45); // deg

  // Trial mass
  const [wt, setWt] = useState(20);    // g
  const [thetaT, setThetaT] = useState(90); // deg

  // Trial run
  const [a1, setA1] = useState(6.2);
  const [phi1, setPhi1] = useState(112);

  // Calculation
  const V0 = polar(a0, phi0);
  const V1 = polar(a1, phi1);
  const E = cSub(V1, V0);                    // efecto de la masa de prueba
  const eM = cMod(E);

  // S = E / Wt  (sensitivity, as complex: Wt at angle thetaT)
  const Wt_c = polar(wt, thetaT);
  const S = cDiv(E, Wt_c);

  // Wc = -V0 / S
  const Wc_raw = cDiv(cMul([-1, 0], V0), S);
  const Wc_mag = cMod(Wc_raw);
  const Wc_ang = ((cArg(Wc_raw) % 360) + 360) % 360;

  const valid = eM > 0.01;

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0f1e';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(148,163,184,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let i = 0; i < H; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.3)'; ctx.font = '11px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('0°', cx + 60, cy - 6);
    ctx.textAlign = 'right'; ctx.fillText('90°', cx - 6, cy - 55);

    if (!valid) {
      ctx.fillStyle = '#f59e0b'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('E ≈ 0: las mediciones son iguales, comprueba los datos', cx, cy);
      return;
    }

    // Auto-scale
    const maxMag = Math.max(a0, a1, cMod(E), valid ? Wc_mag * 0.3 : 0, 1) * 1.2;
    const scale = Math.min(cx, cy) * 0.75 / maxMag;

    const toScreen = (v: [number, number]): [number, number] => [cx + v[0] * scale, cy - v[1] * scale];

    const [ox, oy] = [cx, cy];

    // V0 — vibración inicial
    const [v0x, v0y] = toScreen(V0);
    arrow(ctx, ox, oy, v0x, v0y, '#3b82f6', 'V₀', 2.5);

    // V1 — vibración con masa de prueba
    const [v1x, v1y] = toScreen(V1);
    arrow(ctx, ox, oy, v1x, v1y, '#06b6d4', 'V₁', 2.5);

    // E = V1 - V0 (vector desde V0 hasta V1)
    arrow(ctx, v0x, v0y, v1x, v1y, '#f59e0b', 'E', 2);

    // Wc — masa de corrección (escalada visualmente)
    const wcScale = scale * 0.3;
    const Wc_screen: [number, number] = [cx + Wc_raw[0] * wcScale, cy - Wc_raw[1] * wcScale];
    arrow(ctx, ox, oy, Wc_screen[0], Wc_screen[1], '#10b981', 'Wc', 2.5);

    // Leyenda
    const items = [
      { color: '#3b82f6', label: `V₀ = ${a0} mm/s  ∠${phi0}°` },
      { color: '#06b6d4', label: `V₁ = ${a1} mm/s  ∠${phi1}°` },
      { color: '#f59e0b', label: `E = ${eM.toFixed(2)} mm/s  ∠${(((cArg(E) % 360) + 360) % 360).toFixed(1)}°` },
      { color: '#10b981', label: `Wc = ${Wc_mag.toFixed(2)} g  ∠${Wc_ang.toFixed(1)}°` },
    ];
    items.forEach(({ color, label }, i) => {
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(18, 18 + i * 22, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e2e8f0'; ctx.font = '12px monospace'; ctx.textAlign = 'left';
      ctx.fillText(label, 30, 22 + i * 22);
    });
  }, [a0, phi0, a1, phi1, wt, thetaT, V0, V1, E, eM, Wc_raw, Wc_mag, Wc_ang, valid]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="sim-body">
      <div className="canvas-area">
        <canvas ref={canvasRef} width={660} height={440} />
        <div className="result-cards">
          <div className={`result-card ${valid ? 'result-ok' : 'result-warn'}`}>
            <div className="result-label">Masa de corrección</div>
            <div className="result-value">{valid ? `${Wc_mag.toFixed(2)} g` : '—'}</div>
          </div>
          <div className={`result-card ${valid ? 'result-ok' : 'result-warn'}`}>
            <div className="result-label">Ángulo de colocación</div>
            <div className="result-value">{valid ? `${Wc_ang.toFixed(1)}°` : '—'}</div>
          </div>
          <div className="result-card">
            <div className="result-label">Efecto masa prueba |E|</div>
            <div className="result-value">{eM.toFixed(2)} mm/s</div>
          </div>
        </div>
      </div>

      <div className="params-panel">
        <h3>Medición inicial</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Amplitud V₀ <span>{a0} mm/s</span></label>
            <input type="range" min={0.5} max={30} step={0.5} value={a0} onChange={e => setA0(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Fase φ₀ <span>{phi0}°</span></label>
            <input type="range" min={0} max={359} step={1} value={phi0} onChange={e => setPhi0(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Masa de prueba</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Masa Wt <span>{wt} g</span></label>
            <input type="range" min={1} max={100} step={1} value={wt} onChange={e => setWt(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Ángulo θt <span>{thetaT}°</span></label>
            <input type="range" min={0} max={359} step={1} value={thetaT} onChange={e => setThetaT(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <h3>Medición con masa prueba</h3>
        <div className="param-group">
          <div className="param-row">
            <label>Amplitud V₁ <span>{a1} mm/s</span></label>
            <input type="range" min={0.5} max={30} step={0.5} value={a1} onChange={e => setA1(Number(e.target.value))} />
          </div>
          <div className="param-row">
            <label>Fase φ₁ <span>{phi1}°</span></label>
            <input type="range" min={0} max={359} step={1} value={phi1} onChange={e => setPhi1(Number(e.target.value))} />
          </div>
        </div>

        <hr className="divider" />
        <div className="formula-box">
          <strong>Método vectorial (plano único):</strong><br />
          E = V₁ − V₀<br />
          S = E / Wt<br />
          Wc = −V₀ / S<br /><br />
          |Wc| = Wt · |V₀| / |E|<br />
          ∠Wc = ∠Wt + ∠V₀ − ∠E + 180°
        </div>
        <div className="info-box">
          Referencia: AMM 61-20 / EASA Part-66<br />
          Límite típico: {'<'} 0.2 in/s (≈ 5 mm/s)<br />
          Unidades: mm/s (velocidad vibración)
        </div>
      </div>
    </div>
  );
}
