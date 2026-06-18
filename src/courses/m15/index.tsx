import { CourseModule, Eq, EqI, P, Note, Warn, DefList, Table, Solved, Practice } from '../CourseView';

const m15: CourseModule = {
  id: 'm15',
  code: 'M15',
  title: 'Motor Turbina de Gas',
  subtitle: 'Turborreactor, turbofán y turbohélice',
  icon: '🔥',
  license: 'B1',
  description: 'Principios, construcción, sistemas y mantenimiento del motor de turbina de gas según EASA Part-66 B1.',
  chapters: [
    {
      id: 'm15-01',
      title: '15.1 Fundamentos y tipos de motor turbina',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Principio de funcionamiento</h3>
            <P>El motor de turbina de gas funciona sobre el <strong>principio de acción-reacción</strong> (3ª ley de Newton): se acelera una masa de gas hacia atrás y la reacción impulsa la aeronave hacia adelante. Termodinámicamente sigue el <strong>ciclo de Brayton</strong>:</P>
            <Table headers={['Proceso', 'Componente', 'Transformación']} rows={[
              ['Admisión', 'Entrada de aire', 'Aire a presión ambiente entra a baja velocidad'],
              ['Compresión', 'Compresor', 'Adiabática: ↑P, ↑T, ↓V'],
              ['Combustión', 'Cámara de combustión', 'Isobara: ↑T, ↑V, P ≈ constante'],
              ['Expansión', 'Turbina + tobera', 'Adiabática: ↓P, ↓T, ↑V → empuje'],
            ]} />
            <Eq>{`Empuje (Thrust):
F = ṁ · (V_salida − V_entrada) + (P_salida − P_∞) · A_salida
ṁ  flujo másico de aire [kg/s]
V  velocidades [m/s]

Simplificado (nozzle adaptada):
F = ṁ · (V_j − V₀)     V_j velocidad de chorro, V₀ velocidad vuelo`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Tipos de motores turbina aeronáuticos</h3>
            <Table headers={['Tipo', 'Relación de derivación (BPR)', 'Rango de uso', 'Eficiencia']} rows={[
              ['Turborreactor puro', 'BPR = 0', 'Aviones militares supersónicos, primeros jets', 'Baja (<60%) a velocidades bajas'],
              ['Turbofán de bajo BPR', 'BPR 0.5–2', 'Caza militares modernos (F-16: BPR 0.76)', 'Media'],
              ['Turbofán de alto BPR', 'BPR 5–12', 'Aviación comercial (CFM56: BPR 5.5; GE90: BPR 8.7)', 'Alta (65–75%) en crucero'],
              ['Turbohélice', 'Potencia en eje + empuje residual', 'ATR 72, C130, aeronaves regionales y de carga', 'Muy alta a baja velocidad (<500 kt)'],
              ['Turboeje (turboshaft)', '100% potencia en eje', 'Helicópteros, APUs, generadores', 'Alta pero depende de transmisión'],
            ]} />
            <Note>La <strong>relación de derivación</strong> (Bypass Ratio, BPR) es la relación entre el flujo de aire que pasa por el fan exterior (bypass) y el que pasa por el núcleo (core). A mayor BPR, mayor eficiencia propulsiva a velocidades de crucero comercial (~M 0.85), pero mayor diámetro de la góndola.</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Parámetros fundamentales de rendimiento</h3>
            <DefList items={[
              { term: 'TSFC (Thrust Specific Fuel Consumption)', def: 'Consumo de combustible por unidad de empuje. [kg/h/N] o [lb/h/lbf]. Cuanto menor, más eficiente. Turbofán moderno (GEnx): TSFC ≈ 0.52 lb/h/lbf.' },
              { term: 'EGT (Exhaust Gas Temperature)', def: 'Temperatura de gases de escape. Indicador crítico de la salud del motor. Límite máximo definido por el fabricante (AMM cap. 77). Exceder EGT en despegue puede causar daño en álabes de turbina.' },
              { term: 'EPR (Engine Pressure Ratio)', def: 'Relación entre presión total de salida de turbina y presión total de entrada. Indicador de empuje en algunos motores.' },
              { term: 'N1, N2, N3', def: 'Velocidades de rotación de los ejes del compresor y turbina. N1: eje de baja presión / fan. N2: eje de alta presión. N3 (en motores de 3 ejes como RR Trent): eje de presión intermedia.' },
            ]} />
          </section>

          <Solved n="15.1.A" title="Empuje del CFM56-5B del A320">
            {{
              q: <P>El CFM56-5B tiene un flujo másico total ṁ = 450 kg/s a despegue (BPR = 5.5), velocidad de vuelo V₀ = 0 m/s (despegue estático), y velocidad de chorro del flujo combinado V_j = 310 m/s. Estima el empuje estático. ¿En qué porcentaje contribuye el flujo bypass al empuje total si el flujo del core tiene V_j_core = 500 m/s?</P>,
              a: <>
                <P>Flujo total: ṁ_total = 450 kg/s (BPR = 5.5 → ṁ_bypass = 5.5/6.5 × 450 = 380.8 kg/s; ṁ_core = 69.2 kg/s)</P>
                <P>Empuje total (flujo mixto simplificado):</P>
                <Eq>{'F_{total} = \\dot{m}_{total} \\times V_j = 450 \\times 310 = 139\\,500\\ \\text{N} \\approx 139.5\\ \\text{kN}'}</Eq>
                <P>Empuje del bypass: <EqI>{'F_{bypass} = 380.8 \\times 310 = 118\\,048\\ \\text{N}'}</EqI></P>
                <P>Empuje del core: <EqI>{'F_{core} = 69.2 \\times 500 = 34\\,600\\ \\text{N}'}</EqI></P>
                <P>Porcentaje del bypass: <EqI>{'118048/(118048+34600) = 77.3\\%'}</EqI></P>
                <P>El flujo de bypass del fan genera el <strong>77%</strong> del empuje total. Esta es la razón por la que los turbofanes de alto BPR son tan eficientes: aceleran mucho caudal (el bypass) a velocidad moderada (alta eficiencia propulsiva) en lugar de poco caudal a alta velocidad.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuáles son las cuatro etapas del ciclo de Brayton y qué componente del motor turbina lleva a cabo cada una?</P>,
              a: <><P><strong>R:</strong> (1) <strong>Admisión</strong>: entrada de aire (inlet); (2) <strong>Compresión adiabática</strong>: compresor (axial/centrífugo); (3) <strong>Combustión isobara</strong>: cámara de combustión (presión ≈ constante, temperatura sube); (4) <strong>Expansión adiabática</strong>: turbina + tobera (gases se expanden generando trabajo y empuje).</P></>
            },
            {
              n: 2,
              q: <P>Define TSFC (Thrust Specific Fuel Consumption) y explica por qué un TSFC bajo es importante para la economía de una línea aérea.</P>,
              a: <><P><strong>R:</strong> TSFC = consumo de combustible [kg/h] / empuje [N] = [kg/h/N]. El TSFC típico de turbofán moderno (GEnx) ≈ 0.52 lb/h/lbf ≈ 14.7 g/h/N. Un TSFC menor significa menos combustible por unidad de empuje: a igualdad de empuje, se usa menos combustible → menor costo operativo (el combustible representa ~25–30% de los costos totales de una aerolínea). Mejorar el TSFC un 1% sobre la flota de un carrier grande puede significar decenas de millones de euros de ahorro anual.</P></>
            },
            {
              n: 3,
              q: <P>El GE90-115B del B777-300ER tiene empuje máximo de 115 300 lbf. Conviértelo a kN y calcula la relación empuje/peso si el motor pesa 8762 kg.</P>,
              a: <><Eq>{'F = 115\\,300 \\times 4.448 = 512\\,897\\ \\text{N} \\approx 513\\ \\text{kN}'}</Eq><Eq>{'F/W = 513\\,000 / (8762 \\times 9.81) = 513\\,000 / 85\\,955 = 5.97'}</Eq><P>Relación empuje/peso ≈ 6:1. Este motor pesa 8.7 t y produce 513 kN de empuje, una densidad de potencia extraordinaria.</P></>
            },
            {
              n: 4,
              q: <P>¿Por qué el turbohélice es más eficiente que el turborreactor puro a velocidades inferiores a 500 kt? Explica en términos de eficiencia propulsiva.</P>,
              a: <><P><strong>R:</strong> La eficiencia propulsiva η_p = 2V₀/(V_j + V₀). Para la misma potencia, el turbohélice acelera un caudal muy grande de aire (la hélice) a baja velocidad (V_j apenas mayor que V₀), por lo que η_p es alta (→1 cuando V_j → V₀). El turborreactor acelera poco caudal a mucha velocidad (V_j muy alto vs V₀), dando η_p baja a velocidades de vuelo bajas. El turbofán de alto BPR es un compromiso intermedio, óptimo para M 0.80–0.85. Por encima de ~500 kt, las pérdidas de la hélice (compresibilidad en la punta de pala) hacen que el turbofán sea superior.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué indica un aumento gradual y persistente de la EGT en los datos de monitorización de tendencias (Engine Trend Monitoring) de un turbofán comercial?</P>,
              a: <><P><strong>R:</strong> Un aumento gradual de la EGT para la misma condición de N1 y condiciones atmosféricas indica una <strong>degradación interna del motor</strong>: normalmente erosión o suciedad en los álabes del compresor (reducción de flujo → motor trabaja más duro para el mismo N1) o deterioro de los sellos de la turbina (mayor fuga de gases calientes). El técnico compara el "EGT margin" (diferencia entre EGT actual y EGT límite) con los datos históricos. Cuando el margen se reduce por debajo del mínimo operativo, el motor debe retirarse para un shop visit (inspección + overhaul), normalmente cada 3000–5000 h de vuelo en motores de transporte.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-02',
      title: '15.2 Entradas de aire',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Función de la entrada de aire</h3>
            <P>La entrada de aire (air intake / inlet) debe suministrar al compresor un flujo de aire uniforme, con la mínima pérdida de presión y sin distorsión. Es el primer componente del sistema propulsivo.</P>
            <Eq>{`Eficiencia de la entrada:
η_inlet = P_t2 / P_t0     (recuperación de presión total)
P_t2  presión total en la cara del compresor
P_t0  presión total del aire libre
Diseño óptimo: η_inlet → 1.0 (sin pérdidas)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Tipos de entradas</h3>
            <Table headers={['Tipo', 'Velocidad de diseño', 'Características', 'Aplicación']} rows={[
              ['Pitot (subsónica)', 'M < 0.9', 'Sección fija, simple, eficiente en subsonico. Labio redondeado para evitar separación en maniobras.', 'Motores bajo el ala, pods, turbofanes comerciales'],
              ['Rampa variable (supersónica)', 'M > 1.5', 'Rampas que crean ondas de choque oblicuas para reducir la velocidad a subsónica antes del compresor.', 'F-14, F-15, SR-71, Concorde'],
              ['NACA flush inlet', 'Baja velocidad', 'Entrada empotrada en el fuselaje. Baja resistencia pero menor recuperación de presión.', 'Sistemas auxiliares, APU'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Protección anticongelante y FOD</h3>
            <DefList items={[
              { term: 'Calefacción del labio', def: 'El labio de entrada se calienta con aire caliente sangrado del compresor (bleed air) para evitar la formación de hielo, que podría ingerirse en el motor.' },
              { term: 'Protección FOD', def: 'Los objetos extraños (Foreign Object Damage) ingeridos en el motor pueden causar daños graves. Procedimientos en tierra: barrido de pista, cubiertas de motor. En vuelo: no existe protección efectiva excepto el diseño robusto de las palas de fan.' },
            ]} />
            <Warn>La ingestión de hielo (ice ingestion) y la ingestión de aves (bird strike) son las principales causas de daño en el fan. Los motores turbofán están certificados para demostrar operación continua tras ingestión de granizo y aves de gran tamaño (CS-E 800). El accidente de US Airways vuelo 1549 (Miracle on the Hudson, 2009) fue causado por ingestión de gansos canadienses en ambos motores.</Warn>
          </section>

          <Solved n="15.2.A" title="Recuperación de presión total en la entrada subsónica">
            {{
              q: <P>La entrada de aire de un A320 en crucero (M = 0.78, altitud FL350) tiene una eficiencia de recuperación η_inlet = 0.995. La presión total del aire libre a FL350 es P_t0 = 35.6 kPa. (a) Calcula la presión total en la cara del fan P_t2. (b) ¿Cuánta presión total se pierde en la entrada?</P>,
              a: <>
                <Eq>{'P_{t2} = \\eta_{inlet} \\times P_{t0} = 0.995 \\times 35.6 = 35.4\\ \\text{kPa}'}</Eq>
                <P>Pérdida de presión total: <EqI>{'\\Delta P_t = 35.6 - 35.4 = 0.18\\ \\text{kPa}'}</EqI></P>
                <P>Una pérdida del 0.5% de presión total en la entrada puede reducir el empuje del motor en ~1%. Esta es la razón por la que el diseño de la entrada de aire (nacela, labio, difusor) se optimiza meticulosamente. Una entrada contaminada o dañada puede causar pérdidas de presión significativamente mayores, con impacto directo en el rendimiento del motor.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Por qué la entrada de aire de un turbofán comercial es de tipo "pitot" (subsónica) con labio redondeado en lugar de angular como las entradas supersónicas?</P>,
              a: <><P><strong>R:</strong> Los turbofanes comerciales operan en régimen subsónico (M &lt; 0.9). La entrada tipo pitot con labio redondeado optimiza la recuperación de presión total sin pérdidas por ondas de choque (que solo aparecen en régimen supersónico). El labio redondeado evita la separación de la capa límite en los ángulos de ataque del motor durante maniobras (despegue, curvas). Las entradas supersónicas con rampas variables (F-15, Concorde) son necesarias solo cuando hay que desacelerar flujo supersónico a subsónico antes del compresor.</P></>
            },
            {
              n: 2,
              q: <P>¿Cuándo se activa el sistema anticongelante del labio de entrada (inlet anti-ice) del motor del A320 y qué fuente de energía utiliza?</P>,
              a: <><P><strong>R:</strong> El sistema anticongelante del nacelle del A320 se activa automáticamente (o manualmente por tripulación con el botón ENG ANTI ICE) cuando hay riesgo de formación de hielo: temperatura OAT &lt; 10°C y humedad visible (nubes, lluvia, nieve). Utiliza <strong>aire caliente sangrado del compresor de alta presión</strong> (HP bleed air, ~200°C) circulando por el labio de la entrada. El sistema se desactiva en tierra cuando los motores están a muy baja potencia para no exceder la temperatura del labio. En despegue se activa si hay condiciones de hielo.</P></>
            },
            {
              n: 3,
              q: <P>Después de un bird strike en el fan del CFM56, el piloto nota una ligera vibración y la indicación de N1 es normal pero con algo más de EGT. ¿Cuál podría ser la causa y qué acción toma el técnico tras el aterrizaje?</P>,
              a: <><P><strong>R:</strong> Posible causa: <strong>desequilibrio del fan</strong> por daño en una o más palas (pérdida de material en la punta, doblez) → vibración. El mayor EGT con el mismo N1 indica que el motor trabaja más duro, posiblemente por distorsión de flujo en la entrada o daños secundarios en el compresor. El técnico: (1) inspección visual del fan y entrada (borescope si es necesario); (2) revisión del registro de vibración del FADEC; (3) medición del balance del fan; (4) documentación en el log book del motor. Dependiendo del daño, puede requerir reparación de pala in situ o shop visit.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es la "distorsión de flujo" (flow distortion) en la cara del compresor y cómo puede causarla un objeto extraño parcialmente ingerido?</P>,
              a: <><P><strong>R:</strong> La distorsión de flujo es una distribución no uniforme de presión, temperatura o velocidad en la cara del compresor. Un objeto parcialmente ingerido puede obstruir parte del área de entrada, creando una zona de flujo reducido (menor presión) en un sector. El compresor diseñado para flujo uniforme puede experimentar pérdidas aerodinámicas localizadas (stall de pala) en el sector obstruido, mientras que en el sector no obstruido trabaja normalmente. El resultado puede ser un surge local o completo del compresor. Por eso se monitoriza la vibración del motor en tiempo real y hay procedimientos de inspección obligatorios tras cualquier FOD sospechado.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué el "windmilling" (giro del rotor del motor apagado por el flujo de aire en vuelo) es importante para el piloto en caso de fallo de motor en vuelo?</P>,
              a: <><P><strong>R:</strong> El windmilling (giro del fan y el compresor por la ram air con el motor apagado) tiene dos efectos: (1) <strong>Positivo</strong>: el giro del compresor facilita el reencendido en vuelo (relighting), ya que el compresor ya tiene cierta velocidad de rotación y se reduce la energía del starter necesaria para relanzar el motor; (2) <strong>Negativo</strong>: el rotor girando en autorotación genera resistencia aerodinámica adicional (drag del fan muy superior al de un disco sólido equivalente), aumentando la resistencia total del avión y reduciendo la distancia de planeo. En procedimientos de emergencia, si el reencendido no es posible, algunos manuales recomiendan en ciertas condiciones dejar el motor windmilling vs bloquearlo, dependiendo del tipo de aeronave.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-03',
      title: '15.3 Compresores',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Tipos de compresores</h3>
            <Table headers={['Tipo', 'Principio', 'Relación de compresión/etapa', 'Rendimiento', 'Uso típico']} rows={[
              ['Centrífugo', 'Aceleración radial + difusor convierte velocidad en presión', '4:1 – 10:1 por etapa', 'Bueno (~80%)', 'Motores turbohélice pequeños, APU, helicópteros (Arriel, PT6)'],
              ['Axial', 'Cada etapa (rotor + estátor) comprime ligeramente el flujo', '1.1:1 – 1.3:1 por etapa', 'Excelente (~88–92%)', 'Turbofanes comerciales (CFM56, GE90, Trent). Alta relación total: 30–50:1'],
              ['Mixto (axial + centrífugo)', 'Etapas axiales + etapa final centrífuga', 'Intermedio', 'Bueno', 'Garret TPE331, motores medianos'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Compresor axial — descripción detallada</h3>
            <P>Cada <strong>etapa del compresor axial</strong> consta de:</P>
            <DefList items={[
              { term: 'Rotor (blades)', def: 'Álabe giratorio que añade energía al flujo acelerándolo y cambiando su dirección. Material: aleaciones de titanio (etapas frías) o acero inox/Ni (etapas calientes).' },
              { term: 'Estátor (vanes)', def: 'Álabe fijo que convierte la velocidad (energía cinética) añadida por el rotor en presión (energía de presión), reduciendo la velocidad del flujo.' },
              { term: 'IGV (Inlet Guide Vanes)', def: 'Álabes directores de entrada, típicamente de ángulo variable (VIGVs) para optimizar el flujo a distintos regímenes.' },
            ]} />
            <Eq>{`Relación de compresión total de n etapas:
π_total = (π_etapa)ⁿ

Trabajo de compresión (adiabático):
W_c = cp · T_1 · [(π_c)^((γ-1)/γ) − 1] / η_c   [J/kg]
η_c  eficiencia isentrópica del compresor (~0.88)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Línea de bombeo (surge) y estabilidad del compresor</h3>
            <P>El <strong>surge</strong> (bombeo) es una inestabilidad aerodinámica en el compresor: cuando el flujo se reduce excesivamente, las palas entran en pérdida y el compresor colapsa temporalmente. Se manifiesta como un ruido fuerte, vibración y pérdida de empuje.</P>
            <DefList items={[
              { term: 'Stall de pala', def: 'Inicio del proceso: pérdida aerodinámica localizada en una o más palas al superar el ángulo de ataque crítico.' },
              { term: 'Rotating stall', def: 'El stall se propaga circunferencialmente alrededor del compresor a 20–70% de la velocidad del rotor.' },
              { term: 'Surge completo', def: 'El flujo reversa completamente. El compresor expulsa los gases hacia adelante de forma violenta (pulsación).' },
            ]} />
            <P>Para prevenir el surge se usan: <strong>válvulas de sangría de compresor</strong> (compressor bleed valves), <strong>IGVs variables</strong>, y el <strong>FADEC</strong> que controla el acelerador para no cruzar la línea de bombeo.</P>
          </section>

          <Solved n="15.3.A" title="Relación de compresión y trabajo del compresor axial">
            {{
              q: <P>Un compresor axial del CFM56 tiene 9 etapas con relación de compresión por etapa π_etapa = 1.28 y eficiencia isentrópica total η_c = 0.88. La temperatura de entrada T₁ = 230 K. cp_aire = 1005 J/(kg·K), γ = 1.4. Calcula: (a) relación de compresión total, (b) trabajo específico de compresión.</P>,
              a: <>
                <P><strong>(a) Relación de compresión total:</strong></P>
                <Eq>{'\\pi_{total} = (1.28)^9 = 11.0'}</Eq>
                <P><strong>(b) Trabajo específico de compresión:</strong></P>
                <Eq>{'W_c = \\frac{c_p T_1}{\\eta_c} \\left[(\\pi_c)^{\\frac{\\gamma-1}{\\gamma}} - 1\\right] = \\frac{1005 \\times 230}{0.88}\\left[(11)^{0.286} - 1\\right]'}</Eq>
                <Eq>{'= \\frac{231\\,150}{0.88} \\times [1.726 - 1] = 262\\,670 \\times 0.726 = 190\\,698\\ \\text{J/kg} \\approx 191\\ \\text{kJ/kg}'}</Eq>
                <P>Este trabajo (191 kJ/kg) es lo que la turbina de alta presión debe suministrar al compresor. Para un flujo másico de 80 kg/s (core del CFM56), la potencia del compresor es 191 × 80 = 15.3 MW — la potencia de una central eléctrica pequeña concentrada en un componente del tamaño de un bidón.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia principal entre el compresor centrífugo y el axial en cuanto a relación de compresión por etapa y eficiencia? ¿Por qué los turbofanes comerciales usan compresores axiales de múltiples etapas?</P>,
              a: <><P><strong>R:</strong> El <strong>centrífugo</strong> ofrece 4:1 – 10:1 de compresión por etapa pero con menor eficiencia (~80%) y mayor diámetro frontal. El <strong>axial</strong> ofrece solo 1.1:1 – 1.3:1 por etapa pero con mayor eficiencia (~88–92%) y menor diámetro. Para lograr relaciones de compresión de 30–50:1 (necesarias en turbofanes de alta eficiencia), el axial encadena 10–15 etapas manteniendo un diámetro relativamente pequeño. El centrífugo necesitaría solo 2–3 etapas pero sería demasiado ancho para integrarse en una nacela aerodinámica. Por eso los turbofanes comerciales usan axial puro o axial + centrífugo en los compresores más pequeños.</P></>
            },
            {
              n: 2,
              q: <P>¿Cuál es la diferencia entre el "rotating stall" y el "surge completo" en un compresor? ¿Cuál es más peligroso para el motor?</P>,
              a: <><P><strong>R:</strong> El <strong>rotating stall</strong> es un stall localizado que se propaga circunferencialmente a 20–70% de la velocidad del rotor: el motor funciona con reducción de flujo y eficiencia pero de forma continua. Puede no ser inmediatamente percibido por el piloto. El <strong>surge completo</strong> es la reversión total del flujo: el compresor "escupe" gases hacia adelante de forma violenta y cíclica. Es mucho más peligroso: produce ruidos fuertes, vibración intensa, aumento brusco de EGT y pérdida de empuje. Puede dañar álabes por el impacto de flujo reverso y, si se repite, causar fatiga. El FADEC moderno previene el surge antes de que se produzca.</P></>
            },
            {
              n: 3,
              q: <P>¿Para qué sirven las válvulas de sangría de compresor (compressor bleed valves / VSV) en la prevención del surge?</P>,
              a: <><P><strong>R:</strong> A bajo régimen (ralentí, aceleración lenta), el ángulo de incidencia de las palas del compresor puede exceder el crítico si el flujo disminuye, causando stall y eventualmente surge. Las <strong>compressor bleed valves</strong> se abren a bajas RPM para "aliviar" el compresor: sangran parte del aire comprimido al exterior, aumentando efectivamente el flujo a través del compresor y aleja las palas de la línea de surge. Las <strong>VSV (Variable Stator Vanes)</strong> varían el ángulo de los álabes fijos para optimizar el ángulo de incidencia en el rotor en todos los regímenes de vuelo, evitando tanto el stall como el surge a lo largo de toda la envolvente operativa.</P></>
            },
            {
              n: 4,
              q: <P>Un técnico escucha un "bang" fuerte desde el motor durante la aceleración en tierra. El piloto confirma que N1 y EGT parecen normales. ¿Qué podría ser y qué acción se toma?</P>,
              a: <><P><strong>R:</strong> El ruido podría ser un <strong>surge transitorio</strong> (el FADEC puede haberlo detectado y corregido automáticamente antes de que se estabilizara, por eso N1 y EGT aparecen normales tras el evento). Acción: (1) Notificar al piloto para que mantenga la aceleración suave; (2) Revisar los datos del FADEC/QAR para el evento específico (tiempo, N1, EGT, posición de las IGVs en el momento del bang); (3) Si el FADEC no registró ningún surge, podría ser un FOD impact; (4) Inspección boroscopio de las etapas del compresor antes del siguiente vuelo, según procedimiento del AMM.</P></>
            },
            {
              n: 5,
              q: <P>¿Cómo afecta la altitud de vuelo a la relación de compresión efectiva del motor? ¿Necesita el motor trabajar más duro a alta altitud?</P>,
              a: <><P><strong>R:</strong> A mayor altitud, la presión y densidad del aire disminuyen. El compresor ingiere menos masa de aire por vuelta (densidad menor), reduciendo el flujo másico ṁ y el empuje disponible. La relación de compresión del compresor (determinada por su geometría y RPM) se mantiene prácticamente constante, pero la presión absoluta de salida es menor (menor presión de entrada). El motor no trabaja "más duro" en el sentido de mayor par por vuelta, pero el FADEC aumenta N1 para mantener el empuje requerido, acercándose a los límites operativos (EGT, N1_max). En crucero a FL380, el motor opera cerca del límite EGT para mantener el empuje de crucero.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-04',
      title: '15.4 Cámaras de combustión',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Zonas de la cámara de combustión</h3>
            <P>La cámara de combustión convierte la energía química del combustible en energía térmica del gas. Se divide en tres zonas:</P>
            <DefList items={[
              { term: 'Zona primaria', def: 'Combustión estequiométrica (λ ≈ 1). Temperatura muy alta (~2000°C). Remolinos (recirculation zone) aseguran la llama continua. Solo el 20% del aire total entra aquí.' },
              { term: 'Zona secundaria (dilución intermedia)', def: 'Se añade más aire para asegurar la combustión completa y reducir CO e hidrocarburos sin quemar.' },
              { term: 'Zona de dilución', def: 'Añade el resto del aire (hasta 65–75% del total) para bajar la temperatura de salida a niveles admisibles por los álabes de turbina (~1600–1800 K).' },
            ]} />
            <Eq>{`Temperatura de salida de la cámara (TIT / TET):
TIT = Turbine Inlet Temperature ≈ 1500–1900 K
Límite por materiales: sin refrigeración ~1100 K (Ni monocristalino)
Con refrigeración de álabe: +300–500 K adicionales`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Tipos de cámara de combustión</h3>
            <Table headers={['Tipo', 'Disposición', 'Ventajas', 'Inconvenientes', 'Uso']} rows={[
              ['Can (tubular)', 'Varios tubos independientes en anillo', 'Fácil mantenimiento y prueba individual', 'Mayor peso y longitud', 'Motores antiguos, GE J79'],
              ['Annular (anular)', 'Un único anillo continuo', 'Compacta, menor pérdida de presión, mejor distribución', 'Difícil acceso para mantenimiento', 'Turbofanes modernos (CFM56, GE90)'],
              ['Can-annular', 'Tubos de llama dentro de una carcasa anular', 'Compromiso entre ambos', 'Intermedio', 'JT8D, JT9D (Boeing 727, 747 clásicos)'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Combustibles aeronáuticos</h3>
            <Table headers={['Combustible', 'Tipo', 'Punto de inflamación', 'Uso']} rows={[
              ['Jet A-1', 'Queroseno (ASTM D1655)', '38–60°C', 'Aviación civil mundial (estándar OACI)'],
              ['Jet A', 'Queroseno (similar Jet A-1)', '38°C', 'EE.UU. principalmente'],
              ['JP-8', 'Militar (equivale a Jet A-1 + aditivos)', '38°C', 'Fuerzas aéreas OTAN'],
              ['Avgas 100LL', 'Gasolina de aviación, plomo reducido', '−40°C', 'Motores de pistón (NO compatible con turbinas)'],
            ]} />
            <Warn>Nunca suministrar Avgas a un motor turbina ni Jet A-1 a un motor de pistón que no esté certificado para ello. La contaminación de combustible es una de las causas más frecuentes de incidentes en repostaje. Los tapones de repostaje tienen formas y colores diferentes para prevenirlo.</Warn>
          </section>

          <Solved n="15.4.A" title="Temperatura de salida de la cámara y margen de álabes">
            {{
              q: <P>La cámara de combustión de un turbofán suministra gases a TIT = 1750 K a los álabes de la HPT. Los álabes son de superaleación de Ni monocristalino (límite sin refrigeración: 1150°C = 1423 K) con film cooling que añade +500 K y TBC que añade +150 K. (a) ¿Cuál es la temperatura máxima que puede soportar el álabe con todas las tecnologías? (b) ¿Cuánto margen queda respecto al TIT = 1750 K?</P>,
              a: <>
                <P><strong>(a) Temperatura máxima del álabe con todas las tecnologías:</strong></P>
                <Eq>{'T_{max,\\text{álabe}} = 1423 + 500 + 150 = 2073\\ \\text{K}'}</Eq>
                <P><strong>(b) Margen respecto a TIT:</strong></P>
                <Eq>{'\\text{Margen} = T_{max,\\text{álabe}} - TIT = 2073 - 1750 = 323\\ \\text{K}'}</Eq>
                <P>El álabe puede soportar hasta 2073 K mientras que los gases llegan a 1750 K, dando un margen de 323 K. Este margen permite ciclos térmicos repetitivos sin daño inmediato, pero el creep (fluencia) acumulado a largo plazo limita la vida del álabe a 3000–5000 h. Cada excedencia de EGT (hot start, go-around con T/O rating mantenido mucho tiempo) consume "vida" del álabe de forma irreversible.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuáles son las tres zonas de una cámara de combustión y qué porcentaje de aire total entra en cada zona? ¿Por qué se divide así?</P>,
              a: <><P><strong>R:</strong> (1) <strong>Zona primaria</strong> (~20% del aire): combustión estequiométrica, T ~2000°C, asegura la llama; (2) <strong>Zona secundaria</strong> (~15% del aire): completa la combustión, reduce CO e hidrocarburos sin quemar; (3) <strong>Zona de dilución</strong> (~65% del aire): enfría los gases de 2000°C a ~1600–1800 K admisibles por la HPT. Si no se diluyera, los gases a 2000°C destruirían los álabes de turbina en segundos.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué las cámaras de combustión anulares (annular) son las preferidas en turbofanes modernos frente a las tubulares (can) o can-annular?</P>,
              a: <><P><strong>R:</strong> La cámara anular es una única cavidad en forma de toro, lo que ofrece: (1) <strong>Mayor compacidad</strong>: menor longitud axial y peso para la misma potencia; (2) <strong>Menor pérdida de presión</strong>: flujo más uniforme sin transiciones entre latas individuales; (3) <strong>Mejor distribución de temperatura</strong> en la salida (más uniforme, mejor para los álabes de HPT); (4) <strong>Menor área frontal</strong>: contribuye a reducir el diámetro total del motor. La desventaja es que el mantenimiento es más complejo (no se puede retirar una sola sección; hay que acceder por borescope o desmontar el motor).</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué el punto de inflamación del Jet A-1 (38–60°C) es importante para la seguridad en el repostaje? Compara con la Avgas (−40°C).</P>,
              a: <><P><strong>R:</strong> El punto de inflamación es la temperatura mínima a la que el combustible emite suficientes vapores para formar una mezcla inflamable. El Jet A-1 (38–60°C) no produce vapores inflamables a temperatura ambiente (15–25°C), lo que lo hace mucho más seguro en tierra. La Avgas (−40°C) genera vapores inflamables incluso a temperaturas muy bajas → mayor riesgo de incendio ante cualquier chispa estática. Por eso el Jet A-1 se puede manejar con precauciones menores, aunque siempre se requiere conectar el cable de tierra para igualar potenciales antes del repostaje.</P></>
            },
            {
              n: 4,
              q: <P>Un técnico detecta humo negro en el escape de un motor turbina durante el run-up. ¿Qué indica y cuáles podrían ser las causas?</P>,
              a: <><P><strong>R:</strong> El humo negro indica <strong>combustión incompleta</strong> (exceso de combustible o déficit de aire): partículas de carbono (hollín) sin quemar en los gases de escape. Causas posibles: (1) Inyectores obstruidos o deformados que no atomizan bien el combustible → gotitas grandes que no se queman completamente; (2) Relación aire/combustible demasiado rica (exceso de combustible); (3) Problemas en la zona de dilución (mezcla pobre); (4) Motor demasiado frío durante el arranque (run-up en condiciones frías). El técnico debe inspeccionar y limpiar o sustituir los inyectores (fuel nozzles) según el AMM Cap. 73.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué el JP-8 militar tiene aditivos adicionales respecto al Jet A-1 civil? Menciona al menos tres tipos de aditivos y su función.</P>,
              a: <><P><strong>R:</strong> El JP-8 es químicamente similar al Jet A-1 pero con paquete de aditivos adicionales (MIL-DTL-83133) que incluyen: (1) <strong>Antioxidante</strong>: previene la oxidación del combustible almacenado durante largos períodos (stocks militares), evitando la formación de gomas y barnices en los inyectores; (2) <strong>Inhibidor de corrosión/lubricante</strong>: protege los componentes del sistema de combustible (bombas, válvulas de precisión) del desgaste y la corrosión; (3) <strong>Antistático (SDA)</strong>: reduce la acumulación de cargas estáticas durante el bombeo a alta velocidad, previniendo chispas. Los aditivos mejoran la operabilidad y vida del motor en condiciones militares adversas (temperaturas extremas, almacenamiento prolongado).</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-05',
      title: '15.5 Turbinas',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Función y tipos de turbina</h3>
            <P>La turbina extrae energía de los gases de combustión para accionar el compresor (y el fan en turbofanes). Es el componente sometido a las condiciones más severas: alta temperatura, alta presión, y grandes esfuerzos centrífugos.</P>
            <Table headers={['Tipo', 'Función', 'Temperatura entrada típica']} rows={[
              ['Turbina de alta presión (HPT)', 'Acciona el compresor de alta presión (HPC). 1–2 etapas.', '1500–1900 K'],
              ['Turbina de baja presión (LPT)', 'Acciona el fan y compresor de baja presión. 3–7 etapas.', '1100–1400 K'],
              ['Turbina de potencia (turbohélice/eje)', 'Accionada por el gas remanente para transmitir potencia al eje.', '800–1100 K'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Materiales y refrigeración de álabes</h3>
            <P>Los álabes de la HPT operan a temperaturas superiores al punto de fusión de los materiales sin refrigeración. Las soluciones modernas son:</P>
            <DefList items={[
              { term: 'Superaleaciones de Ni monocristalino', def: 'Eliminan los bordes de grano que son puntos de inicio de fatiga a alta temperatura. TMS-238, CMSX-4. Límite sin refrigeración: ~1150°C.' },
              { term: 'Refrigeración interna (convección)', def: 'Aire frío del compresor (bleed air, ~600°C) circula por canales internos del álabe, absorbiendo calor. Permite operar 200–300°C por encima del límite del material.' },
              { term: 'Refrigeración por película (film cooling)', def: 'El aire refrigerante sale por orificios en la superficie del álabe formando una película protectora entre el gas caliente y el metal. Permite hasta +500°C sobre el límite.' },
              { term: 'Barrera térmica (TBC)', def: 'Recubrimiento de óxido de zirconio estabilizado con itrio (YSZ) aplicado por plasma spray. Reduce la temperatura del sustrato metálico en ~150°C adicionales.' },
            ]} />
            <Note>Un álabe de HPT moderno (GE90, Trent 1000) es una obra maestra de ingeniería: fabricado en monocristal de Ni, con decenas de canales internos de refrigeración, película de aire en la superficie y recubrimiento TBC. Cada álabe puede costar más de 10 000€ y se inspecciona boroscopio cada 3000–5000 horas (engine shop visit).</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Margen de temperatura de álabes (blade creep)</h3>
            <P>El <strong>creep</strong> (fluencia) es la deformación lenta y permanente del material bajo tensión elevada a alta temperatura. Es el mecanismo de fallo limitante de la vida de los álabes de turbina. Se controla monitorizando la EGT y respetando los límites de tiempo en temperature.</P>
            <Eq>{`Vida de álabe vs temperatura (regla aproximada):
ΔT = +15°C → vida reducida a la mitad
ΔT = −15°C → vida duplicada
→ Cada °C de EGT cuenta`}</Eq>
          </section>

          <Solved n="15.5.A" title="Impacto de la EGT en la vida de los álabes de HPT">
            {{
              q: <P>Los álabes de HPT de un turbofán tienen una vida nominal de 5000 h a EGT = 870°C (TET). Si durante un vuelo la EGT se excede a 900°C durante 30 minutos, ¿cuánta vida útil se consume en ese período y cuánto queda si el motor llevaba 2000 h acumuladas?</P>,
              a: <>
                <P>La excedencia ΔT = 900 − 870 = +30°C = 2 × 15°C. Según la regla: cada +15°C reduce la vida a la mitad:</P>
                <Eq>{'\\text{Factor de consumo} = 2^{30/15} = 2^2 = 4\\times \\text{ (4 veces más rápido)}'}</Eq>
                <P>En 30 minutos a EGT normal, se consumiría: 0.5 h. Con EGT +30°C se consumen: 0.5 × 4 = <strong>2 horas de vida útil</strong>.</P>
                <P>Vida acumulada efectiva tras el evento: 2000 + 2 = 2002 h efectivas (aunque el reloj marca 2000.5 h reales). Si esto ocurre frecuentemente, el motor llegará al límite de vida mucho antes de las 5000 h reales. Los sistemas ACMS/OPCM registran las excedencias de EGT y calculan la "vida efectiva consumida" para cada motor.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Qué es el "creep" (fluencia a alta temperatura) en los álabes de turbina y por qué limita su vida útil más que otros mecanismos de fallo?</P>,
              a: <><P><strong>R:</strong> El creep es la deformación plástica lenta y permanente de un material bajo tensión elevada a alta temperatura, incluso por debajo del límite elástico a temperatura ambiente. En los álabes de HPT, la fuerza centrífuga (F = mω²r) genera tensiones de 100–200 MPa en el material a 1000–1100°C. A estas temperaturas, el material "fluye" lentamente → el álabe se alarga progresivamente → con el tiempo puede tocar la carcasa del motor → vibración, daño o fallo catastrófico. El creep es limitante porque es acumulativo e irreversible: cada hora de operación a temperatura elevada consume vida de creep sin posibilidad de recuperación.</P></>
            },
            {
              n: 2,
              q: <P>Describe las diferencias entre la refrigeración por convección interna y la refrigeración por película (film cooling) en los álabes de HPT. ¿Cuál ofrece mayor beneficio de temperatura?</P>,
              a: <><P><strong>R:</strong> La <strong>refrigeración por convección interna</strong> hace circular aire frío del compresor (~600°C) por canales internos del álabe → absorbe calor por conducción desde el metal → permite +200–300°C sobre el límite del material. La <strong>film cooling</strong> hace salir ese aire por orificios de la superficie, creando una capa protectora de aire frío entre los gases calientes y el metal → efecto barrera adicional de +500°C. El film cooling ofrece mayor beneficio (+500 K vs +200–300 K) pero es más difícil de fabricar (cientos de microorificios de 0.3–0.5 mm perforados por EDM o laser) y más sensible a la contaminación.</P></>
            },
            {
              n: 3,
              q: <P>¿Cuántos álabes de HPT tiene aproximadamente un motor turbofán comercial como el CFM56 y cuál es el costo aproximado de un shop visit de turbina?</P>,
              a: <><P><strong>R:</strong> El CFM56 tiene ~80–100 álabes de HPT repartidos en 1–2 etapas. El costo de cada álabe puede ser 5000–15 000€ (fabricación en monocristal + recubrimientos). Un shop visit completo de HPT (inspección + sustitución de álabes dañados) de un CFM56 cuesta típicamente <strong>2–5 millones de dólares</strong>, y se realiza cada 3 000–5 000 h de vuelo. Para una flota de 100 aviones con 2 motores cada uno, los costos de mantenimiento de motor representan miles de millones de euros al año. Por eso cada grado de EGT ahorrando vida de álabe tiene un valor económico real y cuantificable.</P></>
            },
            {
              n: 4,
              q: <P>¿Por qué los álabes de turbina de baja presión (LPT) pueden fabricarse con superaleaciones policristalinas convencionales en lugar de monocristalinas como los de HPT?</P>,
              a: <><P><strong>R:</strong> La LPT opera a temperaturas significativamente menores que la HPT (1100–1400 K vs 1500–1900 K en HPT), ya que los gases se han enfriado al pasar por la HPT. A estas temperaturas menores, las superaleaciones policristalinas convencionales tienen suficiente resistencia al creep y fatiga térmica sin necesitar la costosa y compleja fabricación monocristalina. La LPT también tiene menores esfuerzos centrífugos (RPM menores en motores de dos ejes). Usar monocristales en LPT encarecería el motor sin beneficio real.</P></>
            },
            {
              n: 5,
              q: <P>¿En qué consiste la inspección boroscopio de los álabes de turbina y cómo se determina si un álabe debe reemplazarse?</P>,
              a: <><P><strong>R:</strong> La inspección boroscopio introduce un endoscopio (rígido o flexible) por los puertos de boroscopio del motor (orificios en la carcasa diseñados para este fin). El técnico gira manualmente el rotor y examina cada álabe buscando: erosión, grietas FOD o fatiga, pérdida o desprendimiento de TBC, deformación plástica (creep visible como curvatura o alargamiento), quemaduras (hot spots), obstrucción de orificios de film cooling. Cada defecto encontrado se mide (profundidad, longitud, área) y se compara con los límites del SRM (Structural Repair Manual) del fabricante. Si el defecto supera el límite → el álabe debe sustituirse. Si está dentro del límite → se registra y se vuelve a inspeccionar en el próximo intervalo.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-06',
      title: '15.6 Toberas de escape',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Función de la tobera</h3>
            <P>La tobera convierte la energía de presión y temperatura residual de los gases de salida de turbina en energía cinética (velocidad del chorro), generando así el empuje.</P>
            <Eq>{`Tobera convergente (flujo subsónico / M≤1 en garganta):
V_j = √(2·cp·T_t · [1 − (P_exit/P_t)^((γ-1)/γ)])

Tobera convergente-divergente (Laval):
Permite M > 1 en la sección divergente
Usada en cohetes y aviones supersónicos (turborreactores con postcombustión)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Mezcla y relación de derivación</h3>
            <P>En turbofanes de alto BPR (aviación comercial), el flujo del fan (frío) y del núcleo (caliente) pueden mezclarse antes de la tobera <strong>(mixed flow)</strong> o expulsarse por toberas separadas <strong>(unmixed / separate flow)</strong>.</P>
            <Table headers={['Configuración', 'Ventaja', 'Avión típico']} rows={[
              ['Separate flow (nacelle)', 'Menor peso, menor longitud, más simple', 'B737 (CFM56), A320'],
              ['Mixed flow', 'Mayor eficiencia propulsiva, menor ruido', 'B727 (JT8D), A300-600'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Postcombustión (afterburner/reheat)</h3>
            <P>En aviones militares de alta maniobra, se inyecta combustible adicional en el tubo de escape <strong>después de la turbina</strong> para aumentar drásticamente el empuje (hasta un 50%) durante períodos cortos:</P>
            <Eq>{`Empuje con postcombustión ≈ 1.5 × empuje seco
Consumo de combustible ≈ 3–4 × consumo seco
TSFC en postcombustión ≈ 2.0–2.5 lb/h/lbf (vs 0.7 sin)`}</Eq>
            <Warn>La postcombustión solo se usa en despegues con máxima carga, combate aéreo y maniobras específicas. Su uso continuo agotaría el combustible en minutos. El pitido característico (screech) indica inestabilidad de combustión en el tubo de postcombustión.</Warn>
          </section>

          <Solved n="15.6.A" title="Velocidad de chorro de una tobera convergente">
            {{
              q: <P>La tobera de escape de un turbofán en crucero tiene temperatura total de entrada T_t = 800 K y presión total P_t = 180 kPa. La presión de salida (ambiente) P_exit = 26.5 kPa (FL350). cp = 1150 J/(kg·K), γ = 1.33. Calcula la velocidad teórica del chorro.</P>,
              a: <>
                <Eq>{'V_j = \\sqrt{2 c_p T_t \\left[1 - \\left(\\frac{P_{exit}}{P_t}\\right)^{\\frac{\\gamma-1}{\\gamma}}\\right]}'}</Eq>
                <Eq>{'= \\sqrt{2 \\times 1150 \\times 800 \\times \\left[1 - \\left(\\frac{26.5}{180}\\right)^{0.248}\\right]}'}</Eq>
                <Eq>{'= \\sqrt{1\\,840\\,000 \\times [1 - (0.147)^{0.248}]} = \\sqrt{1\\,840\\,000 \\times [1 - 0.634]}'}</Eq>
                <Eq>{'= \\sqrt{1\\,840\\,000 \\times 0.366} = \\sqrt{673\\,440} = 820\\ \\text{m/s}'}</Eq>
                <P>La velocidad de chorro teórica es 820 m/s. El empuje aportado por este flujo de gases del core (ṁ_core ≈ 70 kg/s para el CFM56): F_core = 70 × (820 − 230) = 41.3 kN (restando la velocidad de vuelo de ~230 m/s a FL350 M 0.78).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia entre una tobera convergente y una convergente-divergente (Laval)? ¿En qué condición permite la tobera Laval superar M = 1?</P>,
              a: <><P><strong>R:</strong> La <strong>tobera convergente</strong> acelera el flujo hasta M = 1 en la garganta (condición de "choked"). No puede superar M = 1 aunque la presión de contrapresión sea muy baja. La <strong>tobera convergente-divergente (Laval)</strong> tiene una sección que primero converge hasta la garganta (M = 1) y luego diverge. En la sección divergente, si la presión de salida es suficientemente baja (flujo supercrítico), el flujo se acelera adicionalmente hasta M &gt; 1. Para que funcione en régimen supersónico, la relación de presiones P_t/P_exit debe superar un valor crítico (~1.89 para γ = 1.4). Se usa en motores con postcombustión y cohetes.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué la "separate flow" nozzle (toberas separadas para el bypass y el core) es más simple y ligera que la "mixed flow" nozzle en los turbofanes comerciales?</P>,
              a: <><P><strong>R:</strong> En la <strong>separate flow</strong>, el flujo del fan (frío) y del core (caliente) se expulsan por toberas independientes sin mezclarse. No requiere la carcasa de mezcla ("mixer") que es un componente largo, pesado y estructuralmente complejo. Resultado: menor peso, menor longitud del motor (nacela más corta → menor resistencia), menor costo de fabricación. En la <strong>mixed flow</strong>, el flujo frío y caliente se mezclan antes de la tobera única: requiere un mixer interno (cilindro con orificios o "lobed mixer") que añade peso y longitud pero mejora ligeramente la eficiencia propulsiva y reduce el ruido.</P></>
            },
            {
              n: 3,
              q: <P>El F-16 activa su postcombustión para un combate. El consumo de combustible "seco" era de 7000 kg/h y con postcombustión activa el TSFC aumenta 3×. Si lleva 3000 kg de combustible restantes, ¿cuántos minutos puede mantener la postcombustión?</P>,
              a: <><Eq>{'\\dot{m}_{AB} = 3 \\times 7000 = 21\\,000\\ \\text{kg/h} = 350\\ \\text{kg/min}'}</Eq><Eq>{'t = 3000/350 = 8.57\\ \\text{min}'}</Eq><P>Solo 8.6 minutos de postcombustión continua con los 3000 kg restantes. Esto ilustra por qué la postcombustión se usa en ráfagas cortas, no de forma continua.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuál es la función de los "thrust reversers" (inversores de empuje) y cómo funcionan en un turbofán de alto BPR?</P>,
              a: <><P><strong>R:</strong> Los thrust reversers redirigen el flujo de empuje del motor hacia adelante, generando fuerza de deceleración en lugar de empuje. En turbofanes de alto BPR, hay dos tipos principales: (1) <strong>Cascade-type reverser</strong>: deflectores transladan y exposición una cascada de álabes que redirigen el flujo del bypass (el 80% del empuje) hacia adelante y lateralmente; (2) <strong>Clamshell reverser</strong>: compuertas de cesta que bloquean y redirigen el flujo de la tobera. Solo actúan sobre el flujo de bypass (no sobre el core), ya que redirigir los gases calientes del core presenta problemas de re-ingestión. Reducen la distancia de aterrizaje en ~30%, especialmente en pistas mojadas o cortas.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué la tobera del motor está "choked" (bloqueada sónicamente, M = 1 en la garganta) durante la mayor parte del vuelo de un turbofán comercial? ¿Qué ventaja operativa ofrece esto?</P>,
              a: <><P><strong>R:</strong> La tobera alcanza condición "choked" (M = 1 en la garganta) cuando la relación P_t/P_exit supera el valor crítico (~1.89). Esto ocurre cuando la presión total de los gases de escape es suficientemente alta en relación con la presión ambiente. En condición choked, el flujo másico a través de la tobera es <strong>independiente de la presión de salida</strong>: solo depende de la presión total y temperatura total en la entrada de la tobera. Esto proporciona <strong>operación estable y desacoplada</strong>: las variaciones de presión ambiente (maniobras, turbulencia) no afectan al flujo de gases del motor, simplificando el control y garantizando operación estable del compresor.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-07',
      title: '15.7 Sistema de combustible del motor',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Esquema del sistema de combustible</h3>
            <P>El sistema de combustible del motor controla con precisión el caudal de combustible suministrado a la cámara de combustión en función de las condiciones de vuelo y la posición del acelerador:</P>
            <DefList items={[
              { term: 'Bomba LP (baja presión)', def: 'Bomba centrífuga de baja presión impulsada por la caja de accesorios (AGB). Suministra combustible a la bomba HP.' },
              { term: 'Bomba HP (alta presión)', def: 'Bomba de engranajes (gear pump) de desplazamiento positivo. Genera la presión necesaria para los inyectores (~1000–3000 psi). Caudal proporcional a RPM.' },
              { term: 'HMU (Hydro-Mechanical Unit) / FMU', def: 'Unidad hidromecánica de control del caudal de combustible. Contiene válvulas de caudal (metering valve), piloto (shutoff valve), by-pass y termostato de combustible.' },
              { term: 'Inyectores (fuel nozzles)', def: 'Atomizan el combustible en finas gotas (<100 μm) para facilitar la combustión. Tipos: simplex (baja potencia), duplex (doble circuito), air-blast (mezcla aire/combustible).' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Control de combustible y FADEC</h3>
            <P>El <strong>FADEC</strong> (Full Authority Digital Engine Control) es el ordenador que controla completamente todos los parámetros del motor: combustible, geometría variable (IGVs, VSVs), sangría de compresor, sistemas de refrigeración y arranque.</P>
            <DefList items={[
              { term: 'Autoridad total', def: 'El FADEC tiene autoridad completa sobre el motor. El piloto mueve la palanca de empuje y el FADEC determina el caudal de combustible exacto para conseguir ese empuje sin exceder EGT, N1, N2 ni otros límites.' },
              { term: 'Redundancia', def: 'Dos canales idénticos (Canal A y Canal B), cada uno capaz de controlar el motor completamente. Conmutación automática si falla el canal activo.' },
              { term: 'BITE (Built-In Test Equipment)', def: 'El FADEC monitoriza continuamente el motor y registra parámetros en memoria no volátil. El técnico puede descargar los datos para análisis de tendencias (engine trend monitoring) mediante el MCDU o laptop en tierra.' },
            ]} />
            <Note>Antes del FADEC, el control del motor se hacía con unidades hidromecánicas (HMU) puras. El FADEC introducido en los años 80 (primer uso comercial: CFM56-2 en 1979) permitió optimizar el consumo, reducir la carga de trabajo del piloto y aumentar la vida de los componentes mediante control preciso de EGT.</Note>
          </section>

          <Solved n="15.7.A" title="Caudal de combustible en despegue del CFM56">
            {{
              q: <P>El CFM56-5B en despegue consume combustible a un caudal de FF = 5200 kg/h por motor. El empuje de T/O es 120 kN. (a) Calcula el TSFC en unidades SI (g/s/kN). (b) Si el A320 tiene 2 motores y el vuelo de crucero dura 2.5 h con FF_crucero = 2400 kg/h/motor, ¿cuánto combustible total se consume en crucero?</P>,
              a: <>
                <P><strong>(a) TSFC en despegue:</strong></P>
                <Eq>{'TSFC = \\frac{FF}{F} = \\frac{5200\\ \\text{kg/h}}{120\\ \\text{kN}} = \\frac{5200/3600\\ \\text{kg/s}}{120000\\ \\text{N}} = \\frac{1.444}{120000} = 12.03\\ \\text{g/s/kN}'}</Eq>
                <P>O equivalentemente: 5200/120 = 43.3 kg/h/kN = 0.0433 kg/h/N.</P>
                <P><strong>(b) Combustible en crucero (2 motores):</strong></P>
                <Eq>{'m_{comb} = 2 \\times FF_{crucero} \\times t = 2 \\times 2400 \\times 2.5 = 12\\,000\\ \\text{kg}'}</Eq>
                <P>12 000 kg de combustible consumidos en el tramo de crucero. El A320 tiene una capacidad de combustible total de ~26 730 kg, por lo que un vuelo de 2.5 h consume menos de la mitad del tanque en crucero.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la función de la HMU (Hydro-Mechanical Unit) en los motores sin FADEC y qué ventajas ofrece el FADEC frente a la HMU pura?</P>,
              a: <><P><strong>R:</strong> La <strong>HMU</strong> regula mecánicamente el caudal de combustible en función de la posición de la palanca de empuje, las RPM del motor y la temperatura de entrada, usando válvulas y mecanismos hidráulicos de precisión. Es robusta y no requiere electricidad para funcionar (sistema redundante). El <strong>FADEC</strong> ventajas: (1) mayor precisión en el control de EGT (±1°C vs ±5°C de la HMU); (2) optimización continua del ciclo termodinámico; (3) protección automática de límites (N1, EGT, surge); (4) mayor vida de componentes; (5) reducción de la carga de trabajo del piloto (single lever control). El FADEC tiene redundancia doble para compensar su mayor complejidad.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué los inyectores de combustible (fuel nozzles) del motor turbina usan atomización fina (gotas &lt;100 μm) en lugar de inyectar combustible líquido en grandes chorros?</P>,
              a: <><P><strong>R:</strong> La combustión requiere que el combustible esté en <strong>fase gaseosa</strong> (vaporizado) para reaccionar con el oxígeno del aire. Las gotas pequeñas (&lt;100 μm) tienen una relación superficie/volumen enorme: se evaporan en microsegundos al entrar en la zona caliente de la cámara. Las gotas grandes no se evaporan a tiempo → llegan a la pared de la cámara o a los álabes sin quemar → hollín, quemaduras en liner, emisiones de HC y CO. Los inyectores duplex y air-blast aseguran atomización fina en todo el rango de caudal (desde ralentí hasta T/O), donde las condiciones de presión y temperatura varían enormemente.</P></>
            },
            {
              n: 3,
              q: <P>¿Qué información registra el FADEC/BITE durante un vuelo y cómo la usa el técnico de mantenimiento en tierra?</P>,
              a: <><P><strong>R:</strong> El FADEC registra continuamente: N1, N2, EGT, FF, posición de IGVs y VSVs, estado de las bleed valves, temperaturas de aceite, presiones de aceite/combustible, vibraciones, cualquier evento de surge o anomalía. El técnico lo descarga con el MCDU (Multipurpose Control and Display Unit) o mediante una laptop en tierra. Analiza: (1) tendencias de EGT (engine trend monitoring); (2) excedencias de límites (EGT overtemperature, N1 overlimit); (3) disparidades entre canales A y B del FADEC; (4) frecuencia de activación de las bleed valves o VSVs (indica condiciones de operación al límite). Esta información guía las decisiones de mantenimiento preventivo antes de que ocurra un fallo.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuál es la consecuencia de volar con un inyector (fuel nozzle) obstruido parcialmente en uno de los 20 inyectores del CFM56?</P>,
              a: <><P><strong>R:</strong> Un inyector parcialmente obstruido produce: (1) <strong>Distribución de temperatura irregular</strong> en la salida de la cámara → puntos calientes (hot spots) que pueden dañar álabes de HPT localizados frente al sector deficiente; (2) <strong>Aumento de EGT media</strong> para mantener el mismo empuje (el motor compensa con más caudal por los inyectores restantes); (3) <strong>Mayor emisión de HC y CO</strong> en ese sector (combustión incompleta); (4) Potencial formación de coque (depósitos de carbono) en el propio inyector, empeorando progresivamente la situación. La inspección periódica y limpieza ultrasónica de inyectores (cada 3000–5000 h según AMM) previene este problema.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué es el "engine washing" (lavado del motor) y cómo mejora el rendimiento del motor turbina?</P>,
              a: <><P><strong>R:</strong> El engine washing es la inyección de agua desionizada o detergente a través de los inyectores con el motor en giro lento (cranking sin encendido) o en operación, para eliminar depósitos de suciedad, sales y polvo de los álabes del compresor y turbina. La suciedad en las palas del compresor (especialmente en los aeropuertos cercanos al mar o ciudades con polución) aumenta la rugosidad superficial → mayor resistencia → peor eficiencia aerodinámica → EGT más alta para el mismo empuje. Un lavado mensual puede recuperar 0.5–1.5% de rendimiento → ahorro de 1–3% de combustible → miles de euros por avión al año. Algunos operadores hacen "on-wing water wash" con el motor encendido para limpiar también las etapas calientes.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-08',
      title: '15.8 Sistema de lubricación',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Funciones de la lubricación</h3>
            <P>El sistema de lubricación del motor turbina cumple las siguientes funciones:</P>
            <DefList items={[
              { term: 'Lubricación', def: 'Forma una película de aceite entre superficies en contacto (cojinetes, engranajes) reduciendo el rozamiento y el desgaste.' },
              { term: 'Refrigeración', def: 'El aceite absorbe calor de los cojinetes y lo transfiere al intercambiador aceite-combustible.' },
              { term: 'Sellado', def: 'Los sellos de cojinete se lubrican con aceite para evitar la fuga de gases de la trayectoria de flujo hacia los sumideros de aceite.' },
              { term: 'Limpieza', def: 'El aceite arrastra partículas de desgaste hacia el filtro y los detectores de partículas (chip detectors).' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Sistema de circulación — presión y retorno</h3>
            <P>Los motores turbina usan un sistema de lubricación de <strong>circulación total</strong> (total loss o recirculación). El aceite se almacena en el depósito, se presuriza por la bomba de presión, lubrica los cojinetes y vuelve por las bombas de retorno (scavenge pumps) al depósito pasando por el intercambiador y el filtro.</P>
            <Eq>{`Aceite usado en motores turbina:
MIL-PRF-23699: aceite sintético de ésteres (5 cSt)
MIL-PRF-7808:  aceite sintético (3 cSt) para bajas T

Temperatura de operación típica: 80–180°C
Alerta alta temperatura: ~175°C
Límite chip detector: partículas ferrosas ≥ 0.5 mm → parada`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Chip detectors y análisis de aceite (SOAP)</h3>
            <DefList items={[
              { term: 'Chip detector', def: 'Imán instalado en el retorno de aceite que captura partículas ferrosas. Si se activa la luz de CHIP en cabina, el motor debe inspeccionarse según el AMM (normalmente en la siguiente escala).' },
              { term: 'SOAP (Spectrometric Oil Analysis Program)', def: 'Análisis periódico de muestras de aceite en laboratorio para detectar concentraciones anómalas de metales (Fe, Cu, Al, Cr, Ni). Herramienta de mantenimiento predictivo: detecta desgaste antes de que falle el componente.' },
            ]} />
            <Warn>Un chip detector activo en despegue requiere evaluación según el MEL (Minimum Equipment List). En general, si el motor funciona normalmente, se puede continuar el vuelo a la escala más próxima y realizar la inspección. La decisión final es del capitán en consulta con mantenimiento.</Warn>
          </section>

          <Solved n="15.8.A" title="Análisis de chip detector — interpretación del SOAP">
            {{
              q: <P>Un análisis SOAP de un turbofán comercial revela: Fe = 12 ppm (normal &lt;15), Cu = 45 ppm (alerta &gt;30), Al = 8 ppm (normal). El análisis anterior (500 h antes) mostraba: Fe = 10, Cu = 18, Al = 7 ppm. ¿Qué indica este análisis y qué acción de mantenimiento se recomienda?</P>,
              a: <>
                <P><strong>Interpretación:</strong></P>
                <P>Fe (hierro): aumento mínimo de 10 → 12 ppm, dentro de límites → cojinetes y engranajes de acero normales.</P>
                <P>Cu (cobre): aumento de 18 → 45 ppm (150% de incremento), <strong>supera el límite de alerta de 30 ppm</strong>. El cobre proviene de: cojinetes de bronce, casquillos de cobre, intercambiadores aceite/combustible de aleación de Cu.</P>
                <P>Al (aluminio): sin cambio significativo → carcasas y componentes de aluminio sin desgaste anormal.</P>
                <P><strong>Acción recomendada:</strong> La elevación de Cu indica desgaste anormal de un componente que contiene cobre. Se recomienda: (1) reducir el intervalo de muestreo a 50 h para monitorizar la tendencia; (2) inspección del intercambiador aceite-combustible (oil cooler) y de los casquillos de bronce de los cojinetes del AGB; (3) si Cu supera 60 ppm en la próxima muestra → retirar el motor para inspección antes del siguiente vuelo.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Qué tipo de aceite se usa en los motores turbina y por qué es diferente del aceite de motor de pistón de automoción?</P>,
              a: <><P><strong>R:</strong> Los motores turbina usan <strong>aceites sintéticos de ésteres</strong> (MIL-PRF-23699, 5 cSt; MIL-PRF-7808, 3 cSt). Diferencias con aceites de pistón: (1) <strong>Estabilidad térmica extrema</strong>: operan a 180°C continuamente y picos de 200°C sin degradación; (2) <strong>Punto de versamiento muy bajo</strong>: fluyen a −54°C para arranques en frío a alta altitud; (3) <strong>No contienen detergentes</strong> ni aditivos que causen problemas en sellos de turbina; (4) <strong>Miscibilidad</strong>: los aceites aprobados son miscibles entre sí, facilitando las adiciones en campo. Mezclar aceite de automoción (mineral o parcialmente sintético) en un motor turbina puede causar fallo de cojinetes en pocas horas.</P></>
            },
            {
              n: 2,
              q: <P>¿Cómo funciona un chip detector magnético y qué tamaño mínimo de partícula detecta?</P>,
              a: <><P><strong>R:</strong> El chip detector es un imán permanente instalado en el punto más bajo del retorno de aceite (sumidero/scavenge). Captura partículas ferrosas del flujo de aceite que circula por él. Los modelos con alarma eléctrica tienen dos electrodos: cuando una partícula de tamaño suficiente (≥ 0.5 mm típicamente, varía según el motor) se adhiere al imán y cierra el circuito entre los electrodos, activa la indicación de CHIP en cabina. Las partículas más pequeñas se capturan pero no generan alarma (son "finas" — normal desgaste). El técnico inspecciona visualmente el chip detector periódicamente y analiza morfología de los chips: laminillas = desgaste abrasivo normal; viruta gruesa = daño agudo.</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué los sistemas de lubricación de los motores turbina usan múltiples bombas de retorno (scavenge pumps) con mayor caudal combinado que la bomba de presión?</P>,
              a: <><P><strong>R:</strong> El aceite caliente se mezcla con aire en los sumideros de cojinetes (air-oil mixture), formando una espuma de volumen mucho mayor que el aceite solo. Para evacuar este volumen de mezcla aceite-aire de todos los sumideros (puede haber 4–6 sumideros en un turbofán), las bombas de retorno deben tener un caudal volumétrico combinado <strong>5–8 veces mayor</strong> que la bomba de presión. Si el retorno fuera insuficiente, el aceite se acumularía en los sumideros, aumentando el nivel y causando espumeo excesivo que reduce la lubricación efectiva de los cojinetes → fallo de cojinetes.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuáles son los indicios de una fuga de aceite interna (de los sellos de cojinete) en un motor turbina y cómo afecta al motor y a la cabina?</P>,
              a: <><P><strong>R:</strong> Una fuga interna de aceite ocurre cuando el sello de un cojinete falla y el aceite pasa al flujo de aire de la trayectoria de flujo (gas path). Indicios: (1) <strong>Consumo elevado de aceite</strong> (sin huella en exterior del motor); (2) <strong>Olor a aceite quemado en cabina</strong> (el aceite contaminado se mezcla con el bleed air del motor); (3) <strong>Humo azul en los gases de escape</strong>; (4) <strong>Contaminación de cabina</strong> (fume event): el aceite sintético caliente puede generar compuestos tóxicos (trietilfostato TCP) que afectan a tripulación y pasajeros (síndrome del avión enfermo). Los fume events son un problema serio de seguridad en aviación, con varios casos documentados de incapacitación de pilotos.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué hace el técnico cuando inspecciona visualmente el chip detector y encuentra un chip de 3 mm de longitud con forma de viruta gruesa?</P>,
              a: <><P><strong>R:</strong> Una viruta gruesa (3 mm) en el chip detector indica <strong>daño mecánico agudo</strong> (no desgaste gradual normal). El protocolo es: (1) <strong>Documentar</strong>: fotografiar el chip, registrar tamaño, forma, color; (2) <strong>Análisis elemental</strong>: si es magnético → acero de cojinete/engranaje; si no es magnético → material diferente (Ti, Al, Ni); (3) <strong>No liberar el avión</strong> hasta confirmar el origen; (4) <strong>Borescope</strong> de los componentes sospechosos (AGB, cojinetes accesibles); (5) <strong>Consultar el AMM</strong> Capítulo 79 para los límites de tamaño de chip; (6) Si excede el límite → retirar el motor para inspección en taller. Una viruta de 3 mm supera en general los límites de "acceptable" y requiere shop visit.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-09',
      title: '15.9 Sistema de sangría de aire (Bleed Air)',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Usos del bleed air</h3>
            <P>El aire sangrado del compresor (<strong>bleed air</strong>) se usa para múltiples sistemas de la aeronave:</P>
            <Table headers={['Sistema', 'Temperatura/Presión', 'Sangría de']} rows={[
              ['Presurización y aire acondicionado (PACK)', '200–250°C, 30–50 psi', 'Etapas medias y altas del HPC'],
              ['Antihielo de borde de ataque (wing/nacelle)', '150–200°C', 'HP bleed o LP bleed'],
              ['Arranque neumático del motor', 'Alta presión', 'HP bleed de otro motor o GPU/ASU'],
              ['Presuriz. depósitos hidráulicos', 'Baja presión', 'Fan stage o LP'],
              ['Sellado de cojinetes', 'Baja presión', 'Fan/LP'],
              ['Refrigeración de turbina y disco', 'Moderada', 'HP compressor'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Penalización de empuje</h3>
            <P>Cada kilogramo de aire sangrado del compresor reduce el empuje disponible y aumenta el consumo específico. Esto es especialmente crítico en despegue y ascenso:</P>
            <Eq>{`Penalización típica de bleed air:
~1% de reducción de empuje por cada 1% de flujo sangrado
A despegue (máxima potencia): bleed air normalmente OFF
→ mejora el empuje y protege la EGT`}</Eq>
            <Note>El B787 Dreamliner eliminó el sistema de bleed air de los motores. En su lugar usa sistemas eléctricos de alta potencia (generadores de 250 kVA cada motor) para el aire acondicionado (eCABIN) y el antihielo (sistema eléctrico). Resultado: 3% de mejora en consumo de combustible frente a sistemas equivalentes con bleed.</Note>
          </section>

          <Solved n="15.9.A" title="Penalización de empuje por bleed air en despegue">
            {{
              q: <P>El CFM56-5B genera un flujo másico total de 450 kg/s. El sistema de A/C sangra el 3% del flujo del compresor para la presurización/A/C. En despegue, el bleed está OFF para maximizar el empuje. (a) ¿Cuánto flujo másico se sanguinaría si estuviera ON? (b) Si la penalización es ~1% de empuje por 1% de flujo sangrado, y el empuje nominal en T/O es 120 kN, ¿cuánto empuje se pierde con bleed ON?</P>,
              a: <>
                <P><strong>(a) Flujo sangrado con bleed ON:</strong></P>
                <Eq>{'\\dot{m}_{bleed} = 0.03 \\times 450 = 13.5\\ \\text{kg/s}'}</Eq>
                <P><strong>(b) Pérdida de empuje:</strong></P>
                <Eq>{'\\Delta F = 0.03 \\times 120\\ \\text{kN} = 3.6\\ \\text{kN}'}</Eq>
                <P>Con bleed ON en despegue, el motor entregaría solo 116.4 kN en lugar de 120 kN → reducción del 3%. Para un A320 con dos motores, esto equivale a 7.2 kN menos de empuje total, lo que puede ser crítico en despegues desde aeródromos cortos o con alta DA. Por eso los procedimientos de despegue estipulan BLEED OFF en T/O cuando sea necesario maximizar el empuje.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Enumera al menos 4 sistemas de la aeronave que utilizan bleed air del motor y explica brevemente la función del bleed en cada uno.</P>,
              a: <><P><strong>R:</strong> (1) <strong>Presurización / A/C (PACK)</strong>: el bleed air (200–250°C) pasa por la unidad de aire acondicionado (PACK), se enfría y se suministra a la cabina a 18–24°C; (2) <strong>Antihielo ala (WAI)</strong>: aire caliente sangrado circula por el borde de ataque del ala evitando la formación de hielo; (3) <strong>Antihielo nacela (EAI)</strong>: calienta el labio de la entrada del motor; (4) <strong>Arranque neumático del motor</strong>: el starter neumático usa bleed air del otro motor (o GPU/ASU) para girar el rotor y arrancar el motor; (5) <strong>Sellado de cojinetes</strong>: baja presión de bleed mantiene los sellos de cojinetes inflados evitando la fuga de aceite.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué el B787 eliminó el sistema de bleed air y qué tecnologías alternativas usa? ¿Qué beneficios operativos ofrece esto a las aerolíneas?</P>,
              a: <><P><strong>R:</strong> El B787 usa arquitectura "bleedless" o "more electric": no extrae bleed del compresor. En su lugar: (1) <strong>Compresores eléctricos (ECS)</strong> para presurización/A/C: motores eléctricos de 100+ kW comprimen el aire directamente; (2) <strong>Antihielo eléctrico</strong>: resistencias eléctricas en el borde de ataque en lugar de aire caliente. La energía proviene de los generadores de 250 kVA de cada motor. Beneficios: (1) 3% de reducción de consumo (el bleed "roba" eficiencia al ciclo termodinámico); (2) Mejor calidad del aire de cabina (sin riesgo de contaminación por aceite del motor vía bleed); (3) Mayor simplicidad del motor (sin tuberías de bleed de alta presión/temperatura); (4) Menor mantenimiento del sistema de distribución de aire.</P></>
            },
            {
              n: 3,
              q: <P>¿Cuándo debe activarse el antihielo del motor (ENG ANTI ICE) según los procedimientos normales del A320? ¿Puede dejarse encendido en tierra sin condiciones de hielo?</P>,
              a: <><P><strong>R:</strong> El ENG ANTI ICE debe activarse cuando hay riesgo de formación de hielo: OAT &lt;10°C y condiciones de humedad visible (nubes, lluvia, nieve, niebla) o hielo en la plataforma. Se activa <strong>antes de entrar en condiciones IMC con posible hielo</strong>, no cuando ya se ha formado (el hielo formado puede desprenderse e ingerirse al activar el anti-ice). En tierra: el A320 limita el uso de EAI en tierra con motores a baja potencia para no sobrecalentar el labio. Si se deja ON sin condiciones de hielo, consume bleed innecesariamente (reducción del 3% de empuje en T/O), aumentando el consumo de combustible.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es la "pressurization schedule" (programación de presurización) de la cabina y cómo está relacionada con el bleed air del motor?</P>,
              a: <><P><strong>R:</strong> La presurización programada mantiene la altitud de cabina (presión interior equivalente a una cierta altitud) dentro de los límites de confort y seguridad (máx. 8000 ft de altitud de cabina en CS-25). A mayor altitud de vuelo, mayor la diferencia de presión a mantener (ΔP = P_cabina − P_exterior). El bleed air extrae aire del compresor a alta presión → la PACK lo acondiciona y suministra a la cabina → la outflow valve controla cuánto sale para mantener el ΔP deseado. Conforme el avión sube, el PACK necesita más flujo (o mayor presión) de bleed para compensar el menor P_exterior. Los sistemas de control de presurización modulan automáticamente el bleed valve y la outflow valve para seguir la schedule programada.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué indica una indicación de "BLEED FAULT" en la ECAM del A320 y cuáles son las acciones básicas del piloto?</P>,
              a: <><P><strong>R:</strong> Una alerta BLEED FAULT en la ECAM indica una anomalía en el sistema de extracción y distribución de aire del compresor: puede ser una válvula bloqueada, presión o temperatura de bleed fuera de límites, o fallo del sistema de control. Acciones básicas del piloto según el QRH/ECAM: (1) Identificar el motor/sistema afectado; (2) Si hay alta temperatura de bleed → cerrar el bleed valve del motor afectado (ENG BLEED switch OFF) para evitar daños en las tuberías; (3) El sistema de A/C y presurización puede continuar con el bleed del otro motor (configuración degradada); (4) En tierra: mantenimiento inspecciona las válvulas de bleed, los PRVs (Pressure Regulating Valves) y los ductos según AMM Capítulo 36.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-10',
      title: '15.10 Arranque e ignición',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Secuencia de arranque</h3>
            <P>El arranque de un motor turbina sigue una secuencia precisa para evitar daños (hot start, hung start, false start):</P>
            <Table headers={['Fase', 'N2 aproximado', 'Evento']} rows={[
              ['Motor starter activo', '0%', 'El starter gira el rotor N2 acelerando el compresor'],
              ['Ignición ON', '~5–15% N2', 'Se activan los encendedores (igniters). Sin combustible aún.'],
              ['Combustible ON', '~15–25% N2', 'Se abre la válvula de combustible (start lever/fuel cock)'],
              ['Light-off', '~20–30% N2', 'La mezcla se enciende. EGT empieza a subir.'],
              ['Autosuficiente (self-sustaining)', '~50–55% N2', 'El motor genera suficiente energía para mantener la rotación sin el starter. Se desconecta el starter.'],
              ['Ralentí (idle)', '~60–70% N2', 'Estabilización a régimen de ralentí. EGT dentro de límites.'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Anomalías de arranque</h3>
            <DefList items={[
              { term: 'Hot start', def: 'La EGT supera el límite durante el arranque. Causas: exceso de combustible, baja velocidad del starter, mal estado de la turbina. Acción: cortar combustible inmediatamente, ventilar el motor (motor dry run) y notificar mantenimiento.' },
              { term: 'Hung start', def: 'El motor enciende pero no acelera más allá de un RPM bajo con EGT elevada. El compresor no genera suficiente flujo para mantener la combustión estable. Cortar combustible.' },
              { term: 'False start (no light-off)', def: 'No hay ignición. Puede deberse a encendedores defectuosos, baja presión de combustible o exceso de viento de cara (windmilling excesivo).' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Sistema de ignición</h3>
            <P>Los encendedores (<strong>igniters</strong>) del motor turbina son similares a las bujías pero generan una chispa de mucho mayor energía (hasta 20 J por chispa, vs 0.1 J en motor de pistón). Solo actúan durante el arranque; la combustión se mantiene sola una vez encendida.</P>
            <DefList items={[
              { term: 'Encendido continuo (continuous ignition)', def: 'Se mantiene activo en condiciones de lluvia intensa, granizo, polvo volcánico o riesgo de extinción de llama (flame-out). Activa una luz de aviso en cabina.' },
              { term: 'Relighting en vuelo', def: 'Si se apaga un motor en vuelo (flame-out), los encendedores se activan automáticamente o manualmente para rearrancar. Ventana de reencendido: altitud, velocidad y temperatura adecuadas.' },
            ]} />
          </section>

          <Solved n="15.10.A" title="Diagnóstico de hot start en arranque">
            {{
              q: <P>Durante el arranque del motor en tierra, el técnico observa la siguiente secuencia: N2 alcanza el 20% a los 30 s → se abre la válvula de combustible → EGT empieza a subir → a los 50 s la EGT alcanza 680°C cuando el límite de hot start es 635°C → el técnico corta el combustible. (a) ¿Es este un hot start? (b) Qué acciones se toman? (c) ¿Qué puede haber causado el hot start?</P>,
              a: <>
                <P><strong>(a)</strong> Sí, es un <strong>hot start</strong>: la EGT (680°C) ha superado el límite de hot start (635°C) durante el arranque.</P>
                <P><strong>(b) Acciones inmediatas:</strong></P>
                <P>1. <strong>Cortar combustible</strong> inmediatamente (START lever a CUT OFF) — ya realizado por el técnico.</P>
                <P>2. <strong>Motor dry run</strong>: girar el motor con el starter sin combustible durante 30–60 s para ventilar y enfriar el motor.</P>
                <P>3. <strong>Registrar el evento</strong> en el log book del motor: hora, duración del hot start, EGT máxima alcanzada.</P>
                <P>4. <strong>Notificar a ingeniería/mantenimiento</strong> para evaluación del daño según el AMM Cap. 71 (overtemperature limits).</P>
                <P>5. <strong>Inspección boroscopio</strong> de la turbina antes del siguiente vuelo si la EGT excedió significativamente el límite.</P>
                <P><strong>(c) Posibles causas:</strong> baja velocidad de N2 al introducir el combustible (starter débil o batería descargada), exceso de combustible (inyector obstruido que crea zona rica), dificultad en el vaciado del combustible residual en el arranque anterior, temperatura ambiente muy alta (alta DA).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia entre un "hot start", un "hung start" y un "false start"? ¿Cuál es la acción correcta en cada caso?</P>,
              a: <><P><strong>R:</strong> <strong>Hot start</strong>: el motor enciende pero la EGT supera el límite → cortar combustible inmediatamente, motor dry run, notificar mantenimiento. <strong>Hung start</strong>: el motor enciende pero N2 no sube más allá de un punto bajo con EGT elevada → cortar combustible, el compresor no genera flujo suficiente. <strong>False start</strong>: no hay light-off (EGT no sube) → cortar combustible, verificar encendedores y presión de combustible. En todos los casos: motor dry run antes de cualquier nuevo intento de arranque.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué los encendedores (igniters) de un motor turbina generan chispas de 20 J en lugar de los 0.1 J típicos de las bujías de un motor de pistón?</P>,
              a: <><P><strong>R:</strong> El encendido de la mezcla en la cámara de combustión de una turbina es más difícil que en un motor de pistón porque: (1) la mezcla de combustible atomizado y aire es menos uniforme que en un cilindro; (2) la presión en la cámara a baja RPM (arranque) puede ser baja (menor densidad → menor energía de combustión); (3) la velocidad del flujo de aire en la cámara es alta → tienede a "apagar" la chispa. Una chispa de 20 J asegura una zona de plasma lo suficientemente grande y de larga duración para iniciar la combustión en estas condiciones adversas. Una vez encendido el motor, la llama se autoalimenta y los igniters se desconectan.</P></>
            },
            {
              n: 3,
              q: <P>¿A qué porcentaje de N2 se desconecta típicamente el starter neumático durante el arranque y por qué se llama "self-sustaining speed"?</P>,
              a: <><P><strong>R:</strong> El starter se desconecta a ~50–55% N2, velocidad "self-sustaining" o "autosuficiente". A este punto, la combustión genera suficiente energía para accelerar el motor continuamente sin asistencia externa: la turbina genera más potencia de la que consume el compresor (ciclo termodinámico positivo). Por debajo de este umbral, las pérdidas y la energía necesaria para comprimir el aire superan la generada por la combustión → el motor no puede acelerarse solo → necesita el starter. Por encima de ~55% N2, el motor acelera hasta el ralentí (~60–70% N2) de forma autónoma.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es el "continuous ignition" y en qué condiciones de vuelo se activa en el A320?</P>,
              a: <><P><strong>R:</strong> El continuous ignition mantiene los igniters activos continuamente durante el vuelo para evitar el flame-out (extinción de la llama). En el A320 se activa automáticamente en: (1) <strong>Turbulencia severa</strong> o condiciones que puedan desestabilizar la llama; (2) <strong>Lluvia intensa o granizo</strong> (el agua puede extinguir la llama); (3) <strong>Polvo volcánico</strong> (puede contaminar los inyectores); (4) Ciertos regímenes de vuelo como toma de tierra con reversas. También puede activarse manualmente por el piloto. La luz IGN ON en cabina indica su estado activo. El consumo de los igniters en continuo es mínimo, pero se desgastan más rápido (vida típica de 1500–3000 h de uso continuo).</P></>
            },
            {
              n: 5,
              q: <P>¿Cuál es la "ventana de reencendido en vuelo" (in-flight relight envelope) de un turbofán y qué factores la limitan?</P>,
              a: <><P><strong>R:</strong> La ventana de reencendido define los límites de altitud, velocidad y temperatura donde el motor puede rearrancase exitosamente en vuelo tras un flame-out. Factores limitantes: (1) <strong>Altitud máxima</strong>: a gran altitud la presión y densidad del aire son muy bajas → mezcla muy pobre → difícil ignición (típicamente &lt; FL280 para reencendido normal); (2) <strong>Velocidad mínima</strong>: el "windmilling" del rotor (necesario para presurizar el sistema de combustible y preparar el compresor) requiere velocidad mínima de vuelo; (3) <strong>Temperatura mínima</strong>: a temperaturas muy bajas el combustible puede estar por debajo de su temperatura de inflamación efectiva; (4) <strong>RPM mínima de windmilling</strong>: el compresor debe girar a suficientes RPM para comprimir el aire necesario antes de introducir el combustible. El A320 tiene la ventana de reencendido publicada en el QRH.</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-11',
      title: '15.11 Turbofán y turbohélice',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Turbofán de alto BPR — arquitectura</h3>
            <P>El turbofán de alto BPR (como el CFM56, GE90, PW1000G o Trent XWB) tiene una arquitectura de dos o tres ejes:</P>
            <DefList items={[
              { term: 'Fan', def: 'Gran ventilador en la parte delantera que mueve el grueso del flujo de aire (bypass flow). Proporciona el 70–90% del empuje total a velocidades comerciales. Palas de titanio de gran tamaño (hasta 1.1 m en GE90).' },
              { term: 'LPC (Low Pressure Compressor)', def: 'Compresor de baja presión situado detrás del fan. 1–4 etapas. Gira en el eje de baja presión N1.' },
              { term: 'HPC (High Pressure Compressor)', def: '8–11 etapas de compresión axial. Gira en el eje de alta N2. Relación de compresión total 30–50:1.' },
              { term: 'HPT + LPT', def: 'Turbina de alta acciona el HPC. Turbina de baja acciona el fan+LPC. Giran en sentidos opuestos en algunos motores (counter-rotating) para reducir la carga del dispositivo de guía.' },
            ]} />
            <Eq>{`GE90-115B (B777-300ER):
BPR = 8.7:1
Empuje máximo = 115 300 lbf (513 kN) — más potente del mundo
Diámetro fan = 3.25 m
Relación de compresión total = 42:1`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Motor turbohélice</h3>
            <P>En el turbohélice, la turbina de potencia (free power turbine) extrae casi toda la energía de los gases para accionar la hélice a través de la caja reductora (reduction gearbox). El empuje residual de la tobera es pequeño (5–15%).</P>
            <Eq>{`Reparto de potencia turbohélice (Pratt & Whitney Canada PT6):
~85% de la potencia útil: entregada a la hélice vía reductor
~15%: empuje residual de la tobera
Relación de reducción: ~15:1 (gas generator: ~30 000 RPM → hélice: ~2 000 RPM)`}</Eq>
            <Table headers={['Motor', 'Aeronave', 'Potencia SHP']} rows={[
              ['PT6A-65B', 'Beechcraft King Air 350', '1100 SHP'],
              ['PW127M', 'ATR 72-600', '2750 SHP'],
              ['Allison 501-D22A', 'C130 Hercules (orig.)', '4590 SHP'],
              ['T56-A-15', 'C130H Hercules', '4591 SHP'],
              ['PW150A', 'Bombardier Q400', '5071 SHP'],
            ]} />
          </section>

          <Solved n="15.11.A" title="Potencia útil del PT6A-65B en el King Air 350">
            {{
              q: <P>El turbohélice PT6A-65B del King Air 350 tiene 1100 SHP de potencia al freno. La caja reductora tiene relación 15:1 (gas generator: ~33 000 RPM → hélice: ~2200 RPM). (a) Convierte 1100 SHP a kW. (b) Si el empuje residual de la tobera aporta el 15% del total de "empuje equivalente", ¿cuánta potencia equivalente en kW aporta la tobera? (c) ¿Cuánta potencia en kW consume la transmisión/reductor si su eficiencia es 98%?</P>,
              a: <>
                <P><strong>(a) Conversión SHP → kW:</strong></P>
                <Eq>{'P = 1100\\ \\text{SHP} \\times 745.7\\ \\text{W/SHP} = 820\\,270\\ \\text{W} \\approx 820\\ \\text{kW}'}</Eq>
                <P><strong>(b) Aporte de la tobera (15% del total):</strong></P>
                <P>Si 820 kW (hélice) = 85% del total: P_total = 820/0.85 = 965 kW</P>
                <Eq>{'P_{tobera} = 0.15 \\times 965 = 144.7\\ \\text{kW}'}</Eq>
                <P><strong>(c) Pérdidas en la transmisión (η = 98%):</strong></P>
                <Eq>{'P_{pérdidas} = P_{entrada} \\times (1 - \\eta) = 965 \\times 0.02 = 19.3\\ \\text{kW}'}</Eq>
                <P>La reducción de 15:1 transforma las ~33 000 RPM del gas generator a las ~2200 RPM óptimas para la hélice con solo 19 kW de pérdidas → extraordinaria eficiencia mecánica del reductor epicíclico.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia entre el turbofán de alto BPR y el turbohélice en cuanto a su mecanismo de generación de empuje? ¿Para qué rango de velocidades es más eficiente cada uno?</P>,
              a: <><P><strong>R:</strong> El <strong>turbohélice</strong> usa la turbina de potencia para girar una hélice de gran diámetro (3–5 m): mueve un gran caudal de aire a velocidad ligeramente incrementada → alta eficiencia propulsiva a bajas velocidades (&lt;400 kt). El <strong>turbofán de alto BPR</strong> usa una turbina de baja presión para girar un fan de gran diámetro (1–3 m) con tobera: mueve un flujo bypass moderado a velocidad moderada. Eficiente en crucero subsónico (M 0.78–0.85). Por encima de ~400–450 kt, la compresibilidad en las puntas de la hélice reduce la eficiencia del turbohélice, mientras que el turbofán mantiene su eficiencia hasta M ≈ 0.85.</P></>
            },
            {
              n: 2,
              q: <P>¿Qué es el BPR (Bypass Ratio) del GE90-115B del B777 y cómo se distribuye el flujo total entre bypass y core?</P>,
              a: <><P><strong>R:</strong> El GE90-115B tiene BPR = 8.7:1. De cada 9.7 kg de aire total que ingresa: <strong>8.7 kg</strong> pasan por el bypass (fan) y <strong>1.0 kg</strong> pasan por el core (compresor → combustión → turbina). El bypass (8.7 kg a ~300 m/s) genera ~80% del empuje; el core (1.0 kg a ~500–600 m/s) genera el restante ~20%. Este altísimo BPR da al GE90 su excepcional eficiencia propulsiva en crucero a M 0.85.</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué el fan del GE90-115B tiene un diámetro de 3.25 m y cuáles son los retos de mantenimiento que presenta este tamaño?</P>,
              a: <><P><strong>R:</strong> El gran diámetro (3.25 m) es necesario para mover el caudal de bypass necesario para BPR = 8.7 con velocidades de flujo moderadas (alta eficiencia propulsiva). Retos de mantenimiento: (1) <strong>Ingeniería de hangar</strong>: requiere equipo especial de manipulación (stands, grúas de alta capacidad); (2) <strong>FOD más severo</strong>: un pájaro ingerido en el borde externo del fan a 3.25 m de radio tiene mucho más momento que en un fan más pequeño; (3) <strong>Bird strike certification</strong>: el motor debe certificarse para ingestión de aves muy grandes (geese de 1.8 kg) sin fallo catastrófico (CS-E 800); (4) <strong>Ground clearance</strong>: el B777 tiene una configuración de tren especial para acomodar la gondola del GE90 a pocos centímetros del suelo.</P></>
            },
            {
              n: 4,
              q: <P>El ATR 72 con motores PW127M en vuelo de crucero a 250 kt consume 900 kg/h (por motor). ¿Cuánto combustible consume en total en un vuelo de 2 horas?</P>,
              a: <><Eq>{'m_{total} = 2\\ \\text{motores} \\times 900\\ \\text{kg/h} \\times 2\\ \\text{h} = 3600\\ \\text{kg}'}</Eq><P>El ATR 72 tiene una capacidad de combustible de ~6300 kg, suficiente para más de 3.5 horas de vuelo en crucero. Con reservas (45 min alternado + 30 min contingencia), el vuelo máximo es de ~2.5 h.</P></>
            },
            {
              n: 5,
              q: <P>¿Cuáles son las ventajas del motor de tres ejes (como el Rolls-Royce Trent XWB del A350) frente al motor de dos ejes (como el CFM56) en términos de rendimiento y operación?</P>,
              a: <><P><strong>R:</strong> El motor de 3 ejes (LP + IP + HP) permite que cada compresor gire a su velocidad óptima independientemente: el fan (N1 bajo, ~3000 RPM), el compresor intermedio (N2 medio) y el compresor de alta (N3 alto, ~12 000 RPM). Ventajas: (1) <strong>Mayor eficiencia del compresor</strong> (cada etapa opera en su punto óptimo de trabajo → menor trabajo de compresión → menor TSFC); (2) <strong>Mayor flexibilidad de aceleración</strong>: el compressor de alta puede acelerar rápidamente sin afectar al fan (respuesta más rápida); (3) <strong>Menor riesgo de surge</strong>: las etapas no están "encadenadas" mecánicamente y se adaptan mejor a transitorios; (4) Sin embargo: mayor complejidad mecánica (3 sellos de eje, más cojinetes, más sistemas de lubricación).</P></>
            },
          ]}/>
        </div>
      ),
    },
    {
      id: 'm15-12',
      title: '15.12 Indicaciones y mantenimiento del motor',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Parámetros monitorizados en vuelo</h3>
            <Table headers={['Parámetro', 'Sensor', 'Límite típico (turbofán comercial)']} rows={[
              ['N1 (% RPM fan)', 'Captador de reluctancia variable', '104% max (T/O), 100% MCT'],
              ['N2 (% RPM HPC)', 'Captador de reluctancia variable', '105% max'],
              ['EGT / T4 / T5', 'Termopar de cromel-alumel', '960°C T/O, 950°C MCT (límites típicos)'],
              ['Caudal de combustible FF', 'Turbina de flujo o caudalímetro Coriolis', 'Indicativo, no limitado'],
              ['Presión de aceite', 'Transductor piezoeléctrico', 'Mín. 50 psi en idle, 90 psi en T/O (valores indicativos)'],
              ['Temperatura aceite', 'Termopar en retorno', 'Máx. 155°C típico'],
              ['Vibración N1/N2', 'Acelerómetro piezoeléctrico', '4 unidades (varía según motor)'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Inspección boroscopio (borescope)</h3>
            <P>La inspección boroscopio permite examinar el interior del motor (compresor, cámara de combustión, turbina) sin desmontarlo, introduciendo un endoscopio rígido o flexible por los puertos de boroscopio del motor:</P>
            <DefList items={[
              { term: 'Zonas típicamente inspeccionadas', def: 'Palas de fan, etapas del compresor, inyectores, liner de la cámara, álabes de HPT y LPT, anillos de sellado.' },
              { term: 'Defectos buscados', def: 'Erosión, corrosión, grietas (FOD o fatiga), pérdida de recubrimiento TBC, deformación plástica (creep), quemaduras en el liner.' },
              { term: 'Criterios de aceptación', def: 'Definidos en el AMM Capítulo 72 del fabricante. Cada defecto tiene límites dimensionales específicos (profundidad, longitud, área). Si supera el límite → reparación o sustitución.' },
            ]} />
            <Note>Las inspecciones boroscopio son obligatorias en cada shop visit y tras eventos específicos (bird strike, hard landing, lightning strike en motor, superación de límites de EGT). La frecuencia se establece en el MRBR (Maintenance Review Board Report) del tipo.</Note>
          </section>

          <Solved n="15.12.A" title="Análisis de tendencia de EGT — decisión de shop visit">
            {{
              q: <P>El registro de Engine Trend Monitoring de un CFM56-5B muestra los siguientes datos de EGT en crucero (condiciones ISA, FL350, N1 = 87%): mes 1: 625°C, mes 3: 638°C, mes 6: 651°C, mes 9: 664°C. El límite de EGT en crucero es 675°C. (a) Calcula la tasa de deterioro (°C/mes). (b) ¿En qué mes se alcanzará el límite de EGT si la tendencia continúa? (c) ¿Cuándo debería planificarse el shop visit?</P>,
              a: <>
                <P><strong>(a) Tasa de deterioro:</strong></P>
                <Eq>{'\\text{Tasa} = \\frac{664 - 625}{9 - 1} = \\frac{39}{8} = 4.875\\ °C/\\text{mes} \\approx 5\\ °C/\\text{mes}'}</Eq>
                <P><strong>(b) Mes en que se alcanza el límite (675°C):</strong></P>
                <Eq>{'\\text{Meses adicionales} = \\frac{675 - 664}{5} = 2.2\\ \\text{meses}'}</Eq>
                <P>El límite se alcanzaría aproximadamente en el <strong>mes 11.2</strong>.</P>
                <P><strong>(c)</strong> El shop visit debería planificarse para el <strong>mes 10–11</strong> a más tardar, dejando al menos 1 mes de margen antes de alcanzar el límite. En la práctica, se planifica el shop visit durante una rotación de mantenimiento programado, no cuando el motor ya está al límite. La programación anticipada reduce los costos de AOG (Aircraft on Ground) y permite seleccionar el taller más económico.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuáles son los parámetros principales monitorizados en el motor turbina durante el vuelo y qué sistema de la aeronave los registra?</P>,
              a: <><P><strong>R:</strong> Parámetros principales: N1 (% RPM fan), N2 (% RPM HPC), EGT/T5 (temperatura gases escape), FF (caudal de combustible), presión y temperatura del aceite, vibración N1/N2, EPR (en algunos motores). Son monitorizados por: (1) el <strong>FADEC</strong> (registra en memoria no volátil y protege ante excedencias); (2) el <strong>ACARS/QAR</strong> (Quick Access Recorder) descargado en tierra; (3) el <strong>ECAM</strong> en cabina (muestra valores en tiempo real a la tripulación); (4) los sistemas de <strong>Engine Trend Monitoring</strong> del fabricante (análisis predictivo).</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué un limitador de EGT (EGT limiter) en el FADEC protege los álabes de turbina y qué pasa si falla el canal A y B del FADEC simultáneamente?</P>,
              a: <><P><strong>R:</strong> El FADEC recorta el caudal de combustible automáticamente si la EGT se aproxima al límite, evitando que los pilotos (o el ATOW en despegue automático) excedan el límite de temperatura de los álabes. Si fallan ambos canales del FADEC simultáneamente (probabilidad &lt;10⁻⁹/h por diseño), el motor pasa a control mecánico de emergencia (HMU backup): el piloto debe gestionar manualmente el empuje con mayor cuidado, ya que no hay límites automáticos de EGT. Este escenario es extremadamente improbable y está cubierto en los procedimientos de emergencia del QRH.</P></>
            },
            {
              n: 3,
              q: <P>¿Qué defectos específicos busca el técnico al realizar un borescope de los álabes del compresor de alta presión (HPC) y cuáles son los límites de aceptación típicos?</P>,
              a: <><P><strong>R:</strong> En el HPC se buscan: (1) <strong>FOD damage</strong>: muescas, grietas o dobleces en el borde de ataque por ingestión de objetos; límites típicos: profundidad &lt;0.5 mm sin grieta, longitud &lt;3% de la cuerda; (2) <strong>Erosión</strong>: pérdida gradual de material en puntas de pala; límite: pérdida de cuerda &lt;2%; (3) <strong>Corrosión</strong>: picaduras en aleaciones de titanio (raras pero graves); (4) <strong>Grietas de fatiga</strong>: visibles como líneas finas en la zona de mayor tensión (raíz del álabe); cualquier grieta → sustitución obligatoria; (5) <strong>Deformación de puntas</strong>: roces con la carcasa que generan viruta. Los límites exactos están en el AMM Cap. 72 y el SRM del fabricante.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuál es la diferencia entre un "on-condition" maintenance program y un "hard time" maintenance program para los motores turbina?</P>,
              a: <><P><strong>R:</strong> El <strong>hard time</strong> (tiempo fijo) requiere overhaul o sustitución del componente después de un número fijo de horas/ciclos, independientemente de su estado. Simple de gestionar pero puede sustituir componentes en buen estado (desperdicio) o pasar por alto daños entre intervalos. El <strong>on-condition</strong> (según condición) solo actúa cuando los parámetros monitorizados (EGT trend, vibraciones, consumo de aceite, SOAP) indican degradación real. La mayoría de los motores turbinas modernos operan "on-condition" con los programas de Engine Health Monitoring: se monitoriza continuamente y se planifica el shop visit cuando la condición real lo requiere. Esto maximiza la vida de los componentes y reduce costos, pero requiere sistemas de monitorización robustos.</P></>
            },
            {
              n: 5,
              q: <P>¿Cuándo es obligatorio realizar una inspección boroscopio del motor turbina según las regulaciones EASA? Menciona al menos 4 eventos que la desencadenan.</P>,
              a: <><P><strong>R:</strong> La inspección boroscopio es obligatoria según el AMM y las ADs/SBs del fabricante tras: (1) <strong>Bird strike confirmado o sospechado</strong> que afecte al motor; (2) <strong>Superación de límites de EGT</strong> (hot start, EGT overtemperature durante vuelo); (3) <strong>Hard landing</strong> (aterrizaje con factor de carga que supere el límite de landing); (4) <strong>Lightning strike</strong> en el motor o en la nacela; (5) <strong>FOD ingestion</strong> confirmado (granizo severo, polvo volcánico); (6) <strong>Vibración anormal</strong> que exceda el límite (indicada en cabina); (7) <strong>Chip detector activo</strong> (según el MEL, puede requerirse antes del siguiente vuelo); (8) <strong>Cada shop visit programado</strong> (inspección completa antes del overhaul). Los intervalos de borescope periódico (sin eventos) se establecen en el MRBR del tipo de aeronave.</P></>
            },
          ]}/>
        </div>
      ),
    },
  ],
};

export default m15;
