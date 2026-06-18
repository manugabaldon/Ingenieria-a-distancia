/**
 * SolucionCP3.tsx — Solución desarrollada del CP-3 (cinemática en polares)
 *
 * Reproduce fielmente el desarrollo manuscrito (OneNote), en su mismo orden
 * y con su notación (eᵣ, eθ, ṙ, θ̇, …). Los apartados "Ampliación" añaden
 * matices que NO estaban en el desarrollo original, claramente separados.
 *
 * Pensada como referencia de repaso (leer de corrido) — complementa la guía
 * interactiva paso a paso de la pestaña "Ejercicio".
 */
import { BlockMath, InlineMath } from '../components/Math';
import './SolucionDesarrollada.css';

// ─── Figura esquemática de la espiral ───────────────────────────────────────
function SpiralFigure() {
  const W = 220, H = 200;
  const ox = 96, oy = 104;        // origen polar
  const SC = 12;                  // px por metro (r máx = 6 → 72 px)

  // r(t) = 3(2 − e^−t),  θ(t) = 4(t + 2e^−t)
  const r  = (t: number) => 3 * (2 - Math.exp(-t));
  const th = (t: number) => 4 * (t + 2 * Math.exp(-t));

  const pts: string[] = [];
  const TT = 6, N = 360;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * TT;
    const x = ox + r(t) * SC * Math.cos(th(t));
    const y = oy - r(t) * SC * Math.sin(th(t));
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Punto P en t = 0.45 para dibujar el triedro eᵣ, eθ
  const tp = 0.45;
  const px = ox + r(tp) * SC * Math.cos(th(tp));
  const py = oy - r(tp) * SC * Math.sin(th(tp));
  const erX = Math.cos(th(tp)), erY = -Math.sin(th(tp));
  const ethX = -Math.sin(th(tp)), ethY = -Math.cos(th(tp));
  const U = 22;

  return (
    <svg className="sol-fig-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Espiral en coordenadas polares">
      {/* círculo asintótico r = 6 */}
      <circle cx={ox} cy={oy} r={6 * SC} className="sol-fig-ellipse" />
      {/* ejes x, y */}
      <line x1={ox - 80} y1={oy} x2={ox + 86} y2={oy} className="sol-fig-axis" />
      <line x1={ox} y1={oy + 82} x2={ox} y2={oy - 86} className="sol-fig-axis" />
      <text x={ox + 88} y={oy + 4} className="sol-fig-lbl">x</text>
      <text x={ox + 4} y={oy - 88} className="sol-fig-lbl">y</text>

      {/* trayectoria */}
      <polyline points={pts.join(' ')} className="sol-fig-helix" />

      {/* radio r y punto P */}
      <line x1={ox} y1={oy} x2={px} y2={py} className="sol-fig-radius" />
      <circle cx={px} cy={py} r={3.4} className="sol-fig-point" />
      {/* triedro eᵣ, eθ */}
      <line x1={px} y1={py} x2={px + erX * U} y2={py + erY * U} className="sol-fig-radius" />
      <line x1={px} y1={py} x2={px + ethX * U} y2={py + ethY * U} className="sol-fig-radius" />
      <text x={px + erX * (U + 8)} y={py + erY * (U + 8) + 3} className="sol-fig-lbl-r">eᵣ</text>
      <text x={px + ethX * (U + 8)} y={py + ethY * (U + 8) + 3} className="sol-fig-lbl-th">eθ</text>
      <text x={ox + 6 * SC * 0.72} y={oy - 6 * SC * 0.72 - 4} className="sol-fig-lbl-th">r→6</text>
    </svg>
  );
}

