import React from 'react';
import type { TheoryContent } from '../components/TheoryPanel';
import type { ExerciseStep } from './ExerciseGuide';
import HeliceCP2 from '../simulators/HeliceCP2';
import PolaresCP3 from '../simulators/PolaresCP3';
import CircularCP5 from '../simulators/CircularCP5';
import stepsCP2  from './exerciseCP2';
import stepsCP3  from './exerciseCP3';
import stepsCP5  from './exerciseCP5';
import SolucionCP2 from './SolucionCP2';
import SolucionCP3 from './SolucionCP3';
import SolucionCP5 from './SolucionCP5';

// ─── Teoría CP-2 ──────────────────────────────────────────────────────────────
const theoryCP2: TheoryContent = {
  intro: (
    <>
      Un punto recorre la hélice circular definida por las ecuaciones horarias
      <strong> x = R·cosθ, y = R·senθ, z = √3·R·θ</strong>, con velocidad
      escalar constante <em>v</em>. Este ejercicio cubre la cinemática
      tridimensional del punto: derivación de θ(t), componentes intrínsecas de la
      aceleración y radio de curvatura.
    </>
  ),
  sections: [
    {
      title: '1. Ecuaciones de la hélice y condición inicial',
      body: (
        <div>
          <p>Las ecuaciones paramétricas en función del ángulo θ son:</p>
          <div className="formula-box">
            x(θ) = R·cosθ<br />
            y(θ) = R·senθ<br />
            z(θ) = √3·R·θ
          </div>
          <p>
            La condición inicial <em>(t=0: x=0, y=R, z=√3/2·π·R)</em> impone
            θ₀ = π/2, verificando: cos(π/2)=0 ✓, sin(π/2)=1 ✓,
            z₀ = √3·R·(π/2) = √3π/2·R ✓.
          </p>
        </div>
      ),
    },
    {
      title: '2. Velocidad y expresión de θ(t)',
      body: (
        <div>
          <p>Derivando respecto al tiempo con la regla de la cadena (θ̇ = dθ/dt):</p>
          <div className="formula-box">
            ẋ = −R·θ̇·sinθ<br />
            ẏ =  R·θ̇·cosθ<br />
            ż =  √3·R·θ̇
          </div>
          <p>El módulo de la velocidad:</p>
          <div className="formula-box">
            |v|² = ẋ² + ẏ² + ż²<br />
            = R²θ̇²sin²θ + R²θ̇²cos²θ + 3R²θ̇²<br />
            = R²θ̇²(sin²θ + cos²θ + 3) = 4R²θ̇²<br />
            ⟹  |v| = 2R·θ̇
          </div>
          <p>
            Como <em>v = cte</em>, θ̇ = v/(2R) también es constante.
            Integrando con θ(0) = π/2:
          </p>
          <div className="formula-box">
            <strong>θ(t) = π/2 + (v/2R)·t</strong>
          </div>
        </div>
      ),
    },
    {
      title: '3. Componentes intrínsecas de la aceleración',
      body: (
        <div>
          <p>Derivando la velocidad (con θ̈ = 0 ya que θ̇ = cte):</p>
          <div className="formula-box">
            ẍ = −R·θ̇²·cosθ<br />
            ÿ = −R·θ̇²·sinθ<br />
            z̈ = 0
          </div>
          <p>Módulo de la aceleración total:</p>
          <div className="formula-box">
            a = √(ẍ² + ÿ²) = R·θ̇² = v²/(4R)
          </div>
          <p>
            La <strong>aceleración tangencial aₜ = 0</strong> porque la velocidad
            es constante (dv/dt = 0). Toda la aceleración es normal:
          </p>
          <div className="formula-box">
            <strong>aₙ = v²/(4R) = R·ω²</strong>
          </div>
          <p>
            El vector aceleración apunta siempre <strong>hacia el eje Z</strong> (su
            componente z es cero; las componentes x e y apuntan al centro del círculo).
          </p>
        </div>
      ),
    },
    {
      title: '4. Radio de curvatura',
      body: (
        <div>
          <p>Usando la relación fundamental aₙ = v²/ρ:</p>
          <div className="formula-box">
            ρ = v² / aₙ = v² / (v²/4R)<br />
            <strong>ρ = 4R</strong>
          </div>
          <p>
            El radio de curvatura de la hélice es constante e igual a 4R. El
            círculo osculador (el que mejor aproxima la curva en cada punto) yace
            en el plano osculador, que <em>no</em> coincide con el plano
            horizontal.
          </p>
        </div>
      ),
    },
  ],
  references: [
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
    'UNED — Mecánica, Tema 1: Cinemática del punto',
  ],
};

