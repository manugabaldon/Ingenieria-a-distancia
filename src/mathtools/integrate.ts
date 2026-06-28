/**
 * integrate.ts — Motor de integración simbólica y numérica
 *
 * Variable de integración: x
 *
 *  - integrateExpr(expr)            → integral indefinida (simbólica) o null
 *  - definiteIntegral(expr, a, b)   → integral definida (numérica, Simpson)
 *  - evalDefiniteSymbolic(F, a, b)  → F(b) − F(a) si hay primitiva simbólica
 *
 * El integrador simbólico cubre los casos habituales en ingeniería:
 *   · linealidad (sumas, restas, constante·f)
 *   · regla de la potencia  ∫xⁿ dx,  incluido n = −1 → ln|x|
 *   · funciones de argumento lineal (m·x+b):
 *       sin, cos, tan, exp, sqrt, sinh, cosh, log (ln)
 *   · exponenciales  aˣ
 * Si no sabe resolver simbólicamente devuelve null; la integral
 * definida siempre puede calcularse numéricamente.
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

/** ¿La expresión depende de la variable de integración? */
function hasVar(node: any): boolean {
  let found = false;
  node.traverse((n: any) => {
    if (n.isSymbolNode && n.name === V) found = true;
  });
  return found;
}

/** Intenta evaluar un nodo constante a número (sin variable). */
function tryNum(node: any): number | null {
  try {
    const v = Number(node.evaluate());
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/**
 * Si `node` es lineal en x (grado 1, coeficiente constante), devuelve
 * el coeficiente m = d(node)/dx como cadena; en otro caso null.
 */
function linearCoef(node: any): string | null {
  try {
    const d = simplify(derivative(node, V));
    if (hasVar(d)) return null; // la derivada depende de x ⇒ no es lineal
    return d.toString();
  } catch {
    return null;
  }
}

/** Núcleo recursivo: devuelve la primitiva como cadena, o null. */
function integ(node: any): string | null {
  // Constante respecto de x  ⇒  ∫c dx = c·x
  if (!hasVar(node)) return `(${node.toString()})*x`;

  if (node.isParenthesisNode) return integ(node.content);

  // x  ⇒  x²/2
  if (node.isSymbolNode) return `x^2/2`;

  if (node.isOperatorNode) {
    const op: string = node.op;

    // Menos unario
    if (node.fn === 'unaryMinus') {
      const a = integ(node.args[0]);
      return a == null ? null : `-(${a})`;
    }

    // Suma / resta  ⇒  linealidad
    if (op === '+' || op === '-') {
      const a = integ(node.args[0]);
      const b = integ(node.args[1]);
      if (a == null || b == null) return null;
      return `(${a}) ${op} (${b})`;
    }

    // Producto  ⇒  saca las constantes
    if (op === '*') {
      const varFactors = node.args.filter(hasVar);
      const constFactors = node.args.filter((a: any) => !hasVar(a));
      if (varFactors.length === 1) {
        const inner = integ(varFactors[0]);
        if (inner == null) return null;
        const c = constFactors.map((a: any) => `(${a.toString()})`).join('*') || '1';
        return `(${c})*(${inner})`;
      }
      return null; // producto de dos factores con x: fuera de alcance
    }

    // Cociente
    if (op === '/') {
      const [num, den] = node.args;
      if (!hasVar(den)) {
        const inner = integ(num);
        if (inner == null) return null;
        return `(${inner})/(${den.toString()})`;
      }
      if (!hasVar(num)) {
        // c / g(x)  ⇒  c · g(x)^(−1)
        const rewritten = parse(`(${num.toString()})*(${den.toString()})^(-1)`);
        return integ(rewritten);
      }
      return null;
    }

    // Potencia
    if (op === '^') {
      const [base, exp] = node.args;

      // (m·x+b)ⁿ  con n constante
      if (hasVar(base) && !hasVar(exp)) {
        const m = linearCoef(base);
        if (m == null) return null; // base no lineal
        const n = tryNum(exp);
        if (n != null && Math.abs(n + 1) < 1e-12) {
          return `ln(abs(${base.toString()}))/(${m})`;
        }
        return `(${base.toString()})^((${exp.toString()})+1)/((${m})*((${exp.toString()})+1))`;
      }

      // a^(m·x+b)  con a constante
      if (!hasVar(base) && hasVar(exp)) {
        const m = linearCoef(exp);
        if (m == null) return null;
        return `(${base.toString()})^(${exp.toString()})/((${m})*log(${base.toString()}))`;
      }

      return null;
    }

    return null;
  }

  // Funciones de un argumento lineal
  if (node.isFunctionNode) {
    if (node.args.length !== 1) return null;
    const fn: string = node.fn.name;
    const u = node.args[0];
    const m = linearCoef(u);
    if (m == null) return null;
    const us = u.toString();
    const div = `/(${m})`;
    switch (fn) {
      case 'sin':  return `(-cos(${us}))${div}`;
      case 'cos':  return `(sin(${us}))${div}`;
      case 'tan':  return `(-log(abs(cos(${us}))))${div}`;
      case 'exp':  return `(exp(${us}))${div}`;
      case 'sqrt': return `((2/3)*(${us})^(3/2))${div}`;
      case 'sinh': return `(cosh(${us}))${div}`;
      case 'cosh': return `(sinh(${us}))${div}`;
      case 'log':  return `((${us})*log(${us}) - (${us}))${div}`;
      default:     return null;
    }
  }

  return null;
}

export interface SymbolicResult {
  /** Primitiva en LaTeX (sin la constante +C) */
  tex: string;
  /** Primitiva en sintaxis mathjs, evaluable */
  raw: string;
}

/** Integral indefinida simbólica de `expr` respecto de x. */
export function integrateExpr(expr: string): SymbolicResult | null {
  try {
    const node = parse(expr);
    const r = integ(node);
    if (r == null) return null;
    let s;
    try {
      s = simplify(r);
    } catch {
      s = parse(r);
    }
    return { tex: s.toTex(), raw: s.toString() };
  } catch {
    return null;
  }
}

// ─── Pasos de resolución (reglas aplicadas) ─────────────────────────────────

export interface StepRule {
  /** Nombre legible de la regla */
  name: string;
  /** Forma general de la regla, en LaTeX */
  formula: string;
}

export interface TermStep {
  /** El término (con signo) en LaTeX, tal como aparece bajo la integral */
  termTex: string;
  /** Resultado de integrar ese término, en LaTeX */
  resultTex: string;
  /** Regla aplicada */
  rule: StepRule;
  /** ¿Se ha usado la regla de la cadena (argumento m·x+b con m≠1)? */
  chain: boolean;
}

export interface IntegrationSteps {
  /** Se ha aplicado linealidad (la integral de una suma) */
  linearity: boolean;
  /** Desglose término a término */
  terms: TermStep[];
  /** Primitiva final en LaTeX (sin +C) */
  resultTex: string;
}

/** Separa una expresión en términos aditivos, con su signo. */
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

/** Identifica la regla de integración aplicable al núcleo de un término. */
function ruleFor(node: any): { rule: StepRule; chain: boolean } | null {
  let core = node;
  if (core.isParenthesisNode) core = core.content;

  // Producto: nos quedamos con el factor que depende de x
  if (core.isOperatorNode && core.op === '*') {
    const varF = core.args.filter(hasVar);
    if (varF.length === 1) core = varF[0];
  }
  // Cociente: c/g(x) → g(x)^(−1) ;  f(x)/c → f(x)
  if (core.isOperatorNode && core.op === '/') {
    const [num, den] = core.args;
    if (!hasVar(num)) core = parse(`(${den.toString()})^(-1)`);
    else if (!hasVar(den)) core = num;
  }
  if (core.isParenthesisNode) core = core.content;

  // Constante
  if (!hasVar(core)) {
    return {
      rule: { name: 'Regla de la constante', formula: '\\int k\\,dx = k\\,x + C' },
      chain: false,
    };
  }

  // x  (potencia con n = 1)
  if (core.isSymbolNode) {
    return {
      rule: {
        name: 'Regla de la potencia',
        formula: '\\int x^{n}\\,dx = \\frac{x^{n+1}}{n+1} + C',
      },
      chain: false,
    };
  }

  // Potencia
  if (core.isOperatorNode && core.op === '^') {
    const [base, exp] = core.args;
    if (hasVar(base) && !hasVar(exp)) {
      const m = linearCoef(base);
      const chain = m != null && m !== '1';
      const n = tryNum(exp);
      if (n != null && Math.abs(n + 1) < 1e-12) {
        return {
          rule: {
            name: 'Integral de 1/x → logaritmo',
            formula: '\\int \\frac{1}{x}\\,dx = \\ln|x| + C',
          },
          chain,
        };
      }
      return {
        rule: {
          name: 'Regla de la potencia',
          formula: '\\int x^{n}\\,dx = \\frac{x^{n+1}}{n+1} + C',
        },
        chain,
      };
    }
    if (!hasVar(base) && hasVar(exp)) {
      const m = linearCoef(exp);
      return {
        rule: {
          name: 'Exponencial de base a',
          formula: '\\int a^{x}\\,dx = \\frac{a^{x}}{\\ln a} + C',
        },
        chain: m != null && m !== '1',
      };
    }
    return null;
  }

  // Funciones de argumento lineal
  if (core.isFunctionNode && core.args.length === 1) {
    const m = linearCoef(core.args[0]);
    const chain = m != null && m !== '1';
    const fn: string = core.fn.name;
    const F: Record<string, StepRule> = {
      sin:  { name: 'Integral del seno',     formula: '\\int \\sin x\\,dx = -\\cos x + C' },
      cos:  { name: 'Integral del coseno',   formula: '\\int \\cos x\\,dx = \\sin x + C' },
      tan:  { name: 'Integral de la tangente', formula: '\\int \\tan x\\,dx = -\\ln|\\cos x| + C' },
      exp:  { name: 'Exponencial natural',   formula: '\\int e^{x}\\,dx = e^{x} + C' },
      sqrt: { name: 'Regla de la potencia',  formula: '\\int \\sqrt{x}\\,dx = \\tfrac{2}{3}\\,x^{3/2} + C' },
      sinh: { name: 'Integral del seno hiperbólico',   formula: '\\int \\sinh x\\,dx = \\cosh x + C' },
      cosh: { name: 'Integral del coseno hiperbólico', formula: '\\int \\cosh x\\,dx = \\sinh x + C' },
      log:  { name: 'Integral del logaritmo', formula: '\\int \\ln x\\,dx = x\\ln x - x + C' },
    };
    if (F[fn]) return { rule: F[fn], chain };
    return null;
  }

  return null;
}

/**
 * Genera el desglose paso a paso de la integral indefinida de `expr`.
 * Devuelve null si no se puede resolver simbólicamente.
 */
export function integrationSteps(expr: string): IntegrationSteps | null {
  try {
    const full = integrateExpr(expr);
    if (!full) return null;

    const terms = splitTerms(parse(expr));
    const out: TermStep[] = [];

    for (const t of terms) {
      const signed = (t.sign < 0 ? '-' : '') + `(${t.node.toString()})`;
      const r = integrateExpr(signed);
      const info = ruleFor(t.node);
      if (!r || !info) return null;
      out.push({
        termTex: parse(signed).toTex(),
        resultTex: r.tex,
        rule: info.rule,
        chain: info.chain,
      });
    }

    return {
      linearity: terms.length > 1,
      terms: out,
      resultTex: full.tex,
    };
  } catch {
    return null;
  }
}

/** Integral definida numérica por la regla de Simpson compuesta. */
export function definiteIntegral(expr: string, a: number, b: number, n = 2000): number | null {
  try {
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    if (a === b) return 0;
    const code = parse(expr).compile();
    const f = (x: number) => Number(code.evaluate({ x }));
    const N = n % 2 === 0 ? n : n + 1; // Simpson requiere N par
    const h = (b - a) / N;
    let s = f(a) + f(b);
    for (let i = 1; i < N; i++) {
      s += (i % 2 ? 4 : 2) * f(a + i * h);
    }
    const res = (s * h) / 3;
    return Number.isFinite(res) ? res : null;
  } catch {
    return null;
  }
}

/** Evalúa la primitiva simbólica: F(b) − F(a). */
export function evalDefiniteSymbolic(raw: string, a: number, b: number): number | null {
  try {
    const code = parse(raw).compile();
    const Fb = Number(code.evaluate({ x: b }));
    const Fa = Number(code.evaluate({ x: a }));
    const res = Fb - Fa;
    return Number.isFinite(res) ? res : null;
  } catch {
    return null;
  }
}

// ─── Generador de problemas para "Practica" ─────────────────────────────────

/** Construye el integrando aleatorio (en bruto) según el nivel. */
function randIntegrand(level: Level): string {
  const a = randInt(2, 6);
  const b = randInt(1, 5);
  const c = randInt(2, 6);
  const n = randInt(2, 5);
  const k = randInt(2, 4);
  if (level === 1) {
    return choice([
      `${a}*x^${n}`,
      `${a}*x^${randInt(1, 4)} + ${b}*x`,
      `${a}*x^2 + ${b}`,
    ]);
  }
  if (level === 2) {
    return choice([
      `${a}*x^${n} + ${b}*x + ${c}`,
      `${a}/x`,
      `${a}*exp(x)`,
      `${a}*sin(x)`,
      `${a}*cos(x)`,
      `${a}*sqrt(x)`,
    ]);
  }
  return choice([
    `sin(${k}*x)`,
    `cos(${k}*x)`,
    `exp(${k}*x)`,
    `(${k}*x + ${b})^${randInt(2, 4)}`,
    `${a}*x^${n} + ${b}*cos(x)`,
  ]);
}

/** Genera un problema de integral de opción múltiple. */
export function generateIntegralProblem(level: Level): PracticeProblem | null {
  for (let attempt = 0; attempt < 25; attempt++) {
    const f = randIntegrand(level);
    const correct = integrateExpr(f);
    const steps = integrationSteps(f);
    if (!correct || !steps) continue;
    const fTex = (() => {
      try {
        return parse(f).toTex();
      } catch {
        return f;
      }
    })();
    const candidates = [
      f, // olvida integrar
      `-(${correct.raw})`, // signo
      `(2)*(${correct.raw})`, // coeficiente
      `(1/2)*(${correct.raw})`,
    ];
    const options = buildOptions(correct.raw, correct.tex, candidates, ' + C');
    if (options.length < 4) continue;
    return {
      promptTex: `\\int ${fTex}\\,dx`,
      options,
      steps,
    };
  }
  return null;
}