export default function SolucionCP3() {
  return (
    <div className="sol-wrap">

      {/* ── Enunciado ───────────────────────────────────────────── */}
      <div className="sol-enunciado">
        <span className="sol-tag">Enunciado · CP-3</span>
        <div className="sol-enunciado-grid">
          <div>
            <p>
              El movimiento bidimensional de una partícula está definido por:
            </p>
            <BlockMath>{`r = 3\\left(2 - e^{-t}\\right) \\qquad \\theta = 4\\left(t + 2e^{-t}\\right)`}</BlockMath>
            <p>
              donde <InlineMath>{`r`}</InlineMath> se expresa en metros,{' '}
              <InlineMath>{`t`}</InlineMath> en segundos y <InlineMath>{`\\theta`}</InlineMath> en
              radianes. Hallar la <strong>velocidad</strong> y la{' '}
              <strong>aceleración</strong> de la partícula:
            </p>
            <ol className="sol-ask">
              <li>cuando <InlineMath>{`t = 0`}</InlineMath>,</li>
              <li>cuando <InlineMath>{`t`}</InlineMath> tiende a infinito.</li>
            </ol>
          </div>
          <div className="sol-fig">
            <SpiralFigure />
            <span className="sol-fig-cap">Espiral que converge al círculo r = 6 m</span>
          </div>
        </div>
      </div>

      {/* ── 1. Fórmulas en coordenadas polares ──────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">1</span>
          <h3 className="sol-section-title">Antes debemos saber: velocidad y aceleración en polares</h3>
        </div>
        <p className="sol-p">
          En coordenadas polares planas, con la base móvil{' '}
          <InlineMath>{`\\{\\vec{e}_r,\\,\\vec{e}_\\theta\\}`}</InlineMath>, la velocidad y la
          aceleración se expresan como:
        </p>
        <BlockMath>{`\\vec{v} = \\dot{r}\\,\\vec{e}_r + r\\,\\dot\\theta\\,\\vec{e}_\\theta`}</BlockMath>
        <BlockMath>{`\\vec{a} = \\left(\\ddot{r} - r\\,\\dot\\theta^{2}\\right)\\vec{e}_r
          + \\left(r\\,\\ddot\\theta + 2\\,\\dot{r}\\,\\dot\\theta\\right)\\vec{e}_\\theta`}</BlockMath>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            El término <InlineMath>{`-r\\dot\\theta^2`}</InlineMath> es la aceleración{' '}
            <strong>centrípeta</strong> (apunta hacia el origen) y{' '}
            <InlineMath>{`2\\dot{r}\\dot\\theta`}</InlineMath> es la aceleración de{' '}
            <strong>Coriolis</strong>, que aparece cuando el punto se aleja/acerca del origen
            (<InlineMath>{`\\dot r \\neq 0`}</InlineMath>) mientras gira.
          </p>
        </div>
      </section>

      {/* ── 2. Las cuatro derivadas ─────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">2</span>
          <h3 className="sol-section-title">Calculamos las cuatro derivadas</h3>
        </div>
        <p className="sol-p">
          Derivamos <InlineMath>{`r(t)`}</InlineMath> y <InlineMath>{`\\theta(t)`}</InlineMath> dos
          veces respecto al tiempo (recordando que{' '}
          <InlineMath>{`\\tfrac{d}{dt}e^{-t} = -e^{-t}`}</InlineMath>):
        </p>
        <BlockMath>{`\\begin{aligned}
            r       &= 6 - 3e^{-t}  &\\qquad \\theta      &= 4t + 8e^{-t}\\\\
            \\dot{r}  &= 3e^{-t}      &\\qquad \\dot\\theta  &= 4 - 8e^{-t}\\\\
            \\ddot{r} &= -3e^{-t}     &\\qquad \\ddot\\theta &= 8e^{-t}
          \\end{aligned}`}</BlockMath>
      </section>

      {/* ── 3. Sustitución en velocidad y aceleración ───────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">3</span>
          <h3 className="sol-section-title">Sustituimos en las fórmulas de velocidad y aceleración</h3>
        </div>
        <p className="sol-p">Llevamos las derivadas a las expresiones generales del paso 1:</p>
        <BlockMath>{`\\vec{v} = 3e^{-t}\\,\\vec{e}_r + \\left(6 - 3e^{-t}\\right)\\left(4 - 8e^{-t}\\right)\\vec{e}_\\theta`}</BlockMath>
        <BlockMath>{`\\vec{a} = \\Big[\\,-3e^{-t} - \\left(6-3e^{-t}\\right)\\left(4-8e^{-t}\\right)^{2}\\Big]\\vec{e}_r
          + \\Big[\\left(6-3e^{-t}\\right)8e^{-t} + 2\\left(3e^{-t}\\right)\\left(4-8e^{-t}\\right)\\Big]\\vec{e}_\\theta`}</BlockMath>
        <p className="sol-p">
          Solo queda particularizar en los dos instantes pedidos.
        </p>
      </section>

      {/* ── 4. Apartado a) t = 0 ────────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">4</span>
          <h3 className="sol-section-title">Apartado a) Cuando t = 0</h3>
        </div>
        <p className="sol-p">
          En <InlineMath>{`t=0`}</InlineMath> se tiene <InlineMath>{`e^{0} = 1`}</InlineMath>, así que:
        </p>
        <BlockMath>{`r = 3,\\quad \\dot{r} = 3,\\quad \\ddot{r} = -3,\\qquad
          \\dot\\theta = 4 - 8 = -4,\\quad \\ddot\\theta = 8`}</BlockMath>
        <p className="sol-p">Sustituyendo:</p>
        <BlockMath>{`\\vec{v} = 3\\,\\vec{e}_r + 3\\,(-4)\\,\\vec{e}_\\theta = 3\\,\\vec{e}_r - 12\\,\\vec{e}_\\theta`}</BlockMath>
        <BlockMath>{`\\vec{a} = \\big[-3 - 3\\,(-4)^2\\big]\\vec{e}_r + \\big[3\\cdot 8 + 2\\cdot 3\\cdot(-4)\\big]\\vec{e}_\\theta
          = -51\\,\\vec{e}_r + 0\\,\\vec{e}_\\theta`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Resultado · a)</span>
          <BlockMath>{`\\vec{v}(0) = 3\\,\\vec{e}_r - 12\\,\\vec{e}_\\theta \\quad (|\\vec v| = 3\\sqrt{17} \\approx 12{,}37\\ \\text{m/s})`}</BlockMath>
          <BlockMath>{`\\vec{a}(0) = -51\\,\\vec{e}_r \\quad (|\\vec a| = 51\\ \\text{m/s}^2)`}</BlockMath>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            Curiosamente, en <InlineMath>{`t=0`}</InlineMath> la componente transversal de la
            aceleración se anula (<InlineMath>{`a_\\theta = 0`}</InlineMath>) aunque{' '}
            <InlineMath>{`\\ddot\\theta \\neq 0`}</InlineMath>: el término de Coriolis{' '}
            <InlineMath>{`2\\dot r\\dot\\theta = -24`}</InlineMath> cancela exactamente a{' '}
            <InlineMath>{`r\\ddot\\theta = 24`}</InlineMath>.
          </p>
        </div>
      </section>

      {/* ── 5. Apartado b) t → ∞ ────────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">5</span>
          <h3 className="sol-section-title">Apartado b) Cuando t → ∞</h3>
        </div>
        <p className="sol-p">
          Cuando <InlineMath>{`t\\to\\infty`}</InlineMath> todos los términos en{' '}
          <InlineMath>{`e^{-t}`}</InlineMath> tienden a cero (<InlineMath>{`e^{-\\infty}=0`}</InlineMath>):
        </p>
        <BlockMath>{`r \\to 6,\\quad \\dot{r} \\to 0,\\quad \\ddot{r} \\to 0,\\qquad
          \\dot\\theta \\to 4,\\quad \\ddot\\theta \\to 0`}</BlockMath>
        <p className="sol-p">Sustituyendo:</p>
        <BlockMath>{`\\vec{v} = 0\\,\\vec{e}_r + 6\\cdot 4\\,\\vec{e}_\\theta = 24\\,\\vec{e}_\\theta`}</BlockMath>
        <BlockMath>{`\\vec{a} = \\big[0 - 6\\cdot 4^2\\big]\\vec{e}_r + 0\\,\\vec{e}_\\theta = -96\\,\\vec{e}_r`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Resultado · b)</span>
          <BlockMath>{`\\vec{v}(\\infty) = 24\\,\\vec{e}_\\theta \\quad (|\\vec v| = 24\\ \\text{m/s})`}</BlockMath>
          <BlockMath>{`\\vec{a}(\\infty) = -96\\,\\vec{e}_r \\quad (|\\vec a| = 96\\ \\text{m/s}^2)`}</BlockMath>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <ul>
            <li>
              En el límite el movimiento es <strong>circular uniforme</strong>: radio constante{' '}
              <InlineMath>{`r = 6`}</InlineMath> m y velocidad angular constante{' '}
              <InlineMath>{`\\omega = \\dot\\theta = 4`}</InlineMath> rad/s.
            </li>
            <li>
              La velocidad es puramente transversal (<InlineMath>{`\\dot r = 0`}</InlineMath>) y la
              aceleración puramente radial y negativa: es la{' '}
              <strong>aceleración centrípeta</strong>{' '}
              <InlineMath>{`a_n = r\\omega^2 = 6\\cdot 16 = 96`}</InlineMath> m/s², que también
              equivale a <InlineMath>{`v^2/r = 24^2/6 = 96`}</InlineMath> m/s².
            </li>
            <li>
              La espiral se enrolla acercándose al círculo límite <InlineMath>{`r=6`}</InlineMath>.
              Compruébalo con el botón <em>t → ∞</em> en la pestaña <em>Simulador</em>.
            </li>
          </ul>
        </div>
      </section>

      <p className="sol-foot">
        Desarrollo propio · Cinemática del punto y de los sistemas (UNED, Ingeniería Electrónica Industrial).
      </p>
    </div>
  );
}
