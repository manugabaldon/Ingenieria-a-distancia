import { TheoryContent, P, Note, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramISALayers } from '../components/TheoryDiagrams';

const IMG = {
  strato:  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80',
  sky:     'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=900&q=80',
  cockpit: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
};

const theoryISA: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.strato} alt="Tierra desde la estratosfera" height={240}
        caption="Vista de la Tierra desde la estratosfera (~20 km). La delgada capa azul es la troposfera, donde ocurre el 99% de la actividad meteorológica y donde operan la mayoría de aeronaves comerciales."/>
      <p style={{ marginBottom: '0.75rem' }}>
        La <strong>Atmósfera Estándar Internacional</strong> (ISA, ICAO Doc 7488) es un modelo matemático que describe las propiedades medias del aire en función de la altitud. Sirve como referencia universal para calibrar instrumentos, certificar aeronaves y publicar tablas de navegación.
      </p>
      <p>Se basa en la ecuación hidrostática y el modelo de gas ideal.</p>
    </>
  ),
  sections: [
    {
      title: '1. Condiciones ISA en MSL y estructura de capas',
      body: (
        <>
          <TheorySvg caption="Estructura de la atmósfera ISA. La temperatura no decrece linealmente en todas las capas: la tropopausa (11–20 km) es isoterma. Nota cómo a FL350 la temperatura es −54.5 °C, lo que afecta directamente al rendimiento del motor.">
            <DiagramISALayers />
          </TheorySvg>
          <DefList items={[
            { term: 'T₀ = 288.15 K', def: '15 °C — temperatura estándar en el nivel del mar.' },
            { term: 'P₀ = 101 325 Pa', def: '1013.25 hPa — presión estándar en MSL.' },
            { term: 'ρ₀ = 1.225 kg/m³', def: 'Densidad estándar en MSL.' },
            { term: 'a₀ = 340.29 m/s', def: '661.5 kt — velocidad del sonido en MSL ISA.' },
            { term: 'g = 9.80665 m/s²', def: 'Aceleración gravitacional estándar.' },
            { term: 'R = 287.05 J/(kg·K)', def: 'Constante específica del gas (aire seco).' },
          ]} />
          <Table
            headers={['Capa', 'Altitud', 'Gradiente L', 'Temperatura']}
            rows={[
              ['Troposfera', '0 – 11 000 m', '−6.5 K/km', '288.15 → 216.65 K'],
              ['Tropopausa / Baja estratosfera', '11 000 – 20 000 m', '0 (isoterma)', '216.65 K'],
              ['Estratosfera media', '20 000 – 32 000 m', '+1.0 K/km', '216.65 → 228.65 K'],
              ['Estratosfera alta', '32 000 – 47 000 m', '+2.8 K/km', '228.65 → 270.65 K'],
            ]}
          />
        </>
      ),
    },
    {
      title: '2. Derivación de la ecuación barométrica',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.sky} alt="Cielo azul desde la cabina de un avión" height={165}
              caption="A medida que el avión sube, la presión exterior cae exponencialmente. El altímetro barométrico mide esta presión y la convierte en altitud usando la ISA."/>
            <TheoryFigure src={IMG.cockpit} alt="Panel de instrumentos de aeronave" height={165}
              caption="Panel de instrumentos con altímetro (arriba izquierda), velocímetro (arriba centro) y otros instrumentos barométricos. Todos se basan en la ISA."/>
          </TheoryGrid>
          <P>El <strong>equilibrio hidrostático</strong> relaciona la variación de presión con la altitud:</P>
          <BlockMath>{'\\frac{dP}{dh} = -\\rho\\, g \\qquad [\\text{Pa/m}]'}</BlockMath>
          <P>Combinando con la ecuación de gas ideal <InlineMath>{'P = \\rho R T'}</InlineMath>:</P>
          <BlockMath>{'\\frac{dP}{P} = -\\frac{g}{RT}\\,dh'}</BlockMath>
          <P><strong>Troposfera</strong> — temperatura varía linealmente <InlineMath>{'T(h) = T_0 - L\\,h'}</InlineMath>:</P>
          <BlockMath>{'P(h) = P_0 \\left(\\frac{T_0 - L\\,h}{T_0}\\right)^{\\!g/(LR)} = P_0\\left(\\frac{T(h)}{T_0}\\right)^{5.2561}'}</BlockMath>
          <P><strong>Estratosfera isoterma</strong> — <InlineMath>{'T = T_{11} = \\text{const}'}</InlineMath>:</P>
          <BlockMath>{'P(h) = P_{11}\\,\\exp\\!\\left[-\\frac{g\\,(h-11000)}{R\\,T_{11}}\\right] \\qquad P_{11} = 22\\,632\\ \\text{Pa}'}</BlockMath>
        </>
      ),
    },
    {
      title: '3. Densidad y altitud densidad',
      body: (
        <>
          <BlockMath>{'\\rho = \\frac{P}{R\\,T} \\quad [\\text{kg/m}^3] \\qquad \\sigma = \\frac{\\rho}{\\rho_0} \\quad (\\text{densidad relativa})'}</BlockMath>
          <DefList items={[
            { term: 'Sustentación', def: <><InlineMath>{'L = \\tfrac{1}{2}\\rho V^2 S C_L'}</InlineMath> — a igual TAS, L cae proporcionalmente con σ.</> },
            { term: 'Potencia motor', def: 'P ∝ ρ — los motores sin sobrealimentación pierden potencia linealmente con la densidad.' },
          ]} />
          <P>Fórmula aproximada de altitud densidad:</P>
          <BlockMath>{'DA \\approx PA + 120\\cdot(T_{\\text{OAT}} - T_{\\text{ISA}}) \\quad [\\text{ft}] \\qquad T_{\\text{ISA}} = 15 - \\frac{1.98 \\cdot h[\\text{ft}]}{1000}\\ ^\\circ\\text{C}'}</BlockMath>
          <Note>Un aeródromo a 1500 m con OAT = 35 °C (ISA+20) tiene DA ≈ 7000 ft. La distancia de despegue puede aumentar un 30 % respecto a condiciones estándar.</Note>
        </>
      ),
    },
    {
      title: '4. Velocidad del sonido y número de Mach',
      body: (
        <>
          <P>La velocidad del sonido en un gas ideal depende solo de la temperatura:</P>
          <BlockMath>{'a = \\sqrt{\\gamma R T} \\qquad \\gamma = 1.4,\\quad R = 287.05\\ \\text{J/(kg·K)}'}</BlockMath>
          <BlockMath>{'M = \\frac{V_{\\text{TAS}}}{a(h)}'}</BlockMath>
          <Table
            headers={['Altitud', 'T (°C)', 'a (kt)', 'Nota']}
            rows={[
              ['MSL',     '15.0',  '661.5', 'Referencia ISA'],
              ['5 000 ft','5.1',   '650.0', 'Aviación general'],
              ['FL180',   '−20.7', '614.5', 'Transición QNH → QNE'],
              ['FL350',   '−54.5', '573.8', 'Crucero avión comercial'],
            ]}
          />
        </>
      ),
    },
    {
      title: '5. Altímetro barométrico y ajuste QNH / QNE',
      body: (
        <>
          <DefList items={[
            { term: 'QNH', def: 'Presión reducida al MSL. Con QNH ajustado el altímetro indica altitud AMSL. Usado por debajo de la altitud de transición.' },
            { term: 'QFE', def: 'Presión en el aeródromo. El altímetro indica cero en el umbral de pista.' },
            { term: 'QNE (1013.25 hPa)', def: 'Presión estándar ISA. Por encima de la altitud de transición todos usan QNE → Nivel de Vuelo (FL).' },
          ]} />
          <BlockMath>{'FL = \\frac{\\text{indicación altímetro}}{100} \\quad (\\text{con QNE ajustado}) \\qquad FL350 \\approx 10\\,668\\ \\text{m}'}</BlockMath>
        </>
      ),
    },
  ],
  references: [
    'ICAO Doc 7488/3 — Manual of the ICAO Standard Atmosphere (3rd ed., 1993).',
    'Anderson, J. D. (2007). Introduction to Flight (6th ed.). McGraw-Hill.',
    'EASA Part-FCL — ATPL Theoretical Knowledge (MET, ALT).',
  ],
};

export default theoryISA;
