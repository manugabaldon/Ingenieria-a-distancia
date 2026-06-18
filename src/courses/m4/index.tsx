import {
  CourseModule,
  Section, P, Eq, EqI, Fig, SvgFig, Grid,
  Example, Note, Warn, Concept, Aviation, DefList, Table, Summary,
  Solved, Practice,
} from '../CourseView';

import {
  DiagramDiodo, DiagramTransistor, DiagramPID, DiagramBusARINC,
} from '../CourseDiagrams';

// ── Unsplash images ──────────────────────────────────────────────────────────
const IMG = {
  semiconductor: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  wafer:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  chip:          'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80',
  pcb:           'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=900&q=80',
  autopilot:     'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80',
  cockpit:       'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  binary:        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
  arinc:         'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=900&q=80',
};

const m4: CourseModule = {
  id: 'm4',
  code: 'M4',
  title: 'Fundamentos Electrónicos',
  subtitle: 'Semiconductores, PCBs y servomecanismos',
  icon: '🔬',
  license: 'B2',
  description: 'Electrónica aplicada a la aviónica exigida por EASA Part-66 para la licencia B2 (Aviónicos).',
  chapters: [

    // ════════════════════════════════════════════════════════════════
    // 4.1  SEMICONDUCTORES — DIODOS
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-01',
      title: '4.1 Semiconductores — Diodos',
      body: (
        <>
          <Grid>
            <Fig src={IMG.wafer} alt="Oblea de silicio semiconductor" height={195}
              caption={<><strong>Figura 4.1</strong> Oblea de silicio (wafer) de 300 mm. Cada chip contiene millones de diodos y transistores grabados mediante fotolitografía. El silicio puro (semiconductor intrínseco) se dopa con impurezas para crear las regiones N y P que forman los dispositivos electrónicos.</>}
            />
            <Fig src={IMG.semiconductor} alt="Circuito integrado de aviónica" height={195}
              caption={<><strong>Figura 4.2</strong> Circuito integrado de aviónica de alta fiabilidad. Los chips aeronáuticos deben operar entre −55°C y +125°C y soportar las vibraciones y entornos EMI/HIRF del avión, certificados según DO-254 (hardware) y DO-178C (software).</>}
            />
          </Grid>

          <Section title="Semiconductores intrínsecos">
            <P>Los semiconductores puros (Si, Ge) tienen <strong>4 electrones de valencia</strong> que forman enlaces covalentes. A temperatura ambiente, la agitación térmica rompe algunos enlaces, creando <strong>pares electrón-hueco</strong>:</P>
            <DefList items={[
              { term: 'Electrón libre', def: 'Portador de carga negativa. Se mueve en sentido opuesto al campo eléctrico.' },
              { term: 'Hueco', def: 'Ausencia de electrón en la red → se comporta como portador de carga positiva. Se mueve en el sentido del campo.' },
              { term: 'Conductividad intrínseca', def: <>Muy baja a temperatura ambiente. El Si puro tiene ρ ≈ 640 Ω·m (cf. Cu: <EqI>{'1.72 \\times 10^{-8}'}</EqI> Ω·m). Aumenta con la temperatura (NTC).</> },
            ]} />
          </Section>

          <Section title="Dopaje — semiconductores extrínsecos">
            <P>Añadiendo <strong>impurezas controladas</strong> (dopaje) se modifica drásticamente la conductividad (hasta 10 órdenes de magnitud). Concentración típica: 1 átomo por cada 10⁷–10⁸ átomos de Si.</P>
            <Table headers={['Tipo', 'Dopante', 'Portador mayoritario', 'Ejemplos de dopante']} rows={[
              ['N (negativo)', 'Pentavalente (5 val.)', 'Electrones libres', 'Fósforo (P), Arsénico (As), Antimonio (Sb)'],
              ['P (positivo)', 'Trivalente (3 val.)', 'Huecos (h⁺)', 'Boro (B), Aluminio (Al), Galio (Ga)'],
            ]} />
          </Section>

          <Section title="Unión P-N — barrera de potencial y diodo">
            <P>Al unir físicamente una zona P con una N, los portadores mayoritarios se difunden y se recombinan, creando la <strong>zona de deplexión</strong> (sin portadores libres) y una <strong>barrera de potencial</strong>: V_B ≈ 0.6–0.7 V (Si) o 0.2–0.3 V (Ge).</P>
            <SvgFig caption={<><strong>Figura 4.3</strong> Estructura de la unión P-N. La región P (huecos, rojo) y la región N (electrones, azul) se unen creando la zona de deplexión (violeta). El símbolo del diodo muestra el ánodo (+) a la izquierda y el cátodo (−) a la derecha. La corriente convencional fluye de ánodo a cátodo en conducción directa.</>}>
              <DiagramDiodo />
            </SvgFig>

            <P>La ecuación de Shockley describe la relación corriente-tensión del diodo:</P>
            <Eq>{'I = I_s \\left(e^{\\,qV/nkT} - 1\\right) \\qquad V_T = \\frac{kT}{q} \\approx 26\\ \\text{mV a 25°C}'}</Eq>
            <DefList items={[
              { term: 'Polarización directa (V_A > V_K)', def: 'La tensión externa reduce la barrera. Para V > 0.6V (Si), la corriente crece exponencialmente. El diodo conduce.' },
              { term: 'Polarización inversa (V_A < V_K)', def: <>Solo pasa la corriente de saturación inversa Is (nA–μA). El diodo bloquea.</> },
              { term: 'Avalancha / Zener', def: 'Si la tensión inversa supera V_BR, el campo arranca portadores. Usado intencionadamente en diodos Zener para regulación de tensión.' },
            ]} />
          </Section>

          <Section title="Tipos de diodos y aplicaciones aeronáuticas">
            <Table headers={['Tipo', 'Característica', 'Aplicación aeronáutica']} rows={[
              ['Rectificador', 'Alta I, V_f = 0.7V', 'TRU, fuentes de alimentación, rectificación de CA'],
              ['Zener', 'V_ruptura estable', 'Regulación de tensión de referencia, protección sobretensión'],
              ['Schottky', 'V_f = 0.2–0.4V, rápido', 'Circuitos de alta frecuencia, OR lógico en buses redundantes'],
              ['LED', 'Emite luz al conducir', 'Indicadores de panel, iluminación de cabina, avisos visuales'],
              ['Fotodiodo', 'Genera I con la luz', 'Detectores ópticos, sensores de proximidad, encoders'],
              ['Rueda libre (flyback)', 'Protege inductivos', 'Protección de solenoides, relés, motores DC (anti-pico)'],
            ]} />
            <Warn>Los diodos de rueda libre son críticos: sin ellos, la desconexión de una carga inductiva (relé, solenoide) genera picos de tensión de cientos de voltios que pueden destruir transistores y CIs de aviónica.</Warn>

            <Example n="4.1" title="Protección de un relé con diodo de rueda libre"
              given={<P>Una bobina de relé con <EqI>{'L = 50\\ \\text{mH}'}</EqI> lleva <EqI>{'I = 0.2\\ \\text{A}'}</EqI>. Se corta bruscamente la corriente en <EqI>{'\\Delta t = 1\\ \\mu\\text{s}'}</EqI>. ¿Qué pico de tensión genera?</P>}
              solution={
                <>
                  <Eq>{'V_{pico} = L \\frac{\\Delta I}{\\Delta t} = 50 \\times 10^{-3} \\times \\frac{0.2}{1 \\times 10^{-6}} = 10\\ 000\\ \\text{V}'}</Eq>
                  <P>¡10 kV en un circuito de 28 V! Con un diodo de rueda libre, este pico se limita a ≈ 0.7 V, protegiendo completamente el transistor de conmutación.</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Si: 4 electrones de valencia. Dopaje N (fósforo): electrones libres. Dopaje P (boro): huecos.',
            'Unión P-N: barrera V_B ≈ 0.6V (Si). Conducción directa: V > 0.6V. Inversa: bloqueo.',
            'Ecuación de Shockley: I = Is·(e^(V/VT) − 1). VT ≈ 26 mV a 25°C.',
            'Diodo flyback: imprescindible para proteger transistores de cargas inductivas (solenoides, relés).',
          ]} />

          <Solved n="4.1.A" title="Corriente y caída en un diodo rectificador"
            q={<P>Un diodo de silicio (V_f = 0,7 V) está en serie con R = 220 Ω alimentado por 12 V. Calcular la corriente en conducción directa y la potencia disipada en el diodo.</P>}
            a={<><Eq>{'I = \\frac{V - V_f}{R} = \\frac{12 - 0.7}{220} = \\frac{11.3}{220} = 51.4\\ \\text{mA}'}</Eq><Eq>{'P_{diodo} = V_f \\times I = 0.7 \\times 0.0514 = 36\\ \\text{mW}'}</Eq><P>La corriente es <strong>51,4 mA</strong> y el diodo disipa <strong>36 mW</strong>. En un TRU aeronáutico que rectifica 115 V AC, los diodos deben disipar vatios, no miliwatios — requieren disipadores.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Cuántos electrones pasan por un conductor en 1 segundo si la corriente es 2 A? (carga del electrón: q = 1,6×10⁻¹⁹ C)</P>, hint: <span>N = I·t / q</span>, a: <><Eq>{'N = I \\cdot t / q = 2 \\times 1 / (1.6 \\times 10^{-19}) = 1.25 \\times 10^{19}\\ \\text{electrones}'}</Eq></> },
            { n: 2, q: <P>Un diodo Zener de 12 V se usa para proteger un circuito alimentado a 28 V. La resistencia en serie es R = 1 kΩ. Calcular la corriente por el Zener.</P>, a: <><Eq>{'I_Z = (V_{CC} - V_Z)/R = (28 - 12)/1000 = 16\\ \\text{mA}'}</Eq></> },
            { n: 3, q: <P>Un LED de aviónica tiene V_f = 2,2 V y necesita I = 20 mA. El bus es de 28 V. ¿Qué resistencia en serie hay que poner?</P>, a: <><Eq>{'R = (V_{bus} - V_f)/I = (28 - 2.2)/0.020 = 1290\\ \\Omega'}</Eq><P>Se usaría una resistencia estándar de <strong>1,2 kΩ o 1,3 kΩ</strong>.</P></> },
            { n: 4, q: <P>¿Por qué los diodos Schottky (V_f ≈ 0,3 V) se usan en circuitos OR lógicos de buses redundantes de aviónica en lugar de diodos de silicio convencionales?</P>, a: <P><strong>R:</strong> En un OR de diodos para fuentes redundantes, la menor caída de tensión (0,3 V vs 0,7 V) reduce la pérdida de tensión del bus y el calentamiento. En un bus de 28 V, 0,4 V de diferencia representa el 1,4 % de la tensión — significativo para equipos sensibles.</P> },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 4.2  SEMICONDUCTORES — TRANSISTORES Y CIs
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-02',
      title: '4.2 Semiconductores — Transistores y CIs',
      body: (
        <>
          <Fig src={IMG.chip} alt="Chip FPGA de aviónica" height={195}
            caption={<><strong>Figura 4.4</strong> FPGA (Field-Programmable Gate Array) de alta fiabilidad para aviónica. Contiene millones de transistores configurables. Se usa en sistemas de control de vuelo (FCMC), ordenadores de gestión de vuelo (FMC) y sistemas IMA (Integrated Modular Avionics) de aeronaves modernas como el A380 y B787.</>}
          />

          <Section title="Transistor Bipolar de Unión (BJT)">
            <P>El BJT tiene tres terminales: <strong>Base (B)</strong>, <strong>Colector (C)</strong> y <strong>Emisor (E)</strong>. En la región activa, una pequeña corriente de base controla una corriente de colector mucho mayor:</P>
            <Eq>{'I_C = \\beta \\cdot I_B \\qquad I_E = I_C + I_B = (\\beta + 1) I_B \\qquad \\beta \\equiv h_{FE} \\approx 50\\text{–}500'}</Eq>
            <SvgFig caption={<><strong>Figura 4.5</strong> Símbolo y corrientes del transistor NPN. IB (base, naranja) controla IC (colector, rojo). IE (emisor, azul) = IC + IB. En región activa: IC = β·IB. En saturación (switch ON): IC máxima. En corte (switch OFF): IC ≈ 0.</>}>
              <DiagramTransistor />
            </SvgFig>
            <DefList items={[
              { term: 'Región de corte', def: 'IB = 0 → IC ≈ 0. Transistor OFF (interruptor abierto).' },
              { term: 'Región activa', def: 'IC = β·IB. Amplificación lineal de señal (amplificadores de audio, RF).' },
              { term: 'Región de saturación', def: 'IC máxima limitada por circuito externo. Transistor ON (interruptor cerrado). Usado en conmutación digital.' },
            ]} />
          </Section>

          <Section title="Transistor de Efecto de Campo (FET)">
            <P>El FET controla la corriente mediante un <strong>campo eléctrico</strong> (tensión V_GS), no una corriente. Impedancia de entrada muy alta (GΩ):</P>
            <Table headers={['Tipo', 'Control', 'Impedancia', 'Uso en aviónica']} rows={[
              ['JFET', 'Tensión V_GS', 'Alta (MΩ)', 'Amplificadores de RF, etapas de entrada de bajo ruido'],
              ['MOSFET mejora (N)', 'Tensión V_GS > 0', 'Muy alta (GΩ)', 'Conmutación digital, drivers de potencia (SSPCs)'],
              ['MOSFET potencia', 'Tensión V_GS', 'Muy alta', 'Reguladores DC/DC en fuentes de aviónica'],
            ]} />
            <Note>Los <strong>SSPCs</strong> (Solid State Power Controllers) sustituyen en aeronaves modernas a los disyuntores y relés convencionales. Usan MOSFETs de potencia para conmutar cargas con respuesta en microsegundos, monitorización continua y posibilidad de reconfiguración en vuelo (B787, A380).</Note>
          </Section>

          <Section title="Circuitos Integrados (CIs) — escala de integración">
            <Table headers={['Escala', 'Acrónimo', 'Transistores/chip', 'Ejemplo en aviónica']} rows={[
              ['Pequeña', 'SSI', '< 100', 'Puertas lógicas (74xx)'],
              ['Media', 'MSI', '100–10 000', 'Contadores, multiplexores, decodificadores'],
              ['Grande', 'LSI', '10 000–100 000', 'Microprocesadores 8/16 bits'],
              ['Muy grande', 'VLSI', '> 100 000', 'CPUs, FPGAs, ASICs de FMC/ADIRU'],
            ]} />
            <Aviation title="FPGAs en aviónica certificada">
              Los FPGAs (Field-Programmable Gate Arrays) son reprogramables y se usan en sistemas de control de vuelo, FMS (Flight Management System) y ordenadores de datos aéreos. Deben certificarse según DO-254 nivel A o B. Su flexibilidad permite actualizar funcionalidades en servicio mediante nuevas versiones de firmware.
            </Aviation>
          </Section>

          <Section title="Tiristores (SCR y TRIAC)">
            <DefList items={[
              { term: 'SCR (Silicon Controlled Rectifier)', def: 'Estructura PNPN de cuatro capas. Se activa con un pulso de puerta (gate) y permanece conductivo hasta que la corriente cae a cero. Rectificadores controlados de alta potencia.' },
              { term: 'TRIAC', def: 'Equivalente bidireccional del SCR: conduce en ambas polaridades. Control de motores AC, dimmers de cabina, calefactores.' },
            ]} />
          </Section>

          <Summary items={[
            'BJT: IC = β·IB. Regiones: corte (OFF), activa (amplificación), saturación (ON).',
            'FET/MOSFET: controlado por tensión VGS, impedancia de entrada GΩ. Usado en SSPCs.',
            'SSPCs sustituyen a los disyuntores convencionales en aeronaves modernas (B787, A380).',
            'FPGAs: circuitos reprogramables certificados DO-254 usados en FMC, ADIRU y FCMC.',
          ]} />

          <Solved n="4.2.A" title="Transistor BJT como interruptor — activación de relé"
            q={<P>Un relé de 28 V / 80 mA se activa mediante un transistor NPN (β = 120). ¿Qué corriente de base mínima necesita? Si R_B = 10 kΩ y V_CC = 5 V (lógica), ¿cuánto vale I_B?</P>}
            a={<><Eq>{'I_B^{min} = I_C/\\beta = 80\\,\\text{mA}/120 = 0.67\\ \\text{mA}'}</Eq><Eq>{'I_B^{real} = (V_{CC} - V_{BE})/R_B = (5 - 0.7)/10000 = 0.43\\ \\text{mA}'}</Eq><P>I_B real (0,43 mA) &lt; I_B mínima (0,67 mA) → el transistor <strong>no saturará</strong>. Hay que reducir R_B a ≤ (5−0,7)/0,67 = <strong>6,4 kΩ</strong> como máximo.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Un transistor NPN tiene β = 200 e I_B = 0,5 mA. ¿Cuál es I_C? ¿E I_E?</P>, a: <><Eq>{'I_C = \\beta I_B = 200 \\times 0.5 = 100\\ \\text{mA} \\qquad I_E = I_C + I_B = 100.5\\ \\text{mA}'}</Eq></> },
            { n: 2, q: <P>Un SSPC (Solid State Power Controller) usa un MOSFET de potencia. ¿Por qué es preferible al relé electromecánico convencional en un cuadro eléctrico de aeronave?</P>, a: <P><strong>R:</strong> (1) Sin partes móviles → vida ilimitada. (2) Respuesta en microsegundos (vs 5-15 ms del relé). (3) Monitorización continua de corriente. (4) Reseteable remotamente desde ECAM/EICAS. (5) Menor peso y volumen. Desventaja: más sensible a ESD y requiere circuitos de protección más sofisticados.</P> },
            { n: 3, q: <P>Un CI tiene escala de integración VLSI con 2 × 10⁹ transistores. Si cada transistor ocupa 7 nm² de área de silicio, ¿qué área mínima ocupa el chip en mm²?</P>, a: <><Eq>{'A = 2 \\times 10^9 \\times 7 \\times 10^{-18}\\ \\text{m}^2 = 14 \\times 10^{-9}\\ \\text{m}^2 = 14\\ \\text{nm}^2 \\times N'}</Eq><P>A = 14 mm² (en realidad los chips modernos de 7 nm tienen ~100 mm² incluyendo interconexiones, I/O y overhead).</P></> },
            { n: 4, q: <P>¿Qué diferencia fundamental existe entre un JFET y un MOSFET en términos de control y aplicación en aviónica?</P>, a: <P><strong>R:</strong> El JFET se controla con una <strong>unión P-N polarizada en inversa</strong> (corriente de gate ~nA). El MOSFET se controla con un <strong>campo eléctrico a través de óxido</strong> (corriente de gate ~pA, impedancia GΩ). En aviónica, los MOSFET son preferidos para SSPCs y convertidores DC/DC por su menor consumo de gate, conmutación más rápida y mayor integración.</P> },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 4.3  CIRCUITOS IMPRESOS (PCB)
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-03',
      title: '4.3 Circuitos impresos (PCB)',
      body: (
        <>
          <Fig src={IMG.pcb} alt="PCB de alta densidad de aviónica" height={195}
            caption={<><strong>Figura 4.6</strong> PCB (Printed Circuit Board) multicapa de alta densidad de un equipo de aviónica. Las capas interiores de cobre (pistas) están separadas por materiales dieléctricos (FR4 o poliimida). Los componentes SMD (Surface Mount Devices) se sueldan sobre los pads de la cara exterior.</>}
          />

          <Section title="Estructura y tipos de PCB">
            <P>Una <strong>PCB</strong> consiste en capas de material dieléctrico (FR4, poliimida en aviónica) con pistas conductoras de cobre grabadas fotoquímicamente.</P>
            <Table headers={['Tipo', 'Capas cobre', 'Uso aeronáutico']} rows={[
              ['Simple cara (single-sided)', '1', 'Circuitos sencillos, bajo coste'],
              ['Doble cara (double-sided)', '2', 'Equipos de baja complejidad'],
              ['Multicapa (multilayer)', '4–32+', 'LRUs de aviónica: FMC, ADIRU, EFIS'],
              ['PCB flexible (flex)', '1–4, poliimida', 'Conexiones entre módulos, cockpit displays'],
              ['PCB rígido-flexible', 'Combinación', 'Integración 3D en espacio reducido, radar'],
            ]} />
          </Section>

          <Section title="Tecnologías de montaje">
            <DefList items={[
              { term: 'Through-Hole (THT)', def: 'Los terminales del componente pasan por taladros y se sueldan en el lado opuesto. Conexión muy robusta ante vibración. Conectores, condensadores grandes, relés.' },
              { term: 'Surface Mount (SMT)', def: 'Componentes soldados directamente sobre pads en la superficie. Alta densidad de integración. ICs, resistencias SMD, condensadores.' },
              { term: 'BGA (Ball Grid Array)', def: 'Terminales son bolas de soldadura en la parte inferior del chip. Máxima densidad. FPGAs, procesadores de aviónica. Difícil de inspeccionar y reparar.' },
            ]} />
          </Section>

          <Section title="Soldadura y normas de calidad aeronáutica">
            <P>La calidad de la soldadura en aviónica está regulada por <strong>IPC-A-610</strong> (Acceptability of Electronic Assemblies):</P>
            <Table headers={['Clase', 'Aplicación', 'Criterios']} rows={[
              ['Clase 1', 'Electrónica general (juguetes, electrodomésticos)', 'Funcional, sin requisitos de apariencia'],
              ['Clase 2', 'Productos de larga vida (instrumentos)', 'Uniones fiables, defectos menores aceptables'],
              ['Clase 3', 'Críticos: aviónica, militar, médico', 'Máxima fiabilidad. Cero defectos. Inspección 100%.'],
            ]} />
            <Warn>Toda reparación de PCBs de aviónica debe seguir IPC-A-610 Clase 3 y el CMM (Component Maintenance Manual) del fabricante. Reparaciones no documentadas pueden invalidar la certificación del equipo (EASA Form 1 / CRS).</Warn>
          </Section>

          <Section title="Condiciones ambientales — DO-160G">
            <P>Los equipos aeronáuticos deben superar los ensayos de <strong>DO-160G</strong> (RTCA) o <strong>MIL-STD-810</strong>:</P>
            <DefList items={[
              { term: 'Temperatura', def: '−55°C a +70°C (operación). Ciclos térmicos causan fatiga de soldaduras por diferente expansión (CTE mismatch).' },
              { term: 'Vibración', def: 'Amplitudes definidas por zona de instalación (motor, fuselaje, ala). Causa fractura de pistas y soldaduras por fatiga.' },
              { term: 'Humedad', def: 'Condensación, corrosión de pistas, electromigración. Las PCBs aeronáuticas llevan recubrimiento conformal (barniz acrílico, silicona o uretano).' },
              { term: 'EMI / HIRF', def: 'Los equipos deben ser inmunes a campos externos (radares, telefonía — HIRF) y no emitir interferencias que afecten a otros sistemas.' },
            ]} />
          </Section>

          <Summary items={[
            'PCB: capas de dieléctrico (FR4/poliimida) con pistas de cobre. Multicapa para aviónica.',
            'Montaje THT (robusto) vs. SMT (alta densidad) vs. BGA (máxima densidad, difícil reparar).',
            'Calidad IPC-A-610 Clase 3: máxima fiabilidad, cero defectos, inspección 100%.',
            'DO-160G: ensayos de temperatura (−55 a +70°C), vibración, humedad y EMI/HIRF.',
          ]} />

          <Solved n="4.3.A" title="Elección de tecnología de montaje para LRU"
            q={<P>Un técnico debe reparar una PCB de aviónica (ADIRU) dañada por un impacto de agua. La PCB es multicapa de 8 capas con componentes BGA y SMD. Describe el proceso de evaluación y criterios de aceptación IPC-A-610 a aplicar.</P>}
            a={<P><strong>1)</strong> Inspección visual bajo luz UV y lupa ×10: detectar corrosión, pistas dañadas, componentes sueltos. <strong>2)</strong> Ensayo eléctrico (hipot test) para verificar aislamiento entre capas ≥ 1 MΩ/V. <strong>3)</strong> Los BGA dañados se evalúan mediante rayos X (inspección interna de bolas de soldadura). <strong>4)</strong> Criterio IPC-A-610 <strong>Clase 3</strong>: cero defectos en uniones BGA (ninguna bola abierta o con bridging). La reparación de BGA requiere herramienta de rework BGA certificada. <strong>5)</strong> Tras reparación: recubrimiento conformal y re-ensayo completo. Documentar en EASA Form 1.</P>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Por qué las PCBs aeronáuticas usan poliimida (Kapton) en lugar del FR4 estándar para aplicaciones de alta temperatura?</P>, a: <P><strong>R:</strong> El FR4 tiene Tg (temperatura de transición vítrea) de ~130 °C. La poliimida soporta hasta 260 °C continuos. En zonas cercanas al motor o en el APU, las temperaturas superan el límite del FR4. Además la poliimida es más resistente a la humedad y a los rayos X, importante en aviónica.</P> },
            { n: 2, q: <P>Un condensador SMD de 100 μF / 50 V se monta erróneamente al revés en una PCB de 28 V. ¿Qué ocurre y cuál es el riesgo para el avión?</P>, a: <P><strong>R:</strong> Un condensador electrolítico polarizado al revés se destruye: la reacción química inversa genera gas y puede causar <strong>explosión del condensador</strong>. En un LRU aeronáutico, esto puede incendiar el equipo o crear cortocircuito en el bus de 28 V, disparando el SSPC/CB. IPC-A-610 requiere inspección de polaridad 100 % antes del revestimiento.</P> },
            { n: 3, q: <P>¿Qué ensayo de DO-160G verifica que un equipo no interfiera con los sistemas de radio del avión (VHF, HF, NAV)?</P>, a: <P>El ensayo de <strong>Emisiones Conducidas y Radiadas</strong> (DO-160G Sección 21). El equipo no debe emitir señales que superen los límites CISPR en la banda 150 kHz – 30 MHz (conducidas) ni 30 MHz – 6 GHz (radiadas). Esto protege los receptores de VHF (118-137 MHz), DME (962-1213 MHz) y GPS (1575 MHz).</P> },
            { n: 4, q: <P>Una PCB tiene una pista de cobre de longitud 15 cm, anchura 0,5 mm y espesor 35 μm (1 oz). Calcular su resistencia (ρ_Cu = 1,72×10⁻⁸ Ω·m).</P>, a: <><Eq>{'A = 0.5 \\times 10^{-3} \\times 35 \\times 10^{-6} = 1.75 \\times 10^{-8}\\ \\text{m}^2'}</Eq><Eq>{'R = \\rho L/A = 1.72 \\times 10^{-8} \\times 0.15 / 1.75 \\times 10^{-8} = 0.147\\ \\Omega'}</Eq><P>147 mΩ. A 1 A causa una caída de 147 mV y disipa 147 mW — hay que considerar el calentamiento de la pista.</P></> },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 4.4  SERVOMECANISMOS
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-04',
      title: '4.4 Servomecanismos',
      body: (
        <>
          <Fig src={IMG.autopilot} alt="Sistema de autopiloto en cockpit" height={195}
            caption={<><strong>Figura 4.7</strong> Panel de control del autopiloto (FCU — Flight Control Unit). El autopiloto es un servomecanismo de posición: mantiene el rumbo, altitud o actitud deseada mediante un lazo de control cerrado que actúa sobre los actuadores hidráulicos de las superficies de vuelo.</>}
          />

          <Section title="Sistema de control en lazo cerrado">
            <Concept title="Definición de servomecanismo">
              Un servomecanismo es un sistema de control de posición, velocidad o par en <strong>lazo cerrado</strong> que utiliza la realimentación (feedback) para corregir automáticamente las desviaciones entre la salida real y la deseada. Objetivo: error → 0.
            </Concept>
            <Eq>{'e(t) = r(t) - y(t) \\qquad \\text{Error} = \\text{Referencia} - \\text{Salida real}'}</Eq>
            <DefList items={[
              { term: 'Referencia r(t)', def: 'Valor deseado: posición de timón, deflexión de flap, ángulo de cabeceo.' },
              { term: 'Sensor / transductor', def: 'Mide la salida real. En servos de posición: potenciómetro, resolver, encoder, LVDT.' },
              { term: 'Controlador', def: 'Calcula la señal de corrección. Puede ser P, PI, PD o PID.' },
              { term: 'Actuador', def: 'Convierte la señal eléctrica en movimiento: motor DC/AC, actuador hidráulico, electroválvula.' },
            ]} />
          </Section>

          <SvgFig caption={<><strong>Figura 4.8</strong> Diagrama de bloques del lazo de control PID. La referencia r(t) se compara con la salida real y(t) para obtener el error e(t). El controlador PID calcula la señal de control u(t) que mueve el actuador. El sensor cierra el lazo de realimentación (feedback en rojo).</>}>
            <DiagramPID />
          </SvgFig>

          <Section title="Controlador PID">
            <P>El controlador más común en aviación es el <strong>PID</strong> (Proporcional-Integral-Derivativo):</P>
            <Eq>{'u(t) = K_p \\cdot e(t) + K_i \\int e(t)\\,dt + K_d \\frac{de}{dt}'}</Eq>
            <Table headers={['Acción', 'Efecto sobre respuesta', 'Efecto sobre estabilidad']} rows={[
              ['↑ Kp (Proporcional)', 'Más rápida, mayor sobreoscilación', 'Reduce margen de ganancia'],
              ['↑ Ki (Integral)', 'Elimina error estático (régimen estacionario)', 'Puede causar oscilación (windup)'],
              ['↑ Kd (Derivativa)', 'Amortigua sobreoscilación', 'Sensible al ruido de alta frecuencia'],
            ]} />
          </Section>

          <Section title="Servomecanismos en aviación">
            <Table headers={['Sistema', 'Variable controlada', 'Tipo de actuador']} rows={[
              ['Autopiloto', 'Posición de superficies de vuelo', 'Servomotor AC + caja reductora'],
              ['Fly-By-Wire (PFCS)', 'Deflexión timón/alerón/elevador', 'Actuadores hidráulicos EHA (electro-hydrostatic)'],
              ['FADEC (control motor)', 'Régimen del motor', 'Válvulas de combustible — feedback de RPM y EGT'],
              ['Sistema de tren', 'Posición tren arriba/abajo', 'Actuadores hidráulicos con microswitches fin de carrera'],
              ['Antena SATCOM', 'Apuntamiento de antena', 'Servos de posición con giróscopo de referencia (IRS)'],
            ]} />
          </Section>

          <Section title="LVDT — Transductor de posición">
            <P>El <strong>LVDT</strong> (Linear Variable Differential Transformer) es el sensor de posición lineal más usado en aviación por su robustez y ausencia de contacto mecánico:</P>
            <Eq>{'V_{out} = V_{S1} - V_{S2} \\propto x \\quad \\text{(posición lineal del núcleo)} \\\\ \\text{Rango: } \\pm 2\\ \\text{mm a } \\pm 250\\ \\text{mm} \\qquad T: -65°C \\text{ a } +200°C'}</Eq>
            <Note>Los LVDTs miden posición de flaps, slats, timones, tren de aterrizaje y válvulas de combustible. Su ausencia de contacto mecánico (sin rozamiento) garantiza vida ilimitada y resolución infinita.</Note>

            <Example n="4.2" title="Error de control de autopiloto"
              given={<P>El autopiloto mantiene 350 ft. La altitud real baja a 340 ft. El controlador tiene Kp = 0.5 ft/ft. ¿Qué señal de control produce el término proporcional?</P>}
              solution={
                <>
                  <Eq>{'e = r - y = 350 - 340 = 10\\ \\text{ft}'}</Eq>
                  <Eq>{'u_P = K_p \\cdot e = 0.5 \\times 10 = 5 \\quad \\text{(unidades de deflexión de profundidad)}'}</Eq>
                  <P>El autopiloto ordena 5 unidades de cabeceo positivo para recuperar los 10 ft perdidos. El término integral eliminaría el error residual en estado estacionario.</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Servomecanismo: lazo cerrado — error = referencia − salida real. Objetivo: error → 0.',
            'PID: u = Kp·e + Ki·∫e dt + Kd·de/dt. P: rapidez. I: error estático. D: amortiguación.',
            'LVDT: sensor de posición lineal sin contacto mecánico. Rango ±2–±250 mm.',
            'FADEC: control digital del motor con realimentación de RPM, EGT, presiones y temperaturas.',
          ]} />

          <Solved n="4.4.A" title="Ajuste del controlador P de un autopiloto de altitud"
            q={<P>El autopiloto de altitud tiene Kp = 0,8 (°/ft de error) y Ki = 0. El avión está a 1000 ft por debajo del nivel asignado. ¿Cuántos grados de cabeceo ordena el autopiloto? ¿Es excesivo para pasajeros?</P>}
            a={<><Eq>{'e = 1000\\ \\text{ft} \\qquad u_P = K_p \\times e = 0.8 \\times 1000 = 800°'}</Eq><P>¡800° de cabeceo es absurdo y físicamente imposible! Con solo Kp, para errores grandes el controlador satura. En la práctica el autopiloto limita la orden a ±15° de cabeceo. Además, sin término integral (Ki = 0), habrá <strong>error estático permanente</strong> en crucero. El ajuste real implica Kp pequeño (0,05–0,2) con integrador para eliminar el error residual.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Un servo de posición de flap tiene Kp = 2, Ki = 0,5, Kd = 0,1. El flap debe estar a 20° pero está en 18°. Calcular la señal de control total si la derivada del error es −0,5°/s y el error acumulado es 8°·s.</P>, a: <><Eq>{'u = 2 \\times 2 + 0.5 \\times 8 + 0.1 \\times (-0.5) = 4 + 4 - 0.05 = 7.95\\ \\text{u}'}</Eq><P>Señal de control = <strong>7,95 unidades</strong>, positiva → mueve el flap hacia los 20° deseados.</P></> },
            { n: 2, q: <P>¿Qué ocurre con un servo de posición si el término derivativo Kd es excesivamente grande? ¿Cómo se manifiesta en el comportamiento de la superficie de vuelo?</P>, a: <P><strong>R:</strong> Con Kd excesivo, el sistema se vuelve muy sensible al ruido de alta frecuencia en la señal del sensor. La superficie de vuelo vibrará (oscilación de alta frecuencia) incluso sin perturbaciones — fenómeno llamado <strong>chattering</strong>. En aviación esto puede causar fatiga estructural y malestar en pasajeros.</P> },
            { n: 3, q: <P>Un LVDT mide la posición de un actuador con rango ±50 mm. Su salida es ±10 V proporcional. Si mide V_out = +3,5 V, ¿en qué posición está el actuador?</P>, a: <><Eq>{'x = (V_{out}/V_{max}) \\times x_{max} = (3.5/10) \\times 50 = +17.5\\ \\text{mm}'}</Eq><P>El actuador está <strong>17,5 mm extendido</strong> del punto cero.</P></> },
            { n: 4, q: <P>¿Por qué el FADEC necesita al menos dos canales redundantes (FADEC A y FADEC B) en un motor certificado bajo CS-E?</P>, a: <P><strong>R:</strong> CS-E requiere que ningún fallo simple provoque pérdida de control del motor. Con doble canal: si el canal A falla (fallo de su microprocesador, sensor o actuador), el canal B asume el control sin interrupción. Los dos canales se monitorizan mutuamente. El diseño cumple el nivel de integridad DAL B (DO-178C): probabilidad de fallo &lt; 10⁻⁷ por hora de vuelo.</P> },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 4.5  ELECTRÓNICA DIGITAL — FUNDAMENTOS
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-05',
      title: '4.5 Electrónica digital — Fundamentos',
      body: (
        <>
          <Fig src={IMG.binary} alt="Código binario digital" height={195}
            caption={<><strong>Figura 4.9</strong> Representación visual de datos digitales. Los sistemas digitales representan toda la información mediante dos estados: 1 (tensión alta) y 0 (tensión baja). Esta simplicidad fundamental permite procesar, transmitir y almacenar cualquier tipo de información —voz, imágenes, datos de vuelo— con máxima inmunidad al ruido.</>}
          />

          <Section title="Sistema binario y lógica digital">
            <P>Los sistemas digitales trabajan con dos estados lógicos representados por niveles de tensión:</P>
            <Table headers={['Familia lógica', 'Nivel alto (1)', 'Nivel bajo (0)', 'Uso']} rows={[
              ['TTL (5V)', '2.4–5.0 V', '0–0.4 V', 'Electrónica clásica, compatible CMOS 5V'],
              ['CMOS 3.3V', '2.0–3.3 V', '0–0.8 V', 'FPGAs, microcontroladores modernos de aviónica'],
              ['LVDS (diferencial)', '±350 mV diferencial', '—', 'Buses alta velocidad: ARINC 664/AFDX'],
            ]} />
          </Section>

          <Section title="Puertas lógicas fundamentales">
            <Table headers={['Puerta', 'Símbolo', 'Función', 'Expresión booleana']} rows={[
              ['AND', '&', 'Salida 1 solo si TODAS las entradas son 1', 'Y = A · B'],
              ['OR', '≥1', 'Salida 1 si AL MENOS UNA es 1', 'Y = A + B'],
              ['NOT', '○', 'Invierte la entrada', 'Y = Ā'],
              ['NAND', '&○', 'Inverso de AND (universal)', 'Y = A̅·̅B̅'],
              ['NOR', '≥1○', 'Inverso de OR (universal)', 'Y = A̅+̅B̅'],
              ['XOR', '=1', 'Salida 1 si entradas son DISTINTAS', 'Y = A ⊕ B'],
            ]} />
            <Note>NAND y NOR son puertas <strong>universales</strong>: cualquier función lógica puede implementarse usando solo puertas NAND (o solo NOR). Esto simplifica la fabricación de ASICs aeronáuticos.</Note>
          </Section>

          <Section title="Álgebra de Boole — identidades clave">
            <Eq>{'A + 0 = A \\qquad A \\cdot 1 = A \\qquad A + 1 = 1 \\qquad A \\cdot 0 = 0 \\\\ A + \\bar{A} = 1 \\qquad A \\cdot \\bar{A} = 0 \\\\ \\text{De Morgan: } \\overline{A + B} = \\bar{A} \\cdot \\bar{B} \\qquad \\overline{A \\cdot B} = \\bar{A} + \\bar{B}'}</Eq>
            <Aviation title="Lógica de votación en sistemas FBW">
              Los sistemas Fly-By-Wire usan lógica de votación 2-de-3 (majority voting): si tres ordenadores de vuelo calculan el mismo resultado, dos de tres "votos" iguales son suficientes para comandar los actuadores. Esto permite tolerar un fallo sin degradación de función. Se implementa directamente con puertas lógicas.
            </Aviation>
          </Section>

          <Section title="Sistemas de numeración en aviónica">
            <Table headers={['Sistema', 'Base', 'Dígitos', 'Uso']} rows={[
              ['Binario', '2', '0, 1', 'Procesamiento interno de datos en todo sistema digital'],
              ['Octal', '8', '0–7', 'Códigos transponder SSR Mode A (0000–7777 octal)'],
              ['Hexadecimal', '16', '0–9, A–F', 'Direcciones de memoria, códigos de error ARINC, datos ACARS'],
              ['BCD', '10 en 4 bits', '0–9', 'Display de altímetro, indicadores numéricos digitales'],
            ]} />
            <Example n="4.3" title="Código de squawk en binario y octal"
              given={<P>El control asigna el squawk <strong>7700</strong> (emergencia en SSR Mode A). ¿Cuál es su equivalente binario?</P>}
              solution={
                <>
                  <P>7700 en octal → convertir cada dígito octal a 3 bits binarios:</P>
                  <Eq>{'7 = 111 \\qquad 7 = 111 \\qquad 0 = 000 \\qquad 0 = 000'}</Eq>
                  <P>7700 octal = <strong>111 111 000 000</strong> binario (12 bits). El transponder transmite exactamente estos 12 pulsos en la respuesta Mode A.</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Dos niveles lógicos: 1 (tensión alta) y 0 (tensión baja). Representan toda la información digital.',
            'Puertas básicas: AND, OR, NOT. Universales: NAND, NOR. De Morgan: ̄(A+B) = Ā·B̄.',
            'Transponder SSR usa código octal (0000–7777). 7700=emergencia, 7600=fallo radio, 7500=secuestro.',
            'BCD (4 bits por dígito decimal) se usa en displays de instrumentos numéricos.',
          ]} />

          <Solved n="4.5.A" title="Simplificación booleana — lógica de advertencia"
            q={<P>Un sistema activa la alarma si: <strong>(Motor_ON AND Presión_Baja) OR (Motor_ON AND Temp_Alta)</strong>. Simplificar con álgebra de Boole.</P>}
            a={<><Eq>{'Y = (M \\cdot P) + (M \\cdot T) = M \\cdot (P + T)'}</Eq><P>Una sola puerta AND sustituye a dos ANDs + un OR. Esta simplificación es crítica en aviónica: menos puertas = menos componentes = mayor fiabilidad (FMEA más simple).</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Construir la tabla de verdad de Y = (A NAND B) AND C. ¿Para qué combinaciones de A, B, C vale Y = 1?</P>, a: <P>NAND(A,B) = 0 solo cuando A=B=1. Y = 1 cuando C=1 y no ocurre A=B=1: combinaciones (0,0,1), (0,1,1), (1,0,1). <strong>3 combinaciones dan Y=1</strong>.</P> },
            { n: 2, q: <P>Convertir: (a) 1010 1100₂ a hexadecimal. (b) 7654₈ a decimal. (c) 0xFF a decimal.</P>, a: <><P>(a) <strong>0xAC = 172</strong>. (b) 7×512+6×64+5×8+4 = 3584+384+40+4 = <strong>4012</strong>. (c) 15×16+15 = <strong>255</strong>.</P></> },
            { n: 3, q: <P>El transponder recibe squawk 7700 (emergencia). Convertir a binario de 12 bits.</P>, a: <><Eq>{'7=111,\\ 7=111,\\ 0=000,\\ 0=000 \\implies 111\\ 111\\ 000\\ 000'}</Eq></> },
            { n: 4, q: <P>Aplicar De Morgan a: Y = NOT(A OR B OR C).</P>, a: <><Eq>{'\\overline{A + B + C} = \\bar{A} \\cdot \\bar{B} \\cdot \\bar{C}'}</Eq></> },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 4.6  ELECTRÓNICA DIGITAL — CIRCUITOS SECUENCIALES Y BUSES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm4-06',
      title: '4.6 Digital — Circuitos secuenciales y buses de datos',
      body: (
        <>
          <Fig src={IMG.arinc} alt="Aviónica con buses de datos" height={195}
            caption={<><strong>Figura 4.10</strong> Equipo de aviónica con conexiones de bus de datos ARINC 429. Cada conector DB-9 o circular lleva el par trenzado diferencial de un bus. Un equipo moderno como el FMS puede tener más de 30 buses ARINC 429, intercambiando datos con radios, sensores, ADIRU, GPS y sistemas de cabina.</>}
          />

          <Section title="Biestables (Flip-Flops) — memoria digital">
            <P>Los biestables son circuitos con <strong>memoria</strong>: mantienen su estado hasta recibir una señal de cambio. Son la unidad básica de los registros y memorias digitales.</P>
            <DefList items={[
              { term: 'SR (Set-Reset)', def: 'S=1: salida a 1. R=1: salida a 0. S=R=0: mantiene estado. S=R=1: estado prohibido.' },
              { term: 'D (Data)', def: 'La salida Q toma el valor de D en el flanco activo del reloj. Más usado en registros de desplazamiento y memorias.' },
              { term: 'JK', def: 'J=K=1: conmuta la salida en cada flanco. Versión mejorada del SR sin estado prohibido.' },
              { term: 'T (Toggle)', def: 'Conmuta la salida en cada flanco activo. Usado en contadores binarios.' },
            ]} />
            <Note>Un registro de 8 biestables D almacena 1 byte de información. Una memoria SRAM de 1 Mbit contiene 1 048 576 biestables. La arquitectura von Neumann de los procesadores de FMC se basa en registros y memorias construidas con biestables.</Note>
          </Section>

          <Section title="Buses de datos aeronáuticos">
            <P>Los sistemas de aviónica modernos interconectan sus LRUs (Line Replaceable Units) mediante <strong>buses de datos estandarizados</strong>:</P>
          </Section>

          <SvgFig caption={<><strong>Figura 4.11</strong> Topología del bus ARINC 429. Un único transmisor (TX) puede conectar hasta 20 receptores (RX) mediante par trenzado diferencial. La comunicación es estrictamente unidireccional — para bidireccional se necesitan dos buses. Sin posibilidad de colisión de datos.</>}>
            <DiagramBusARINC />
          </SvgFig>

          <Table headers={['Bus', 'Velocidad', 'Topología', 'Uso principal']} rows={[
            ['ARINC 429', '12.5 / 100 kbps', '1 TX → hasta 20 RX (punto a punto)', 'Estándar civil. FMS, ADC, AHRS, radios, GPS'],
            ['MIL-STD-1553B', '1 Mbps', 'Multidrop (BC + RTs)', 'Aviación militar. Muy robusto y determinístico'],
            ['ARINC 664 (AFDX)', '10/100 Mbps', 'Ethernet conmutado full-duplex', 'A380, B787. IMA (Integrated Modular Avionics)'],
            ['CAN bus', '1 Mbps', 'Multidrop diferencial', 'Sistemas de cabina, entretenimiento, sistemas secundarios'],
            ['RS-232 / RS-422', '20 kbps–10 Mbps', 'Punto a punto / diferencial', 'Carga de datos, mantenimiento, CMC'],
          ]} />

          <Aviation title="ARINC 429 — detalles técnicos">
            El bus ARINC 429 transmite palabras de <strong>32 bits</strong> en tres campos: Label (8 bits, identifica el parámetro), SDI (2 bits, origen), Data (19 bits, valor) y SSM + parity (3 bits). La codificación es BRZ (Bipolar Return to Zero): tres niveles de tensión (+5V, 0V, −5V). Detecta automáticamente errores de paridad.
          </Aviation>

          <Section title="Convertidores A/D y D/A">
            <P>Los sensores generan señales analógicas que deben convertirse a digital para los procesadores:</P>
            <Eq>{'n \\text{ bits} \\to 2^n \\text{ niveles} \\qquad LSB = \\frac{V_{FS}}{2^n} \\\\ \\text{ADC 12 bits, 0–5V: } LSB = \\frac{5}{4096} \\approx 1.22\\ \\text{mV/bit}'}</Eq>
            <Warn>El <strong>Teorema de Nyquist</strong>: la frecuencia de muestreo debe ser al menos el doble de la frecuencia máxima de la señal (fs ≥ 2·f_max). Si no se cumple, se produce <strong>aliasing</strong>: frecuencias altas aparecen enmascaradas como bajas, causando errores de medición. Los ADCs de aviónica van precedidos de filtros anti-aliasing (filtros paso bajo).</Warn>

            <Example n="4.4" title="Resolución de un ADC de temperatura EGT"
              given={<P>Un ADC de 16 bits mide EGT en el rango 0–1200°C. ¿Cuál es la resolución mínima?</P>}
              solution={
                <>
                  <Eq>{'LSB = \\frac{V_{FS}}{2^n} = \\frac{1200°C}{2^{16}} = \\frac{1200}{65536} \\approx 0.018°C'}</Eq>
                  <P>El ADC puede detectar variaciones de temperatura de 18 milésimas de grado centígrado. Esta resolución es más que suficiente para el control preciso del FADEC y la detección de tendencias de EGT en el análisis de salud del motor (Engine Health Monitoring).</P>
                </>
              }
            />
          </Section>

          <Summary items={[
            'Biestable D: almacena 1 bit — Q toma el valor de D en el flanco del reloj.',
            'ARINC 429: 12.5/100 kbps, unidireccional (1 TX, ≤20 RX), palabras de 32 bits, codificación BRZ.',
            'AFDX (ARINC 664): Ethernet 100 Mbps conmutado. IMA en A380/B787.',
            'ADC: n bits → 2ⁿ niveles. LSB = Vfs/2ⁿ. Nyquist: fs ≥ 2·fmax para evitar aliasing.',
          ]} />

          <Solved n="4.6.A" title="Cálculo de velocidad y tiempo de transmisión ARINC 429"
            q={<P>Un equipo ARINC 429 (modo rápido, 100 kbps) transmite 32 palabras de 32 bits cada segundo. Calcular el tiempo por palabra y si el enlace tiene capacidad suficiente para el volumen de datos.</P>}
            a={<><Eq>{'t_{palabra} = 32\\ \\text{bits} / 100000\\ \\text{bps} = 320\\ \\mu\\text{s}'}</Eq><Eq>{'t_{total} = 32 \\times 320 = 10240\\ \\mu\\text{s} = 10.24\\ \\text{ms}'}</Eq><P>El bus usa <strong>10,24 ms de cada 1000 ms</strong> (1,024 % de ocupación). Hay margen amplio. Sin embargo, si hay que transmitir 200 parámetros distintos, habría que usar múltiples buses ARINC 429 ya que cada bus es unidireccional y tiene un único transmisor.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Un ADC de 10 bits mide presión en el rango 0–1034 hPa (0–1 atm). ¿Cuál es la resolución en hPa? ¿Es suficiente para la precisión de un altímetro (±0,5 hPa)?</P>, a: <><Eq>{'LSB = 1034/2^{10} = 1034/1024 = 1.01\\ \\text{hPa}'}</Eq><P>No es suficiente (LSB = 1,01 hPa &gt; 0,5 hPa requerido). Se necesita al menos <strong>12 bits</strong>: LSB = 1034/4096 = 0,25 hPa ✓.</P></> },
            { n: 2, q: <P>Un sensor de temperatura EGT genera señal analógica de 0–10 V correspondiente a 0–1000 °C. Un ADC de 12 bits lo digitaliza. ¿Cuántos °C representa 1 LSB?</P>, a: <><Eq>{'1\\ LSB = 1000°C / 2^{12} = 1000/4096 = 0.244°C/LSB'}</Eq><P>Resolución de <strong>0,244 °C</strong> — más que suficiente para el control FADEC.</P></> },
            { n: 3, q: <P>¿Qué diferencia existe entre ARINC 429 y AFDX (ARINC 664) en términos de topología, velocidad y aplicación?</P>, a: <P>ARINC 429: 100 kbps, <strong>unidireccional</strong> (1TX→20RX), par trenzado. Aviones clásicos (A320, B737NG). AFDX: <strong>100 Mbps</strong>, Ethernet conmutado full-duplex, bidireccional, determinístico con VL (Virtual Links). Aviones modernos IMA (A380, B787). La diferencia de velocidad es de <strong>1000×</strong>.</P> },
            { n: 4, q: <P>Un sistema de audio de cabina muestrea voz a 8 kHz (8000 muestras/s). ¿Cuál es la frecuencia máxima de voz que puede reproducirse fielmente? ¿Es adecuada para comunicaciones ATC?</P>, a: <><P>Nyquist: f_max = fs/2 = 8000/2 = <strong>4000 Hz</strong>. La voz humana inteligible cubre 300–3400 Hz → completamente dentro de 4 kHz. Es el mismo estándar que la telefonía convencional (G.711), adecuado para comunicaciones ATC.</P></> },
          ]} />
        </>
      ),
    },
  ],
};

export default m4;
