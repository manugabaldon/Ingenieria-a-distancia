/**
 * SolucionCP35.tsx — Solución desarrollada del CP-35
 * (velocidad dada como función del tiempo → integración directa → MCU)
 *
 * Reproduce fielmente el desarrollo manuscrito (OneNote), en su mismo orden
 * y con su notación. Los apartados "Ampliación" añaden matices que NO estaban
 * en el desarrollo original, claramente separados.
 *
 * A diferencia del CP-5 (campo de velocidades V(x,y) → trayectoria primero),
 * aquí la velocidad viene dada como función del tiempo, así que se integra
 * directamente para obtener las ecuaciones horarias y luego se elimina t.
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

export default function SolucionCP35() {
  return (
    <div className="sol-wrap">

      {/* ── Enunciado ───────────────────────────────────────────── */}
      <div className="sol-enunciado">
        <span className="sol-tag">Enunciado · CP-35</span>
        <div className="sol-enunciado-grid">
          <div>
            <p>
              Un punto material realiza un movimiento en el plano <InlineMath>{`OXY`}</InlineMath> tal
              que su velocidad en la dirección del eje <InlineMath>{`Ox`}</InlineMath> es
            </p>
            <BlockMath>{`V_x = -v\\,\\sin\\!\\left(\\frac{v}{a}\\,t\\right) \\qquad
              V_y = v\\,\\cos\\!\\left(\\frac{v}{a}\\,t\\right)`}</BlockMath>
            <p>
              con <InlineMath>{`v`}</InlineMath> constante. Si parte del punto{' '}
              <InlineMath>{`A(a,0)`}</InlineMath>, determinar:
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
          La velocidad viene dada <strong>directamente como función del tiempo</strong>: sus
          componentes son las derivadas de la posición.
        </p>
        <BlockMath>{`\\dot{x} = V_x = -v\\,\\sin\\!\\left(\\tfrac{v}{a}\\,t\\right) \\qquad
          \\dot{y} = V_y = v\\,\\cos\\!\\left(\\tfrac{v}{a}\\,t\\right)
          \\qquad\\text{con}\\qquad A:(a,\\,0)`}</BlockMath>
        <div className="sol-ampliacion">
          <span className="sol-amp-label">Ampliación</span>
          <p>
            Aquí las componentes son funciones explícitas de <InlineMath>{`t`}</InlineMath>, no del
            punto <InlineMath>{`(x,y)`}</InlineMath>. Por eso integramos <em>directamente</em> respecto
            al tiempo para obtener las ecuaciones horarias, sin tener que eliminar el tiempo primero
            (al revés que en un campo de velocidades).
          </p>
        </div>
      </section>

      {/* ── 1. Integrar para obtener las ecuaciones horarias ─────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">1</span>
          <h3 className="sol-section-title">Integramos para obtener las ecuaciones horarias</h3>
        </div>
        <p className="sol-p">
          Integramos <InlineMath>{`\\dot{x}`}</InlineMath> respecto al tiempo. La primitiva de{' '}
          <InlineMath>{`\\sin\\!\\big(\\tfrac{v}{a}t\\big)`}</InlineMath> es{' '}
          <InlineMath>{`-\\tfrac{a}{v}\\cos\\!\\big(\\tfrac{v}{a}t\\big)`}</InlineMath>:
        </p>
        <BlockMath>{`x = \\int -v\\,\\sin\\!\\left(\\tfrac{v}{a}t\\right)dt
          = -v\\left(-\\tfrac{a}{v}\\right)\\cos\\!\\left(\\tfrac{v}{a}t\\right) + C
          = a\\cos\\!\\left(\\tfrac{v}{a}t\\right) + C`}</BlockMath>
        <p className="sol-p">
          Aplicamos la condición inicial <InlineMath>{`t=0,\\ x=a`}</InlineMath> para obtener{' '}
          <InlineMath>{`C`}</InlineMath>:
        </p>
        <BlockMath>{`a = a\\cos(0) + C = a + C \\quad\\Longrightarrow\\quad C = 0`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Primera ecuación horaria</span>
          <BlockMath>{`x = a\\cos\\!\\left(\\frac{v}{a}\\,t\\right)`}</BlockMath>
        </div>

        <p className="sol-p">
          Repetimos con <InlineMath>{`\\dot{y}`}</InlineMath>. La primitiva de{' '}
          <InlineMath>{`\\cos\\!\\big(\\tfrac{v}{a}t\\big)`}</InlineMath> es{' '}
          <InlineMath>{`\\tfrac{a}{v}\\sin\\!\\big(\\tfrac{v}{a}t\\big)`}</InlineMath>:
        </p>
        <BlockMath>{`y = \\int v\\,\\cos\\!\\left(\\tfrac{v}{a}t\\right)dt
          = v\\left(\\tfrac{a}{v}\\right)\\sin\\!\\left(\\tfrac{v}{a}t\\right) + C
          = a\\sin\\!\\left(\\tfrac{v}{a}t\\right) + C`}</BlockMath>
        <p className="sol-p">
          Con <InlineMath>{`t=0,\\ y=0`}</InlineMath>:
        </p>
        <BlockMath>{`0 = a\\sin(0) + C = C \\quad\\Longrightarrow\\quad C = 0`}</BlockMath>

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
            <InlineMath>{`\\omega = \\dfrac{v}{a}`}</InlineMath> (sentido antihorario: en{' '}
            <InlineMath>{`t=0`}</InlineMath> el punto está en <InlineMath>{`A(a,0)`}</InlineMath> y, como{' '}
            <InlineMath>{`\\dot y(0)=v>0`}</InlineMath>, empieza a subir). El periodo es{' '}
            <InlineMath>{`T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2\\pi a}{v}`}</InlineMath>.
          </p>
        </div>
      </section>

      {/* ── 2. Trayectoria: eliminar el parámetro t ─────────────── */}
      <section className="sol-section">
        <div className="sol-section-head">
          <span className="sol-num">2</span>
          <h3 className="sol-section-title">Eliminamos el parámetro t para la trayectoria</h3>
        </div>
        <p className="sol-p">
          Elevamos al cuadrado y sumamos las ecuaciones horarias, aplicando{' '}
          <InlineMath>{`\\sin^{2}\\alpha + \\cos^{2}\\alpha = 1`}</InlineMath>:
        </p>
        <BlockMath>{`x^{2} + y^{2}
          = a^{2}\\cos^{2}\\!\\left(\\tfrac{v}{a}t\\right) + a^{2}\\sin^{2}\\!\\left(\\tfrac{v}{a}t\\right)
          = a^{2}\\left[\\cos^{2}\\!\\left(\\tfrac{v}{a}t\\right) + \\sin^{2}\\!\\left(\\tfrac{v}{a}t\\right)\\right]`}</BlockMath>

        <div className="sol-result">
          <span className="sol-result-lbl">Trayectoria</span>
          <BlockMath>{`x^{2} + y^{2} = a^{2}`}</BlockMath>
          <p style={{ margin: 0 }}>
            Una <strong>circunferencia de radio <InlineMath>{`a`}</InlineMath></strong> centrada en
            el origen.
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
          = \\sqrt{v^{2}\\sin^{2}\\!\\left(\\tfrac{v}{a}t\\right) + v^{2}\\cos^{2}\\!\\left(\\tfrac{v}{a}t\\right)}
          = v`}</BlockMath>

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
              Comprueba en la pestaña <em>Simulador</em> cómo las componentes{' '}
              <InlineMath>{`V_x`}</InlineMath> y <InlineMath>{`V_y`}</InlineMath> oscilan como seno y
              coseno mientras la velocidad total se mantiene tangente y de módulo constante.
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
