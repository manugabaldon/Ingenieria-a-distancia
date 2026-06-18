/**
 * Math.tsx — Renderizado de ecuaciones con KaTeX
 *
 * <BlockMath>  : ecuación centrada en bloque (display mode)
 * <InlineMath> : ecuación dentro de texto (inline)
 *
 * Uso:
 *   <BlockMath>{`F_c = m \\cdot r \\cdot \\omega^2`}</BlockMath>
 *   <InlineMath>{`\\omega = 2\\pi n / 60`}</InlineMath>
 */
import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './Math.css';

interface MathProps {
  children: string;
  /** Si hay un error LaTeX, muestra el texto crudo en lugar de lanzar */
  fallback?: boolean;
}

function render(latex: string, display: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode: display,
      throwOnError: false,
      errorColor: '#e53e3e',
      // permite texto normal dentro de \text{}
      strict: false,
      // macros útiles para aeronáutica
      macros: {
        '\\degree': '^{\\circ}',
        '\\rpm':    '\\text{RPM}',
        '\\rad':    '\\text{rad/s}',
      },
    });
  } catch {
    return `<span style="color:#e53e3e;font-family:monospace">${latex}</span>`;
  }
}

/** Ecuación en bloque (centrada, tamaño grande) */
export function BlockMath({ children }: MathProps) {
  const html = useMemo(() => render(children, true), [children]);
  return (
    <div
      className="math-block"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Ecuación inline (dentro de texto) */
export function InlineMath({ children }: MathProps) {
  const html = useMemo(() => render(children, false), [children]);
  return (
    <span
      className="math-inline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
