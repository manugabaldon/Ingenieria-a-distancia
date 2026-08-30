/**
 * CoordConverter.tsx — Conversor de coordenadas cartesianas ↔ cilíndricas ↔ esféricas
 *
 * Convenio (Cheng): cilíndricas (r, φ, z) con φ azimutal desde +x;
 * esféricas (R, θ, φ) con θ polar desde +z ∈ [0,π] y φ azimutal (igual que en cilíndricas).
 * Estrategia: cualquier sistema → cartesianas → cualquier sistema (consistencia garantizada).
 * Los azimutales/polar se calculan con atan2 para conservar el cuadrante.
 *
 * Representación 3D en SVG nativo (sin dependencias): vector posición + construcciones
 * geométricas de cada sistema; arrastrar sobre la escena para girarla.
 */
import { useMemo, useState, useRef } from 'react';
import { BlockMath } from '../components/Math';
import './CoordConverter.css';

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

type Sys = 'cart' | 'cyl' | 'sph';
type Unit = 'deg' | 'rad';
type Vec3 = [number, number, number];

const NAMES: Record<Sys, string> = { cart: 'Cartesianas', cyl: 'Cilíndricas', sph: 'Esféricas' };

const META: Record<Sys, { s: string; angle: boolean; u: string }[]> = {
  cart: [{ s: 'x', angle: false, u: 'eje X' }, { s: 'y', angle: false, u: 'eje Y' }, { s: 'z', angle: false, u: 'eje Z' }],
  cyl:  [{ s: 'r', angle: false, u: 'radial' }, { s: 'φ', angle: true, u: 'azimutal' }, { s: 'z', angle: false, u: 'altura' }],
  sph:  [{ s: 'R', angle: false, u: 'radial' }, { s: 'θ', angle: true, u: 'polar' }, { s: 'φ', angle: true, u: 'azimutal' }],
};

const PRESETS: { sys: Sys; v: Vec3; lbl: string }[] = [
  { sys: 'cart', v: [2, 3, 4], lbl: '(2, 3, 4)' },
  { sys: 'cart', v: [0, 0, 5], lbl: 'eje z (0,0,5)' },
  { sys: 'cyl',  v: [4, 90, 2], lbl: '(4, 90°, 2)' },
  { sys: 'sph',  v: [3, 45, 60], lbl: '(3, 45°, 60°)' },
  { sys: 'sph',  v: [5, 90, 0], lbl: 'ecuador (5, 90°, 0)' },
];

// ── conversiones ────────────────────────────────────────────────────────────
function cartToCyl(x: number, y: number, z: number): Vec3 {
  return [Math.hypot(x, y), Math.atan2(y, x), z];
}
function cartToSph(x: number, y: number, z: number): Vec3 {
  const R = Math.hypot(x, y, z);
  return [R, R === 0 ? 0 : Math.atan2(Math.hypot(x, y), z), Math.atan2(y, x)];
}
function toCart(sys: Sys, v: Vec3, unit: Unit): Vec3 {
  const m = unit === 'deg' ? D2R : 1;
  if (sys === 'cart') return [v[0], v[1], v[2]];
  if (sys === 'cyl') {
    const [r, ph, z] = [v[0], v[1] * m, v[2]];
    return [r * Math.cos(ph), r * Math.sin(ph), z];
  }
  const [R, th, ph] = [v[0], v[1] * m, v[2] * m];
  return [R * Math.sin(th) * Math.cos(ph), R * Math.sin(th) * Math.sin(ph), R * Math.cos(th)];
}
function rnd(v: number) { return Math.round(v * 1e6) / 1e6; }
function cartToRaw(sys: Sys, C: Vec3, unit: Unit): Vec3 {
  const [x, y, z] = C, k = unit === 'deg' ? R2D : 1;
  if (sys === 'cart') return [rnd(x), rnd(y), rnd(z)];
  if (sys === 'cyl') { const c = cartToCyl(x, y, z); return [rnd(c[0]), rnd(c[1] * k), rnd(c[2])]; }
  const s = cartToSph(x, y, z); return [rnd(s[0]), rnd(s[1] * k), rnd(s[2] * k)];
}

// ── formato ─────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (!isFinite(n)) return '—';
  if (Math.abs(n) < 1e-12) n = 0;
  const r = Math.round(n * 1e4) / 1e4;
  return Math.abs(r - Math.round(r)) < 1e-9
    ? String(Math.round(r))
    : r.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}
