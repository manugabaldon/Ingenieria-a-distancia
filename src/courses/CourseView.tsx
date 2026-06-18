import { useState, useEffect, useRef } from 'react';
import './CourseView.css';
import { BlockMath, InlineMath } from '../components/Math';

// ── Re-export math helpers ────────────────────────────────────────────────────
export { BlockMath, InlineMath };

// ── Sears & Zemansky style helpers ───────────────────────────────────────────

/** Sección con título azul subrayado (h3 del libro) */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="course-section">
      <h3 className="course-section-title">{title}</h3>
      {children}
    </div>
  );
}

/** Sub-sección (h4) */
export function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="course-subsection-title">{title}</h4>
      {children}
    </div>
  );
}

/** Párrafo de texto */
export function P({ children }: { children: React.ReactNode }) {
  return <p className="course-p">{children}</p>;
}

/** Ecuación en bloque centrada */
export function Eq({ children }: { children: string }) {
  return (
    <div className="course-eq">
      <BlockMath>{children}</BlockMath>
    </div>
  );
}

/** Ecuación inline dentro de texto */
export function EqI({ children }: { children: string }) {
  return <InlineMath>{children}</InlineMath>;
}

/** Foto con leyenda estilo libro */
export function Fig({
  src, alt, caption, height = 220,
}: {
  src: string; alt: string; caption: React.ReactNode; height?: number;
}) {
  return (
    <figure className="course-figure">
      <img src={src} alt={alt} style={{ height }} loading="lazy" />
      <figcaption className="course-figure-cap">{caption}</figcaption>
    </figure>
  );
}

/** Diagrama SVG con leyenda */
export function SvgFig({ children, caption }: { children: React.ReactNode; caption?: React.ReactNode }) {
  return (
    <figure className="course-svgfig">
      {children}
      {caption && <figcaption className="course-figure-cap">{caption}</figcaption>}
    </figure>
  );
}

/** Grid de 2 columnas para fotos/SVGs */
export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="course-grid">{children}</div>;
}

