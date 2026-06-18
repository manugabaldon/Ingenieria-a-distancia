import type { ExerciseStep } from './ExerciseGuide';

const steps: ExerciseStep[] = [
  // ── Paso 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Identificar la trayectoria y la condición inicial',
    subtitle: 'Cinemática — ecuaciones paramétricas',
    question: (
      <>
        El enunciado nos da las ecuaciones de la hélice en función del ángulo θ:
        <br /><br />
        <strong>x = R·cosθ &nbsp;|&nbsp; y = R·senθ &nbsp;|&nbsp; z = √3·R·θ</strong>
        <br /><br />
        Y nos dice que en <em>t = 0</em> el punto está en (0, R, √3/2·π·R).
        <br /><br />
        ¿Cuál es el valor de θ en el instante inicial (θ₀)?
      </>
    ),
    hint: (
      <>
        Sustituye las coordenadas iniciales en las ecuaciones de la hélice y
        despeja θ₀. Recuerda que para la ecuación de <em>x</em>:
        <div className="formula-box">
          x₀ = R·cosθ₀ = 0 &nbsp;⟹&nbsp; cosθ₀ = 0
        </div>
        y que el ángulo debe ser coherente también con <em>y₀ = R</em> (positivo).
        Los ángulos que anulan el coseno son π/2 y 3π/2.
      </>
    ),
    solution: (
      <>
        <p>Sustituimos las tres condiciones iniciales:</p>
        <div className="formula-box">
          x₀ = R·cosθ₀ = 0 &nbsp;⟹&nbsp; cosθ₀ = 0 &nbsp;⟹&nbsp; θ₀ = π/2 ó 3π/2<br />
          y₀ = R·senθ₀ = R &nbsp;⟹&nbsp; senθ₀ = 1 &nbsp;⟹&nbsp; θ₀ = π/2 ✓<br />
          Verificamos z₀ = √3·R·(π/2) = √3π/2·R ✓
        </div>
        <p>
          El ángulo θ₀ = π/2 es coherente con las tres ecuaciones.
        </p>
        <span className="result">θ₀ = π/2 rad</span>
      </>
    ),
  },

  // ── Paso 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Derivar las ecuaciones de posición',
    subtitle: 'Regla de la cadena — obtener la velocidad',
    question: (
      <>
        Las ecuaciones están en función de θ, pero θ a su vez depende del tiempo.
        <br /><br />
        Deriva x(θ), y(θ), z(θ) respecto al tiempo para obtener las componentes
        de la velocidad: <strong>ẋ, ẏ, ż</strong>
      </>
    ),
    hint: (
      <>
        Usa la <strong>regla de la cadena</strong>: si x = f(θ) y θ = θ(t),
        entonces:
        <div className="formula-box">
          ẋ = dx/dt = (dx/dθ)·(dθ/dt) = (dx/dθ)·θ̇
        </div>
        Recuerda las derivadas básicas:
        <div className="formula-box">
          d(cosθ)/dθ = −sinθ<br />
          d(sinθ)/dθ = cosθ<br />
          d(θ)/dθ = 1
        </div>
        Llama <strong>θ̇ = dθ/dt</strong> (velocidad angular, incógnita por ahora).
      </>
    ),
    solution: (
      <>
        <p>Aplicamos la regla de la cadena a cada ecuación:</p>
        <div className="formula-box">
          ẋ = d(R·cosθ)/dt = R·(−sinθ)·θ̇ = <strong>−R·θ̇·sinθ</strong><br />
          ẏ = d(R·senθ)/dt = R·cosθ·θ̇ &nbsp;&nbsp; = <strong> R·θ̇·cosθ</strong><br />
          ż = d(√3·R·θ)/dt = √3·R·θ̇ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <strong> √3·R·θ̇</strong>
        </div>
        <p>Las tres componentes de la velocidad dependen de θ̇ y de la posición θ.</p>
        <span className="result">v = (−Rθ̇sinθ, Rθ̇cosθ, √3Rθ̇)</span>
      </>
    ),
  },

  // ── Paso 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Calcular el módulo de la velocidad',
    subtitle: 'Álgebra — simplificación con identidad trigonométrica',
    question: (
      <>
        Con las componentes ẋ, ẏ, ż del paso anterior, calcula el
        módulo de la velocidad:
        <br /><br />
        <strong>|v| = √(ẋ² + ẏ² + ż²)</strong>
        <br /><br />
        Simplifica la expresión todo lo posible. ¿Qué identidad trigonométrica
        te permite reducirla?
      </>
    ),
    hint: (
      <>
        Eleva al cuadrado cada componente y súmalas. Fíjate en los términos que
        tienen sin²θ y cos²θ juntos:
        <div className="formula-box">
          sin²θ + cos²θ = 1 &nbsp;&nbsp; (identidad de Pitágoras)
        </div>
        Factoriza R²θ̇² como factor común antes de aplicar la identidad.
      </>
    ),
    solution: (
      <>
        <div className="formula-box">
          |v|² = ẋ² + ẏ² + ż²<br />
          &nbsp;&nbsp;&nbsp;= (−Rθ̇sinθ)² + (Rθ̇cosθ)² + (√3·Rθ̇)²<br />
          &nbsp;&nbsp;&nbsp;= R²θ̇²sin²θ + R²θ̇²cos²θ + 3R²θ̇²<br />
          &nbsp;&nbsp;&nbsp;= R²θ̇²·(sin²θ + cos²θ) + 3R²θ̇²<br />
          &nbsp;&nbsp;&nbsp;= R²θ̇²·1 + 3R²θ̇²<br />
          &nbsp;&nbsp;&nbsp;= 4R²θ̇²
        </div>
        <p>Tomando raíz cuadrada (θ̇ {'>'} 0):</p>
        <div className="formula-box">
          |v| = 2R·θ̇
        </div>
        <p>
          Nota importante: el módulo <em>no depende de θ</em>, solo de θ̇ y R.
          Esto tiene consecuencias en el paso siguiente.
        </p>
        <span className="result">|v| = 2R·θ̇</span>
      </>
    ),
  },

  // ── Paso 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Obtener θ(t): expresión en función del tiempo',
    subtitle: 'Integración — θ̇ constante',
    question: (
      <>
        El enunciado dice que la velocidad escalar <em>v</em> es <strong>constante</strong>.
        <br /><br />
        Sabiendo que |v| = 2R·θ̇ = cte, determina θ̇ e integra para obtener
        <strong> θ(t)</strong>. Usa la condición inicial θ(0) = π/2.
      </>
    ),
    hint: (
      <>
        Si |v| = 2R·θ̇ = constante, entonces θ̇ también es constante:
        <div className="formula-box">
          θ̇ = v / (2R) = cte
        </div>
        Una vez que θ̇ es constante, integrar es inmediato:
        <div className="formula-box">
          θ(t) = θ̇·t + C
        </div>
        La constante C se determina con la condición inicial θ(0) = π/2.
      </>
    ),
    solution: (
      <>
        <p>Dado que v = cte y |v| = 2Rθ̇:</p>
        <div className="formula-box">
          θ̇ = v/(2R) = constante
        </div>
        <p>Integramos respecto al tiempo:</p>
        <div className="formula-box">
          θ(t) = θ̇·t + C = (v/2R)·t + C
        </div>
        <p>Aplicamos la condición inicial θ(0) = π/2:</p>
        <div className="formula-box">
          π/2 = (v/2R)·0 + C &nbsp;⟹&nbsp; C = π/2
        </div>
        <span className="result">θ(t) = π/2 + (v/2R)·t</span>
      </>
    ),
  },

  // ── Paso 5 ───────────────────────────────────────────────────────────────────
  {
    title: 'Aceleración tangencial aₜ',
    subtitle: 'Componentes intrínsecas — velocidad constante',
    question: (
      <>
        La aceleración tiene dos componentes intrínsecas: la tangencial aₜ
        (en la dirección del movimiento) y la normal aₙ (perpendicular).
        <br /><br />
        ¿Cuánto vale <strong>aₜ</strong> en este ejercicio? Razona la respuesta
        antes de calcular nada.
      </>
    ),
    hint: (
      <>
        La aceleración tangencial es la variación del módulo de la velocidad:
        <div className="formula-box">
          aₜ = dv/dt = d|v|/dt
        </div>
        Si la velocidad escalar es constante, su derivada es cero. Esta es la
        clave del ejercicio: no confundas el <em>vector</em> velocidad (que sí
        cambia de dirección) con el <em>módulo</em> de la velocidad (que es cte).
      </>
    ),
    solution: (
      <>
        <p>
          El enunciado establece que <em>v = |v| = cte</em>. Por definición:
        </p>
        <div className="formula-box">
          aₜ = dv/dt = d(cte)/dt = 0
        </div>
        <p>
          Aunque la partícula cambia de dirección continuamente (porque sigue
          una hélice), su rapidez no varía, así que no hay aceleración en la
          dirección del movimiento.
        </p>
        <span className="result">aₜ = 0</span>
      </>
    ),
  },

  // ── Paso 6 ───────────────────────────────────────────────────────────────────
  {
    title: 'Derivar la velocidad — obtener la aceleración',
    subtitle: 'Segunda derivada — θ̈ = 0',
    question: (
      <>
        Para calcular aₙ necesitamos las componentes cartesianas de la
        aceleración: <strong>ẍ, ÿ, z̈</strong>.
        <br /><br />
        Deriva de nuevo las expresiones de ẋ, ẏ, ż del paso 2.
        Recuerda que θ̈ = dθ̇/dt.
      </>
    ),
    hint: (
      <>
        Como θ̇ = v/(2R) es constante, su derivada es cero: <strong>θ̈ = 0</strong>.
        <br /><br />
        Al derivar ẋ = −Rθ̇sinθ respecto al tiempo, aplica la regla del producto:
        <div className="formula-box">
          d(−Rθ̇sinθ)/dt = −R[θ̈·sinθ + θ̇·cosθ·θ̇]
        </div>
        Con θ̈ = 0 el primer término desaparece y solo queda el segundo.
      </>
    ),
    solution: (
      <>
        <p>Derivamos cada componente de la velocidad (θ̈ = 0):</p>
        <div className="formula-box">
          ẍ = d(−Rθ̇sinθ)/dt = −R[θ̈·sinθ + θ̇²·cosθ] = <strong>−Rθ̇²cosθ</strong><br />
          ÿ = d(Rθ̇cosθ)/dt  = R[θ̈·cosθ − θ̇²·sinθ] = <strong>−Rθ̇²sinθ</strong><br />
          z̈ = d(√3Rθ̇)/dt   = √3R·θ̈ = <strong>0</strong>
        </div>
        <p>
          El vector aceleración apunta siempre <em>hacia el eje Z</em>: las
          componentes x e y apuntan al centro del cilindro, y la componente
          z es nula.
        </p>
        <span className="result">(ẍ, ÿ, z̈) = (−Rθ̇²cosθ, −Rθ̇²sinθ, 0)</span>
      </>
    ),
  },

  // ── Paso 7 ───────────────────────────────────────────────────────────────────
  {
    title: 'Aceleración normal aₙ',
    subtitle: 'Módulo del vector aceleración',
    question: (
      <>
        Con las componentes ẍ, ÿ, z̈ del paso anterior, calcula el módulo
        de la aceleración total. Ese módulo es aₙ (ya que aₜ = 0).
        <br /><br />
        Expresa el resultado en función de <strong>v y R</strong>
        (sustituye θ̇ = v/2R).
      </>
    ),
    hint: (
      <>
        El módulo de la aceleración es:
        <div className="formula-box">
          a = √(ẍ² + ÿ² + z̈²)
        </div>
        Vuelve a usar la identidad trigonométrica cos²θ + sin²θ = 1.
        Después sustituye θ̇ = v/(2R) para expresarlo en función de v y R.
      </>
    ),
    solution: (
      <>
        <div className="formula-box">
          a² = (−Rθ̇²cosθ)² + (−Rθ̇²sinθ)² + 0²<br />
          &nbsp;&nbsp;&nbsp;&nbsp;= R²θ̇⁴cos²θ + R²θ̇⁴sin²θ<br />
          &nbsp;&nbsp;&nbsp;&nbsp;= R²θ̇⁴·(cos²θ + sin²θ)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;= R²θ̇⁴
        </div>
        <div className="formula-box">
          a = Rθ̇²
        </div>
        <p>Sustituyendo θ̇ = v/(2R):</p>
        <div className="formula-box">
          aₙ = a = R·(v/2R)² = R·v²/(4R²) = v²/(4R)
        </div>
        <p>
          Como aₜ = 0, toda la aceleración es normal: <em>aₙ = a</em>.
        </p>
        <span className="result">aₙ = v²/(4R) = Rω²</span>
      </>
    ),
  },

  // ── Paso 8 ───────────────────────────────────────────────────────────────────
  {
    title: 'Radio de curvatura ρ',
    subtitle: 'Relación fundamental de la cinemática intrínseca',
    question: (
      <>
        Con aₙ del paso anterior y la velocidad escalar v, calcula el
        <strong> radio de curvatura ρ</strong> de la hélice.
        <br /><br />
        Compara el resultado con el radio R del cilindro sobre el que
        se enrolla la hélice. ¿Qué relación existe?
      </>
    ),
    hint: (
      <>
        La relación fundamental de la cinemática intrínseca es:
        <div className="formula-box">
          aₙ = v² / ρ &nbsp;&nbsp;⟹&nbsp;&nbsp; ρ = v² / aₙ
        </div>
        Sustituye aₙ = v²/(4R) y simplifica. El resultado es muy limpio.
      </>
    ),
    solution: (
      <>
        <p>Despejamos ρ de la relación fundamental:</p>
        <div className="formula-box">
          ρ = v² / aₙ = v² / (v²/4R) = v²·(4R/v²) = 4R
        </div>
        <p>
          El radio de curvatura de la hélice es <strong>4 veces</strong> el radio
          del cilindro sobre el que se enrolla. Es un valor constante: la hélice
          tiene curvatura uniforme en todos sus puntos.
        </p>
        <p>
          Puedes verificarlo visualmente en la pestaña <em>Simulador</em>
          activando la opción "Círculo osculador ρ = 4R".
        </p>
        <span className="result">ρ = 4R</span>
      </>
    ),
  },
];

export default steps;
