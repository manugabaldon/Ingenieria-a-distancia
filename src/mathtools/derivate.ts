/**
 * derivate.ts — Motor de derivación simbólica y numérica
 *
 * Variable de derivación: x
 *
 *  - derivativeExpr(expr)          → derivada simbólica f'(x) (vía mathjs) o null
 *  - evalAt(raw, x0)               → evalúa una expresión en x = x0
 *  - derivativeSteps(expr)         → desglose paso a paso con las reglas usadas
 *
 * La derivación simbólica la resuelve mathjs (maneja potencia, producto,
 * cociente, cadena, trigonométricas, exponenciales y logaritmos). El
 * generador de pasos identifica la regla aplicada en cada término para
 * mostrarla con fines didácticos.
 */
import { parse, simplify, derivative } from 'mathjs';
import {
  buildOptions,
  choice,
  randInt,
  type Level,
  type PracticeProblem,
} from './practice';

const V = 'x';

function hasVar(node: any): boolean {
  let found = false;
  node.traverse((n: any) => {
    if (n.isSymbolNode && n.name === V) found = true;
  });
  return found;
}

/** Coeficiente m si `node` es lineal en x (para detectar la regla de la cadena). */
function linearCoef(node: any): string | null {
  try {
    const d = simplify(derivative(node, V));
    if (hasVar(d)) return null;
    return d.toString();
  } catch {
    return null;
  }
}

export interface SymbolicResult {
  tex: string;
  raw: string;
}

/** Derivada simbólica de `expr` respecto de x. */
export function derivativeExpr(expr: string): SymbolicResult | null {
  try {
    const d = derivative(parse(expr), V);
    let s;
    try {
      s = simplify(d);
    } catch {
      s = d;
    }
    return { tex: s.toTex(), raw: s.toString() };
  } catch {
    return null;
  }
}

