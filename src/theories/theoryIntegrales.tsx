import { TheoryContent, P, Note, Warn, DefList, Table } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';

const theoryIntegrales: TheoryContent = {
  intro: (
    <>
      <p style={{ marginBottom: '0.75rem' }}>
        La <strong>integral</strong> es la operación inversa de la derivada y
        una de las herramientas centrales del cálculo. Permite recuperar una
        función a partir de su tasa de variación y calcular magnitudes
        acumuladas: áreas, volúmenes, trabajo, carga eléctrica, espacio
        recorrido a partir de la velocidad, etc.
      </p>
      <p>
        Distinguimos la <strong>integral indefinida</strong> (la familia de
        primitivas <InlineMath>{'F(x)+C'}</InlineMath>) de la{' '}
        <strong>integral definida</strong> (un número: el área neta con signo
        entre la curva y el eje X en un intervalo).
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Primitiva e integral indefinida',
      body: (
        <>
          <P>
            <InlineMath>{'F(x)'}</InlineMath> es una <strong>primitiva</strong>{' '}
            de <InlineMath>{'f(x)'}</InlineMath> si{' '}
            <InlineMath>{"F'(x) = f(x)"}</InlineMath>. Como la derivada de una
            constante es cero, hay infinitas primitivas que difieren en una
            constante:
          </P>
          <BlockMath>{'\\int f(x)\\,dx = F(x) + C \\qquad \\text{con } F\'(x)=f(x)'}</BlockMath>
          <Note>
            Por eso toda integral indefinida lleva la <strong>constante de
            integración</strong> <InlineMath>{'C'}</InlineMath>. La calculadora
            la añade automáticamente.
          </Note>
        </>
      ),
    },
    {
      title: '2. Propiedad de linealidad',
      body: (
        <>
          <P>
            La integral de una suma es la suma de las integrales, y las
            constantes multiplicativas salen fuera. Esto permite integrar
            polinomios y combinaciones término a término:
          </P>
          <BlockMath>{'\\int \\big[a\\,f(x) + b\\,g(x)\\big]\\,dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx'}</BlockMath>
        </>
      ),
    },
    {
      title: '3. Reglas inmediatas',
      body: (
        <>
          <P>El motor de la calculadora aplica estas primitivas elementales:</P>
          <Table
            headers={['Función f(x)', 'Primitiva ∫ f(x) dx']}
            rows={[
              ['k (constante)', 'k·x + C'],
              ['xⁿ  (n ≠ −1)', 'xⁿ⁺¹ / (n+1) + C'],
              ['1/x', 'ln|x| + C'],
              ['eˣ', 'eˣ + C'],
              ['aˣ', 'aˣ / ln a + C'],
              ['sin x', '−cos x + C'],
              ['cos x', 'sin x + C'],
              ['tan x', '−ln|cos x| + C'],
              ['√x', '(2/3) x^(3/2) + C'],
              ['ln x', 'x·ln x − x + C'],
            ]}
          />
          <P>La regla más usada es la <strong>regla de la potencia</strong>:</P>
          <BlockMath>{'\\int x^{n}\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)'}</BlockMath>
          <Warn>
            El caso <InlineMath>{'n = -1'}</InlineMath> es la única excepción de
            la regla de la potencia: <InlineMath>{'\\int x^{-1}dx = \\ln|x| + C'}</InlineMath>,
            no <InlineMath>{'x^{0}/0'}</InlineMath>.
          </Warn>
        </>
      ),
    },
    {
      title: '4. Regla de la cadena (argumento lineal)',
      body: (
        <>
          <P>
            Cuando el argumento de una función es lineal,{' '}
            <InlineMath>{'u = m\\,x + b'}</InlineMath>, hay que dividir por el
            coeficiente <InlineMath>{'m'}</InlineMath> (sustitución{' '}
            <InlineMath>{'du = m\\,dx'}</InlineMath>):
          </P>
          <BlockMath>{'\\int \\sin(m x + b)\\,dx = -\\frac{\\cos(m x + b)}{m} + C'}</BlockMath>
          <BlockMath>{'\\int e^{m x + b}\\,dx = \\frac{e^{m x + b}}{m} + C'}</BlockMath>
          <Note>
            Ejemplo: <InlineMath>{'\\int \\cos(2x)\\,dx = \\tfrac{1}{2}\\sin(2x) + C'}</InlineMath>.
            La calculadora marca con una etiqueta los términos donde aplica esta
            regla.
          </Note>
        </>
      ),
    },
    {
      title: '5. Integral definida y Teorema Fundamental del Cálculo',
      body: (
        <>
          <P>
            La <strong>integral definida</strong> mide el área neta con signo
            entre la curva y el eje X. El <strong>Teorema Fundamental del
            Cálculo</strong> la conecta con la primitiva:
          </P>
          <BlockMath>{'\\int_{a}^{b} f(x)\\,dx = \\Big[F(x)\\Big]_{a}^{b} = F(b) - F(a)'}</BlockMath>
          <P>
            «Área neta» significa que la región por <strong>debajo</strong> del
            eje X resta. Si quieres el área geométrica total habría que integrar{' '}
            <InlineMath>{'|f(x)|'}</InlineMath>.
          </P>
          <DefList items={[
            { term: 'Resultado exacto', def: <>Se evalúa la primitiva: <InlineMath>{'F(b)-F(a)'}</InlineMath>. Disponible cuando la integral se resuelve simbólicamente.</> },
            { term: 'Resultado numérico', def: <>Aproximación por la <strong>regla de Simpson</strong> compuesta, válida incluso cuando no hay primitiva elemental.</> },
          ]} />
        </>
      ),
    },
    {
      title: '6. Integración numérica — regla de Simpson',
      body: (
        <>
          <P>
            Divide <InlineMath>{'[a,b]'}</InlineMath> en{' '}
            <InlineMath>{'N'}</InlineMath> subintervalos pares y aproxima la
            función por parábolas. Es mucho más precisa que el método de
            trapecios:
          </P>
          <BlockMath>{'\\int_{a}^{b} f(x)\\,dx \\approx \\frac{h}{3}\\Big[f_0 + 4f_1 + 2f_2 + 4f_3 + \\cdots + 4f_{N-1} + f_N\\Big]'}</BlockMath>
          <P>con <InlineMath>{'h = (b-a)/N'}</InlineMath>. La calculadora usa <InlineMath>{'N = 2000'}</InlineMath>, suficiente para una excelente precisión en funciones suaves.</P>
        </>
      ),
    },
    {
      title: '7. Sintaxis de entrada',
      body: (
        <>
          <P>Escribe la función usando la variable <InlineMath>{'x'}</InlineMath>:</P>
          <DefList items={[
            { term: 'Potencias', def: <><InlineMath>{'x^2'}</InlineMath>, <InlineMath>{'x^{-1}'}</InlineMath></> },
            { term: 'Producto / cociente', def: <><InlineMath>{'3*x'}</InlineMath>, <InlineMath>{'1/x'}</InlineMath></> },
            { term: 'Funciones', def: 'sin, cos, tan, exp, sqrt, log (logaritmo natural), sinh, cosh' },
            { term: 'Constantes', def: <><InlineMath>{'pi'}</InlineMath>, <InlineMath>{'e'}</InlineMath> — también válidas en los límites a y b.</> },
          ]} />
          <Warn>
            Algunas integrales no tienen primitiva elemental (p. ej.{' '}
            <InlineMath>{'e^{-x^2}'}</InlineMath>) o requieren técnicas avanzadas
            (integración por partes, fracciones parciales). En esos casos la
            calculadora ofrece igualmente el <strong>resultado numérico</strong>{' '}
            de la integral definida.
          </Warn>
        </>
      ),
    },
  ],
  references: [
    'Stewart, J. (2015). Calculus: Early Transcendentals (8th ed.). Cengage.',
    'Spivak, M. (2008). Calculus (4th ed.). Publish or Perish.',
    'Burden, R. & Faires, J. D. (2010). Numerical Analysis (9th ed.) — regla de Simpson.',
  ],
};

export default theoryIntegrales;
