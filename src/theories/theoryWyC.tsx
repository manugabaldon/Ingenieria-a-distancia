import { TheoryContent, P, Note, Warn, DefList, Table, TheoryFigure, TheoryGrid, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramCGEnvelope } from '../components/TheoryDiagrams';

const IMG = {
  cessna:   'https://images.unsplash.com/photo-1583470790950-7da77b8e69c1?w=900&q=80',
  loading:  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  cockpit:  'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=900&q=80',
};

const theoryWyC: TheoryContent = {
  intro: (
    <>
      <TheoryFigure src={IMG.cessna} alt="Cessna 172 en vuelo" height={240}
        caption="Cessna 172S — el avión de entrenamiento más popular del mundo. El cálculo de W&B es obligatorio antes de cada vuelo. Con un CG demasiado retrasado, el avión puede volverse incontrolable."/>
      <p style={{ marginBottom: '0.75rem' }}>
        El cálculo de <strong>Peso y Centrado</strong> (Weight &amp; Balance) determina si la aeronave puede operar de forma segura dentro de los límites estructurales y aerodinámicos certificados. Un CG fuera de envolvente puede hacer la aeronave incontrolable.
      </p>
      <p>Obligatorio por EASA Reg. (EU) 965/2012 y EASA Part-FCL.</p>
    </>
  ),
  sections: [
    {
      title: '1. Principios físicos: momento y centro de gravedad',
      body: (
        <>
          <P>El <strong>momento</strong> de una carga respecto al datum del fabricante:</P>
          <BlockMath>{'M_i = W_i \\cdot d_i \\qquad [\\text{lb·in} \\text{ ó } \\text{kg·m}]'}</BlockMath>
          <P>El <strong>centro de gravedad</strong> es el cociente entre el momento total y el peso total:</P>
          <BlockMath>{'CG = \\frac{\\displaystyle\\sum_i W_i\\, d_i}{\\displaystyle\\sum_i W_i} = \\frac{M_{\\text{total}}}{W_{\\text{total}}} \\qquad [\\text{in ó m}]'}</BlockMath>
          <Note>El datum es un plano de referencia arbitrario definido por el fabricante. En la Cessna 172S es la cara delantera del firewall. Todos los brazos se miden a partir de él.</Note>
        </>
      ),
    },
    {
      title: '2. Porcentaje de MAC (% MAC)',
      body: (
        <>
          <TheoryGrid>
            <TheoryFigure src={IMG.cockpit} alt="Cielo desde cabina" height={165}
              caption="El piloto verifica el W&B antes del vuelo consultando la tabla del POH. El cálculo debe hacerse tanto al despegue como con depósitos vacíos."/>
            <TheoryFigure src={IMG.loading} alt="Carga de aeronave" height={165}
              caption="La distribución de la carga (pasajeros, equipaje, combustible) determina la posición del CG. El piloto debe calcularla antes de cada vuelo."/>
          </TheoryGrid>
          <P>La <strong>Cuerda Media Aerodinámica</strong> (MAC) normaliza el CG respecto al tamaño del ala:</P>
          <BlockMath>{'\\% MAC = \\frac{CG - LEMAC}{MAC} \\times 100'}</BlockMath>
          <P>Para la Cessna 172S:</P>
          <BlockMath>{'MAC = 59.5\\ \\text{in} \\qquad LEMAC = 35.0\\ \\text{in} \\qquad CG \\in [35.0,\\ 47.3]\\ \\text{in}'}</BlockMath>
        </>
      ),
    },
    {
      title: '3. La envolvente de vuelo (CG envelope)',
      body: (
        <>
          <TheorySvg caption="Envolvente CG de la Cessna 172S. El área azul sombreada es la zona segura de operación. El punto verde indica un ejemplo de carga dentro de los límites. A pesos bajos el rango de CG permitido es mayor.">
            <DiagramCGEnvelope />
          </TheorySvg>
          <Warn>CG adelantado: carga excesiva en estabilizador, imposibilidad de elevar el morro. CG retrasado: inestabilidad estática, entrada en barrena espontánea.</Warn>
          <DefList items={[
            { term: 'CG límite adelantado', def: 'Determinado por la carga máxima en el estabilizador de cola (momento nose-down máximo).' },
            { term: 'CG límite retrasado', def: 'Determinado por el margen de estabilidad estática mínimo requerido.' },
          ]} />
        </>
      ),
    },
    {
      title: '4. Estaciones de carga — Cessna 172S',
      body: (
        <>
          <Table
            headers={['Estación', 'Brazo (in)', 'Máximo', 'Nota']}
            rows={[
              ['Avión vacío (EWCG)', '~85', '—', 'Del certificado de pesaje'],
              ['Piloto / Copiloto', '80.5', '400 lb', 'Asiento delantero'],
              ['Pasajeros traseros', '118.1', '400 lb', 'Asiento trasero'],
              ['Combustible Avgas', '75.0', '53 US gal (318 lb)', '6 lb/gal; tanques en alas'],
              ['Equipaje', '142.8', '120 lb', 'Compartimento posterior'],
            ]}
          />
          <P>Variación del CG por consumo de combustible:</P>
          <BlockMath>{'CG_{\\text{final}} = \\frac{M_{\\text{total}} - M_{\\text{fuel}}}{W_{\\text{total}} - W_{\\text{fuel}}}'}</BlockMath>
          <Note>El combustible (brazo 75.0 in) es el más corto. Consumirlo mueve el CG hacia atrás. Verificar que el CG sea válido tanto al despegue como con depósitos vacíos.</Note>
        </>
      ),
    },
    {
      title: '5. Categorías de peso',
      body: (
        <>
          <DefList items={[
            { term: 'MTOW', def: 'Maximum Take-Off Weight — peso máximo certificado para el despegue.' },
            { term: 'MLW', def: 'Maximum Landing Weight — puede ser menor que MTOW en aviones grandes. En C172S, MLW = MTOW.' },
            { term: 'MZFW', def: <>Maximum Zero Fuel Weight — peso máximo sin combustible en tanques. Protege el ala de flexión: <InlineMath>{'M_{\\text{ala}} \\propto W_{\\text{fuel}}'}</InlineMath>.</> },
            { term: 'OEW', def: 'Operating Empty Weight = avión vacío + tripulación + equipamiento operacional.' },
          ]} />
        </>
      ),
    },
  ],
  references: [
    'Cessna 172S POH — Section 6: Weight and Balance (Cessna Aircraft Company, 2008).',
    'EASA Regulation (EU) 965/2012 — Air Operations (CAT.POL.A.105).',
    'FAA-H-8083-1B — Aircraft Weight and Balance Handbook (2016).',
  ],
};

export default theoryWyC;
