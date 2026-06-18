import {
  CourseModule,
  Section, Sub, P, Eq, EqI, Fig, SvgFig, Grid,
  Example, Note, Warn, Concept, Aviation, DefList, Table, Summary,
  Solved, Practice,
} from '../CourseView';

import {
  DiagramAtomo, DiagramCampoElectrico, DiagramOhm,
  DiagramSerieParalelo, DiagramCondensador, DiagramCampoMagnetico,
  DiagramCA, DiagramTransformador,
  DiagramSolenoide,
} from '../CourseDiagrams';

// ── Unsplash images ──────────────────────────────────────────────────────────
const IMG = {
  atom:        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  lightning:   'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=900&q=80',
  multimeter:  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  generator:   'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
  battery:     'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80',
  circuit:     'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  resistors:   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  hvline:      'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=900&q=80',
  caps:        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  magnets:     'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900&q=80',
  coil:        'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  motor:       'https://images.unsplash.com/photo-1569601811497-03a05e22d8e3?w=900&q=80',
  oscilloscope:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  transformer: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  alternator:  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  acmotor:     'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
  avionics:    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  copper:      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
};

const m3: CourseModule = {
  id: 'm3',
  code: 'M3',
  title: 'Fundamentos Eléctricos',
  subtitle: 'Electricidad, magnetismo y circuitos',
  icon: '⚡',
  license: 'B1 · B2',
  description: 'Teoría eléctrica fundamental exigida por EASA Part-66 para las licencias B1 (Mecánico) y B2 (Aviónicos).',
  chapters: [

    // ════════════════════════════════════════════════════════════════
    // 3.1 TEORÍA DEL ELECTRÓN
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-01',
      title: '3.1 Teoría del electrón',
      body: (
        <>
          <Fig src={IMG.atom} alt="Placa de circuito impreso" height={200}
            caption={<><strong>Figura 3.1</strong> Los circuitos electrónicos modernos operan gracias al movimiento controlado de electrones en materiales conductores y semiconductores. Entender la estructura atómica es el punto de partida.</>}
          />

          <Section title="Estructura del átomo">
            <P>Toda la materia está formada por <strong>átomos</strong>. El modelo de Bohr (1913), suficiente para entender la electricidad básica, describe el átomo como un <strong>núcleo central</strong> cargado positivamente, rodeado de <strong>electrones</strong> que orbitan en capas o niveles de energía discretos.</P>
            <SvgFig caption={<><strong>Figura 3.2</strong> Modelo de Bohr del átomo de cobre (Cu, Z = 29). El núcleo contiene 29 protones y 35 neutrones. Los 29 electrones se distribuyen en 4 capas. El electrón de la capa M más exterior es el electrón libre responsable de la conductividad del cobre.</>}>
              <DiagramAtomo />
            </SvgFig>
            <DefList items={[
              { term: 'Protón (p⁺)', def: <>Partícula del núcleo con carga positiva: <EqI>{'q = +1.6 \\times 10^{-19}\\ \\text{C}'}</EqI>. Masa: <EqI>{'1.673 \\times 10^{-27}\\ \\text{kg}'}</EqI>.</> },
              { term: 'Neutrón (n⁰)', def: 'Partícula del núcleo sin carga eléctrica. Masa casi igual al protón. Aporta estabilidad al núcleo.' },
              { term: 'Electrón (e⁻)', def: <>Partícula orbital con carga negativa: <EqI>{'q = -1.6 \\times 10^{-19}\\ \\text{C}'}</EqI>. Masa: <EqI>{'9.11 \\times 10^{-31}\\ \\text{kg}'}</EqI> (1836 veces menor que el protón).</> },
            ]} />
            <P>El número de protones define el <strong>número atómico (Z)</strong> del elemento. En estado neutro, el número de electrones iguala al de protones.</P>
          </Section>

          <Section title="Capas electrónicas y electrones de valencia">
            <P>Los electrones se distribuyen en capas concéntricas (K, L, M, N…). La capacidad máxima de cada capa es <EqI>{'2n^2'}</EqI> electrones, donde <EqI>{'n'}</EqI> es el número de capa. La capa más exterior se llama <strong>capa de valencia</strong>.</P>
            <Table
              headers={['Electrones de valencia', 'Comportamiento eléctrico', 'Ejemplos aeronáuticos']}
              rows={[
                ['1 – 3', 'Conductores: electrones se liberan fácilmente', 'Cobre Cu (1), Aluminio Al (3), Plata Ag (1)'],
                ['4', 'Semiconductores: conductividad controlable', 'Silicio Si (4), Germanio Ge (4)'],
                ['5 – 8', 'Aislantes: electrones fuertemente ligados', 'Nitrógeno N (5), Flúor F (7), Helio He (2)'],
              ]}
            />
            <Aviation title="Aplicación aeronáutica">
              Los cables de un avión son de cobre (1 electrón de valencia). Las carcasas estructurales son de aluminio (3 electrones de valencia). Los chips de aviónica digital están fabricados con silicio (semiconductor). Los aislantes de los cables son polímeros (8 electrones de valencia).
            </Aviation>
          </Section>

          <Section title="Electrones libres y corriente eléctrica">
            <P>En los conductores, el electrón de valencia tiene tan poca energía de enlace que abandona su átomo y forma un <strong>gas de electrones libres</strong>. A temperatura ambiente estos electrones se mueven aleatoriamente a <EqI>{'\\sim 10^6\\ \\text{m/s}'}</EqI>.</P>
            <P>Cuando se aplica una <strong>diferencia de potencial</strong> (tensión), el movimiento aleatorio se orienta: los electrones migran hacia el polo positivo. Este flujo neto de carga es la <strong>corriente eléctrica</strong>.</P>
            <Concept title="Convenio de corriente convencional">
              Benjamin Franklin (1750) estableció que la corriente fluye del polo positivo al negativo (corriente convencional +→−). En realidad los electrones se mueven en sentido contrario (−→+). En ingeniería aeronáutica se usa siempre la corriente convencional.
            </Concept>
            <Note>La velocidad de deriva de los electrones en un conductor típico es solo ~1 mm/s. La señal eléctrica (campo electromagnético) se propaga a ~2/3 de la velocidad de la luz.</Note>
          </Section>

          <Summary items={[
            'El átomo tiene un núcleo (protones + neutrones) rodeado de electrones en capas.',
            'El número de electrones de valencia determina si un material es conductor, semiconductor o aislante.',
            'Los conductores tienen electrones libres que se mueven al aplicar tensión → corriente eléctrica.',
            'La corriente convencional fluye de + a −; los electrones reales se mueven de − a +.',
          ]} />

          <Solved n="3.1.A" title="Clasificación de materiales aeronáuticos">
            {{
              q: <P>Un técnico identifica los siguientes materiales en un panel de aviónica: (a) cable de Cu, (b) chip de silicio, (c) funda de PTFE. Clasifica cada uno como conductor, semiconductor o aislante, indicando el número de electrones de valencia de cada uno.</P>,
              a: <>
                <P><strong>(a) Cobre (Cu, Z=29):</strong> 1 electrón de valencia → <strong>Conductor</strong>. Los electrones de la capa M externa se liberan fácilmente, formando el gas de electrones libres responsable de la alta conductividad (σ ≈ 5.8×10⁷ S/m).</P>
                <P><strong>(b) Silicio (Si, Z=14):</strong> 4 electrones de valencia → <strong>Semiconductor</strong>. La conductividad es intermedia y puede modificarse mediante dopado con impurezas (n-type con P, p-type con B).</P>
                <P><strong>(c) PTFE (politetrafluoroetileno):</strong> Polímero con los electrones fuertemente ligados → <strong>Aislante</strong>. Resistividad ρ ≈ 10¹⁸ Ω·m. Es uno de los mejores aislantes conocidos, ideal para aislar cables de aviónica hasta 260°C.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuántos electrones de valencia tiene el aluminio (Al, Z=13) y por qué se usa en cables de potencia de aeronaves pesadas en lugar de cobre?</P>,
              hint: <span>Considera peso vs conductividad: Al pesa 2.7 g/cm³ frente a Cu 8.9 g/cm³.</span>,
              a: <><P><strong>R:</strong> El Al tiene <strong>3 electrones de valencia</strong> (conductor). Aunque su conductividad es un 61% la del Cu, su densidad es 3.3 veces menor. En aeronaves pesadas (B747, C-5) se usan cables de Al para potencias &gt;100 A porque la sección aumentada compensa el ahorro de peso neto respecto al Cu.</P></>
            },
            {
              n: 2,
              q: <P>Calcula el número de electrones libres en un trozo de cobre de 1 cm³. Dato: densidad Cu = 8900 kg/m³, masa molar = 63.5 g/mol, Nₐ = 6.022×10²³ átomos/mol, 1 electrón libre por átomo.</P>,
              a: <><P><strong>R:</strong></P><Eq>{'n = \\frac{\\rho \\cdot V \\cdot N_A}{M} = \\frac{8900 \\cdot 10^{-6} \\cdot 6.022\\times10^{23}}{0.0635} \\approx 8.43\\times10^{22}\\ \\text{electrones}'}</Eq><P>Existen ~8.4×10²² electrones libres por cm³ de cobre, lo que explica su excelente conductividad.</P></>
            },
            {
              n: 3,
              q: <P>Explica por qué los materiales semiconductores como el silicio son la base de la aviónica digital moderna en lugar de los conductores.</P>,
              a: <><P><strong>R:</strong> Los semiconductores permiten <strong>controlar el flujo de corriente</strong> mediante dopado, temperatura o campo eléctrico (efecto transistor). Un conductor siempre conduce; un aislante nunca. Solo el semiconductor puede actuar como interruptor de dos estados (0/1), base de la lógica digital. Un chip de aviónica con 10⁹ transistores solo es posible con silicio.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuál es la diferencia entre la velocidad de deriva de electrones en un conductor (~1 mm/s) y la velocidad de propagación de la señal eléctrica (~2×10⁸ m/s)? ¿Qué se propaga realmente a alta velocidad?</P>,
              a: <><P><strong>R:</strong> Los <strong>electrones</strong> se mueven lentamente (corriente de deriva ~1 mm/s). Lo que se propaga a alta velocidad es el <strong>campo electromagnético</strong> (onda EM), que "empuja" a todos los electrones del conductor casi simultáneamente. Es como un tubo lleno de bolas: al empujar por un extremo, sale una bola por el otro casi al instante, aunque ninguna bola individual haya recorrido el tubo.</P></>
            },
            {
              n: 5,
              q: <P>Un avión vuela a alta altitud donde la ionización cósmica es mayor. ¿Cómo afecta esto a los materiales aislantes de los cables de aviónica y qué medida se toma en el diseño?</P>,
              a: <><P><strong>R:</strong> La radiación cósmica puede ionizar el dieléctrico de los cables, reduciendo temporalmente su resistencia de aislamiento (IR). En aviónica, los aislantes se sobredimensionan (tensión de trabajo muy inferior a la de prueba), y los cables se blindan con malla metálica conectada a tierra (bonding) para disipar las cargas ionizadas antes de que alcancen los conductores internos.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.2 ELECTRICIDAD ESTÁTICA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-02',
      title: '3.2 Electricidad estática',
      body: (
        <>
          <Fig src={IMG.lightning} alt="Rayo eléctrico" height={200}
            caption={<><strong>Figura 3.3</strong> Un rayo es una descarga electrostática de hasta 10⁹ V entre la nube y la tierra. Los aviones pueden ser alcanzados por rayos durante el vuelo — el fuselaje metálico actúa como jaula de Faraday protegiendo a los ocupantes.</>}
          />

          <Section title="Carga eléctrica y Ley de Coulomb">
            <P>La <strong>carga eléctrica</strong> es una propiedad fundamental de la materia. Se mide en <strong>Coulombios [C]</strong>. La carga mínima (cuanto) es la carga del electrón: <EqI>{'e = 1.6 \\times 10^{-19}\\ \\text{C}'}</EqI>.</P>
            <P>Dos cargas eléctricas ejercen una fuerza entre sí. <strong>Cargas iguales se repelen; cargas opuestas se atraen.</strong> Charles-Augustin de Coulomb (1785) estableció la ley cuantitativa:</P>
            <Eq>{'F = k_e \\cdot \\frac{|q_1 \\cdot q_2|}{r^2} \\qquad [\\text{N}] \\qquad k_e = 8.99 \\times 10^9\\ \\text{N·m}^2/\\text{C}^2'}</Eq>
            <DefList items={[
              { term: 'F [N]', def: 'Fuerza entre las cargas. Repulsiva si son iguales, atractiva si son opuestas.' },
              { term: 'q₁, q₂ [C]', def: 'Magnitud de las cargas en Coulombios.' },
              { term: 'r [m]', def: 'Distancia entre las cargas.' },
              { term: 'kₑ', def: <>Constante de Coulomb: <EqI>{'k_e = \\frac{1}{4\\pi\\varepsilon_0}'}</EqI>, donde <EqI>{'\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{F/m}'}</EqI> es la permitividad del vacío.</> },
            ]} />
            <Example n="3.1" title="Fuerza entre dos cargas"
              given={<P>Dos cargas de <EqI>{'q_1 = +2\\ \\mu\\text{C}'}</EqI> y <EqI>{'q_2 = -3\\ \\mu\\text{C}'}</EqI> separadas <EqI>{'r = 0.1\\ \\text{m}'}</EqI>. ¿Cuál es la fuerza?</P>}
              solution={
                <>
                  <Eq>{'F = 8.99 \\times 10^9 \\cdot \\frac{(2 \\times 10^{-6})(3 \\times 10^{-6})}{(0.1)^2} = 5.39\\ \\text{N}'}</Eq>
                  <P>La fuerza es <strong>atractiva</strong> (cargas opuestas) y tiene magnitud 5.39 N.</P>
                </>
              }
            />
          </Section>

          <Section title="Campo eléctrico">
            <P>El <strong>campo eléctrico E</strong> es la fuerza por unidad de carga que experimentaría una carga de prueba positiva <EqI>{'q_0'}</EqI> colocada en ese punto:</P>
            <Eq>{'\\vec{E} = \\frac{\\vec{F}}{q_0} = k_e \\cdot \\frac{Q}{r^2}\\,\\hat{r} \\qquad [\\text{V/m = N/C}]'}</Eq>
            <SvgFig caption={<><strong>Figura 3.4</strong> Líneas de campo eléctrico entre una carga positiva (rojo) y negativa (azul). Las líneas siempre van de + a −. La densidad de líneas indica la intensidad del campo. La fuerza sobre una carga positiva es paralela a las líneas; sobre una negativa, antiparalela.</>}>
              <DiagramCampoElectrico />
            </SvgFig>
          </Section>

          <Section title="Potencial eléctrico y diferencia de potencial">
            <P>El <strong>potencial eléctrico V</strong> en un punto es la energía potencial por unidad de carga:</P>
            <Eq>{'V = \\frac{W}{q} \\qquad [\\text{J/C} = \\text{V (Voltio)}]'}</Eq>
            <P>La <strong>diferencia de potencial</strong> (tensión) <EqI>{'U_{AB}'}</EqI> entre dos puntos A y B es el trabajo por unidad de carga para llevar una carga de B a A:</P>
            <Eq>{'U_{AB} = V_A - V_B \\qquad [\\text{V}]'}</Eq>
            <Note>La tensión siempre se mide entre dos puntos. Hablar de "tensión en un punto" implica que el punto de referencia (masa, tierra) es 0 V.</Note>
          </Section>

          <Section title="Electricidad estática en aviación">
            <Warn>La electricidad estática es un peligro real en aviación. Antes de repostar, siempre conectar el cable de tierra entre la aeronave y el camión cisterna para igualar potenciales y evitar la chispa que podría inflamar los vapores de combustible. Exigido por EASA AMC M.A.501.</Warn>
            <DefList items={[
              { term: 'Interferencia de radio', def: 'Las descargas estáticas generan ruido de banda ancha en receptores HF/VHF. Por eso los aviones llevan static wicks (descargadores estáticos) en los bordes de salida del ala.' },
              { term: 'ESD en aviónica', def: 'Los MOSFET e ICs de aviónica son extremadamente sensibles. Manipulación obligatoria con pulsera y tapete antiestáticos (EASA Part-145).' },
              { term: 'Rayos', def: 'El fuselaje metálico actúa como jaula de Faraday. El rayo entra y sale por los puntos extremos (proa/cola). Los cables de aviónica deben estar blindados.' },
            ]} />
          </Section>

          <Summary items={[
            'La Ley de Coulomb: F = kₑ|q₁q₂|/r². Cargas iguales se repelen, opuestas se atraen.',
            'El campo eléctrico E = F/q indica la fuerza que sufriría una carga unitaria positiva.',
            'El potencial eléctrico V = W/q se mide en Voltios (V).',
            'La electricidad estática es fuente de interferencias y peligro de incendio en el repostaje aeronáutico.',
          ]} />

          <Solved n="3.2.A" title="Tensión de descarga electrostática en repostaje">
            {{
              q: <P>Un avión acumula una carga estática de Q = 0.5 mC durante un vuelo. Al aproximarse el camión cisterna sin cable de tierra, la distancia entre la boquilla y el avión es d = 5 cm. Estima la intensidad de campo eléctrico en ese punto, asumiendo modelo de carga puntual, y compara con la rigidez dieléctrica del aire (3 MV/m) para determinar si hay riesgo de chispa.</P>,
              a: <>
                <Eq>{'E = k_e \\cdot \\frac{Q}{r^2} = 8.99\\times10^9 \\cdot \\frac{0.5\\times10^{-3}}{(0.05)^2} = 8.99\\times10^9 \\cdot 200 = 1.80\\times10^{12}\\ \\text{V/m (modelo puntual)}'}</Eq>
                <P>Aunque este es un modelo simplificado, el campo supera ampliamente los 3 MV/m de rigidez dieléctrica del aire. <strong>Existe riesgo elevado de descarga (chispa)</strong> que podría inflamar los vapores de Jet A-1 (límite inferior de inflamabilidad: ~0.6% en volumen). La conexión del cable de tierra iguala los potenciales antes de abrir la boquilla, eliminando el riesgo.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Dos cargas de +5 μC y +5 μC están separadas 0.2 m en el vacío. Calcula la fuerza entre ellas e indica si es atractiva o repulsiva.</P>,
              a: <><Eq>{'F = 8.99\\times10^9 \\cdot \\frac{(5\\times10^{-6})^2}{(0.2)^2} = 5.62\\ \\text{N} \\quad \\text{(repulsiva, cargas iguales)}'}</Eq></>
            },
            {
              n: 2,
              q: <P>¿Qué son los static wicks en un avión y para qué sirven? Explica el principio físico que los hace efectivos.</P>,
              a: <><P><strong>R:</strong> Los <em>static wicks</em> (descargadores estáticos) son puntas conductoras finas instaladas en los bordes de salida de alas y empenaje. Al concentrar el campo eléctrico en la punta (E = Q/4πε₀r² → muy grande para r pequeño), provoca emisión de iones (efecto corona) que neutraliza la carga estática acumulada de forma gradual y silenciosa, evitando descargas bruscas que generarían interferencias en los receptores HF/VHF.</P></>
            },
            {
              n: 3,
              q: <P>Un sensor de posición de un avión mide una diferencia de potencial de 5 V entre sus terminales. Si se gasta 0.1 J para mover una carga a través de él, ¿qué carga se ha movido?</P>,
              a: <><P><strong>R:</strong></P><Eq>{'q = \\frac{W}{V} = \\frac{0.1\\ \\text{J}}{5\\ \\text{V}} = 0.02\\ \\text{C} = 20\\ \\text{mC}'}</Eq></>
            },
            {
              n: 4,
              q: <P>Durante la manipulación de una tarjeta de aviónica sin protección ESD, un técnico toca un MOSFET con una diferencia de potencial de 3000 V respecto a tierra. Si la puerta del MOSFET tiene una capacitancia de 10 pF, ¿qué energía se descarga sobre el dispositivo?</P>,
              a: <><P><strong>R:</strong></P><Eq>{'E = \\frac{1}{2}CV^2 = \\frac{1}{2}\\cdot10\\times10^{-12}\\cdot(3000)^2 = 45\\ \\mu\\text{J}'}</Eq><P>Aunque parece pequeña, 45 μJ es suficiente para destruir la fina capa de óxido de silicio (gate oxide) del MOSFET, causando un cortocircuito permanente. Siempre usar ESD strap y tapete antiestático (EASA Part-145.A.45).</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué el fuselaje metálico de un avión actúa como una jaula de Faraday durante un impacto de rayo? Describe qué ocurre con los pasajeros en su interior.</P>,
              a: <><P><strong>R:</strong> Una jaula de Faraday es un conductor cerrado en cuyo interior el campo eléctrico neto es cero (las cargas inducidas en la superficie crean un campo interior que cancela el exterior). El fuselaje de aluminio es un buen conductor: la corriente del rayo (10–200 kA) fluye por la superficie exterior, nunca por el interior. Los pasajeros y los equipos electrónicos en cabina están protegidos. El rayo entra y sale por los puntos más extremos (radomo/cola), quedando registrado en los registros de mantenimiento (lightning strike record).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.3 TERMINOLOGÍA Y UNIDADES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-03',
      title: '3.3 Terminología y unidades eléctricas',
      body: (
        <>
          <Fig src={IMG.multimeter} alt="Multímetro digital" height={180}
            caption={<><strong>Figura 3.5</strong> Multímetro digital, el instrumento más usado en mantenimiento aeronáutico. Mide tensión (V), corriente (A) y resistencia (Ω). Un técnico LMA debe dominar su uso y comprender perfectamente las magnitudes que mide.</>}
          />

          <Section title="Magnitudes eléctricas fundamentales">
            <DefList items={[
              { term: 'Carga Q [C]', def: <>Coulombio. Cantidad de electricidad. 1 C = carga de <EqI>{'6.24 \\times 10^{18}'}</EqI> electrones.</> },
              { term: 'Corriente I [A]', def: <>Amperio. Flujo de carga por unidad de tiempo: <EqI>{'I = dQ/dt'}</EqI>. 1 A = 1 C/s.</> },
              { term: 'Tensión V [V]', def: <>Voltio. Diferencia de potencial. 1 V = 1 J/C. También llamada f.e.m. o voltaje.</> },
              { term: 'Resistencia R [Ω]', def: <>Ohmio. Oposición al flujo de corriente. 1 Ω = 1 V/A.</> },
              { term: 'Conductancia G [S]', def: <>Siemens. Inverso de la resistencia: <EqI>{'G = 1/R'}</EqI>.</> },
              { term: 'Potencia P [W]', def: <>Vatio. Energía por unidad de tiempo: <EqI>{'P = V \\cdot I'}</EqI>. 1 W = 1 J/s.</> },
              { term: 'Energía E [J]', def: <>Julio. <EqI>{'E = P \\cdot t'}</EqI>. En facturación eléctrica: 1 kWh = 3.6 MJ.</> },
            ]} />
          </Section>

          <Section title="Prefijos del Sistema Internacional">
            <Table
              headers={['Prefijo', 'Símbolo', 'Factor', 'Ejemplo eléctrico']}
              rows={[
                ['Mega', 'M', '× 10⁶', '1 MΩ = 1 000 000 Ω (resistencia aislante)'],
                ['Kilo', 'k', '× 10³', '28 kV (tensión líneas de alta tensión)'],
                ['—', '—', '× 10⁰', '28 V (bus DC aeronave)'],
                ['Mili', 'm', '× 10⁻³', '500 mA (corriente sensor)'],
                ['Micro', 'μ', '× 10⁻⁶', '100 μA (señal de sensor fino)'],
                ['Nano', 'n', '× 10⁻⁹', '47 nF (condensador de bypass RF)'],
                ['Pico', 'p', '× 10⁻¹²', '10 pF (condensador parásito en PCB)'],
              ]}
            />
            <Aviation title="Tensiones estándar en aeronaves">
              Los aviones comerciales usan 28 V DC (bus principal) y 115 V AC / 400 Hz (bus AC). Las aeronaves modernas (Boeing 787, Airbus A380) usan 270 V DC para mayor eficiencia de peso. Los helicópteros militares suelen usar 28 V DC.
            </Aviation>
          </Section>

          <Section title="Ley de Ohm">
            <P>La Ley de Ohm (Georg Simon Ohm, 1827) establece que la tensión entre los extremos de un conductor es proporcional a la corriente que lo atraviesa, siendo la constante de proporcionalidad la resistencia:</P>
            <Eq>{'V = I \\cdot R \\qquad [\\text{V = A · Ω}]'}</Eq>
            <SvgFig caption={<><strong>Figura 3.6</strong> Circuito básico de la Ley de Ohm. La batería (V) mantiene una diferencia de potencial que impulsa la corriente I a través de la resistencia R. El amperímetro (A) mide I en serie; el voltímetro (V) mide la tensión en paralelo.</>}>
              <DiagramOhm />
            </SvgFig>
            <Example n="3.2" title="Aplicar la Ley de Ohm"
              given={<P>Un motor eléctrico de un avión tiene una resistencia de devanado <EqI>{'R = 2.4\\ \\Omega'}</EqI> y se alimenta con 28 V DC. ¿Qué corriente circula?</P>}
              solution={
                <>
                  <Eq>{'I = \\frac{V}{R} = \\frac{28}{2.4} = 11.67\\ \\text{A}'}</Eq>
                  <P>La corriente de arranque del motor es 11.67 A. El fusible de protección debería ser de al menos 15 A.</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Las magnitudes eléctricas fundamentales son: Q (C), I (A), V (V), R (Ω), P (W), E (J).',
            'El bus DC estándar aeronáutico es de 28 V; el bus AC es 115 V / 400 Hz.',
            'Ley de Ohm: V = I · R. Se puede despejar cualquiera de las tres variables.',
          ]} />

          <Solved n="3.3.A" title="Selección de fusible para un sistema de aviónica">
            {{
              q: <P>Un sistema de aviónica se alimenta del bus de 28 V DC. El manual indica que el consumo máximo es de 336 W. Calcula la corriente nominal y selecciona el fusible adecuado de la serie estándar aeronáutica: 5 A, 7.5 A, 10 A, 15 A, 20 A, 25 A.</P>,
              a: <>
                <Eq>{'I = \\frac{P}{V} = \\frac{336\\ \\text{W}}{28\\ \\text{V}} = 12\\ \\text{A}'}</Eq>
                <P>La corriente nominal es 12 A. El fusible debe ser <strong>mayor que la corriente nominal</strong> para no abrir en condiciones normales, pero lo más cercano para proteger el cableado. Se selecciona el <strong>fusible de 15 A</strong> (siguiente valor superior en la serie estándar). Un fusible de 20 A o mayor dejaría el cable sin protección ante sobrecargas moderadas.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Convierte las siguientes cantidades usando prefijos SI: (a) 0.0047 F en μF, (b) 2 200 000 Ω en MΩ, (c) 0.085 A en mA.</P>,
              a: <><P><strong>R:</strong> (a) 0.0047 F = <strong>4700 μF</strong>; (b) 2 200 000 Ω = <strong>2.2 MΩ</strong>; (c) 0.085 A = <strong>85 mA</strong>.</P></>
            },
            {
              n: 2,
              q: <P>Un motor de flap consume 8 A del bus de 28 V DC. ¿Cuál es su resistencia de devanado en caliente?</P>,
              a: <><Eq>{'R = \\frac{V}{I} = \\frac{28}{8} = 3.5\\ \\Omega'}</Eq></>
            },
            {
              n: 3,
              q: <P>El bus AC del A320 es de 115 V / 400 Hz. Un técnico mide 115 V con un voltímetro de CA: ¿es este el valor de pico o el valor eficaz (RMS)?</P>,
              a: <><P><strong>R:</strong> Es el valor <strong>eficaz (RMS)</strong>. Los voltímetros de CA muestran el valor RMS, que es el equivalente DC en términos de potencia disipada. El valor de pico sería V_p = 115 × √2 ≈ 162.6 V.</P></>
            },
            {
              n: 4,
              q: <P>Una batería de aeronave tiene una resistencia interna de 0.05 Ω y una f.e.m. de 24 V. Si suministra 50 A al motor de arranque, ¿qué tensión aparece en los bornes de la batería?</P>,
              a: <><Eq>{'V_{bornes} = \\varepsilon - I \\cdot R_i = 24 - 50 \\times 0.05 = 24 - 2.5 = 21.5\\ \\text{V}'}</Eq><P>La caída de 2.5 V en la resistencia interna explica por qué la tensión del bus baja durante el arranque.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué los aviones modernos como el B787 usan 270 V DC en lugar de 28 V DC para los sistemas de alta potencia? Razona en términos de corriente y pérdidas en el cableado.</P>,
              a: <><P><strong>R:</strong> Para la misma potencia P = V·I, a mayor tensión, menor corriente. Las pérdidas en el cableado son P_pérdidas = I²·R. Con 270 V DC en lugar de 28 V (relación ~10×), la corriente se reduce ~10 veces y las pérdidas se reducen ~100 veces para la misma sección de cable. Alternativamente, se puede usar cable 100 veces más fino para las mismas pérdidas → <strong>enorme ahorro de peso</strong>, crítico en aviación.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.4 GENERACIÓN DE ELECTRICIDAD
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-04',
      title: '3.4 Generación de electricidad',
      body: (
        <>
          <Fig src={IMG.generator} alt="Generador eléctrico" height={185}
            caption={<><strong>Figura 3.7</strong> Generador de CA acoplado al motor de una aeronave. La energía mecánica de rotación del motor se convierte en energía eléctrica por inducción electromagnética (principio de Faraday).</>}
          />

          <Section title="Métodos de generación de f.e.m.">
            <P>Una <strong>fuerza electromotriz (f.e.m.)</strong> es cualquier diferencia de potencial que puede impulsar corriente a través de un circuito externo. Se puede generar por distintos fenómenos físicos:</P>
            <DefList items={[
              { term: 'Inducción electromagnética', def: 'Movimiento de un conductor en un campo magnético (o variación de flujo). Base de los generadores, alternadores y transformadores. Es el método principal en aviación.' },
              { term: 'Efecto fotovoltaico', def: 'Los fotones liberan electrones en materiales semiconductores. Base de las células solares (paneles fotovoltaicos de los aviones UAV y satélites).' },
              { term: 'Efecto termoeléctrico (Seebeck)', def: 'Una diferencia de temperatura entre dos metales distintos genera una tensión. Base de los termopares usados como sensores de temperatura de EGT en motores.' },
              { term: 'Efecto piezoeléctrico', def: 'La deformación mecánica de ciertos cristales (cuarzo, PZT) genera tensión. Base de sensores de vibración, micrófonos y acelerómetros de aviación.' },
              { term: 'Reacción electroquímica', def: 'Reacción química entre electrolito y electrodos genera tensión. Base de baterías y pilas de combustible (Fuel Cells en Boeing 787).' },
            ]} />
          </Section>

          <Section title="Inducción electromagnética — Ley de Faraday">
            <P>Michael Faraday (1831) descubrió que una <strong>variación de flujo magnético</strong> a través de un circuito induce una f.e.m. en dicho circuito:</P>
            <Eq>{'\\varepsilon = -N \\frac{d\\Phi_B}{dt} \\qquad [\\text{V}]'}</Eq>
            <DefList items={[
              { term: 'ε [V]', def: 'f.e.m. inducida (fuerza electromotriz).' },
              { term: 'N', def: 'Número de espiras del bobinado.' },
              { term: 'dΦB/dt [Wb/s]', def: 'Variación de flujo magnético por unidad de tiempo. Φ = B · A · cos θ.' },
              { term: 'Signo negativo', def: 'Ley de Lenz: la corriente inducida se opone a la variación de flujo que la produce.' },
            ]} />
            <Concept title="Regla de la mano derecha (F.E.M.)">
              Para un conductor recto moviéndose en un campo B: si el pulgar apunta en dirección del movimiento (v) y el índice en dirección de B, el dedo corazón indica la dirección de la corriente inducida (F.E.M.).
            </Concept>
            <Aviation title="Alternador del avión">
              En un avión de pistón, el alternador convierte la energía mecánica del motor en CA de ~14 V AC, que luego el regulador-rectificador convierte en 14.2 V DC para cargar la batería y alimentar los sistemas. Potencia típica: 60–90 A (1680–2520 W).
            </Aviation>
          </Section>

          <Summary items={[
            'La f.e.m. puede generarse por inducción, efecto fotovoltaico, termoelectricidad, piezoelectricidad o reacción química.',
            'Ley de Faraday: ε = −N · dΦ/dt. Una variación de flujo magnético induce una tensión.',
            'Ley de Lenz: la corriente inducida siempre se opone a la causa que la origina.',
          ]} />

          <Solved n="3.4.A" title="F.E.M. inducida en el alternador de un avión de pistón">
            {{
              q: <P>Un alternador de aeronave tiene una bobina de N = 120 espiras con sección A = 50 cm². El campo magnético del inductor es B = 0.8 T. El alternador gira a 6000 RPM. Calcula la f.e.m. de pico inducida.</P>,
              a: <>
                <P>La velocidad angular: <EqI>{'\\omega = 2\\pi \\cdot \\frac{6000}{60} = 628\\ \\text{rad/s}'}</EqI></P>
                <P>La f.e.m. de pico (máxima variación de flujo por unidad de tiempo):</P>
                <Eq>{'\\varepsilon_{max} = N \\cdot B \\cdot A \\cdot \\omega = 120 \\times 0.8 \\times 50\\times10^{-4} \\times 628 = 301\\ \\text{V}'}</Eq>
                <P>La f.e.m. eficaz (RMS) sería: <EqI>{'\\varepsilon_{rms} = 301/\\sqrt{2} \\approx 213\\ \\text{V}'}</EqI>. Este alternador produce una tensión demasiado alta para 28 V DC; un regulador-rectificador la convierte a la tensión adecuada.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Los termopares de EGT de un motor turbina usan el efecto Seebeck. Si la unión caliente está a 750°C y la fría a 25°C, y el coeficiente Seebeck del par cromel-alumel es 41 μV/°C, ¿qué tensión genera el termopar?</P>,
              a: <><Eq>{'V = S \\cdot \\Delta T = 41\\times10^{-6} \\times (750-25) = 29.7\\ \\text{mV}'}</Eq><P>Esta pequeña tensión se amplifica en el sistema de indicación de EGT en cabina.</P></>
            },
            {
              n: 2,
              q: <P>Un acelerómetro piezoeléctrico en un motor de turbina genera 5 mV por cada g de vibración. Si el límite de vibración es 4 unidades (g), ¿cuál es la tensión máxima de salida del sensor?</P>,
              a: <><Eq>{'V_{max} = 5\\ \\text{mV/g} \\times 4\\ \\text{g} = 20\\ \\text{mV}'}</Eq><P>El sistema de vibración monitorea esta señal y activa el aviso de VIBRATION en cabina si se supera.</P></>
            },
            {
              n: 3,
              q: <P>Enuncia la Ley de Lenz en el contexto de un alternador de aeronave. ¿Qué efecto tiene sobre el par necesario para girar el alternador cuando se conecta una carga mayor?</P>,
              a: <><P><strong>R:</strong> La Ley de Lenz dice que la corriente inducida se opone a la causa que la produce. Al conectar más carga al alternador, la corriente inducida mayor crea un campo magnético que <strong>se opone a la rotación</strong> (fuerza de frenado). Para mantener la misma velocidad, el motor debe suministrar más par mecánico. Esto se manifiesta como un aumento del consumo de combustible al activar cargas eléctricas grandes (luces de aterrizaje, antihielo, etc.).</P></>
            },
            {
              n: 4,
              q: <P>¿Cuál de los siguientes sensores usa el efecto piezoeléctrico en aviación: (a) termopar de EGT, (b) sensor de vibración del motor, (c) célula solar de un UAV, (d) potenciómetro de posición de flap?</P>,
              a: <><P><strong>R: (b) sensor de vibración del motor.</strong> Los acelerómetros y sensores de vibración usan cristales piezoeléctricos (PZT o cuarzo) que generan tensión al deformarse mecánicamente. El termopar usa efecto Seebeck, la célula solar efecto fotovoltaico y el potenciómetro es resistivo.</P></>
            },
            {
              n: 5,
              q: <P>Una bobina con 200 espiras experimenta un cambio de flujo magnético de 0.05 Wb en 10 ms. Calcula la f.e.m. inducida y su polaridad según la Ley de Lenz.</P>,
              a: <><Eq>{'\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t} = -200 \\times \\frac{0.05}{0.01} = -1000\\ \\text{V}'}</Eq><P>La f.e.m. es 1000 V (valor absoluto). El signo negativo indica que la corriente inducida generaría un campo magnético que <strong>se opone al aumento</strong> del flujo original (Ley de Lenz).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.5 BATERÍAS
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-05',
      title: '3.5 Fuentes de corriente continua (baterías)',
      body: (
        <>
          <Grid>
            <Fig src={IMG.battery} alt="Baterías de aeronave" height={185}
              caption={<><strong>Figura 3.8</strong> Batería de Ni-Cd de aeronave. Proporciona energía de emergencia y potencia para el arranque del motor de tierra (GPU). Su mantenimiento está regulado por el AMM del fabricante.</>}
            />
            <Fig src={IMG.avionics} alt="Panel de aviónica" height={185}
              caption={<><strong>Figura 3.9</strong> Panel de aviónica con interruptor de batería (BAT). La batería principal permite operar los sistemas esenciales durante un fallo del alternador. EASA requiere al menos 30 min de autonomía de batería.</>}
            />
          </Grid>

          <Section title="Principio electroquímico">
            <P>Una <strong>celda electroquímica</strong> convierte energía química en eléctrica mediante una reacción de oxidación-reducción (REDOX). Consta de:</P>
            <DefList items={[
              { term: 'Ánodo (−)', def: 'Electrodo donde ocurre la oxidación (pérdida de electrones). En una batería de plomo-ácido: Pb → Pb²⁺ + 2e⁻.' },
              { term: 'Cátodo (+)', def: 'Electrodo donde ocurre la reducción (ganancia de electrones). En plomo-ácido: PbO₂ + 2e⁻ → Pb²⁺ + 2O²⁻.' },
              { term: 'Electrolito', def: 'Solución o pasta conductora de iones que permite la migración de cargas entre electrodos sin contacto metálico directo.' },
            ]} />
            <P>La <strong>f.e.m. de la celda</strong> depende del par de materiales electródicos, no del tamaño. El tamaño solo afecta a la capacidad (Ah).</P>
          </Section>

          <Section title="Tipos de batería aeronáutica">
            <Table
              headers={['Tipo', 'Tensión/celda', 'Energía (Wh/kg)', 'Uso típico']}
              rows={[
                ['Plomo-ácido (Pb)', '2.0 V', '35–40', 'APU, VFR training, ULM'],
                ['Níquel-Cadmio (Ni-Cd)', '1.25 V', '40–60', 'Aviones comerciales, helicópteros'],
                ['Níquel-Metal-Hidruro (Ni-MH)', '1.25 V', '60–120', 'Aplicaciones portátiles, drones'],
                ['Litio-Ion (Li-Ion)', '3.6 V', '150–265', 'B787 (problemas 2013), UAV modernos'],
              ]}
            />
            <Warn>Las baterías de litio (Li-Ion/LiPo) pueden entrar en <strong>thermal runaway</strong> si se sobrecargan, cortocircuitan o dañan mecánicamente. El Boeing 787 tuvo dos incidentes graves en 2013 por este motivo. Las normativas actuales exigen monitores de celda individuales y contención de fuego.</Warn>
          </Section>

          <Section title="Parámetros de batería">
            <DefList items={[
              { term: 'Capacidad [Ah]', def: <>Carga total que puede entregar: <EqI>{'C = I \\cdot t'}</EqI>. Una batería de 40 Ah puede dar 4 A durante 10 horas.</> },
              { term: 'Tensión nominal [V]', def: 'Tensión típica de operación. Una batería de 12 celdas de Ni-Cd da 15 V (12 × 1.25 V).' },
              { term: 'Resistencia interna Ri', def: <>Causa una caída de tensión <EqI>{'\\Delta V = I \\cdot R_i'}</EqI> durante la descarga. Aumenta con la temperatura y el envejecimiento.</> },
              { term: 'Autodescarga', def: 'Pérdida de capacidad en reposo. Ni-Cd: ~20%/mes. Li-Ion: ~5%/mes.' },
            ]} />
            <Example n="3.3" title="Autonomía de batería de emergencia"
              given={<P>Batería de aeronave de 24 V / 40 Ah. Los sistemas de emergencia consumen 15 A. ¿Cuántos minutos de autonomía?</P>}
              solution={
                <>
                  <Eq>{'t = \\frac{C}{I} = \\frac{40\\ \\text{Ah}}{15\\ \\text{A}} = 2.67\\ \\text{h} = 160\\ \\text{min}'}</Eq>
                  <P>Autonomía de 160 minutos, suficiente para cumplir con los requisitos de EASA (mínimo 30 min).</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'La celda electroquímica convierte energía química en eléctrica mediante reacciones REDOX.',
            'Las baterías de Ni-Cd son el estándar en aviación comercial por su robustez y ciclos de carga.',
            'Capacidad = I × t [Ah]. Tensión nominal = número de celdas × tensión por celda.',
            'Las baterías de litio tienen alta densidad de energía pero requieren gestión térmica y de celda.',
          ]} />

          <Solved n="3.5.A" title="Batería Ni-Cd de aeronave — tensión y autonomía">
            {{
              q: <P>Una batería de aeronave Ni-Cd está formada por 19 celdas en serie. (a) ¿Cuál es su tensión nominal? (b) Si tiene capacidad de 25 Ah y los sistemas de emergencia consumen 12.5 A, ¿cuántos minutos de autonomía proporciona? (c) EASA exige mínimo 30 min: ¿cumple?</P>,
              a: <>
                <P><strong>(a) Tensión nominal:</strong></P>
                <Eq>{'V_{nominal} = 19 \\times 1.25\\ \\text{V/celda} = 23.75\\ \\text{V} \\approx 24\\ \\text{V}'}</Eq>
                <P><strong>(b) Autonomía:</strong></P>
                <Eq>{'t = \\frac{C}{I} = \\frac{25\\ \\text{Ah}}{12.5\\ \\text{A}} = 2\\ \\text{h} = 120\\ \\text{min}'}</Eq>
                <P><strong>(c)</strong> 120 min &gt; 30 min → <strong>Cumple con creces el requisito EASA.</strong> El margen permite fallos adicionales o mayor consumo de emergencia no previsto.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Una batería de plomo-ácido de 12 V se descarga completamente en 5 horas entregando 4 A. ¿Cuál es su capacidad en Ah?</P>,
              a: <><Eq>{'C = I \\times t = 4\\ \\text{A} \\times 5\\ \\text{h} = 20\\ \\text{Ah}'}</Eq></>
            },
            {
              n: 2,
              q: <P>¿Por qué las baterías de Ni-Cd requieren un ciclo de "descarga profunda" periódico (efecto memoria) y cómo afecta esto al programa de mantenimiento aeronáutico?</P>,
              a: <><P><strong>R:</strong> Las baterías Ni-Cd desarrollan "efecto memoria": si se recargan repetidamente sin descargarse completamente, los cristales de cadmio crecen de forma desordenada, reduciendo la capacidad efectiva. El mantenimiento aeronáutico (AMM cap. 24) incluye ciclos de descarga-carga completos periódicos (generalmente cada 3–6 meses o en el capacity test obligatorio) para restaurar la capacidad nominal y verificar que cumple los requisitos de autonomía de emergencia.</P></>
            },
            {
              n: 3,
              q: <P>Una batería de emergencia del APU tiene una resistencia interna de 0.08 Ω. Si suministra 100 A al motor de arranque del APU desde una f.e.m. de 24 V, ¿cuál es la tensión real en los bornes durante el arranque?</P>,
              a: <><Eq>{'V = \\varepsilon - I \\cdot R_i = 24 - 100 \\times 0.08 = 24 - 8 = 16\\ \\text{V}'}</Eq><P>La caída de 8 V es significativa. Por eso el bus DC puede caer temporalmente durante el arranque del APU, causando parpadeos en aviónica.</P></>
            },
            {
              n: 4,
              q: <P>El B787 tuvo incidentes por thermal runaway en baterías Li-Ion en 2013. Define thermal runaway y explica por qué las baterías Li-Ion son más propensas a este fenómeno que las Ni-Cd.</P>,
              a: <><P><strong>R:</strong> El <em>thermal runaway</em> es un proceso autoacelerado donde el calor generado por la reacción química aumenta la temperatura, lo que acelera aún más la reacción → ciclo sin control que puede acabar en fuego. Las baterías Li-Ion son más propensas porque: (1) el electrolito orgánico es inflamable (vs el Ni-Cd que usa KOH acuoso no inflamable); (2) el litio metálico puede liberar O₂ al descomponerse, alimentando el fuego; (3) cada celda almacena mucha más energía, por lo que un fallo tiene mayor consecuencia.</P></>
            },
            {
              n: 5,
              q: <P>Si se conectan dos baterías de 24 V / 30 Ah en paralelo, ¿cuál es la tensión y capacidad resultante? ¿En qué situación aeronáutica se usa esta configuración?</P>,
              a: <><P><strong>R:</strong> En paralelo: <strong>V = 24 V</strong> (igual que cada batería), <strong>C = 30 + 30 = 60 Ah</strong> (doble capacidad). Se usa en aviones que requieren mayor autonomía de emergencia o mayor corriente de arranque, sin aumentar la tensión del bus. También se usa como medida de redundancia: si una batería falla, la otra mantiene el bus.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.6 CIRCUITOS DC
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-06',
      title: '3.6 Circuitos de corriente continua',
      body: (
        <>
          <Fig src={IMG.circuit} alt="Circuito electrónico" height={180}
            caption={<><strong>Figura 3.10</strong> Circuito impreso de aviónica. Contiene resistencias en serie y paralelo, reguladores de tensión y condensadores de filtrado. Todos estos elementos se analizan con las leyes de Kirchhoff.</>}
          />

          <Section title="Leyes de Kirchhoff">
            <P>Gustav Kirchhoff (1845) formuló dos leyes que permiten analizar <strong>cualquier circuito eléctrico</strong>, por complejo que sea:</P>
            <Concept title="LCK — Ley de Corrientes de Kirchhoff (nodos)">
              La suma algebraica de todas las corrientes que entran en un nodo es igual a la suma de las que salen. Equivalente: la suma de todas las corrientes en un nodo es cero.<br/>
              <strong>∑Iᵢ = 0</strong> (en un nodo)
            </Concept>
            <Concept title="LTK — Ley de Tensiones de Kirchhoff (mallas)">
              La suma algebraica de todas las tensiones a lo largo de cualquier malla cerrada es cero.<br/>
              <strong>∑Vᵢ = 0</strong> (en una malla)
            </Concept>
          </Section>

          <Section title="Circuitos en serie y en paralelo">
            <SvgFig caption={<><strong>Figura 3.11</strong> Comparación entre circuitos serie y paralelo. En serie, la misma corriente atraviesa todos los componentes. En paralelo, la misma tensión está en todos los componentes.</>}>
              <DiagramSerieParalelo />
            </SvgFig>
            <Sub title="Serie">
              <Eq>{'R_T = R_1 + R_2 + R_3 + \\cdots \\qquad I = \\text{igual en todos} \\qquad V_T = V_1 + V_2 + V_3'}</Eq>
            </Sub>
            <Sub title="Paralelo">
              <Eq>{'\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} \\qquad V = \\text{igual en todos} \\qquad I_T = I_1 + I_2 + I_3'}</Eq>
              <P>Para <strong>dos resistencias en paralelo</strong>:</P>
              <Eq>{'R_T = \\frac{R_1 \\cdot R_2}{R_1 + R_2}'}</Eq>
            </Sub>
            <Example n="3.4" title="Red de resistencias mixta"
              given={<P><EqI>{'R_1 = 10\\ \\Omega'}</EqI> en serie con la combinación paralela de <EqI>{'R_2 = 20\\ \\Omega'}</EqI> y <EqI>{'R_3 = 30\\ \\Omega'}</EqI>. Alimentado a 24 V. Calcular la corriente total.</P>}
              solution={
                <>
                  <P>Primero, resistencia paralela R₂ ‖ R₃:</P>
                  <Eq>{'R_{23} = \\frac{20 \\times 30}{20 + 30} = \\frac{600}{50} = 12\\ \\Omega'}</Eq>
                  <P>Luego resistencia total:</P>
                  <Eq>{'R_T = R_1 + R_{23} = 10 + 12 = 22\\ \\Omega'}</Eq>
                  <P>Corriente total:</P>
                  <Eq>{'I = \\frac{V}{R_T} = \\frac{24}{22} = 1.09\\ \\text{A}'}</Eq>
                </>
              }
            />
          </Section>

          <Section title="Divisor de tensión y divisor de corriente">
            <Sub title="Divisor de tensión (serie)">
              <Eq>{'V_{R_1} = V_S \\cdot \\frac{R_1}{R_1 + R_2}'}</Eq>
            </Sub>
            <Sub title="Divisor de corriente (paralelo)">
              <Eq>{'I_1 = I_T \\cdot \\frac{R_2}{R_1 + R_2}'}</Eq>
            </Sub>
            <Aviation title="Potenciómetros en aviónica">
              Los divisores de tensión (potenciómetros) son fundamentales en aviónica: controlan la ganancia de amplificadores, ajustan el cero de instrumentos y establecen puntos de consigna en sistemas de control automático de vuelo (AFCS).
            </Aviation>
          </Section>

          <Summary items={[
            'LCK (nodos): ∑I = 0. La corriente que entra en un nodo es igual a la que sale.',
            'LTK (mallas): ∑V = 0. La suma de tensiones en una malla cerrada es cero.',
            'Serie: Rₜ = R₁ + R₂ + …; misma corriente. Paralelo: 1/Rₜ = 1/R₁ + 1/R₂ + …; misma tensión.',
          ]} />

          <Solved n="3.6.A" title="Análisis de circuito del sistema de luces de aterrizaje">
            {{
              q: <P>Un avión tiene tres luces de aterrizaje en paralelo en el bus de 28 V: L1 = 100 W, L2 = 100 W, L3 = 150 W. Calcula: (a) resistencia equivalente de cada bombilla, (b) corriente total que extrae del bus, (c) aplicando la LCK, verifica que la corriente del bus es la suma de las corrientes individuales.</P>,
              a: <>
                <P><strong>(a) Resistencias:</strong> <EqI>{'R = V^2/P'}</EqI></P>
                <Eq>{'R_1 = R_2 = \\frac{28^2}{100} = 7.84\\ \\Omega \\qquad R_3 = \\frac{28^2}{150} = 5.23\\ \\Omega'}</Eq>
                <P><strong>(b) Corrientes individuales:</strong></P>
                <Eq>{'I_1 = I_2 = \\frac{28}{7.84} = 3.57\\ \\text{A} \\qquad I_3 = \\frac{28}{5.23} = 5.36\\ \\text{A}'}</Eq>
                <P><strong>(c) LCK en el nodo del bus:</strong></P>
                <Eq>{'I_{total} = I_1 + I_2 + I_3 = 3.57 + 3.57 + 5.36 = 12.5\\ \\text{A}'}</Eq>
                <P>Verificación: <EqI>{'I_{total} = P_{total}/V = 350/28 = 12.5\\ \\text{A}'}</EqI> ✓. El fusible del circuito de luces de aterrizaje debe ser de 15 A.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Tres resistencias de 6 Ω, 12 Ω y 4 Ω están conectadas en paralelo a 24 V. Calcula la resistencia equivalente y la corriente total.</P>,
              a: <><Eq>{'\\frac{1}{R_T} = \\frac{1}{6}+\\frac{1}{12}+\\frac{1}{4} = 0.167+0.083+0.25 = 0.5 \\Rightarrow R_T = 2\\ \\Omega'}</Eq><Eq>{'I_T = 24/2 = 12\\ \\text{A}'}</Eq></>
            },
            {
              n: 2,
              q: <P>Aplica la LTK a una malla que contiene: batería de 28 V, R1 = 2 Ω, R2 = 5 Ω. ¿Cuál es la corriente de la malla?</P>,
              a: <><Eq>{'28 - I\\cdot2 - I\\cdot5 = 0 \\Rightarrow I = \\frac{28}{7} = 4\\ \\text{A}'}</Eq></>
            },
            {
              n: 3,
              q: <P>Un divisor de tensión se usa para obtener una referencia de 5 V para un sensor desde el bus de 28 V. Si R1 (parte superior) = 23 kΩ, ¿qué valor debe tener R2 (parte inferior)?</P>,
              a: <><P>Del divisor: <EqI>{'V_2 = V_S \\cdot R_2/(R_1+R_2)'}</EqI></P><Eq>{'5 = 28 \\cdot \\frac{R_2}{23000+R_2} \\Rightarrow R_2 = \\frac{5 \\times 23000}{28-5} = 5000\\ \\Omega = 5\\ \\text{k}\\Omega'}</Eq></>
            },
            {
              n: 4,
              q: <P>En el sistema eléctrico de un avión, ¿por qué los sistemas críticos (instrumentos de vuelo, radio) están en circuitos separados con sus propios fusibles en lugar de un único fusible grande?</P>,
              a: <><P><strong>R:</strong> Para garantizar <strong>aislamiento de fallos</strong>. Si todos los sistemas compartieran un solo fusible y uno sufriera un cortocircuito, todos los sistemas fallarían. Con fusibles individuales, solo el sistema en fallo se desconecta, manteniendo operativos todos los demás (principio de seguridad por diseño, EASA AMC 25.1309).</P></>
            },
            {
              n: 5,
              q: <P>Dos resistencias de 100 Ω y 150 Ω están en serie, y esta serie está en paralelo con 60 Ω. El conjunto se alimenta a 30 V. Calcula la corriente que circula por la resistencia de 60 Ω.</P>,
              a: <><P>Serie: <EqI>{'R_{serie} = 100+150 = 250\\ \\Omega'}</EqI>. Paralelo: <EqI>{'R_T = (250 \\times 60)/(250+60) = 48.4\\ \\Omega'}</EqI>.</P><Eq>{'I_{60} = \\frac{30}{60} = 0.5\\ \\text{A}'}</Eq></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.7 RESISTENCIA Y RESISTORES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-07',
      title: '3.7 Resistencia y resistores',
      body: (
        <>
          <Fig src={IMG.resistors} alt="Resistencias electrónicas" height={170}
            caption={<><strong>Figura 3.12</strong> Surtido de resistencias de película de carbono y película metálica. El código de colores permite leer el valor directamente. Las resistencias de alta potencia son de bobinado sobre cerámica (wirewound).</>}
          />

          <Section title="Resistividad y factores que afectan la resistencia">
            <P>La <strong>resistencia</strong> de un conductor depende del material y de su geometría:</P>
            <Eq>{'R = \\rho \\cdot \\frac{L}{A} \\qquad [\\Omega]'}</Eq>
            <DefList items={[
              { term: 'ρ [Ω·m]', def: 'Resistividad del material (propiedad intrínseca). Cu: 1.7×10⁻⁸; Al: 2.8×10⁻⁸; Ni-Cr (Nichrome): 1.1×10⁻⁶ Ω·m.' },
              { term: 'L [m]', def: 'Longitud del conductor.' },
              { term: 'A [m²]', def: 'Sección transversal (área). Mayor sección → menor resistencia.' },
            ]} />
            <P>La resistencia varía con la temperatura:</P>
            <Eq>{'R_T = R_0 \\left[1 + \\alpha(T - T_0)\\right]'}</Eq>
            <P>donde <EqI>{'\\alpha'}</EqI> es el <strong>coeficiente de temperatura de resistencia (TCR)</strong>. Los metales tienen α positivo (mayor temperatura → mayor resistencia). Los semiconductores tienen α negativo (NTC).</P>
            <Example n="3.5" title="Resistencia de un cable de cobre"
              given={<P>Cable de cobre de 10 m de longitud y sección de 2.5 mm². <EqI>{'\\rho_{Cu} = 1.72 \\times 10^{-8}\\ \\Omega\\cdot\\text{m}'}</EqI>.</P>}
              solution={
                <>
                  <Eq>{'R = \\rho \\frac{L}{A} = 1.72 \\times 10^{-8} \\cdot \\frac{10}{2.5 \\times 10^{-6}} = 0.069\\ \\Omega \\approx 69\\ \\text{m}\\Omega'}</Eq>
                  <P>La resistencia del cable es 69 mΩ. Para una corriente de 10 A, la caída de tensión es 0.69 V, lo que podría ser significativa en un bus de 28 V.</P>
                </>
              }
            />
          </Section>

          <Section title="Código de colores de resistencias">
            <Table
              headers={['Color', 'Dígito / Multiplicador', 'Tolerancia']}
              rows={[
                ['Negro', '0 / ×1', '—'],
                ['Marrón', '1 / ×10', '±1% (banda E)'],
                ['Rojo', '2 / ×100', '±2%'],
                ['Naranja', '3 / ×1 k', '—'],
                ['Amarillo', '4 / ×10 k', '—'],
                ['Verde', '5 / ×100 k', '±0.5%'],
                ['Azul', '6 / ×1 M', '±0.25%'],
                ['Violeta', '7 / ×10 M', '±0.1%'],
                ['Gris', '8 / —', '±0.05%'],
                ['Blanco', '9 / —', '—'],
                ['Dorado', '— / ×0.1', '±5%'],
                ['Plateado', '— / ×0.01', '±10%'],
              ]}
            />
            <Note>Mnemónica inglesa: <strong>B</strong>lack <strong>B</strong>rown <strong>R</strong>ed <strong>O</strong>range <strong>Y</strong>ellow <strong>G</strong>reen <strong>B</strong>lue <strong>V</strong>iolet <strong>G</strong>rey <strong>W</strong>hite = "BB ROY of Great Britain Very Good Wife".</Note>
          </Section>

          <Summary items={[
            'R = ρ·L/A. Mayor longitud → mayor R; mayor sección → menor R.',
            'Los metales aumentan su resistencia con la temperatura (α > 0). Semiconductores: α < 0.',
            'El código de colores permite leer directamente el valor y tolerancia de una resistencia.',
          ]} />

          <Solved n="3.7.A" title="Caída de tensión en el cableado del bus de 28 V">
            {{
              q: <P>El manual aeronáutico permite una caída de tensión máxima de 0.5 V en el cableado de un sistema crítico alimentado a 28 V DC con 8 A. El cable de cobre tiene sección de 1.5 mm². ¿Cuál es la longitud máxima del cable (ida + vuelta) que cumple con el límite? ρ_Cu = 1.72×10⁻⁸ Ω·m.</P>,
              a: <>
                <P>Resistencia máxima permitida:</P>
                <Eq>{'R_{max} = \\frac{V_{caida}}{I} = \\frac{0.5\\ \\text{V}}{8\\ \\text{A}} = 0.0625\\ \\Omega'}</Eq>
                <P>Longitud máxima del cable (ida + vuelta = 2×L):</P>
                <Eq>{'R = \\rho \\frac{L}{A} \\Rightarrow L_{total} = \\frac{R_{max} \\cdot A}{\\rho} = \\frac{0.0625 \\times 1.5\\times10^{-6}}{1.72\\times10^{-8}} = 5.45\\ \\text{m}'}</Eq>
                <P>Cada ramal tiene <strong>L = 5.45 / 2 ≈ 2.7 m</strong>. Si la distancia al equipo supera 2.7 m, se debe usar una sección mayor (2.5 mm²).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Lee el valor y tolerancia de una resistencia con bandas: rojo, violeta, naranja, dorado.</P>,
              a: <><P><strong>R:</strong> Rojo=2, Violeta=7, Naranja=×1k, Dorado=±5%. <strong>R = 27 kΩ ±5%</strong> (rango 25.65–28.35 kΩ).</P></>
            },
            {
              n: 2,
              q: <P>Un termorresistor (RTD de platino, α = 0.00385/°C) tiene R₀ = 100 Ω a 0°C. ¿Qué resistencia presenta a la temperatura de salida del compresor de 150°C?</P>,
              a: <><Eq>{'R_{150} = 100 \\times [1 + 0.00385 \\times 150] = 100 \\times 1.578 = 157.8\\ \\Omega'}</Eq><P>El sistema de medida convierte esta variación de resistencia en una indicación de temperatura calibrada.</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué los resistores de potencia en los controles de motor o calefactores de cabina se montan con disipadores de calor o sobre placas de aluminio en lugar de directamente sobre la PCB?</P>,
              a: <><P><strong>R:</strong> La potencia disipada P = I²R genera calor (efecto Joule). Sin disipador, la temperatura del resistor aumenta hasta quemar el componente o dañar la PCB. Los disipadores aumentan la superficie de intercambio térmico (convección + radiación), manteniendo la temperatura de unión T_j por debajo del límite de diseño. En aviación, los componentes deben operar de −55°C a +85°C (DO-160).</P></>
            },
            {
              n: 4,
              q: <P>Un cable de aluminio AWG 4/0 tiene sección 107 mm² y longitud 15 m. Calcula su resistencia en frío. ρ_Al = 2.82×10⁻⁸ Ω·m.</P>,
              a: <><Eq>{'R = \\rho\\frac{L}{A} = 2.82\\times10^{-8}\\times\\frac{15}{107\\times10^{-6}} = 3.95\\ \\text{m}\\Omega'}</Eq><P>Muy baja resistencia para los cables de potencia del bus principal del avión.</P></>
            },
            {
              n: 5,
              q: <P>Una resistencia de carbono de 4 bandas muestra: verde, azul, rojo, plateado. ¿Cuál es su valor nominal y los valores mínimo y máximo dentro de la tolerancia?</P>,
              a: <><P><strong>R:</strong> Verde=5, Azul=6, Rojo=×100, Plateado=±10%. <strong>R = 5600 Ω = 5.6 kΩ ±10%</strong>. Rango: 5040–6160 Ω.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.8 POTENCIA Y ENERGÍA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-08',
      title: '3.8 Potencia y energía',
      body: (
        <>
          <Fig src={IMG.hvline} alt="Líneas de alta tensión" height={175}
            caption={<><strong>Figura 3.13</strong> Las líneas de alta tensión transportan electricidad a 400 kV para minimizar pérdidas por efecto Joule. La misma potencia (P = V·I) con tensión alta implica corriente baja y pérdidas I²R pequeñas. Este principio explica por qué los aviones modernos usan 270 V DC en lugar de 28 V DC.</>}
          />

          <Section title="Potencia eléctrica">
            <P>La <strong>potencia eléctrica</strong> es la energía transferida por unidad de tiempo. Combinando P = V·I con la Ley de Ohm obtenemos tres formas equivalentes:</P>
            <Eq>{'P = V \\cdot I = I^2 \\cdot R = \\frac{V^2}{R} \\qquad [\\text{W = V·A}]'}</Eq>
            <P>La disipación de potencia en una resistencia produce <strong>calor (efecto Joule)</strong>. Este es el principio de los elementos calefactores (descongeladores de para-brisas, tubos pitot con calefacción).</P>
          </Section>

          <Section title="Energía eléctrica">
            <P>La <strong>energía eléctrica</strong> consumida durante un tiempo t:</P>
            <Eq>{'E = P \\cdot t \\qquad [\\text{J}] \\qquad \\text{o en kWh:} \\quad E[\\text{kWh}] = \\frac{P[\\text{W}] \\cdot t[\\text{h}]}{1000}'}</Eq>
            <Example n="3.6" title="Consumo del tubo Pitot calefactado"
              given={<P>Un tubo Pitot calefactado consume 100 W. Vuelo de 3 horas. ¿Cuánta energía consume? ¿Qué corriente toma del bus de 28 V DC?</P>}
              solution={
                <>
                  <Eq>{'E = P \\cdot t = 100\\ \\text{W} \\times 3\\ \\text{h} = 300\\ \\text{Wh} = 0.3\\ \\text{kWh}'}</Eq>
                  <Eq>{'I = \\frac{P}{V} = \\frac{100}{28} = 3.57\\ \\text{A}'}</Eq>
                  <P>El pitot consume 3.57 A del bus de 28 V DC durante 3 horas.</P>
                </>
              }
            />
          </Section>

          <Section title="Eficiencia eléctrica">
            <P>Todo dispositivo eléctrico tiene pérdidas. La <strong>eficiencia</strong> es la relación entre potencia útil y potencia consumida:</P>
            <Eq>{'\\eta = \\frac{P_{\\text{útil}}}{P_{\\text{entrada}}} \\times 100\\% \\qquad \\text{Pérdidas} = P_{\\text{entrada}} - P_{\\text{útil}}'}</Eq>
            <Aviation title="Eficiencia del alternador de aeronave">
              El alternador de una aeronave de pistón tiene eficiencia típica del 70–80%. Si entrega 60 A a 14 V (840 W útiles), absorbe del motor ~1050–1200 W mecánicos. Esta potencia mecánica se traduce en un incremento del consumo de combustible.
            </Aviation>
          </Section>

          <Summary items={[
            'P = V·I = I²R = V²/R. Se mide en Vatios (W).',
            'E = P·t. Se mide en Julios (J) o kilovatiohora (kWh).',
            'El efecto Joule (calor por paso de corriente) se usa en descongeladores y pitots calefactados.',
            'Eficiencia η = P_útil / P_entrada × 100%.',
          ]} />

          <Solved n="3.8.A" title="Balance energético del sistema eléctrico de un avión">
            {{
              q: <P>Un avión de turbohélice en crucero tiene los siguientes consumos del bus de 28 V DC: aviónica 450 W, luces 120 W, pitots calefactados 200 W, motor de bomba hidráulica 350 W. El alternador tiene η = 75%. Calcula: (a) potencia eléctrica total generada, (b) potencia mecánica absorbida del motor, (c) corriente suministrada por el alternador.</P>,
              a: <>
                <P><strong>(a) Potencia eléctrica total:</strong></P>
                <Eq>{'P_{elec} = 450 + 120 + 200 + 350 = 1120\\ \\text{W}'}</Eq>
                <P><strong>(b) Potencia mecánica absorbida:</strong></P>
                <Eq>{'P_{mec} = \\frac{P_{elec}}{\\eta} = \\frac{1120}{0.75} = 1493\\ \\text{W} \\approx 1.5\\ \\text{kW} \\approx 2\\ \\text{CV}'}</Eq>
                <P><strong>(c) Corriente del alternador:</strong></P>
                <Eq>{'I = \\frac{P_{elec}}{V} = \\frac{1120}{28} = 40\\ \\text{A}'}</Eq>
                <P>El alternador debe estar clasificado para al menos 40 A. Esto es solo un 53% del margen típico (75 A), dejando capacidad para picos de arranque.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>El descongelador del para-brisas de un avión de entrenamiento consume 5 A del bus de 28 V DC durante un vuelo de 45 minutos. Calcula la potencia y la energía consumida en Wh.</P>,
              a: <><Eq>{'P = 28 \\times 5 = 140\\ \\text{W} \\qquad E = 140 \\times \\frac{45}{60} = 105\\ \\text{Wh}'}</Eq></>
            },
            {
              n: 2,
              q: <P>Un relé del bus de 28 V tiene una bobina de 100 Ω. ¿Cuánta potencia disipa la bobina cuando está energizada? ¿Y si la tensión sube a 32 V por mal funcionamiento del regulador?</P>,
              a: <><Eq>{'P_{28} = V^2/R = 28^2/100 = 7.84\\ \\text{W} \\qquad P_{32} = 32^2/100 = 10.24\\ \\text{W}'}</Eq><P>Un aumento del 14% en tensión causa un aumento del 30% en la potencia disipada, lo que puede sobrecalentar la bobina si no está diseñada para ello.</P></>
            },
            {
              n: 3,
              q: <P>¿Cuántos kWh consume el sistema eléctrico completo de un A320 (aproximadamente 180 kW de potencia eléctrica) en un vuelo de 2.5 horas?</P>,
              a: <><Eq>{'E = 180\\ \\text{kW} \\times 2.5\\ \\text{h} = 450\\ \\text{kWh}'}</Eq><P>Esta energía proviene del combustible quemado en los motores; es un dato relevante para calcular el consumo extra por carga eléctrica.</P></>
            },
            {
              n: 4,
              q: <P>Un motor DC de 28 V tiene rendimiento η = 80% y mueve una bomba de combustible. La bomba necesita 560 W mecánicos. Calcula la corriente que extrae del bus DC.</P>,
              a: <><Eq>{'P_{elec} = P_{mec}/\\eta = 560/0.8 = 700\\ \\text{W} \\qquad I = 700/28 = 25\\ \\text{A}'}</Eq></>
            },
            {
              n: 5,
              q: <P>Explica el principio físico del tubo Pitot calefactado. ¿Qué pasaría si el sistema de calefacción falla en condiciones IMC con hielo?</P>,
              a: <><P><strong>R:</strong> El pitot usa el <strong>efecto Joule</strong>: una resistencia eléctrica interna genera calor (P = I²R) que mantiene el tubo por encima de 0°C, evitando que el agua congele y obstruya el orificio de medida de presión dinámica. Si falla: el hielo obstruye la entrada, el indicador de velocidad deja de funcionar correctamente (puede indicar velocidad constante o errática). Sin indicación de velocidad fiable en IMC, el piloto pierde un instrumento crítico → accidente potencial. El AF447 en 2009 fue causado parcialmente por pitots obstruidos.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.9 CAPACITANCIA Y CONDENSADORES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-09',
      title: '3.9 Capacitancia y condensadores',
      body: (
        <>
          <Fig src={IMG.caps} alt="Condensadores electrolíticos" height={170}
            caption={<><strong>Figura 3.14</strong> Condensadores electrolíticos de aluminio. Son los más usados en fuentes de alimentación de aviónica para filtrar el rizado de la tensión rectificada. El valor y la tensión máxima están marcados en el cuerpo.</>}
          />

          <Section title="Principio del condensador">
            <P>Un <strong>condensador</strong> (o capacitor) es un dispositivo que almacena energía en un <strong>campo eléctrico</strong>. En su forma más simple consta de dos placas conductoras paralelas separadas por un dieléctrico (aislante).</P>
            <SvgFig caption={<><strong>Figura 3.15</strong> Condensador de placas paralelas con dieléctrico. La carga positiva (+Q) se acumula en una placa y la negativa (−Q) en la otra. El campo eléctrico E = V/d existe solo entre las placas.</>}>
              <DiagramCondensador />
            </SvgFig>
            <P>La <strong>capacitancia C</strong> es la carga almacenada por unidad de tensión aplicada:</P>
            <Eq>{'C = \\frac{Q}{V} \\qquad [\\text{F (Faradio)}] \\qquad C = \\varepsilon_0 \\varepsilon_r \\frac{A}{d}'}</Eq>
            <P>La energía almacenada en un condensador cargado:</P>
            <Eq>{'E = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} \\qquad [\\text{J}]'}</Eq>
          </Section>

          <Section title="Condensadores en serie y paralelo">
            <Sub title="En paralelo">
              <Eq>{'C_T = C_1 + C_2 + C_3 \\quad (\\text{como la resistencia en serie})'}</Eq>
            </Sub>
            <Sub title="En serie">
              <Eq>{'\\frac{1}{C_T} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3} \\quad (\\text{como la resistencia en paralelo})'}</Eq>
            </Sub>
          </Section>

          <Section title="Respuesta al escalón — carga y descarga RC">
            <P>Cuando se conecta un condensador C en serie con una resistencia R a una fuente de tensión V₀, la tensión en el condensador varía exponencialmente:</P>
            <Eq>{'v_C(t) = V_0\\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = R \\cdot C \\quad (\\text{constante de tiempo})'}</Eq>
            <Note>Tras un tiempo de 5τ el condensador está cargado al 99.3%. En la descarga: <EqI>{'v_C(t) = V_0\\,e^{-t/\\tau}'}</EqI>.</Note>
          </Section>

          <Section title="Aplicaciones en aviónica">
            <DefList items={[
              { term: 'Filtros de alimentación', def: 'Condensadores de 100–4700 μF en las fuentes de alimentación filtran el rizado de CA rectificada (ripple). Sin ellos, el ruido afectaría a los receptores de radio.' },
              { term: 'Bypass de HF', def: 'Condensadores de 100 nF en paralelo con la alimentación de cada CI drenan a tierra las componentes de alta frecuencia del ruido digital.' },
              { term: 'Temporizadores', def: 'Los circuitos RC generan retardos precisos en sistemas de antiskid, temporizadores de luces de advertencia y monoestables.' },
              { term: 'Sensores capacitivos', def: 'Los depósitos de combustible modernos usan sondas capacitivas: la cantidad de combustible cambia el dieléctrico entre las placas, variando C de forma proporcional al nivel.' },
            ]} />
          </Section>

          <Summary items={[
            'C = Q/V [F]. Un condensador almacena E = ½CV² en el campo eléctrico entre sus placas.',
            'C = ε₀εᵣA/d. Mayor área y dieléctrico con alto εᵣ → mayor capacitancia.',
            'Constante de tiempo: τ = RC. Tras 5τ el condensador está prácticamente cargado/descargado.',
            'Usos en aviónica: filtros de rizado, bypass de HF, temporizadores, sensores de nivel de combustible.',
          ]} />

          <Solved n="3.9.A" title="Sensor capacitivo de nivel de combustible">
            {{
              q: <P>Un depósito de combustible usa una sonda capacitiva formada por dos placas paralelas sumergidas de A = 0.3 m², separadas d = 2 mm. Con depósito lleno (Jet A-1, εᵣ = 2.0) la capacitancia es C_lleno. Con depósito vacío (εᵣ_aire = 1.0) es C_vacío. Calcula ambos valores y el porcentaje de cambio que debe detectar el sistema de medida.</P>,
              a: <>
                <Eq>{'C_{vacío} = \\varepsilon_0 \\frac{A}{d} = 8.85\\times10^{-12} \\times \\frac{0.3}{2\\times10^{-3}} = 1.33\\ \\text{nF}'}</Eq>
                <Eq>{'C_{lleno} = \\varepsilon_0 \\varepsilon_r \\frac{A}{d} = 2.0 \\times 1.33 = 2.65\\ \\text{nF}'}</Eq>
                <P>Variación relativa: <EqI>{'\\Delta C/C = (2.65-1.33)/1.33 = 99\\%'}</EqI>. El circuito oscilador de la sonda detecta este cambio del 99% entre vacío y lleno, con resolución suficiente para los &lt;1% de precisión requeridos en aviones de transporte (EASA CS-25).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un condensador de 100 μF se carga a 400 V en la fuente de alimentación de un sistema de aviónica. ¿Qué energía almacena? ¿Por qué representa un peligro eléctrico incluso con la alimentación desconectada?</P>,
              a: <><Eq>{'E = \\frac{1}{2}CV^2 = \\frac{1}{2}\\times100\\times10^{-6}\\times400^2 = 8\\ \\text{J}'}</Eq><P>8 J es energía suficiente para causar quemaduras graves o fibrilación ventricular. Los condensadores de alta tensión deben descargarse con una resistencia de descarga antes de cualquier trabajo de mantenimiento (EASA Part-66 Safety).</P></>
            },
            {
              n: 2,
              q: <P>Calcula la constante de tiempo τ de un circuito RC con R = 22 kΩ y C = 47 μF. ¿Cuánto tiempo tarda el condensador en cargarse al 95% de la tensión aplicada?</P>,
              a: <><Eq>{'\\tau = RC = 22000 \\times 47\\times10^{-6} = 1.034\\ \\text{s}'}</Eq><P>Al 95% (≈ 3τ): t = 3 × 1.034 ≈ <strong>3.1 s</strong>. Al 99.3% (5τ): t ≈ 5.2 s.</P></>
            },
            {
              n: 3,
              q: <P>¿Cómo se combinan tres condensadores de 10 μF, 22 μF y 47 μF en paralelo? ¿Y en serie? Calcula ambas capacitancias equivalentes.</P>,
              a: <><P><strong>Paralelo:</strong></P><Eq>{'C_T = 10+22+47 = 79\\ \\mu\\text{F}'}</Eq><P><strong>Serie:</strong></P><Eq>{'\\frac{1}{C_T} = \\frac{1}{10}+\\frac{1}{22}+\\frac{1}{47} = 0.1+0.0455+0.0213 = 0.167 \\Rightarrow C_T = 6.0\\ \\mu\\text{F}'}</Eq></>
            },
            {
              n: 4,
              q: <P>Un condensador de bypass de 100 nF está instalado en la alimentación de un microprocesador de aviónica. ¿Qué frecuencia de ruido atenúa más eficazmente si la resistencia de la pista de PCB es 0.1 Ω?</P>,
              a: <><P>La frecuencia de resonancia del circuito RC (punto de máxima atenuación de ruido):</P><Eq>{'f_c = \\frac{1}{2\\pi RC} = \\frac{1}{2\\pi \\times 0.1 \\times 100\\times10^{-9}} = 15.9\\ \\text{MHz}'}</Eq><P>Atenúa efectivamente el ruido digital a frecuencias alrededor de 16 MHz, típico de la frecuencia de reloj de los microprocesadores de aviónica.</P></>
            },
            {
              n: 5,
              q: <P>Explica por qué los condensadores electrolíticos tienen una polaridad definida (marcada con + y −) y qué ocurre si se conectan al revés en un circuito de aviónica.</P>,
              a: <><P><strong>R:</strong> Los condensadores electrolíticos usan una película de óxido de aluminio como dieléctrico, formada electroquímicamente con una polaridad fija. Al conectarlos al revés, la reacción electroquímica inversa destruye la película de óxido, reduciendo la resistencia a casi cero. El condensador se calienta rápidamente, puede generar gas y explotar o quemarse. En aviónica esto puede causar incendio en la PCB. Siempre verificar la polaridad con el multímetro antes de instalar un condensador electrolítico (EASA Part-145.A.45).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.10 MAGNETISMO
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-10',
      title: '3.10 Magnetismo',
      body: (
        <>
          <Fig src={IMG.magnets} alt="Campo magnético de antenas" height={175}
            caption={<><strong>Figura 3.16</strong> Las torres de telecomunicaciones y los sistemas de navegación aeronáutica explotan los campos electromagnéticos. El magnetismo y la electricidad son dos aspectos del mismo fenómeno: el electromagnetismo (Maxwell, 1864).</>}
          />

          <Section title="Campo magnético B">
            <P>El <strong>campo magnético</strong> es la región del espacio donde se ejerce fuerza sobre imanes o cargas en movimiento. Se cuantifica con el vector <strong>B</strong> (inducción magnética), en <strong>Tesla [T]</strong>.</P>
            <P>Las líneas de campo magnético forman lazos cerrados, siempre desde el polo Norte (N) hasta el polo Sur (S) fuera del imán, y de S a N en su interior. <strong>No existen monopolos magnéticos aislados.</strong></P>
          </Section>

          <Section title="Campo magnético de un conductor con corriente">
            <P>Un conductor que transporta corriente genera un campo magnético circular a su alrededor (Oersted, 1820). La intensidad varía con la distancia:</P>
            <Eq>{'B = \\frac{\\mu_0 I}{2\\pi r} \\qquad \\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T·m/A}'}</Eq>
            <SvgFig caption={<><strong>Figura 3.17</strong> Campo magnético circular alrededor de un conductor que transporta corriente hacia el lector (punto ⊙). Las líneas de B son círculos concéntricos. La regla de la mano derecha: si el pulgar señala el sentido de I, los dedos curvados indican el sentido de B.</>}>
              <DiagramCampoMagnetico />
            </SvgFig>
          </Section>

          <Section title="Solenoide y electroimán">
            <P>Un <strong>solenoide</strong> es una bobina helicoidal. Su campo interno es uniforme y análogo al de un imán de barra:</P>
            <Eq>{'B = \\mu_0 \\mu_r n I \\qquad n = N/L\\ (\\text{espiras por metro})'}</Eq>
            <SvgFig caption={<><strong>Figura 3.18</strong> Campo magnético de un solenoide. Las líneas de B son prácticamente uniformes en el interior. El extremo por donde salen (→) es el polo Norte; el extremo por donde entran es el polo Sur.</>}>
              <DiagramSolenoide />
            </SvgFig>
            <Aviation title="Aplicaciones aeronáuticas del magnetismo">
              Los electroimanes son la base de: solenoides de válvulas hidráulicas/neumáticas, relés y contactores del bus eléctrico, altavoces del sistema de audio de cabina, bridas magnéticas de puertas de emergencia, sensores de posición inductivos (LVDT) en actuadores de vuelo.
            </Aviation>
          </Section>

          <Section title="Fuerza sobre conductor en campo magnético">
            <P>Un conductor de longitud L que lleva corriente I en un campo B experimenta la fuerza de Lorentz:</P>
            <Eq>{'F = B \\cdot I \\cdot L \\cdot \\sin\\theta \\qquad [\\text{N}]'}</Eq>
            <P>donde θ es el ángulo entre el conductor y el campo B. Esta fuerza es la base de los <strong>motores eléctricos</strong>.</P>
          </Section>

          <Summary items={[
            'B [T] es el vector de inducción magnética. Las líneas van de N a S fuera del imán.',
            'B = μ₀I/(2πr) alrededor de un conductor recto.',
            'B = μ₀μᵣnI dentro de un solenoide (campo uniforme).',
            'La fuerza sobre un conductor: F = B·I·L·sinθ — base del motor eléctrico.',
          ]} />

          <Solved n="3.10.A" title="Campo magnético en el solenoide de una válvula hidráulica">
            {{
              q: <P>Un solenoide de válvula hidráulica de avión tiene N = 500 espiras, longitud ℓ = 5 cm, núcleo de hierro dulce (μᵣ = 1200) y se alimenta con I = 0.5 A. Calcula el campo magnético interior B y la fuerza sobre un conductor de L = 2 cm que lleva 0.5 A perpendicular al campo.</P>,
              a: <>
                <Eq>{'n = N/\\ell = 500/0.05 = 10\\,000\\ \\text{espiras/m}'}</Eq>
                <Eq>{'B = \\mu_0 \\mu_r n I = 4\\pi\\times10^{-7} \\times 1200 \\times 10000 \\times 0.5 = 7.54\\ \\text{T}'}</Eq>
                <P>Fuerza sobre el conductor interno (arrastre de la válvula):</P>
                <Eq>{'F = BIL\\sin90° = 7.54 \\times 0.5 \\times 0.02 = 0.075\\ \\text{N} = 75\\ \\text{mN}'}</Eq>
                <P>Esta fuerza es suficiente para accionar la válvula hidráulica contra la presión del resorte de retorno, abriendo el paso de fluido hidráulico.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿A qué distancia de un cable recto que lleva 100 A (cable del motor de arranque) el campo magnético B es igual al campo terrestre (B_tierra ≈ 50 μT)? ¿Podría afectar a la brújula magnética?</P>,
              a: <><Eq>{'r = \\frac{\\mu_0 I}{2\\pi B} = \\frac{4\\pi\\times10^{-7}\\times100}{2\\pi\\times50\\times10^{-6}} = 0.4\\ \\text{m} = 40\\ \\text{cm}'}</Eq><P>A 40 cm el campo del cable iguala al terrestre. Si la brújula está a menos de 40 cm de cables de alta corriente, la desviación magnética (deviation) puede ser inaceptable. Los instaladores deben mantener los cables del motor lejos de la brújula (mínimo 50–100 cm).</P></>
            },
            {
              n: 2,
              q: <P>Aplica la regla de la mano derecha para determinar el polo Norte de un solenoide cuya corriente entra por la derecha del enrollado en sentido antihorario visto desde la derecha.</P>,
              a: <><P><strong>R:</strong> Si los dedos curvados de la mano derecha siguen el sentido de la corriente (antihorario visto desde la derecha), el pulgar apunta hacia la <strong>izquierda</strong> → el polo Norte está en el <strong>extremo izquierdo</strong> del solenoide.</P></>
            },
            {
              n: 3,
              q: <P>Un contactor del bus principal de 28 V tiene una bobina solenoide de 25 Ω que se activa a 24 V. Calcula la corriente de la bobina y la potencia disipada en el solenoide.</P>,
              a: <><Eq>{'I = V/R = 24/25 = 0.96\\ \\text{A} \\qquad P = I^2 R = (0.96)^2 \\times 25 = 23\\ \\text{W}'}</Eq><P>Esta potencia disipada calienta el contactor, por lo que tienen límites de ciclo de trabajo (duty cycle) en los AMMs.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es el LVDT (Linear Variable Differential Transformer) y por qué se usa en actuadores de superficie de control en lugar de potenciómetros?</P>,
              a: <><P><strong>R:</strong> El LVDT es un sensor inductivo de posición lineal sin contacto: un núcleo de hierro móvil dentro de tres bobinas (primario central, dos secundarios) varía el acoplamiento magnético al desplazarse. Ventajas frente al potenciómetro: no tiene contactos deslizantes (sin desgaste, sin ruido eléctrico, sin fricción), operación en entornos hostiles (vibración, temperatura, fluido hidráulico), resolución prácticamente infinita y muy alta fiabilidad. Ideal para actuadores de flap, tren de aterrizaje y superficies de control primarias.</P></>
            },
            {
              n: 5,
              q: <P>Aplica la Ley de la mano izquierda de Fleming para determinar la dirección de la fuerza sobre un conductor horizontal que lleva corriente hacia el Norte, situado en un campo magnético que apunta hacia el Este.</P>,
              a: <><P><strong>R:</strong> Mano izquierda (motor): índice → Este (B), dedo corazón → Norte (I), pulgar → <strong>arriba (fuerza F vertical hacia arriba)</strong>. Esta dirección de fuerza es la que convierte la energía eléctrica en movimiento en el motor DC.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.11 INDUCTANCIA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-11',
      title: '3.11 Inductancia e inductores',
      body: (
        <>
          <Fig src={IMG.coil} alt="Bobinas inductoras" height={175}
            caption={<><strong>Figura 3.19</strong> Inductores de ferrita y bobinas de RF. La inductancia es la capacidad de una bobina de almacenar energía en el campo magnético y oponerse a los cambios de corriente. Son fundamentales en filtros y convertidores DC/DC de aviónica.</>}
          />

          <Section title="Autoinducción">
            <P>Cuando la corriente en un inductor varía, el campo magnético que crea también varía, induciendo una f.e.m. en la propia bobina (autoinducción) que se opone al cambio (Lenz):</P>
            <Eq>{'\\varepsilon = -L \\frac{dI}{dt} \\qquad L\\ [\\text{H (Henrio)}]'}</Eq>
            <P>La inductancia L de una bobina depende de su geometría y del núcleo magnético:</P>
            <Eq>{'L = \\mu_0 \\mu_r \\frac{N^2 A}{\\ell} \\qquad [\\text{H}]'}</Eq>
            <P>La energía almacenada en el campo magnético del inductor:</P>
            <Eq>{'E = \\frac{1}{2} L I^2 \\qquad [\\text{J}]'}</Eq>
          </Section>

          <Section title="Respuesta al escalón — circuito RL">
            <P>Cuando se conecta un inductor L con una resistencia R a una tensión V₀:</P>
            <Eq>{'i(t) = \\frac{V_0}{R}\\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = \\frac{L}{R}'}</Eq>
            <Note>El inductor se opone a los cambios bruscos de corriente. En el momento de conectar el circuito actúa como circuito abierto (i = 0). Al desconectar puede generar tensiones muy elevadas (picos de conmutación) que dañan semiconductores si no hay protección.</Note>
          </Section>

          <Section title="Reactancia inductiva en CA">
            <P>En un circuito de corriente alterna, el inductor presenta una <strong>reactancia</strong> que aumenta con la frecuencia:</P>
            <Eq>{'X_L = 2\\pi f L = \\omega L \\qquad [\\Omega]'}</Eq>
            <Aviation title="Convertidores DC/DC en aviónica">
              Los convertidores DC/DC (SMPS) de los equipos de aviónica usan inductores de ferrita para almacenar y transferir energía. La bobina actúa como acumulador de energía magnética que suaviza la corriente de salida. Frecuencias típicas: 100 kHz–1 MHz para minimizar el tamaño del inductor.
            </Aviation>
          </Section>

          <Summary items={[
            'ε = −L·dI/dt. El inductor genera una f.e.m. que se opone al cambio de corriente (Lenz).',
            'E = ½LI² — energía almacenada en el campo magnético.',
            'Constante de tiempo RL: τ = L/R.',
            'Reactancia inductiva: XL = 2πfL. Aumenta con la frecuencia.',
          ]} />

          <Solved n="3.11.A" title="Pico de tensión al desconectar un relé de avión">
            {{
              q: <P>Un relé de avión tiene una bobina de L = 50 mH y R = 25 Ω, alimentada a 28 V DC. Al cortar bruscamente la corriente en t = 0 (apertura del contactor en τ = 2 ms), estima la f.e.m. pico inducida si la corriente cae de su valor nominal a cero en 0.1 ms.</P>,
              a: <>
                <P>Corriente en estado estacionario antes de cortar:</P>
                <Eq>{'I_0 = V/R = 28/25 = 1.12\\ \\text{A}'}</Eq>
                <P>F.E.M. de autoinducción (pico):</P>
                <Eq>{'|\\varepsilon| = L \\left|\\frac{dI}{dt}\\right| = 50\\times10^{-3} \\times \\frac{1.12}{0.1\\times10^{-3}} = 560\\ \\text{V}'}</Eq>
                <P>Este pico de 560 V puede destruir transistores y CIs cercanos en el bus. Por eso cada bobina de relé aeronáutico lleva un <strong>diodo de rueda libre (flyback diode)</strong> en paralelo que absorbe el pico de tensión, limitándola a ~28.7 V.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Calcula la reactancia inductiva de una bobina de 100 mH a 50 Hz (red terrestre) y a 400 Hz (bus AC de avión). ¿Por qué los motores de avión son más pequeños que los terrestres de igual potencia?</P>,
              a: <><Eq>{'X_{L50} = 2\\pi \\times 50 \\times 0.1 = 31.4\\ \\Omega \\qquad X_{L400} = 2\\pi \\times 400 \\times 0.1 = 251\\ \\Omega'}</Eq><P>A 400 Hz la reactancia es 8× mayor. Para la misma potencia, el motor necesita 8× menos inductancia → núcleo magnético 8× más pequeño y ligero. Clave del ahorro de peso en sistemas eléctricos de aviación.</P></>
            },
            {
              n: 2,
              q: <P>Un circuito RL con L = 200 mH y R = 100 Ω se conecta a 28 V. Calcula la constante de tiempo τ y la corriente al cabo de τ segundos.</P>,
              a: <><Eq>{'\\tau = L/R = 0.2/100 = 2\\ \\text{ms}'}</Eq><Eq>{'i(\\tau) = \\frac{V}{R}(1-e^{-1}) = \\frac{28}{100} \\times 0.632 = 177\\ \\text{mA}'}</Eq></>
            },
            {
              n: 3,
              q: <P>¿Por qué los convertidores DC/DC (SMPS) de aviónica trabajan a 100 kHz–1 MHz en lugar de a 50/60 Hz? Relaciona con la inductancia y el tamaño del componente.</P>,
              a: <><P><strong>R:</strong> La inductancia necesaria L = V·Δt/ΔI. A mayor frecuencia, menor Δt por ciclo, por tanto se necesita <strong>menor L</strong> para el mismo rizado de corriente. Menor L significa una bobina más pequeña y ligera. A 100 kHz la inductancia necesaria es 2000× menor que a 50 Hz. Esto permite SMPS de aviónica del tamaño de una caja de cerillas en lugar del tamaño de un transformador de potencia.</P></>
            },
            {
              n: 4,
              q: <P>Un inductor almacena energía en su campo magnético. Calcula la energía almacenada en una bobina de L = 5 mH que lleva I = 10 A (como la bobina de un contactor del bus principal).</P>,
              a: <><Eq>{'E = \\frac{1}{2}LI^2 = \\frac{1}{2}\\times5\\times10^{-3}\\times100 = 0.25\\ \\text{J}'}</Eq><P>Esta energía se libera en forma de pico de tensión al cortar la corriente, de ahí la necesidad del diodo de rueda libre en cada contactor de potencia.</P></>
            },
            {
              n: 5,
              q: <P>Explica qué es la "reactancia" en términos físicos: ¿es una disipación de energía como la resistencia? ¿Qué diferencia hay entre resistencia e inductancia en cuanto a la energía?</P>,
              a: <><P><strong>R:</strong> La <strong>reactancia</strong> no disipa energía: solo la <strong>almacena y devuelve</strong> al circuito. La inductancia almacena energía en el campo magnético (E = ½LI²) durante medio ciclo y la devuelve durante el otro medio ciclo. La <strong>resistencia</strong> sí disipa energía irreversiblemente en forma de calor (P = I²R). El desfase de 90° entre tensión y corriente en un inductor ideal hace que la potencia media sea cero (no hay disipación neta).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.12 MOTORES Y GENERADORES DC
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-12',
      title: '3.12 Motores y generadores DC',
      body: (
        <>
          <Fig src={IMG.motor} alt="Motor eléctrico de aeronave" height={180}
            caption={<><strong>Figura 3.20</strong> Motor DC de arranque de motor aeronáutico. Convierte energía eléctrica (28 V DC) en energía mecánica para llevar el motor de la aeronave a la velocidad de encendido. La mayoría de los motores auxiliares de avión son DC por su excelente control de velocidad.</>}
          />

          <Section title="Principio del motor DC">
            <P>Un motor DC aplica la <strong>fuerza de Lorentz</strong> sobre conductores activos (devanado de armadura) situados en un campo magnético (inductor o imán permanente). La dirección del par resultante se determina con la <strong>regla de Fleming de la mano izquierda</strong> (motor): <em>índice = B, dedo corazón = I, pulgar = fuerza F.</em></P>
            <Eq>{'F = B \\cdot I \\cdot L \\quad [\\text{N}] \\qquad T = F \\cdot r = B \\cdot I \\cdot L \\cdot r \\quad [\\text{N·m}]'}</Eq>
            <Concept title="F.c.e.m. de retroceso (back-EMF)">
              Cuando el motor gira, actúa simultáneamente como generador, produciendo una f.e.m. de retroceso ε_b opuesta a la tensión de alimentación. La corriente real de armadura es: <strong>I_a = (V − ε_b) / R_a</strong>. Al arrancar (ω = 0) la back-EMF es cero y la corriente es máxima — por eso los motores grandes tienen resistencias de arranque.
            </Concept>
          </Section>

          <Section title="Tipos de motores DC">
            <DefList items={[
              { term: 'Excitación en serie', def: 'El devanado de campo está en serie con la armadura. Par de arranque altísimo. Velocidad disminuye con la carga. Nunca arrancar en vacío (acelera hasta autodestruirse). Uso: motores de arranque.' },
              { term: 'Excitación en derivación (shunt)', def: 'El devanado de campo está en paralelo con la armadura. Velocidad casi constante independiente de la carga. Uso: actuadores, servomotores.' },
              { term: 'Excitación compuesta', def: 'Combinación serie-shunt. Buen par de arranque y velocidad estable. Uso: compresores, bombas hidráulicas.' },
              { term: 'Imán permanente', def: 'Sin devanado de campo. Ligero y eficiente. Uso: motores de ventilador, actuadores pequeños, drones.' },
            ]} />
          </Section>

          <Section title="Generador DC — dinamo">
            <P>El generador DC (dinamo) convierte energía mecánica en DC mediante la <strong>regla de la mano derecha</strong> (generador): el colector y las escobillas rectifican la CA generada en la armadura, produciendo una salida DC.</P>
            <Eq>{'\\varepsilon = N B L v \\qquad v = \\omega r \\quad \\text{(velocidad periférica)}'}</Eq>
            <Aviation title="Alternador vs. Dínamo en aeronaves">
              Las aeronaves modernas usan <strong>alternadores</strong> (generadores CA + rectificador de diodos) en lugar de dínamos DC porque: tienen menos partes móviles (sin colector/escobillas), menor mantenimiento, mayor eficiencia y son más ligeros. Los dínamos solo se encuentran en aeronaves antiguas.
            </Aviation>
          </Section>

          <Summary items={[
            'Motor DC: la fuerza de Lorentz F = BIL actúa sobre la armadura produciendo par T = F·r.',
            'Back-EMF: ε_b = V − I_a·R_a. Limita la corriente una vez que el motor está girando.',
            'Tipos: serie (gran par arranque), shunt (velocidad constante), imán permanente (ligero).',
            'El alternador con rectificador ha sustituido al dínamo en las aeronaves modernas.',
          ]} />

          <Solved n="3.12.A" title="Motor DC de arranque — corriente en arranque vs régimen">
            {{
              q: <P>El motor de arranque de un motor turbohélice es DC de excitación en serie con R_a = 0.05 Ω. Se alimenta a 28 V. (a) Calcula la corriente de arranque (ω=0). (b) A régimen, la back-EMF es ε_b = 25 V. Calcula la corriente en régimen. (c) Explica por qué es necesaria una resistencia de arranque o limitación de corriente.</P>,
              a: <>
                <P><strong>(a) Corriente de arranque</strong> (ω = 0 → ε_b = 0):</P>
                <Eq>{'I_{arranque} = \\frac{V}{R_a} = \\frac{28}{0.05} = 560\\ \\text{A}'}</Eq>
                <P><strong>(b) Corriente en régimen</strong> (ε_b = 25 V):</P>
                <Eq>{'I_{régimen} = \\frac{V - \\varepsilon_b}{R_a} = \\frac{28 - 25}{0.05} = 60\\ \\text{A}'}</Eq>
                <P><strong>(c)</strong> La corriente de arranque (560 A) es 9.3× la de régimen. Sin limitación dañaría los devanados del motor, quemaría los cables y dispararía el disyuntor. El FADEC/controlador de arranque limita la corriente máxima o aumenta gradualmente la tensión durante el arranque.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un motor DC de imán permanente de un actuador de flap tiene B = 0.5 T, L_conductor = 0.1 m, I = 3 A y r = 0.05 m de radio de la armadura. Calcula la fuerza y el par producidos.</P>,
              a: <><Eq>{'F = BIL = 0.5\\times3\\times0.1 = 0.15\\ \\text{N} \\qquad T = F\\cdot r = 0.15\\times0.05 = 7.5\\ \\text{mN·m}'}</Eq></>
            },
            {
              n: 2,
              q: <P>¿Por qué un motor DC de excitación en serie NUNCA debe arrancarse en vacío (sin carga mecánica)? ¿Qué ocurriría?</P>,
              a: <><P><strong>R:</strong> En el motor serie, la velocidad aumenta cuando la carga disminuye (porque el par resistente disminuye). Sin carga, la velocidad aumenta sin control: la back-EMF aumenta hasta igualar la tensión de alimentación, pero si la fricción y las pérdidas son muy bajas, el motor puede alcanzar velocidades destructivas (la armadura puede salir disparada por la fuerza centrífuga). Por eso los motores de arranque de motores de combustión solo se activan cuando están acoplados al motor.</P></>
            },
            {
              n: 3,
              q: <P>Un motor DC shunt de 28 V / 100 W tiene R_a = 0.5 Ω. Calcula la corriente nominal y la back-EMF a plena carga.</P>,
              a: <><Eq>{'I_{nominal} = P/V = 100/28 = 3.57\\ \\text{A}'}</Eq><Eq>{'\\varepsilon_b = V - I_a R_a = 28 - 3.57\\times0.5 = 26.2\\ \\text{V}'}</Eq></>
            },
            {
              n: 4,
              q: <P>¿Cuál es la diferencia principal entre un alternador y una dínamo DC en términos de construcción y mantenimiento en aeronaves?</P>,
              a: <><P><strong>R:</strong> La <strong>dínamo</strong> tiene un colector de delgas (commutator) y escobillas de carbono que rozan constantemente para rectificar mecánicamente la CA interna en DC. Requieren inspección y sustitución periódica de escobillas cada 200–500 h. El <strong>alternador</strong> genera CA directamente y la rectifica electrónicamente (diodos). Sin colector, sin escobillas (o con anillos simples para la excitación), menor desgaste y mantenimiento. Por eso todos los aviones modernos usan alternadores.</P></>
            },
            {
              n: 5,
              q: <P>El Boeing 787 usa motores eléctricos BLDC (sin escobillas) a 270 V DC para las bombas hidráulicas. ¿Qué ventaja tienen sobre los motores DC convencionales con escobillas para aplicaciones aeronáuticas?</P>,
              a: <><P><strong>R:</strong> Los motores BLDC (Brushless DC) eliminan el colector y las escobillas usando conmutación electrónica (transistores/IGBTs controlados por sensores de posición Hall). Ventajas aeronáuticas: (1) sin desgaste de escobillas → mantenimiento mínimo; (2) mayor eficiencia (η &gt; 90% vs ~80% con escobillas); (3) mayor vida útil; (4) mayor relación potencia/peso; (5) sin chispas de escobillas → seguro en atmósferas potencialmente explosivas (bodegas de carga). La penalización es la mayor complejidad del controlador electrónico (variador de frecuencia / inversor).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.13 CORRIENTE ALTERNA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-13',
      title: '3.13 Corriente alterna (CA)',
      body: (
        <>
          <Fig src={IMG.oscilloscope} alt="Osciloscopio mostrando forma de onda" height={175}
            caption={<><strong>Figura 3.21</strong> Osciloscopio mostrando una señal sinusoidal. El eje horizontal es el tiempo y el vertical la tensión. El osciloscopio es el instrumento fundamental para analizar señales de CA y depurar sistemas de aviónica.</>}
          />

          <Section title="La forma de onda sinusoidal">
            <P>Una <strong>corriente alterna (CA)</strong> varía sinusoidalmente con el tiempo. Es la forma de onda que producen todos los generadores rotativos:</P>
            <Eq>{'v(t) = V_p \\sin(\\omega t + \\varphi) \\qquad \\omega = 2\\pi f \\quad [\\text{rad/s}]'}</Eq>
            <SvgFig caption={<><strong>Figura 3.22</strong> Forma de onda sinusoidal. Vp es la tensión de pico, T es el período (T = 1/f), Vrms = Vp/√2 es la tensión eficaz (la que tiene el mismo efecto calorífico que la tensión DC equivalente).</>}>
              <DiagramCA />
            </SvgFig>
            <DefList items={[
              { term: 'Vp [V]', def: 'Tensión de pico (valor máximo).' },
              { term: 'Vrms [V]', def: <>Tensión eficaz (RMS = Root Mean Square): <EqI>{'V_{rms} = V_p/\\sqrt{2} \\approx 0.707\\,V_p'}</EqI>. Es el valor que indica un voltímetro de CA.</> },
              { term: 'f [Hz]', def: 'Frecuencia. Ciclos por segundo. Red eléctrica: 50 Hz (Europa), 60 Hz (EE. UU.). Avión: 400 Hz.' },
              { term: 'T [s]', def: <>Período: <EqI>{'T = 1/f'}</EqI>. A 400 Hz: T = 2.5 ms.</> },
              { term: 'φ [rad]', def: 'Fase inicial. Desplazamiento angular respecto al origen del tiempo.' },
            ]} />
          </Section>

          <Section title="¿Por qué 400 Hz en aviación?">
            <P>Los aviones usan 400 Hz (en lugar de 50/60 Hz terrestres) porque a mayor frecuencia los transformadores y motores son más pequeños y ligeros para la misma potencia (ya que <EqI>{'E \\propto 1/f'}</EqI> para un transformador dado). Una frecuencia 8× mayor permite un peso ~8× menor. Esto es fundamental en aviación.</P>
            <Table
              headers={['Parámetro', '50 Hz (red)', '400 Hz (aviación)']}
              rows={[
                ['Período T', '20 ms', '2.5 ms'],
                ['Tamaño transformador', 'Grande', '~8× más pequeño'],
                ['Tamaño motor', 'Grande', 'Mucho más ligero'],
                ['Velocidad motores síncronos', '3000 RPM', '24 000 RPM (más inercia → más estable)'],
              ]}
            />
          </Section>

          <Section title="Valores de la forma de onda">
            <Eq>{'V_{rms} = \\frac{V_p}{\\sqrt{2}} \\qquad V_p = V_{p-p}/2 \\qquad V_{med} = \\frac{2V_p}{\\pi} \\approx 0.637\\,V_p'}</Eq>
            <Example n="3.7" title="Tensión de pico del bus AC de 115 V"
              given={<P>El bus AC de un avión es de 115 V rms, 400 Hz. Calcular la tensión de pico y pico a pico.</P>}
              solution={
                <>
                  <Eq>{'V_p = V_{rms} \\times \\sqrt{2} = 115 \\times 1.414 = 162.6\\ \\text{V}'}</Eq>
                  <Eq>{'V_{p-p} = 2 V_p = 2 \\times 162.6 = 325.2\\ \\text{V}'}</Eq>
                </>
              }
            />
          </Section>

          <Summary items={[
            'v(t) = Vp·sin(ωt + φ). Vrms = Vp/√2 ≈ 0.707·Vp.',
            'Frecuencia aeronáutica estándar: 400 Hz (vs 50/60 Hz en tierra). Motores y transformadores 8× más ligeros.',
            'Período T = 1/f. A 400 Hz: T = 2.5 ms.',
          ]} />

          <Solved n="3.13.A" title="Análisis de la señal del IDG de un A320">
            {{
              q: <P>El IDG (Integrated Drive Generator) del A320 produce 115 V rms, 400 Hz, trifásico. Para el bus de fase A, calcula: (a) tensión de pico, (b) período, (c) velocidad angular ω, (d) escribe la expresión de la onda de tensión v(t) asumiendo φ = 0.</P>,
              a: <>
                <P><strong>(a) Tensión de pico:</strong></P>
                <Eq>{'V_p = V_{rms} \\sqrt{2} = 115 \\times 1.414 = 162.6\\ \\text{V}'}</Eq>
                <P><strong>(b) Período:</strong></P>
                <Eq>{'T = 1/f = 1/400 = 2.5\\ \\text{ms}'}</Eq>
                <P><strong>(c) Velocidad angular:</strong></P>
                <Eq>{'\\omega = 2\\pi f = 2\\pi \\times 400 = 2513\\ \\text{rad/s}'}</Eq>
                <P><strong>(d) Expresión de v(t):</strong></P>
                <Eq>{'v(t) = 162.6 \\sin(2513\\,t)\\ \\text{[V]}'}</Eq>
                <P>Las otras dos fases están desfasadas 120° y 240° respectivamente: <EqI>{'v_B = 162.6\\sin(2513t - 2\\pi/3)'}</EqI>, <EqI>{'v_C = 162.6\\sin(2513t - 4\\pi/3)'}</EqI>.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un voltímetro AC indica 115 V en el bus AC del avión. ¿Cuál es el valor de pico a pico? ¿Y el valor medio?</P>,
              a: <><Eq>{'V_{p-p} = 2\\sqrt{2}\\times115 = 325.2\\ \\text{V} \\qquad V_{med} = \\frac{2V_p}{\\pi} = \\frac{2\\times162.6}{\\pi} = 103.5\\ \\text{V}'}</Eq></>
            },
            {
              n: 2,
              q: <P>El IDG del A320 genera a 12 000 RPM con 3 pares de polos. Verifica que la frecuencia de salida es 400 Hz.</P>,
              a: <><Eq>{'f = \\frac{n \\cdot p}{60} = \\frac{12000 \\times 2}{60} = 400\\ \\text{Hz}\\ ✓'}</Eq><P>Nota: p = número de pares de polos = número de polos / 2 = 4/2 = 2 en este ejemplo simplificado (el número exacto varía según el diseño del IDG).</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué el factor de forma de una onda sinusoidal (Vrms/Vmed = 1.11) es importante para los rectificadores de los sistemas de aviónica?</P>,
              a: <><P><strong>R:</strong> El factor de forma indica cuánto "más efectivo" es el valor RMS frente al valor medio. Los rectificadores de onda completa (TRU) producen una tensión DC proporcional al valor medio de la señal rectificada. Conocer el factor de forma permite calcular el rizado (ripple) y diseñar el filtro correcto. Si el voltímetro (que lee RMS) indica 115 V, el valor medio rectificado es 115/1.11 = 103.6 V × 1.273 (corrección onda completa) = 132 V antes del filtro.</P></>
            },
            {
              n: 4,
              q: <P>Calcula la tensión de línea en un sistema trifásico de 115 V de fase (como el bus del A320).</P>,
              a: <><Eq>{'V_{línea} = \\sqrt{3} \\times V_{fase} = 1.732 \\times 115 = 199.2\\ \\text{V} \\approx 200\\ \\text{V}'}</Eq><P>El bus AC del A320 es 115/200 V AC, 400 Hz, trifásico (115 V de fase, 200 V entre líneas).</P></>
            },
            {
              n: 5,
              q: <P>¿Qué ocurre con los instrumentos de aviónica diseñados para 400 Hz si se conectan temporalmente a la red terrestre de 50 Hz durante pruebas en tierra sin GPU? ¿Y al revés?</P>,
              a: <><P><strong>R:</strong> Instrumentos de 400 Hz en 50 Hz: los transformadores internos (diseñados para 400 Hz) tienen un núcleo mucho más pequeño de lo necesario para 50 Hz → el núcleo se satura magnéticamente, circula corriente excesiva, el transformador se calienta y puede destruirse. Instrumentos de 50 Hz en 400 Hz: generalmente toleran mejor (mayor frecuencia → menor saturación), pero los motores síncronos internos girarán 8× más rápido y se destruirán por exceso de RPM. <strong>Siempre usar la GPU certificada con la frecuencia correcta.</strong></P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.14 CIRCUITOS RLC EN CA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-14',
      title: '3.14 Circuitos RLC en corriente alterna',
      body: (
        <>
          <Section title="Reactancia e impedancia">
            <P>En CA, los condensadores y bobinas presentan <strong>reactancia</strong> — una resistencia aparente que depende de la frecuencia:</P>
            <Eq>{'X_C = \\frac{1}{2\\pi f C} = \\frac{1}{\\omega C} \\quad [\\Omega] \\qquad X_L = 2\\pi f L = \\omega L \\quad [\\Omega]'}</Eq>
            <P>Xc disminuye con la frecuencia (condensador = cortocircuito a alta f). XL aumenta con la frecuencia (inductor = circuito abierto a alta f).</P>
            <P>La <strong>impedancia Z</strong> es la oposición total al flujo de corriente alterna (resistiva + reactiva):</P>
            <Eq>{'Z = \\sqrt{R^2 + (X_L - X_C)^2} \\qquad [\\Omega] \\qquad I = \\frac{V}{Z}'}</Eq>
          </Section>

          <Section title="Resonancia en serie">
            <P>A la <strong>frecuencia de resonancia</strong> <EqI>{'f_0'}</EqI>, las reactancias inductiva y capacitiva se igualan y se cancelan. La impedancia es mínima (= R) y la corriente es máxima:</P>
            <Eq>{'f_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\qquad X_L = X_C \\implies Z = R \\text{ (mínimo)}'}</Eq>
            <P>El <strong>factor de calidad Q</strong> indica la selectividad del circuito:</P>
            <Eq>{'Q = \\frac{f_0}{BW} = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R}'}</Eq>
            <Aviation title="Circuitos resonantes en radionavegación VOR/ILS">
              Los receptores VOR (108–118 MHz) e ILS (108–112 MHz) usan circuitos LC resonantes para seleccionar la frecuencia deseada rechazando interferencias. Un factor Q elevado significa mayor selectividad (banda más estrecha) y mejor rechazo de canales adyacentes.
            </Aviation>
          </Section>

          <Section title="Factor de potencia">
            <P>En un circuito AC con reactancia, la potencia aparente S, la potencia real P y la potencia reactiva Q se relacionan mediante el <strong>triángulo de potencias</strong>:</P>
            <Eq>{'S = V \\cdot I \\quad [\\text{VA}] \\qquad P = S \\cos\\varphi \\quad [\\text{W}] \\qquad Q = S \\sin\\varphi \\quad [\\text{VAR}]'}</Eq>
            <Eq>{'\\cos\\varphi = \\frac{P}{S} = \\frac{R}{Z} \\quad (\\text{factor de potencia})'}</Eq>
            <Note>El factor de potencia ideal es 1 (cos φ = 1, carga puramente resistiva). Los motores y transformadores tienen cos φ &lt; 1 porque son cargas inductivas. Los condensadores en paralelo pueden corregirlo.</Note>
          </Section>

          <Summary items={[
            'XC = 1/(ωC) — disminuye con la frecuencia. XL = ωL — aumenta con la frecuencia.',
            'Impedancia: Z = √(R² + (XL − XC)²). Ley de Ohm AC: I = V/Z.',
            'Resonancia serie: f₀ = 1/(2π√LC). En f₀, Z = R (mínimo) e I es máxima.',
            'Factor de potencia: cos φ = P/S. La carga ideal es resistiva (cos φ = 1).',
          ]} />

          <Solved n="3.14.A" title="Circuito RLC serie — filtro de antena VOR">
            {{
              q: <P>El receptor VOR de un avión usa un circuito RLC serie con R = 50 Ω, L = 1.0 μH, C = 2.4 pF para seleccionar 108 MHz. (a) Calcula f₀ y verifica que está cerca de 108 MHz. (b) Calcula la impedancia a 108 MHz. (c) ¿Cuánta corriente produce una señal de 1 mV en resonancia?</P>,
              a: <>
                <P><strong>(a) Frecuencia de resonancia:</strong></P>
                <Eq>{'f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{10^{-6}\\times2.4\\times10^{-12}}} = \\frac{1}{2\\pi\\times49\\times10^{-9}} = 102.7\\ \\text{MHz}'}</Eq>
                <P>Ajuste fino del condensador permitiría llegar a 108 MHz (en diseño real, C se varía con un condensador variable).</P>
                <P><strong>(b) Impedancia en resonancia:</strong> <EqI>{'Z = R = 50\\ \\Omega'}</EqI> (XL = XC se cancelan)</P>
                <P><strong>(c) Corriente en resonancia:</strong></P>
                <Eq>{'I = V/Z = 1\\times10^{-3}/50 = 20\\ \\mu\\text{A}'}</Eq>
                <P>Máxima corriente en resonancia → máxima respuesta del receptor a la frecuencia seleccionada. A otras frecuencias Z &gt; 50 Ω → corriente menor → rechazo de señales de otros canales.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Calcula la reactancia capacitiva e inductiva de un circuito con C = 10 μF y L = 50 mH a 400 Hz (bus AC de avión). ¿Predomina la capacitancia o la inductancia?</P>,
              a: <><Eq>{'X_C = \\frac{1}{2\\pi\\times400\\times10^{-5}} = 39.8\\ \\Omega \\qquad X_L = 2\\pi\\times400\\times0.05 = 125.7\\ \\Omega'}</Eq><P>XL &gt; XC → predomina la <strong>inductancia</strong>. El circuito tiene carácter inductivo y la corriente se retrasa respecto a la tensión.</P></>
            },
            {
              n: 2,
              q: <P>Un motor de bomba de combustible de 115 V / 400 Hz consume 2 kVA con factor de potencia cos φ = 0.8. Calcula la potencia activa (W) y la corriente.</P>,
              a: <><Eq>{'P = S \\cdot \\cos\\varphi = 2000 \\times 0.8 = 1600\\ \\text{W} \\qquad I = S/V = 2000/115 = 17.4\\ \\text{A}'}</Eq></>
            },
            {
              n: 3,
              q: <P>¿Qué frecuencia de resonancia tiene un filtro de antena con L = 500 nH y C = 10 pF? ¿A qué banda de radionavegación correspondería?</P>,
              a: <><Eq>{'f_0 = \\frac{1}{2\\pi\\sqrt{500\\times10^{-9}\\times10\\times10^{-12}}} = \\frac{1}{2\\pi\\times2.24\\times10^{-9}} \\approx 71\\ \\text{MHz}'}</Eq><P>Cerca de la banda VHF (30–300 MHz). Ajustando L o C se podría llegar a la banda VOR (108–118 MHz) o ILS (108–112 MHz).</P></>
            },
            {
              n: 4,
              q: <P>Un sistema de corrección de factor de potencia instala condensadores en paralelo con los motores del avión. ¿Qué efecto tiene esto sobre la corriente total del generador (IDG) para la misma potencia activa?</P>,
              a: <><P><strong>R:</strong> Los motores son cargas inductivas (cos φ &lt; 1). Los condensadores en paralelo suministran la potencia reactiva que el motor necesita localmente, sin que tenga que venir del IDG. Resultado: el IDG solo entrega potencia activa (cos φ → 1), <strong>reduciendo la corriente total</strong> para la misma potencia útil. Menor corriente → menores pérdidas en el cableado y menor carga térmica del IDG.</P></>
            },
            {
              n: 5,
              q: <P>En un circuito RLC serie con R = 10 Ω, XL = 40 Ω, XC = 20 Ω alimentado a 100 V AC, calcula Z, I, y el factor de potencia.</P>,
              a: <><Eq>{'Z = \\sqrt{10^2+(40-20)^2} = \\sqrt{100+400} = 22.4\\ \\Omega'}</Eq><Eq>{'I = 100/22.4 = 4.46\\ \\text{A} \\qquad \\cos\\varphi = R/Z = 10/22.4 = 0.447'}</Eq><P>El circuito tiene carácter inductivo (XL &gt; XC) y bajo factor de potencia (0.45). En un sistema de avión esto implicaría alto consumo del IDG para poca potencia útil.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.15 TRANSFORMADORES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-15',
      title: '3.15 Transformadores',
      body: (
        <>
          <Fig src={IMG.transformer} alt="Transformador de potencia" height={180}
            caption={<><strong>Figura 3.23</strong> Transformador TRU (Transformer Rectifier Unit) de aeronave. Convierte los 115 V AC / 400 Hz del bus AC en 28 V DC para el bus de corriente continua. Es uno de los componentes más importantes del sistema eléctrico de una aeronave comercial.</>}
          />

          <Section title="Principio del transformador">
            <P>El transformador transfiere energía eléctrica entre dos circuitos mediante <strong>inducción electromagnética mutua</strong>, sin contacto eléctrico directo. Solo funciona con CA — no con DC.</P>
            <SvgFig caption={<><strong>Figura 3.24</strong> Transformador ideal de dos devanados. La relación de transformación N₂/N₁ determina si eleva o reduce la tensión. La potencia se conserva (P₁ = P₂) en el transformador ideal.</>}>
              <DiagramTransformador />
            </SvgFig>
            <Eq>{'\\frac{V_2}{V_1} = \\frac{N_2}{N_1} = n \\qquad \\frac{I_2}{I_1} = \\frac{N_1}{N_2} \\qquad P_1 = P_2 \\text{ (ideal)}'}</Eq>
            <DefList items={[
              { term: 'n = N₂/N₁', def: 'Relación de transformación. n > 1: transformador elevador. n < 1: transformador reductor.' },
              { term: 'Devanado primario', def: 'Se conecta a la fuente de CA. Tiene N₁ espiras.' },
              { term: 'Devanado secundario', def: 'Alimenta la carga. Tiene N₂ espiras.' },
            ]} />
          </Section>

          <Section title="Transformador real — pérdidas">
            <P>Un transformador real tiene pérdidas que reducen su eficiencia (típicamente η = 95–99%):</P>
            <DefList items={[
              { term: 'Pérdidas en el cobre (I²R)', def: 'Calor disipado en la resistencia de los devanados. Aumentan con la corriente al cuadrado.' },
              { term: 'Pérdidas en el hierro', def: 'Corrientes de Foucault y histéresis magnética en el núcleo. Dependen de la frecuencia y la inducción máxima. A 400 Hz son proporcionalmente mayores que a 50 Hz.' },
              { term: 'Flujo de dispersión', def: 'Parte del flujo magnético no enlaza ambos devanados, creando reactancias de fugas que degradan la regulación de tensión.' },
            ]} />
            <Example n="3.8" title="Transformador reductor para bus 28 V"
              given={<P>Un transformador de aeronave tiene N₁ = 1150 espiras, alimentado a 115 V / 400 Hz. Se desea obtener 28 V en el secundario. ¿Cuántas espiras necesita el secundario? Si la carga consume 10 A, ¿qué corriente circula por el primario?</P>}
              solution={
                <>
                  <Eq>{'N_2 = N_1 \\cdot \\frac{V_2}{V_1} = 1150 \\times \\frac{28}{115} = 280\\ \\text{espiras}'}</Eq>
                  <Eq>{'I_1 = I_2 \\cdot \\frac{N_2}{N_1} = 10 \\times \\frac{280}{1150} = 2.43\\ \\text{A}'}</Eq>
                </>
              }
            />
          </Section>

          <Section title="TRU — Transformer Rectifier Unit">
            <P>El <strong>TRU</strong> es el componente fundamental del sistema eléctrico de los aviones comerciales. Combina un transformador reductor (115 V → ~28 V AC) con un rectificador de diodos (puente de onda completa) para obtener 28 V DC.</P>
            <Aviation title="Sistema eléctrico Boeing 737">
              Cada motor del B737 acciona un IDG (Integrated Drive Generator) que produce 115 V AC / 400 Hz. Dos TRUs (uno por cada bus AC) alimentan el bus de 28 V DC con unos 150 A cada uno para alimentar la aviónica, luces, sistemas de control y cargar las baterías de Ni-Cd.
            </Aviation>
          </Section>

          <Summary items={[
            'V₂/V₁ = N₂/N₁ = n (relación de espiras). I₂/I₁ = N₁/N₂ = 1/n.',
            'Potencia se conserva (P₁ = P₂) en el transformador ideal.',
            'Solo funciona con CA. Las pérdidas son por cobre (I²R) y por el hierro (Foucault + histéresis).',
            'El TRU convierte 115 V AC / 400 Hz → 28 V DC en los aviones comerciales.',
          ]} />

          <Solved n="3.15.A" title="Dimensionamiento del TRU del A320">
            {{
              q: <P>El TRU del A320 convierte 115 V AC (primario, N₁ = 920 espiras) a ~28 V AC (antes de rectificar). (a) ¿Cuántas espiras tiene el secundario? (b) Si el TRU suministra 150 A DC al bus de 28 V con η = 92%, ¿qué corriente extrae del bus AC de 115 V?</P>,
              a: <>
                <P><strong>(a) Espiras del secundario:</strong></P>
                <Eq>{'N_2 = N_1 \\cdot \\frac{V_2}{V_1} = 920 \\times \\frac{28}{115} = 224\\ \\text{espiras}'}</Eq>
                <P><strong>(b) Corriente del primario:</strong></P>
                <P>Potencia DC entregada: <EqI>{'P_{DC} = 150\\ \\text{A} \\times 28\\ \\text{V} = 4200\\ \\text{W}'}</EqI></P>
                <P>Potencia AC absorbida: <EqI>{'P_{AC} = 4200/0.92 = 4565\\ \\text{W}'}</EqI></P>
                <Eq>{'I_1 = \\frac{P_{AC}}{V_1} = \\frac{4565}{115} = 39.7\\ \\text{A}'}</Eq>
                <P>El TRU extrae ~40 A del bus AC de 115 V para suministrar 150 A al bus DC de 28 V. La diferencia de corriente (40 A vs 150 A) se debe a la relación de transformación (≈ 4:1 en corriente).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un transformador de aviónica tiene relación de espiras n = 1/6 (reductor). Si el primario recibe 200 V y entrega 5 A, ¿cuál es la tensión secundaria y la corriente secundaria (transformador ideal)?</P>,
              a: <><Eq>{'V_2 = V_1/6 = 200/6 = 33.3\\ \\text{V} \\qquad I_2 = I_1 \\times 6 = 5 \\times 6 = 30\\ \\text{A}'}</Eq></>
            },
            {
              n: 2,
              q: <P>¿Por qué los transformadores de aviónica (400 Hz) son más pequeños que los terrestres (50 Hz) de la misma potencia? Explica con la relación de diseño del transformador.</P>,
              a: <><P><strong>R:</strong> El núcleo de un transformador debe no saturarse: <EqI>{'B_{max} = V/(4.44 \\cdot f \\cdot N \\cdot A)'}</EqI>. Para la misma V, N y B_max, a 400 Hz se necesita un área del núcleo A 8× menor (f es 8× mayor). Menor área → núcleo 8× más pequeño → transformador 8× más ligero. Por eso un TRU de avión cabe en una caja pequeña mientras que un transformador de 4 kW de 50 Hz es voluminoso y pesado.</P></>
            },
            {
              n: 3,
              q: <P>Un transformador elevador del sistema de monitorización de alta tensión en el avión tiene N₁ = 100 espiras y N₂ = 5000 espiras. Si el primario es 28 V DC: ¿funcionará? ¿Por qué?</P>,
              a: <><P><strong>R:</strong> <strong>No funcionará.</strong> Los transformadores solo funcionan con CA. Con 28 V DC en el primario, el flujo magnético es constante (no varía), por lo que dΦ/dt = 0 y no hay f.e.m. inducida en el secundario. Además, con DC la bobina primaria solo tiene la resistencia óhmica (sin reactancia), por lo que circulará una corriente enorme que quemará el devanado. Para elevar DC se usa un convertidor DC/DC (chopper + transformador AC).</P></>
            },
            {
              n: 4,
              q: <P>El transformador de un sistema de audio de cabina tiene n = 10:1 (elevador del amplificador al altavoz). Si el amplificador entrega 2 W a 8 Ω, ¿qué impedancia "ve" el amplificador en el primario?</P>,
              a: <><P>La impedancia se transforma como n²:</P><Eq>{'Z_{primario} = n^2 \\times Z_{secundario} = 10^2 \\times 8 = 800\\ \\Omega'}</Eq><P>El transformador de adaptación de impedancia (matching transformer) permite que el amplificador trabaje en su impedancia óptima (800 Ω) aunque el altavoz tenga 8 Ω.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué son las pérdidas por corrientes de Foucault en el núcleo del transformador y cómo se minimizan en la construcción de transformadores aeronáuticos?</P>,
              a: <><P><strong>R:</strong> Las corrientes de Foucault (eddy currents) son corrientes inducidas circulares en el propio núcleo metálico por la variación del campo magnético. Al ser el núcleo conductor, generan calor (P = I²R_núcleo). Para minimizarlas, el núcleo no se fabrica en un bloque sólido sino con <strong>láminas (chapa silicio)</strong> muy delgadas (0.1–0.3 mm) aisladas entre sí con barniz. Las láminas dividen el camino de las corrientes de Foucault en circuitos de alta resistencia, reduciendo drásticamente su magnitud y las pérdidas asociadas. En transformadores de alta frecuencia (400 Hz y SMPS) se usan núcleos de ferritas que no son conductores eléctricos.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.16 FILTROS
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-16',
      title: '3.16 Filtros',
      body: (
        <>
          <Section title="Función de los filtros eléctricos">
            <P>Un <strong>filtro eléctrico</strong> es una red de componentes (R, L, C) que atenúa selectivamente algunas frecuencias y deja pasar otras. Son imprescindibles en aviónica para eliminar interferencias, aislar señales y suavizar la tensión rectificada.</P>
            <Table
              headers={['Tipo', 'Pasa', 'Atenúa', 'Aplicación en aviónica']}
              rows={[
                ['Paso bajo (LP)', 'Frecuencias < fc', 'Frecuencias > fc', 'Suavizar salida del rectificador, señales de sensores'],
                ['Paso alto (HP)', 'Frecuencias > fc', 'Frecuencias < fc', 'Eliminar DC de señales de audio, acoplamiento AC'],
                ['Paso banda (BP)', 'Banda fc1–fc2', 'Fuera de la banda', 'Selectores de frecuencia VOR/ILS/VHF'],
                ['Rechaza banda (Notch)', 'Fuera de fc', 'Frecuencia fc', 'Eliminar interferencia a una frecuencia concreta'],
              ]}
            />
          </Section>

          <Section title="Filtro RC de paso bajo — el más básico">
            <P>La frecuencia de corte (-3 dB) de un filtro RC de paso bajo:</P>
            <Eq>{'f_c = \\frac{1}{2\\pi RC} \\qquad |H| = \\frac{1}{\\sqrt{1 + (f/f_c)^2}}'}</Eq>
            <P>Por encima de fc la atenuación aumenta a razón de <strong>−20 dB por década</strong>.</P>
            <Example n="3.9" title="Filtro de sensor de temperatura"
              given={<P>Se desea un filtro de paso bajo para un sensor de temperatura con fc = 10 Hz. Se dispone de R = 10 kΩ. ¿Qué condensador usar?</P>}
              solution={
                <>
                  <Eq>{'C = \\frac{1}{2\\pi f_c R} = \\frac{1}{2\\pi \\times 10 \\times 10\\,000} = 1.59\\ \\mu\\text{F}'}</Eq>
                  <P>Se usaría un condensador estándar de 1.5 μF o 2.2 μF.</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Los filtros atenúan selectivamente frecuencias: LP, HP, BP, Notch.',
            'Filtro RC paso bajo: fc = 1/(2πRC). Atenuación −20 dB/década por encima de fc.',
            'Fundamentales en aviónica para eliminar interferencias y filtrar señales de sensores.',
          ]} />

          <Solved n="3.16.A" title="Filtro de rizado para la salida del TRU">
            {{
              q: <P>La salida del TRU de un A320 tiene un rizado (ripple) a 2400 Hz (= 400 Hz × 6 por el puente de diodos de 6 pulsos). Se desea un filtro RC paso bajo que atenúe este rizado al menos 40 dB (factor 100). Con R = 1 Ω (resistencia de salida del TRU), calcula: (a) fc necesaria para −40 dB a 2400 Hz, (b) valor del condensador C.</P>,
              a: <>
                <P><strong>(a)</strong> Para −40 dB de atenuación en un filtro RC de 1er orden:</P>
                <Eq>{'|H| = \\frac{1}{\\sqrt{1+(f/f_c)^2}} = \\frac{1}{100} \\Rightarrow f/f_c \\approx 100 \\Rightarrow f_c = \\frac{2400}{100} = 24\\ \\text{Hz}'}</Eq>
                <P><strong>(b) Condensador:</strong></P>
                <Eq>{'C = \\frac{1}{2\\pi f_c R} = \\frac{1}{2\\pi \\times 24 \\times 1} = 6.6\\ \\text{mF}'}</Eq>
                <P>En la práctica se usa un condensador electrolítico de <strong>6800 μF / 50 V</strong> (valor comercial más próximo). Su gran tamaño físico justifica la caja metálica del TRU. Los TRUs modernos usan filtros LC para reducir el tamaño del condensador.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Calcula la frecuencia de corte de un filtro RC con R = 47 kΩ y C = 100 nF. ¿Es paso bajo o paso alto? ¿Qué tipo de señal atenúa?</P>,
              a: <><Eq>{'f_c = \\frac{1}{2\\pi RC} = \\frac{1}{2\\pi\\times47000\\times10^{-7}} = 33.9\\ \\text{Hz}'}</Eq><P>Filtro <strong>paso bajo</strong>: atenúa frecuencias &gt;34 Hz. Ideal para filtrar el ruido de RF en señales de sensores lentos (temperatura, presión).</P></>
            },
            {
              n: 2,
              q: <P>¿Qué tipo de filtro (LP, HP, BP, Notch) se usa en el receptor ILS de un avión para seleccionar la señal de 108.1 MHz rechazando los canales adyacentes? Explica brevemente.</P>,
              a: <><P><strong>R: Filtro de paso banda (BP)</strong>. Deja pasar solo la banda de frecuencias centrada en el canal ILS seleccionado (±25 kHz en el canal de 108.1 MHz) y rechaza todas las demás frecuencias (incluyendo señales de otros radioayudas cercanas como VOR, localizador de otros aeropuertos, etc.).</P></>
            },
            {
              n: 3,
              q: <P>Un filtro LC paso bajo para un bus DC tiene L = 500 μH y C = 1000 μF. Calcula su frecuencia de resonancia (que determina la frecuencia de corte del filtro). ¿Atenúa el rizado de 2400 Hz del TRU?</P>,
              a: <><Eq>{'f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{5\\times10^{-4}\\times10^{-3}}} = \\frac{1}{2\\pi\\times2.24\\times10^{-3}} = 71\\ \\text{Hz}'}</Eq><P>Como 71 Hz &lt;&lt; 2400 Hz, el filtro LC atenúa muy eficazmente el rizado de 2400 Hz del TRU (atenuación de 2ª orden: −40 dB/década).</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es un filtro EMI (Electromagnetic Interference) y dónde se instala típicamente en la entrada de alimentación de equipos de aviónica?</P>,
              a: <><P><strong>R:</strong> Un filtro EMI es un filtro paso bajo que atenúa el ruido de alta frecuencia (generado o recibido por el equipo) antes de que alcance el bus o los componentes internos. Típicamente consta de una bobina de modo común (choke), condensadores y varistores. Se instala directamente en el conector de alimentación de cada equipo de aviónica. Su objetivo es cumplir las normas de compatibilidad electromagnética (EMC/EMI) de DO-160 para evitar interferencias entre equipos y con sistemas de radio y navegación.</P></>
            },
            {
              n: 5,
              q: <P>Un técnico mide en el osciloscopio 2 V de rizado pico a pico a 2400 Hz en la salida de un TRU. Las especificaciones permiten máximo 0.2 V de rizado. ¿Qué componente del TRU podría estar degradado? ¿Qué medida de mantenimiento se aplica?</P>,
              a: <><P><strong>R:</strong> El exceso de rizado indica que el <strong>condensador de filtro de salida</strong> del TRU ha perdido capacidad (degradación típica de los electrolíticos por envejecimiento, temperatura o ripple excesivo). Los electrolíticos pierden capacidad con los años. Medida de mantenimiento: sustitución del TRU (los condensadores suelen ser internos y no se reparan en campo) o, si el AMM lo permite, sustitución del condensador en taller. El TRU degradado debe ser retirado de servicio hasta su reparación (EASA Part-145).</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.17 GENERADORES DE CORRIENTE ALTERNA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-17',
      title: '3.17 Generadores de corriente alterna',
      body: (
        <>
          <Fig src={IMG.alternator} alt="Motor de aeronave" height={175}
            caption={<><strong>Figura 3.25</strong> Motor turbofan de aeronave comercial. El IDG (Integrated Drive Generator) está acoplado al motor y genera 115 V AC / 400 Hz a velocidad constante gracias a un CSD (Constant Speed Drive) hidráulico que mantiene la frecuencia independientemente de las RPM del motor.</>}
          />

          <Section title="Principio del alternador">
            <P>El alternador convierte energía mecánica en CA por inducción electromagnética. Al girar el inductor (o el devanado de armadura en un campo fijo), varía el flujo magnético a través del devanado de salida, induciendo una f.e.m. sinusoidal:</P>
            <Eq>{'e(t) = N B A \\omega \\sin(\\omega t) \\qquad f = \\frac{n \\cdot p}{60} \\quad [\\text{Hz}]'}</Eq>
            <DefList items={[
              { term: 'n [RPM]', def: 'Velocidad de rotación.' },
              { term: 'p', def: 'Número de pares de polos.' },
              { term: 'f [Hz]', def: 'Frecuencia de la CA generada.' },
            ]} />
          </Section>

          <Section title="IDG — Integrated Drive Generator">
            <P>El IDG combina en una sola unidad un <strong>CSD</strong> (Constant Speed Drive) y un <strong>generador AC</strong>. El CSD es una transmisión hidráulica variable que mantiene la velocidad del generador constante (típicamente 12 000 RPM) independientemente de las RPM del motor, garantizando siempre 400 Hz.</P>
            <DefList items={[
              { term: 'Potencia típica IDG', def: '60–120 kVA por motor en aviones comerciales (B737, A320). El B787 usa generadores variables (VSCF) de 250 kVA.' },
              { term: 'Tensión de salida', def: '115/200 V AC trifásico, 400 Hz.' },
              { term: 'Protecciones', def: 'Relé de subtensión, sobretensión, subfrecuencia, sobrefrecuencia y temperatura de aceite. La desconexión del IDG (GCB) es irreversible en vuelo.' },
            ]} />
            <Aviation title="Sistema eléctrico trifásico del A320">
              El A320 tiene dos IDGs (uno por motor) más un APU generator y una RAT (Ram Air Turbine) de emergencia. En condiciones normales, cada IDG alimenta su propio AC bus (AC BUS 1 y AC BUS 2). En caso de fallo doble, la RAT despliega automáticamente y genera ~7.5 kVA para sistemas esenciales.
            </Aviation>
          </Section>

          <Summary items={[
            'El alternador genera CA por inducción. Frecuencia f = n·p/60.',
            'El IDG = CSD + generador. Mantiene 400 Hz constantes con RPM variables del motor.',
            'Sistema estándar: 115/200 V AC trifásico, 400 Hz, generado por los IDGs de cada motor.',
          ]} />

          <Solved n="3.17.A" title="IDG del A320 — cálculo de potencia y frecuencia">
            {{
              q: <P>El IDG de un A320 tiene 3 pares de polos y el CSD mantiene 8000 RPM. (a) Calcula la frecuencia de salida. (b) Si el IDG entrega 90 kVA a cos φ = 0.85, ¿cuál es la potencia activa? (c) ¿Qué corriente entrega al bus de 115 V trifásico?</P>,
              a: <>
                <P><strong>(a) Frecuencia:</strong></P>
                <Eq>{'f = \\frac{n \\cdot p}{60} = \\frac{8000 \\times 3}{60} = 400\\ \\text{Hz}\\ ✓'}</Eq>
                <P><strong>(b) Potencia activa:</strong></P>
                <Eq>{'P = S \\cdot \\cos\\varphi = 90\\,000 \\times 0.85 = 76.5\\ \\text{kW}'}</Eq>
                <P><strong>(c) Corriente de línea (sistema trifásico):</strong></P>
                <Eq>{'I = \\frac{S}{\\sqrt{3} \\cdot V_{línea}} = \\frac{90\\,000}{\\sqrt{3} \\times 200} = 260\\ \\text{A}'}</Eq>
                <P>El IDG suministra 260 A de corriente de línea al bus AC de 200 V. Los cables del bus AC de un A320 son de gran sección para manejar esta corriente con mínimas pérdidas.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un alternador de avión de pistón (Lycoming O-320) gira a 5000 RPM con 6 polos (3 pares de polos). ¿Qué frecuencia produce? ¿Necesita un rectificador para alimentar el bus DC de 28 V?</P>,
              a: <><Eq>{'f = \\frac{5000 \\times 3}{60} = 250\\ \\text{Hz}'}</Eq><P>Sí, necesita un rectificador (puente de diodos) para convertir los 250 Hz AC a DC, y un regulador de tensión para mantener 28 V constantes independientemente de las RPM del motor.</P></>
            },
            {
              n: 2,
              q: <P>¿Qué función cumple el CSD (Constant Speed Drive) en el IDG de un avión comercial? ¿Qué pasaría sin él?</P>,
              a: <><P><strong>R:</strong> El CSD es una transmisión hidráulica variable que mantiene la velocidad del generador constante (típicamente 8000–12 000 RPM) independientemente de las RPM del motor (que varían entre idle y máxima potencia). Sin el CSD, la frecuencia AC variaría con las RPM del motor: a idle podría ser 300 Hz y a T/O 600 Hz. Los sistemas eléctricos y motores del avión están diseñados para 400 Hz ±5 Hz, y no funcionarían correctamente fuera de ese rango.</P></>
            },
            {
              n: 3,
              q: <P>Un avión tiene dos IDGs de 90 kVA cada uno. Si un IDG falla, ¿puede el otro soportar toda la carga eléctrica del avión? ¿Qué cargas se desconectan automáticamente?</P>,
              a: <><P><strong>R:</strong> En condiciones normales, cada IDG alimenta su propio bus y la carga total puede superar los 90 kVA. Con un solo IDG activo, el sistema de gestión eléctrica (ELMS) conecta ambos buses pero desconecta las cargas no esenciales (galley, algunos sistemas de entretenimiento, calefacción de agua) para mantenerse dentro del límite de 90 kVA. Los sistemas esenciales (aviónica, hidráulica, controles de vuelo, iluminación de emergencia) siempre tienen prioridad.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es la RAT (Ram Air Turbine) del A320 y en qué condición se despliega automáticamente?</P>,
              a: <><P><strong>R:</strong> La RAT es una pequeña turbina eólica que se despliega automáticamente cuando se pierden ambos motores (y por tanto ambos IDGs) y el APU no está disponible. La presión dinámica del flujo de aire en vuelo (ram air) hace girar la turbina, que acciona un generador hidráulico y eléctrico de emergencia (~7.5 kVA). Alimenta solo los sistemas mínimos esenciales para el aterrizaje de emergencia. Se despliega automáticamente cuando la presión del bus cae por debajo de un umbral, sin intervención de la tripulación.</P></>
            },
            {
              n: 5,
              q: <P>El Boeing 787 usa generadores de frecuencia variable (Variable Speed Constant Frequency, VSCF) de 250 kVA en lugar de IDGs con CSD. ¿Qué ventaja ofrece este diseño?</P>,
              a: <><P><strong>R:</strong> Al eliminar el CSD (mecánicamente complejo y pesado), los generadores VSCF producen CA de frecuencia variable (360–800 Hz) que se convierte a 115 V AC / 400 Hz mediante electrónica de potencia (rectificadores + inversores). Ventajas: menor peso y tamaño sin el CSD mecánico, mayor fiabilidad (sin aceite del CSD), mayor potencia disponible (250 kVA vs 90 kVA típico), y permite el "more electric aircraft" con sistemas eléctricos de alta potencia que reemplazan hidráulicos y neumáticos.</P></>
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 3.18 MOTORES DE CORRIENTE ALTERNA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm3-18',
      title: '3.18 Motores de corriente alterna',
      body: (
        <>
          <Fig src={IMG.acmotor} alt="Hélice y motor de aeronave" height={175}
            caption={<><strong>Figura 3.26</strong> Los motores de inducción trifásicos accionan bombas hidráulicas, compresores de aire acondicionado y otros sistemas auxiliares de las aeronaves comerciales. Su gran ventaja es la ausencia de colector y escobillas: son robustos y casi sin mantenimiento.</>}
          />

          <Section title="Motor de inducción trifásico">
            <P>El motor de inducción (también llamado motor asíncrono) es el más usado en las aeronaves comerciales por su robustez y bajo mantenimiento. El campo magnético giratorio del estátor induce corrientes en el rotor, que generan el par.</P>
            <Concept title="Campo magnético giratorio">
              Tres devanados desfasados 120° entre sí, alimentados por CA trifásica a 400 Hz, crean un campo magnético resultante que gira a la velocidad de sincronismo: <strong>ns = 120·f/p</strong> (RPM), donde p es el número de polos.
            </Concept>
            <Eq>{'n_s = \\frac{120 f}{p} \\qquad \\text{Deslizamiento:}\\ s = \\frac{n_s - n}{n_s} \\times 100\\%'}</Eq>
            <P>El rotor siempre gira más lento que el campo (deslizamiento s &gt; 0). A mayor carga, mayor deslizamiento. En vacío, s ≈ 1–3%.</P>
          </Section>

          <Section title="Motor síncrono">
            <P>En el motor síncrono el rotor gira exactamente a la velocidad de sincronismo (s = 0). Se consigue excitando el rotor con DC para que cree sus propios polos que se "enganchen" al campo girante del estátor.</P>
            <DefList items={[
              { term: 'Ventaja', def: 'Factor de potencia controlable (puede corregir el fp de la red).' },
              { term: 'Desventaja', def: 'No arranca solo (necesita devanado de arranque asíncrono o variador de frecuencia). No acepta sobrecargas (se desincroniza).' },
              { term: 'Uso en aviación', def: 'Giroscopios giroscópicos (horizonte artificial, DI) usan pequeños motores síncronos de alta velocidad (12 000–24 000 RPM a 400 Hz).' },
            ]} />
          </Section>

          <Section title="Comparativa de motores en aeronaves">
            <Table
              headers={['Tipo', 'Velocidad', 'Mantenimiento', 'Aplicaciones típicas']}
              rows={[
                ['Inducción trifásico AC', 'Cuasi-constante', 'Muy bajo', 'Bombas hid., comp. A/C, ventiladores'],
                ['Síncrono AC', 'Constante exacta', 'Bajo', 'Giroscopios, actuadores precisos'],
                ['DC serie', 'Variable', 'Medio (escobillas)', 'Arranque motores, trenes aterrizaje'],
                ['DC imán permanente', 'Variable', 'Bajo', 'Actuadores pequeños, drones, UAV'],
                ['BLDC (sin escobillas)', 'Variable (VFD)', 'Muy bajo', 'Bombas combustible, actuadores modernos'],
              ]}
            />
            <Aviation title="Motores eléctricos en el B787 Dreamliner">
              El Boeing 787 usa una arquitectura "more electric aircraft" donde muchas funciones hidráulicas han sido sustituidas por motores eléctricos: compresores eléctricos de aire, bombas hidráulicas eléctricas, frenos eléctricos y puertas eléctricas. Los motores BLDC de alta potencia alimentados con 270 V DC son la clave de esta arquitectura.
            </Aviation>
          </Section>

          <Summary items={[
            'Motor de inducción: campo girante del estátor induce corrientes en el rotor. s > 0 siempre.',
            'Velocidad de sincronismo: ns = 120·f/p RPM. El rotor gira a ns·(1−s).',
            'Motor síncrono: rotor gira exactamente a ns. Usado en giroscopios de aviación.',
            'El B787 usa arquitectura "more electric": motores BLDC a 270 V DC en lugar de sistemas hidráulicos.',
          ]} />

          <Solved n="3.18.A" title="Motor de inducción trifásico del compresor de A/C">
            {{
              q: <P>El compresor de aire acondicionado del A320 usa un motor de inducción trifásico de 4 polos alimentado a 400 Hz. (a) Calcula la velocidad de sincronismo. (b) A plena carga, el deslizamiento es s = 3%. Calcula la velocidad real del rotor. (c) Si la potencia mecánica útil es 8 kW y η = 88%, ¿qué potencia eléctrica consume?</P>,
              a: <>
                <P><strong>(a) Velocidad de sincronismo (p = número de polos = 4):</strong></P>
                <Eq>{'n_s = \\frac{120 \\cdot f}{p} = \\frac{120 \\times 400}{4} = 12\\,000\\ \\text{RPM}'}</Eq>
                <P><strong>(b) Velocidad real del rotor:</strong></P>
                <Eq>{'n = n_s \\times (1-s) = 12000 \\times (1-0.03) = 11\\,640\\ \\text{RPM}'}</Eq>
                <P><strong>(c) Potencia eléctrica consumida:</strong></P>
                <Eq>{'P_{elec} = \\frac{P_{mec}}{\\eta} = \\frac{8000}{0.88} = 9090\\ \\text{W} \\approx 9.1\\ \\text{kW}'}</Eq>
                <P>Este motor de A/C a 12 000 RPM es mucho más compacto y ligero que uno equivalente a 3000 RPM (50 Hz), una ventaja crítica en la zona del compresor de cabina del avión.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Un giroscopio de horizonte artificial usa un motor síncrono de 2 polos a 400 Hz. ¿A cuántas RPM gira el rotor giroscópico?</P>,
              a: <><Eq>{'n_s = \\frac{120 \\times 400}{2} = 24\\,000\\ \\text{RPM}'}</Eq><P>La alta velocidad garantiza gran momento angular giroscópico, que proporciona la estabilidad en espacio necesaria para el horizonte artificial.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué los motores de inducción de las aeronaves son prácticamente libres de mantenimiento en comparación con los motores DC con escobillas?</P>,
              a: <><P><strong>R:</strong> Los motores de inducción no tienen colector ni escobillas: el rotor (tipo jaula de ardilla) no tiene conexiones eléctricas externas ni piezas de desgaste. Las únicas piezas que pueden desgastarse son los <strong>rodamientos</strong>, que tienen vidas de 20 000–50 000 horas. El mantenimiento se limita a la inspección y engrase de rodamientos. Los motores DC, en cambio, requieren inspección de escobillas cada 500–1000 horas y sustitución de escobillas y colector periódicamente.</P></>
            },
            {
              n: 3,
              q: <P>Un motor de inducción de 6 polos alimentado a 400 Hz tiene deslizamiento de 2% a plena carga. Calcula la velocidad de sincronismo y la velocidad real del rotor.</P>,
              a: <><Eq>{'n_s = \\frac{120\\times400}{6} = 8000\\ \\text{RPM} \\qquad n = 8000\\times(1-0.02) = 7840\\ \\text{RPM}'}</Eq></>
            },
            {
              n: 4,
              q: <P>Explica la diferencia entre un motor síncrono y un motor de inducción en términos de deslizamiento y factor de potencia. ¿Cuál es más adecuado para una bomba hidráulica de avión?</P>,
              a: <><P><strong>R:</strong> El <strong>motor síncrono</strong> tiene s = 0 exacto (gira a ns), y su factor de potencia puede ser controlable (sobreexcitado: fp capacitivo; subexcitado: fp inductivo). El <strong>motor de inducción</strong> siempre tiene s &gt; 0 y factor de potencia inductivo fijo (típicamente 0.8–0.9). Para una bomba hidráulica de avión, el motor de inducción es más adecuado por su mayor robustez, arranque autónomo y bajo mantenimiento, aunque el síncrono ofrece velocidad más constante.</P></>
            },
            {
              n: 5,
              q: <P>El B787 reemplazó las bombas hidráulicas de accionamiento mecánico (PTU) por bombas eléctricas BLDC a 270 V DC. ¿Qué ventajas operacionales ofrece esto para el piloto y el sistema de mantenimiento?</P>,
              a: <><P><strong>R:</strong> Ventajas operacionales: (1) <strong>Demanda instantánea</strong>: el piloto puede activar la bomba hidráulica exactamente cuando la necesita, sin depender de que el motor esté a RPM suficientes; (2) <strong>Diagnóstico más fácil</strong>: el FADEC/ELMS monitoriza tensión, corriente y temperatura del motor eléctrico y puede detectar anomalías antes del fallo (mantenimiento predictivo); (3) <strong>Mayor disponibilidad</strong>: si un motor falla, la bomba eléctrica puede suministrar el circuito desde cualquier bus disponible; (4) <strong>Menor ruido hidráulico</strong>: sin PTU, desaparece el característico "perro ladrando" del PTU en el aterrizaje (que preocupaba a los pasajeros en aviones anteriores).</P></>
            },
          ]} />
        </>
      ),
    },

  ], // fin chapters
};

export default m3;
