/**
 * analyze.ts — Utilidades para representar y analizar funciones
 *
 *  - compileExpr(expr)   → f(x) evaluable, o null si la sintaxis es inválida
 *  - derivativeFn(expr)  → f'(x) (derivada simbólica de mathjs), o null
 *  - findRoots(f,a,b)    → raíces reales en [a,b] (cambios de signo + bisección)
 *  - findExtrema(f,fp)   → máximos y mínimos en [a,b] (ceros de f')
 *
 * Métodos numéricos con filtros para evitar falsos positivos en asíntotas
 * (p. ej. 1/x o tan x).
 */
import { parse, derivative } from 'mathjs';

export type Fn = (x: number) => number;

export function compileExpr(expr: string): Fn | null {
  try {
    const code = parse(expr).compile();
    return (x: number) => Number(code.evaluate({ x }));
  } catch {
    return null;
  }
}

export function derivativeFn(expr: string): Fn | null {
  try {
    const d = derivative(parse(expr), 'x').compile();
    return (x: number) => Number(d.evaluate({ x }));
  } catch {
    return null;
  }
}

export interface Extremum {
  x: number;
  y: number;
  kind: 'max' | 'min';
}

/** Bisección sobre un intervalo con cambio de signo. */
function bisect(f: Fn, lo: number, hi: number): number {
  let flo = f(lo);
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (!Number.isFinite(fm)) return mid;
    if ((flo < 0) !== (fm < 0)) hi = mid;
    else { lo = mid; flo = fm; }
  }
  return (lo + hi) / 2;
}

/** Raíces reales de f en [a,b]. */
export function findRoots(f: Fn, a: number, b: number, n = 2000): number[] {
  const roots: number[] = [];
  const span = b - a;
  const minGap = span * 1e-4 + 1e-9;
  const push = (r: number) => {
    if (!roots.some((v) => Math.abs(v - r) < minGap)) roots.push(r);
  };

  const h = span / n;
  let prevX = a;
  let prevY = f(a);
  for (let i = 1; i <= n; i++) {
    const x = a + i * h;
    const y = f(x);
    if (Number.isFinite(prevY) && Number.isFinite(y)) {
      if (prevY === 0) push(prevX);
      else if ((prevY < 0) !== (y < 0)) {
        const r = bisect(f, prevX, x);
        // Aceptar solo si realmente vale ~0 (filtra asíntotas verticales)
        if (Math.abs(f(r)) < 1e-3) push(r);
      }
    }
    prevX = x;
    prevY = y;
  }
  return roots;
}

/** Máximos y mínimos de f en [a,b] (cambios de signo de f'). */
export function findExtrema(f: Fn, fp: Fn, a: number, b: number, n = 2000): Extremum[] {
  const ext: Extremum[] = [];
  const span = b - a;
  const minGap = span * 1e-3;
  const h = span / n;
  let prevX = a;
  let prevD = fp(a);
  for (let i = 1; i <= n; i++) {
    const x = a + i * h;
    const d = fp(x);
    if (Number.isFinite(prevD) && Number.isFinite(d) && prevD !== 0) {
      if ((prevD < 0) !== (d < 0)) {
        const xc = bisect(fp, prevX, x);
        const yc = f(xc);
        // Filtra asíntotas: f' debe anularse de verdad y f ser finita
        if (Number.isFinite(yc) && Math.abs(fp(xc)) < 1e-2) {
          const kind: 'max' | 'min' = prevD > 0 ? 'max' : 'min';
          if (!ext.some((e) => Math.abs(e.x - xc) < minGap)) {
            ext.push({ x: xc, y: yc, kind });
          }
        }
      }
    }
    prevX = x;
    prevD = d;
  }
  return ext;
}
