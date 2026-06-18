import { TheoryContent, P, Note, Warn, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramAntenaPattern } from '../components/TheoryDiagrams';

const IMG = {
  antenna:  'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900&q=80',
  aircraft: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  sat:      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80',
};

const theoryAntenna: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.antenna} alt="Array de antenas de comunicaciones" height={240}
        caption="Array de antenas de comunicaciones. En aviación, el fuselaje de la aeronave altera drásticamente el diagrama de radiación de las antenas montadas en él. Por eso los sistemas críticos (TCAS, ADS-B) usan antenas superior e inferior."/>
      <p style={{ marginBottom: '0.75rem' }}>
        Una <strong>antena</strong> convierte energía guiada en ondas electromagnéticas propagadas en espacio libre, y viceversa. En aeronáutica es el elemento crítico de todos los sistemas CNS: VHF, VOR, ILS, GPS, DME, ADS-B, TCAS, SATCOM.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Parámetros fundamentales',
      body: (
        <>
          <TheorySvg caption="Diagrama de radiación polar de una antena directiva. El lóbulo principal concentra la mayor parte de la energía. Los lóbulos laterales (SLL ≈ −13 dB en apertura uniforme) pueden causar interferencias. El HPBW es el ángulo donde la potencia cae a la mitad (−3 dB).">
            <DiagramAntenaPattern />
          </TheorySvg>
          <DefList items={[
            { term: 'Directividad D', def: <>Relación entre la intensidad de radiación máxima y la promedio isotrópica: <InlineMath>{'D = 4\\pi U_{\\max}/P_{\\text{rad}}'}</InlineMath></> },
            { term: 'Eficiencia η', def: <>Fracción de potencia que se radia: <InlineMath>{'\\eta = P_{\\text{rad}}/P_{\\text{in}} \\in (0,1)'}</InlineMath></> },
            { term: 'Ganancia G', def: <><InlineMath>{'G = \\eta \\cdot D'}</InlineMath> — parámetro de diseño más usado. Se mide en dBi.</> },
            { term: 'Apertura efectiva Aₑ', def: <><InlineMath>{'A_e = G\\lambda^2/(4\\pi)'}</InlineMath> — área equivalente de captura.</> },
            { term: 'HPBW', def: <>Half-Power Beamwidth: <InlineMath>{'\\theta_{\\text{HPBW}} \\approx 70°\\cdot\\lambda/D'}</InlineMath> para apertura circular.</> },
          ]} />
        </>
      ),
    },
    {
      title: '2. Relación ganancia-apertura',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.aircraft} alt="Cockpit de aeronave" height={165}
              caption="Las antenas VHF (monopolo λ/4) se integran en el fuselaje inferior. La frecuencia de operación (118–137 MHz) determina la longitud física: λ/4 ≈ 55 cm a 136 MHz."/>
            <TheoryFigure src={IMG.sat} alt="Vista desde la estratosfera" height={165}
              caption="Las antenas SATCOM deben apuntar al satélite con alta ganancia (33–38 dBi). Los sistemas modernos usan phased arrays planos que se orientan electrónicamente sin partes mecánicas."/>
          </TheoryGrid>
          <P>Para apertura física <InlineMath>{'A'}</InlineMath> con iluminación uniforme:</P>
          <BlockMath>{'G_{\\max} = \\frac{4\\pi A}{\\lambda^2}'}</BlockMath>
          <P>Con eficiencia de apertura <InlineMath>{'\\eta_a \\in [0.55, 0.75]'}</InlineMath> para paraboloides:</P>
          <BlockMath>{'G = \\eta_a \\cdot \\frac{4\\pi A}{\\lambda^2} \\qquad \\xrightarrow{\\text{paraboloide diam. }D} \\qquad G \\approx \\eta_a \\left(\\frac{\\pi D}{\\lambda}\\right)^2'}</BlockMath>
          <Table
            headers={['Diámetro', 'Frecuencia', 'G (dBi)', 'HPBW', 'Aplicación']}
            rows={[
              ['30 cm', '9.4 GHz (X)', '31', '3.6°', 'Radar meteorológico ligero'],
              ['1 m',   '9.4 GHz (X)', '40', '1.1°', 'Radar de navegación costera'],
              ['8 m',   '1.3 GHz (L)', '40', '2.1°', 'Radar ATC long-range'],
            ]}
          />
        </>
      ),
    },
    {
      title: '3. Ecuación de transmisión de Friis',
      body: (
        <>
          <BlockMath>{'P_r = P_t \\cdot G_t \\cdot G_r \\cdot \\left(\\frac{\\lambda}{4\\pi d}\\right)^2'}</BlockMath>
          <P>La <strong>atenuación en espacio libre</strong> (FSPL):</P>
          <BlockMath>{'FSPL[\\text{dB}] = 20\\log d[\\text{km}] + 20\\log f[\\text{GHz}] + 92.44'}</BlockMath>
          <P>En decibelios (forma de ingeniería):</P>
          <BlockMath>{'P_r[\\text{dBm}] = P_t[\\text{dBm}] + G_t[\\text{dBi}] + G_r[\\text{dBi}] - FSPL[\\text{dB}] - L_{\\text{misc}}[\\text{dB}]'}</BlockMath>
          <Note>Asume espacio libre. En aviación real se añaden: pérdidas por lluvia (Ku: hasta 10 dB/km), multitrayecto, desvanecimiento.</Note>
        </>
      ),
    },
    {
      title: '4. Antenas aeronáuticas',
      body: (
        <>
          <Table
            headers={['Sistema', 'Frecuencia', 'Tipo de antena', 'G típica']}
            rows={[
              ['VHF Comm', '118–137 MHz', 'Monopolo λ/4', '0 dBi'],
              ['VOR/LOC', '108–118 MHz', 'Dipolo en V-tail', '2 dBi'],
              ['GPS L1', '1575.42 MHz', 'Patch microstrip circular', '3–5 dBi'],
              ['ADS-B', '1030/1090 MHz', 'Monopolo omnidireccional', '0 dBi'],
              ['TCAS', '1030/1090 MHz', 'Array 4 elementos', '6–9 dBi'],
              ['SATCOM Ku', '10.7–14.5 GHz', 'Paraboloide / phased array', '33–38 dBi'],
            ]}
          />
          <Warn>Las antenas del fuselaje experimentan variaciones de ganancia de hasta ±20 dB según la actitud de vuelo. Por eso los sistemas críticos (TCAS, ADS-B) usan antenas superior e inferior.</Warn>
        </>
      ),
    },
    {
      title: '5. Phased Array y antenas AESA',
      body: (
        <>
          <P>Un <strong>array de fase activo</strong> (AESA) controla electrónicamente la dirección del lóbulo con <InlineMath>{'N'}</InlineMath> elementos y desfasadores programables:</P>
          <BlockMath>{'\\sin\\theta = \\frac{\\lambda\\,\\Delta\\varphi}{2\\pi d} \\qquad (d = \\lambda/2)'}</BlockMath>
          <BlockMath>{'G_{\\text{array}} \\approx N \\cdot G_{\\text{elemento}} \\qquad \\theta_{\\text{HPBW,array}} \\approx \\frac{\\theta_{\\text{HPBW,elemento}}}{\\sqrt{N}}'}</BlockMath>
          <Note>Un array AESA de 64×64 elementos barre ±60° en microsegundos. Usado en F-22, F-35, radar GBAS y sistemas EW modernos.</Note>
        </>
      ),
    },
  ],
  references: [
    'Balanis, C. A. (2016). Antenna Theory: Analysis and Design (4th ed.). Wiley.',
    'Friis, H. T. (1946). A note on a simple transmission formula. Proc. IRE, 34(5), 254–256.',
    'ICAO Annex 10, Vol. I — Radionavigation Aids.',
    'Pozar, D. M. (2011). Microwave Engineering (4th ed.). Wiley.',
  ],
};

export default theoryAntenna;
