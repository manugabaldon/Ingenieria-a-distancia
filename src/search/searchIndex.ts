import type { IADVideo } from '../iad/videosData';
import type { TheoryEntry } from '../iad/theoryLibraryData';
import { slugify } from '../iad/slug';
import { extractText } from './extractText';

/** A dónde navega la app al elegir un resultado de búsqueda. */
export type SearchTarget =
  | { kind: 'estudia'; path: string }
  | { kind: 'view'; id: string };

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  /** Texto normalizado (sin acentos, minúsculas) sobre el que se busca. */
  keywords: string;
  target: SearchTarget;
}

export function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function estudiaPath(subject: string, tema: string, section: 'teoria' | 'ejercicios', id: string): string {
  return [slugify(subject), slugify(tema), section, id].join('/');
}

/** Construye el índice de teoría y ejercicios resueltos. */
export function buildContentSearchIndex(opts: {
  videos: IADVideo[];
  theoryEntries: TheoryEntry[];
}): SearchItem[] {
  const items: SearchItem[] = [];

  for (const e of opts.theoryEntries) {
    const subtitle = `${e.subject} · ${e.tema} · ${e.topic}`;
    const body = extractText(e.content);
    items.push({
      id: `theory-${e.id}`,
      title: e.title,
      subtitle,
      icon: '📖',
      badge: 'Teoría',
      keywords: normalize(`${e.title} ${e.summary} ${subtitle} ${body}`),
      target: { kind: 'estudia', path: estudiaPath(e.subject, e.tema, 'teoria', e.id) },
    });
  }

  for (const v of opts.videos) {
    const subtitle = `${v.subject} · ${v.tema} · ${v.topic}`;
    const body = `${extractText(v.theory)} ${extractText(v.exerciseGuide)}`;
    items.push({
      id: `exercise-${v.id}`,
      title: v.title,
      subtitle,
      icon: '📝',
      badge: 'Ejercicio resuelto',
      keywords: normalize(`${v.title} ${v.description} ${v.exerciseRef} ${subtitle} ${body}`),
      target: { kind: 'estudia', path: estudiaPath(v.subject, v.tema, 'ejercicios', v.id) },
    });
  }

  return items;
}

/**
 * Busca por coincidencia de todos los tokens de la consulta (sin acentos).
 * Puntúa más alto las coincidencias en el título que en el resto de metadatos.
 */
export function searchItems(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  const q = normalize(query).trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = normalize(item.title);
    let score = 0;
    let matchedAll = true;
    for (const t of tokens) {
      if (title.includes(t)) {
        score += title === t ? 100 : title.startsWith(t) ? 50 : 20;
      } else if (item.keywords.includes(t)) {
        score += 5;
      } else {
        matchedAll = false;
        break;
      }
    }
    if (matchedAll) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.item);
}
