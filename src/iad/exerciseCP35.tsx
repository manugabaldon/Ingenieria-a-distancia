import type { ExerciseStep } from './ExerciseGuide';

const steps: ExerciseStep[] = [
  // ── Paso 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Leer la velocidad y la condición inicial',
    subtitle: 'Componentes de la velocidad como función del tiempo',
    question: (
      <>
        El punto se mueve en el plano OXY con velocidad
        <br /><br />
        <strong>Vx = −v·sen((v/a)·t)</strong>, &nbsp; <strong>Vy = v·cos((v/a)·t)</strong>,
        &nbsp; partiendo de <strong>A(a,0)</strong> con <strong>v</strong> constante.
        <br /><br />
        ¿Qué son exactamente ẋ y ẏ aquí, y qué estrategia usarás para hallar las
        <strong> ecuaciones horarias</strong>?
      </>
    ),
    hint: (
      <>
        La velocidad ya está dada como función del tiempo, así que ẋ y ẏ son esas
        expresiones directamente:
        <div className="formula-box">
          ẋ = −v·sen((v/a)·t) &nbsp;&nbsp; ẏ = v·cos((v/a)·t)
        </div>
        Como dependen solo de t (no de x, y), puedes <strong>integrar directamente</strong>
        respecto al tiempo para obtener x(t) e y(t).
      </>
    ),
    solution: (
      <>
        <p>Las componentes de la velocidad son las derivadas de la posición:</p>
        <div className="formula-box">
          ẋ = −v·sen((v/a)·t) &nbsp;&nbsp; ẏ = v·cos((v/a)·t) &nbsp;&nbsp; con A:(a,0)
        </div>
        <p>
          Al ser funciones del tiempo, integramos cada componente respecto a t y
          fijamos la constante con la condición inicial. La trayectoria vendrá después,
          eliminando el tiempo.
        </p>
        <span className="result">ẋ = −v·sen((v/a)t), &nbsp; ẏ = v·cos((v/a)t)</span>
      </>
    ),
  },

  // ── Paso 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Integrar ẋ → x(t)',
    subtitle: 'Primera ecuación horaria',
    question: (
      <>
        Integra <strong>ẋ = −v·sen((v/a)·t)</strong> respecto al tiempo y aplica la
        condición inicial <strong>t=0, x=a</strong> para hallar la constante.
      </>
    ),
    hint: (
      <>
        La primitiva de sen((v/a)t) es −(a/v)·cos((v/a)t). Por tanto:
        <div className="formula-box">
          x = −v·(−a/v)·cos((v/a)t) + C = a·cos((v/a)t) + C
        </div>
        Impón t=0, x=a: a = a·cos(0) + C.
      </>
    ),
    solution: (
      <>
        <p>Integrando respecto al tiempo:</p>
        <div className="formula-box">
          x = ∫ −v·sen((v/a)t) dt = a·cos((v/a)t) + C
        </div>
        <p>Con t=0, x=a: &nbsp; a = a·cos(0) + C = a + C ⟹ C = 0. Por tanto:</p>
        <div className="formula-box">
          <strong>x = a·cos((v/a)·t)</strong>
        </div>
        <span className="result">x = a·cos((v/a)·t)</span>
      </>
    ),
  },

  // ── Paso 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Integrar ẏ → y(t)',
    subtitle: 'Segunda ecuación horaria',
    question: (
      <>
        Integra <strong>ẏ = v·cos((v/a)·t)</strong> respecto al tiempo y aplica
        <strong> t=0, y=0</strong>.
      </>
    ),
    hint: (
      <>
        La primitiva de cos((v/a)t) es (a/v)·sen((v/a)t). Por tanto:
        <div className="formula-box">
          y = v·(a/v)·sen((v/a)t) + C = a·sen((v/a)t) + C
        </div>
        Impón t=0, y=0: 0 = a·sen(0) + C.
      </>
    ),
    solution: (
      <>
        <p>Integrando respecto al tiempo:</p>
        <div className="formula-box">
          y = ∫ v·cos((v/a)t) dt = a·sen((v/a)t) + C
        </div>
        <p>Con t=0, y=0: &nbsp; 0 = a·sen(0) + C = C ⟹ C = 0. Las ecuaciones horarias son:</p>
        <div className="formula-box">
          x = a·cos((v/a)·t) &nbsp;&nbsp; y = a·sen((v/a)·t)
        </div>
        <p>
          Es un <strong>movimiento circular uniforme</strong> de radio a y velocidad
          angular ω = v/a.
        </p>
        <span className="result">y = a·sen((v/a)·t)</span>
      </>
    ),
  },

  // ── Paso 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Eliminar el tiempo → trayectoria',
    subtitle: 'De las horarias a y(x)',
    question: (
      <>
        Elimina el parámetro <strong>t</strong> combinando x(t) e y(t). ¿Qué curva
        describe el punto?
      </>
    ),
    hint: (
      <>
        Eleva al cuadrado y suma, usando sen²α + cos²α = 1:
        <div className="formula-box">
          x² + y² = a²cos²((v/a)t) + a²sen²((v/a)t)
        </div>
        El corchete cos²+sen² vale 1.
      </>
    ),
    solution: (
      <>
        <p>Elevando al cuadrado y sumando las ecuaciones horarias:</p>
        <div className="formula-box">
          x² + y² = a²cos²((v/a)t) + a²sen²((v/a)t) = a²·[cos² + sen²] = a²
        </div>
        <p>La trayectoria es una <strong>circunferencia de radio a</strong> centrada en el origen:</p>
        <div className="formula-box">
          <strong>x² + y² = a²</strong>
        </div>
        <span className="result">x² + y² = a²</span>
      </>
    ),
  },

  // ── Paso 5 ───────────────────────────────────────────────────────────────────
  {
    title: 'Ley horaria del movimiento',
    subtitle: 'Arco recorrido s(t) = ∫|V| dt',
    question: (
      <>
        La ley horaria es el arco recorrido <strong>s(t) = ∫₀ᵗ |V| dt</strong>.
        <br /><br />
        Calcula el módulo |V| a partir de ẋ e ẏ y obtén s(t).
      </>
    ),
    hint: (
      <>
        |V| = √(ẋ² + ẏ²). Con ẋ = −v·sen((v/a)t), ẏ = v·cos((v/a)t):
        <div className="formula-box">
          |V| = √(v²sen² + v²cos²) = v
        </div>
        El módulo es constante, así que la integral es inmediata.
      </>
    ),
    solution: (
      <>
        <p>El módulo de la velocidad sale constante:</p>
        <div className="formula-box">
          |V| = √(ẋ²+ẏ²) = √(v²sen²((v/a)t) + v²cos²((v/a)t)) = v
        </div>
        <p>Integrando un módulo constante:</p>
        <div className="formula-box">
          s = ∫₀ᵗ v dt = <strong>v·t</strong>
        </div>
        <p>
          Movimiento <strong>circular uniforme</strong>: velocidad escalar constante v
          (aceleración tangencial nula) y aceleración puramente centrípeta
          aₙ = v²/a = ω²a hacia el centro. Compruébalo en la pestaña <em>Simulador</em>.
        </p>
        <span className="result">s = v·t</span>
      </>
    ),
  },
];

export default steps;
