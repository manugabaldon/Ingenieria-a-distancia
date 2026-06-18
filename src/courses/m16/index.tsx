import { CourseModule, Eq, P, Note, Warn, DefList, Table, Solved, Practice } from '../CourseView';

const m16: CourseModule = {
  id: 'm16',
  code: 'M16',
  title: 'Motor de Pistón',
  subtitle: 'Motor de combustión interna alternativo',
  icon: '🔧',
  license: 'B1',
  description: 'Construcción, sistemas y mantenimiento del motor de pistón aeronáutico según EASA Part-66 B1.',
  chapters: [
    {
      id: 'm16-01',
      title: '16.1 Fundamentos y ciclos de combustión',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Ciclo de cuatro tiempos (Ciclo Otto)</h3>
            <P>El motor de pistón aeronáutico es un motor de combustión interna de <strong>cuatro tiempos</strong>. El ciclo completo requiere dos revoluciones del cigüeñal:</P>
            <Table headers={['Tiempo', 'Carrera del pistón', 'Válvulas', 'Proceso']} rows={[
              ['1° Admisión', 'PMI → PME (baja)', 'Admisión abierta / escape cerrada', 'Mezcla aire-combustible entra al cilindro'],
              ['2° Compresión', 'PME → PMI (sube)', 'Ambas cerradas', 'Mezcla se comprime (↑T, ↑P). Al final, encendido por bujía.'],
              ['3° Explosión/Expansión', 'PMI → PME (baja)', 'Ambas cerradas', 'Combustión → expansión de gases → trabajo útil (única carrera motriz)'],
              ['4° Escape', 'PME → PMI (sube)', 'Escape abierta / admisión cerrada', 'Gases quemados expulsados al exterior'],
            ]} />
            <DefList items={[
              { term: 'PMI', def: 'Punto Muerto Interior (TDC): pistón en su posición más alta.' },
              { term: 'PME', def: 'Punto Muerto Exterior (BDC): pistón en su posición más baja.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Relación de compresión y rendimiento</h3>
            <Eq>{`rc = V_total / V_cámara = (V_d + V_c) / V_c
Motores aeronáuticos típicos: rc = 7:1 – 10:1
η_Otto = 1 − 1/rc^(γ−1) = 1 − 1/rc^0.4`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Potencia indicada, efectiva y pérdidas</h3>
            <Eq>{`Pi = Pmi · V_d · n / (2 × 60)   [W]  (4 tiempos)
Pe = Pi − P_rozamiento − P_accesorios
η_m = Pe / Pi  (típico 0.85–0.90)`}</Eq>
          </section>

          <Solved n="16.1.A" title="Relación de compresión y rendimiento del ciclo Otto"
            q={<P>Un motor tiene V_desplazado = 360 in³ (5,9 L) con 4 cilindros iguales y relación de compresión rc = 8,5. Calcular el volumen de la cámara de combustión por cilindro y el rendimiento teórico del ciclo Otto (γ = 1,4).</P>}
            a={<><P>Volumen desplazado por cilindro: V_d = 5,9 L / 4 = 1,475 L</P><Eq>{'r_c = (V_d + V_c)/V_c \\implies V_c = V_d/(r_c - 1) = 1.475/(8.5-1) = 0.197\\ \\text{L} = 197\\ \\text{cc}'}</Eq><Eq>{'\\eta_{Otto} = 1 - 1/8.5^{0.4} = 1 - 1/2.232 = 1 - 0.448 = 55.2\\%'}</Eq><P>El ciclo Otto ideal tiene rendimiento del <strong>55,2 %</strong>. El motor real tendrá pérdidas mecánicas y térmicas → rendimiento efectivo ~28–32 %.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿En qué tiempo del ciclo de 4 tiempos se genera trabajo mecánico útil? ¿Cuántas veces por revolución del cigüeñal ocurre esto en un motor de 4 cilindros?</P>, a: <P><strong>R:</strong> Solo en el <strong>3er tiempo (expansión/combustión)</strong>. En un motor de 4 cilindros, cada cilindro genera un impulso por cada 2 vueltas del cigüeñal → 4 impulsos por cada 2 revoluciones = <strong>2 impulsos por vuelta</strong>, espaciados cada 180°.</P> },
            { n: 2, q: <P>Un motor de pistón tiene Pi = 190 HP e η_m = 0,87. ¿Cuánta potencia efectiva entrega al eje? ¿Qué potencia consumen el rozamiento y accesorios?</P>, a: <><Eq>{'P_e = P_i \\times \\eta_m = 190 \\times 0.87 = 165.3\\ \\text{HP} \\qquad P_{pérd} = 190 - 165.3 = 24.7\\ \\text{HP}'}</Eq></> },
            { n: 3, q: <P>Un cilindro tiene V_d = 1600 cc y V_c = 200 cc. ¿Cuál es su relación de compresión? ¿Es apropiado para Avgas 100LL (requiere rc ≤ 10:1)?</P>, a: <><Eq>{'r_c = (1600 + 200)/200 = 1800/200 = 9:1'}</Eq><P>Sí, rc = 9:1 es apropiado para Avgas 100LL. <strong>R: 9:1 ✓</strong></P></> },
            { n: 4, q: <P>¿Por qué el motor de 4 tiempos abre la válvula de admisión ligeramente ANTES del PMI superior y la cierra DESPUÉS del PME inferior?</P>, a: <P><strong>R:</strong> Se aprovecha la <strong>inercia del flujo de gases</strong>. Los gases tienen momentum y continúan fluyendo aunque el pistón ya haya cambiado de dirección. Abriendo antes y cerrando tarde se maximiza la carga de la mezcla en el cilindro, mejorando el llenado volumétrico y por tanto la potencia.</P> },
            { n: 5, q: <P>Calcular la frecuencia de los impulsos de combustión (Hz) de un motor de 6 cilindros a 2400 RPM.</P>, hint: <span>En 4 tiempos: impulsos = cilindros × RPM / 2.</span>, a: <><Eq>{'f = 6 \\times 2400/2 / 60 = 120\\ \\text{impulsos/s} = 120\\ \\text{Hz}'}</Eq><P>A 2400 RPM un 6 cil. genera 120 explosiones por segundo.</P></> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-02',
      title: '16.2 Construcción — Cigüeñal, biela y pistón',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Cigüeñal</h3>
            <P>El cigüeñal transforma el movimiento alternativo en rotación continua. Se fabrica en acero forjado (SAE 4340) con superficies nitruradas.</P>
            <DefList items={[
              { term: 'Muñequilla (crankpin)', def: 'Parte excéntrica donde se apoya la biela. El radio determina la carrera del pistón.' },
              { term: 'Muñón (main journal)', def: 'Apoyo del cigüeñal en los cojinetes principales del cárter.' },
              { term: 'Contrapesos', def: 'Masas opuestas a los brazos del cigüeñal que compensan fuerzas de inercia y reducen la vibración.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Biela y pistón</h3>
            <DefList items={[
              { term: 'Biela', def: 'Conecta el pistón con el cigüeñal. Fabricada en acero forjado o titanio.' },
              { term: 'Pistón', def: 'Aleación de aluminio forjado. Ranuras para segmentos. Faldón estabilizador.' },
              { term: 'Segmentos (rings)', def: '1–2 segmentos de compresión + 1 rascador de aceite. Fundición gris o acero.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Cárter y cilindros</h3>
            <P>Los cilindros aeronáuticos son <strong>desmontables individualmente</strong>. El Lycoming O-360 tiene 4 cilindros opuestos horizontales, 360 in³ (5,9 L), 180 HP.</P>
            <Note>Los motores de aviación general (Lycoming, Continental) usan configuración opuesta horizontal (flat engine): menor altura frontal, menor resistencia aerodinámica.</Note>
          </section>

          <Solved n="16.2.A" title="Carrera del pistón desde radio del cigüeñal"
            q={<P>Un motor tiene muñequillas con radio de manivela (throw) de <strong>r = 57 mm</strong>. Calcular la carrera del pistón (stroke). Si el cilindro tiene diámetro (bore) de 112 mm, calcular la cilindrada total de un motor de 6 cilindros.</P>}
            a={<><Eq>{'\\text{Carrera} = 2r = 2 \\times 57 = 114\\ \\text{mm}'}</Eq><Eq>{'V_d = \\frac{\\pi D^2}{4} \\times L \\times N = \\frac{\\pi \\times 0.112^2}{4} \\times 0.114 \\times 6 = 6.78\\ \\text{L}'}</Eq><P>Motor de 6 cilindros, bore 112 mm × stroke 114 mm → <strong>6,78 litros</strong> de cilindrada.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Por qué los cilindros de los motores aeronáuticos son <em>desmontables individualmente</em>? ¿Qué ventaja de mantenimiento supone respecto a los motores de automoción?</P>, a: <P><strong>R:</strong> Permite cambiar solo el cilindro dañado sin desmontar todo el motor ni sacarlo del avión en todos los casos. Reduce el tiempo de inmovilización del avión y el coste de mantenimiento — un cilindro puede repararse o sustituirse en pocas horas vs. el overhaul completo.</P> },
            { n: 2, q: <P>Los segmentos del pistón tienen una <em>luz de junta</em> (end gap) medida con galga de espesores. El fabricante especifica 0,018"–0,033" (0,46–0,84 mm). ¿Qué ocurre si la luz es excesiva? ¿Y si es insuficiente?</P>, a: <P><strong>Excesiva:</strong> Los gases de combustión pasan al cárter (blow-by) → pérdida de compresión, contaminación del aceite, aumento de consumo. <strong>Insuficiente:</strong> Con la dilatación térmica el segmento puede agarrarse al cilindro (seizure) → rallado del cilindro, daño catastrófico.</P> },
            { n: 3, q: <P>Los cojinetes de la cabeza de biela son semicojinetes de deslizamiento (shell bearings). ¿Por qué se prefieren a los rodamientos de bolas en un cigüeñal aeronáutico de alta potencia?</P>, a: <P><strong>R:</strong> Los semicojinetes de deslizamiento soportan <strong>cargas de choque</strong> mucho mayores que los rodamientos de bolas. Además son más compactos radialmente y se lubrican directamente por el aceite a presión del sistema. Son más baratos y sustituibles sin desmontar el cigüeñal.</P> },
            { n: 4, q: <P>El Lycoming O-360 tiene bore = 5,125" y stroke = 4,375". Calcular la cilindrada total en in³ y en litros (1 in = 25,4 mm).</P>, a: <><Eq>{'V_{cil} = \\pi/4 \\times 5.125^2 \\times 4.375 = 90.1\\ \\text{in}^3'}</Eq><Eq>{'V_{total} = 4 \\times 90.1 = 360.4\\ \\text{in}^3 = 360.4 \\times 16.387\\ \\text{cc} = 5907\\ \\text{cc} \\approx 5.9\\ \\text{L}'}</Eq></> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-03',
      title: '16.3 Distribución y culata',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Culata y válvulas</h3>
            <P>La culata cierra el cilindro y contiene la cámara de combustión, asientos de válvulas y roscado de bujías. Fabricada en aleación de aluminio con insertos de acero.</P>
            <DefList items={[
              { term: 'Válvula de admisión', def: 'Acero inoxidable. Ligeramente mayor que la de escape.' },
              { term: 'Válvula de escape', def: 'Acero austenítico resistente al calor o rellena de sodio para refrigeración. EGT: 750–900°C.' },
              { term: 'Árbol de levas', def: 'Gira a la mitad del cigüeñal (relación 2:1). Sus lóbulos accionan los taqués y varillas.' },
              { term: 'Holgura de válvulas', def: 'Espacio entre el pie de la válvula y el rocker arm en frío. Si insuficiente, la válvula no cierra → pérdida de compresión.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Diagrama de distribución</h3>
            <Eq>{`Avance apertura admisión: 10–25° APMI
Retraso cierre admisión:  40–70° DPME
Avance apertura escape:   40–70° APME
Retraso cierre escape:    10–25° DPMI
Cruce de válvulas: ambas abiertas alrededor del PMI`}</Eq>
            <Note>El diagrama de distribución específico está en el CMM. Ajustar el árbol de levas fuera de especificación puede causar contacto pistón-válvula → daño catastrófico.</Note>
          </section>

          <Solved n="16.3.A" title="Verificación de holgura de válvulas"
            q={<P>El CMM especifica holgura de válvula de escape en frío: 0,016"–0,020" (0,41–0,51 mm). Con galga de espesores se mide 0,008" (0,20 mm). ¿Qué consecuencias tiene y qué acción correctiva se requiere?</P>}
            a={<P><strong>Consecuencia:</strong> La holgura es la <strong>mitad del mínimo</strong>. Con dilatación térmica en operación, la válvula quedará apoyada sobre su asiento sin cerrar completamente → los gases de combustión a ~800°C escapan por la válvula → quema rápida de la válvula de escape → pérdida de compresión → posible fallo catastrófico del cilindro. <strong>Acción:</strong> Ajustar de inmediato a 0,016"–0,020" según el procedimiento del CMM antes de volar. El ajuste se realiza con la válvula completamente cerrada (lóbulo de la leva opuesto al taqué) con el motor frío (menos de 3 horas desde la última operación).</P>}
          />

          <Practice items={[
            { n: 1, q: <P>¿A qué velocidad (RPM) gira el árbol de levas cuando el cigüeñal gira a 2400 RPM? ¿Por qué esta relación 2:1?</P>, a: <P>El árbol de levas gira a <strong>1200 RPM</strong>. La relación 2:1 es necesaria porque en un motor de 4 tiempos cada válvula debe abrirse y cerrarse <em>una vez</em> cada 2 vueltas del cigüeñal (un ciclo completo). Si el árbol girara a la misma velocidad, las válvulas abrirían cada vuelta.</P> },
            { n: 2, q: <P>Las válvulas de escape huecas rellenas de sodio se usan en motores de alta potencia. Explica el mecanismo de refrigeración y por qué son peligrosas si se cortan o dañan mecánicamente.</P>, a: <P>El sodio (punto de fusión 98 °C) se licúa durante la operación y circula dentro de la válvula hueca por la agitación, <strong>transfiriendo calor desde la cabeza (900 °C) a la guía de válvula (200 °C)</strong>. Reduce la temperatura de la cabeza en ~150°C. Si se rompen o cortan: el sodio reacciona violentamente con agua o aire húmedo → <strong>combustión/explosión</strong>. Deben manejarse según procedimientos especiales (AMM, MSDS). No usar herramientas de corte sin protección.</P> },
            { n: 3, q: <P>Si el cruce de válvulas (valve overlap) se elimina de un motor de altas prestaciones, ¿cómo afecta a la potencia y al consumo?</P>, a: <P><strong>R:</strong> Sin overlap: los gases quemados no se evacúan por el efecto de barrido de la admisión → peor llenado del cilindro → <strong>menor potencia</strong>. A bajas RPM el overlap reduce potencia (exceso de dilución de la mezcla), pero a altas RPM el barrido es fundamental para maximizar el llenado volumétrico.</P> },
            { n: 4, q: <P>Durante una inspección de 100 h se encuentra que la holgura de la válvula de admisión del cil. 3 es 0,025" cuando el máximo es 0,020". ¿Qué ocurre en operación y qué reparación se requiere?</P>, a: <P><strong>Holgura excesiva:</strong> La válvula se abre con retraso y se cierra antes → reducción del llenado volumétrico → <strong>pérdida de potencia en ese cilindro</strong> + ruido de válvulas (claqueteo). Ajustar a especificación. Si el ajuste no es posible (guía desgastada, taqué gastado), reemplazar el componente según CMM.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-04',
      title: '16.4 Sistemas de alimentación',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Carburador y dosado</h3>
            <Eq>{`AFR estequiométrico (gasolina) = 15.5:1
λ < 1: mezcla rica   λ = 1: estequiométrica   λ > 1: pobre`}</Eq>
            <Warn>El <strong>hielo en el carburador</strong> se forma incluso a +15°C con alta humedad. Señal: caída de RPM con mariposa fija. Solución inmediata: CARB HEAT ON.</Warn>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Inyección directa</h3>
            <P>Los motores modernos (Lycoming TIO-540, Continental TSIO-550) usan inyección directa en el colector de cada cilindro: sin riesgo de hielo, mejor distribución, mejor arranque en caliente.</P>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Detonación y preignición</h3>
            <DefList items={[
              { term: 'Detonación', def: 'Autoencendido explosivo de la mezcla antes del frente de llama. Causas: mezcla pobre, T elevada, octanaje bajo, exceso de avance. Daña pistones, bielas y rodamientos.' },
              { term: 'Preignición', def: 'La mezcla se enciende antes de la chispa por un punto caliente. Más dañina que la detonación.' },
            ]} />
            <Eq>{`Avgas 100LL: octano motor 100 (limite rc ≈ 10:1)
Usar Avgas 80 en un motor de rc 8.5 → detonación → daño motor`}</Eq>
          </section>

          <Solved n="16.4.A" title="Diagnóstico de hielo en carburador en vuelo"
            q={<P>En vuelo de crucero a 4500 ft con temperatura OAT = +8°C y humedad relativa 85%, las RPM caen de 2350 a 2200 RPM sin cambiar la palanca de gases. ¿Cuál es el diagnóstico probable y el procedimiento correcto?</P>}
            a={<P><strong>Diagnóstico:</strong> Hielo en el carburador (carb icing). Las condiciones son propicias: temperatura entre −5°C y +20°C con alta humedad. La depresión en el Venturi enfría el aire ~20°C localmente, congelando la humedad y bloqueando el paso de mezcla. <strong>Procedimiento:</strong> (1) CARB HEAT → ON (inmediatamente). (2) Esperar: las RPM pueden caer temporalmente más (la mezcla se enriquece al entrar el aire caliente con el agua fundida). (3) En 10–30 segundos las RPM deben recuperarse o incluso superar las originales. (4) Monitorizar CHT. (5) Si no hay recuperación: considerar aterrizaje de emergencia. Nunca usar CARB HEAT parcialmente en vuelo prolongado (puede crear condiciones peores de temperatura óptima para el hielo).</P>}
          />

          <Practice items={[
            { n: 1, q: <P>Un motor con AFR = 12:1 está operando con mezcla rica. ¿Cuánto combustible en kg/h consume si el caudal de aire es 180 kg/h?</P>, a: <><Eq>{'\\dot{m}_{comb} = \\dot{m}_{aire}/AFR = 180/12 = 15\\ \\text{kg/h}'}</Eq><P>Con mezcla estequiométrica (AFR=15,5): consumo sería 11,6 kg/h. La mezcla rica consume un 29 % más de combustible.</P></> },
            { n: 2, q: <P>Explica por qué en despegue siempre se debe usar mezcla FULL RICH aunque esto aumente el consumo.</P>, a: <P><strong>R:</strong> En despegue el motor funciona a <strong>máxima potencia</strong> → máxima temperatura en pistones y válvulas. La mezcla rica proporciona refrigeración adicional al evaporarse el exceso de combustible. Con mezcla pobre en despegue hay riesgo de detonación y sobretemperatura que puede destruir el motor en segundos.</P> },
            { n: 3, q: <P>Un avión con motor de inyección no tiene riesgo de hielo en el carburador, pero sí puede tener "hielo de inductor" (induction icing). ¿Dónde se forma y cómo se previene?</P>, a: <P>El hielo de inductor se forma en el <strong>filtro de aire o colector de admisión</strong> por congelación de la humedad del aire ambiente. No hay efecto Venturi, pero la temperatura puede caer por expansión del aire. Prevención: el sistema AIR INTAKE HEAT (o ALT AIR) desvía el aire desde dentro del capó (más caliente) en condiciones de icing.</P> },
            { n: 4, q: <P>¿Cuál es la diferencia entre detonación y preignición en términos de cuándo ocurre la combustión y qué daño específico causa cada una?</P>, a: <P><strong>Detonación:</strong> ocurre <em>durante</em> la combustión normal — la parte de la mezcla no quemada aún explota espontáneamente antes del frente de llama. Daña pistones por ondas de presión. <strong>Preignición:</strong> ocurre <em>antes</em> de la chispa — un punto caliente enciende la mezcla cuando el pistón todavía sube en compresión. El pistón trabaja contra la combustión → cargas extremas en bielas, cojinetes y pistón. La preignición es generalmente más destructiva y rápida.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-05',
      title: '16.5 Sistema de encendido (magnetos)',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Magneto aeronáutico</h3>
            <P>Los motores aeronáuticos usan <strong>magnetos</strong> — generadores autónomos de alta tensión (15 000–30 000 V) que no dependen de la batería del avión.</P>
            <DefList items={[
              { term: 'Rotor magnético', def: 'Imán permanente que genera la variación de flujo.' },
              { term: 'Bobina primaria', def: 'Al abrirse los platinos, la corriente se interrumpe bruscamente.' },
              { term: 'Bobina secundaria', def: 'Genera la alta tensión para la chispa.' },
              { term: 'Distribuidor', def: 'Dirige la alta tensión a la bujía correcta.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Doble encendido y magneto check</h3>
            <P>Dos magnetos + dos bujías por cilindro: redundancia y combustión más completa.</P>
            <Eq>{`Magneto check a 1800–2000 RPM:
LEFT only:  caída máxima 75 RPM
RIGHT only: caída máxima 75 RPM
Diferencia L-R: máximo 50 RPM`}</Eq>
            <Warn>Con el interruptor de magnetos en OFF en tierra, si el circuito P-lead está roto, el magneto puede generar chispa al mover la hélice manualmente. Tratar siempre la hélice como si el motor pudiera arrancar.</Warn>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Avance al encendido</h3>
            <Eq>{`Avance fijo típico: 20–30° APMI
Impulso acoplador (impulse coupling): retarda la chispa
en el arranque para evitar el retroceso de la hélice.`}</Eq>
          </section>

          <Solved n="16.5.A" title="Diagnóstico de magneto check anómalo"
            q={<P>Durante el magneto check a 1900 RPM se observa: BOTH = 1900, LEFT only = 1775, RIGHT only = 1840. ¿Qué indica y qué acción se requiere antes del vuelo?</P>}
            a={<><P><strong>Análisis:</strong></P><P>• Caída LEFT: 1900 − 1775 = <strong>125 RPM</strong> → excede el límite de 75 RPM → <strong>NO CONFORME</strong></P><P>• Caída RIGHT: 1900 − 1840 = 60 RPM → dentro del límite ✓</P><P>• Diferencia L−R: 1840 − 1775 = 65 RPM → excede el límite de 50 RPM → <strong>NO CONFORME</strong></P><P><strong>Diagnóstico probable:</strong> Problema en el magneto izquierdo o en las bujías izquierdas de uno o más cilindros (fallo de bujía, platinos mal regulados, cable de alta tensión deteriorado). <strong>Acción:</strong> No despachar el avión. Inspeccionar magneto izquierdo y bujías según AMM. Documentar en el libro de mantenimiento (Tech Log).</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Por qué los motores aeronáuticos usan magnetos en lugar de batería + bobina de encendido como los coches? ¿Cuál es la ventaja crítica de seguridad?</P>, a: <P><strong>R:</strong> El magneto es <strong>completamente autónomo</strong> — genera su propia electricidad de alta tensión sin depender de la batería ni del alternador del avión. Si falla el sistema eléctrico del avión, los magnetos continúan funcionando y el motor no se apaga. Esta independencia es crítica para la seguridad del vuelo.</P> },
            { n: 2, q: <P>El magneto check da una caída de solo 10 RPM en LEFT y 12 RPM en RIGHT. ¿Es esto bueno o podría indicar un problema?</P>, a: <P><strong>Precaución:</strong> Una caída de RPM muy pequeña podría indicar que los magnetos no están correctamente aislados uno del otro y que ambos siguen activos aunque se seleccione solo uno (crossfiring). Puede ser un P-lead roto o interno. Verificar con inspector antes de volar. La caída normal esperada es 50–75 RPM.</P> },
            { n: 3, q: <P>El avance al encendido en un motor de pistón se fija mecánicamente en 25° APMI. ¿Por qué no se puede adelantar más para ganar potencia?</P>, a: <P>Si el avance es excesivo, la combustión empieza demasiado pronto y los gases empujan el pistón mientras aún sube en compresión → el pistón trabaja contra la presión en lugar de ser empujado → <strong>golpeteo (knocking), pérdida de potencia y daño</strong>. El avance óptimo es el que produce la máxima presión de combustión justo cuando el pistón comienza a bajar.</P> },
            { n: 4, q: <P>¿Qué hace el "impulse coupling" en el arranque del motor y por qué es necesario?</P>, a: <P>El impulse coupling <strong>retarda la chispa</strong> (~15°) y <strong>aumenta la velocidad de la bobina</strong> en el momento del disparo durante el arranque. Sin él: (1) la baja velocidad de arranque daría chispas débiles, (2) la chispa avanzada haría que los gases empujaran la hélice al revés (kickback) → riesgo de lesión grave. El impulse coupling se desconecta automáticamente cuando el motor alcanza velocidad de autoarranque.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-06',
      title: '16.6 Lubricación y refrigeración',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Sistema de lubricación</h3>
            <Table headers={['Tipo', 'Cárter húmedo', 'Cárter seco (dry sump)']} rows={[
              ['Aceite almacenado en', 'Cárter del propio motor', 'Depósito externo separado'],
              ['Uso aeronáutico', 'Lycoming, Continental (aviación general)', 'Motores de alto rendimiento, acrobacia'],
              ['Ventaja', 'Simple, compacto', 'Funciona en cualquier actitud, mayor capacidad'],
            ]} />
            <Eq>{`Aceites: Mineral SAE 40/50 (rodaje) → Semisintético W100 (normal) → Sintético W100 Plus
Consumo normal: 0.25–0.5 qt/hora
Cambio: cada 50–100 horas (AMM/OEM)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Refrigeración por aire — CHT y EGT</h3>
            <DefList items={[
              { term: 'Deflectores (baffles)', def: 'Canalizan el aire de impacto sobre las aletas. Un deflector roto causa puntos calientes → daño de cilindros.' },
              { term: 'CHT (Cylinder Head Temperature)', def: 'Parámetro crítico. Límite típico: 400–450°F (204–232°C).' },
              { term: 'EGT (Exhaust Gas Temperature)', def: 'Indica el estado de combustión y el dosado por cilindro.' },
            ]} />
            <Note>Los motores refrigerados por aire se calientan rápidamente en tierra. Limitar el tiempo al ralentí y vigilar CHT en todo momento.</Note>
          </section>

          <Solved n="16.6.A" title="Análisis de temperatura por cilindro — diagnóstico EGT"
            q={<P>En vuelo de crucero se obtienen las siguientes lecturas de EGT: Cil.1=1285°F, Cil.2=1302°F, Cil.3=1178°F, Cil.4=1295°F. La variación normal máxima entre cilindros es ±50°F. ¿Qué indica el cilindro 3?</P>}
            a={<><P>EGT media aprox.: (1285+1302+1178+1295)/4 = 1265 °F</P><P>Desviación Cil.3: 1265 − 1178 = <strong>87 °F por debajo</strong> del promedio (excede ±50°F).</P><P><strong>Diagnóstico:</strong> EGT baja en un cilindro indica que ese cilindro <em>produce menos trabajo</em> — posibles causas: válvula que no cierra bien (baja compresión), bujía defectuosa, inyector obstruido, fallo de magneto en esa bujía. Revisar bujías del cil.3 en la siguiente inspección. Hacer prueba de compresión diferencial.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Por qué los motores de acrobacia usan cárter seco (dry sump) en lugar del cárter húmedo convencional?</P>, a: <P>En maniobras de vuelo invertido o alta g, el aceite en un cárter húmedo se acumula en la parte alta del cárter (lejos de la bomba) y esta aspira aire → <strong>fallo de lubricación inmediato</strong>. Con cárter seco, el aceite está en un depósito externo separado y la bomba de extracción asegura la circulación en cualquier actitud.</P> },
            { n: 2, q: <P>El nivel de aceite baja 1 qt en 4 horas de vuelo. ¿Es esto normal para un Lycoming O-360? ¿Cuándo sería motivo de preocupación?</P>, a: <P>Consumo = 1 qt / 4 h = 0,25 qt/h. El consumo normal del O-360 es 0,25–0,5 qt/h → <strong>normal para un motor en buen estado</strong>. Sería motivo de preocupación si supera 1 qt/h → posible fallo de segmentos o sello de válvulas. También vigilar si el aceite sale negro o con partículas metálicas (análisis espectográfico).</P> },
            { n: 3, q: <P>Un deflector (baffle) del cilindro 2 está roto a un 40 %. ¿Puede volar el avión así? ¿Qué monitorización especial se requiere?</P>, a: <P>Técnicamente el avión podría volar si CHT permanece dentro de límites, pero el deflector roto crea un punto caliente que puede provocar preignición o detonación. EASA Part-M requiere que el avión esté aeronavegable en todos sus sistemas. Reparar el deflector antes del vuelo. Nunca volar con deflectores dañados sin consultar el AMM y la documentación aplicable.</P> },
            { n: 4, q: <P>¿Por qué el EGT sube cuando se emplea la palanca de mezcla para empobrecer, llega a un pico y luego baja si se sigue empobreciendo?</P>, a: <P>Al empobrecer: (1) Con mezcla rica, el exceso de combustible absorbe calor (refrigeración) → EGT baja artificialmente. (2) Al acercarse a λ=1, la combustión es más completa → EGT sube al <strong>pico (peak EGT)</strong>. (3) Al seguir empobreciendo (lean of peak), la mezcla ya no quema completamente → menos calor generado → EGT baja. El pico EGT corresponde a la combustión estequiométrica máxima.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-07',
      title: '16.7 Sobrealimentación y turbocompresor',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Pérdida de potencia con la altitud</h3>
            <Eq>{`P(h) ≈ P₀ · (ρ(h)/ρ₀)
A FL080: ρ/ρ₀ ≈ 0.79 → potencia ≈ 79%
A FL120: ρ/ρ₀ ≈ 0.65 → potencia ≈ 65%`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Turbocompresor</h3>
            <DefList items={[
              { term: 'Turbina de escape', def: 'Aprovecha la energía de los gases de escape para accionar el compresor.' },
              { term: 'Compresor centrífugo', def: 'Comprime el aire de admisión. Relación típica: 1,5:1 a 2,5:1.' },
              { term: 'Wastegate', def: 'Válvula que regula la presión de sobrealimentación.' },
              { term: 'Intercooler', def: 'Refrigera el aire comprimido → mayor densidad → más potencia, menos riesgo de detonación.' },
            ]} />
            <Eq>{`Motor turbonormalizado: mantiene potencia de despegue
hasta la altitud crítica (típico FL200–FL250).`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Control de mezcla a altitud — LOP vs ROP</h3>
            <Eq>{`LOP (Lean of Peak EGT): 50°F bajo el pico → menor consumo
ROP (Rich of Peak EGT): 100°F sobre el pico → mayor refrigeración`}</Eq>
            <Warn>En despegue y ascenso hasta 3000 ft: SIEMPRE mezcla FULL RICH. La mezcla rica refrigera pistones y válvulas en las fases de máxima carga térmica.</Warn>
          </section>

          <Solved n="16.7.A" title="Potencia disponible a altitud con motor turbonormalizado"
            q={<P>Un motor turbonormalizado de 300 HP mantiene la potencia de despegue hasta FL220. A FL250 la densidad relativa es ρ/ρ₀ = 0,565. Si ya superó la altitud crítica, ¿qué potencia entrega a FL250?</P>}
            a={<><Eq>{'P_{FL250} = P_0 \\times (\\rho/\\rho_0) = 300 \\times 0.565 = 169.5\\ \\text{HP}'}</Eq><P>A FL250 (500 ft por encima de la altitud crítica), el motor entrega solo <strong>169,5 HP</strong> (56,5 % de la potencia máxima). Para mantener el nivel de crucero a esa altitud el avión necesitará reducir la velocidad o descender.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Un motor normalmente aspirado de 200 HP vuela a FL100 (ρ/ρ₀ = 0,738). ¿Qué potencia máxima puede entregar? ¿Y a FL140 (ρ/ρ₀ = 0,600)?</P>, a: <><Eq>{'P_{FL100} = 200 \\times 0.738 = 147.6\\ \\text{HP} \\qquad P_{FL140} = 200 \\times 0.600 = 120\\ \\text{HP}'}</Eq></> },
            { n: 2, q: <P>¿Por qué el intercooler es especialmente importante en motores sobrealimentados que operan a máxima potencia continua?</P>, a: <P>La compresión del aire lo calienta significativamente (puede llegar a 150–200°C). Aire caliente = menor densidad → se pierde parte del beneficio de la sobrealimentación. Además el aire caliente favorece la detonación. El intercooler <strong>enfría el aire comprimido antes de entrar al motor</strong> → mayor densidad → más potencia efectiva + menor riesgo de detonación.</P> },
            { n: 3, q: <P>Explica qué ocurre si la wastegate de un turbocompresor falla en posición completamente cerrada a nivel del mar.</P>, a: <P>Con la wastegate cerrada, <strong>todos los gases de escape pasan por la turbina</strong> → el compresor produce presión de sobrealimentación muy alta → la presión de admisión excede el límite de diseño → sobrecompresión → detonación severa → daño inmediato del motor. El piloto debe reducir potencia inmediatamente y aterrizar. Los sistemas modernos tienen válvulas de alivio de presión de seguridad.</P> },
            { n: 4, q: <P>Un piloto vuela a FL120 con mezcla en posición "FULL RICH". El técnico le dice que debería empobrecer la mezcla. ¿Por qué? ¿Qué método usa para encontrar la posición correcta?</P>, a: <P>A FL120, la densidad del aire es menor → la relación másica aire/combustible con mezcla FULL RICH da una mezcla <strong>demasiado rica</strong> (λ &lt; 1) → mayor consumo, posible temperatura elevada, pérdida de potencia. Método: con el motor a régimen de crucero, mover lentamente la palanca de mezcla hacia lean. Cuando EGT alcanza el <strong>pico máximo</strong> → ese es el punto estequiométrico. Luego enriquecer 100°F (ROP) o usar LOP según el procedimiento del POH.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm16-08',
      title: '16.8 Prestaciones y mantenimiento del motor de pistón',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Parámetros de operación</h3>
            <Table headers={['Parámetro', 'Definición', 'Instrumentación']} rows={[
              ['MP (Manifold Pressure)', 'Presión en colector de admisión [inHg]', 'Manómetro MAP'],
              ['RPM (tach)', 'Revoluciones del cigüeñal por minuto', 'Tacómetro'],
              ['EGT', 'Temperatura gases de escape [°F o °C]', 'Termopar en tubo de escape'],
              ['CHT', 'Temperatura culata [°F o °C]', 'Termopar/sonda en culata'],
              ['Presión aceite', 'Presión en el sistema de lubricación [psi]', 'Manómetro de aceite'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">TBO y vida del motor</h3>
            <Table headers={['Motor', 'TBO típico', 'Potencia']} rows={[
              ['Lycoming O-360-A4M', '2000 h', '180 HP'],
              ['Lycoming IO-540-K1A5', '2000 h', '300 HP'],
              ['Continental IO-520-B', '1700 h', '285 HP'],
              ['Continental TSIO-550-E', '1600 h', '350 HP (turbo)'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Prueba de compresión diferencial</h3>
            <Eq>{`Presurizar cilindro a 80 psi con pistón en PMI.
Criterio FAA AC 43.13-1B:
≥ 60/80 psi → aceptable
50–60/80 psi → monitorizar
< 50/80 psi → investigar, posible cambio de cilindro`}</Eq>
            <Note>La compresión se mide en cada inspección de 100 horas. Una caída progresiva permite planificar la reparación antes del fallo en vuelo.</Note>
          </section>

          <Solved n="16.8.A" title="Interpretación de prueba de compresión"
            q={<P>En la inspección de 100 h de un Cessna 172 (Lycoming O-320) se obtienen las siguientes lecturas de compresión diferencial: Cil.1=72/80, Cil.2=68/80, Cil.3=45/80, Cil.4=74/80. Analizar y determinar acciones.</P>}
            a={<><P><strong>Evaluación:</strong></P><P>• Cil. 1: 72/80 = 90% → Excelente ✓</P><P>• Cil. 2: 68/80 = 85% → Aceptable ✓</P><P>• Cil. 3: 45/80 = 56% → <strong>Por debajo de 60/80 → ACCIÓN REQUERIDA</strong> ✗</P><P>• Cil. 4: 74/80 = 92.5% → Excelente ✓</P><P><strong>Diagnóstico Cil.3:</strong> Buscar la fuga con el motor en PMI del cil. 3: si se escucha en el carburador → válvula de admisión; si en el tubo de escape → válvula de escape; si en el tapón de aceite → segmentos; si en el cil. adyacente → junta de culata. <strong>Acción:</strong> No despachar. Investigar según AMM. Probable necesidad de cambio de cilindro si los segmentos están desgastados o la válvula de escape quemada.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Qué diferencia existe entre el TBO y un límite obligatorio de aeronavegabilidad? ¿Puede un motor seguir operando pasado su TBO?</P>, a: <P><strong>R:</strong> El TBO es una <strong>recomendación del fabricante</strong> del motor, no un límite obligatorio de aeronavegabilidad (AD). Un motor puede continuar operando pasado el TBO si el operador acepta un programa de inspecciones reforzadas y el estado del motor lo permite. Sin embargo, los seguros pueden exigir el TBO y la autoridad (EASA/FAA) puede imponer AD específicas que sí sean obligatorias.</P> },
            { n: 2, q: <P>La presión de aceite de un Lycoming IO-540 en crucero es normalmente 70 psi. En vuelo cae a 35 psi. El límite mínimo en vuelo es 25 psi. ¿Qué acción toma el piloto y el técnico?</P>, a: <P><strong>Piloto:</strong> Declarar precaución, reducir potencia, buscar campo de aterrizaje cercano y aterrizar cuanto antes. No esperar a que baje al límite mínimo — una pérdida de presión súbita puede indicar fallo inminente. <strong>Técnico:</strong> Inspeccionar fuga de aceite (juntas, tapones, mangueras), nivel, bomba de aceite, filtro (metalurgia), cojinetes. No volar hasta identificar y corregir la causa.</P> },
            { n: 3, q: <P>Durante una prueba de compresión, la lectura del cil. 2 es 55/80 psi y se escucha escape de aire desde el tubo de escape. ¿Cuál es el diagnóstico?</P>, a: <P><strong>Diagnóstico:</strong> La válvula de <strong>escape del cilindro 2 no cierra completamente</strong>. Causas posibles: (1) depósito de carbón en el asiento de la válvula, (2) holgura de válvula incorrecta (excesivamente pequeña), (3) válvula quemada o deformada. Acción: limpiar el asiento de válvula, verificar y ajustar la holgura, inspeccionar la válvula visualmente. Si hay daño en el asiento o la válvula, cambiar el cilindro.</P> },
            { n: 4, q: <P>¿Por qué es importante que el CHT no supere los límites incluso brevemente durante el despegue?</P>, a: <P>Superar brevemente el CHT máximo (p.ej. 450°F → 500°F) puede causar: (1) <strong>expansión excesiva</strong> del aluminio de la culata → pérdida de ajuste de los asientos de válvulas e insertos → daño permanente. (2) <strong>Preignición</strong> por el punto caliente creado. (3) Microfisuras en la culata que no son visibles externamente. El daño por sobretemperatura puede ser latente y manifestarse como fallo en vuelo posterior.</P> },
          ]} />
        </div>
      ),
    },
  ],
};

export default m16;
