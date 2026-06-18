import { CourseModule, Eq, P, Note, Warn, DefList, Table, Solved, Practice } from '../CourseView';

const m17: CourseModule = {
  id: 'm17',
  code: 'M17',
  title: 'Hélices',
  subtitle: 'Teoría, sistemas y mantenimiento',
  icon: '🌀',
  license: 'B1',
  description: 'Geometría, aerodinámica, sistemas de paso variable y mantenimiento de hélices según EASA Part-66 B1.',
  chapters: [
    {
      id: 'm17-01',
      title: '17.1 Teoría y geometría de la hélice',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">La hélice como ala giratoria</h3>
            <P>Una hélice es esencialmente una <strong>ala que gira</strong>. Cada sección genera tracción y resistencia en función de su ángulo de ataque respecto al flujo relativo.</P>
            <Eq>{`V_rel = √(V₀² + (ω·r)²)     φ = arctan(V₀ / ω·r)
α = β − φ      (β: paso geométrico local, φ: ángulo de avance)

Tracción: T = η_p · P / V₀     Eficiencia: η_p = T·V₀/P (max 80–88%)`}</Eq>
            <Note>La hélice genera mayor tracción estática (V₀=0, despegue) pero mayor eficiencia en crucero. Las puntas superan el Mach crítico por encima de ~350 kt TAS.</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Parámetros geométricos</h3>
            <DefList items={[
              { term: 'Paso geométrico (p)', def: 'Distancia teórica de avance por revolución. p = 2πr·tan(β).' },
              { term: 'Deslizamiento (slip)', def: 'Diferencia relativa entre paso geométrico y efectivo. Típico: 15–25%.' },
              { term: 'Torsión de la pala', def: 'β varía a lo largo de la pala (mayor en raíz) para igualar el ángulo de ataque en todas las secciones.' },
            ]} />
          </section>

          <Solved n="17.1.A" title="Velocidad relativa y ángulo de ataque en una sección de pala"
            q={<P>Una hélice gira a <strong>ω = 251 rad/s (2400 RPM)</strong>. El avión vuela a <strong>V₀ = 60 m/s</strong>. Una sección está a r = 0,5 m del eje y tiene paso geométrico β = 22°. Calcular V_rel, φ y el ángulo de ataque α.</P>}
            a={<><Eq>{'v_t = \\omega r = 251 \\times 0.5 = 125.5\\ \\text{m/s}'}</Eq><Eq>{'V_{rel} = \\sqrt{60^2 + 125.5^2} = \\sqrt{3600 + 15750} = \\sqrt{19350} = 139.1\\ \\text{m/s}'}</Eq><Eq>{'\\varphi = \\arctan(60/125.5) = \\arctan(0.478) = 25.6°'}</Eq><Eq>{'\\alpha = \\beta - \\varphi = 22° - 25.6° = -3.6°'}</Eq><P>¡El ángulo de ataque es <strong>negativo (−3,6°)</strong>! Esta sección está sobrevolando — produce resistencia y escasa tracción. En crucero habría que aumentar el paso β o reducir las RPM. Esto ilustra por qué las hélices de paso fijo están optimizadas solo para una condición de vuelo.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>Una hélice tiene 2400 RPM y el avión vuela a 50 m/s. A r = 0,6 m, β = 28°. Calcular v_t, φ y α.</P>, a: <><Eq>{'v_t = 251.3 \\times 0.6 = 150.8\\ \\text{m/s} \\qquad \\varphi = \\arctan(50/150.8) = 18.4° \\qquad \\alpha = 28 - 18.4 = 9.6°'}</Eq><P>Ángulo de ataque positivo → la sección genera tracción. R: α = <strong>9,6°</strong></P></> },
            { n: 2, q: <P>Una hélice tiene paso geométrico p = 1,8 m. El avión vuela 1,5 m por revolución (paso efectivo). Calcular el deslizamiento en %.</P>, a: <><Eq>{'slip = (1.8 - 1.5)/1.8 \\times 100 = 16.7\\%'}</Eq></> },
            { n: 3, q: <P>¿Por qué la eficiencia propulsiva (η_p = T·V₀/P) es cero en condición estática (V₀ = 0) aunque la tracción sea máxima?</P>, a: <P><strong>R:</strong> La potencia propulsiva útil es P_útil = T·V₀. Si V₀ = 0 (avión parado), aunque la tracción T sea máxima, P_útil = T × 0 = 0. Toda la potencia del motor se disipa en acelerar el flujo de aire hacia atrás (sin mover el avión hacia adelante). La eficiencia η_p = P_útil/P_motor = 0. En cuanto el avión comienza a moverse, η_p sube rápidamente.</P> },
            { n: 4, q: <P>¿Por qué las hélices convencionales no son competitivas a velocidades superiores a ~350-400 kt TAS?</P>, a: <P>A altas velocidades de avance, la <strong>punta de la pala</strong> (que suma velocidad tangencial + velocidad de avance) supera el Mach crítico. Cuando M_punta &gt; M_crítico, aparecen ondas de choque en la punta → aumento drástico de resistencia → caída de eficiencia y generación de ruido intenso. Las hélices prop-fan (de palas curvadas en flecha) empujan este límite, pero no superan a los motores a reacción puros en velocidad.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-02',
      title: '17.2 Tipos de hélices',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Hélice de paso fijo vs. paso variable</h3>
            <DefList items={[
              { term: 'Paso de crucero', def: 'Ángulo grande. Eficiente en crucero, pobre en despegue. Las RPM son bajas a plena potencia en tierra.' },
              { term: 'Paso de despegue', def: 'Ángulo pequeño. Eficiente en despegue/ascenso. El motor sobrerrevoluciona en crucero.' },
              { term: 'Paso constante (CSP)', def: 'El gobernador mantiene RPM fijas variando el paso automáticamente. Estándar en aviación de alto rendimiento.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Materiales de hélice</h3>
            <Table headers={['Material', 'Características', 'Uso típico']} rows={[
              ['Madera laminada', 'Ligera, amortigua vibraciones. Sensible a humedad y FOD.', 'Ultraligeros, réplicas históricas'],
              ['Aluminio forjado', 'Resistente, reparable. La más extendida en aviación general.', 'C172, PA-28 (McCauley, Hartzell)'],
              ['Composite CFRP', 'Máxima eficiencia, menor masa, resistente a impactos.', 'Turbohélices modernos (ATR, Q400), acrobáticos'],
            ]} />
            <Warn>Cualquier muesca, grieta o corrosión en las palas debe ser evaluada por técnico certificado. Una hélice dañada que excede los límites del CMM debe ser sustituida, no reparada en campo.</Warn>
          </section>

          <Solved n="17.2.A" title="Selección del tipo de hélice para una misión"
            q={<P>Un nuevo avión de entrenamiento avanzado tiene motor de pistón de 300 HP, velocidad de crucero de 180 kt y campo de operación en pistas cortas de montaña (1500 m). ¿Qué tipo de hélice es más adecuada y por qué?</P>}
            a={<P><strong>Hélice de paso constante (CSP)</strong> de aluminio o composite. Justificación: (1) Con 300 HP, la hélice de paso fijo solo sería eficiente en una condición — se necesita rendimiento tanto en despegue (pistas cortas = máxima tracción) como en crucero (180 kt = paso grueso). (2) El gobernador de velocidad constante permite usar el paso óptimo para cada fase. (3) En pistas de montaña, el despegue con toda la potencia disponible es crítico para la seguridad. Una hélice de paso fino de despegue limitaría la velocidad de crucero inaceptablemente. (4) Aluminio es suficiente para ese rango de potencia y velocidad — CFRP se justifica a partir de ~500 HP o para reducir peso en diseños de competición.</P>}
          />

          <Practice items={[
            { n: 1, q: <P>Un Cessna 172 con hélice de paso fijo de crucero (paso grueso) hace un despegue. ¿Alcanza las RPM de despegue máximo antes de levantar el vuelo? ¿Por qué?</P>, a: <P><strong>R:</strong> No alcanzará las RPM nominales. Con paso grueso, la hélice presenta alta resistencia al girar lentamente → el motor no puede alcanzar sus RPM de plena potencia. La potencia se subutiliza. Por eso los C172 de entrenamiento básico (150–160 HP) usan hélice de paso fino (climb prop) o de compromiso: menos eficiente en crucero, pero adecuada para todos los regímenes de un avión de escuela.</P> },
            { n: 2, q: <P>¿Por qué las palas de composite CFRP son preferidas en turbohélices como el ATR 72 frente al aluminio?</P>, a: <P>(1) <strong>Menor masa</strong>: a igualdad de resistencia, el CFRP pesa ~30–40% menos → menor momento de inercia de la hélice → respuesta más rápida del gobernador. (2) <strong>Mayor eficiencia aerodinámica</strong>: perfil más delgado posible. (3) <strong>Tolerancia al daño por impacto</strong>: el CFRP absorbe impactos sin delaminarse tanto como el aluminio con la misma fuerza. (4) Mayor vida a fatiga.</P> },
            { n: 3, q: <P>¿Qué ventajas tiene una hélice de 3 palas frente a una de 2 palas de igual potencia total?</P>, a: <P>Con 3 palas cada pala puede ser más corta (menor diámetro) → menor distancia al suelo. También: (1) menor nivel de ruido (menor carga por pala), (2) menor vibración (más impulsos de combustión equilibrados), (3) mejor respuesta en reversa (más superficie de pala activa). Desventaja: mayor peso y coste.</P> },
            { n: 4, q: <P>Una hélice de madera recibe un impacto de gravilla durante el rodaje que deja una muesca de 2 mm de profundidad en el borde de ataque de una pala. El límite del CMM es 1,6 mm. ¿Puede seguir operando el avión?</P>, a: <P><strong>No</strong>. La muesca excede el límite del CMM → la hélice debe retirase de servicio. El avión no puede despachar hasta que la hélice sea evaluada por un taller Part-145 certificado para hélices. La muesca puede crear una concentración de tensiones que, bajo la fatiga vibratoria, puede propagar una grieta y causar la fractura de la pala en vuelo.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-03',
      title: '17.3 Sistema de paso variable — Gobernador',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Gobernador de velocidad constante (CSU)</h3>
            <P>El gobernador mantiene las RPM ajustadas variando el paso de las palas mediante aceite a presión.</P>
            <Eq>{`ON SPEED:    RPM = ajustadas → paso estable
OVERSPEED:  RPM > ajustadas → paso aumenta (coarsen) → RPM bajan
UNDERSPEED: RPM < ajustadas → paso disminuye (fine) → RPM suben`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Control en cabina</h3>
            <DefList items={[
              { term: 'Palanca azul (propeller lever)', def: 'Controla las RPM ajustadas. Adelante = más RPM.' },
              { term: 'Palanca negra (throttle)', def: 'Controla la potencia (MAP o N1).' },
              { term: 'Palanca roja (mixture)', def: 'Control de mezcla (motores de pistón sin FADEC).' },
            ]} />
            <Note>Secuencia correcta: al aumentar potencia → primero RPM (palanca azul), luego throttle. Al reducir → primero throttle, luego RPM. Esto evita sobrevelocidad del motor.</Note>
          </section>

          <Solved n="17.3.A" title="Comportamiento del gobernador en un descenso"
            q={<P>Un avión turbohélice desciende a 2300 RPM ajustadas. En el descenso, la aeronave acelera por la gravedad. Describe paso a paso qué hace el gobernador para mantener 2300 RPM.</P>}
            a={<><P><strong>1)</strong> Al acelerar el avión, el aire entra con mayor velocidad → la hélice tiende a girar más rápido → <strong>OVERSPEED</strong>.</P><P><strong>2)</strong> Las pesas centrífugas del gobernador se abren porque giran más rápido que la referencia.</P><P><strong>3)</strong> La válvula del gobernador envía aceite a presión al cilindro de paso → las palas aumentan su ángulo (coarsening).</P><P><strong>4)</strong> Con mayor paso, la hélice presenta mayor resistencia aerodinámica → las RPM bajan.</P><P><strong>5)</strong> El proceso se repite hasta que RPM = 2300 (ON SPEED) → el gobernador estabiliza la posición de las palas.</P><P>Resultado: <strong>las RPM se mantienen constantes a 2300 sin acción del piloto</strong>.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>El piloto aumenta el throttle sin mover la palanca azul. Describe qué hace el gobernador y cuál es el efecto en la velocidad del avión.</P>, a: <P>Al subir throttle → el motor produce más par → tiende a acelerar la hélice → OVERSPEED → el gobernador aumenta el paso (coarsens) → las palas toman más carga → las RPM vuelven a la consigna. <strong>Resultado:</strong> Las RPM permanecen constantes pero la hélice empuja más aire (mayor carga por pala) → mayor tracción → el avión acelera o asciende más rápido.</P> },
            { n: 2, q: <P>¿Qué ocurre si el sistema hidráulico del gobernador pierde presión en una hélice de simple efecto (contraweight propeller)?</P>, a: <P>En una hélice de contraweight: el aceite a presión lleva las palas a <strong>paso fino</strong>; los contrapesos y la fuerza centrífuga llevan las palas a <strong>paso grueso</strong>. Si falla la presión → las palas van a paso grueso máximo (posición de baja carga) → el motor se desembala (sobrerrevoluciona) porque la carga disminuye → riesgo de overspeed del motor. Los sistemas tienen válvulas de protección overspeed.</P> },
            { n: 3, q: <P>¿Por qué es importante mover primero la palanca de RPM (azul) y después el throttle al aumentar potencia en despegue?</P>, a: <P>Si se aumenta el throttle antes de subir las RPM: el motor produce más potencia pero la hélice tiene paso grueso (paso de crucero) → el motor no puede disipar esa potencia en las RPM actuales → <strong>sobrevelocidad momentánea del motor</strong> antes de que el gobernador responda, con riesgo de daño. Al poner primero las RPM en máximo, el gobernador ya tiene la consigna y responde adecuadamente cuando llega la potencia.</P> },
            { n: 4, q: <P>Un motor de pistón con CSP marcado en 2500 RPM tiene el gobernador ajustado a 2300 RPM. El techo del avión es 12 500 ft. A 10 000 ft el motor ya no puede mantener MAP nominal. ¿Qué hace el gobernador a partir de ese punto?</P>, a: <P>Por encima del techo de potencia, el motor no puede proporcionar suficiente par para mantener 2300 RPM → el gobernador detecta UNDERSPEED → mueve las palas hacia paso fino (más fino que puede) → pero ya están en el tope fine → el gobernador llega a su límite: las RPM caen por debajo de los 2300 ajustados. A partir de ahí el sistema actúa como si fuera paso fijo: las RPM caen con la altitud.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-04',
      title: '17.4 Posiciones especiales de paso y bandera',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Posición de bandera (feathering)</h3>
            <P>Con la hélice en <strong>bandera</strong> (palas ≈ 90°, paralelas al flujo), la resistencia aerodinámica del motor parado es mínima:</P>
            <Eq>{`D_windmill / D_feather ≈ 15–25
→ La bandera reduce 15–25× la resistencia del motor parado`}</Eq>
            <Table headers={['Estado', 'Resistencia', 'Actuación recomendada']} rows={[
              ['Motor parado, hélice windmilling', 'Muy alta (como paracaídas)', 'Embanderado inmediato en OEI'],
              ['Motor parado, hélice en bandera', 'Mínima. Permite mantener altitud en ciertos casos.', 'Estándar OEI performance del AFM'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Paso invertido (reverse pitch)</h3>
            <DefList items={[
              { term: 'Frenado en tierra', def: 'Reduce la distancia de aterrizaje 30–40%. Estándar en turbohélices (ATR, Q400, C130).' },
              { term: 'Protección beta', def: 'Sistema WOW (Weight On Wheels) impide armar reversa en vuelo.' },
            ]} />
            <Warn>La activación de reversa en vuelo generaría un cabeceo nariz-arriba violento posiblemente incontrolable. Protecciones críticas — ha habido accidentes mortales por activación inadvertida (CASA 212 Benin, 2003).</Warn>
          </section>

          <Solved n="17.4.A" title="Impacto de embanderado en performance OEI"
            q={<P>Un bimotor con masa de 8000 kg y drag total en OEI con hélice windmilling de D = 6500 N. Con hélice embanderada, el drag se reduce a D = 3800 N. El motor operativo da T = 5200 N. Calcular la aceleración/deceleración en ambos casos (considerar vuelo horizontal).</P>}
            a={<><P><strong>Con windmilling:</strong></P><Eq>{'F_{neta} = T - D = 5200 - 6500 = -1300\\ \\text{N} \\qquad a = F/m = -1300/8000 = -0.163\\ \\text{m/s}^2'}</Eq><P>El avión <strong>decelera</strong> con windmilling — no puede mantener vuelo nivelado.</P><P><strong>Con bandera:</strong></P><Eq>{'F_{neta} = 5200 - 3800 = +1400\\ \\text{N} \\qquad a = +1400/8000 = +0.175\\ \\text{m/s}^2'}</Eq><P>El avión <strong>acelera</strong> con hélice embanderada → puede mantener altitud e incluso ascender ligeramente. El embanderado puede ser la diferencia entre un accidente y un aterrizaje seguro.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Cuándo NO se debe embanderan una hélice tras un fallo de motor?</P>, a: <P>No embanderan si: (1) el fallo es de <strong>pérdida de potencia temporal</strong> (obstrucción de combustible, carb heat necesaria, configuración incorrecta) y el motor puede recuperarse sin daño. (2) Si quedan menos de 500 ft sobre el suelo — la pérdida de tracción del intento de reencendido puede ser más peligrosa que continuar con el motor parado. Seguir siempre el procedimiento del AFM del avión específico.</P> },
            { n: 2, q: <P>¿Por qué el sistema de protección beta (WOW) es una medida de seguridad activa y no pasiva? ¿Qué ocurre si falla?</P>, a: <P>Es activa porque requiere una señal positiva del WOW (interruptor de tren tocado) para permitir el rango beta. Si falla en posición "tierra activada" incorrectamente: podría permitir la selección de reversa en vuelo en teoría — aunque hay múltiples candados. Por eso los sistemas tienen redundancia: WOW + latch mecánico en la palanca. Si falla el WOW en vuelo, el diseño seguro requiere que la protección permanezca activa (fail-safe = reversa inhibida).</P> },
            { n: 3, q: <P>Un ATR 72 aterriza con viento en cola de 5 kt. ¿Cuánto más larga será la carrera de aterrizaje aproximadamente si no usa reversa, respecto a condiciones estándar sin viento?</P>, a: <P>La distancia de aterrizaje es proporcional al cuadrado de la velocidad. Con viento en cola de 5 kt, la velocidad de toca es ~5 kt mayor. Si Vtoca estándar = 110 kt: nueva Vtoca = 115 kt. Ratio = (115/110)² = 1,094 → la carrera sería un <strong>9,4% más larga</strong>. Para una carrera base de 900 m → aproximadamente 985 m. La reversa típica reduce esto en 30–40 %, pasando a ~590–690 m.</P> },
            { n: 4, q: <P>¿Qué es el "drag of feathered propeller" y cómo se tiene en cuenta en el análisis de performance OEI del AFM?</P>, a: <P>Es la resistencia aerodinámica de una hélice embanderada (no cero, sino mínima). El AFM incluye en su análisis OEI (One Engine Inoperative) datos de performance calculados con D_feathered, que incluye la resistencia del spinner, cubo y palas en posición bandera (≈ 3–5% de la resistencia total en vuelo). El piloto no debe asumir que la hélice embanderada no tiene drag — es menor pero no despreciable, especialmente en modelos de hélice de gran diámetro.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-05',
      title: '17.5 Protección anticongelante y sincronización',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Sistemas de protección contra hielo en hélice</h3>
            <Table headers={['Sistema', 'Principio', 'Aplicación']} rows={[
              ['TKS (fluido)', 'Etilenglicol por almohadillas porosas en borde de ataque', 'King Air, Cessna 340'],
              ['Electrotérmico', 'Resistencias en borde de ataque. Ciclos por pala.', 'ATR 72, Q400, PC-12'],
              ['Boots neumáticos', 'Botas inflables que rompen hielo acumulado', 'Poco usado en hélices modernas'],
            ]} />
            <P>Los sistemas electrotérmicos calientan cada pala por turnos para no sobrecargar el sistema eléctrico. El controlador conmuta entre palas cada 30–90 segundos.</P>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Sincronización y synchrophasing</h3>
            <Eq>{`Beat frequency = |RPM₁ − RPM₂| / 60     [Hz]
RPM₁=2400, RPM₂=2415 → f_beat = 15/60 = 0.25 Hz (audible)`}</Eq>
            <Note>La sincronización se activa en crucero. El synchrophasing fija también la posición angular relativa de las palas para minimizar el ruido en cabina.</Note>
          </section>

          <Solved n="17.5.A" title="Carga eléctrica del sistema de antihielo electrotérmico"
            q={<P>Un turbohélice bimotor tiene 4 palas por hélice (2 hélices = 8 palas). Cada pala consume 500 W cuando activa. El sistema es cíclico: solo 2 palas activas simultáneamente. ¿Cuánta potencia eléctrica total requiere el sistema de antihielo?</P>}
            a={<><Eq>{'P_{total} = 2 \\text{ palas activas} \\times 500\\ \\text{W/pala} = 1000\\ \\text{W} = 1\\ \\text{kW}'}</Eq><P>El sistema consume <strong>1 kW</strong> continuamente, pero calienta todas las palas por turnos (ciclo completo = 8 × τ, donde τ es el tiempo de cada pala activa). En un avión con alternadores de 20 kW, este 5% del presupuesto eléctrico es manejable. Sin la operación cíclica, las 8 palas simultáneas tomarían 4 kW.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Por qué el sistema antihielo electrotérmico trabaja de forma cíclica y no mantiene todas las palas calientes simultáneamente?</P>, a: <P><strong>R:</strong> Calentar todas las palas simultáneamente requeriría una potencia eléctrica muy alta → generadores mucho más pesados y cables de mayor sección. El ciclo permite usar generadores estándar. Además, la operación cíclica no reduce la efectividad significativamente: el hielo que se forma entre ciclos en una pala es delgado y se desprende fácilmente cuando esa pala recibe calor.</P> },
            { n: 2, q: <P>Dos motores de un bimotor giran a 2387 y 2401 RPM. Calcular el batido (beat frequency) que escuchan los pasajeros.</P>, a: <><Eq>{'f_{beat} = |2401 - 2387|/60 = 14/60 = 0.233\\ \\text{Hz}'}</Eq><P>Un ciclo cada 4,3 segundos — claramente audible como un sonido pulsante molesto. La sincronización lo llevaría a cero.</P></> },
            { n: 3, q: <P>¿Cuándo se activa el sistema antihielo de la hélice y cómo detecta el piloto si está funcionando correctamente?</P>, a: <P>Se activa al entrar en condiciones IMC o cuando OAT &lt; +5°C con humedad visible. Verificación: (1) El ammeter de bus de CC/CA muestra el aumento de carga eléctrica. (2) En aviones con temporizador visible (ciclómetro), se comprueba la cadencia de ciclo. (3) Táctilmente: calor perceptible en la raíz de la pala (algunas pistas lo permiten). (4) Ausencia de vibración inusual (la vibración por desequilibrio de hielo es señal de fallo del sistema).</P> },
            { n: 4, q: <P>El sistema de synchrophasing del Q400 ajusta la posición angular de las palas del motor 2 respecto al motor 1. Explica el mecanismo básico de control.</P>, a: <P>El sistema usa un sensor de referencia de posición angular (generalmente una marca reflectiva en el cubo de cada hélice y un sensor óptico/magnético). El controlador mide en tiempo real la fase relativa de las dos hélices. Si hay desfase respecto al valor óptimo, el controlador ajusta ligeramente las RPM de un motor (por milésimas) hasta que el synchrophasefase alcanzo el valor configurado. El resultado: las palas de ambas hélices están siempre en la misma posición angular relativa → interferencia constructiva mínima en la cabina.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-06',
      title: '17.6 Inspección y mantenimiento de hélices',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Inspecciones periódicas</h3>
            <Table headers={['Inspección', 'Frecuencia', 'Alcance']} rows={[
              ['Preflight', 'Antes de cada vuelo', 'Visual: daños, grietas, deformaciones, FOD, seguridad del cubo'],
              ['100 h / anual', '100 h o 12 meses', 'Detallada: espesores, torque de bridas, juego de paso, lubricación cubo'],
              ['TBO de hélice', 'CMM (1500–2400 h típico)', 'Desmontaje, NDT (DPI, UT), cambio de O-rings, equilibrado dinámico'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Daños admisibles y equilibrado</h3>
            <DefList items={[
              { term: 'Muesca (nick)', def: 'Límite típico: 1/16 in profundidad, 1/4 in longitud. Reparable por lima y pulido si no supera límite.' },
              { term: 'Doblado (bend)', def: 'Cualquier doblado requiere evaluación del fabricante o sustitución. Nunca enderezar en campo.' },
              { term: 'Corrosión intergranular', def: 'Sustitución inmediata. No reparable.' },
            ]} />
            <Eq>{`Límite vibración tras equilibrado (field balancing):
AVCO Lycoming SSP-1776: < 0.2 IPS en crucero
Resultado típico bien ejecutado: < 0.05–0.10 IPS`}</Eq>
            <Warn>Nunca intentar enderezar una pala doblada en campo. El aluminio trabajado en frío queda fragilizado → puede fracturarse en vuelo → desequilibrio catastrófico → fallo del motor.</Warn>
          </section>

          <Solved n="17.6.A" title="Evaluación de daño en pala y decisión de mantenimiento"
            q={<P>Durante la preflight de un Cessna 182 se detecta en la pala derecha: una muesca de 1,5 mm de profundidad y 5 mm de longitud en el borde de ataque (límite CMM: 1,6 mm prof, 6,4 mm long); y en la punta de la misma pala, una mancha de corrosión superficial de 20 mm² sin pérdida de metal visible. ¿Puede volar el avión?</P>}
            a={<><P><strong>Muesca:</strong> 1,5 mm &lt; 1,6 mm (límite) ✓ y 5 mm &lt; 6,4 mm ✓ → dentro de los límites ADL. El técnico puede limar y pulir suavemente eliminando la arista aguda. Documentar en el libro de la hélice.</P><P><strong>Corrosión:</strong> Corrosión superficial &lt; 0,25 mm de profundidad en la punta es generalmente ADL. Limpiar con esponja Scotch-Brite y lubricar con Alodine o pintura de acabado según el CMM. Si la profundidad de corrosión no es medible visualmente → necesita evaluación en taller.</P><P><strong>Decisión:</strong> El avión puede volar si ambas condiciones están dentro de ADL y el técnico certifica el trabajo (EASA Form 1 / entrada en Tech Log). Si hay duda sobre la profundidad de la corrosión → retirar de servicio hasta evaluación en taller.</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Qué es el equilibrado dinámico en campo (field balancing) de una hélice y en qué difiere del equilibrado estático?</P>, a: <P><strong>Estático:</strong> La hélice se equilibra detenida — se mide el desequilibrio de masa en el plano de la hélice. Se hace en taller con balanceadora. <strong>Dinámico en campo:</strong> La hélice gira a velocidad de crucero en el avión — se mide la vibración con acelerómetro en el motor. Se agregan masas correctoras (weights) en posiciones específicas del cubo hasta minimizar la vibración. Es más completo porque captura desequilibrio aerodinámico y de masa simultáneamente.</P> },
            { n: 2, q: <P>Una hélice McCauley tiene 2100 horas y el TBO es 2000 h. ¿Puede continuar operando? ¿Qué condiciones lo permiten?</P>, a: <P>El TBO es una <strong>recomendación del fabricante</strong>, no un límite obligatorio de airworthiness (salvo que una AD lo haga mandatorio). La hélice puede continuar si: (1) No hay AD aplicable que limite la vida a 2000 h. (2) El operador aprueba una extensión con un programa de inspección reforzada. (3) La inspección de 100 h/anual más reciente no revela defectos. Sin embargo, la mayoría de los operadores siguen el TBO por cuestiones de seguro y gestión de riesgos.</P> },
            { n: 3, q: <P>El CMM de una hélice Hartzell requiere cambiar los O-rings del cubo durante el overhaul de TBO. ¿Qué pasaría si se omite este paso?</P>, a: <P>Los O-rings sellan el aceite hidráulico del mecanismo de paso variable dentro del cubo. Los O-rings envejecen, se endurecen y agrietan con los ciclos térmicos. Si se omite el cambio: con 2000+ horas adicionales, el O-ring puede fallar en vuelo → <strong>fuga de aceite del cubo</strong> → pérdida de presión hidráulica → la hélice va a paso grueso o bandera (según el diseño) → pérdida parcial o total de control de paso → situación de emergencia. Los O-rings son componentes Life-Limited con vida útil hasta el TBO.</P> },
            { n: 4, q: <P>¿Por qué el logbook (libro de vida) de la hélice es tan importante que su pérdida obliga a una inspección completa?</P>, a: <P>El logbook documenta las horas totales acumuladas desde nueva (o desde el último overhaul), todos los shop visits, reparaciones, cambios de componentes y service bulletins cumplidos. Sin este historial: (1) No se puede verificar si la hélice ha superado su TBO. (2) No se puede confirmar si las ADs mandatorias se han cumplido. (3) No se conoce la historia de daños o reparaciones previas. La EASA/FAA considera la hélice sin logbook como de <strong>historial desconocido</strong> → necesita inspección NDT completa por taller Part-145 para determinar su estado real.</P> },
          ]} />
        </div>
      ),
    },
    {
      id: 'm17-07',
      title: '17.7 Regulaciones y documentación',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Marco normativo de hélices</h3>
            <Table headers={['Normativa', 'Contenido']} rows={[
              ['CS-P (EASA)', 'Certification Specifications for Propellers — requisitos de certificación de diseño.'],
              ['EASA Part-66 M17', 'Requisitos de conocimiento para técnicos LMA (licencia B1).'],
              ['EASA Part-145', 'Organizaciones de mantenimiento. Overhaul de hélices requiere Part-145 con categoría de hélice.'],
              ['FAR Part 35 (FAA)', 'Airworthiness Standards for Propellers — equivalente americano del CS-P.'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Documentación esencial</h3>
            <DefList items={[
              { term: 'CMM (Component Maintenance Manual)', def: 'Manual del fabricante de la hélice. Referencia legal para overhaul: desmontaje, inspección, reparación, montaje y test.' },
              { term: 'AMM Cap. 61', def: 'Instalación y mantenimiento de la hélice en el avión específico. Incluye procedimientos de montaje y torques.' },
              { term: 'Service Bulletins (SB)', def: 'Boletines del fabricante. Opcionales (recomendados) o mandatorios si van acompañados de una AD.' },
              { term: 'Logbook de hélice', def: 'Historial completo: horas, ciclos, reparaciones. Debe acompañar siempre a la hélice.' },
            ]} />
            <Note>Todo trabajo de mantenimiento de hélice en Europa debe ir acompañado de un <strong>EASA Form 1</strong> emitido por la organización Part-145 o un Certifying Staff con licencia B1 habilitada. Sin Form 1 válido, la hélice no puede instalarse en una aeronave certificada.</Note>
          </section>

          <Solved n="17.7.A" title="Cadena documental tras un daño por pájaro (bird strike)"
            q={<P>Un turbohélice ATR 72 sufre un bird strike en la hélice del motor izquierdo durante el despegue y aterriza de emergencia. El impacto dejó dos muescas significativas en una pala y una deformación en el spinner. Describe la cadena documental completa que debe generarse.</P>}
            a={<><P><strong>1. Reporte de Seguridad:</strong> Rellenar formulario de notificación de bird strike (AESA en España, EASA ECCAIRS a nivel europeo). Obligatorio para todos los bird strikes.</P><P><strong>2. Discrepancia en Tech Log:</strong> El piloto anota en el libro técnico (Tech Log) del avión la descripción del evento, referenciando el número de vuelo y condiciones. El avión queda fuera de servicio (NOR — Not for Operational Release).</P><P><strong>3. Inspección preliminar en AOG:</strong> Técnico LMA B1 inspecciona la hélice, documenta las muescas (fotos, mediciones). Determina que excede los ADL del CMM → hélice no reparable en campo.</P><P><strong>4. Retirada de servicio:</strong> Se emite una tarjeta de baja (unserviceable tag) en la hélice. La hélice se desmonta según AMM Cap. 61 y se embala para envío al taller Part-145.</P><P><strong>5. Taller Part-145:</strong> Recibe la hélice con la documentación (logbook, tech log, fotos). Realiza inspección NDT completa (DPI, UT). Documenta hallazgos en shop report. Si es reparable, realiza las reparaciones según CMM. Emite <strong>EASA Form 1</strong> al terminar.</P><P><strong>6. Reinstalación:</strong> Técnico certifica la instalación en AMM Cap. 61. Anotación en el logbook de la hélice y en el libro de la aeronave. Emisión de CRS (Certificate of Release to Service).</P></>}
          />

          <Practice items={[
            { n: 1, q: <P>¿Qué diferencia existe entre un Service Bulletin (SB) y una Airworthiness Directive (AD)? ¿Cuándo se vuelve mandatorio un SB?</P>, a: <P><strong>SB:</strong> Emitido por el fabricante. Es una recomendación de mejora o modificación — <em>opcional</em> en principio. <strong>AD:</strong> Emitida por EASA o FAA. Es obligatoria — tiene fuerza de ley. Un SB se convierte en mandatorio cuando la autoridad emite una AD que lo referencia y exige su cumplimiento en un plazo determinado. Un SB puede abordar una mejora conveniente (opcional) o una condición insegura (que dará lugar a una AD).</P> },
            { n: 2, q: <P>El AMM del ATR 72 especifica un torque de 450 N·m para las bridas del cubo de hélice. El técnico aplica 380 N·m "porque le pareció suficiente". ¿Qué riesgo existe y qué responsabilidad normativa tiene?</P>, a: <P><strong>Riesgo técnico:</strong> Un torque insuficiente puede provocar el aflojamiento de los tornillos por la vibración en vuelo → hélice fuera de posición o desprendimiento del cubo → catastrófico. <strong>Responsabilidad normativa:</strong> El técnico ha violado el AMM (documento de cumplimiento obligatorio). Si se produce un accidente relacionado, el técnico es responsable penalmente y su licencia Part-66 puede ser suspendida o revocada. El trabajo debe documentarse correctamente o, si no se puede llegar al torque, notificarlo como discrepancia antes de certificar.</P> },
            { n: 3, q: <P>¿Qué información mínima debe contener un EASA Form 1 (Certificate of Release to Service) emitido para una hélice revisada?</P>, a: <P>El EASA Form 1 debe incluir: (1) Descripción del artículo (hélice, número de parte, número de serie). (2) Organización Part-145 aprobada (nombre, dirección, número de aprobación). (3) Descripción del trabajo realizado (overhaul, reparación, inspección). (4) Referencia al CMM y revisión aplicable. (5) Estado airworthy / unairworthy. (6) Cumplimiento de ADs y SBs aplicables. (7) Firma y número de licencia del certifying staff. (8) Fecha. Sin cualquiera de estos elementos, el Form 1 no es válido.</P> },
            { n: 4, q: <P>¿Por qué el capítulo 61 del AMM del avión y el CMM del fabricante de la hélice son documentos separados? ¿Cuándo prevalece uno sobre el otro?</P>, a: <P>El <strong>CMM del fabricante de la hélice</strong> cubre el mantenimiento interno de la hélice como componente (desmontaje, inspección, reparación, overhaul). El <strong>AMM Cap. 61</strong> cubre la interfaz hélice-avión: instalación, torques de montaje al motor, límites de vibración del conjunto motor-hélice en ese avión específico, operación y ajuste del gobernador. En caso de conflicto, prevalece el AMM para procedimientos de instalación (ya que tiene en cuenta las características específicas del avión) y el CMM para el overhaul del componente. Siempre consultar ambos y en caso de duda, contactar al fabricante del avión.</P> },
          ]} />
        </div>
      ),
    },
  ],
};

export default m17;
