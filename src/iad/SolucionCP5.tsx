/**
 * SolucionCP5.tsx — Solución desarrollada del CP-5 (campo de velocidades → MCU)
 *
 * Reproduce fielmente el desarrollo manuscrito (OneNote), en su mismo orden
 * y con su notación. Los apartados "Ampliación" añaden matices que NO estaban
 * en el desarrollo original, claramente separados.
 *
 * Pensada como referencia de repaso (leer de corrido) — complementa la guía
 * interactiva paso a paso de la pestaña "Ejercicio".
 */
import { BlockMath, InlineMath } from '../components/Math';
import './SolucionDesarrollada.css';

// ─── Figura esquemática de la circunferencia ───────────────────────────────
function CircleFigure() {
  const W = 220, H = 200;
  const ox = 104, oy = 104;       // origen
  const a  = 3;                   // radio (m)
  const SC = 24;                  // px por metro (a·SC = 72 px)

  // Punto P en θ = 0.9 rad para dibujar el radio y la velocidad tangente
  const th = 0.9;
  const px = ox + a * SC * Math.cos(th);
  const py = oy - a * SC * Math.sin(th);
  // V tangente (sentido antihorario): (−sinθ, cosθ) en ejes mat → SVG (−sinθ, −cosθ)
  const vX = -Math.sin(th), vY = -Math.cos(th);
  const U = 30;

  // Punto de partida A(a,0)
  const ax = ox + a * SC, ay = oy;

  return (
    <svg className="sol-fig-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trayectoria circular de radio a">
      {/* circunferencia x²+y² = a² */}
      <circle cx={ox} cy={oy} r={a * SC} className="sol-fig-ellipse" />
      {/* ejes x, y */}
      <line x1={ox - 86} y1={oy} x2={ox + 86} y2={oy} className="sol-fig-axis" />
      <line x1={ox} y1={oy + 82} x2={ox} y2={oy - 86} className="sol-fig-axis" />
      <text x={ox + 88} y={oy + 4} className="sol-fig-lbl">x</text>
      <text x={ox + 4} y={oy - 88} className="sol-fig-lbl">y</text>

      {/* radio r y punto P */}
      <line x1={ox} y1={oy} x2={px} y2={py} className="sol-fig-radius" />
      <circle cx={px} cy={py} r={3.6} className="sol-fig-point" />
      {/* velocidad tangente */}
      <line x1={px} y1={py} x2={px + vX * U} y2={py + vY * U} className="sol-fig-helix" markerEnd="" />
      <text x={px + vX * (U + 8)} y={py + vY * (U + 8) + 3} className="sol-fig-lbl-th">V</text>

      {/* punto de partida A(a,0) */}
      <circle cx={ax} cy={ay} r={3.2} className="sol-fig-point" />
      <text x={ax + 6} y={ay - 6} className="sol-fig-lbl-r">A(a,0)</text>

      <text x={ox + a * SC * 0.62} y={oy - a * SC * 0.62 - 4} className="sol-fig-lbl-th">r = a</text>
    </svg>
  );
}