function fmtAng(rad: number, unit: Unit): { num: string; u: string } {
  return unit === 'deg' ? { num: fmt(rad * R2D), u: '°' } : { num: fmt(rad), u: ' rad' };
}

// ── fórmulas KaTeX por dirección (origen>destino) ─────────────────────────────
const FORMULAS: Record<string, string> = {
  'cart>cyl': String.raw`\begin{aligned} r &= \sqrt{x^2+y^2} \\ \varphi &= \operatorname{atan2}(y,\,x) \\ z &= z \end{aligned}`,
  'cart>sph': String.raw`\begin{aligned} R &= \sqrt{x^2+y^2+z^2} \\ \theta &= \operatorname{atan2}\!\left(\sqrt{x^2+y^2},\,z\right) \\ \varphi &= \operatorname{atan2}(y,\,x) \end{aligned}`,
  'cyl>cart': String.raw`\begin{aligned} x &= r\cos\varphi \\ y &= r\operatorname{sen}\varphi \\ z &= z \end{aligned}`,
  'cyl>sph': String.raw`\begin{aligned} R &= \sqrt{r^2+z^2} \\ \theta &= \operatorname{atan2}(r,\,z) \\ \varphi &= \varphi \end{aligned}`,
  'sph>cart': String.raw`\begin{aligned} x &= R\operatorname{sen}\theta\cos\varphi \\ y &= R\operatorname{sen}\theta\operatorname{sen}\varphi \\ z &= R\cos\theta \end{aligned}`,
  'sph>cyl': String.raw`\begin{aligned} r &= R\operatorname{sen}\theta \\ \varphi &= \varphi \\ z &= R\cos\theta \end{aligned}`,
};

function substLine(dir: string, C: Vec3, cyl: Vec3, sph: Vec3, unit: Unit): string {
  const [x, y, z] = C;
  const ang = (v: number) => { const a = fmtAng(v, unit); return a.num + a.u; };
  switch (dir) {
    case 'cart>cyl': return `r = √(${fmt(x)}² + ${fmt(y)}²) = ${fmt(cyl[0])}  ·  φ = ${ang(cyl[1])}  ·  z = ${fmt(z)}`;
    case 'cart>sph': return `R = √(${fmt(x)}²+${fmt(y)}²+${fmt(z)}²) = ${fmt(sph[0])}  ·  θ = ${ang(sph[1])}  ·  φ = ${ang(sph[2])}`;
    case 'cyl>cart': return `x = ${fmt(cyl[0])}·cos(${ang(cyl[1])}) = ${fmt(x)}  ·  y = ${fmt(y)}  ·  z = ${fmt(z)}`;
    case 'cyl>sph': return `R = √(${fmt(cyl[0])}²+${fmt(z)}²) = ${fmt(sph[0])}  ·  θ = ${ang(sph[1])}  ·  φ = ${ang(sph[2])}`;
    case 'sph>cart': return `x = ${fmt(x)}  ·  y = ${fmt(y)}  ·  z = ${fmt(z)}`;
    case 'sph>cyl': return `r = ${fmt(cyl[0])}  ·  φ = ${ang(cyl[1])}  ·  z = ${fmt(z)}`;
  }
  return '';
}

// ── vista 3D (SVG) ────────────────────────────────────────────────────────────
const VBW = 360, VBH = 320, CX = 180, CY = 170;
type Pt = { x: number; y: number };

function makeProject(az: number, el: number, scale: number) {
  const ca = Math.cos(az), sa = Math.sin(az), ce = Math.cos(el), se = Math.sin(el);
  return (p: Vec3): Pt => {
    const ax = p[0] * ca + p[1] * sa;
    const ay = -p[0] * sa + p[1] * ca;
    const up = ay * se + p[2] * ce;
    return { x: CX + ax * scale, y: CY - up * scale };
  };
}
function arcPoints(fn: (t: number) => Vec3, a0: number, a1: number, n: number): Vec3[] {
  const out: Vec3[] = [];
  for (let i = 0; i <= n; i++) out.push(fn(a0 + (a1 - a0) * i / n));
  return out;
}
const poly = (pts: Pt[]) => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

