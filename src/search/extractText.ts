import { isValidElement } from 'react';

// Props puramente presentacionales (geometría SVG, estilos, manejadores…)
// que no aportan texto de contenido a la búsqueda.
const SKIP_PROP_KEYS = new Set([
  'className', 'style', 'key', 'ref', 'src', 'href', 'loading',
  'onClick', 'onChange', 'onSubmit', 'onMouseEnter', 'onMouseLeave',
  'viewBox', 'width', 'height', 'fill', 'stroke', 'strokeWidth',
  'strokeDasharray', 'strokeLinecap', 'strokeLinejoin', 'fillRule', 'clipPath',
  'transform', 'd', 'cx', 'cy', 'r', 'rx', 'ry',
  'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points', 'opacity',
]);

/**
 * Extrae de forma recursiva el texto plano de contenido JSX ya construido
 * (literales <P>…</P> evaluados al cargar el módulo, no componentes por
 * renderizar) o de estructuras de datos anidadas que contengan ReactNode
 * (p. ej. los `items` de un DefList o los `steps` de una guía de ejercicio).
 * Los componentes de función (diagramas, simuladores…) no se invocan, así
 * que su texto interno no se indexa — solo lo que ya es texto o elementos
 * nativos (p, strong, div…) en el árbol.
 */
export function extractText(value: unknown, depth = 0): string {
  if (value == null || depth > 40) return '';
  const t = typeof value;
  if (t === 'string') return value as string;
  if (t === 'number') return String(value);
  if (t === 'boolean' || t === 'function') return '';
  if (Array.isArray(value)) return value.map(v => extractText(v, depth + 1)).join(' ');
  if (isValidElement(value)) {
    return extractText((value.props as Record<string, unknown>) ?? {}, depth + 1);
  }
  if (t === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .filter(([k]) => !SKIP_PROP_KEYS.has(k))
      .map(([, v]) => extractText(v, depth + 1))
      .join(' ');
  }
  return '';
}
