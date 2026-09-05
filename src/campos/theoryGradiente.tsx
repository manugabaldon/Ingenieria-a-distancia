/**
 * theoryGradiente.tsx — Teoría del gradiente (Campos y Ondas · Tema 1)
 *
 * Notación: vectores unitarios a_x, a_r, a_R, a_θ, a_φ; «sen»; factores
 * métricos vía el tensor g_ij (h_i = √g_ii); gradiente definido por
 * dV = ∇V·dr.
 */
import type { TheoryContent } from '../components/TheoryPanel';
import { P, Note, Warn, Mark, Collapsible, Table, SimLink } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';

// Diagrama: equipotenciales concéntricas + gradiente ⟂ + tangente + colina 3D
function DiagramaGradiente() {
  const GRAN = '#7a2e28';
  const TEAL = '#1f7a72';
  const INK = '#79694f';
  return (
    <svg viewBox="0 0 640 300" width="100%" role="img"
         aria-label="Equipotenciales concéntricas con el gradiente perpendicular apuntando al máximo">
      <defs>
        <marker id="gf-ah" markerWidth="9" markerHeight="9" refX="7" refY="4.2" orient="auto">
          <path d="M0,0 L8,4.2 L0,8.4 Z" fill={GRAN} />
        </marker>
      </defs>
      <g fill="none" stroke={INK} strokeWidth="1.3" opacity="0.6">
        <circle cx="200" cy="150" r="34" />
        <circle cx="200" cy="150" r="66" />
        <circle cx="200" cy="150" r="98" />
        <circle cx="200" cy="150" r="130" />
      </g>
      <text x="200" y="154" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={INK}>V máx</text>
      <text x="200" y="34" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={INK}>V = cte</text>
      <g stroke={GRAN} strokeWidth="2.6">
        <line x1="298" y1="150" x2="240" y2="150" markerEnd="url(#gf-ah)" />
        <line x1="130" y1="80" x2="171" y2="121" markerEnd="url(#gf-ah)" />
        <line x1="270" y1="80" x2="229" y2="121" markerEnd="url(#gf-ah)" />
        <line x1="130" y1="220" x2="171" y2="179" markerEnd="url(#gf-ah)" />
      </g>
      <text x="320" y="146" fontFamily="monospace" fontSize="13" fill={GRAN} fontWeight="600">∇V</text>
      <circle cx="298" cy="150" r="4.5" fill={GRAN} />
      <line x1="298" y1="96" x2="298" y2="204" stroke={TEAL} strokeWidth="2" strokeDasharray="7 5" />
      <text x="308" y="205" fontFamily="monospace" fontSize="12" fill={TEAL}>tangente (dV=0)</text>
      <g transform="translate(430,60)">
        <path d="M10,180 Q70,20 130,180 Z" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.6" />
        <line x1="70" y1="90" x2="110" y2="55" stroke={GRAN} strokeWidth="2.6" markerEnd="url(#gf-ah)" />
        <text x="70" y="205" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={INK}>z = V(x,y)</text>
        <text x="116" y="50" fontFamily="monospace" fontSize="12" fill={GRAN}>cuesta arriba</text>
      </g>
    </svg>
  );
}

