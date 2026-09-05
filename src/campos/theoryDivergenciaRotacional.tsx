/**
 * theoryDivergenciaRotacional.tsx — Teoría de divergencia y rotacional (Campos y Ondas · Tema 1)
 *
 * Continúa theoryGradiente.tsx dentro del mismo tema (Análisis vectorial): misma
 * notación del Equipo Docente (vectores unitarios a_x, a_r, a_R, a_θ, a_φ; «sen»;
 * factores métricos h_i=√g_ii) y misma paleta de diagrama (granate/teal/tinta).
 * Los Ejemplos 1 y 2 son los Ejercicios 1 y 2 del Módulo 1 — no cambiar su
 * enunciado ni resultado salvo petición expresa.
 */
import type { TheoryContent } from '../components/TheoryPanel';
import { P, Note, Warn, Mark, Collapsible, Table, TheorySvg, SimLink } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';

const GRAN = '#7a2e28';
const TEAL = '#1f7a72';
const INK = '#79694f';

// Diagrama: fuente (diverge) vs sumidero, y una ruedecita que gira (rotacional)
function DiagramaDivRot() {
  return (
    <svg viewBox="0 0 640 240" width="100%" role="img"
         aria-label="A la izquierda, flechas que salen de un punto (fuente) y flechas que entran en otro (sumidero). A la derecha, una ruedecita de paletas girando en un campo con rotacional.">
      <defs>
        <marker id="dr-ah" markerWidth="9" markerHeight="9" refX="7" refY="4.2" orient="auto">
          <path d="M0,0 L8,4.2 L0,8.4 Z" fill={GRAN} />
        </marker>
        <marker id="dr-ah2" markerWidth="9" markerHeight="9" refX="7" refY="4.2" orient="auto">
          <path d="M0,0 L8,4.2 L0,8.4 Z" fill={TEAL} />
        </marker>
      </defs>

      {/* Fuente: flechas saliendo */}
      <g stroke={GRAN} strokeWidth="2.4">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x1 = 110 + Math.cos(r) * 18, y1 = 120 + Math.sin(r) * 18;
          const x2 = 110 + Math.cos(r) * 46, y2 = 120 + Math.sin(r) * 46;
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#dr-ah)" />;
        })}
      </g>
      <circle cx="110" cy="120" r="5" fill={GRAN} />
      <text x="110" y="182" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={INK}>fuente · ∇·A &gt; 0</text>

      {/* Sumidero: flechas entrando */}
      <g stroke={TEAL} strokeWidth="2.4">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x1 = 250 + Math.cos(r) * 46, y1 = 120 + Math.sin(r) * 46;
          const x2 = 250 + Math.cos(r) * 20, y2 = 120 + Math.sin(r) * 20;
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#dr-ah2)" />;
        })}
      </g>
      <circle cx="250" cy="120" r="5" fill={TEAL} />
      <text x="250" y="182" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={INK}>sumidero · ∇·A &lt; 0</text>

      {/* Ruedecita girando */}
      <g transform="translate(470,120)">
        <circle r="58" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.35" strokeDasharray="4 5" />
        <g stroke={GRAN} strokeWidth="5" strokeLinecap="round">
          <line x1="0" y1="0" x2="0" y2="-38" />
          <line x1="0" y1="0" x2="33" y2="19" />
          <line x1="0" y1="0" x2="-33" y2="19" />
        </g>
        <circle r="5" fill={GRAN} />
        <path d="M 44,-30 A 54 54 0 0 1 30,44" fill="none" stroke={GRAN} strokeWidth="2.2" markerEnd="url(#dr-ah)" />
      </g>
      <text x="470" y="200" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={INK}>ruedecita gira · ∇×A ≠ 0</text>
    </svg>
  );
}