/** Evalúa una expresión (en sintaxis mathjs) en x = x0. */
export function evalAt(raw: string, x0: number): number | null {
  try {
    const v = Number(parse(raw).compile().evaluate({ x: x0 }));
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

// ─── Pasos de resolución (reglas aplicadas) ─────────────────────────────────

export interface StepRule {
  name: string;
  formula: string;
}

export interface TermStep {
  termTex: string;
  resultTex: string;
  rule: StepRule;
  chain: boolean;
}

export interface DerivationSteps {
  linearity: boolean;
  terms: TermStep[];
  resultTex: string;
}

function splitTerms(node: any): { sign: number; node: any }[] {
  if (node.isParenthesisNode) return splitTerms(node.content);
  if (node.isOperatorNode && node.fn === 'unaryMinus') {
    return splitTerms(node.args[0]).map((t) => ({ sign: -t.sign, node: t.node }));
  }
  if (node.isOperatorNode && (node.op === '+' || node.op === '-')) {
    const s = node.op === '-' ? -1 : 1;
    const left = splitTerms(node.args[0]);
    const right = splitTerms(node.args[1]).map((t) => ({ sign: t.sign * s, node: t.node }));
    return [...left, ...right];
  }
  return [{ sign: 1, node }];
}

const FN_RULES: Record<string, StepRule> = {
  sin:  { name: 'Derivada del seno',     formula: "\\frac{d}{dx}[\\sin x] = \\cos x" },
  cos:  { name: 'Derivada del coseno',   formula: "\\frac{d}{dx}[\\cos x] = -\\sin x" },
  tan:  { name: 'Derivada de la tangente', formula: "\\frac{d}{dx}[\\tan x] = \\sec^{2} x" },
  exp:  { name: 'Derivada de la exponencial', formula: "\\frac{d}{dx}[e^{x}] = e^{x}" },
  log:  { name: 'Derivada del logaritmo', formula: "\\frac{d}{dx}[\\ln x] = \\frac{1}{x}" },
  sqrt: { name: 'Derivada de la raíz',   formula: "\\frac{d}{dx}[\\sqrt{x}] = \\frac{1}{2\\sqrt{x}}" },
  sinh: { name: 'Derivada del seno hiperbólico',   formula: "\\frac{d}{dx}[\\sinh x] = \\cosh x" },
  cosh: { name: 'Derivada del coseno hiperbólico', formula: "\\frac{d}{dx}[\\cosh x] = \\sinh x" },
};

/** Identifica la regla de derivación aplicable a un término. */
function ruleForDeriv(node: any): { rule: StepRule; chain: boolean } {
  let core = node;
  if (core.isParenthesisNode) core = core.content;

  // Constante
  if (!hasVar(core)) {
    return { rule: { name: 'Regla de la constante', formula: "\\frac{d}{dx}[c] = 0" }, chain: false };
  }

  // Producto
  if (core.isOperatorNode && core.op === '*') {
    const varFactors = core.args.filter(hasVar);
    if (varFactors.length >= 2) {
      return {
        rule: { name: 'Regla del producto', formula: "(f\\,g)' = f'g + f g'" },
        chain: false,
      };
    }
    if (varFactors.length === 1) core = varFactors[0];
  }

  // Cociente
  if (core.isOperatorNode && core.op === '/') {
    const [num, den] = core.args;
    if (hasVar(den) && hasVar(num)) {
      return {
        rule: { name: 'Regla del cociente', formula: "\\left(\\frac{f}{g}\\right)' = \\frac{f'g - f g'}{g^{2}}" },
        chain: false,
      };
    }
    if (!hasVar(den)) core = num;
    else core = parse(`(${den.toString()})^(-1)`);
  }
  if (core.isParenthesisNode) core = core.content;

  // x  → potencia (n = 1)
  if (core.isSymbolNode) {
    return { rule: { name: 'Regla de la potencia', formula: "\\frac{d}{dx}[x^{n}] = n\\,x^{n-1}" }, chain: false };
  }

  // Potencia
  if (core.isOperatorNode && core.op === '^') {
    const [base, exp] = core.args;
    if (hasVar(base) && !hasVar(exp)) {
      const m = linearCoef(base);
      return {
        rule: { name: 'Regla de la potencia', formula: "\\frac{d}{dx}[x^{n}] = n\\,x^{n-1}" },
        chain: m != null && m !== '1',
      };
    }
    if (!hasVar(base) && hasVar(exp)) {
      const m = linearCoef(exp);
      return {
        rule: { name: 'Derivada de la exponencial', formula: "\\frac{d}{dx}[a^{x}] = a^{x}\\ln a" },
        chain: m != null && m !== '1',
      };
    }
  }

  // Funciones
  if (core.isFunctionNode && core.args.length === 1) {
    const m = linearCoef(core.args[0]);
    const fn: string = core.fn.name;
    if (FN_RULES[fn]) return { rule: FN_RULES[fn], chain: m != null && m !== '1' };
  }

  return { rule: { name: 'Reglas de derivación', formula: '' }, chain: false };
}

/** Desglose paso a paso de la derivada de `expr`. */
export function derivativeSteps(expr: string): DerivationSteps | null {
  try {
    const full = derivativeExpr(expr);
    if (!full) return null;

    const terms = splitTerms(parse(expr));
    const out: TermStep[] = [];

    for (const t of terms) {
      const signed = (t.sign < 0 ? '-' : '') + `(${t.node.toString()})`;
      let d;
      try {
        d = simplify(derivative(parse(signed), V));
      } catch {
        d = derivative(parse(signed), V);
      }
      out.push({
        termTex: parse(signed).toTex(),
        resultTex: d.toTex(),
        ...ruleForDeriv(t.node),
      });
    }

    return { linearity: terms.length > 1, terms: out, resultTex: full.tex };
  } catch {
    return null;
  }
}

// ─── Generador de problemas para "Practica" ─────────────────────────────────

/** Construye la función aleatoria (en bruto) a derivar según el nivel. */
function randFunction(level: Level): string {
  const a = randInt(2, 6);
  const b = randInt(1, 5);
  const c = randInt(2, 6);
  const n = randInt(2, 5);
  const k = randInt(2, 4);
  if (level === 1) {
    return choice([
      `${a}*x^${n}`,
      `${a}*x^${randInt(2, 5)} + ${b}*x`,
      `${a}*x^2 + ${b}*x + ${c}`,
    ]);
  }
  if (level === 2) {
    return choice([
      `${a}*x^${n} + ${b}*x + ${c}`,
      `${a}*sin(x)`,
      `${a}*cos(x)`,
      `${a}*exp(x)`,
      `${a}*log(x)`,
      `${a}*sqrt(x)`,
    ]);
  }
  return choice([
    `sin(${k}*x)`,
    `exp(${k}*x)`,
    `(${k}*x + ${b})^${randInt(2, 4)}`,
    `x*sin(x)`,
    `x*exp(x)`,
    `x^2*log(x)`,
    `x/(x + ${b})`,
  ]);
}

/** Genera un problema de derivada de opción múltiple. */
export function generateDerivativeProblem(level: Level): PracticeProblem | null {
  for (let attempt = 0; attempt < 25; attempt++) {
    const f = randFunction(level);
    const correct = derivativeExpr(f);
    const steps = derivativeSteps(f);
    if (!correct || !steps) continue;
    const fTex = (() => {
      try {
        return parse(f).toTex();
      } catch {
        return f;
      }
    })();
    const candidates = [
      f, // olvida derivar
      `-(${correct.raw})`, // signo
      `(2)*(${correct.raw})`, // coeficiente
      `(1/2)*(${correct.raw})`,
    ];
    const options = buildOptions(correct.raw, correct.tex, candidates, '');
    if (options.length < 4) continue;
    return {
      promptTex: `\\frac{d}{dx}\\left[${fTex}\\right]`,
      options,
      steps,
    };
  }
  return null;
}
