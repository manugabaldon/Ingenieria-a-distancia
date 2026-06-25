import type { ExerciseStep } from './ExerciseGuide';

const steps: ExerciseStep[] = [
  // ── Paso 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Leer la aceleración y las condiciones iniciales',
    subtitle: 'Componentes de la aceleración como función del tiempo',
    question: (
      <>
        El punto se mueve en el plano OXY con aceleración
        <br /><br />
        <strong>ẍ = −(v²/a)·cos((v/a)·t)</strong>, &nbsp; <strong>ÿ = −(v²/a)·sen((v/a)·t)</strong>,
        <br /><br />
        partiendo de <strong>A(a,0)</strong> con velocidad inicial <strong>v = v·ĵ</strong> (es decir
        ẋ(0)=0, ẏ(0)=v). ¿Qué estrategia usarás para hallar las <strong>ecuaciones horarias</strong>?
      </>
    ),
    hint: (
      <>
        La aceleración está dada como función del tiempo, así que ẍ e ÿ son esas expresiones
        directamente. Como dependen solo de t, puedes <strong>integrar dos veces</strong> respecto al
        tiempo: primero a → v (con la velocidad inicial) y luego v → r (con la posición inicial).
        <div className="formula-box">
          ẍ = −(v²/a)·cos((v/a)t) &nbsp;&nbsp; ÿ = −(v²/a)·sen((v/a)t)
        </div>
      </>
    ),
    solution: (
      <>
        <p>Las componentes de la aceleración son las segundas derivadas de la posición:</p>
        <div className="formula-box">
          ẍ = −(v²/a)·cos((v/a)t) &nbsp;&nbsp; ÿ = −(v²/a)·sen((v/a)t)
        </div>
        <p>
          Integramos cada componente respecto a t, fijando la constante con la condición inicial.
          Tras la <strong>primera</strong> integración obtenemos la velocidad (¡el dato del CP-35!);
          tras la <strong>segunda</strong>, las ecuaciones horarias.
        </p>
        <span className="result">Estrategia: integrar dos veces (a → v → r)</span>
      </>
    ),
  },

  // ── Paso 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Primera integración → velocidad',
    subtitle: 'De la aceleración a ẋ(t), ẏ(t)',
    question: (
      <>
        Integra <strong>ẍ = −(v²/a)·cos((v/a)t)</strong> y <strong>ÿ = −(v²/a)·sen((v/a)t)</strong>
        respecto al tiempo y aplica <strong>ẋ(0)=0, ẏ(0)=v</strong>.
      </>
    ),
    hint: (
      <>
        La primitiva de cos((v/a)t) es (a/v)·sen((v/a)t), y la de sen((v/a)t) es −(a/v)·cos((v/a)t):
        <div className="formula-box">
          ẋ = −(v²/a)·(a/v)·sen((v/a)t) + C = −v·sen((v/a)t) + C<br />
          ẏ = −(v²/a)·(−a/v)·cos((v/a)t) + C = v·cos((v/a)t) + C
        </div>
        Impón ẋ(0)=0 y ẏ(0)=v para hallar las constantes.
      </>
    ),
    solution: (
      <>
        <p>Integrando ambas componentes respecto al tiempo:</p>
        <div className="formula-box">
          ẋ = −v·sen((v/a)t) + C &nbsp;⟶&nbsp; ẋ(0)=0: &nbsp; 0 = 0 + C ⟹ C = 0<br />
          ẏ = v·cos((v/a)t) + C &nbsp;⟶&nbsp; ẏ(0)=v: &nbsp; v = v + C ⟹ C = 0
        </div>
        <p>La velocidad queda (justo el dato del CP-35):</p>
        <div className="formula-box">
          <strong>ẋ = −v·sen((v/a)t)</strong> &nbsp;&nbsp; <strong>ẏ = v·cos((v/a)t)</strong>
        </div>
        <span className="result">ẋ = −v·sen((v/a)t), &nbsp; ẏ = v·cos((v/a)t)</span>
      </>
    ),
  },

  // ── Paso 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Segunda integración → ecuaciones horarias',
    subtitle: 'De la velocidad a x(t), y(t)',
    question: (
      <>
        Integra otra vez <strong>ẋ = −v·sen((v/a)t)</strong> y <strong>ẏ = v·cos((v/a)t)</strong>,
        aplicando ahora la posición inicial <strong>A(a,0)</strong>: t=0, x=a, y=0.
      </>
    ),
    hint: (
      <>
        Mismas primitivas que antes:
        <div className="formula-box">
          x = −v·(−a/v)·cos((v/a)t) + C = a·cos((v/a)t) + C<br />
          y = v·(a/v)·sen((v/a)t) + C = a·sen((v/a)t) + C
        </div>
        Impón t=0, x=a (⟹ C=0) y t=0, y=0 (⟹ C=0).
      </>
    ),
    solution: (
      <>
        <p>Integrando la velocidad:</p>
        <div className="formula-box">
          x = a·cos((v/a)t) + C &nbsp;⟶&nbsp; x(0)=a: &nbsp; a = a + C ⟹ C = 0<br />
          y = a·sen((v/a)t) + C &nbsp;⟶&nbsp; y(0)=0: &nbsp; 0 = 0 + C ⟹ C = 0
        </div>
        <p>Las ecuaciones horarias son:</p>
        <div className="formula-box">
          <strong>x = a·cos((v/a)·t)</strong> &nbsp;&nbsp; <strong>y = a·sen((v/a)·t)</strong>
        </div>
        <p>
          Es un <strong>movimiento circular uniforme</strong> de radio a y velocidad angular ω = v/a.
        </p>
        <span className="result">x = a·cos((v/a)t), &nbsp; y = a·sen((v/a)t)</span>
      </>
    ),
  },

  // ── Paso 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Eliminar el tiempo → trayectoria',
    subtitle: 'De las horarias a y(x)',
    question: (
      <>
        Elimina el parámetro <strong>t</strong> combinando x(t) e y(t). ¿Qué curva describe el punto?
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
          (aceleración tangencial nula) y aceleración puramente centrípeta aₙ = v²/a = ω²a hacia el
          centro — que es justo el módulo del dato de partida. Compruébalo en la pestaña
          <em> Simulador</em>.
        </p>
        <span className="result">s = v·t</span>
      </>
    ),
  },
];

export default steps;
