/**
 * GradientField.tsx — Visualizador del gradiente (Campos y Ondas · Tema 1)
 *
 * Entrada tipo calculadora V(x,y) + ejemplos. Vista cenital 2D (mapa de color,
 * equipotenciales por marching-squares, campo de flechas ∇V y punto sonda
 * arrastrable con tangente a la equipotencial y dirección dℓ) enlazada con una
 * superficie 3D z=V(x,y) rotable. Derivada direccional dV=∇V·dℓ y toggle E=−∇V.
 *
 * Derivadas: analíticas con math.derivative (+ simplify) y, si no es posible,
 * por diferencias centradas. Colores del gráfico hardcodeados a propósito
 * (series de datos), como el resto de simuladores; el chrome usa el tema.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { parse, derivative, simplify } from 'mathjs';
import type { EvalFunction } from 'mathjs';
import { BlockMath } from '../components/Math';
import './GradientField.css';

const DOM = 3.0; // dominio [-DOM, DOM] en x e y

type Vec = { x: number; y: number };

interface Field {
  fx: EvalFunction;
  dxF: EvalFunction | null;
  dyF: EvalFunction | null;
  dxStr: string;
  dyStr: string;
  lo: number;
  hi: number;
  gscale: number;
}

interface Example { name: string; expr: string }
const EXAMPLES: Example[] = [
  { name: 'Colina gaussiana', expr: 'exp(-(x^2+y^2))' },
  { name: 'Carga puntual V=1/r', expr: '1/sqrt(x^2+y^2+0.04)' },
  { name: 'Punto de silla', expr: 'x^2 - y^2' },
  { name: 'Plano inclinado', expr: '0.6*x + 0.4*y' },
  { name: 'Dipolo', expr: '1/sqrt((x-0.8)^2+y^2+0.04) - 1/sqrt((x+0.8)^2+y^2+0.04)' },
  { name: 'Ondulado', expr: 'sin(2*x)*cos(2*y)' },
  { name: 'Cuenco (valle)', expr: '0.5*(x^2+y^2)' },
];

// ── colores del gráfico (hardcodeados a propósito) ──
const LO: [number, number, number] = [31, 122, 114];   // teal (V bajo)
const MID: [number, number, number] = [243, 236, 221]; // crema (V medio)
const HI: [number, number, number] = [138, 45, 59];    // granate (V alto)
const INK = '42,32,21';
const C_ARROW = '#7a2e28'; // gradiente
const C_DL = '#1f7a72';    // dirección dℓ
const C_SURF = '#f7f0e0';  // relleno del punto sonda

function mix(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function colorFor(t: number): [number, number, number] {
  const u = Math.max(0, Math.min(1, t));
  return u < 0.5 ? mix(LO, MID, u * 2) : mix(MID, HI, (u - 0.5) * 2);
}

// ── construcción del campo ──
function buildField(expr: string): Field {
  const node = parse(expr);
  const fx = node.compile();
  const test = fx.evaluate({ x: 0.31, y: -0.22 });
  if (typeof test !== 'number') throw new Error('La expresión no da un número');

  let dxStr = '(numérico)', dyStr = '(numérico)';
  let dxF: EvalFunction | null = null;
  let dyF: EvalFunction | null = null;
  try {
    const dxN = simplify(derivative(node, 'x'));
    const dyN = simplify(derivative(node, 'y'));
    dxStr = dxN.toString();
    dyStr = dyN.toString();
    dxF = dxN.compile();
    dyF = dyN.compile();
  } catch {
    dxF = null; dyF = null;
  }

  // muestreo para lo/hi robustos (percentiles 2–98%)
  const G = 120;
  const vals: number[] = [];
  for (let j = 0; j <= G; j++) {
    const y = -DOM + (2 * DOM * j) / G;
    for (let i = 0; i <= G; i++) {
      const x = -DOM + (2 * DOM * i) / G;
      const v = safeEval(fx, x, y);
      if (isFinite(v)) vals.push(v);
    }
  }
  vals.sort((a, b) => a - b);
  let lo = vals[Math.floor(vals.length * 0.02)];
  let hi = vals[Math.floor(vals.length * 0.98)];
  if (!(hi > lo)) { hi = vals[vals.length - 1]; lo = vals[0]; }
  if (!(hi > lo)) hi = lo + 1;

  const f: Field = { fx, dxF, dyF, dxStr, dyStr, lo, hi, gscale: 1 };
  // escala de magnitud del gradiente (para longitud de flecha)
  let mx = 0;
  for (let k = 0; k < 60; k++) {
    const x = -DOM + 2 * DOM * Math.random();
    const y = -DOM + 2 * DOM * Math.random();
    const g = gradAt(f, x, y);
    const m = Math.hypot(g.x, g.y);
    if (isFinite(m) && m < 1e4) mx = Math.max(mx, m);
  }
  f.gscale = mx > 0 ? mx : 1;
  return f;
}

function safeEval(fn: EvalFunction, x: number, y: number): number {
  try {
    const v = fn.evaluate({ x, y });
    return typeof v === 'number' ? v : NaN;
  } catch {
    return NaN;
  }
}
function evalF(f: Field, x: number, y: number): number { return safeEval(f.fx, x, y); }

function gradAt(f: Field, x: number, y: number): Vec {
  const h = 1e-4;
  let gx = f.dxF ? safeEval(f.dxF, x, y) : NaN;
  let gy = f.dyF ? safeEval(f.dyF, x, y) : NaN;
  if (!(isFinite(gx))) gx = (evalF(f, x + h, y) - evalF(f, x - h, y)) / (2 * h);
  if (!(isFinite(gy))) gy = (evalF(f, x, y + h) - evalF(f, x, y - h)) / (2 * h);
  return { x: gx, y: gy };
}

function fmt(v: number): string {
  if (!isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a >= 100) return v.toFixed(0);
  if (a >= 10) return v.toFixed(1);
  if (a >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

export default function GradientField() {
  const [expr, setExpr] = useState('exp(-(x^2+y^2))');
  const [applied, setApplied] = useState('exp(-(x^2+y^2))');
  const [error, setError] = useState('');
  const [probe, setProbe] = useState<Vec>({ x: 0.9, y: 0.6 });
  const [dirDeg, setDirDeg] = useState(0);
  const [showE, setShowE] = useState(false);
  const [az, setAz] = useState(-32);
  const [el, setEl] = useState(34);

  const c2dRef = useRef<HTMLCanvasElement | null>(null);
  const c3dRef = useRef<HTMLCanvasElement | null>(null);
  const staticRef = useRef<HTMLCanvasElement | null>(null);
  const dimsRef = useRef({ w: 10, h: 10 });
  const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

  const field = useMemo<Field | null>(() => {
    try {
      const f = buildField(applied);
      setError('');
      return f;
    } catch (e) {
      setError('⚠ ' + ((e as Error).message || 'Expresión no válida') +
        '  ·  usa x, y, +, -, *, /, ^, sqrt, exp, sin, cos…');
      return null;
    }
  }, [applied]);

  // mantén la sonda en un punto válido al cambiar de campo
  useEffect(() => {
    if (field && !isFinite(evalF(field, probe.x, probe.y))) {
      setProbe({ x: 0.9, y: 0.6 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  // ── mapeos de coordenadas 2D ──
  const w2px = (x: number) => ((x + DOM) / (2 * DOM)) * dimsRef.current.w;
  const h2py = (y: number) => ((DOM - y) / (2 * DOM)) * dimsRef.current.h;
  const px2w = (px: number) => (px / dimsRef.current.w) * 2 * DOM - DOM;
  const py2w = (py: number) => DOM - (py / dimsRef.current.h) * 2 * DOM;

  // ── capa estática 2D (heatmap + equipotenciales + campo de flechas) ──
  const renderStatic = () => {
    const f = field; if (!f) return;
    const { w, h } = dimsRef.current;
    let sc = staticRef.current;
    if (!sc) { sc = document.createElement('canvas'); staticRef.current = sc; }
    sc.width = w; sc.height = h;
    const ctx = sc.getContext('2d'); if (!ctx) return;

    // heatmap a resolución media, escalado
    const N = 190;
    const img = ctx.createImageData(N, N);
    for (let j = 0; j < N; j++) {
      const y = DOM - (2 * DOM * j) / (N - 1);
      for (let i = 0; i < N; i++) {
        const x = -DOM + (2 * DOM * i) / (N - 1);
        const c = colorFor((evalF(f, x, y) - f.lo) / (f.hi - f.lo));
        const o = (j * N + i) * 4;
        img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255;
      }
    }
    const tmp = document.createElement('canvas'); tmp.width = N; tmp.height = N;
    tmp.getContext('2d')!.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tmp, 0, 0, w, h);

    // equipotenciales (marching squares)
    const M = 88, levels = 12;
    const gv = new Float64Array((M + 1) * (M + 1));
    for (let j = 0; j <= M; j++) {
      const y = -DOM + (2 * DOM * j) / M;
      for (let i = 0; i <= M; i++) gv[j * (M + 1) + i] = evalF(f, -DOM + (2 * DOM * i) / M, y);
    }
    ctx.lineWidth = Math.max(1, DPR * 0.8);
    ctx.strokeStyle = `rgba(${INK},0.28)`;
    for (let L = 1; L < levels; L++) {
      const level = f.lo + ((f.hi - f.lo) * L) / levels;
      ctx.beginPath();
      for (let jc = 0; jc < M; jc++) for (let ic = 0; ic < M; ic++) marchCell(ctx, gv, M, ic, jc, level, w, h);
      ctx.stroke();
    }

    // campo de flechas ∇V
    const K = 13;
    ctx.strokeStyle = `rgba(${INK},0.42)`;
    ctx.fillStyle = `rgba(${INK},0.42)`;
    ctx.lineWidth = Math.max(1, DPR * 0.9);
    for (let a = 0; a < K; a++) {
      for (let b = 0; b < K; b++) {
        const x = -DOM + (2 * DOM * (a + 0.5)) / K;
        const y = -DOM + (2 * DOM * (b + 0.5)) / K;
        const g = gradAt(f, x, y);
        const mag = Math.hypot(g.x, g.y);
        if (!isFinite(mag) || mag < 1e-6) continue;
        let ux = g.x / mag, uy = g.y / mag;
        if (showE) { ux = -ux; uy = -uy; }
        const len = ((2 * DOM) / K) * 0.42;
        arrowWorld(ctx, x - ux * len * 0.1, y - uy * len * 0.1, ux, uy, len, Math.max(3, DPR * 3));
      }
    }
  };

  const marchCell = (ctx: CanvasRenderingContext2D, gv: Float64Array, M: number, i: number, j: number, level: number, _w: number, _h: number) => {
    const x0 = w2px(-DOM + (2 * DOM * i) / M), x1 = w2px(-DOM + (2 * DOM * (i + 1)) / M);
    const y0 = h2py(-DOM + (2 * DOM * j) / M), y1 = h2py(-DOM + (2 * DOM * (j + 1)) / M);
    const tl = gv[(j + 1) * (M + 1) + i], tr = gv[(j + 1) * (M + 1) + i + 1];
    const br = gv[j * (M + 1) + i + 1], bl = gv[j * (M + 1) + i];
    let idx = 0;
    if (tl > level) idx |= 8;
    if (tr > level) idx |= 4;
    if (br > level) idx |= 2;
    if (bl > level) idx |= 1;
    if (idx === 0 || idx === 15) return;
    const T: [number, number] = [x0 + (x1 - x0) * ((level - tl) / (tr - tl)), y1];
    const R: [number, number] = [x1, y1 + (y0 - y1) * ((level - tr) / (br - tr))];
    const B: [number, number] = [x0 + (x1 - x0) * ((level - bl) / (br - bl)), y0];
    const Lf: [number, number] = [x0, y1 + (y0 - y1) * ((level - tl) / (bl - tl))];
    const seg = (p: [number, number], q: [number, number]) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
    switch (idx) {
      case 1: seg(Lf, B); break;
      case 2: seg(B, R); break;
      case 3: seg(Lf, R); break;
      case 4: seg(T, R); break;
      case 5: seg(Lf, T); seg(B, R); break;
      case 6: seg(T, B); break;
      case 7: seg(Lf, T); break;
      case 8: seg(Lf, T); break;
      case 9: seg(T, B); break;
      case 10: seg(T, R); seg(Lf, B); break;
      case 11: seg(T, R); break;
      case 12: seg(Lf, R); break;
      case 13: seg(B, R); break;
      case 14: seg(Lf, B); break;
      default: break;
    }
  };

  const arrowWorld = (ctx: CanvasRenderingContext2D, x: number, y: number, ux: number, uy: number, len: number, head: number) => {
    const px = w2px(x), py = h2py(y);
    const qx = w2px(x + ux * len), qy = h2py(y + uy * len);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke();
    const ang = Math.atan2(qy - py, qx - px);
    ctx.beginPath();
    ctx.moveTo(qx, qy);
    ctx.lineTo(qx - head * Math.cos(ang - 0.4), qy - head * Math.sin(ang - 0.4));
    ctx.lineTo(qx - head * Math.cos(ang + 0.4), qy - head * Math.sin(ang + 0.4));
    ctx.closePath(); ctx.fill();
  };

  // ── dibujo 2D dinámico ──
  const draw2d = () => {
    const f = field; const canvas = c2dRef.current; if (!f || !canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const { w, h } = dimsRef.current;
    ctx.clearRect(0, 0, w, h);
    if (staticRef.current) ctx.drawImage(staticRef.current, 0, 0);

    const g = gradAt(f, probe.x, probe.y);
    const mag = Math.hypot(g.x, g.y);
    const px = w2px(probe.x), py = h2py(probe.y);

    if (mag > 1e-7) {
      const ux = g.x / mag, uy = g.y / mag;
      const tx = -uy, ty = ux;
      // tangente a la equipotencial
      ctx.strokeStyle = `rgba(${INK},0.55)`;
      ctx.lineWidth = Math.max(1.5, DPR * 1.4);
      ctx.setLineDash([6 * DPR, 5 * DPR]);
      const tl = 1.1;
      ctx.beginPath();
      ctx.moveTo(w2px(probe.x - tx * tl), h2py(probe.y - ty * tl));
      ctx.lineTo(w2px(probe.x + tx * tl), h2py(probe.y + ty * tl));
      ctx.stroke(); ctx.setLineDash([]);
      // dirección dℓ
      const a = (dirDeg * Math.PI) / 180;
      ctx.strokeStyle = C_DL; ctx.fillStyle = C_DL;
      ctx.lineWidth = Math.max(2, DPR * 2);
      ctx.setLineDash([7 * DPR, 4 * DPR]);
      arrowWorld(ctx, probe.x, probe.y, Math.cos(a), Math.sin(a), 1.0, Math.max(6, DPR * 6));
      ctx.setLineDash([]);
      // gradiente (o E)
      let sx = ux, sy = uy; if (showE) { sx = -ux; sy = -uy; }
      ctx.strokeStyle = C_ARROW; ctx.fillStyle = C_ARROW;
      ctx.lineWidth = Math.max(3, DPR * 3.2);
      const gl = 0.55 + 0.9 * Math.min(1, mag / f.gscale);
      arrowWorld(ctx, probe.x, probe.y, sx, sy, gl, Math.max(9, DPR * 9));
    }
    // punto sonda
    ctx.beginPath(); ctx.arc(px, py, Math.max(6, DPR * 6), 0, 7);
    ctx.fillStyle = C_SURF; ctx.fill();
    ctx.lineWidth = Math.max(2.5, DPR * 2.5); ctx.strokeStyle = C_ARROW; ctx.stroke();
    ctx.beginPath(); ctx.arc(px, py, Math.max(2.4, DPR * 2.4), 0, 7); ctx.fillStyle = C_ARROW; ctx.fill();
  };

  // ── superficie 3D ──
  const NS = 30;
  const project = (x: number, y: number, z: number, w: number, h: number) => {
    const ar = (az * Math.PI) / 180, er = (el * Math.PI) / 180;
    const ca = Math.cos(ar), sa = Math.sin(ar);
    const X = x * ca - y * sa;
    const Yh = x * sa + y * ca;
    const ce = Math.cos(er), se = Math.sin(er);
    const Y = Yh * se + z * ce;
    const scale = (Math.min(w, h) / (2 * DOM)) * 0.62;
    return { sx: w / 2 + X * scale, sy: h * 0.6 - Y * scale, depth: Yh * ce + z * se };
  };

  const draw3d = () => {
    const f = field; const canvas = c3dRef.current; if (!f || !canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const span = (f.hi - f.lo) || 1;
    const Z = (v: number) => ((Math.max(f.lo, Math.min(f.hi, v)) - f.lo) / span - 0.5) * 2.0;

    const S: { x: number; y: number; v: number }[] = [];
    for (let j = 0; j <= NS; j++) {
      const y = -DOM + (2 * DOM * j) / NS;
      for (let i = 0; i <= NS; i++) {
        const x = -DOM + (2 * DOM * i) / NS;
        S[j * (NS + 1) + i] = { x, y, v: evalF(f, x, y) };
      }
    }
    interface Quad { pa: ReturnType<typeof project>; pb: ReturnType<typeof project>; pc: ReturnType<typeof project>; pd: ReturnType<typeof project>; mv: number; depth: number; slope: number }
    const quads: Quad[] = [];
    for (let j = 0; j < NS; j++) {
      for (let i = 0; i < NS; i++) {
        const a = S[j * (NS + 1) + i], b = S[j * (NS + 1) + i + 1];
        const c = S[(j + 1) * (NS + 1) + i + 1], d = S[(j + 1) * (NS + 1) + i];
        if (![a.v, b.v, c.v, d.v].every(isFinite)) continue;
        const pa = project(a.x, a.y, Z(a.v), w, h), pb = project(b.x, b.y, Z(b.v), w, h);
        const pc = project(c.x, c.y, Z(c.v), w, h), pd = project(d.x, d.y, Z(d.v), w, h);
        const slope = Math.abs(Z(b.v) - Z(a.v)) + Math.abs(Z(d.v) - Z(a.v));
        quads.push({ pa, pb, pc, pd, mv: (a.v + b.v + c.v + d.v) / 4, depth: (pa.depth + pb.depth + pc.depth + pd.depth) / 4, slope });
      }
    }
    quads.sort((p, q) => p.depth - q.depth);
    for (const Q of quads) {
      const col = colorFor((Q.mv - f.lo) / span);
      const sh = 1 - Math.min(0.4, Q.slope * 0.5);
      ctx.fillStyle = `rgb(${Math.round(col[0] * sh)},${Math.round(col[1] * sh)},${Math.round(col[2] * sh)})`;
      ctx.strokeStyle = `rgba(${INK},0.12)`;
      ctx.lineWidth = DPR * 0.5;
      ctx.beginPath();
      ctx.moveTo(Q.pa.sx, Q.pa.sy); ctx.lineTo(Q.pb.sx, Q.pb.sy);
      ctx.lineTo(Q.pc.sx, Q.pc.sy); ctx.lineTo(Q.pd.sx, Q.pd.sy); ctx.closePath();
      ctx.fill(); ctx.stroke();
    }
    // sonda + flecha cuesta arriba
    const pv = evalF(f, probe.x, probe.y);
    if (isFinite(pv)) {
      const pp = project(probe.x, probe.y, Z(pv), w, h);
      const g = gradAt(f, probe.x, probe.y); const mag = Math.hypot(g.x, g.y);
      if (mag > 1e-7) {
        let ux = g.x / mag, uy = g.y / mag; if (showE) { ux = -ux; uy = -uy; }
        const step = 0.75;
        const x1 = probe.x + ux * step, y1 = probe.y + uy * step;
        const v1 = evalF(f, x1, y1);
        const pq = project(x1, y1, isFinite(v1) ? Z(v1) : Z(pv), w, h);
        ctx.strokeStyle = C_ARROW; ctx.fillStyle = C_ARROW;
        ctx.lineWidth = Math.max(2.5, DPR * 2.6);
        ctx.beginPath(); ctx.moveTo(pp.sx, pp.sy); ctx.lineTo(pq.sx, pq.sy); ctx.stroke();
        const ang = Math.atan2(pq.sy - pp.sy, pq.sx - pp.sx), hd = Math.max(7, DPR * 7);
        ctx.beginPath(); ctx.moveTo(pq.sx, pq.sy);
        ctx.lineTo(pq.sx - hd * Math.cos(ang - 0.4), pq.sy - hd * Math.sin(ang - 0.4));
        ctx.lineTo(pq.sx - hd * Math.cos(ang + 0.4), pq.sy - hd * Math.sin(ang + 0.4));
        ctx.closePath(); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(pp.sx, pp.sy, Math.max(4.5, DPR * 4.5), 0, 7);
      ctx.fillStyle = C_SURF; ctx.fill();
      ctx.lineWidth = Math.max(2, DPR * 2); ctx.strokeStyle = C_ARROW; ctx.stroke();
    }
  };

  // ── sizing + render ──
  const resizeAndRender = () => {
    const c2 = c2dRef.current, c3 = c3dRef.current;
    if (c2) {
      const r = c2.getBoundingClientRect();
      dimsRef.current = { w: Math.max(10, Math.round(r.width * DPR)), h: Math.max(10, Math.round(r.height * DPR)) };
      c2.width = dimsRef.current.w; c2.height = dimsRef.current.h;
    }
    if (c3) {
      const r = c3.getBoundingClientRect();
      c3.width = Math.max(10, Math.round(r.width * DPR));
      c3.height = Math.max(10, Math.round(r.height * DPR));
    }
    renderStatic(); draw2d(); draw3d();
  };

  useEffect(() => {
    const onResize = () => resizeAndRender();
    window.addEventListener('resize', onResize);
    resizeAndRender();
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-render capa estática cuando cambia el campo o E
  useEffect(() => { renderStatic(); draw2d(); draw3d();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, showE]);

  // re-dibuja dinámico
  useEffect(() => { draw2d();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [probe, dirDeg]);
  useEffect(() => { draw3d();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [probe, az, el, showE]);

  // ── interacción ──
  const dragging = useRef(false);
  const moveProbe = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    const c = c2dRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const px = ((ev.clientX - r.left) / r.width) * dimsRef.current.w;
    const py = ((ev.clientY - r.top) / r.height) * dimsRef.current.h;
    setProbe({
      x: Math.max(-DOM, Math.min(DOM, px2w(px))),
      y: Math.max(-DOM, Math.min(DOM, py2w(py))),
    });
  };
  const rot = useRef<{ on: boolean; x: number; y: number }>({ on: false, x: 0, y: 0 });

  const applyExpr = (e: string) => { setExpr(e); setApplied(e); };

  // ── lecturas ──
  const g = field ? gradAt(field, probe.x, probe.y) : { x: NaN, y: NaN };
  const mag = Math.hypot(g.x, g.y);
  const dir = mag > 1e-7 ? (Math.atan2(g.y, g.x) * 180) / Math.PI : NaN;
  const a = (dirDeg * Math.PI) / 180;
  const dv = g.x * Math.cos(a) + g.y * Math.sin(a);
  const theta = mag > 1e-7 ? (Math.acos(Math.max(-1, Math.min(1, dv / mag))) * 180) / Math.PI : NaN;
  let dvNote = 'θ = —';
  if (isFinite(theta)) {
    if (theta < 8) dvNote = 'θ≈0° · subida máxima';
    else if (Math.abs(theta - 90) < 8) dvNote = 'θ≈90° · dV≈0 (equipot.)';
    else if (theta > 172) dvNote = 'θ≈180° · bajada máxima';
    else dvNote = 'θ = ' + theta.toFixed(0) + '°';
  }

  return (
    <div className="gf">
      <div className="gf-console">
        <label className="gf-lbl" htmlFor="gf-expr">Campo escalar — entrada</label>
        <div className="gf-fieldrow">
          <div className="gf-vinput">
            <span className="gf-prefix">V(x, y) =</span>
            <input
              id="gf-expr" spellCheck={false} autoCapitalize="off" autoComplete="off"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') applyExpr((e.target as HTMLInputElement).value.trim()); }}
              aria-label="Expresión del campo escalar"
            />
          </div>
          <button className="gf-apply" onClick={() => applyExpr(expr.trim())}>Calcular ∇V</button>
        </div>
        {error && <div className="gf-err">{error}</div>}
        <div className="gf-chips">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.expr}
              className={'gf-chip' + (applied === ex.expr ? ' active' : '')}
              onClick={() => applyExpr(ex.expr)}
            >
              {ex.name}<span className="gf-cx">{ex.expr.replace(/\*/g, '·').replace(/sqrt/g, '√')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="gf-views">
        <div className="gf-card">
          <h3>Vista cenital 2D <span className="gf-tag">arrastra la sonda</span></h3>
          <p className="gf-hint">Color = valor de V. Líneas finas = equipotenciales (V constante). Flechas pequeñas = campo ∇V.</p>
          <div className="gf-canvas-hold">
            <canvas
              ref={c2dRef}
              onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); moveProbe(e); }}
              onPointerMove={(e) => { if (dragging.current) moveProbe(e); }}
              onPointerUp={() => { dragging.current = false; }}
              onPointerCancel={() => { dragging.current = false; }}
            />
          </div>
          <div className="gf-cbar">
            <span>{fmt(field ? field.lo : NaN)}</span>
            <span className="gf-grad" />
            <span>{fmt(field ? field.hi : NaN)}</span>
          </div>
          <div className="gf-legend">
            <span><i className="gf-sw" style={{ borderTopColor: C_ARROW }} /> ∇V (o E=−∇V)</span>
            <span><i className="gf-sw dash" style={{ borderTopColor: C_DL }} /> dirección dℓ</span>
            <span><i className="gf-dot" /> tangente a la equipotencial</span>
          </div>
        </div>

        <div className="gf-card">
          <h3>Superficie 3D <span className="gf-tag g">z = V(x,y)</span></h3>
          <p className="gf-hint">La misma sonda sobre la “montaña”. La flecha señala la pendiente de subida más pronunciada.</p>
          <div className="gf-canvas-hold">
            <canvas
              ref={c3dRef}
              onPointerDown={(e) => { rot.current = { on: true, x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
              onPointerMove={(e) => {
                if (!rot.current.on) return;
                setAz((v) => v + (e.clientX - rot.current.x) * 0.5);
                setEl((v) => Math.max(6, Math.min(82, v + (e.clientY - rot.current.y) * 0.35)));
                rot.current.x = e.clientX; rot.current.y = e.clientY;
              }}
              onPointerUp={() => { rot.current.on = false; }}
              onPointerCancel={() => { rot.current.on = false; }}
            />
          </div>
          <div className="gf-ctrl3d">
            <label>Giro <input type="range" min={-180} max={180} value={az} onChange={(e) => setAz(+e.target.value)} /></label>
            <label>Alt. <input type="range" min={6} max={82} value={el} onChange={(e) => setEl(+e.target.value)} /></label>
          </div>
        </div>
      </div>

      <div className="gf-readout">
        <div className="gf-card">
          <h3>Gradiente en la sonda</h3>
          <p className="gf-hint">Punto&nbsp; x₀ = {probe.x.toFixed(2)} , y₀ = {probe.y.toFixed(2)}</p>
          <div className="gf-metrics">
            <div className="gf-metric"><div className="k">∂V/∂x</div><div className="v">{fmt(g.x)}</div></div>
            <div className="gf-metric"><div className="k">∂V/∂y</div><div className="v">{fmt(g.y)}</div></div>
            <div className="gf-metric"><div className="k">|∇V| (pendiente máx.)</div><div className="v gran">{fmt(mag)}</div></div>
            <div className="gf-metric"><div className="k">dirección de subida</div><div className="v teal">{isFinite(dir) ? dir.toFixed(0) + '°' : '—'}</div></div>
          </div>
          <div className="gf-sym">
            <div className="row"><span className="lhs">∂V/∂x =</span><span className="rhs">{field ? field.dxStr : '—'}</span></div>
            <div className="row"><span className="lhs">∂V/∂y =</span><span className="rhs">{field ? field.dyStr : '—'}</span></div>
          </div>
        </div>

        <div className="gf-card">
          <h3>Derivada direccional</h3>
          <BlockMath>{'dV = \\nabla V \\cdot d\\vec{\\ell} = |\\nabla V|\\,\\cos\\theta'}</BlockMath>
          <p className="gf-hint">Cuánto cambia V si te mueves un pasito en la dirección elegida. Máxima si vas con el gradiente; nula si vas por la equipotencial.</p>
          <label className="gf-lbl" htmlFor="gf-dir" style={{ marginTop: 4 }}>Dirección del paso dℓ · {dirDeg}°</label>
          <input id="gf-dir" type="range" min={0} max={360} value={dirDeg} onChange={(e) => setDirDeg(+e.target.value)} style={{ width: '100%' }} />
          <div className="gf-ddrow">
            <span className="gf-pill">dV/dℓ</span>
            <span className="gf-num">{fmt(dv)}</span>
            <span className="gf-pill">{dvNote}</span>
          </div>
          <div className="gf-etoggle-wrap">
            <button
              className={'gf-toggle' + (showE ? ' on' : '')}
              role="switch" aria-checked={showE}
              onClick={() => setShowE((s) => !s)}
            >
              <span className="gf-switch" />
              <span>Mostrar el campo físico <b>E = −∇V</b> (invierte las flechas)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="gf-facts">
        <div className="gf-fact one"><h4>Apunta al máximo crecimiento</h4><p>El vector ∇V señala la dirección en la que V aumenta más deprisa, y su módulo |∇V| es esa tasa de subida. Por eso en la superficie 3D siempre apunta “cuesta arriba”.</p></div>
        <div className="gf-fact two"><h4>⟂ a las equipotenciales</h4><p>En cada punto ∇V es perpendicular a la línea de V constante que pasa por él. Moverte a lo largo de la equipotencial no cambia V (dV = 0).</p></div>
        <div className="gf-fact three"><h4>dV = ∇V · dℓ</h4><p>El cambio de V ante un desplazamiento dℓ es el producto escalar con el gradiente. En electrostática, el campo es E = −∇V: de mayor a menor potencial.</p></div>
      </div>
    </div>
  );
}