// ─── Teoría CP-3 ──────────────────────────────────────────────────────────────
const theoryCP3: TheoryContent = {
  intro: (
    <>
      Una partícula describe un movimiento plano definido en coordenadas polares
      por <strong>r = 3(2 − e⁻ᵗ)</strong> y <strong>θ = 4(t + 2e⁻ᵗ)</strong>. El
      ejercicio practica el uso de las componentes radial y transversal de la
      velocidad y la aceleración en coordenadas polares, y el estudio del
      comportamiento asintótico (t → ∞), donde el movimiento se vuelve circular
      uniforme.
    </>
  ),
  sections: [
    {
      title: '1. Velocidad y aceleración en coordenadas polares',
      body: (
        <div>
          <p>
            En la base móvil {'{eᵣ, eθ}'}, donde eᵣ apunta en la dirección radial
            (alejándose del origen) y eθ es perpendicular (sentido de θ creciente):
          </p>
          <div className="formula-box">
            v = ṙ·eᵣ + r·θ̇·eθ<br />
            a = (r̈ − r·θ̇²)·eᵣ + (r·θ̈ + 2·ṙ·θ̇)·eθ
          </div>
          <p>
            El término <strong>−r·θ̇²</strong> es la aceleración centrípeta y
            <strong> 2·ṙ·θ̇</strong> es la aceleración de Coriolis, que aparece
            cuando el punto cambia su distancia al origen mientras gira.
          </p>
        </div>
      ),
    },
    {
      title: '2. Cálculo de las derivadas',
      body: (
        <div>
          <p>Desarrollando los paréntesis y derivando dos veces (d/dt e⁻ᵗ = −e⁻ᵗ):</p>
          <div className="formula-box">
            r = 6 − 3e⁻ᵗ &nbsp;⟶&nbsp; ṙ = 3e⁻ᵗ &nbsp;⟶&nbsp; r̈ = −3e⁻ᵗ<br />
            θ = 4t + 8e⁻ᵗ &nbsp;⟶&nbsp; θ̇ = 4 − 8e⁻ᵗ &nbsp;⟶&nbsp; θ̈ = 8e⁻ᵗ
          </div>
        </div>
      ),
    },
    {
      title: '3. Evaluación en t = 0',
      body: (
        <div>
          <p>Con e⁰ = 1: r = 3, ṙ = 3, r̈ = −3, θ̇ = −4, θ̈ = 8.</p>
          <div className="formula-box">
            v = 3·eᵣ − 12·eθ &nbsp; ⟹ &nbsp; |v| = 3√17 ≈ 12,37 m/s<br />
            a = −51·eᵣ &nbsp; ⟹ &nbsp; |a| = 51 m/s²
          </div>
          <p>
            La componente transversal de la aceleración se anula porque el término
            de Coriolis (2ṙθ̇ = −24) cancela exactamente a rθ̈ = 24.
          </p>
        </div>
      ),
    },
    {
      title: '4. Comportamiento asintótico (t → ∞)',
      body: (
        <div>
          <p>Cuando t → ∞, todos los términos en e⁻ᵗ se anulan:</p>
          <div className="formula-box">
            r → 6, &nbsp; ṙ → 0, &nbsp; θ̇ → 4, &nbsp; θ̈ → 0
          </div>
          <p>El movimiento tiende a un círculo uniforme de radio 6 m y ω = 4 rad/s:</p>
          <div className="formula-box">
            v = 24·eθ &nbsp; ⟹ &nbsp; |v| = 24 m/s (solo transversal)<br />
            a = −96·eᵣ &nbsp; ⟹ &nbsp; |a| = rω² = 96 m/s² (solo centrípeta)
          </div>
        </div>
      ),
    },
  ],
  references: [
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
    'UNED — Mecánica, Tema 1: Cinemática del punto (coordenadas polares)',
  ],
};

