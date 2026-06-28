import { TheoryContent, P, Note, DefList } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';

const theoryFunciones: TheoryContent = {
  intro: (
    <>
      <p style={{ marginBottom: '0.75rem' }}>
        <strong>Representar y analizar una función</strong> consiste en estudiar
        su comportamiento para entender cómo se relaciona la variable dependiente
        con la independiente: dónde corta los ejes, dónde crece o decrece, sus
        máximos y mínimos, y su forma global.
      </p>
      <p>
        Esta herramienta dibuja una o varias funciones en el rango que elijas y
        calcula automáticamente las raíces, los extremos y el corte con el eje Y
        de la función principal.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Dominio y recorrido',
      body: (
        <>
          <P>
            El <strong>dominio</strong> son los valores de{' '}
            <InlineMath>{'x'}</InlineMath> para los que la función existe; el{' '}
            <strong>recorrido</strong> (o imagen) son los valores de{' '}
            <InlineMath>{'y'}</InlineMath> que toma.
          </P>
          <Note>
            Atención a las restricciones típicas: denominadores que se anulan
            (<InlineMath>{'1/x'}</InlineMath> no existe en{' '}
            <InlineMath>{'x=0'}</InlineMath>), raíces de índice par de números
            negativos, o logaritmos de números ≤ 0.
          </Note>
        </>
      ),
    },
    {
      title: '2. Cortes con los ejes',
      body: (
        <>
          <P><strong>Con el eje X (raíces):</strong> los valores donde la función vale cero.</P>
          <BlockMath>{'f(x) = 0'}</BlockMath>
          <P><strong>Con el eje Y:</strong> el valor de la función en <InlineMath>{'x=0'}</InlineMath>.</P>
          <BlockMath>{'(0,\\; f(0))'}</BlockMath>
          <Note>La calculadora marca las raíces con círculos azules sobre el eje X.</Note>
        </>
      ),
    },
    {
      title: '3. Crecimiento y extremos',
      body: (
        <>
          <P>
            El signo de la <strong>primera derivada</strong> indica si la función
            crece o decrece, y sus ceros localizan los extremos:
          </P>
          <DefList items={[
            { term: "f'(x) > 0", def: 'función creciente.' },
            { term: "f'(x) < 0", def: 'función decreciente.' },
            { term: "f'(x) = 0", def: 'punto crítico: máximo, mínimo o inflexión.' },
          ]} />
          <P>
            En un <strong>máximo</strong> la derivada pasa de positiva a negativa;
            en un <strong>mínimo</strong>, de negativa a positiva. Actívalos con el
            botón «Análisis» (rojo = máximo, verde = mínimo).
          </P>
        </>
      ),
    },
    {
      title: '4. Concavidad e inflexión',
      body: (
        <>
          <P>La <strong>segunda derivada</strong> describe la curvatura:</P>
          <DefList items={[
            { term: "f''(x) > 0", def: 'cóncava hacia arriba (forma de ∪).' },
            { term: "f''(x) < 0", def: 'cóncava hacia abajo (forma de ∩).' },
            { term: "f''(x) = 0", def: 'posible punto de inflexión (cambia la curvatura).' },
          ]} />
          <Note>
            Activa «Mostrar f′(x)» para ver la derivada superpuesta: donde corta el
            eje X están los extremos de <InlineMath>{'f'}</InlineMath>.
          </Note>
        </>
      ),
    },
    {
      title: '5. Simetría y asíntotas',
      body: (
        <>
          <DefList items={[
            { term: 'Función par', def: <><InlineMath>{'f(-x) = f(x)'}</InlineMath> — simétrica respecto del eje Y (p. ej. <InlineMath>{'x^2'}</InlineMath>).</> },
            { term: 'Función impar', def: <><InlineMath>{'f(-x) = -f(x)'}</InlineMath> — simétrica respecto del origen (p. ej. <InlineMath>{'x^3'}</InlineMath>).</> },
            { term: 'Asíntota vertical', def: <>la función tiende a ±∞ al acercarse a un valor (p. ej. <InlineMath>{'1/x'}</InlineMath> en <InlineMath>{'x=0'}</InlineMath>).</> },
            { term: 'Asíntota horizontal', def: <>la función tiende a un valor finito cuando <InlineMath>{'x \\to \\pm\\infty'}</InlineMath>.</> },
          ]} />
        </>
      ),
    },
    {
      title: '6. Sintaxis y uso',
      body: (
        <>
          <P>Escribe cada función con la variable <InlineMath>{'x'}</InlineMath>. Puedes añadir varias para compararlas.</P>
          <DefList items={[
            { term: 'Operadores', def: <><InlineMath>{'+\\;-\\;*\\;/'}</InlineMath> y <InlineMath>{'\\hat{}'}</InlineMath> para potencias.</> },
            { term: 'Funciones', def: 'sin, cos, tan, exp, sqrt, log (logaritmo natural), abs…' },
            { term: 'Constantes', def: <><InlineMath>{'pi'}</InlineMath>, <InlineMath>{'e'}</InlineMath> — válidas también en los límites del rango.</> },
          ]} />
          <Note>
            El análisis es <strong>numérico</strong> sobre el rango visible: si no
            ves una raíz o un extremo, amplía el intervalo [x mínimo, x máximo].
          </Note>
        </>
      ),
    },
  ],
  references: [
    'Stewart, J. (2015). Calculus: Early Transcendentals (8th ed.). Cengage.',
    'Larson, R. & Edwards, B. (2017). Calculus (11th ed.). Cengage.',
    'Apostol, T. M. (1991). Calculus, Vol. 1. Reverté.',
  ],
};

export default theoryFunciones;
