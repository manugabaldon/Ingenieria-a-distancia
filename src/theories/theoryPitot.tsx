import { TheoryContent, P, Note, Warn, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramPitotSystem, DiagramSpeedChain } from '../components/TheoryDiagrams';

const IMG = {
  cockpit:  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  aircraft: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=900&q=80',
  sky:      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80',
};

const theoryPitot: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.cockpit} alt="Cockpit con instrumentos barométricos" height={240}
        caption="Panel de instrumentos de vuelo. El velocímetro (airspeed indicator), el altímetro y el variométro son todos instrumentos barométricos que se alimentan del sistema Pitot-estático. Si el sistema falla, el piloto pierde tres instrumentos críticos simultáneamente."/>
      <p style={{ marginBottom: '0.75rem' }}>
        El <strong>sistema Pitot-estático</strong> determina velocidades aerodinámicas (IAS, CAS, TAS, EAS), altitud barométrica y velocidad vertical. Su fallo ha causado accidentes mortales (Air France 447, 2009).
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Presiones fundamentales y el tubo de Pitot',
      body: (
        <>
          <TheorySvg caption="Esquema del sistema Pitot-estático. El tubo de Pitot mide la presión total (estática + dinámica). Las tomas estáticas miden solo la presión del aire en reposo. La diferencia qc = Pt − Ps es la presión de impacto que permite calcular la velocidad.">
            <DiagramPitotSystem />
          </TheorySvg>
          <DefList items={[
            { term: 'P_total (Pt)', def: 'Presión de remanso — donde el flujo se detiene isentrópicamente. Incluye presión estática + dinámica.' },
            { term: 'P_estática (Ps)', def: 'Presión del aire en reposo, medida en tomas laterales.' },
            { term: 'q_c = Pt − Ps', def: 'Presión de impacto — base de todos los cálculos de velocidad.' },
          ]} />
          <P>Para flujo <strong>incompresible</strong> (<InlineMath>{'M < 0.3'}</InlineMath>), Bernoulli da:</P>
          <BlockMath>{'q = \\tfrac{1}{2}\\rho V^2 \\implies V = \\sqrt{\\frac{2q}{\\rho}} \\qquad [\\text{m/s}]'}</BlockMath>
          <Note>A baja velocidad (&lt;100 kt) la corrección de compresibilidad es &lt;0.5 %. A 300 kt el error supera el 4 %.</Note>
        </>
      ),
    },
    {
      title: '2. Flujo compresible — ecuación de Rayleigh',
      body: (
        <>
          <P>Para flujo compresible subsónico, la relación entre presiones total y estática:</P>
          <BlockMath>{'\\frac{P_t}{P_s} = \\left(1 + \\frac{\\gamma-1}{2}M^2\\right)^{\\!\\gamma/(\\gamma-1)} = \\left(1 + 0.2\\,M^2\\right)^{3.5}'}</BlockMath>
          <P>CAS a partir de <InlineMath>{'q_c'}</InlineMath>, usando condiciones ISA a nivel del mar:</P>
          <BlockMath>{'V_{\\text{CAS}} = \\sqrt{\\frac{7P_0}{\\rho_0}\\left[\\left(\\frac{q_c}{P_0}+1\\right)^{\\!2/7}-1\\right]}'}</BlockMath>
          <Note>Esta ecuación usa siempre <InlineMath>{'\\rho_0'}</InlineMath> y <InlineMath>{'P_0'}</InlineMath> (nivel del mar ISA). El instrumento no conoce la altitud real, de ahí la diferencia CAS vs. TAS.</Note>
        </>
      ),
    },
    {
      title: '3. IAS, CAS, EAS, TAS — la cadena de conversión',
      body: (
        <>
          <TheorySvg caption="Cadena de conversión de velocidades. Cada paso aplica una corrección física diferente. La TAS (True Airspeed) es la única que refleja la velocidad real del avión respecto a la masa de aire.">
            <DiagramSpeedChain />
          </TheorySvg>
          <DefList items={[
            { term: 'IAS', def: 'Indicated Airspeed — lectura directa del anemómetro. Incluye errores de posición e instrumentales.' },
            { term: 'CAS', def: 'Calibrated Airspeed — IAS corregida por errores de posición. Estándar para límites estructurales (VNE, VFE).' },
            { term: 'EAS', def: <>Equivalent Airspeed: <InlineMath>{'EAS = TAS \\cdot \\sqrt{\\sigma}'}</InlineMath>. Relevante para cargas aerodinámicas estructurales.</> },
            { term: 'TAS', def: <>True Airspeed — velocidad real respecto a la masa de aire: <InlineMath>{'TAS = EAS / \\sqrt{\\sigma}'}</InlineMath>. Usada en navegación.</> },
          ]} />
          <P>Conversión CAS → TAS (corrección exacta compresible):</P>
          <BlockMath>{'TAS = \\sqrt{\\frac{5P}{\\rho}\\left[\\left(\\frac{q_c}{P}+1\\right)^{\\!2/7}-1\\right]}'}</BlockMath>
          <Warn>En FL350 la diferencia TAS/CAS supera el 80 %. Un B737 a 460 kt TAS indica solo ~250 kt CAS. Confundirlas es error grave de navegación.</Warn>
        </>
      ),
    },
    {
      title: '4. Número de Mach',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.aircraft} alt="Avión en vuelo" height={165}
              caption="Los aviones comerciales cruzan a M0.78–0.85. El MMO (Mach máximo operacional) está marcado en el velocímetro como línea roja en la escala de Mach."/>
            <TheoryFigure src={IMG.sky} alt="Tierra desde altura" height={165}
              caption="A FL350 la velocidad del sonido es solo 573 kt (vs 661 kt en MSL). Por eso el mismo TAS corresponde a un número de Mach mayor a alta altitud."/>
          </TheoryGrid>
          <BlockMath>{'M = \\frac{V_{\\text{TAS}}}{a(h)} \\qquad a = \\sqrt{\\gamma R T} = \\sqrt{1.4 \\times 287 \\times T}'}</BlockMath>
          <BlockMath>{'M = \\sqrt{5\\left[\\left(\\frac{q_c}{P_s}+1\\right)^{\\!2/7}-1\\right]}'}</BlockMath>
          <Table
            headers={['Régimen', 'Mach', 'Efecto aerodinámico']}
            rows={[
              ['Subsónico', '< 0.75', 'Sin ondas de choque. Coeficientes estables.'],
              ['Transsónico', '0.75–1.2', 'Ondas de choque locales. CD aumenta bruscamente.'],
              ['Supersónico', '> 1.2', 'Ondas de choque adjuntas. Cambio de trim.'],
            ]}
          />
        </>
      ),
    },
    {
      title: '5. Errores y fallos del sistema',
      body: (
        <>
          <Table
            headers={['Error', 'Fuente', 'Efecto', 'Corrección']}
            rows={[
              ['Posición', 'Tomas estáticas en zona de presión alterada', 'IAS ≠ CAS (±5 kt)', 'Tablas PEC del POH'],
              ['Hielo', 'Obstrucción del tubo o tomas estáticas', 'Indicación errática o fija', 'Calefacción pitot'],
              ['Compresibilidad', 'Uso de ρ₀ en lugar de ρ real', 'CAS > TAS en altitud', 'Corrección ISA (ADC)'],
              ['Lag dinámico', 'Volumen muerto del sistema de tuberías', 'Retraso en variaciones rápidas', 'ADC digital'],
            ]}
          />
          <Warn>Accidente AF447 (2009): los tres tubos de Pitot se obstruyeron por cristales de hielo a FL350 → pérdida del control. 228 fallecidos. Resultado: obligatoriedad de tubos Goodrich 0851HL en A330/A340.</Warn>
        </>
      ),
    },
  ],
  references: [
    'ICAO Doc 7488/3 — Manual of the ICAO Standard Atmosphere (3rd ed., 1993).',
    'Anderson, J. D. (2007). Introduction to Flight (6th ed.). McGraw-Hill.',
    'BEA (2012). Final Report — Air France Flight 447.',
    'Gracey, W. (1980). Measurement of Aircraft Speed and Altitude. NASA RP-1046.',
  ],
};

export default theoryPitot;
