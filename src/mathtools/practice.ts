/**
 * practice.ts — Utilidades compartidas para la sección "Practica"
 *
 * Tipos del problema de práctica y helpers para construir las opciones
 * (respuesta correcta + distractores plausibles, garantizados distintos
 * entre sí mediante comparación numérica).
 */
import { parse, simplify } from 'mathjs';

export interface QuizOption {
  tex: string;
  correct: boolean;
}

export interface StepRuleLike {
  name: string;
  formula: string;
}
export interface TermStepLike {
  termTex: string;
  resultTex: string;
  rule: StepRuleLike;
  chain: boolean;
}
export interface StepsLike {
  linearity: boolean;
  terms: TermStepLike[];
  resultTex: string;
}

export interface PracticeProblem {
  /** Enunciado completo en LaTeX (p. ej. \int x^2\,dx) */
  promptTex: string;
  /** Opciones barajadas */
  options: QuizOption[];
  /** Resolución paso a paso */
  steps: StepsLike | null;
}

export type Level = 1 | 2 | 3;

export const randInt = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const choice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function compile(raw: string): ((x: number) => number) | null {
  try {
    const c = parse(raw).compile();
    return (x: number) => Number(c.evaluate({ x }));
  } catch {
    return null;
  }
}

/** ¿Dos expresiones son la misma función (numéricamente) en x? */
export function numericEqual(a: string, b: string): boolean {
  const fa = compile(a);
  const fb = compile(b);
  if (!fa || !fb) return false;
  const xs = [0.31, 0.73, 1.27, 2.11, 3.05, 0.52, 1.84, -0.62, -1.43];
  let valid = 0;
  for (const x of xs) {
    const ya = fa(x);
    const yb = fb(x);
    if (Number.isFinite(ya) && Number.isFinite(yb)) {
      valid++;
      if (Math.abs(ya - yb) > 1e-6 * (1 + Math.abs(ya))) return false;
    }
  }
  return valid >= 3;
}

export function toTex(raw: string): string {
  try {
    return simplify(raw).toTex();
  } catch {
    try {
      return parse(raw).toTex();
    } catch {
      return raw;
    }
  }
}

/**
 * Construye 4 opciones: la correcta + 3 distractores distintos.
 * `candidates` son expresiones candidatas (en bruto); se descartan las
 * que coincidan numéricamente con la correcta o entre sí. Si faltan,
 * se rellena con múltiplos de la correcta.
 */
export function buildOptions(
  correctRaw: string,
  correctTex: string,
  candidates: string[],
  suffix = ''
): QuizOption[] {
  const accepted: string[] = [correctRaw];
  const distractors: string[] = [];

  const tryAdd = (cand: string) => {
    if (distractors.length >= 3) return;
    if (accepted.some((r) => numericEqual(r, cand))) return;
    accepted.push(cand);
    distractors.push(cand);
  };

  candidates.forEach(tryAdd);

  // Relleno con múltiplos si hicieran falta
  const fillers = [2, -1, 3, -2, 4, -3];
  for (const k of fillers) {
    if (distractors.length >= 3) break;
    tryAdd(`(${k})*(${correctRaw})`);
  }

  const opts: QuizOption[] = [
    { tex: correctTex + suffix, correct: true },
    ...distractors.map((d) => ({ tex: toTex(d) + suffix, correct: false })),
  ];
  return shuffle(opts);
}
