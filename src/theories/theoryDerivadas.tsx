import { TheoryContent, P, Note, Warn, DefList, Table } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';

const theoryDerivadas: TheoryContent = {
  intro: (
    <>
      <p style={{ marginBottom: '0.75rem' }}>
        La <strong>derivada</strong> mide cómo cambia una función: es la{' '}
        <strong>tasa de variación instantánea</strong>. Geométricamente, la
        derivada en un punto es la <strong>pendiente de la recta tangente</strong>{' '}
        a la curva en ese punto.
      </p>
      <p>
        Es una de las herramientas centrales del cálculo: con ella se obtienen
        velocidades y aceleraciones a partir de la posición, se localizan máximos
        y mínimos, y se analiza el comportamiento de cualquier magnitud que varía.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Definición como límite',
      body: (
        <>
          <P>La derivada se define como el límite del cociente incremental:</P>
          <BlockMath>{"f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"}</BlockMath>
          <P>
            Es la pendiente de la recta secante cuando los dos puntos se acercan
            hasta tocarse: la <strong>tangente</strong>. Si el límite existe, la
            función es <strong>derivable</strong> en ese punto.
          </P>
          <Note>
            Notaciones equivalentes: <InlineMath>{"f'(x)"}</InlineMath>,{' '}
            <InlineMath>{'\\frac{df}{dx}'}</InlineMath>,{' '}
            <InlineMath>{'\\frac{d}{dx}f(x)'}</InlineMath>,{' '}
            <InlineMath>{'\\dot{x}'}</InlineMath> (esta última, para derivadas respecto del tiempo).
          </Note>
        </>
      ),
    },
    {
      title: '2. Interpretación: pendiente y recta tangente',
      body: (
        <>
          <P>
            La recta tangente a <InlineMath>{'f'}</InlineMath> en{' '}
            <InlineMath>{'x_0'}</InlineMath> tiene de pendiente{' '}
            <InlineMath>{"m = f'(x_0)"}</InlineMath>:
          </P>
          <BlockMath>{"y = f(x_0) + f'(x_0)\\,(x - x_0)"}</BlockMath>
          <DefList items={[
            { term: "f'(x_0) > 0", def: 'la función crece en ese punto.' },
            { term: "f'(x_0) < 0", def: 'la función decrece.' },
            { term: "f'(x_0) = 0", def: 'punto crítico (posible máximo, mínimo o inflexión).' },
          ]} />
          <Note>
            La calculadora dibuja esa recta tangente (verde) sobre la curva cuando
            eliges «Derivada en un punto».
          </Note>
        </>
      ),
    },
    {
      title: '3. Reglas básicas',
      body: (
        <>
          <Table
            headers={['Función f(x)', "Derivada f'(x)"]}
            rows={[
              ['k (constante)', '0'],
              ['xⁿ', 'n·xⁿ⁻¹'],
              ['eˣ', 'eˣ'],
              ['aˣ', 'aˣ·ln a'],
              ['ln x', '1/x'],
              ['sin x', 'cos x'],
              ['cos x', '−sin x'],
              ['tan x', 'sec²x = 1 + tan²x'],
              ['√x', '1 / (2√x)'],
            ]}
          />
          <P>La más usada es la <strong>regla de la potencia</strong>:</P>
          <BlockMath>{"\\frac{d}{dx}\\,x^{n} = n\\,x^{n-1}"}</BlockMath>
        </>
      ),
    },
    {
      title: '4. Linealidad, producto y cociente',
      body: (
        <>
          <P><strong>Linealidad</strong> — suma y constantes:</P>
          <BlockMath>{"(a\\,f + b\\,g)' = a\\,f' + b\\,g'"}</BlockMath>
          <P><strong>Regla del producto:</strong></P>
          <BlockMath>{"(f\\cdot g)' = f'\\,g + f\\,g'"}</BlockMath>
          <P><strong>Regla del cociente:</strong></P>
          <BlockMath>{"\\left(\\frac{f}{g}\\right)' = \\frac{f'\\,g - f\\,g'}{g^{2}}"}</BlockMath>
          <Warn>
            Error típico: <InlineMath>{"(f\\cdot g)' \\neq f'\\cdot g'"}</InlineMath>.
            La derivada de un producto NO es el producto de las derivadas — hay
            que usar la regla del producto.
          </Warn>
        </>
      ),
    },
    {
      title: '5. Regla de la cadena',
      body: (
        <>
          <P>
            Para funciones compuestas <InlineMath>{'f(g(x))'}</InlineMath>, se
            deriva la externa y se multiplica por la derivada de la interna:
          </P>
          <BlockMath>{"\\frac{d}{dx}\\,f(g(x)) = f'(g(x))\\cdot g'(x)"}</BlockMath>
          <DefList items={[
            { term: 'sin(2x)', def: <><InlineMath>{'\\cos(2x)\\cdot 2 = 2\\cos(2x)'}</InlineMath></> },
            { term: 'e^{3x}', def: <><InlineMath>{'3\\,e^{3x}'}</InlineMath></> },
            { term: '(x^2+1)^5', def: <><InlineMath>{'5(x^2+1)^4\\cdot 2x'}</InlineMath></> },
          ]} />
          <Note>
            La calculadora marca con una etiqueta los términos donde interviene la
            regla de la cadena (argumento no trivial).
          </Note>
        </>
      ),
    },
    {
      title: '6. Aplicaciones',
      body: (
        <>
          <DefList items={[
            { term: 'Cinemática', def: <>velocidad <InlineMath>{'v = dx/dt'}</InlineMath> y aceleración <InlineMath>{'a = dv/dt'}</InlineMath> a partir de la posición.</> },
            { term: 'Optimización', def: <>los máximos y mínimos se buscan resolviendo <InlineMath>{"f'(x) = 0"}</InlineMath>.</> },
            { term: 'Análisis de curvas', def: 'crecimiento, decrecimiento y concavidad (con la segunda derivada).' },
            { term: 'Física e ingeniería', def: 'cualquier «razón de cambio»: caudal, intensidad de corriente, potencia…' },
          ]} />
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
            { term: 'Producto / cociente', def: <><InlineMath>{'x*sin(x)'}</InlineMath>, <InlineMath>{'x^2/(x+1)'}</InlineMath></> },
            { term: 'Funciones', def: 'sin, cos, tan, exp, sqrt, log (logaritmo natural), sinh, cosh' },
            { term: 'Constantes', def: <><InlineMath>{'pi'}</InlineMath>, <InlineMath>{'e'}</InlineMath> — también válidas en el punto x₀.</> },
          ]} />
        </>
      ),
    },
  ],
  references: [
    'Stewart, J. (2015). Calculus: Early Transcendentals (8th ed.). Cengage.',
    'Spivak, M. (2008). Calculus (4th ed.). Publish or Perish.',
    'Apostol, T. M. (1991). Calculus, Vol. 1. Reverté.',
  ],
};

export default theoryDerivadas;
