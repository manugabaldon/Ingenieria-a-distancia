import { TheoryContent, P, Note, Warn, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramRotorTypes, DiagramOrbitas } from '../components/TheoryDiagrams';

const IMG = {
  helicopter: 'https://images.unsplash.com/photo-1569601811497-03a05e22d8e3?w=900&q=80',
  turbine:    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=900&q=80',
  vibration:  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  engine:     'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
};

const theoryRotor: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.helicopter} alt="Helicóptero con rotor principal" height={240}
        caption="El rotor principal de un helicóptero debe estar perfectamente equilibrado. Un desequilibrio de solo 10 g·mm a 300 RPM puede generar vibraciones que alcanzan la estructura de la célula y los pasajeros."/>
      <p style={{ marginBottom: '0.75rem' }}>
        El <strong>desequilibrio de rotor</strong> es la condición en la que la distribución de masa no es axialmente simétrica respecto al eje de rotación. Genera fuerzas y momentos centrífugos que se transmiten a los cojinetes como vibraciones, causando fatiga estructural, desgaste acelerado y, en casos extremos, fallo catastrófico.
      </p>
      <p>
        En aeronáutica afecta a hélices, turbinas, compresores, rotores de helicóptero y APU. Las normas ISO 1940-1 y EASA Part-66 M12 regulan los límites admisibles.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Tipos de desequilibrio',
      body: (
        <>
          <TheorySvg caption="Los tres tipos fundamentales de desequilibrio en un rotor. En el tipo estático, el eje de inercia está desplazado pero paralelo al eje de giro. En el dinámico (par puro), los ejes se cruzan. El tipo general combina ambos.">
            <DiagramRotorTypes />
          </TheorySvg>
          <DefList items={[
            { term: 'Estático', def: 'Una sola masa excéntrica. El eje de inercia está desplazado paralelo al eje de rotación. Ambos cojinetes vibran en fase.' },
            { term: 'Dinámico (par puro)', def: 'Dos masas iguales en planos opuestos a 180°. El centro de masa coincide con el eje, pero el eje de inercia lo corta. Solo detectable en rotación. Cojinetes en antifase.' },
            { term: 'Dinámico general', def: 'Combinación de estático y par. Requiere corrección en dos planos.' },
          ]} />
          <Note>Todo desequilibrio general puede descomponerse en sus componentes estático y de par mediante el método de los dos planos de corrección.</Note>
        </>
      ),
    },
    {
      title: '2. Fuerzas centrífugas y reacciones en cojinetes',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.turbine} alt="Turbina de motor de aviación" height={180}
              caption="Turbina de alta presión. La tolerancia de equilibrado G1 exige un desequilibrio residual < 1 g·mm/kg."/>
            <TheoryFigure src={IMG.engine} alt="Vista del motor de un avión" height={180}
              caption="El motor turbofan tiene varias etapas giratorias (fan, compresor, turbina) cada una equilibrada individualmente."/>
          </TheoryGrid>
          <P>Una masa <InlineMath>{'m'}</InlineMath> a radio <InlineMath>{'r'}</InlineMath> girando a velocidad angular <InlineMath>{'\\omega'}</InlineMath> genera una fuerza centrífuga:</P>
          <BlockMath>{'F_c = m \\cdot r \\cdot \\omega^2 \\qquad [\\text{N}] \\qquad \\left(\\omega = \\frac{2\\pi \\cdot n}{60}\\right)'}</BlockMath>
          <P>El desequilibrio <InlineMath>{'U'}</InlineMath> (momento estático) se expresa en <InlineMath>{'\\text{g}\\cdot\\text{mm}'}</InlineMath>:</P>
          <BlockMath>{'U = m \\cdot r \\qquad [\\text{g}\\cdot\\text{mm}]'}</BlockMath>
          <P>Para un rotor con masas en posiciones axiales normalizadas <InlineMath>{'z_i \\in [0,1]'}</InlineMath>, las reacciones en los cojinetes:</P>
          <BlockMath>{'F_L = \\omega^2 \\sum_i m_i \\, r_i \\,(1 - z_i) \\qquad F_R = \\omega^2 \\sum_i m_i \\, r_i \\, z_i'}</BlockMath>
          <P>El desplazamiento (amplitud de vibración) del cojinete:</P>
          <BlockMath>{'\\delta = \\frac{F}{K} \\qquad K = \\text{rigidez del cojinete} \\ [\\text{N/m}]'}</BlockMath>
        </>
      ),
    },
    {
      title: '3. Velocidades críticas y resonancia',
      body: (
        <>
          <P>La <strong>velocidad crítica</strong> es aquella en la que la frecuencia de excitación (1×RPM) coincide con la frecuencia natural del sistema rotor-cojinetes. Modelo de Jeffcott:</P>
          <BlockMath>{'\\omega_c = \\sqrt{\\frac{K}{m_{\\text{rotor}}}} \\ [\\text{rad/s}] \\qquad N_c = \\frac{60}{2\\pi}\\sqrt{\\frac{K}{m}} \\ [\\text{RPM}]'}</BlockMath>
          <P>La amplitud de vibración cerca de <InlineMath>{'\\omega_c'}</InlineMath> con factor de amortiguamiento <InlineMath>{'\\zeta'}</InlineMath>:</P>
          <BlockMath>{'A(\\omega) = \\frac{m\\,e\\,\\omega^2/K}{\\sqrt{\\left(1 - r^2\\right)^2 + \\left(2\\zeta r\\right)^2}} \\qquad r = \\frac{\\omega}{\\omega_c}'}</BlockMath>
          <Warn>Los motores de aviación deben operar fuera de las velocidades críticas con un margen de ±20 % (diagrama de Campbell). Las transiciones de arranque/apagado se realizan lo más rápido posible.</Warn>
          <Table
            headers={['Categoría', 'Velocidad crítica', 'Condición de operación']}
            rows={[
              ['Rotor rígido', 'Nc > N_op', 'Siempre subcrítico'],
              ['Rotor flexible', 'Nc < N_op', 'Cruza la crítica al arranque'],
              ['Motor turbofan', 'Varias Nc', 'Diagrama de Campbell obligatorio'],
            ]}
          />
        </>
      ),
    },
    {
      title: '4. Calidad de equilibrado — ISO 1940-1',
      body: (
        <>
          <P>El grado de calidad <InlineMath>{'G'}</InlineMath> se define como:</P>
          <BlockMath>{'G = e_{\\text{perm}} \\cdot \\omega_{\\max} \\qquad [\\text{mm/s}]'}</BlockMath>
          <BlockMath>{'U_{\\text{perm}} = m_{\\text{rotor}} \\cdot e_{\\text{perm}} \\qquad [\\text{g}\\cdot\\text{mm}]'}</BlockMath>
          <Table
            headers={['Grado G', 'G (mm/s)', 'Ejemplos aeronáuticos']}
            rows={[
              ['G 0.4', '0.4', 'Giroscopios de precisión'],
              ['G 1',   '1',   'Turbinas de motores de aviación (N1, N2)'],
              ['G 2.5', '2.5', 'Compresores de gas, APU, turboalimentadores'],
              ['G 6.3', '6.3', 'Hélices de aviación general'],
              ['G 40',  '40',  'Cigüeñales, motores de pistón'],
            ]}
          />
        </>
      ),
    },
    {
      title: '5. Órbitas de cojinete — diagnóstico',
      body: (
        <>
          <TheorySvg caption="Formas típicas de órbitas de cojinete. Cada patrón corresponde a un tipo de fallo diferente. La elipse limpia a 1× es la firma del desequilibrio puro.">
            <DiagramOrbitas />
          </TheorySvg>
          <DefList items={[
            { term: 'Elipse limpia 1×', def: 'Desequilibrio puro: órbitas en fase (estático) o en antifase (par puro).' },
            { term: 'Elipse con lazo', def: 'Rozamiento de sello o rub — componente 2× o subarmónica 0.5×.' },
            { term: 'Espiral no cerrada', def: 'Oil whirl — componente <0.5×, problema de lubricación.' },
            { term: 'Círculo perfecto pequeño', def: 'Rotor perfectamente equilibrado.' },
          ]} />
          <Note>ISO 7919-1 establece los límites de vibración de árbol (μm pico-pico) en función de la velocidad. Las turbinas aeronáuticas usan límites más estrictos del OEM.</Note>
        </>
      ),
    },
  ],
  references: [
    'ISO 1940-1:2003 — Balance quality requirements for rotors in a constant (rigid) state.',
    'ISO 7919-1:1996 — Measurements on rotating shafts and evaluation criteria.',
    'EASA Part-66 Cat. B1/B2 — Module 15 (Gas Turbine) & Module 17 (Propellers).',
    'Vance, J. M. (2010). Machinery Vibration and Rotordynamics. Wiley.',
    'Bently, D. E. & Hatch, C. T. (2002). Fundamentals of Rotating Machinery Diagnostics. ASME.',
  ],
};

export default theoryRotor;
