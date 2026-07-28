import { useState, useEffect, useRef, useCallback } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { searchItems, type SearchItem, type SearchTarget } from './searchIndex';
import './GlobalSearch.css';

export default function GlobalSearch({
  items, onSelect,
}: {
  items: SearchItem[];
  onSelect: (target: SearchTarget) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim() ? searchItems(items, query, 8) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const select = useCallback((item: SearchItem) => {
    onSelect(item.target);
    close();
  }, [onSelect, close]);

  // Atajo global: Cmd/Ctrl+K abre el buscador, Esc lo cierra
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const handleInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) select(item);
    }
  };

  return (
    <>
      <button
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Buscar en apuntes y ejercicios"
      >
        <span className="search-trigger-icon">🔍</span>
        <span className="search-trigger-text">Buscar</span>
        <span className="search-trigger-kbd">⌘K</span>
      </button>

      {open && (
        <div className="search-overlay" onClick={close}>
          <div className="search-panel" onClick={e => e.stopPropagation()}>
            <div className="search-input-row">
              <span className="search-input-icon">🔍</span>
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Busca por título, asignatura, tema…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button className="search-close" onClick={close} aria-label="Cerrar buscador">✕</button>
            </div>

            <div className="search-results">
              {query.trim() === '' ? (
                <div className="search-hint">
                  Busca entre la teoría, los ejercicios resueltos y el temario oficial.
                </div>
              ) : results.length === 0 ? (
                <div className="search-hint">Sin resultados para «{query}».</div>
              ) : (
                <ul className="search-list">
                  {results.map((item, i) => (
                    <li key={item.id}>
                      <button
                        className={`search-result${i === activeIndex ? ' active' : ''}`}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => select(item)}
                      >
                        <span className="search-result-icon">{item.icon}</span>
                        <span className="search-result-text">
                          <span className="search-result-title">{item.title}</span>
                          <span className="search-result-subtitle">{item.subtitle}</span>
                        </span>
                        <span className="search-result-badge">{item.badge}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
