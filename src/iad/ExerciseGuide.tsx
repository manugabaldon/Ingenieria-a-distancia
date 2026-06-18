import { useState } from 'react';
import './ExerciseGuide.css';

export interface ExerciseStep {
  title: string;
  subtitle: string;
  question: React.ReactNode;
  hint: React.ReactNode;
  solution: React.ReactNode;
}

interface Props {
  title: string;
  intro: React.ReactNode;
  steps: ExerciseStep[];
}

function Step({
  step,
  index,
  isActive,
  isSolved,
  onSolve,
  onNext,
  isLast,
}: {
  step: ExerciseStep;
  index: number;
  isActive: boolean;
  isSolved: boolean;
  onSolve: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const [showSolution, setShowSolution] = useState(false);

  const stateClass = isSolved ? 'solved' : isActive ? 'active' : '';

  return (
    <div className={`eg-step ${stateClass}`}>
      {/* ── Cabecera ── */}
      <div className="eg-step-header" onClick={() => !isSolved && !isActive && undefined}>
        <div className="eg-num">{index + 1}</div>
        <div className="eg-step-info">
          <div className="eg-step-title">{step.title}</div>
          <div className="eg-step-sub">{step.subtitle}</div>
        </div>
        <span className="eg-status-icon">
          {isSolved ? '✅' : isActive ? '✏️' : '🔒'}
        </span>
      </div>

      {/* ── Cuerpo (abierto si activo o resuelto) ── */}
      <div className={`eg-body ${isActive || isSolved ? 'open' : ''}`}>

        {/* Enunciado */}
        <div className="eg-question">{step.question}</div>

        {/* Pista */}
        <div className="eg-hint">
          <div className="eg-hint-label">💡 Pista — teoría y fórmulas</div>
          <div className="eg-hint-body">{step.hint}</div>
        </div>

        {/* Desplegable solución */}
        <button
          className={`eg-reveal-btn ${showSolution ? 'open' : ''}`}
          onClick={() => setShowSolution(s => !s)}
        >
          {showSolution ? '🔓 Ocultar solución' : '🔍 Mostrar solución paso a paso'}
          <span className="eg-chevron">▼</span>
        </button>

        <div className={`eg-solution ${showSolution ? 'open' : ''}`}>
          <div className="eg-solution-inner">{step.solution}</div>
        </div>

        {/* Controles */}
        {isActive && (
          <div className="eg-step-controls">
            {!isSolved && (
              <button className="eg-btn-done" onClick={onSolve}>
                ✓ He completado este paso
              </button>
            )}
            {!isLast && (
              <button className="eg-btn-next" onClick={onNext}>
                Siguiente paso →
              </button>
            )}
          </div>
        )}

        {isSolved && !isLast && (
          <div className="eg-step-controls">
            <button className="eg-btn-next" onClick={onNext}>
              Siguiente paso →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExerciseGuide({ title, intro, steps }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [solvedSet, setSolvedSet]     = useState<Set<number>>(new Set());

  const solve = (i: number) => setSolvedSet(s => new Set([...s, i]));
  const next  = (i: number) => {
    solve(i);
    if (i + 1 < steps.length) setActiveIndex(i + 1);
  };

  const solvedCount = solvedSet.size;
  const pct         = Math.round((solvedCount / steps.length) * 100);
  const allDone     = solvedCount === steps.length;

  return (
    <div className="eg-wrap">
      {/* Intro */}
      <div className="eg-intro">
        <h3>📝 {title}</h3>
        <p>{intro}</p>
      </div>

      {/* Barra de progreso */}
      <div className="eg-progress">
        <span className="eg-progress-label">Progreso</span>
        <div className="eg-progress-bar-wrap">
          <div className="eg-progress-bar" style={{ width: `${pct}%` }} />
        </div>
        <span className="eg-progress-label">{solvedCount}/{steps.length} pasos</span>
      </div>

      {/* Pasos */}
      {steps.map((step, i) => (
        <Step
          key={i}
          step={step}
          index={i}
          isActive={i === activeIndex}
          isSolved={solvedSet.has(i)}
          onSolve={() => solve(i)}
          onNext={() => next(i)}
          isLast={i === steps.length - 1}
        />
      ))}

      {/* Mensaje final */}
      {allDone && (
        <div className="eg-complete">
          <h3>¡Ejercicio completado! 🎉</h3>
          <p>
            Has resuelto todos los pasos del CP-2. Comprueba el simulador para
            visualizar el movimiento con los resultados que has obtenido.
          </p>
        </div>
      )}
    </div>
  );
}
