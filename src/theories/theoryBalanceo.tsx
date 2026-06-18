import { TheoryContent, P, Note, Warn, DefList, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramVectorial } from '../components/TheoryDiagrams';

const IMG = {
  propeller:  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
  maint:      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=900&q=80',
  cessna:     'https://images.unsplash.com/photo-1583470790950-7da77b8e69c1?w=900&q=80',
};

const theoryBalanceo: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.propeller} alt="Hélice de aviación" height={240}
        caption="La hélice debe equilibrarse dinámicamente con el motor en marcha. Una vibración superior a 0.2 in/s puede acortar significativamente la vida del motor y la estructura del fuselaje."/>
      <p style={{ marginBottom: '0.75rem' }}>
        El <strong>balanceo dinámico de hélice</strong> elimina el desequilibrio residual de una hélice instalada <em>in situ</em>, reduciendo las vibraciones transmitidas a la célula. Se realiza con el motor en marcha mediante un analizador de vibraciones y una unidad estroboscópica.
      </p>
      <p>
        El método vectorial de plano único está documentado en el AMM y regulado por EASA Part-66 Module 17 y FAA AC 43.13-1B.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Principio físico: fasor de vibración',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.maint} alt="Técnico de mantenimiento aeronáutico" height={175}
              caption="El técnico coloca el sensor de vibraciones en el motor y el reflector estroboscópico en la hélice para medir amplitud y fase simultáneamente."/>
            <TheoryFigure src={IMG.cessna} alt="Cessna en tierra" height={175}
              caption="El balanceo se realiza siempre a RPM de crucero estabilizada (2000–2300 RPM en aviones de pistón), con el motor a temperatura de operación normal."/>
          </TheoryGrid>
          <P>La vibración generada por el desequilibrio se representa como un <strong>fasor complejo</strong> con amplitud y fase:</P>
          <BlockMath>{'\\vec{V} = A\\,e^{j\\varphi} = A\\angle\\varphi'}</BlockMath>
          <DefList items={[
            { term: 'A', def: 'Amplitud (mm/s pico, in/s, o μm pico-pico)' },
            { term: 'φ', def: 'Fase respecto a la referencia del estroboscopio (°)' },
          ]} />
          <Note>La vibración a 1× es la componente síncrona: la única generada por desequilibrio. Componentes a 2×, 3×, etc., indican otros fallos (desalineamiento, resonancias).</Note>
        </>
      ),
    },
    {
      title: '2. Método de los coeficientes de influencia (1 plano)',
      body: (
        <>
          <P>El método consta de tres carreras de motor:</P>
          <DefList items={[
            { term: 'Carrera 0', def: <>Medición inicial sin masa adicional: <InlineMath>{'\\vec{V}_0 = A_0\\angle\\varphi_0'}</InlineMath></> },
            { term: 'Carrera 1', def: <>Masa de prueba <InlineMath>{'W_t'}</InlineMath> en ángulo <InlineMath>{'\\theta_t'}</InlineMath>. Se mide <InlineMath>{'\\vec{V}_1 = A_1\\angle\\varphi_1'}</InlineMath></> },
            { term: 'Corrección', def: 'Se calcula la masa correctora y su posición, se instala y se verifica.' },
          ]} />
          <P>El <strong>efecto vectorial</strong> de la masa de prueba es la diferencia compleja:</P>
          <BlockMath>{'\\vec{E} = \\vec{V}_1 - \\vec{V}_0'}</BlockMath>
          <P>La <strong>sensibilidad del sistema</strong>:</P>
          <BlockMath>{'S = \\frac{\\vec{E}}{W_t} \\qquad \\left[\\frac{\\text{mm/s}}{\\text{g}}\\right]'}</BlockMath>
          <P>La masa correctora que anula <InlineMath>{'\\vec{V}_0'}</InlineMath>:</P>
          <BlockMath>{'W_c = -\\frac{\\vec{V}_0 \\cdot W_t}{\\vec{E}} \\implies |W_c| = W_t \\cdot \\frac{|\\vec{V}_0|}{|\\vec{E}|} \\qquad \\theta_c = \\theta_t + \\angle\\vec{V}_0 - \\angle\\vec{E} + 180°'}</BlockMath>
          <Warn>La masa de corrección se coloca OPUESTA al desequilibrio (de ahí el +180°).</Warn>
        </>
      ),
    },
    {
      title: '3. Diagrama vectorial',
      body: (
        <>
          <TheorySvg caption="Diagrama vectorial del método de balanceo. V₀ (azul) es la vibración inicial. V₁ (cian) es la vibración con la masa de prueba. E (ámbar) es el efecto de la masa de prueba. Wc (verde) es la masa correctora calculada, opuesta a V₀.">
            <DiagramVectorial />
          </TheorySvg>
          <DefList items={[
            { term: 'V₀ (azul)', def: 'Vibración inicial. Longitud = A₀, ángulo = φ₀. El desequilibrio original está a 180° de φ₀.' },
            { term: 'V₁ (cian)', def: <>Vibración con masa de prueba. El efecto <InlineMath>{'\\vec{E} = \\vec{V}_1 - \\vec{V}_0'}</InlineMath> es el vector entre las puntas.</> },
            { term: 'E (ámbar)', def: <>Efecto de la masa de prueba. Rango óptimo: <InlineMath>{'0.5 \\le |\\vec{E}|/|\\vec{V}_0| \\le 2.0'}</InlineMath></> },
            { term: 'Wc (verde)', def: 'Masa de corrección calculada.' },
          ]} />
          <Note>Si |E| &lt; 15 % de |V₀|, la masa de prueba es insuficiente para el cálculo preciso.</Note>
        </>
      ),
    },
    {
      title: '4. Unidades y límites de vibración',
      body: (
        <>
          <P>Relaciones entre unidades (señal armónica a frecuencia <InlineMath>{'f'}</InlineMath>):</P>
          <BlockMath>{'v_{\\text{pico}} = \\pi f \\cdot d_{\\text{p-p}} \\qquad a_{\\text{pico}} = 2\\pi f \\cdot v_{\\text{pico}}'}</BlockMath>
          <DefList items={[
            { term: '< 0.10 in/s', def: '≈ 2.5 mm/s — Excelente' },
            { term: '0.10–0.20 in/s', def: 'Aceptable' },
            { term: '0.20–0.30 in/s', def: 'Necesita balanceo' },
            { term: '> 0.30 in/s', def: '≈ 7.6 mm/s — Inaceptable, riesgo estructural' },
          ]} />
        </>
      ),
    },
    {
      title: '5. Consideraciones prácticas (AMM / EASA Part-66)',
      body: (
        <>
          <DefList items={[
            { term: 'RPM de balanceo', def: 'Siempre a RPM de crucero estabilizada (2000–2300 RPM). Constante ±5 RPM durante la medición.' },
            { term: 'Temperatura', def: 'Motor a temperatura de operación normal. La dilatación térmica altera las posiciones relativas.' },
            { term: 'Seguridad', def: 'Masa de prueba con tornillo + tuerca + arandela de bloqueo. Inspección visual obligatoria antes de arrancar.' },
            { term: 'Documentación', def: 'Registrar en el logbook: masa añadida, posición y valores antes/después. Exigido por EASA Part-145.' },
            { term: 'Verificación', def: 'Carrera de verificación obligatoria. Si la vibración sube, el ángulo está equivocado (180° de error).' },
          ]} />
        </>
      ),
    },
  ],
  references: [
    'EASA Part-66 Category B1 — Module 17: Propellers.',
    'FAA Advisory Circular AC 43.13-1B — Aircraft Inspection and Repair.',
    'Cessna 172S AMM, Chapter 61-20: Propeller Balancing.',
    'ISO 1940-1:2003 — Balance quality requirements for rotors.',
  ],
};

export default theoryBalanceo;
