import { TheoryContent, P, Note, Warn, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramRadarGeometry } from '../components/TheoryDiagrams';

const IMG = {
  radar:   'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  atc:     'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900&q=80',
  antenna: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900&q=80',
};

const theoryRadar: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.radar} alt="Torre de control con radar" height={240}
        caption="Radar primario de vigilancia (PSR) en un aeropuerto. La antena rotatoria barre 360° cada 4–12 segundos. El alcance típico de un radar ATC moderno (como el ASR-11) es de 60 NM para aeronaves con RCS estándar."/>
      <p style={{ marginBottom: '0.75rem' }}>
        La <strong>ecuación del radar</strong> vincula las características del sistema (potencia, ganancia, frecuencia) con las del blanco (RCS) y del receptor (sensibilidad mínima) para determinar el <em>alcance máximo de detección</em>.
      </p>
    </>
  ),
  sections: [
    {
      title: '1. Propagación esférica y densidad de potencia',
      body: (
        <>
          <TheorySvg caption="Geometría de la ecuación del radar. La potencia transmitida se propaga esféricamente hasta el blanco (R⁴ en total: ida y vuelta). La antena receptora capta la pequeñísima fracción reflejada por la RCS del blanco.">
            <DiagramRadarGeometry />
          </TheorySvg>
          <P>Una antena isotrópica (<InlineMath>{'G = 1'}</InlineMath>) irradia potencia <InlineMath>{'P_t'}</InlineMath> sobre una esfera de radio <InlineMath>{'R'}</InlineMath>:</P>
          <BlockMath>{'S_{\\text{iso}} = \\frac{P_t}{4\\pi R^2} \\qquad [\\text{W/m}^2]'}</BlockMath>
          <P>Una antena real de ganancia <InlineMath>{'G'}</InlineMath> concentra la energía:</P>
          <BlockMath>{'S_{\\text{blanco}} = \\frac{P_t \\cdot G}{4\\pi R^2}'}</BlockMath>
          <Note>La ganancia G no crea energía, solo la redistribuye. Una antena parabólica de 1 m a 9.4 GHz tiene G ≈ 10 000 (40 dBi).</Note>
        </>
      ),
    },
    {
      title: '2. Sección eficaz radar (RCS, σ)',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.atc} alt="Antenas de comunicaciones" height={170}
              caption="Las antenas del sistema ATC transmiten y reciben en distintas frecuencias. El radar primario usa tipicamente banda L (1–2 GHz) o S (2–4 GHz)."/>
            <TheoryFigure src={IMG.radar} alt="Radar de vigilancia" height={170}
              caption="La RCS de un avión varía hasta 30 dB según el ángulo de aspecto. Un B737 frontalmente puede tener σ ≈ 10 m², mientras que de costado σ ≈ 40 m²."/>
          </TheoryGrid>
          <BlockMath>{'\\sigma = \\lim_{R \\to \\infty} \\left[ 4\\pi R^2 \\cdot \\frac{|E_s|^2}{|E_i|^2} \\right] \\qquad [\\text{m}^2]'}</BlockMath>
          <DefList items={[
            { term: 'σ ≈ 0.005 m²', def: 'Dron pequeño (DJI Mavic)' },
            { term: 'σ ≈ 0.003 m²', def: 'Aeronave furtiva (F-117A)' },
            { term: 'σ ≈ 2–5 m²', def: 'Caza convencional (F-16)' },
            { term: 'σ ≈ 40 m²', def: 'Avión de transporte (B737)' },
          ]} />
          <Warn>El RCS varía hasta 30 dB según el ángulo de aspecto, frecuencia y polarización.</Warn>
        </>
      ),
    },
    {
      title: '3. Ecuación del radar completa y alcance máximo',
      body: (
        <>
          <P>La potencia recibida con apertura efectiva <InlineMath>{'A_e = G\\lambda^2/(4\\pi)'}</InlineMath>:</P>
          <BlockMath>{'P_r = \\frac{P_t \\, G^2 \\, \\lambda^2 \\, \\sigma}{(4\\pi)^3 \\, R^4}'}</BlockMath>
          <P>Despejando el <strong>alcance máximo</strong> cuando <InlineMath>{'P_r = S_{\\min}'}</InlineMath>:</P>
          <BlockMath>{'R_{\\max} = \\sqrt[4]{\\frac{P_t \\, G^2 \\, \\lambda^2 \\, \\sigma}{(4\\pi)^3 \\, S_{\\min}}}'}</BlockMath>
          <P>Forma logarítmica (diseño en dB):</P>
          <BlockMath>{'R_{\\max}[\\text{dBm}] = \\tfrac{1}{4}\\Big[P_t[\\text{dBW}] + 2G[\\text{dBi}] + 20\\log\\lambda + \\sigma[\\text{dBm}^2] - 33 - S_{\\min}[\\text{dBW}]\\Big]'}</BlockMath>
          <Note>La dependencia <InlineMath>{'R^4'}</InlineMath> es característica del radar: duplicar el alcance requiere multiplicar la potencia por 16× (12 dB).</Note>
        </>
      ),
    },
    {
      title: '4. Sensibilidad del receptor y ruido térmico',
      body: (
        <>
          <P>La sensibilidad está limitada por el <strong>ruido térmico</strong> de Johnson-Nyquist:</P>
          <BlockMath>{'P_n = k_B \\cdot T_{\\text{sys}} \\cdot B \\qquad k_B = 1.38 \\times 10^{-23}\\ \\text{J/K}'}</BlockMath>
          <BlockMath>{'S_{\\min} = k_B \\cdot T_0 \\cdot B \\cdot F \\cdot SNR_{\\min} \\qquad T_0 = 290\\ \\text{K}'}</BlockMath>
          <Table
            headers={['S_min típica', 'Aplicación']}
            rows={[
              ['−110 a −120 dBm', 'Radar ATC primario (ASR-11)'],
              ['−100 a −110 dBm', 'Radar meteorológico (WSR-88D)'],
              ['−90 a −100 dBm', 'Radar de aproximación (PAR)'],
              ['−130 dBm', 'Receptor GPS (C/A code)'],
            ]}
          />
        </>
      ),
    },
    {
      title: '5. Pérdidas del sistema y factor de detección',
      body: (
        <>
          <BlockMath>{'R_{\\max} = \\sqrt[4]{\\frac{P_t \\, G^2 \\, \\lambda^2 \\, \\sigma}{(4\\pi)^3 \\, k_B T_0 B F \\cdot SNR_{\\min} \\cdot L_s}}'}</BlockMath>
          <DefList items={[
            { term: 'L_s', def: 'Pérdidas del sistema (cables, conectores, lóbulos laterales): típico 3–10 dB.' },
            { term: 'SNR_min', def: <>Para <InlineMath>{'P_D = 0.9,\\ P_{FA} = 10^{-6}'}</InlineMath>: SNR_min ≈ 13 dB.</> },
            { term: 'Pd', def: 'Probabilidad de detección — objetivo típico: 90 %.' },
            { term: 'Pfa', def: <>Probabilidad de falsa alarma — objetivo típico: <InlineMath>{'10^{-6}'}</InlineMath>.</> },
          ]} />
        </>
      ),
    },
  ],
  references: [
    'Skolnik, M. I. (2001). Introduction to Radar Systems (3rd ed.). McGraw-Hill.',
    'Richards, M. A. et al. (2010). Principles of Modern Radar. SciTech Publishing.',
    'ICAO Doc 9684 — Manual on Secondary Surveillance Radar (SSR) Systems.',
  ],
};

export default theoryRadar;
