import type { ExerciseStep } from './ExerciseGuide';

const steps: ExerciseStep[] = [
  // ── Paso 1 ───────────────────────────────────────────────────────────────────
  {
    title: 'Recordar las fórmulas en coordenadas polares',
    subtitle: 'Cinemática — base móvil {eᵣ, eθ}',
    question: (
      <>
        El movimiento es plano y está dado en coordenadas polares:
        <br /><br />
        <strong>r = 3(2 − e⁻ᵗ) &nbsp;|&nbsp; θ = 4(t + 2e⁻ᵗ)</strong>
        <br /><br />
        Antes de calcular nada, ¿cuáles son las expresiones generales de la
        <strong> velocidad</strong> y la <strong>aceleración</strong> en
        coordenadas polares?
      </>
    ),
    hint: (
      <>
        En la base móvil {'{eᵣ, eθ}'}, la velocidad tiene una componente radial
        (ṙ) y otra transversal (r·θ̇). La aceleración añade los términos
        centrípeto (−rθ̇²) y de Coriolis (2ṙθ̇):
        <div className="formula-box">
          v = ṙ·eᵣ + r·θ̇·eθ
        </div>
        Recuerda que la aceleración transversal combina rθ̈ con 2ṙθ̇.
      </>
    ),
    solution: (
      <>
        <p>Las expresiones generales en coordenadas polares son:</p>
        <div className="formula-box">
          v = ṙ·eᵣ + r·θ̇·eθ<br />
          a = (r̈ − r·θ̇²)·eᵣ + (r·θ̈ + 2·ṙ·θ̇)·eθ
        </div>
        <p>
          El objetivo es calcular las cuatro derivadas (ṙ, r̈, θ̇, θ̈) y
          sustituirlas aquí.
        </p>
        <span className="result">v = ṙ·eᵣ + r·θ̇·eθ &nbsp;;&nbsp; a = (r̈−rθ̇²)·eᵣ + (rθ̈+2ṙθ̇)·eθ</span>
      </>
    ),
  },

  // ── Paso 2 ───────────────────────────────────────────────────────────────────
  {
    title: 'Calcular las cuatro derivadas',
    subtitle: 'Derivar r(t) y θ(t) dos veces',
    question: (
      <>
        Deriva respecto al tiempo, dos veces, las ecuaciones horarias:
        <br /><br />
        <strong>r = 3(2 − e⁻ᵗ) &nbsp; y &nbsp; θ = 4(t + 2e⁻ᵗ)</strong>
        <br /><br />
        Obtén ṙ, r̈, θ̇ y θ̈.
      </>
    ),
    hint: (
      <>
        Primero conviene desarrollar los paréntesis:
        <div className="formula-box">
          r = 6 − 3e⁻ᵗ &nbsp;&nbsp; θ = 4t + 8e⁻ᵗ
        </div>
        Usa que la derivada de e⁻ᵗ es −e⁻ᵗ. Ojo con los signos: cada derivada de
        e⁻ᵗ cambia el signo del término.
      </>
    ),
    solution: (
      <>
        <p>Desarrollando los paréntesis y derivando:</p>
        <div className="formula-box">
          r = 6 − 3e⁻ᵗ &nbsp;&nbsp;⟶&nbsp;&nbsp; ṙ = 3e⁻ᵗ &nbsp;&nbsp;⟶&nbsp;&nbsp; r̈ = −3e⁻ᵗ<br />
          θ = 4t + 8e⁻ᵗ &nbsp;⟶&nbsp; θ̇ = 4 − 8e⁻ᵗ &nbsp;⟶&nbsp; θ̈ = 8e⁻ᵗ
        </div>
        <span className="result">ṙ = 3e⁻ᵗ, r̈ = −3e⁻ᵗ, θ̇ = 4 − 8e⁻ᵗ, θ̈ = 8e⁻ᵗ</span>
      </>
    ),
  },

  // ── Paso 3 ───────────────────────────────────────────────────────────────────
  {
    title: 'Sustituir en velocidad y aceleración',
    subtitle: 'Expresiones generales en función de t',
    question: (
      <>
        Lleva las cuatro derivadas del paso anterior a las fórmulas generales de
        v y a. Deja las expresiones <strong>en función de t</strong>, sin
        particularizar todavía.
      </>
    ),
    hint: (
      <>
        Sustituye con cuidado, manteniendo los paréntesis sin expandir para que
        sea más fácil evaluar después:
        <div className="formula-box">
          v = (3e⁻ᵗ)·eᵣ + (6−3e⁻ᵗ)(4−8e⁻ᵗ)·eθ
        </div>
        Para la aceleración, el término radial lleva θ̇ al cuadrado: (4−8e⁻ᵗ)².
      </>
    ),
    solution: (
      <>
        <p>Sustituyendo ṙ, r̈, θ̇, θ̈:</p>
        <div className="formula-box">
          v = 3e⁻ᵗ·eᵣ + (6−3e⁻ᵗ)(4−8e⁻ᵗ)·eθ<br /><br />
          a = [−3e⁻ᵗ − (6−3e⁻ᵗ)(4−8e⁻ᵗ)²]·eᵣ<br />
          &nbsp;&nbsp;&nbsp;&nbsp;+ [(6−3e⁻ᵗ)·8e⁻ᵗ + 2·(3e⁻ᵗ)(4−8e⁻ᵗ)]·eθ
        </div>
        <p>Ahora solo falta evaluar en t = 0 y en el límite t → ∞.</p>
        <span className="result">v y a quedan expresadas en función de t</span>
      </>
    ),
  },

  // ── Paso 4 ───────────────────────────────────────────────────────────────────
  {
    title: 'Evaluar en t = 0',
    subtitle: 'Apartado a) — e⁰ = 1',
    question: (
      <>
        Particulariza las expresiones de v y a en el instante inicial
        <strong> t = 0</strong>. Recuerda que e⁰ = 1.
        <br /><br />
        Calcula también los módulos |v| y |a|.
      </>
    ),
    hint: (
      <>
        En t = 0 las derivadas valen:
        <div className="formula-box">
          r = 3, ṙ = 3, r̈ = −3, θ̇ = 4−8 = −4, θ̈ = 8
        </div>
        Sustituye estos números. Para los módulos, |v| = √(vᵣ² + vθ²) y, como aθ
        sale 0, |a| es directamente |aᵣ|.
      </>
    ),
    solution: (
      <>
        <p>Con e⁰ = 1: r = 3, ṙ = 3, r̈ = −3, θ̇ = −4, θ̈ = 8.</p>
        <div className="formula-box">
          v = 3·eᵣ + 3·(−4)·eθ = <strong>3·eᵣ − 12·eθ</strong><br />
          aᵣ = −3 − 3·(−4)² = −3 − 48 = −51<br />
          aθ = 3·8 + 2·3·(−4) = 24 − 24 = 0<br />
          a = <strong>−51·eᵣ</strong>
        </div>
        <p>Módulos:</p>
        <div className="formula-box">
          |v| = √(3² + 12²) = √153 = 3√17 ≈ 12,37 m/s<br />
          |a| = 51 m/s²
        </div>
        <span className="result">v(0) = 3eᵣ − 12eθ &nbsp;;&nbsp; a(0) = −51eᵣ</span>
      </>
    ),
  },

  // ── Paso 5 ───────────────────────────────────────────────────────────────────
  {
    title: 'Evaluar en el límite t → ∞',
    subtitle: 'Apartado b) — e⁻∞ = 0',
    question: (
      <>
        Ahora estudia el comportamiento cuando <strong>t → ∞</strong>.
        <br /><br />
        ¿A qué tienden r, ṙ, r̈, θ̇, θ̈? Sustituye y obtén v y a en el límite,
        junto con sus módulos.
      </>
    ),
    hint: (
      <>
        Todos los términos con e⁻ᵗ se anulan (e⁻∞ = 0):
        <div className="formula-box">
          r → 6, ṙ → 0, r̈ → 0, θ̇ → 4, θ̈ → 0
        </div>
        Fíjate en que el movimiento se vuelve circular uniforme de radio 6 y
        ω = 4 rad/s.
      </>
    ),
    solution: (
      <>
        <p>Con e⁻∞ = 0: r → 6, ṙ → 0, r̈ → 0, θ̇ → 4, θ̈ → 0.</p>
        <div className="formula-box">
          v = 0·eᵣ + 6·4·eθ = <strong>24·eθ</strong><br />
          aᵣ = 0 − 6·4² = −96<br />
          aθ = 6·0 + 2·0·4 = 0<br />
          a = <strong>−96·eᵣ</strong>
        </div>
        <p>Módulos:</p>
        <div className="formula-box">
          |v| = 24 m/s (solo transversal)<br />
          |a| = 96 m/s² (solo centrípeta)
        </div>
        <p>
          El movimiento límite es <strong>circular uniforme</strong>: r = 6 m,
          ω = 4 rad/s, con aceleración puramente centrípeta aₙ = rω² = 96 m/s².
          Obsérvalo en la pestaña <em>Simulador</em> con el botón "t → ∞".
        </p>
        <span className="result">v(∞) = 24eθ &nbsp;;&nbsp; a(∞) = −96eᵣ</span>
      </>
    ),
  },
];

export default steps;
