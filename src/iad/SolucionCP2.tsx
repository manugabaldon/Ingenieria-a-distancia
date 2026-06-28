/**
 * SolucionCP2.tsx — Solución desarrollada del CP-2 (cinemática de la hélice)
 *
 * Reproduce fielmente el desarrollo manuscrito (OneNote), en su mismo orden
 * y con su notación (aₜ, aₙ, ρ, θ̇ = v/2R). Los apartados "Ampliación" añaden
 * matices que NO estaban en el desarrollo original, claramente separados.
 *
 * Pensada como referencia de repaso (leer de corrido) — complementa la guía
 * interactiva paso a paso de la pestaña "Ejercicio".
 */
import { BlockMath, InlineMath } from '../components/Math';
import './SolucionDesarrollada.css';

// ─── Figura esquemática de la hélice ────────────────────────────────────────
function HelixFigure() {
  const W = 260, H = 230;
  const cx = 150, baseY = 200;     // centro del eje
  const R = 46;                    // radio aparente
  const ell = 0.34;                // factor de perspectiva (elipse)
  const turns = 2.5;
  const pitch = 22;                // subida por vuelta (px)

  const pts: string[] = [];
  const N = 260;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * turns * 2 * Math.PI;
    const x = cx + R * Math.cos(t);
    const y = baseY - pitch * (t / (2 * Math.PI)) + R * ell * Math.sin(t);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // punto y radio en θ (tomamos t = π/2 → arriba de la elipse superior)
  const tTheta = turns * 2 * Math.PI - Math.PI / 2;
  const topY = baseY - pitch * (tTheta / (2 * Math.PI));
  const px = cx + R * Math.cos(tTheta);
  const py = topY + R * ell * Math.sin(tTheta);

  return (
    <svg className="sol-fig-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Esquema de la hélice">
      {/* eje Z */}
      <line x1={cx} y1={baseY + 14} x2={cx} y2={28} className="sol-fig-axis" />
      <polygon points={`${cx},22 ${cx - 4},32 ${cx + 4},32`} className="sol-fig-axis-head" />
      <text x={cx + 8} y={34} className="sol-fig-lbl">Z</text>

      {/* elipse base (cilindro) */}
      <ellipse cx={cx} cy={baseY} rx={R} ry={R * ell} className="sol-fig-ellipse" />
      {/* hélice */}
      <polyline points={pts.join(' ')} className="sol-fig-helix" />

      {/* radio R y ángulo θ en la elipse superior */}
      <ellipse cx={cx} cy={topY} rx={R} ry={R * ell} className="sol-fig-ellipse-top" />
      <line x1={cx} y1={topY} x2={px} y2={py} className="sol-fig-radius" />
      <circle cx={px} cy={py} r={3.4} className="sol-fig-point" />
      <text x={px + 6} y={py - 4} className="sol-fig-lbl">P</text>
      <text x={cx - 26} y={topY - 6} className="sol-fig-lbl-r">R</text>
      <text x={cx + 10} y={topY + 14} className="sol-fig-lbl-th">θ</text>
    </svg>
  );
}

