import type { ExerciseStep } from './ExerciseGuide';

const steps: ExerciseStep[] = [
  // ── Paso 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Leer el campo de velocidades',
    subtitle: 'Componentes de la velocidad en cartesianas',
    question: (
      <>
        El punto se mueve en el plano OXY con velocidad
        <br /><br />
        <strong>V = −(v/a)·y·i + (v/a)·x·j</strong>, &nbsp; partiendo de <strong>A(a,0)</strong>.
        <br /><br />
        ¿Qué son exactamente ẋ y ẏ en este problema, y qué estrategia usarás para
        hallar la <strong>trayectoria</strong> (eliminar el tiempo)?
      </>
    ),
    hint: (
      <>
        El campo de velocidades te da directamente las derivadas de la posición:
        <div className="formula-box">
          ẋ = −(v/a)·y &nbsp;&nbsp; ẏ = (v/a)·x
        </div>
        Para la trayectoria y(x) no necesitas el tiempo: divide ẏ entre ẋ para
        obtener dy/dx.
      </>
    ),
    solution: (
      <>
        <p>Las componentes de la velocidad son:</p>
        <div className="formula-box">
          ẋ = −(v/a)·y &nbsp;&nbsp; ẏ = (v/a)·x &nbsp;&nbsp; con A:(a,0)
        </div>
        <p>
          Para la trayectoria eliminamos el tiempo con dy/dx = ẏ/ẋ. Las ecuaciones
          horarias vendrán después, integrando una componente respecto a t.
        </p>
        <span className="result">ẋ = −(v/a)y, &nbsp; ẏ = (v/a)x</span>
      </>
    ),
  },

  // ── Paso 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Integrar para obtener la trayectoria',
    subtitle: 'Eliminar el tiempo → y(x)',
    question: (
      <>
        Calcula <strong>dy/dx = ẏ/ẋ</strong>, separa variables, integra y aplica la
        condición inicial <strong>A(a,0)</strong> para hallar la constante.
        <br /><br />
        ¿Qué curva describe el punto?
      </>
    ),
    hint: (
      <>
        Al dividir, la razón v/a se cancela:
        <div className="formula-box">
          dy/dx = (v/a·x)/(−v/a·y) = −x/y
        </div>
        Queda ∫y·dy = −∫x·dx → y²/2 = −x²/2 + C. Impón A(a,0) para C.
      </>
    ),
    solution: (
      <>
        <p>Dividiendo las componentes y separando variables:</p>
        <div className="formula-box">
          dy/dx = −x/y &nbsp;⟶&nbsp; ∫y·dy = −∫x·dx &nbsp;⟶&nbsp; y²/2 = −x²/2 + C
        </div>
        <p>Con A(a,0): 0 + a²/2 = C ⟹ C = a²/2. Sustituyendo:</p>
        <div className="formula-box">
          y²/2 + x²/2 = a²/2 &nbsp;⟶&nbsp; <strong>x² + y² = a²</strong>
        </div>
        <p>La trayectoria es una <strong>circunferencia de radio a</strong> centrada en el origen.</p>
        <span className="result">x² + y² = a²</span>
      </>
    ),
  },

  // ── Paso 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Hallar x(t): primera ecuación horaria',
    subtitle: 'Integrar ẋ con y = √(a²−x²)',
    question: (
      <>
        Usa <strong>ẋ = −(v/a)·y</strong> y la trayectoria <strong>y = √(a²−x²)</strong>{' '}
        para escribir una ecuación solo en x. Separa variables, integra y aplica
        <strong> t=0, x=a</strong>.
      </>
    ),
    hint: (
      <>
        Sustituyendo y queda ẋ = −(v/a)·√(a²−x²). Al separar:
        <div className="formula-box">
          ∫ dx/√(a²−x²) = −∫ (v/a) dt &nbsp;⟶&nbsp; arcsen(x/a) + (v/a)t = C
        </div>
        Recuerda que la primitiva de 1/√(a²−x²) es arcsen(x/a).
      </>
    ),
    solution: (
      <>
        <p>Sustituyendo y = √(a²−x²) e integrando:</p>
        <div className="formula-box">
          ẋ = −(v/a)·√(a²−x²)<br />
          ∫ dx/√(a²−x²) = −∫ (v/a) dt &nbsp;⟶&nbsp; arcsen(x/a) + (v/a)t = C
        </div>
        <p>Con t=0, x=a: arcsen(1) = C ⟹ C = π/2. Despejando x:</p>
        <div className="formula-box">
          arcsen(x/a) + (v/a)t = π/2 &nbsp;⟶&nbsp; <strong>x = a·cos((v/a)·t)</strong>
        </div>
        <span className="result">x = a·cos((v/a)·t)</span>
      </>
    ),
  },

  // ── Paso 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Hallar y(t): segunda ecuación horaria',
    subtitle: 'Sustituir x(t) en la trayectoria',
    question: (
      <>
        Despeja <strong>y</strong> de x²+y²=a² y sustituye la x(t) que acabas de
        obtener. Usa la identidad <strong>1 − cos²α = sen²α</strong>.
      </>
    ),
    hint: (
      <>
        y = √(a²−x²). Mete x = a·cos((v/a)t) dentro de la raíz:
        <div className="formula-box">
          y = √(a²(1 − cos²((v/a)t))) = √(a²·sen²((v/a)t))
        </div>
        Al extraer la raíz aparece a·sen((v/a)t).
      </>
    ),
    solution: (
      <>
        <p>Sustituyendo x(t) en la raíz y aplicando 1−cos²α = sen²α:</p>
        <div className="formula-box">
          y = √(a² − (a·cos((v/a)t))²) = √(a²(1 − cos²((v/a)t))) = <strong>a·sen((v/a)·t)</strong>
        </div>
        <p>Las ecuaciones horarias completas son:</p>
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
        |V| = √(ẋ² + ẏ²). Con ẋ = −(v/a)y, ẏ = (v/a)x:
        <div className="formula-box">
          |V| = (v/a)·√(x² + y²) = (v/a)·a = v
        </div>
        El módulo es constante (el radicando es x²+y²=a²), así que la integral es inmediata.
      </>
    ),
    solution: (
      <>
        <p>El módulo de la velocidad sale constante:</p>
        <div className="formula-box">
          |V| = √(ẋ²+ẏ²) = √((v²/a²)y² + (v²/a²)x²) = (v/a)·√(x²+y²) = (v/a)·a = v
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
