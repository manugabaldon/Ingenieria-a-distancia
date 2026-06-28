/**
 * Practica.tsx — Sección de práctica compartida (integrales y derivadas)
 *
 * Generador aleatorio por niveles, opción múltiple, y al responder muestra
 * si es correcto + la resolución paso a paso.
 */
import { useState, useEffect, useCallback } from 'react';
import { BlockMath, InlineMath } from '../components/Math';
import type { Level, PracticeProblem, StepsLike } from './practice';

type Kind = 'integral' | 'derivada';

const LEVELS: { id: Level; label: string }[] = [
  { id: 1, label: 'Básico' },
  { id: 2, label: 'Intermedio' },
  { id: 3, label: 'Avanzado' },
];

const LETTERS = ['A', 'B', 'C', 'D'];

// Ecuación de cada paso según el tipo de problema
function stepEq(kind: Kind, termTex: string, resultTex: string): string {
  return kind === 'integral'
    ? `\\int ${termTex}\\,dx = ${resultTex} + C`
    : `\\frac{d}{dx}\\left[${termTex}\\right] = ${resultTex}`;
}

function Resolution({ kind, steps }: { kind: Kind; steps: StepsLike }) {
  return (
    <div className="prac-resolution">
      <div className="prac-resolution-title">Resolución</div>
      {steps.linearity && (
        <p className="integ-step-desc" style={{ marginBottom: 8 }}>
          Se resuelve término a término (linealidad).
        </p>
      )}
      {steps.terms.map((t, i) => (
        <div className="integ-step" key={i}>
          <span className="integ-step-num">{i + 1}</span>
          <div className="integ-step-body">
            <div className="integ-step-rule">
              <span className="integ-step-badge">{t.rule.name}</span>
              {t.chain && <span className="integ-step-badge chain">Regla de la cadena</span>}
            </div>
            <BlockMath>{stepEq(kind, t.termTex, t.resultTex)}</BlockMath>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Practica({
  kind,
  generate,
}: {
  kind: Kind;
  generate: (level: Level) => PracticeProblem | null;
}) {
  const [level, setLevel] = useState<Level>(1);
  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [stats, setStats] = useState({ ok: 0, total: 0 });

  const newProblem = useCallback(
    (lv: Level) => {
      setPicked(null);
      setProblem(generate(lv));
    },
    [generate]
  );

  useEffect(() => {
    newProblem(level);
  }, [level, newProblem]);

  const answer = (i: number) => {
    if (picked != null || !problem) return;
    setPicked(i);
    setStats((s) => ({
      ok: s.ok + (problem.options[i].correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const noun = kind === 'integral' ? 'integral' : 'derivada';

  return (
    <div className="prac-wrap">
      {/* Cabecera: nivel + marcador */}
      <div className="prac-top">
        <div className="prac-levels">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              className={`prac-level-btn ${level === l.id ? 'active' : ''}`}
              onClick={() => setLevel(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="prac-score">
          Aciertos: <strong>{stats.ok}</strong> / {stats.total}
        </div>
      </div>

      {/* Enunciado */}
      <div className="prac-card">
        <div className="prac-prompt-label">Resuelve esta {noun}:</div>
        {problem ? (
          <BlockMath>{problem.promptTex}</BlockMath>
        ) : (
          <div className="integ-note warn">
            No se pudo generar el problema. Pulsa «Otro problema».
          </div>
        )}

        {/* Opciones */}
        {problem && (
          <div className="prac-options">
            {problem.options.map((opt, i) => {
              const revealed = picked != null;
              let cls = 'prac-option';
              if (revealed) {
                if (opt.correct) cls += ' is-correct';
                else if (i === picked) cls += ' is-wrong';
                else cls += ' is-dim';
              }
              return (
                <button key={i} className={cls} onClick={() => answer(i)} disabled={revealed}>
                  <span className="prac-option-letter">{LETTERS[i]}</span>
                  <span className="prac-option-tex">
                    <InlineMath>{opt.tex}</InlineMath>
                  </span>
                  {revealed && opt.correct && <span className="prac-mark ok">✓</span>}
                  {revealed && !opt.correct && i === picked && <span className="prac-mark no">✗</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback + resolución */}
        {picked != null && problem && (
          <>
            <div
              className={`prac-feedback ${problem.options[picked].correct ? 'ok' : 'no'}`}
            >
              {problem.options[picked].correct
                ? '¡Correcto! 🎉'
                : 'No es correcta. Revisa la resolución:'}
            </div>
            {problem.steps && <Resolution kind={kind} steps={problem.steps} />}
          </>
        )}

        <div className="prac-actions">
          <button className="hero-btn-primary" onClick={() => newProblem(level)}>
            {picked != null ? 'Siguiente problema →' : 'Otro problema'}
          </button>
        </div>
      </div>
    </div>
  );
}
