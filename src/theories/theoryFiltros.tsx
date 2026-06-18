import { TheoryContent, P, Note, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramRC, DiagramBode, DiagramRLC } from '../components/TheoryDiagrams';

const IMG = {
  pcb:      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  avionics: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  circuit:  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
};

const theoryFiltros: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.pcb} alt="Placa de circuito impreso aviónica" height={240}
        caption="Placa de aviónica con circuitos de filtrado. Los filtros de señal son omnipresentes en la electrónica aeronáutica: desde el acondicionamiento de señales de sensores de presión hasta la separación de canales en los buses de datos ARINC 429."/>
      <p style={{ marginBottom: '0.75rem' }}>
        Los <strong>filtros electrónicos</strong> modifican selectivamente el espectro de frecuencia de una señal. En aviónica son imprescindibles para acondicionar señales de sensores, desacoplar buses de datos (ARINC 429) y proteger receptores de interferencias.
      </p>
      <p>
        El análisis se realiza mediante la función de transferencia <InlineMath>{'H(j\\omega)'}</InlineMath> y su representación en el <strong>diagrama de Bode</strong>.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Función de transferencia y dominio de Laplace',
      body: (
        <>
          <P>La función de transferencia es el cociente entre la transformada de Laplace de salida y entrada (condiciones iniciales nulas):</P>
          <BlockMath>{'H(s) = \\frac{Y(s)}{X(s)} \\qquad s = \\sigma + j\\omega'}</BlockMath>
          <P>En estado estacionario sinusoidal (<InlineMath>{'s = j\\omega'}</InlineMath>):</P>
          <BlockMath>{'H(j\\omega) = |H(j\\omega)|\\, e^{\\,j\\angle H(j\\omega)}'}</BlockMath>
          <Note>El diagrama de Bode representa <InlineMath>{'20\\log|H(j\\omega)|'}</InlineMath> (dB) y <InlineMath>{'\\angle H(j\\omega)'}</InlineMath> (°) en escala logarítmica de frecuencia. Permite visualizar el comportamiento en varias décadas.</Note>
        </>
      ),
    },
    {
      title: '2. Filtro RC de paso bajo',
      body: (
        <>
          <TheoryGrid>
            <TheorySvg caption="Circuito RC paso bajo. La resistencia limita la corriente y el condensador actúa como cortocircuito a alta frecuencia.">
              <DiagramRC />
            </TheorySvg>
            <TheorySvg caption="Diagrama de Bode del filtro RC. La curva azul es la respuesta real. Las líneas ámbar son las asíntotas. El punto rojo marca fc (−3 dB).">
              <DiagramBode />
            </TheorySvg>
          </TheoryGrid>
          <BlockMath>{'H(s) = \\frac{1}{1 + sRC} = \\frac{1}{1 + s/\\omega_c} \\qquad \\omega_c = \\frac{1}{RC},\\quad f_c = \\frac{1}{2\\pi RC}'}</BlockMath>
          <P>Módulo y fase:</P>
          <BlockMath>{'|H(j\\omega)| = \\frac{1}{\\sqrt{1+(\\omega/\\omega_c)^2}} \\qquad \\angle H(j\\omega) = -\\arctan\\!\\left(\\frac{\\omega}{\\omega_c}\\right)'}</BlockMath>
          <P>En <InlineMath>{'f = f_c'}</InlineMath>: <InlineMath>{'|H| = 1/\\sqrt{2} \\approx -3\\text{ dB}'}</InlineMath>, <InlineMath>{'\\angle H = -45°'}</InlineMath>. Pendiente asintótica: <strong>−20 dB/década</strong>.</P>
          <P>Respuesta al escalón — tiempo de subida:</P>
          <BlockMath>{'v(t) = V_{\\text{in}}\\left(1 - e^{-t/\\tau}\\right) \\quad \\tau = RC \\qquad t_r\\,(10\\%\\!\\to\\!90\\%) = 2.2\\,\\tau'}</BlockMath>
        </>
      ),
    },
    {
      title: '3. Filtro RC de paso alto',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.avionics} alt="Rack de aviónica" height={165}
              caption="Rack de equipos de aviónica. Cada tarjeta incluye filtros de paso alto en sus entradas de audio para eliminar el DC y aislar las etapas amplificadoras."/>
            <TheoryFigure src={IMG.pcb} alt="PCB de aviónica" height={165}
              caption="Detalle de PCB. Los condensadores de acoplamiento AC (filtro paso alto) son los componentes cilíndricos azules. Eliminan el nivel DC entre etapas."/>
          </TheoryGrid>
          <BlockMath>{'H(s) = \\frac{sRC}{1+sRC} \\qquad |H(j\\omega)| = \\frac{\\omega/\\omega_c}{\\sqrt{1+(\\omega/\\omega_c)^2}} \\qquad \\angle H = 90° - \\arctan\\!\\left(\\frac{\\omega}{\\omega_c}\\right)'}</BlockMath>
          <P>Pendiente asintótica: <strong>+20 dB/década</strong> para <InlineMath>{'f < f_c'}</InlineMath>. Uso: eliminación de DC en señales de audio, acoplamiento AC entre etapas.</P>
        </>
      ),
    },
    {
      title: '4. Filtro RLC de segundo orden',
      body: (
        <>
          <TheorySvg caption="Circuito RLC en serie. La inductancia L añade un polo complejo conjugado que permite selectividad mucho mayor. El factor de calidad Q determina la forma del pico de resonancia.">
            <DiagramRLC />
          </TheorySvg>
          <P>La función de transferencia genérica de 2.º orden (paso bajo):</P>
          <BlockMath>{'H(s) = \\frac{\\omega_0^2}{s^2 + (\\omega_0/Q)\\,s + \\omega_0^2} \\qquad \\omega_0 = \\frac{1}{\\sqrt{LC}},\\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}'}</BlockMath>
          <DefList items={[
            { term: 'Q = 1/√2 ≈ 0.707', def: 'Filtro Butterworth 2.º orden — respuesta maximalmente plana.' },
            { term: 'Q > 1/√2', def: 'Sistema subamortiguado — pico de resonancia en la respuesta.' },
            { term: 'Q = 0.5', def: 'Amortiguamiento crítico — sin sobreoscilación.' },
          ]} />
          <P>Pendiente de 2.º orden: <strong>−40 dB/década</strong>. Para <InlineMath>{'n'}</InlineMath> etapas en cascada: <InlineMath>{'-40n'}</InlineMath> dB/década.</P>
          <Note>Un filtro Butterworth de 8.º orden tiene −160 dB/década en la banda de rechazo.</Note>
        </>
      ),
    },
    {
      title: '5. Aproximaciones clásicas de filtros',
      body: (
        <>
          <Table
            headers={['Tipo', 'Característica', 'Ventaja', 'Inconveniente']}
            rows={[
              ['Butterworth', 'Máximamente plana en paso', 'Sin rizado, monótona', 'Transición más lenta'],
              ['Chebyshev I', 'Rizado equirizado en paso', 'Transición más rápida', 'Rizado en banda de paso'],
              ['Bessel', 'Retardo de grupo plano', 'Mínima distorsión de fase', 'Transición muy lenta'],
              ['Elíptico (Cauer)', 'Rizado en ambas bandas', 'Transición óptima', 'Ceros finitos de transmisión'],
            ]}
          />
          <P>En aviónica se prefieren filtros <strong>Bessel</strong> para audio y datos síncronos y <strong>Chebyshev/Elíptico</strong> para separación de bandas en RF.</P>
        </>
      ),
    },
    {
      title: '6. Buses de datos y filtros ARINC 429',
      body: (
        <>
          <P>ARINC 429 opera a 12.5 kbps (LS) o 100 kbps (HS) con codificación BPRZ:</P>
          <BlockMath>{'BW_{\\text{esencial}} \\approx 0.9\\,f_{\\text{bit}} \\implies \\begin{cases} 11.25\\text{ kHz} & (\\text{LS}) \\\\ 90\\text{ kHz} & (\\text{HS}) \\end{cases}'}</BlockMath>
          <DefList items={[
            { term: 'Paso: DC – f_Nyq', def: 'Dejar pasar los armónicos del reloj sin distorsión de fase.' },
            { term: 'Rechazo: > 2·f_bit', def: 'Atenuar interferencias EMI de otros buses.' },
            { term: 'Impedancia', def: 'Carga mínima de 8 kΩ (hasta 20 fuentes por bus).' },
          ]} />
          <Note>DO-178C / DO-254 exigen que los filtros de buses críticos sean verificables con herramientas de análisis formal. Tolerancias de componentes: ±1 % o mejor.</Note>
        </>
      ),
    },
  ],
  references: [
    'Williams, A. B. & Taylor, F. J. (2006). Electronic Filter Design Handbook (4th ed.). McGraw-Hill.',
    'ARINC Specification 429 Part 1-17 (2004). ARINC, Annapolis.',
    'RTCA DO-160G (2010). Environmental Conditions and Test Procedures for Airborne Equipment.',
    'Pozar, D. M. (2011). Microwave Engineering (4th ed.). Wiley.',
  ],
};

export default theoryFiltros;