// ─── Teoría CP-5 ──────────────────────────────────────────────────────────────
const theoryCP5: TheoryContent = {
  intro: (
    <>
      A una partícula se le da un <strong>campo de velocidades</strong>{' '}
      <strong>V = −(v/a)y·i + (v/a)x·j</strong> y un punto de partida{' '}
      <strong>A(a,0)</strong>. El ejercicio practica cómo, a partir de la velocidad,
      se obtiene la trayectoria (eliminando el tiempo), las ecuaciones horarias
      (integrando) y la ley horaria s(t). El resultado es un movimiento circular
      uniforme.
    </>
  ),
  sections: [
    {
      title: '1. De la velocidad a la trayectoria',
      body: (
        <div>
          <p>
            El campo de velocidades da directamente ẋ y ẏ. Para hallar la
            trayectoria <em>y(x)</em> eliminamos el tiempo dividiendo las componentes:
          </p>
          <div className="formula-box">
            ẋ = −(v/a)·y &nbsp;&nbsp; ẏ = (v/a)·x<br />
            dy/dx = ẏ/ẋ = −x/y
          </div>
          <p>Separando variables e integrando con la condición A(a,0):</p>
          <div className="formula-box">
            ∫y·dy = −∫x·dx ⟶ y²/2 = −x²/2 + a²/2<br />
            <strong>x² + y² = a²</strong> (circunferencia de radio a)
          </div>
        </div>
      ),
    },
    {
      title: '2. Ecuaciones horarias',
      body: (
        <div>
          <p>
            Con y = √(a²−x²), la componente ẋ = −(v/a)√(a²−x²) se integra por
            separación de variables (primitiva arcsen):
          </p>
          <div className="formula-box">
            ∫ dx/√(a²−x²) = −∫ (v/a) dt ⟶ arcsen(x/a) + (v/a)t = π/2
          </div>
          <p>Despejando x y obteniendo y de la trayectoria:</p>
          <div className="formula-box">
            <strong>x = a·cos((v/a)t)</strong><br />
            <strong>y = a·sen((v/a)t)</strong>
          </div>
          <p>
            Es un movimiento circular uniforme de radio a y velocidad angular
            ω = v/a, con periodo T = 2πa/v.
          </p>
        </div>
      ),
    },
    {
      title: '3. Ley horaria y aceleración',
      body: (
        <div>
          <p>El módulo de la velocidad es constante:</p>
          <div className="formula-box">
            |V| = √(ẋ²+ẏ²) = (v/a)·√(x²+y²) = (v/a)·a = v
          </div>
          <p>Por tanto el arco recorrido (ley horaria) es lineal en el tiempo:</p>
          <div className="formula-box">
            s = ∫₀ᵗ |V| dt = <strong>v·t</strong>
          </div>
          <p>
            Al ser v constante, la aceleración tangencial es nula (aₜ = 0) y toda la
            aceleración es <strong>normal (centrípeta)</strong>, dirigida al centro:
          </p>
          <div className="formula-box">
            <strong>aₙ = v²/a = ω²·a</strong>
          </div>
        </div>
      ),
    },
  ],
  references: [
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
    'UNED — Mecánica, Tema 1: Cinemática del punto (campo de velocidades)',
  ],
};