function Scene({ C, overlays, az, el }: { C: Vec3; overlays: Record<Sys, boolean>; az: number; el: number }) {
  const [x, y, z] = C;
  const cyl = cartToCyl(x, y, z), sph = cartToSph(x, y, z);
  const phi = cyl[1], th = sph[1];
  const mag = Math.max(Math.abs(x), Math.abs(y), Math.abs(z), sph[0], 1);
  const L = mag * 1.18, arcR = mag * 0.34, scale = 118 / L;
  const P = makeProject(az, el, scale);
  const O = P([0, 0, 0]), Pp = P([x, y, z]);

  const els: JSX.Element[] = [];
  let k = 0;
  const key = () => `e${k++}`;

  // plano xy + ejes de referencia
  const g = L;
  els.push(<polyline key={key()} className="cc-grid" points={poly([P([g, g, 0]), P([-g, g, 0]), P([-g, -g, 0]), P([g, -g, 0]), P([g, g, 0])])} />);
  els.push(<line key={key()} className="cc-grid" x1={P([-g, 0, 0]).x} y1={P([-g, 0, 0]).y} x2={P([g, 0, 0]).x} y2={P([g, 0, 0]).y} />);
  els.push(<line key={key()} className="cc-grid" x1={P([0, -g, 0]).x} y1={P([0, -g, 0]).y} x2={P([0, g, 0]).x} y2={P([0, g, 0]).y} />);

  const axis = (d: Vec3, lab: string) => {
    const a = P([-L * d[0], -L * d[1], -L * d[2]]);
    const b = P([L * d[0], L * d[1], L * d[2]]);
    const t = P([L * 1.12 * d[0], L * 1.12 * d[1], L * 1.12 * d[2]]);
    els.push(<line key={key()} className="cc-axis" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />);
    els.push(<text key={key()} className="cc-axis-label" x={t.x} y={t.y}>{lab}</text>);
  };
  axis([1, 0, 0], 'X'); axis([0, 1, 0], 'Y'); axis([0, 0, 1], 'Z');

  // componentes cartesianas
  if (overlays.cart) {
    els.push(<polyline key={key()} className="cc-cart-line" points={poly([O, P([x, 0, 0]), P([x, y, 0]), Pp])} />);
  }
  // construcción cilíndrica: r + z + arco φ
  if (overlays.cyl) {
    const foot = P([x, y, 0]);
    els.push(<line key={key()} className="cc-cyl-r" x1={O.x} y1={O.y} x2={foot.x} y2={foot.y} />);
    els.push(<line key={key()} className="cc-cyl-z" x1={foot.x} y1={foot.y} x2={Pp.x} y2={Pp.y} />);
    els.push(<polyline key={key()} className="cc-cyl-arc" points={poly(arcPoints(t => [arcR * Math.cos(t), arcR * Math.sin(t), 0], 0, phi, 44).map(P))} />);
    const pl = P([arcR * 1.35 * Math.cos(phi / 2), arcR * 1.35 * Math.sin(phi / 2), 0]);
    els.push(<text key={key()} className="cc-cyl-label" x={pl.x} y={pl.y}>φ</text>);
  }
  // construcción esférica: arco θ
  if (overlays.sph) {
    const cp = Math.cos(phi), sp = Math.sin(phi);
    els.push(<polyline key={key()} className="cc-sph-arc" points={poly(arcPoints(t => [arcR * Math.sin(t) * cp, arcR * Math.sin(t) * sp, arcR * Math.cos(t)], 0, th, 44).map(P))} />);
    const tl = P([arcR * 1.25 * Math.sin(th / 2) * cp, arcR * 1.25 * Math.sin(th / 2) * sp, arcR * 1.25 * Math.cos(th / 2)]);
    els.push(<text key={key()} className="cc-sph-label" x={tl.x} y={tl.y}>θ</text>);
  }

  // vector posición + flecha
  els.push(<line key={key()} className="cc-vec" x1={O.x} y1={O.y} x2={Pp.x} y2={Pp.y} />);
  const dx = Pp.x - O.x, dy = Pp.y - O.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
  const back = 13, wid = 5.5, bxp = Pp.x - ux * back, byp = Pp.y - uy * back, px = -uy, py = ux;
  els.push(<polygon key={key()} className="cc-vec-head" points={`${Pp.x.toFixed(1)},${Pp.y.toFixed(1)} ${(bxp + px * wid).toFixed(1)},${(byp + py * wid).toFixed(1)} ${(bxp - px * wid).toFixed(1)},${(byp - py * wid).toFixed(1)}`} />);
  els.push(<circle key={key()} className="cc-origin" cx={O.x} cy={O.y} r={2.6} />);
  els.push(<circle key={key()} className="cc-point" cx={Pp.x} cy={Pp.y} r={4.5} />);
  els.push(<text key={key()} className="cc-point-label" x={Pp.x + (Pp.x >= CX ? 12 : -12)} y={Pp.y - 12}>P</text>);

  return <svg viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet" className="cc-svg">{els}</svg>;
}