export const theoryDivergenciaRotacional: TheoryContent = {
  intro: (
    <>
      Junto al gradiente, la <strong>divergencia</strong> y el <strong>rotacional</strong> son los
      otros dos operadores diferenciales que describen un campo vectorial{' '}
      <InlineMath>{'\\mathbf{A}'}</InlineMath> punto a punto: cuánto <em>mana</em> de cada punto y
      cuánto <em>gira</em> a su alrededor. Con los tres — gradiente, divergencia y rotacional — y sus
      teoremas integrales asociados se construyen las ecuaciones de Maxwell.
      <Note>
        Puedes explorar todo esto en vivo en <SimLink to="divrot">Simula → Divergencia y rotacional</SimLink>: arrastra
        la sonda por un campo <InlineMath>{'\\mathbf{A}(x,y)'}</InlineMath> y lee, en tiempo real,{' '}
        <InlineMath>{'\\nabla\\cdot\\mathbf{A}'}</InlineMath> y{' '}
        <InlineMath>{'\\nabla\\times\\mathbf{A}'}</InlineMath> en el punto.
      </Note>
    </>
  ),
  sections: [
    {
      title: '1. La idea física',
      body: (
        <>
          <P>
            Imagina que <InlineMath>{'\\mathbf{A}'}</InlineMath> es la velocidad de un fluido. En cada
            punto puedes hacer dos preguntas independientes. La primera: si rodeo el punto con una
            superficie minúscula, ¿sale más fluido del que entra? Eso es la{' '}
            <strong>divergencia</strong> — mide fuentes y sumideros. La segunda: si suelto ahí una
            ruedecita de paletas, ¿empieza a girar? Eso es el <strong>rotacional</strong> — mide la
            circulación local.
          </P>
          <TheorySvg caption="Fuente y sumidero (divergencia) a la izquierda; ruedecita que gira por circulación local (rotacional) a la derecha.">
            <DiagramaDivRot />
          </TheorySvg>
          <Note>
            <Mark>Son preguntas independientes.</Mark> Un campo puede tener divergencia sin
            rotacional (fuente radial pura), rotacional sin divergencia (remolino puro), ambos, o
            ninguno. Por eso hacen falta gradiente, divergencia y rotacional para describir un campo
            por completo — es la idea del teorema de Helmholtz.
          </Note>
        </>
      ),
    },
    {
      title: '2. Divergencia',
      body: (
        <>
          <P>
            La divergencia es el flujo neto que sale de un entorno infinitesimal del punto, por unidad
            de volumen. Formalmente es un límite: una superficie cerrada{' '}
            <InlineMath>{'S'}</InlineMath> que encierra un volumen{' '}
            <InlineMath>{'\\Delta v'}</InlineMath> alrededor del punto, el flujo de{' '}
            <InlineMath>{'\\mathbf{A}'}</InlineMath> a través de ella, dividido por el volumen
            mientras se encoge a cero:
          </P>
          <BlockMath>{'\\nabla\\cdot\\mathbf{A} = \\lim_{\\Delta v \\to 0} \\frac{1}{\\Delta v} \\oint_S \\mathbf{A}\\cdot d\\mathbf{s}'}</BlockMath>
          <P>En cartesianas ese límite se reduce a una suma de derivadas parciales:</P>
          <BlockMath>{'\\nabla\\cdot\\mathbf{A} = \\frac{\\partial A_x}{\\partial x} + \\frac{\\partial A_y}{\\partial y} + \\frac{\\partial A_z}{\\partial z}'}</BlockMath>
          <P>
            El resultado es un <strong>escalar</strong>: cada término mide cómo cambia la componente
            del campo <em>en su propia dirección</em>.
          </P>
          <Warn>
            <strong>Cuidado con las parciales.</strong> Al derivar{' '}
            <InlineMath>{'\\partial A_x/\\partial x'}</InlineMath>, <InlineMath>{'y'}</InlineMath> y{' '}
            <InlineMath>{'z'}</InlineMath> se tratan como constantes. Es el fallo típico: derivar
            respecto a <InlineMath>{'x'}</InlineMath> y «arrastrar» las otras variables.
          </Warn>
          <P>
            Cuando <InlineMath>{'\\nabla\\cdot\\mathbf{A}=0'}</InlineMath> en todo punto, el campo se
            llama <Mark>solenoidal</Mark> (divergencia nula): no tiene fuentes ni sumideros, sus
            líneas se cierran sobre sí mismas — como las de <InlineMath>{'\\mathbf{B}'}</InlineMath>{' '}
            en magnetostática. Un remolino puro es el ejemplo clásico.
          </P>
        </>
      ),
    },
    {
      title: '3. Teorema de la divergencia (Gauss)',
      body: (
        <>
          <P>El puente entre lo local y lo global: la suma de fuentes dentro de un volumen es igual al flujo que atraviesa su frontera.</P>
          <BlockMath>{'\\oint_S \\mathbf{A}\\cdot d\\mathbf{s} = \\int_v (\\nabla\\cdot\\mathbf{A})\\, dv'}</BlockMath>
          <P>
            Si dentro de la caja hay más «grifos» que «desagües», el balance neto sale por las
            paredes. Convierte una integral de superficie (a veces incómoda) en una de volumen, o al
            revés — se elige el lado más fácil.
          </P>
          <Note>
            Es el teorema que se verifica en el Ejercicio 3 del Módulo 1 sobre un cubo: se calculan
            los dos lados por separado (flujo cara a cara y la integral triple de{' '}
            <InlineMath>{'\\nabla\\cdot\\mathbf{A}'}</InlineMath>) y deben coincidir.
          </Note>
        </>
      ),
    },
    {
      title: '4. Rotacional',
      body: (
        <>
          <P>
            Cada componente del rotacional es la circulación de <InlineMath>{'\\mathbf{A}'}</InlineMath>{' '}
            a lo largo de una curva minúscula <InlineMath>{'C'}</InlineMath>, en el plano
            perpendicular a esa componente, dividida por el área encerrada:
          </P>
          <BlockMath>{'(\\nabla\\times\\mathbf{A})_n = \\lim_{\\Delta s \\to 0} \\frac{1}{\\Delta s} \\oint_C \\mathbf{A}\\cdot d\\boldsymbol{\\ell}'}</BlockMath>
          <P>En cartesianas se calcula como un determinante simbólico:</P>
          <BlockMath>{'\\nabla\\times\\mathbf{A} = \\begin{vmatrix} \\mathbf{a}_x & \\mathbf{a}_y & \\mathbf{a}_z \\\\ \\partial/\\partial x & \\partial/\\partial y & \\partial/\\partial z \\\\ A_x & A_y & A_z \\end{vmatrix}'}</BlockMath>
          <P>
            Cuando el campo es plano (<InlineMath>{'\\mathbf{A}=A_x\\mathbf{a}_x+A_y\\mathbf{a}_y'}</InlineMath>),
            solo sobrevive la componente <InlineMath>{'z'}</InlineMath> — la que lees en el
            simulador:
          </P>
          <BlockMath>{'(\\nabla\\times\\mathbf{A})_z = \\frac{\\partial A_y}{\\partial x} - \\frac{\\partial A_x}{\\partial y}'}</BlockMath>
          <Warn>
            <strong>La trampa de la cizalla.</strong> Un campo puede tener todas sus flechas paralelas
            y aun así rotar. En <InlineMath>{'\\mathbf{A}=y\\,\\mathbf{a}_x'}</InlineMath> el fluido va
            recto, pero más rápido arriba que abajo: la ruedecita gira. Su rotacional vale{' '}
            <InlineMath>{'-1'}</InlineMath>, no cero — pruébalo en el simulador con el preset{' '}
            <em>Cizalla</em>.
          </Warn>
          <P>
            Si <InlineMath>{'\\nabla\\times\\mathbf{A}=0'}</InlineMath> en todo el dominio, el campo es{' '}
            <Mark>irrotacional</Mark>, y esto tiene una consecuencia enorme:{' '}
            <strong>deriva de un potencial escalar</strong>. Existe <InlineMath>{'V'}</InlineMath> tal
            que <InlineMath>{'\\mathbf{A}=\\nabla V'}</InlineMath> (o{' '}
            <InlineMath>{'-\\nabla V'}</InlineMath>, según convenio). Un campo así también se llama{' '}
            <em>conservativo</em>: el trabajo entre dos puntos no depende del camino — exactamente la
            propiedad de <InlineMath>{'\\mathbf{E}'}</InlineMath> en electrostática.
          </P>
        </>
      ),
    },
    {
      title: '5. Teorema de Stokes',
      body: (
        <>
          <P>El análogo del de Gauss para el rotacional: relaciona la circulación por el borde con el flujo del rotacional a través de la superficie.</P>
          <BlockMath>{'\\oint_C \\mathbf{A}\\cdot d\\boldsymbol{\\ell} = \\int_s (\\nabla\\times\\mathbf{A})\\cdot d\\mathbf{s}'}</BlockMath>
          <P>
            Sumar todos los «remolinos» diminutos del interior de una superficie equivale a recorrer
            solo su contorno: los giros internos se cancelan entre vecinos y solo queda la vuelta por
            el borde. Con Gauss y Stokes, las cuatro ecuaciones de Maxwell pasan de su forma integral
            a la diferencial y viceversa.
          </P>
        </>
      ),
    },
    {
      title: '6. Dos identidades que conviene tener grabadas',
      body: (
        <>
          <P>Salen una y otra vez y sirven de chequeo rápido de tus cálculos.</P>
          <BlockMath>{'\\nabla\\cdot(\\nabla\\times\\mathbf{A}) = 0'}</BlockMath>
          <P>
            Un campo que es «el rotacional de otro» nunca tiene fuentes — es el Ejercicio 6 del
            Módulo 1. Consecuencia: como <InlineMath>{'\\nabla\\cdot\\mathbf{B}=0'}</InlineMath>,
            siempre puede escribirse <InlineMath>{'\\mathbf{B}=\\nabla\\times\\mathbf{A}'}</InlineMath>{' '}
            (el potencial vector).
          </P>
          <BlockMath>{'\\nabla\\times(\\nabla V) = \\mathbf{0}'}</BlockMath>
          <P>
            Todo campo que deriva de un potencial es automáticamente irrotacional — ya salió al
            estudiar el gradiente. Es la otra cara de «irrotacional ⇒ conservativo» y explica por qué{' '}
            <InlineMath>{'\\nabla\\times\\mathbf{E}=0'}</InlineMath> en electrostática.
          </P>
        </>
      ),
    },
    {
      title: '7. Divergencia en otros sistemas',
      body: (
        <>
          <P>
            Igual que con el gradiente, la divergencia en un sistema ortogonal cualquiera se escribe
            con la diagonal del tensor métrico <InlineMath>{'g_{ii}'}</InlineMath> y los factores{' '}
            <InlineMath>{'h_i=\\sqrt{g_{ii}}'}</InlineMath> (cartesianas{' '}
            <InlineMath>{'(1,1,1)'}</InlineMath>, cilíndricas <InlineMath>{'(1,r,1)'}</InlineMath>,
            esféricas <InlineMath>{'(1,R,R\\,\\text{sen}\\,\\theta)'}</InlineMath>):
          </P>
          <Table
            headers={['Sistema', 'Divergencia ∇·A']}
            rows={[
              ['Cartesianas (x, y, z)', '∂Ax/∂x + ∂Ay/∂y + ∂Az/∂z'],
              ['Cilíndricas (r, φ, z)', '(1/r)·∂(r·Ar)/∂r + (1/r)·∂Aφ/∂φ + ∂Az/∂z'],
              ['Esféricas (R, θ, φ)', '(1/R²)·∂(R²·AR)/∂R + (1/(R senθ))·∂(Aθ senθ)/∂θ + (1/(R senθ))·∂Aφ/∂φ'],
            ]}
          />
          <Note>
            <Mark>Por qué el factor 1/R².</Mark> Para un campo radial{' '}
            <InlineMath>{'\\mathbf{A}=f(R)\\,\\mathbf{a}_R'}</InlineMath>, la esfera crece como{' '}
            <InlineMath>{'R^2'}</InlineMath>. Ese factor es justo lo que hace que el campo de una
            carga puntual (<InlineMath>{'f\\propto 1/R^2'}</InlineMath>) tenga divergencia nula en
            todo punto salvo el origen. Las fórmulas completas del rotacional en estos sistemas están
            en el formulario de Cheng (apéndice).
          </Note>
        </>
      ),
    },
    {
      title: '8. Ejemplos resueltos',
      body: (
        <>
          <Collapsible summary="Ejemplo 1 · ¿Puede A = 6xy·ax + (3x²−3y²)·ay ser un campo eléctrico? · Ejercicio 1 del Módulo 1">
            <P>Un campo electrostático debe ser irrotacional. Calculamos la componente z del rotacional:</P>
            <BlockMath>{'(\\nabla\\times\\mathbf{A})_z = \\frac{\\partial A_y}{\\partial x} - \\frac{\\partial A_x}{\\partial y} = 6x - 6x = 0'}</BlockMath>
            <P>
              <Mark>Sí puede</Mark>: es irrotacional en todo el plano. El motivo es que{' '}
              <InlineMath>{'\\nabla\\times\\mathbf{A}=0'}</InlineMath>, no que «solo tenga componentes
              en x e y» — un campo plano puede perfectamente tener rotacional (ver la cizalla, §4).
            </P>
          </Collapsible>
          <Collapsible summary="Ejemplo 2 · Analizar A = 2y·ax + (2x+3z)·ay + 3y·az · Ejercicio 2 del Módulo 1">
            <P>
              <strong>Divergencia:</strong>{' '}
              <InlineMath>{'\\partial(2y)/\\partial x + \\partial(2x+3z)/\\partial y + \\partial(3y)/\\partial z = 0+0+0 = 0'}</InlineMath>{' '}
              → <Mark>solenoidal</Mark>.
            </P>
            <P>
              <strong>Rotacional:</strong> las tres componentes salen cero →{' '}
              <Mark>irrotacional</Mark>, luego deriva de un potencial <InlineMath>{'V'}</InlineMath>.
            </P>
            <P>
              <strong>Reconstruir V</strong> (con <InlineMath>{'\\mathbf{A}=\\nabla V'}</InlineMath>):
              integrando <InlineMath>{'\\partial V/\\partial x = 2y'}</InlineMath> sale{' '}
              <InlineMath>{'V=2xy+g(y,z)'}</InlineMath>; ajustando con las otras dos componentes se
              llega a:
            </P>
            <BlockMath>{'V(x,y,z) = 2xy + 3yz + C'}</BlockMath>
            <Warn>
              <strong>El error a evitar:</strong> las tres integrales <em>no se suman</em>. Cada
              término que aparece va una sola vez en <InlineMath>{'V'}</InlineMath>. Se comprueba
              derivando <InlineMath>{'V'}</InlineMath> hacia atrás: debe devolver{' '}
              <InlineMath>{'\\mathbf{A}'}</InlineMath>.
            </Warn>
          </Collapsible>
        </>
      ),
    },
  ],
  references: [
    'Equipo Docente de Campos y Ondas (UNED, F. Ortiz Sánchez) — «Bloque I: Fundamentos matemáticos, Tema 1: Análisis vectorial» (Divergencia, rotacional y teoremas integrales).',
    'Equipo Docente de Campos y Ondas (UNED) — «Módulo I: Cuestiones y Ejercicios» (Ejercicios 1, 2 y 6).',
    'D. K. Cheng — Fundamentos de electromagnetismo para ingeniería (cap. 2).',
  ],
};

export default theoryDivergenciaRotacional;