export default function SolucionCP5() {
  return (
    <div className="sol-wrap">

      {/* ── Enunciado ───────────────────────────────────────────── */}
      <div className="sol-enunciado">
        <span className="sol-tag">Enunciado · CP-5</span>
        <div className="sol-enunciado-grid">
          <div>
            <p>
              Un punto material realiza un movimiento en el plano <InlineMath>{`OXY`}</InlineMath>{' '}
              con una velocidad
            </p>
            <BlockMath>{`\\vec{V} = -\\frac{v}{a}\\,y\\,\\vec{i} + \\frac{v}{a}\\,x\\,\\vec{j}`}</BlockMath>
            <p>
              partiendo del punto <InlineMath>{`A(a,0)`}</InlineMath> (donde{' '}
              <InlineMath>{`v`}</InlineMath> y <InlineMath>{`a`}</InlineMath> son constantes).
              Determinar:
            </p>
            <ol className="sol-ask">
              <li>la <strong>ecuación de la trayectoria</strong> en coordenadas cartesianas,</li>
              <li>sus <strong>ecuaciones horarias</strong>,</li>
              <li>la <strong>ley horaria</strong> del movimiento.</li>
            </ol>
          </div>
          <div className="sol-fig">
            <CircleFigure />
            <span className="sol-fig-cap">La trayectoria es una circunferencia de radio a</span>
          </div>
        </div>
      </div>

      {/* ── 0. Datos ────────────────────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">0</span>
          <h3 className="sol-section-title">Los datos son la velocidad y el punto de partida</h3>
        </div>
        <p className="sol-p">
          El campo de velocidades nos da directamente las componentes de la velocidad en
          cartesianas:
        </p>
        <BlockMath>{`\\dot{x} = -\\frac{v}{a}\\,y \\qquad \\dot{y} = \\frac{v}{a}\\,x
          \\qquad\\text{con}\\qquad A:(a,\\,0)`}</BlockMath>
      </section>

      {/* ── 1. Trayectoria ──────────────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">1</span>
          <h3 className="sol-section-title">Integramos para obtener la trayectoria</h3>
        </div>
        <p className="sol-p">
          Para eliminar el tiempo dividimos las dos componentes,{' '}
          <InlineMath>{`\\tfrac{dy}{dx} = \\tfrac{\\dot{y}}{\\dot{x}}`}</InlineMath>:
        </p>
        <BlockMath>{`\\frac{dy}{dx} = \\frac{\\frac{v}{a}\\,x}{-\\frac{v}{a}\\,y} = -\\frac{x}{y}
          \\quad\\Longrightarrow\\quad \\int y\\,dy = -\\int x\\,dx`}</BlockMath>
        <BlockMath>{`\\frac{y^{2}}{2} = -\\frac{x^{2}}{2} + C`}</BlockMath>
        <p className="sol-p">
          Aplicamos la condición inicial <InlineMath>{`A(a,0)`}</InlineMath> para obtener{' '}
          <InlineMath>{`C`}</InlineMath>:
        </p>
        <BlockMath>{`0 + \\frac{a^{2}}{2} = C \\quad\\Longrightarrow\\quad C = \\frac{a^{2}}{2}`}</BlockMath>
        <p className="sol-p">Sustituimos en la ecuación:</p>
        <BlockMath>{`\\frac{y^{2}}{2} + \\frac{x^{2}}{2} = \\frac{a^{2}}{2}`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Trayectoria</span>
          <BlockMath>{`x^{2} + y^{2} = a^{2}`}</BlockMath>
          <p style={{ margin: 0 }}>
            Una <strong>circunferencia de radio <InlineMath>{`a`}</InlineMath></strong> centrada en
            el origen.
          </p>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            Hay un atajo: la velocidad es <strong>perpendicular al vector de posición</strong>,
            ya que <InlineMath>{`\\vec V \\cdot \\vec r = -\\tfrac{v}{a}yx + \\tfrac{v}{a}xy = 0`}</InlineMath>.
            Si la velocidad nunca tiene componente radial, el módulo de{' '}
            <InlineMath>{`\\vec r`}</InlineMath> no cambia, así que el punto se mueve sobre una
            circunferencia. Es un campo de velocidades de <strong>rotación pura</strong>.
          </p>
        </div>
      </section>

      {/* ── 2. Ecuaciones horarias ──────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">2</span>
          <h3 className="sol-section-title">Ecuaciones horarias</h3>
        </div>
        <p className="sol-p">
          Partimos de <InlineMath>{`\\dot{x} = -\\tfrac{v}{a}\\,y`}</InlineMath> y, de la
          trayectoria, <InlineMath>{`y = \\sqrt{a^{2}-x^{2}}`}</InlineMath>. Sustituyendo:
        </p>
        <BlockMath>{`\\dot{x} = -\\frac{v}{a}\\sqrt{a^{2}-x^{2}}`}</BlockMath>
        <p className="sol-p">Separamos variables e integramos:</p>
        <BlockMath>{`\\int \\frac{dx}{\\sqrt{a^{2}-x^{2}}} = -\\int \\frac{v}{a}\\,dt
          \\quad\\Longrightarrow\\quad \\arcsin\\frac{x}{a} + \\frac{v}{a}\\,t = C`}</BlockMath>
        <p className="sol-p">
          Aplicamos las condiciones iniciales <InlineMath>{`t=0,\\ x=a`}</InlineMath>:
        </p>
        <BlockMath>{`\\arcsin(1) + 0 = C \\quad\\Longrightarrow\\quad C = \\frac{\\pi}{2}`}</BlockMath>
        <p className="sol-p">Resolvemos en la ecuación anterior:</p>
        <BlockMath>{`\\arcsin\\frac{x}{a} + \\frac{v}{a}\\,t = \\frac{\\pi}{2}
          \\quad\\Longrightarrow\\quad x = a\\cos\\!\\left(\\frac{v}{a}\\,t\\right)`}</BlockMath>
        <p className="sol-p">
          Despejamos <InlineMath>{`y`}</InlineMath> en <InlineMath>{`x^{2}+y^{2}=a^{2}`}</InlineMath>{' '}
          y sustituimos la raíz con{' '}
          <InlineMath>{`1-\\cos^{2}\\alpha = \\sin^{2}\\alpha`}</InlineMath>:
        </p>
        <BlockMath>{`y = \\sqrt{a^{2}-\\Big(a\\cos\\tfrac{v}{a}t\\Big)^{2}}
          = \\sqrt{a^{2}\\Big(1-\\cos^{2}\\tfrac{v}{a}t\\Big)} = a\\sin\\!\\left(\\frac{v}{a}\\,t\\right)`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Ecuaciones horarias</span>
          <BlockMath>{`x = a\\cos\\!\\left(\\frac{v}{a}\\,t\\right) \\qquad
            y = a\\sin\\!\\left(\\frac{v}{a}\\,t\\right)`}</BlockMath>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            Son las ecuaciones de un <strong>movimiento circular uniforme</strong> de radio{' '}
            <InlineMath>{`a`}</InlineMath> y velocidad angular constante{' '}
            <InlineMath>{`\\omega = \\dfrac{v}{a}`}</InlineMath> (en sentido antihorario, ya que en{' '}
            <InlineMath>{`t=0`}</InlineMath> el punto está en <InlineMath>{`A(a,0)`}</InlineMath> y
            empieza a subir). El periodo es{' '}
            <InlineMath>{`T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2\\pi a}{v}`}</InlineMath>.
          </p>
        </div>
      </section>

      {/* ── 3. Ley horaria ──────────────────────────────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">3</span>
          <h3 className="sol-section-title">Ley horaria del movimiento</h3>
        </div>
        <p className="sol-p">
          La ley horaria es el arco recorrido <InlineMath>{`s(t)`}</InlineMath> a lo largo de la
          trayectoria; se calcula integrando el módulo de la velocidad:
        </p>
        <BlockMath>{`s = \\int_{0}^{t} |\\vec V|\\,dt`}</BlockMath>
        <p className="sol-p">El módulo de la velocidad es constante:</p>
        <BlockMath>{`|\\vec V| = \\sqrt{\\dot{x}^{2}+\\dot{y}^{2}}
          = \\sqrt{\\frac{v^{2}}{a^{2}}y^{2} + \\frac{v^{2}}{a^{2}}x^{2}}
          = \\frac{v}{a}\\sqrt{x^{2}+y^{2}} = \\frac{v}{a}\\,a = v`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Ley horaria</span>
          <BlockMath>{`s = v\\,t`}</BlockMath>
        </div>

        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <ul>
            <li>
              La velocidad escalar es constante (<InlineMath>{`|\\vec V| = v`}</InlineMath>), por eso
              la aceleración tangencial es nula (<InlineMath>{`a_t = \\dot v = 0`}</InlineMath>) y toda
              la aceleración es <strong>normal (centrípeta)</strong>:{' '}
              <InlineMath>{`a_n = \\dfrac{v^{2}}{a} = \\omega^{2}a`}</InlineMath>, apuntando hacia el
              centro.
            </li>
            <li>
              <InlineMath>{`v`}</InlineMath> es la velocidad lineal (constante) y{' '}
              <InlineMath>{`a`}</InlineMath> es el radio: por eso aparece{' '}
              <InlineMath>{`\\omega = v/a`}</InlineMath> en todas las expresiones.
            </li>
            <li>
              Comprueba en la pestaña <em>Simulador</em> cómo la velocidad es siempre tangente y de
              módulo constante, mientras la aceleración apunta siempre al centro.
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