/** Ejemplo resuelto — fondo amarillo estilo S&Z */
export function Example({
  n, title, given, solution, children,
}: {
  n: string; title: string; given?: React.ReactNode; solution?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div className="course-example">
      <div className="course-example-header">
        <span className="course-example-num">Ejemplo {n}</span>
        <span className="course-example-title">{title}</span>
      </div>
      <div className="course-example-body">
        {given && <><div className="course-example-given">Datos</div>{given}</>}
        {(solution || children) && (
          <div className="course-example-solution">
            <div className="course-example-given">Solución</div>
            {solution}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/** Nota / Tip */
export function Note({ children }: { children: React.ReactNode }) {
  return <div className="course-note">{children}</div>;
}

/** Advertencia */
export function Warn({ children }: { children: React.ReactNode }) {
  return <div className="course-warn">{children}</div>;
}

/** Concepto clave — recuadro azul */
export function Concept({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="course-concept">
      {title && <div className="course-concept-title">{title}</div>}
      <p>{children}</p>
    </div>
  );
}

/** Aplicación en aviación — recuadro verde */
export function Aviation({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="course-aviation">
      {title && <div className="course-aviation-title">{title}</div>}
      {children}
    </div>
  );
}

/** Lista de definiciones */
export function DefList({ items }: { items: { term: React.ReactNode; def: React.ReactNode }[] }) {
  return (
    <dl className="course-deflist">
      {items.map((item, i) => (
        <div key={i} className="course-deflist-row">
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Tabla */
export function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="course-table-wrap">
      <table className="course-table">
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Resumen del capítulo */
export function Summary({ items }: { items: string[] }) {
  return (
    <div className="course-summary">
      <div className="course-summary-title">Resumen del capítulo</div>
      <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

// ── Ejercicios ────────────────────────────────────────────────────────────────

export interface PracticeItem {
  n: number | string;
  q: React.ReactNode;       // enunciado
  hint?: React.ReactNode;   // pista opcional
  a: React.ReactNode;       // solución (se puede mostrar/ocultar)
}

/** Ejercicio resuelto compacto (dentro del texto) */
export function Solved({
  n, title, q, a, children,
}: {
  n: string | number;
  title: string;
  q?: React.ReactNode;
  a?: React.ReactNode;
  /** Alternative: pass children as {q, a} object */
  children?: { q: React.ReactNode; a: React.ReactNode };
}) {
  const [open, setOpen] = useState(false);
  const question = q ?? children?.q;
  const answer   = a ?? children?.a;
  return (
    <div className="solved-ex">
      <div className="solved-header">
        <span className="solved-num">Ejercicio {n}</span>
        <span className="solved-title">{title}</span>
        <button className="solved-toggle" onClick={() => setOpen(o => !o)}>
          {open ? '▲ Ocultar solución' : '▼ Ver solución paso a paso'}
        </button>
      </div>
      <div className="solved-q">{question}</div>
      {open && <div className="solved-a">{answer}</div>}
    </div>
  );
}

/** Bloque de ejercicios propuestos al final del capítulo */
export function Practice({ items }: { items: PracticeItem[] }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setRevealed(r => ({ ...r, [k]: !r[k] }));
  return (
    <div className="practice-block">
      <div className="practice-header">
        <span className="practice-icon">✏️</span>
        <span className="practice-title">Ejercicios propuestos</span>
      </div>
      <ol className="practice-list">
        {items.map((item, i) => {
          const key = String(item.n ?? i);
          return (
            <li key={key} className="practice-item">
              <div className="practice-q">{item.q}</div>
              {item.hint && (
                <div className="practice-hint">💡 Pista: {item.hint}</div>
              )}
              <button
                className={`practice-reveal ${revealed[key] ? 'open' : ''}`}
                onClick={() => toggle(key)}
              >
                {revealed[key] ? '▲ Ocultar respuesta' : '▼ Ver respuesta'}
              </button>
              {revealed[key] && (
                <div className="practice-answer">{item.a}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ── Keep legacy exports for modules not yet migrated ─────────────────────────
export { P as LegacyP, Note as LegacyNote, Warn as LegacyWarn };

// ── Course data types ─────────────────────────────────────────────────────────
export interface Chapter {
  id: string;
  title: string;
  body: React.ReactNode;
}

export interface CourseModule {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  icon: string;
  license: string;
  description: string;
  chapters: Chapter[];
}

// ── Progress helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'aerotech_course_progress';

function getProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function markDone(chapterId: string) {
  const p = getProgress();
  p[chapterId] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props { modules: CourseModule[]; }

export default function CourseView({ modules }: Props) {
  const [activeModId, setActiveModId] = useState(modules[0]?.id ?? '');
  const [activeChId,  setActiveChId]  = useState(modules[0]?.chapters[0]?.id ?? '');
  const [progress,    setProgress]    = useState<Record<string, boolean>>(getProgress());
  const [menuOpen,    setMenuOpen]    = useState(true);

  const mainRef = useRef<HTMLDivElement>(null);

  const mod     = modules.find(m => m.id === activeModId) ?? modules[0];
  const chapter = mod?.chapters.find(c => c.id === activeChId) ?? mod?.chapters[0];
  const chIndex = mod?.chapters.findIndex(c => c.id === activeChId) ?? 0;

  // Volver al inicio del área de lectura cada vez que cambia el capítulo o módulo
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeChId, activeModId]);

  useEffect(() => {
    if (mod?.chapters[0]) setActiveChId(mod.chapters[0].id);
  }, [activeModId]); // eslint-disable-line

  const handleDone = () => {
    if (!chapter) return;
    markDone(chapter.id);
    setProgress(getProgress());
    const next = mod?.chapters[chIndex + 1];
    if (next) setActiveChId(next.id);
  };

  const total = mod?.chapters.length ?? 0;
  const done  = mod?.chapters.filter(c => progress[c.id]).length ?? 0;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="course-layout">

      {/* ── Chapter sidebar ── */}
      <aside className={`course-sidebar ${menuOpen ? '' : 'collapsed'}`}>
        <div className="course-mod-switcher">
          {modules.map(m => (
            <button key={m.id} className={`course-mod-btn ${activeModId === m.id ? 'active' : ''}`}
              onClick={() => setActiveModId(m.id)}>
              <span className="course-mod-code">{m.code}</span>
              <span className="course-mod-name">{m.title}</span>
              <span className="course-mod-lic">{m.license}</span>
            </button>
          ))}
        </div>

        <div className="course-progress-wrap">
          <div className="course-progress-label">
            <span>Progreso</span>
            <span>{done}/{total} · {pct}%</span>
          </div>
          <div className="course-progress-bar">
            <div className="course-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <nav className="course-chapter-list">
          {mod?.chapters.map((ch, i) => (
            <button key={ch.id}
              className={`course-ch-btn ${activeChId === ch.id ? 'active' : ''} ${progress[ch.id] ? 'done' : ''}`}
              onClick={() => setActiveChId(ch.id)}>
              <span className="course-ch-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="course-ch-title">{ch.title}</span>
              {progress[ch.id] && <span className="course-ch-check">✓</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Reading area ── */}
      <div className="course-main" ref={mainRef}>
        <button className="course-menu-toggle" onClick={() => setMenuOpen(o => !o)} title="Índice">
          {menuOpen ? '←' : '→'}
        </button>

        {chapter && (
          <article className="course-article">
            <header className="course-ch-header">
              <div className="course-ch-breadcrumb">{mod?.code} — {mod?.title}</div>
              <h1 className="course-ch-heading">{chapter.title}</h1>
            </header>

            <div className="course-ch-body">{chapter.body}</div>

            <footer className="course-ch-footer">
              <button className="course-nav-btn" disabled={chIndex === 0}
                onClick={() => mod && setActiveChId(mod.chapters[chIndex - 1]?.id)}>
                ← Anterior
              </button>
              <button className={`course-done-btn ${progress[chapter.id] ? 'already' : ''}`}
                onClick={handleDone}>
                {progress[chapter.id] ? '✓ Completado' : 'Marcar completado →'}
              </button>
              <button className="course-nav-btn" disabled={chIndex === total - 1}
                onClick={() => mod && setActiveChId(mod.chapters[chIndex + 1]?.id)}>
                Siguiente →
              </button>
            </footer>
          </article>
        )}
      </div>
    </div>
  );
}