export default function SolucionCP2() {
  return (
    <div className="sol-wrap">

      {/* ── Enunciado ───────────────────────────────────────────── */}
      <div className="sol-enunciado">
        <span className="sol-tag">Enunciado · CP-2</span>
        <div className="sol-enunciado-grid">
          <div>
            <p>
              Un punto recorre la <strong>hélice</strong> definida por:
            </p>
            <BlockMath>{`x = R\\cos\\theta \\qquad y = R\\sin\\theta \\qquad z = \\sqrt{3}\\,R\\,\\theta`}</BlockMath>
            <p>
              de forma tal que para <InlineMath>{`t=0`}</InlineMath> está en{' '}
              <InlineMath>{`x=0,\\; y=R,\\; z=\\tfrac{\\sqrt{3}}{2}\\pi R`}</InlineMath>.
              Sabiendo que su velocidad es <strong>constante</strong>, de valor{' '}
              <InlineMath>{`v`}</InlineMath>, y siendo <InlineMath>{`\\theta`}</InlineMath> el
              ángulo indicado en la figura, hallar:
            </p>
            <ol className="sol-ask">
              <li>Expresión de <InlineMath>{`\\theta`}</InlineMath> en función del tiempo.</li>
              <li>Componentes intrínsecas de la aceleración del móvil y radio de curvatura de la trayectoria.</li>
            </ol>
          </div>
          <div className="sol-fig">
            <HelixFigure />
            <span className="sol-fig-cap">Hélice de radio R sobre eje Z</span>
          </div>
        </div>
      </div>

      {/* ── 1. Ecuaciones de la trayectoria ─────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">1</span>
          <h3 className="sol-section-title">Ecuaciones de la trayectoria</h3>
        </div>
        <p className="sol-p">Partimos de las ecuaciones paramétricas de la hélice en función de θ:</p>
        <BlockMath>{`x = R\\cos\\theta \\qquad y = R\\sin\\theta \\qquad z = \\sqrt{3}\\,R\\,\\theta`}</BlockMath>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            La condición inicial <InlineMath>{`z_0 = \\tfrac{\\sqrt3}{2}\\pi R`}</InlineMath> es
            coherente con <InlineMath>{`\\theta_0 = \\tfrac{\\pi}{2}`}</InlineMath> (que obtendremos
            en el paso 2): <InlineMath>{`z_0 = \\sqrt3\\,R\\cdot\\tfrac{\\pi}{2} = \\tfrac{\\sqrt3}{2}\\pi R`}</InlineMath> ✓.
          </p>
        </div>
      </section>

      {/* ── 2. θ en función del tiempo ──────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">2</span>
          <h3 className="sol-section-title">Hallar θ en función del tiempo</h3>
        </div>

        <p className="sol-p">
          Derivamos respecto al tiempo las componentes de la trayectoria para obtener
          las de la velocidad (regla de la cadena, <InlineMath>{`\\dot\\theta = d\\theta/dt`}</InlineMath>):
        </p>
        <BlockMath>{`\\dot{x} = -R\\,\\dot\\theta\\,\\sin\\theta \\qquad \\dot{y} = R\\,\\dot\\theta\\,\\cos\\theta \\qquad \\dot{z} = \\sqrt{3}\\,R\\,\\dot\\theta`}</BlockMath>

        <p className="sol-p">Calculamos el módulo de la velocidad:</p>
        <BlockMath>{`v = \\sqrt{\\dot{x}^2+\\dot{y}^2+\\dot{z}^2}
          = \\sqrt{(-R\\dot\\theta\\sin\\theta)^2+(R\\dot\\theta\\cos\\theta)^2+(\\sqrt{3}\\,R\\dot\\theta)^2}`}</BlockMath>
        <BlockMath>{`= \\sqrt{R^2\\dot\\theta^2\\sin^2\\theta + R^2\\dot\\theta^2\\cos^2\\theta + 3R^2\\dot\\theta^2}
          = R\\dot\\theta\\sqrt{\\sin^2\\theta+\\cos^2\\theta+3} = R\\dot\\theta\\sqrt{1+3} = 2R\\dot\\theta`}</BlockMath>
        <BlockMath>{`\\Rightarrow\\quad \\dot\\theta = \\dfrac{v}{2R}`}</BlockMath>

        <p className="sol-p">Integramos (θ̇ es constante porque v lo es):</p>
        <BlockMath>{`\\dfrac{d\\theta}{dt} = \\dfrac{v}{2R} \\;\\Rightarrow\\; \\theta = \\dfrac{v}{2R}\\,t + C`}</BlockMath>

        <p className="sol-p">
          Calculamos <InlineMath>{`C`}</InlineMath> con las condiciones iniciales{' '}
          (<InlineMath>{`t=0`}</InlineMath>: <InlineMath>{`x=0,\\;y=R`}</InlineMath>):
        </p>
        <BlockMath>{`\\left.\\begin{aligned}
            0 &= R\\cos\\theta \\;\\Rightarrow\\; \\cos\\theta = 0\\\\
            R &= R\\sin\\theta \\;\\Rightarrow\\; \\sin\\theta = 1
          \\end{aligned}\\right\\}\\;\\Rightarrow\\; \\theta = \\dfrac{\\pi}{2}`}</BlockMath>
        <BlockMath>{`\\dfrac{\\pi}{2} = \\dfrac{v}{2R}\\cdot 0 + C \\;\\Rightarrow\\; C = \\dfrac{\\pi}{2}`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Resultado · 1º</span>
          <BlockMath>{`\\theta(t) = \\dfrac{v}{2R}\\,t + \\dfrac{\\pi}{2}`}</BlockMath>
        </div>
      </section>

      {/* ── 3. Componentes intrínsecas y radio de curvatura ─────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">3</span>
          <h3 className="sol-section-title">Componentes intrínsecas y radio de curvatura</h3>
        </div>

        <p className="sol-p"><strong>Aceleración tangencial (aₜ).</strong> Como el enunciado dice
          que la velocidad es constante (<InlineMath>{`v=\\text{cte}`}</InlineMath>), su derivada
          respecto al tiempo es cero:</p>
        <BlockMath>{`a_t = \\dfrac{dv}{dt} = 0`}</BlockMath>

        <p className="sol-p"><strong>Aceleración normal (aₙ).</strong> La calculamos derivando las
          componentes de la velocidad. Como <InlineMath>{`\\dot\\theta`}</InlineMath> es constante,{' '}
          <InlineMath>{`\\ddot\\theta = 0`}</InlineMath>:</p>
        <BlockMath>{`\\ddot{x} = -R\\dot\\theta^2\\cos\\theta = -\\dfrac{v^2}{4R}\\cos\\theta \\qquad
          \\ddot{y} = -R\\dot\\theta^2\\sin\\theta = -\\dfrac{v^2}{4R}\\sin\\theta \\qquad
          \\ddot{z} = 0`}</BlockMath>

        <p className="sol-p">El módulo de la aceleración total es:</p>
        <BlockMath>{`a = \\sqrt{\\ddot{x}^2+\\ddot{y}^2+\\ddot{z}^2}
          = \\dfrac{v^2}{4R}\\sqrt{\\cos^2\\theta+\\sin^2\\theta} = \\dfrac{v^2}{4R}`}</BlockMath>

        <p className="sol-p">Como <InlineMath>{`a_t = 0`}</InlineMath>, toda la aceleración es normal:</p>
        <BlockMath>{`a_n = \\dfrac{v^2}{4R}`}</BlockMath>

        <p className="sol-p"><strong>Radio de curvatura (ρ).</strong> Usamos la relación fundamental{' '}
          <InlineMath>{`a_n = v^2/\\rho`}</InlineMath>:</p>
        <BlockMath>{`\\rho = \\dfrac{v^2}{a_n} = \\dfrac{v^2}{\\,v^2/4R\\,} = 4R`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Resultado · 2º</span>
          <BlockMath>{`a_t = 0 \\qquad a_n = \\dfrac{v^2}{4R} \\qquad \\rho = 4R`}</BlockMath>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <ul>
            <li>
              <strong>Dirección de la aceleración:</strong> las componentes{' '}
              <InlineMath>{`\\ddot{x},\\ddot{y}`}</InlineMath> apuntan al centro de la circunferencia y{' '}
              <InlineMath>{`\\ddot{z}=0`}</InlineMath>, por lo que el vector aceleración es horizontal
              y apunta siempre <strong>hacia el eje Z</strong> (centrípeta respecto al eje del cilindro).
            </li>
            <li>
              <strong>Velocidad angular:</strong> con <InlineMath>{`\\omega = \\dot\\theta = \\tfrac{v}{2R}`}</InlineMath>{' '}
              se cumple <InlineMath>{`a_n = R\\dot\\theta^2 = R\\omega^2`}</InlineMath>.
            </li>
            <li>
              <strong>Círculo osculador:</strong> <InlineMath>{`\\rho = 4R`}</InlineMath> es 4 veces el
              radio del cilindro y es constante en toda la hélice (curvatura uniforme). El plano
              osculador no es horizontal, por la componente <InlineMath>{`z=\\sqrt3 R\\theta`}</InlineMath>.
              Compruébalo en la pestaña <em>Simulador</em>.
            </li>
          </ul>
        </div>
      </section>

      <p className="sol-foot">
        Desarrollo propio · Cinemática del punto y de los sistemas (Ingeniería Electrónica Industrial).
      </p>
    </div>
  );
}