// ─── Tipo de datos ─────────────────────────────────────────────────────────────
export interface ExerciseGuideData {
  title: string;
  intro: React.ReactNode;
  steps: ExerciseStep[];
}

export interface IADVideo {
  id: string;
  title: string;
  subject: string;
  exerciseRef: string;
  description: string;
  youtubeId: string | null;
  date: string;
  theory: TheoryContent | null;
  exerciseGuide: ExerciseGuideData | null;
  /** Solución desarrollada (referencia de repaso, leída de corrido) */
  Solution: React.ComponentType | null;
  Simulator: React.ComponentType | null;
}

// ─── Catálogo de videos ────────────────────────────────────────────────────────
const videos: IADVideo[] = [
  {
    id: 'mecanica-cp2',
    title: 'CP-2: Cinemática de la hélice',
    subject: 'Mecánica',
    exerciseRef: 'CP-2',
    description:
      'Un punto recorre una hélice circular con velocidad constante. ' +
      'Calculamos θ(t), las componentes intrínsecas de la aceleración y el radio de curvatura ρ = 4R.',
    youtubeId: null,
    date: '2026-06-10',
    theory: theoryCP2,
    exerciseGuide: {
      title: 'CP-2 — Cinemática de la hélice',
      intro: (
        <>
          Resuelve el ejercicio paso a paso. Cada paso te da una pista con la
          teoría y fórmulas que necesitas. Haz los cálculos en papel y luego
          despliega la solución para comprobar. Cuando termines un paso, pulsa
          "He completado este paso" para avanzar al siguiente.
        </>
      ),
      steps: stepsCP2,
    },
    Solution: SolucionCP2,
    Simulator: HeliceCP2,
  },
  {
    id: 'mecanica-cp3',
    title: 'CP-3: Cinemática en coordenadas polares',
    subject: 'Mecánica',
    exerciseRef: 'CP-3',
    description:
      'Una partícula describe un movimiento plano con r = 3(2−e⁻ᵗ) y θ = 4(t+2e⁻ᵗ). ' +
      'Calculamos la velocidad y la aceleración en t=0 y en el límite t→∞ (movimiento circular uniforme).',
    youtubeId: 'kzdKjtr53SE',
    date: '2026-06-18',
    theory: theoryCP3,
    exerciseGuide: {
      title: 'CP-3 — Cinemática en coordenadas polares',
      intro: (
        <>
          Resuelve el ejercicio paso a paso. Cada paso te da una pista con la
          teoría y fórmulas que necesitas. Haz los cálculos en papel y luego
          despliega la solución para comprobar. Cuando termines un paso, pulsa
          "He completado este paso" para avanzar al siguiente.
        </>
      ),
      steps: stepsCP3,
    },
    Solution: SolucionCP3,
    Simulator: PolaresCP3,
  },
  {
    id: 'mecanica-cp5',
    title: 'CP-5: Campo de velocidades y movimiento circular',
    subject: 'Mecánica',
    exerciseRef: 'CP-5',
    description:
      'Dada la velocidad V = −(v/a)y·i + (v/a)x·j desde A(a,0), obtenemos la trayectoria ' +
      '(x²+y² = a²), las ecuaciones horarias x = a·cos(ωt), y = a·sen(ωt) y la ley horaria s = v·t.',
    youtubeId: 'prVclIFxQYo',
    date: '2026-06-22',
    theory: theoryCP5,
    exerciseGuide: {
      title: 'CP-5 — Campo de velocidades y movimiento circular',
      intro: (
        <>
          Resuelve el ejercicio paso a paso. Cada paso te da una pista con la
          teoría y fórmulas que necesitas. Haz los cálculos en papel y luego
          despliega la solución para comprobar. Cuando termines un paso, pulsa
          "He completado este paso" para avanzar al siguiente.
        </>
      ),
      steps: stepsCP5,
    },
    Solution: SolucionCP5,
    Simulator: CircularCP5,
  },
];

export default videos;