// ── componente principal ──────────────────────────────────────────────────────
export default function CoordConverter() {
  const [sys, setSys] = useState<Sys>('cart');
  const [unit, setUnit] = useState<Unit>('deg');
  const [raw, setRaw] = useState<Record<Sys, Vec3>>({
    cart: [2, 3, 4], cyl: [3.605551, 56.309932, 4], sph: [5.385165, 42.031112, 56.309932],
  });
  const [overlays, setOverlays] = useState<Record<Sys, boolean>>({ cart: true, cyl: true, sph: true });
  const [az, setAz] = useState(-0.92);
  const [el, setEl] = useState(0.34);
  const drag = useRef<{ on: boolean; x: number; y: number }>({ on: false, x: 0, y: 0 });

  const C = useMemo(() => toCart(sys, raw[sys], unit), [sys, raw, unit]);
  const cyl = useMemo(() => cartToCyl(C[0], C[1], C[2]), [C]);
  const sph = useMemo(() => cartToSph(C[0], C[1], C[2]), [C]);

  const setVal = (i: number, s: string) => {
    const v = parseFloat(s.replace(',', '.'));
    if (s.trim() === '' || isNaN(v)) return;
    setRaw(r => { const next = { ...r, [sys]: [...r[sys]] as Vec3 }; next[sys][i] = v; return next; });
  };
  const switchSys = (next: Sys) => {
    if (next === sys) return;
    setRaw(r => ({ ...r, [next]: cartToRaw(next, C, unit) }));
    setSys(next);
  };
  const switchUnit = (next: Unit) => {
    if (next === unit) return;
    const f = unit === 'deg' && next === 'rad' ? D2R : unit === 'rad' && next === 'deg' ? R2D : 1;
    setRaw(r => {
      const out = { ...r } as Record<Sys, Vec3>;
      (Object.keys(META) as Sys[]).forEach(sy => {
        out[sy] = META[sy].map((m, i) => (m.angle ? rnd(r[sy][i] * f) : r[sy][i])) as Vec3;
      });
      return out;
    });
    setUnit(next);
  };

  const onDown = (e: React.PointerEvent) => {
    drag.current = { on: true, x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    setAz(a => a - (e.clientX - drag.current.x) * 0.012);
    setEl(el2 => Math.max(-1.45, Math.min(1.45, el2 + (e.clientY - drag.current.y) * 0.012)));
    drag.current.x = e.clientX; drag.current.y = e.clientY;
  };
  const onUp = () => { drag.current.on = false; };

  const rows = (sy: Sys): [string, string, string][] => {
    if (sy === 'cart') return [['x', fmt(C[0]), ''], ['y', fmt(C[1]), ''], ['z', fmt(C[2]), '']];
    if (sy === 'cyl') { const p = fmtAng(cyl[1], unit); return [['r', fmt(cyl[0]), ''], ['φ', p.num, p.u], ['z', fmt(cyl[2]), '']]; }
    const t = fmtAng(sph[1], unit), f = fmtAng(sph[2], unit);
    return [['R', fmt(sph[0]), ''], ['θ', t.num, t.u], ['φ', f.num, f.u]];
  };

  return (
    <div className="cc-wrap">
      <div className="cc-grid-layout">
        {/* entrada */}
        <div className="cc-panel">
          <h3 className="cc-panel-title">Sistema de entrada</h3>
          <p className="cc-panel-hint">Elige el sistema, introduce las tres componentes y observa la conversión.</p>

          <div className="cc-seg" role="group" aria-label="Sistema de coordenadas">
            {(['cart', 'cyl', 'sph'] as Sys[]).map(sy => (
              <button key={sy} className={`cc-seg-btn cc-${sy}${sys === sy ? ' active' : ''}`}
                onClick={() => switchSys(sy)} aria-pressed={sys === sy}>
                {NAMES[sy]}<small>{META[sy].map(m => m.s).join(' · ')}</small>
              </button>
            ))}
          </div>

          <div className="cc-fields">
            {META[sys].map((f, i) => (
              <div className="cc-field" key={f.s}>
                <label>{f.s}<span className="cc-field-u">{f.u}{f.angle ? ` (${unit === 'deg' ? '°' : 'rad'})` : ''}</span></label>
                <input type="text" inputMode="decimal" value={raw[sys][i]}
                  onChange={e => setVal(i, e.target.value)} aria-label={f.s} />
              </div>
            ))}
          </div>

          <div className="cc-tools">
            <span className="cc-tools-lbl">Ángulos en</span>
            <div className="cc-unit" role="group" aria-label="Unidad de ángulo">
              <button className={unit === 'deg' ? 'active' : ''} onClick={() => switchUnit('deg')} aria-pressed={unit === 'deg'}>grados °</button>
              <button className={unit === 'rad' ? 'active' : ''} onClick={() => switchUnit('rad')} aria-pressed={unit === 'rad'}>radianes</button>
            </div>
          </div>

          <div className="cc-presets">
            <span className="cc-presets-lbl">Ejemplos rápidos</span>
            {PRESETS.map((p, i) => (
              <button key={i} className="cc-chip" title={NAMES[p.sys]}
                onClick={() => { setUnit('deg'); setRaw(r => ({ ...r, [p.sys]: p.v.slice() as Vec3 })); setSys(p.sys); }}>
                {p.lbl}
              </button>
            ))}
          </div>
        </div>

        {/* escena + lecturas */}
        <div className="cc-stage">
          <div className="cc-viewport">
            <div className="cc-scene" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
              <Scene C={C} overlays={overlays} az={az} el={el} />
              <span className="cc-hint">Arrastra para girar</span>
            </div>
            <div className="cc-overlays">
              {([['cart', 'Componentes x,y,z'], ['cyl', 'Construcción r, φ, z'], ['sph', 'Construcción R, θ']] as [Sys, string][]).map(([kk, lbl]) => (
                <label key={kk} className={`cc-ov cc-${kk}${overlays[kk] ? ' on' : ''}`}>
                  <input type="checkbox" checked={overlays[kk]} onChange={e => setOverlays(o => ({ ...o, [kk]: e.target.checked }))} />
                  <span className="cc-ov-dot" />{lbl}
                </label>
              ))}
            </div>
          </div>

          <div className="cc-readouts">
            {(['cart', 'cyl', 'sph'] as Sys[]).map(sy => {
              const isIn = sy === sys;
              const dir = `${sys}>${sy}`;
              return (
                <div key={sy} className={`cc-ro cc-${sy}`}>
                  <div className="cc-ro-bar" />
                  <div className="cc-ro-body">
                    <div className="cc-ro-head">
                      <span className="cc-ro-name">{NAMES[sy]}</span>
                      <span className={`cc-tag ${isIn ? 'in' : 'out'}`}>{isIn ? 'Entrada' : 'Salida'}</span>
                    </div>
                    <div className="cc-vals">
                      {rows(sy).map((r, i) => (
                        <div className="cc-val" key={i}>
                          <span className="cc-val-sym">{r[0]}</span>
                          <span className="cc-val-num">{r[1]}<span className="cc-val-u">{r[2]}</span></span>
                        </div>
                      ))}
                    </div>
                    <div className="cc-fx">
                      {isIn ? (
                        <><div className="cc-fx-lbl">Entrada</div><div className="cc-fx-entrada">Valores introducidos por ti.</div></>
                      ) : (
                        <><div className="cc-fx-lbl">Fórmula aplicada</div>
                          <BlockMath>{FORMULAS[dir]}</BlockMath>
                          <div className="cc-fx-sub">{substLine(dir, C, cyl, sph, unit)}</div></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="cc-foot">
        Convenio (Cheng): cilíndricas (r, φ, z), esféricas (R, θ, φ) con θ desde el eje +z y φ azimutal desde +x.
        Los azimutales se calculan con atan2 para conservar el cuadrante; φ ∈ (−180°, 180°], θ ∈ [0°, 180°].
      </p>
    </div>
  );
}
