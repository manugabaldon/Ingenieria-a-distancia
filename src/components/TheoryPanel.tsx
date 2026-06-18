import React from 'react';
import './TheoryPanel.css';

export interface TheorySection {
  title: string;
  body: React.ReactNode;
}

export interface TheoryContent {
  intro: React.ReactNode;
  sections: TheorySection[];
  references: string[];
}

interface Props {
  content: TheoryContent;
}

export default function TheoryPanel({ content }: Props) {
  return (
    <div className="theory-panel">
      <div className="theory-body">
        <div className="theory-intro">{content.intro}</div>

        {content.sections.map((s, i) => (
          <section key={i} className="theory-section">
            <h3 className="theory-h3">{s.title}</h3>
            {s.body}
          </section>
        ))}

        <section className="theory-section">
          <h3 className="theory-h3">Referencias</h3>
          <ul className="theory-refs">
            {content.references.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

// ── Helpers for theory content ─────────────────────────────────────────────

export function Eq({ children }: { children: React.ReactNode }) {
  return <div className="theory-eq">{children}</div>;
}

export function EqInline({ children }: { children: React.ReactNode }) {
  return <code className="theory-eq-inline">{children}</code>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="theory-p">{children}</p>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return <div className="theory-note">{children}</div>;
}

export function Warn({ children }: { children: React.ReactNode }) {
  return <div className="theory-warn">{children}</div>;
}

/** Foto con pie de foto */
export function TheoryFigure({
  src, alt, caption, height = 220,
}: {
  src: string; alt: string; caption?: string; height?: number;
}) {
  return (
    <figure className="theory-figure">
      <img src={src} alt={alt} className="theory-figure-img" style={{ height }} loading="lazy" />
      {caption && <figcaption className="theory-figure-caption">{caption}</figcaption>}
    </figure>
  );
}

/** Grid de dos columnas (foto|texto ó foto|foto) */
export function TheoryGrid({ children }: { children: React.ReactNode }) {
  return <div className="theory-grid">{children}</div>;
}

/** Caja para diagrama SVG con pie de foto */
export function TheorySvg({
  children, caption,
}: {
  children: React.ReactNode; caption?: string;
}) {
  return (
    <figure className="theory-figure theory-svgbox">
      {children}
      {caption && <figcaption className="theory-figure-caption">{caption}</figcaption>}
    </figure>
  );
}

export function DefList({ items }: { items: { term: string; def: React.ReactNode }[] }) {
  return (
    <dl className="theory-deflist">
      {items.map(({ term, def }, i) => (
        <div key={i} className="theory-deflist-row">
          <dt>{term}</dt>
          <dd>{def}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="theory-table-wrap">
      <table className="theory-table">
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