export const theoryGradiente: TheoryContent = {
  intro: (
    <>
      El <strong>gradiente</strong> de un campo escalar <InlineMath>{'V'}</InlineMath> mide cómo
      varía <InlineMath>{'V'}</InlineMath> en el espacio: en qué dirección crece más deprisa y a
      qué ritmo. Es la puerta de entrada al campo eléctrico, ya que en electrostática{' '}
      <InlineMath>{'\\mathbf{E} = -\\nabla V'}</InlineMath>. Notación con vectores unitarios{' '}
      <InlineMath>{'\\mathbf{a}_x,\\mathbf{a}_r,\\mathbf{a}_R,\\mathbf{a}_\\theta,\\mathbf{a}_\\varphi'}</InlineMath>{' '}
      y «sen» para el seno.
      <Note>
        Puedes explorar todo esto en vivo en <SimLink to="grad">Simula → Visualizador del gradiente</SimLink>:
        escribe un campo <InlineMath>{'V(x,y)'}</InlineMath>, arrastra el punto sonda y comprueba
        que <InlineMath>{'\\nabla V'}</InlineMath> apunta cuesta arriba y cruza las
        equipotenciales en ángulo recto.
      </Note>
    </>
  ),
  sections: [
    {
      title: '1. Definición: el cambio de V en una dirección',
      body: (
        <>
          <P>
            Tomamos un punto <InlineMath>{'P_1(x,y,z)'}</InlineMath> y otro muy próximo{' '}
            <InlineMath>{'P_2(x+dx,\\,y+dy,\\,z+dz)'}</InlineMath>. Por cálculo diferencial, el{' '}
            <strong>diferencial total</strong> de <InlineMath>{'V'}</InlineMath> es:
          </P>
          <BlockMath>{'dV = \\frac{\\partial V}{\\partial x}\\,dx + \\frac{\\partial V}{\\partial y}\\,dy + \\frac{\\partial V}{\\partial z}\\,dz'}</BlockMath>
          <P>
            El lado derecho es un <strong>producto escalar</strong> entre un vector de derivadas
            parciales y el desplazamiento{' '}
            <InlineMath>{'d\\mathbf{r} = \\mathbf{a}_x\\,dx + \\mathbf{a}_y\\,dy + \\mathbf{a}_z\\,dz'}</InlineMath>:
          </P>
          <BlockMath>{'dV = \\left(\\mathbf{a}_x\\frac{\\partial V}{\\partial x}+\\mathbf{a}_y\\frac{\\partial V}{\\partial y}+\\mathbf{a}_z\\frac{\\partial V}{\\partial z}\\right)\\cdot d\\mathbf{r} = \\nabla V \\cdot d\\mathbf{r}'}</BlockMath>
          <Note>
            <Mark>Definición</Mark>: el gradiente <InlineMath>{'\\nabla V'}</InlineMath> (también{' '}
            <InlineMath>{'\\operatorname{grad}V'}</InlineMath>) es el vector que cumple{' '}
            <InlineMath>{'dV = \\nabla V\\cdot d\\mathbf{r}'}</InlineMath> para cualquier{' '}
            <InlineMath>{'d\\mathbf{r}'}</InlineMath>. Es una definición <strong>independiente del
            sistema de coordenadas</strong>; la forma con derivadas parciales es solo su expresión
            en cartesianas.
          </Note>
        </>
      ),
    },
    {
      title: '2. Significado geométrico y físico',
      body: (
        <>
          <P>Escribiendo el producto escalar con el ángulo <InlineMath>{'\\theta'}</InlineMath> entre <InlineMath>{'\\nabla V'}</InlineMath> y <InlineMath>{'d\\mathbf{r}'}</InlineMath>:</P>
          <BlockMath>{'dV = \\nabla V \\cdot d\\mathbf{r} = |\\nabla V|\\,|d\\mathbf{r}|\\,\\cos\\theta'}</BlockMath>
          <P>
            <Mark>Apunta al máximo crecimiento.</Mark> Para un paso de longitud fija, el cambio{' '}
            <InlineMath>{'dV'}</InlineMath> es máximo cuando <InlineMath>{'\\cos\\theta=1'}</InlineMath>,
            es decir, al moverse en la dirección de <InlineMath>{'\\nabla V'}</InlineMath>. Su módulo{' '}
            <InlineMath>{'|\\nabla V|'}</InlineMath> es esa mayor variación espacial (la pendiente máxima).
          </P>
          <P>
            <Mark>Perpendicular a las equipotenciales.</Mark> Sobre una superficie{' '}
            <InlineMath>{'V=\\text{cte}'}</InlineMath> se tiene <InlineMath>{'dV=0'}</InlineMath>, luego
          </P>
          <BlockMath>{'dV = 0 \\;\\Rightarrow\\; \\nabla V \\cdot d\\mathbf{r} = 0 \\;\\Rightarrow\\; \\nabla V \\perp d\\mathbf{r}'}</BlockMath>
          <P>para todo <InlineMath>{'d\\mathbf{r}'}</InlineMath> tangente: el gradiente es normal a las equipotenciales en cada punto.</P>
          <figure className="theory-figure theory-svgbox">
            <DiagramaGradiente />
            <figcaption className="theory-figure-caption">
              El gradiente (granate) es perpendicular a las equipotenciales y apunta hacia donde V crece;
              moverse por la tangente (teal) no cambia V. En 3D es la dirección de máxima pendiente de la
              «montaña» z = V(x,y).
            </figcaption>
          </figure>
        </>
      ),
    },
    {
      title: '3. Derivada direccional',
      body: (
        <>
          <P>
            La tasa de cambio de <InlineMath>{'V'}</InlineMath> por unidad de longitud en la dirección
            de un vector unitario <InlineMath>{'\\mathbf{a}_\\ell'}</InlineMath> es la proyección del gradiente:
          </P>
          <BlockMath>{'\\frac{dV}{d\\ell} = \\nabla V \\cdot \\mathbf{a}_\\ell = |\\nabla V|\\cos\\theta'}</BlockMath>
          <P>
            Es máxima (<InlineMath>{'=|\\nabla V|'}</InlineMath>) en la dirección del gradiente
            (<InlineMath>{'\\theta=0'}</InlineMath>) y <strong>nula</strong> a lo largo de una
            equipotencial (<InlineMath>{'\\theta=90^\\circ'}</InlineMath>). El gradiente empaqueta
            todas las derivadas direccionales a la vez.
          </P>
        </>
      ),
    },
    {
      title: '4. El operador ∇ y las coordenadas',
      body: (
        <>
          <P>El operador nabla en cartesianas:</P>
          <BlockMath>{'\\nabla = \\mathbf{a}_x\\frac{\\partial}{\\partial x} + \\mathbf{a}_y\\frac{\\partial}{\\partial y} + \\mathbf{a}_z\\frac{\\partial}{\\partial z}'}</BlockMath>
          <P>
            El gradiente se escribe, para un sistema ortogonal cualquiera{' '}
            <InlineMath>{'(x_1,x_2,x_3)'}</InlineMath>, con el <strong>tensor métrico</strong>{' '}
            <InlineMath>{'g_{ij}'}</InlineMath>. Solo intervienen los elementos de la diagonal{' '}
            <InlineMath>{'g_{ii}'}</InlineMath>, y el factor que aparece es{' '}
            <InlineMath>{'1/\\sqrt{g_{ii}}'}</InlineMath>:
          </P>
          <BlockMath>{'\\operatorname{grad}V = \\nabla V = \\sum_{i} \\mathbf{a}_i\\,\\frac{1}{\\sqrt{g_{ii}}}\\,\\frac{\\partial V}{\\partial x_i}'}</BlockMath>
          <P>
            Los <InlineMath>{'\\sqrt{g_{ii}}'}</InlineMath> son los factores métricos{' '}
            <InlineMath>{'h_i=\\sqrt{g_{ii}}'}</InlineMath>. Con los valores de la Tabla II:
          </P>
          <Table
            headers={['Sistema', 'g₁₁', 'g₂₂', 'g₃₃', 'h = √gᵢᵢ']}
            rows={[
              ['Cartesianas (x, y, z)', '1', '1', '1', '(1, 1, 1)'],
              ['Cilíndricas (r, φ, z)', '1', 'r²', '1', '(1, r, 1)'],
              ['Esféricas (R, θ, φ)', '1', 'R²', 'R²·sen²θ', '(1, R, R·senθ)'],
            ]}
          />
          <P>De ahí salen las tres expresiones del gradiente:</P>
          <BlockMath>{'\\text{Cartesianas:}\\quad \\nabla V = \\frac{\\partial V}{\\partial x}\\mathbf{a}_x + \\frac{\\partial V}{\\partial y}\\mathbf{a}_y + \\frac{\\partial V}{\\partial z}\\mathbf{a}_z'}</BlockMath>
          <BlockMath>{'\\text{Cilíndricas:}\\quad \\nabla V = \\frac{\\partial V}{\\partial r}\\mathbf{a}_r + \\frac{1}{r}\\frac{\\partial V}{\\partial \\varphi}\\mathbf{a}_\\varphi + \\frac{\\partial V}{\\partial z}\\mathbf{a}_z'}</BlockMath>
          <BlockMath>{'\\text{Esféricas:}\\quad \\nabla V = \\frac{\\partial V}{\\partial R}\\mathbf{a}_R + \\frac{1}{R}\\frac{\\partial V}{\\partial \\theta}\\mathbf{a}_\\theta + \\frac{1}{R\\,\\operatorname{sen}\\theta}\\frac{\\partial V}{\\partial \\varphi}\\mathbf{a}_\\varphi'}</BlockMath>
          <Note>
            <Mark>Truco.</Mark> No memorices tres fórmulas: memoriza la diagonal del tensor métrico{' '}
            <InlineMath>{'g_{ii}'}</InlineMath> y la regla <InlineMath>{'1/\\sqrt{g_{ii}}'}</InlineMath>.
            Con eso reconstruyes gradiente, divergencia, rotacional y laplaciano en cualquier sistema.
          </Note>
        </>
      ),
    },
    {
      title: '5. Física: el campo eléctrico E = −∇V',
      body: (
        <>
          <P>El campo electrostático deriva del potencial:</P>
          <BlockMath>{'\\mathbf{E} = -\\nabla V'}</BlockMath>
          <P>
            El signo menos indica que <InlineMath>{'\\mathbf{E}'}</InlineMath> apunta de mayor a menor
            potencial, mientras que <InlineMath>{'\\nabla V'}</InlineMath> apunta hacia donde{' '}
            <InlineMath>{'V'}</InlineMath> crece. La diferencia de potencial es el trabajo por unidad
            de carga contra el campo:
          </P>
          <BlockMath>{'V_{AB} = V_A - V_B = -\\int_B^A \\mathbf{E}\\cdot d\\mathbf{l}'}</BlockMath>
          <Note>
            <Mark>De aquí salen Poisson y Laplace.</Mark> Partiendo de{' '}
            <InlineMath>{'\\nabla\\cdot\\mathbf{E}=\\rho/\\varepsilon'}</InlineMath> y sustituyendo{' '}
            <InlineMath>{'\\mathbf{E}=-\\nabla V'}</InlineMath> se obtiene la ecuación de{' '}
            <strong>Poisson</strong> y, sin carga, la de <strong>Laplace</strong>:
            <BlockMath>{'\\nabla^2 V = -\\frac{\\rho}{\\varepsilon} \\qquad\\qquad \\nabla^2 V = 0'}</BlockMath>
            donde <InlineMath>{'\\nabla^2 = \\nabla\\cdot\\nabla = \\Delta'}</InlineMath> es la Laplaciana{' '}
            <InlineMath>{'\\big(\\nabla\\cdot(\\operatorname{grad}V)\\big)'}</InlineMath>.
          </Note>
        </>
      ),
    },
    {
      title: '6. Propiedades e identidades',
      body: (
        <>
          <P>El gradiente es lineal y sigue reglas análogas a las de la derivada:</P>
          <BlockMath>{'\\nabla(\\alpha U + \\beta V) = \\alpha\\,\\nabla U + \\beta\\,\\nabla V'}</BlockMath>
          <BlockMath>{'\\nabla(UV) = U\\,\\nabla V + V\\,\\nabla U \\qquad \\nabla f(V) = f\'(V)\\,\\nabla V'}</BlockMath>
          <P>Identidad nula fundamental — el rotacional de todo gradiente es cero:</P>
          <BlockMath>{'\\nabla \\times (\\nabla V) = 0'}</BlockMath>
          <P>
            Dicho de otra forma, <InlineMath>{'\\nabla\\times\\mathbf{A}=0 \\iff \\mathbf{A}=-\\nabla V'}</InlineMath>:
            un campo que deriva de un potencial escalar es <strong>irrotacional</strong> (conservativo).
            Como en electrostática <InlineMath>{'\\nabla\\times\\mathbf{E}=0'}</InlineMath>, existe un
            potencial <InlineMath>{'V'}</InlineMath> con <InlineMath>{'\\mathbf{E}=-\\nabla V'}</InlineMath>.
            Es el eslabón con la clasificación de campos y el teorema de Helmholtz.
          </P>
          <Warn>
            <strong>No confundir:</strong> el gradiente actúa sobre un <em>escalar</em> y devuelve un{' '}
            <em>vector</em>; la divergencia y el rotacional actúan sobre un <em>vector</em>.
          </Warn>
        </>
      ),
    },
    {
      title: '7. Ejemplos resueltos',
      body: (
        <>
          <Collapsible summary="Ejemplo 1 · Cartesianas">
            <P>Sea <InlineMath>{'V = 2x^2 + 2y^3 + 2z^2'}</InlineMath>. Derivando:</P>
            <BlockMath>{'\\nabla V = 4x\\,\\mathbf{a}_x + 6y^2\\,\\mathbf{a}_y + 4z\\,\\mathbf{a}_z'}</BlockMath>
            <P>
              En <InlineMath>{'P(1,1,1)'}</InlineMath>: <InlineMath>{'\\nabla V = 4\\mathbf{a}_x+6\\mathbf{a}_y+4\\mathbf{a}_z'}</InlineMath>,
              con <InlineMath>{'|\\nabla V|=\\sqrt{68}\\approx 8.2'}</InlineMath>. Derivada direccional hacia{' '}
              <InlineMath>{'\\mathbf{a}_\\ell=\\tfrac{1}{\\sqrt3}(1,1,1)'}</InlineMath>:
            </P>
            <BlockMath>{'\\frac{dV}{d\\ell} = \\nabla V\\cdot\\mathbf{a}_\\ell = \\frac{4+6+4}{\\sqrt3} = \\frac{14}{\\sqrt3}\\approx 8.1'}</BlockMath>
          </Collapsible>
          <Collapsible summary="Ejemplo 2 · Esféricas · por qué E = −∇V (carga puntual)">
            <P>Potencial de una carga <InlineMath>{'Q'}</InlineMath>: <InlineMath>{'V = \\dfrac{Q}{4\\pi\\varepsilon_0 R}'}</InlineMath>. Como solo depende de <InlineMath>{'R'}</InlineMath>:</P>
            <BlockMath>{'\\nabla V = \\frac{\\partial V}{\\partial R}\\,\\mathbf{a}_R = -\\frac{Q}{4\\pi\\varepsilon_0 R^2}\\,\\mathbf{a}_R'}</BlockMath>
            <BlockMath>{'\\mathbf{E} = -\\nabla V = \\frac{Q}{4\\pi\\varepsilon_0 R^2}\\,\\mathbf{a}_R \\quad(\\text{ley de Coulomb})'}</BlockMath>
            <P>Lección: elige el sistema con la simetría del problema y el gradiente se reduce a una sola derivada.</P>
          </Collapsible>
          <Collapsible summary="Ejemplo 3 · Campo conservativo → su potencial">
            <P>
              Dado <InlineMath>{'\\mathbf{A} = 2y\\,\\mathbf{a}_x + (2x+3z)\\,\\mathbf{a}_y + 3y\\,\\mathbf{a}_z'}</InlineMath>.
              Es solenoidal (<InlineMath>{'\\nabla\\cdot\\mathbf{A}=0'}</InlineMath>) e irrotacional
              (<InlineMath>{'\\nabla\\times\\mathbf{A}=\\mathbf{0}'}</InlineMath>), así que deriva de un
              potencial <InlineMath>{'V'}</InlineMath> con <InlineMath>{'\\mathbf{A}=\\nabla V'}</InlineMath>. Integrando:
            </P>
            <BlockMath>{'\\int A_x\\,dx = 2xy, \\quad \\int A_y\\,dy = 2xy+3yz, \\quad \\int A_z\\,dz = 3yz'}</BlockMath>
            <P>
              Reuniendo sin repetir: <InlineMath>{'V(x,y,z) = 2xy + 3yz + C'}</InlineMath> — el proceso
              inverso del gradiente. (Aquí <InlineMath>{'\\mathbf{A}=\\nabla V'}</InlineMath>; en electrostática
              el convenio es <InlineMath>{'\\mathbf{E}=-\\nabla V'}</InlineMath>.)
            </P>
          </Collapsible>
        </>
      ),
    },
    {
      title: '8. Un error frecuente a evitar',
      body: (
        <>
          <Warn>
            <strong>Cuidado con el azimut.</strong> En la tabla de transformación (cartesiano → esférico)
            el azimutal es <InlineMath>{'\\varphi = \\tan^{-1}(y/x)'}</InlineMath> — el mismo que en
            cilíndricas. Al copiarlo a mano es fácil escribir <InlineMath>{'y/z'}</InlineMath> por error;
            usa <InlineMath>{'\\operatorname{atan2}(y,x)'}</InlineMath> para conservar el cuadrante.
          </Warn>
        </>
      ),
    },
  ],
  references: [
    'D. K. Cheng — Fundamentos de electromagnetismo para ingeniería (cap. 2).',
  ],
};

export default theoryGradiente;
