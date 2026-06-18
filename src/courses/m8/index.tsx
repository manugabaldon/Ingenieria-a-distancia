import { CourseModule, Eq, P, Note, Warn, DefList, Table, Solved, Practice } from '../CourseView';

const m8: CourseModule = {
  id: 'm8',
  code: 'M8',
  title: 'Aerodinámica Básica',
  subtitle: 'Sustentación, vuelo y estabilidad',
  icon: '✈',
  license: 'B1 · B2',
  description: 'Principios de aerodinámica, teoría del vuelo y estabilidad de la aeronave según EASA Part-66.',
  chapters: [
    // ── 8.1 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-01',
      title: '8.1 Atmósfera e ISA',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Composición y estructura de la atmósfera</h3>
            <P>La atmósfera terrestre es una capa gaseosa que rodea la Tierra, retenida por la gravedad. Su composición es esencialmente constante hasta 80 km: 78% N₂, 21% O₂, 1% Ar y trazas de otros gases.</P>
            <Table headers={['Capa', 'Altitud', 'Temperatura', 'Relevancia aeronáutica']} rows={[
              ['Troposfera', '0–11 km (aprox.)', 'Decrece 6.5°C/km', 'Toda la aviación comercial y general. Contiene el 75% de la masa atmosférica. Tiempo meteorológico.'],
              ['Tropopausa', '~11 km', 'Constante −56.5°C', 'Límite de crucero para turbofan. Menor turbulencia.'],
              ['Estratosfera', '11–50 km', 'Aumenta hasta 0°C', 'Vuelo supersónico (Concorde FL600). Ozono.'],
              ['Mesosfera', '50–80 km', 'Decrece hasta −100°C', 'Globos de sondeo, cohetes.'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">ISA y su importancia en aviación</h3>
            <P>La <strong>Atmósfera Estándar Internacional</strong> (ISA, ICAO Doc 7488) define las propiedades del aire en función de la altitud bajo condiciones de referencia. Se usa para:</P>
            <DefList items={[
              { term: 'Calibración de instrumentos', def: 'El altímetro, el anemómetro y el machmeter están calibrados asumiendo ISA. Sus indicaciones son "ISA equivalentes".' },
              { term: 'Tablas de performance', def: 'Los datos del AFM/POH (distancias de despegue, techos, consumo) se publican en condiciones ISA y con correcciones ISA+ΔT.' },
              { term: 'Diseño aeronáutico', def: 'Los perfiles de misión, los análisis estructurales y las certificaciones usan ISA como referencia universal.' },
            ]} />
            <Eq>{`ISA MSL:  T₀ = 15°C, P₀ = 1013.25 hPa, ρ₀ = 1.225 kg/m³
Gradiente troposférico: −6.5°C cada 1000 m (−1.98°C/1000 ft)
ISA+15: condición de día caluroso (aeródromo montaña, verano)
ISA−15: condición de día frío`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Altitud densidad</h3>
            <P>La <strong>altitud densidad</strong> (DA) es la altitud ISA a la que la densidad del aire real es igual a la densidad real del punto. Es el parámetro que determina el rendimiento real de la aeronave:</P>
            <Eq>{`DA ≈ PA + 120 · (OAT − T_ISA)     [ft]
PA  presión de altitud (altímetro con 1013.25)
OAT temperatura exterior actual
T_ISA temperatura ISA a esa altitud

Ejemplo: aeródromo a 2000 ft PA, OAT = 35°C, T_ISA = 11°C
DA ≈ 2000 + 120·(35−11) = 2000 + 2880 = 4880 ft`}</Eq>
            <Warn>Una DA alta reduce el empuje disponible, aumenta la distancia de despegue y reduce el techo de vuelo. En operaciones en aeródromos de montaña con altas temperaturas, la aeronave puede no tener rendimiento suficiente para despegar con la carga nominal. Siempre calcular DA antes de operar en condiciones no estándar.</Warn>
          </section>

          <Solved n="8.1.A" title="Altitud densidad en aeródromo de montaña">
            {{
              q: <P>Un aeródromo en los Andes tiene altitud de presión PA = 8500 ft. La OAT es 32°C. Calcula la altitud densidad (DA) y evalúa el impacto en el rendimiento del avión respecto a las tablas del POH (que se publican en ISA).</P>,
              a: <>
                <P>Temperatura ISA a 8500 ft: T_ISA = 15 − (8500/1000 × 1.98) = 15 − 16.8 = −1.8°C</P>
                <Eq>{'DA \\approx PA + 120 \\times (OAT - T_{ISA}) = 8500 + 120 \\times (32 - (-1.8)) = 8500 + 4056 = 12\\,556\\ \\text{ft}'}</Eq>
                <P>La DA es 12 556 ft, casi 4000 ft superior a la PA. El rendimiento del avión será como si estuviera despegando desde un aeródromo a 12 556 ft en ISA. Las distancias de despegue del POH para 8500 ft no son válidas; hay que usar las de 12 500 ft (o usar las tablas de DA si el POH las incluye). Es posible que sea necesario reducir el peso de despegue o esperar a que baje la temperatura.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>A nivel del mar en ISA, ¿cuáles son los valores de temperatura, presión y densidad del aire?</P>,
              a: <><P><strong>R:</strong> T₀ = 15°C (288.15 K), P₀ = 1013.25 hPa, ρ₀ = 1.225 kg/m³. Estos son los valores de referencia de la ISA (ICAO Doc 7488).</P></>
            },
            {
              n: 2,
              q: <P>¿Cuál es la temperatura ISA a FL350 (35 000 ft ≈ 10 668 m)? ¿En qué capa de la atmósfera estamos?</P>,
              a: <><P>A 11 000 m (tropopausa), T = −56.5°C. FL350 ≈ 10 668 m &lt; 11 000 m, aún en troposfera:</P><Eq>{'T = 15 - 6.5 \\times (10.668) = 15 - 69.3 = -54.3°C'}</Eq><P>Muy cerca de la tropopausa. Los aviones de transporte cruzan en la parte superior de la troposfera / tropopausa.</P></>
            },
            {
              n: 3,
              q: <P>Explica por qué un avión que opera en ISA+20 (día 20°C más caliente que ISA) tiene menor rendimiento que en ISA. Menciona al menos dos parámetros afectados.</P>,
              a: <><P><strong>R:</strong> Con ISA+20: (1) <strong>Menor densidad del aire</strong> (ρ es menor a mayor temperatura para la misma presión) → menor sustentación y menor empuje del motor (el compresor ingiere menos masa de aire). (2) <strong>Mayor distancia de despegue</strong> (velocidad de rotación igual pero densidad menor → más tramo de aceleración). (3) <strong>Mayor EGT de motor</strong> (el motor trabaja más duro para generar el mismo empuje con aire menos denso) → posiblemente limitado por EGT. (4) <strong>Mayor V_stall</strong> (más TAS para el mismo IAS con menor ρ).</P></>
            },
            {
              n: 4,
              q: <P>¿Qué altímetro indica un avión que vuela a 8000 ft de altitud real si el QNH en tierra es 1000 hPa y el altímetro está ajustado a 1013.25 hPa (presión estándar QFE)?</P>,
              a: <><P><strong>R:</strong> Diferencia de presión: 1013.25 − 1000 = 13.25 hPa. Cada hPa equivale aproximadamente a 27 ft en altitudes bajas. Corrección = 13.25 × 27 ≈ 358 ft. Con QFE (1013.25) el altímetro leerá aproximadamente 8000 − 358 ≈ <strong>7640 ft</strong> (indica menos altitud real). Por eso en vuelo IFR se usa QNH para tener la altitud real sobre el nivel del mar.</P></>
            },
            {
              n: 5,
              q: <P>Un helicóptero tiene un techo de vuelo en hovering IGE (In Ground Effect) de 12 000 ft DA. Si opera en un aeródromo a 7000 ft PA con OAT = 38°C (T_ISA a 7000 ft = 1.4°C), ¿puede hacer hovering?</P>,
              a: <><Eq>{'DA = 7000 + 120 \\times (38 - 1.4) = 7000 + 4392 = 11\\,392\\ \\text{ft}'}</Eq><P>DA = 11 392 ft &lt; 12 000 ft límite → <strong>Sí puede hacer hovering IGE</strong>, pero con escaso margen (608 ft). Cualquier sobrepeso adicional o temperatura más alta lo impediría. No habría margen para hovering OGE (Out of Ground Effect), que siempre requiere más potencia.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.2 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-02',
      title: '8.2 Aerodinámica — Flujo alrededor de perfiles',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Flujo laminar y turbulento</h3>
            <P>El flujo de aire sobre un ala pasa por varias etapas en función del número de Reynolds y del gradiente de presión:</P>
            <DefList items={[
              { term: 'Capa límite laminar', def: 'Capas de fluido deslizándose ordenadamente unas sobre otras. Mínima fricción. Existe cerca del borde de ataque en perfiles bien diseñados.' },
              { term: 'Transición', def: 'El flujo laminar se vuelve inestable y transita a turbulento. El punto de transición depende de Re, rugosidad superficial y gradiente de presión.' },
              { term: 'Capa límite turbulenta', def: 'Mezcla intensa entre capas. Mayor fricción pero más resistente a la separación. Existe en la mayor parte del ala en vuelo normal.' },
              { term: 'Separación de la capa límite', def: 'Si el gradiente de presión adverso (la presión sube en la dirección del flujo) es suficientemente intenso, el flujo se separa de la superficie. Al separarse completamente → pérdida aerodinámica (stall).' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Geometría del perfil aerodinámico</h3>
            <Table headers={['Término', 'Definición']} rows={[
              ['Cuerda (c)', 'Línea recta del borde de ataque al borde de salida'],
              ['Espesor relativo (t/c)', 'Espesor máximo dividido por la cuerda. Perfil grueso: t/c > 12%'],
              ['Línea de curvatura media', 'Línea equidistante del extradós e intradós. Si = 0 → perfil simétrico'],
              ['Curvatura (camber)', 'Distancia máxima de la línea media a la cuerda. Define el CL a α=0°'],
              ['Ángulo de ataque (α)', 'Ángulo entre la cuerda y el flujo no perturbado (viento relativo)'],
              ['NACA 4 dígitos', 'NACA 2412: 2% curvatura, a 40% cuerda, 12% espesor'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Generación de sustentación</h3>
            <P>La sustentación se genera porque el flujo sobre el extradós (parte superior) es más rápido que sobre el intradós. Por Bernoulli, donde la velocidad es mayor, la presión es menor → hay una diferencia de presión neta hacia arriba:</P>
            <Eq>{`L = ½ · ρ · V² · S · C_L     [N]
ρ  densidad del aire [kg/m³]
V  velocidad del avión (TAS) [m/s]
S  superficie alar [m²]
C_L  coeficiente de sustentación (adimensional)`}</Eq>
            <P>C_L depende principalmente del ángulo de ataque α y de la geometría del perfil. Para pequeños α:</P>
            <Eq>{`C_L ≈ C_L0 + (dC_L/dα) · α ≈ C_L0 + 2π · α   (rad)
Pendiente típica: dC_L/dα ≈ 0.1 /°  (ala real)`}</Eq>
            <Note>La sustentación también puede explicarse por el cambio de cantidad de movimiento del flujo de aire: el ala deflecta el flujo hacia abajo (downwash), y por la 3ª ley de Newton el ala recibe una fuerza hacia arriba. Ambas explicaciones son correctas y complementarias.</Note>
          </section>

          <Solved n="8.2.A" title="Sustentación de un perfil NACA 2412 a baja velocidad">
            {{
              q: <P>Un ala de entrenamiento con perfil NACA 2412 tiene una cuerda c = 1.2 m, envergadura b = 8 m y vuela a V = 50 m/s (TAS) a ρ = 1.225 kg/m³ con α = 6°. El C_L a este ángulo es 0.72. Calcula la sustentación total generada.</P>,
              a: <>
                <P>Superficie alar: S = b × c = 8 × 1.2 = 9.6 m²</P>
                <Eq>{'L = \\frac{1}{2} \\rho V^2 S C_L = \\frac{1}{2} \\times 1.225 \\times 50^2 \\times 9.6 \\times 0.72 = 10\\,584\\ \\text{N} \\approx 10.6\\ \\text{kN}'}</Eq>
                <P>Si el peso del avión es de 10.6 kN (≈1080 kg), el avión vuela nivelado a esta velocidad y ángulo de ataque. Para mantener la altitud constante, L = W → el piloto debe ajustar α o V para mantener este equilibrio.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Qué significa un perfil NACA 4415 en términos de geometría? Identifica la curvatura, posición de la curvatura máxima y espesor relativo.</P>,
              a: <><P><strong>R:</strong> NACA 4415: <strong>4</strong>% de curvatura máxima (camber), a <strong>40</strong>% de la cuerda desde el borde de ataque, espesor relativo <strong>15</strong>% de la cuerda. Es un perfil con buenas características de sustentación a ángulos moderados, típico de aviones de entrenamiento y utilitarios.</P></>
            },
            {
              n: 2,
              q: <P>Un avión vuela a TAS = 80 m/s a 3000 m de altitud (ρ = 0.909 kg/m³). El ala tiene S = 16 m² y CL = 0.55. Calcula la sustentación generada.</P>,
              a: <><Eq>{'L = \\frac{1}{2} \\times 0.909 \\times 80^2 \\times 16 \\times 0.55 = 25\\,694\\ \\text{N} \\approx 25.7\\ \\text{kN}'}</Eq></>
            },
            {
              n: 3,
              q: <P>Explica en qué consiste la "separación de la capa límite" y cómo se manifiesta en el avión desde el punto de vista del piloto.</P>,
              a: <><P><strong>R:</strong> Cuando el gradiente de presión adverso (presión que aumenta en la dirección del flujo, en el extradós trasero del ala) es demasiado grande, el flujo pierde momentum y se separa de la superficie, creando una zona de flujo recirculante detrás del punto de separación. El piloto siente: (1) <strong>buffet</strong> (vibración del avión por el flujo turbulento que golpea la cola); (2) <strong>pérdida de sustentación</strong> (C_L cae bruscamente al separarse en el ala completa → stall). Además el trim puede cambiar buscamente.</P></>
            },
            {
              n: 4,
              q: <P>¿Por qué los aviones modernos de transporte (A320, B737) usan alas de gran alargamiento (AR ≈ 10–12) en lugar de alas de alargamiento bajo (AR ≈ 4–5)?</P>,
              a: <><P><strong>R:</strong> La resistencia inducida D_i = C_L²/(π·e·AR). A mayor alargamiento (AR), menor resistencia inducida para el mismo CL → mejor fineza (L/D) → menor consumo en crucero. El costo es el mayor tamaño del ala (más flexión estructural, más peso de estructura). Los aviones de combate usan AR bajo por mayor maniobrabilidad y menor envergadura; los planeadores usan AR &gt; 30 para máxima eficiencia.</P></>
            },
            {
              n: 5,
              q: <P>Describe el efecto que tiene aumentar la velocidad de vuelo (manteniendo altitud y configuración constantes) sobre el ángulo de ataque necesario para mantener vuelo nivelado. ¿Por qué?</P>,
              a: <><P><strong>R:</strong> Al aumentar V, la presión dinámica (½ρV²) aumenta. Para mantener L = W constante, el producto C_L × (½ρV²) debe ser constante. Como ½ρV² aumenta, <strong>C_L debe disminuir</strong>. Como C_L ≈ C_L0 + a·α, disminuir C_L implica <strong>disminuir α</strong>. El piloto "mete morro abajo" al acelerar (o el trimmador reduce automáticamente α). A velocidades altas en transporte, α es muy pequeño (~1–2°); cerca de la velocidad de pérdida, α está cerca del crítico (~15°).</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.3 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-03',
      title: '8.3 Sustentación y resistencia',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Coeficiente de resistencia y polar del perfil</h3>
            <P>La <strong>resistencia aerodinámica</strong> total se divide en:</P>
            <DefList items={[
              { term: 'Resistencia parásita (D_p)', def: 'Incluye fricción superficial (skin friction) y presión de forma (form drag). Proporcional a V². No depende de C_L.' },
              { term: 'Resistencia inducida (D_i)', def: 'Causada por los vórtices de punta de ala al generar sustentación. Aumenta con C_L² → dominante a baja velocidad. D_i = C_L² / (π·e·AR), e eficiencia de Oswald ≈ 0.85.' },
              { term: 'Resistencia de onda (D_w)', def: 'Solo en vuelo transsónico/supersónico. Asociada a la formación de ondas de choque.' },
            ]} />
            <Eq>{`D_total = ½ · ρ · V² · S · C_D
C_D = C_D0 + k · C_L²     (polar cuadrática)
C_D0  resistencia parásita mínima
k = 1/(π·e·AR)
AR = b²/S  (alargamiento alar, b = envergadura)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Fineza aerodinámica (L/D)</h3>
            <P>La <strong>fineza</strong> es el cociente sustentación/resistencia. Indica cuántos metros avanza el avión por cada metro de altitud perdida en planeo:</P>
            <Eq>{`E = L/D = C_L/C_D
Máxima fineza (E_max) → velocidad de planeo más eficiente

Planeo sin motor:
Pendiente de planeo = 1/E    (radianes)
Distancia de planeo = h · E  (h = altitud inicial)`}</Eq>
            <Table headers={['Tipo de aeronave', 'L/D máxima típica']} rows={[
              ['Planeador de competición', '50–60'],
              ['Avión de transporte moderno (A320)', '17–18'],
              ['Avión de entrenamiento (C172)', '8–10'],
              ['Helicóptero', '4–5'],
              ['Pájaro (buitre)', '15–20'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Pérdida aerodinámica (stall)</h3>
            <P>Al aumentar el ángulo de ataque más allá del <strong>ángulo crítico</strong> (α_stall ≈ 14–16° para la mayoría de perfiles), la capa límite se separa bruscamente del extradós y C_L cae de forma abrupta:</P>
            <Eq>{`V_stall = √(2·W / (ρ·S·C_Lmax))
A mayor altitud (menor ρ) → mayor V_stall
Con flaps → mayor C_Lmax → menor V_stall
Con mayor peso → mayor V_stall`}</Eq>
            <Warn>El avión puede entrar en pérdida a cualquier velocidad y actitud si el ángulo de ataque supera el crítico. En viraje a 60° de banco, V_stall aumenta un 41% respecto al vuelo nivelado (factor de carga = 2). Los sistemas ALPHA PROT/FLOOR (A320 family) impiden que el piloto alcance el ángulo de ataque crítico en condiciones normales.</Warn>
          </section>

          <Solved n="8.3.A" title="Velocidad de pérdida en viraje y cálculo de fineza">
            {{
              q: <P>Un Cessna 172 tiene Vs_0 (stall con flaps) = 55 KIAS en vuelo nivelado. (a) Calcula Vs en un viraje a 45° de banco. (b) En planeo sin motor con L/D_max = 9, ¿cuántos km de planeo desde 1500 m de altitud?</P>,
              a: <>
                <P><strong>(a) Factor de carga a 45°:</strong></P>
                <Eq>{'n = \\frac{1}{\\cos 45°} = \\frac{1}{0.707} = 1.41'}</Eq>
                <Eq>{'V_{s,viraje} = V_{s0} \\times \\sqrt{n} = 55 \\times \\sqrt{1.41} = 55 \\times 1.19 = 65.4\\ \\text{KIAS}'}</Eq>
                <P><strong>(b) Distancia de planeo:</strong></P>
                <Eq>{'d = h \\times (L/D)_{max} = 1500\\ \\text{m} \\times 9 = 13\\,500\\ \\text{m} = 13.5\\ \\text{km}'}</Eq>
                <P>Desde 1500 m de altura, el C172 puede planear 13.5 km sin motor. Fundamental para los procedimientos de emergencia por fallo de motor.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es el ángulo de ataque crítico típico de la mayoría de los perfiles aerodinámicos convencionales y qué ocurre físicamente en ese punto?</P>,
              a: <><P><strong>R:</strong> El α_crítico (stall angle) es típicamente <strong>14–16°</strong>. En este punto, la capa límite se separa bruscamente del extradós a partir del borde de ataque y C_L cae de forma abrupta (el C_L_max se alcanza justo antes de la separación completa). La sustentación puede caer un 30–50% en décimas de segundo. El flujo separado genera turbulencia que golpea la cola (buffet) como aviso previo.</P></>
            },
            {
              n: 2,
              q: <P>Un A320 tiene V_stall en configuración limpia de 125 KIAS con peso máximo. Si el peso se reduce en vuelo al 80% del MTOW, ¿cuál será la nueva V_stall?</P>,
              a: <><P>V_stall ∝ √W, por lo que:</P><Eq>{'V_{stall,nuevo} = 125 \\times \\sqrt{0.8} = 125 \\times 0.894 = 111.8\\ \\text{KIAS}'}</Eq><P>Una reducción de peso del 20% reduce el stall speed un 10.6%. Por eso las velocidades de maniobra del avión se reducen a medida que se consume combustible.</P></>
            },
            {
              n: 3,
              q: <P>Explica por qué la resistencia inducida (D_i) es mayor a baja velocidad (aproximación al aeropuerto) que en crucero de alta velocidad.</P>,
              a: <><P><strong>R:</strong> D_i = C_L²/(π·e·AR) × (½ρV²S). Para sostener el peso del avión (L = W), a baja velocidad se necesita mayor C_L (más ángulo de ataque). Como D_i ∝ C_L², el incremento de C_L al cuadrado hace que D_i sea dominante a baja velocidad. En crucero, V alta → CL pequeño → D_i pequeña. Este es el motivo por el que extender flaps (que aumentan C_Lmax) es necesario para aterrizar: permiten volar más lento con C_L aceptable.</P></>
            },
            {
              n: 4,
              q: <P>¿A qué velocidad consigue el A320 su mínima resistencia total (máxima fineza) si C_D0 = 0.026, k = 0.038, S = 122.6 m², W = 68 000 kg, ρ = 0.9 kg/m³ (10 000 ft)?</P>,
              a: <><P>La velocidad de mínima resistencia es la velocidad de máxima fineza:</P><Eq>{'C_{L,E_{max}} = \\sqrt{C_{D0}/k} = \\sqrt{0.026/0.038} = 0.827'}</Eq><Eq>{'V_{Emax} = \\sqrt{\\frac{2W}{\\rho S C_{L,E_{max}}}} = \\sqrt{\\frac{2\\times68000\\times9.81}{0.9\\times122.6\\times0.827}} \\approx 118\\ \\text{m/s} \\approx 230\\ \\text{kt}'}</Eq></>
            },
            {
              n: 5,
              q: <P>¿Por qué los aviones de alta velocidad (A320, B737) tienen los alerones de alta velocidad (inboard ailerons) cerca del fuselaje en lugar de en las puntas del ala como en los aviones lentos?</P>,
              a: <><P><strong>R:</strong> A alta velocidad, los alerones de punta de ala generarían grandes fuerzas aerodinámicas que <strong>torsionarían el ala</strong> (aileron reversal): en lugar de rotar el avión en la dirección deseada, el ala se tuerce en sentido contrario y el efecto es invertido. Los alerones internos (cerca del fuselaje donde el ala es más rígida) tienen un brazo de momento menor y generan menor torsión. A alta velocidad también se activan los spoilers asimétricos para contribuir al control de alabeo sin los problemas de torsión alar.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.4 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-04',
      title: '8.4 Teoría del vuelo',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Las cuatro fuerzas del vuelo</h3>
            <P>En vuelo nivelado constante, actúan cuatro fuerzas en equilibrio:</P>
            <DefList items={[
              { term: 'Sustentación L', def: 'Perpendicular al vector velocidad (viento relativo). Generada principalmente por las alas.' },
              { term: 'Peso W', def: 'Hacia el centro de la Tierra. Actúa en el CG.' },
              { term: 'Empuje T', def: 'En la dirección del movimiento, generado por los motores.' },
              { term: 'Resistencia D', def: 'Opuesta al movimiento. Suma de todas las resistencias aerodinámicas.' },
            ]} />
            <Eq>{`Vuelo nivelado constante (equilibrio):
L = W     →  ½·ρ·V²·S·C_L = m·g
T = D     →  Empuje = Resistencia total`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Vuelo en ascenso y descenso</h3>
            <Eq>{`Ascenso (ángulo γ):
T − D = W · sin γ         (exceso de empuje)
L = W · cos γ ≈ W  (para γ pequeño)
Régimen de ascenso RC = V · sin γ  [ft/min]
RC_max → velocidad de máxima potencia excedente

Descenso con motor:
D − T = W · sin γ  (γ negativo)
V_min_descenso = V_(L/D)_max  (velocidad de máxima fineza)`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Viraje coordinado</h3>
            <Eq>{`En viraje a φ grados de banco:
Factor de carga: n = 1/cos φ
L = n · W     Velocidad de viraje aumenta
V_stall_viraje = V_stall_0 · √n
Radio de viraje: r = V²/(g · tan φ)

φ = 30°: n = 1.15  V_stall × 1.07
φ = 45°: n = 1.41  V_stall × 1.19
φ = 60°: n = 2.00  V_stall × 1.41
φ = 75°: n = 3.86  V_stall × 1.97`}</Eq>
            <Note>Para mantener el mismo radio de viraje al aumentar la velocidad, es necesario aumentar el ángulo de banco. Los procedimientos de espera (holding patterns) de ICAO definen una velocidad y un banco estándar (25° o hasta 3°/s de giro) para aeronaves en función de su categoría de performance.</Note>
          </section>

          <Solved n="8.4.A" title="Viraje coordinado del A320 — factor de carga y radio">
            {{
              q: <P>Un A320 realiza un viraje coordinado a 250 kt (TAS = 128.6 m/s) con ángulo de banco φ = 30°. Calcula: (a) factor de carga n, (b) radio de viraje, (c) V_stall en viraje si Vs en vuelo nivelado es 125 kt.</P>,
              a: <>
                <P><strong>(a) Factor de carga:</strong></P>
                <Eq>{'n = \\frac{1}{\\cos 30°} = \\frac{1}{0.866} = 1.155'}</Eq>
                <P><strong>(b) Radio de viraje:</strong></P>
                <Eq>{'r = \\frac{V^2}{g \\tan\\varphi} = \\frac{128.6^2}{9.81 \\times \\tan 30°} = \\frac{16537.96}{9.81 \\times 0.577} = 2921\\ \\text{m} \\approx 2.9\\ \\text{km}'}</Eq>
                <P><strong>(c) V_stall en viraje:</strong></P>
                <Eq>{'V_{s,30°} = 125 \\times \\sqrt{1.155} = 125 \\times 1.075 = 134.4\\ \\text{kt}'}</Eq>
                <P>El piloto debe mantener al menos 135 kt en este viraje para no entrar en pérdida. A 30° de banco el margen de velocidad se reduce notablemente.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>En vuelo nivelado, ¿cuáles son las cuatro fuerzas que actúan sobre el avión y cuáles son las condiciones de equilibrio?</P>,
              a: <><P><strong>R:</strong> Las cuatro fuerzas son <strong>sustentación L</strong> (arriba, perpendicular a V), <strong>peso W</strong> (abajo), <strong>empuje T</strong> (hacia adelante) y <strong>resistencia D</strong> (hacia atrás). Equilibrio en vuelo nivelado constante: <strong>L = W</strong> y <strong>T = D</strong>. Si L &gt; W → el avión asciende; si T &gt; D → el avión acelera.</P></>
            },
            {
              n: 2,
              q: <P>Un avión asciende con ángulo de subida γ = 8°. Si W = 50 000 N, calcula el exceso de empuje (T − D) necesario.</P>,
              a: <><Eq>{'T - D = W \\sin\\gamma = 50000 \\times \\sin 8° = 50000 \\times 0.139 = 6950\\ \\text{N}'}</Eq></>
            },
            {
              n: 3,
              q: <P>A 60° de banco, ¿cuánto aumenta la V_stall respecto al vuelo nivelado? ¿Por qué los pilotos deben ser especialmente cuidadosos en virajes pronunciados a baja velocidad?</P>,
              a: <><Eq>{'n = 1/\\cos 60° = 2 \\qquad V_{s,60°} = V_{s0}\\times\\sqrt{2} = 1.41\\times V_{s0}'}</Eq><P>La Vs aumenta un 41%. Si en vuelo nivelado hay un margen de 30 kt sobre Vs, ese margen se reduce drásticamente en viraje pronunciado. A baja velocidad (circuito de tráfico) un viraje brusco a 60° podría acercar peligrosamente la velocidad a la nueva Vs elevada → riesgo de pérdida + barrena a baja altitud.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es el "régimen de ascenso" (Rate of Climb, RC) y cómo se maximiza en términos de velocidad de vuelo?</P>,
              a: <><P><strong>R:</strong> El RC = V × sinγ [ft/min] es la componente vertical de la velocidad de vuelo. Se maximiza a la velocidad donde el <strong>exceso de potencia</strong> (P_disponible − P_requerida) es máximo, no a la velocidad de máximo exceso de empuje. Para un avión con hélice, esta velocidad es Vy (best rate of climb speed). Volar más lento (Vx, best angle) maximiza el ángulo de subida pero no el RC.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué consecuencias tiene para un avión de transporte tener el CG en el límite trasero en lugar del límite delantero? Discute estabilidad, consumo y maniobrabilidad.</P>,
              a: <><P><strong>R:</strong> Con CG trasero (cerca del límite aft): (1) <strong>Menor estabilidad longitudinal</strong> (menor margen estático SM → más sensible a las perturbaciones); (2) <strong>Menor resistencia de trim</strong>: el estabilizador horizontal necesita menos deflexión para equilibrar → <strong>menor resistencia y menor consumo</strong> (1–2% ahorro de combustible); (3) <strong>Mayor maniobrabilidad</strong> (responde más rápido a los mandos). Los sistemas modernos de gestión de CG (trasvase de combustible en el B777, A380) posicionan el CG en el límite trasero para optimizar el consumo.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.5 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-05',
      title: '8.5 Sistemas hipersustentadores',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Necesidad de los hipersustentadores</h3>
            <P>Las alas de aviones rápidos están optimizadas para el crucero: perfiles delgados, poco curvados, alargamiento moderado. Para el despegue y el aterrizaje (velocidades mucho menores) se necesita aumentar el C_L máximo. Los <strong>hipersustentadores</strong> modifican temporalmente la geometría del ala.</P>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Flaps (borde de salida)</h3>
            <Table headers={['Tipo de flap', 'Mecanismo', 'ΔC_Lmax', 'ΔC_D', 'Avión típico']} rows={[
              ['Flap simple', 'Deflexión hacia abajo', '+0.7–0.9', 'Bajo', 'Aviones ligeros (C172)'],
              ['Flap ranurado (slotted)', 'Ranura que energiza la capa límite', '+1.0–1.3', 'Moderado', 'Mayoría aviones GA y regionales'],
              ['Flap de Fowler', 'Desliza hacia atrás y baja, aumenta cuerda', '+1.3–1.6', 'Moderado', 'B737, A320'],
              ['Flap doble/triple ranurado', 'Varios elementos', '+1.5–2.0', 'Alto', 'B747, B777 (triples)'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Slats y ranuras (borde de ataque)</h3>
            <DefList items={[
              { term: 'Slat (listón)', def: 'Pequeña superficie aerodinámica en el borde de ataque que crea una ranura. Energiza la capa límite del extradós, retrasando la separación → mayor α_crítico. Aumenta C_Lmax en +0.5 a +1.0. Estándar en aviones de transporte.' },
              { term: 'Krüger flap', def: 'Superficie que sale del interior del borde de ataque hacia adelante y abajo. Menor eficiencia que el slat pero más simple.' },
            ]} />
            <Eq>{`Con flaps de Fowler y slats (A320, posición FULL):
C_Lmax ≈ 3.0–3.5 (vs ≈ 1.3–1.5 ala limpia)
V_stall reducida en ≈ 40–50% respecto a ala limpia`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Spoilers y aerofrenos</h3>
            <DefList items={[
              { term: 'Spoiler de tierra (ground spoiler)', def: 'Se extienden completamente al aterrizaje para destruir la sustentación (dump lift) y aumentar la carga sobre el tren → frenado más eficiente.' },
              { term: 'Speed brake (aerofreno)', def: 'Se extienden parcialmente en vuelo para aumentar la resistencia y reducir velocidad (descenso rápido sin aumentar la velocidad).' },
              { term: 'Roll spoiler', def: 'Se extienden asimétricamente para asistir o sustituir a los alerones en el control de alabeo (especialmente a alta velocidad donde los alerones son poco efectivos).' },
            ]} />
          </section>

          <Solved n="8.5.A" title="Velocidad de aterrizaje con flaps FULL del A320">
            {{
              q: <P>Un A320 aterriza con peso de 60 000 kg, S = 122.6 m², ρ = 1.225 kg/m³ (sea level). Con flaps FULL, C_Lmax = 3.2. Calcula: (a) V_stall en configuración FULL, (b) velocidad de aproximación V_ref = 1.3 × Vs.</P>,
              a: <>
                <Eq>{'V_{stall} = \\sqrt{\\frac{2 \\times W}{\\rho \\times S \\times C_{Lmax}}} = \\sqrt{\\frac{2 \\times 60000 \\times 9.81}{1.225 \\times 122.6 \\times 3.2}} = \\sqrt{\\frac{1\\,177\\,200}{481.4}} = 49.4\\ \\text{m/s} = 96\\ \\text{kt}'}</Eq>
                <Eq>{'V_{ref} = 1.3 \\times V_{stall} = 1.3 \\times 96 = 125\\ \\text{kt}'}</Eq>
                <P>La velocidad de referencia de 125 kt proporciona el margen del 30% sobre la pérdida exigido por la regulación (CS-25). El FMGS del A320 calcula y muestra V_LS (Lower Selectable Speed ≈ Vs × 1.23) y V_app en el PFD.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia entre un flap simple y un flap de Fowler en cuanto a su efecto sobre C_Lmax y C_D? ¿Por qué los aviones de transporte usan Fowler?</P>,
              a: <><P><strong>R:</strong> El flap simple solo deflecta hacia abajo (+curvatura), aumentando C_Lmax en +0.7–0.9 pero con poco aumento de superficie. El flap de Fowler <strong>desliza hacia atrás Y baja</strong>, aumentando tanto la curvatura como la superficie alar efectiva → mayor aumento de C_Lmax (+1.3–1.6) y mayor CD. Los aviones de transporte usan Fowler porque el mayor C_Lmax permite velocidades de aproximación más bajas, mejorando la seguridad en aterrizaje y reduciendo las distancias de campo requeridas.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué los slats del borde de ataque aumentan el α_crítico además de C_Lmax? Describe el mecanismo aerodinámico.</P>,
              a: <><P><strong>R:</strong> El slat crea una ranura (slot) por la que fluye aire a alta velocidad desde el intradós al extradós. Este chorro de alta energía <strong>reactiva la capa límite del extradós</strong>, que de otro modo se separaría a α moderados. Con la capa límite energizada, el ala puede seguir generando sustentación hasta ángulos de ataque más altos (α_crítico aumenta de ~15° a ~25°) antes de que se produzca la separación. El resultado es: mayor C_Lmax y mayor rango de α de operación segura.</P></>
            },
            {
              n: 3,
              q: <P>El A320 despega con flaps 2. Si C_Lmax con flaps 2 = 2.4 y el peso de despegue es 70 000 kg, S = 122.6 m², ρ = 1.225 kg/m³, calcula V_stall y V1 mínima (V_R ≥ 1.05 × V_stall según CS-25).</P>,
              a: <><Eq>{'V_{stall} = \\sqrt{\\frac{2\\times70000\\times9.81}{1.225\\times122.6\\times2.4}} = \\sqrt{\\frac{1\\,373\\,400}{360.9}} = 61.7\\ \\text{m/s} = 120\\ \\text{kt}'}</Eq><Eq>{'V_R \\geq 1.05 \\times 120 = 126\\ \\text{kt}'}</Eq></>
            },
            {
              n: 4,
              q: <P>¿Cuándo se activan los ground spoilers automáticamente en el aterrizaje del A320 y cuál es su función principal?</P>,
              a: <><P><strong>R:</strong> Los ground spoilers del A320 se activan automáticamente al tocar el suelo (señal de weight-on-wheels de al menos dos ruedas + reversa activada o palanca de spoilers en ARM). Su función principal es <strong>destruir la sustentación residual del ala</strong> (dump lift) para poner todo el peso del avión sobre el tren de aterrizaje lo antes posible, maximizando la eficiencia del frenado por ruedas (los frenos solo son efectivos si hay carga sobre ellas). Secundariamente, aumentan la resistencia aerodinámica contribuyendo a la deceleración.</P></>
            },
            {
              n: 5,
              q: <P>Un avión retráctil usa speed brakes para descender rápidamente manteniendo la velocidad dentro de VMO. Explica termodinámicamente por qué extender los spoilers permite descender más rápido sin aumentar la velocidad.</P>,
              a: <><P><strong>R:</strong> Al extender spoilers, C_D aumenta → resistencia aerodinámica D aumenta. Para mantener V constante (sin acelerar), se requiere T = D (o la potencia disponible absorbe la resistencia extra). Pero como se desea descender, se reduce el empuje (T &lt; D). En el descenso, la pérdida de energía potencial (masa × g × descenso) compensa el exceso de resistencia. Sin spoilers, para descender a VMO habría que reducir mucho el empuje (o incluso llevar al ralentí), pero en aviones de turbofán no se puede reducir demasiado el N1 sin riesgo de flame-out. Los spoilers permiten mantener N1 en un rango operativo sano mientras se disipa la energía por arrastre.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.6 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-06',
      title: '8.6 Estabilidad estática',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Concepto de estabilidad</h3>
            <P>Una aeronave es <strong>estáticamente estable</strong> si, al ser perturbada de su posición de equilibrio, genera fuerzas y momentos aerodinámicos que tienden a restaurar ese equilibrio.</P>
            <Table headers={['Tipo', 'Respuesta a perturbación', 'Ejemplo']} rows={[
              ['Estabilidad estática positiva', 'Vuelve hacia la posición original', 'Avión de transporte normal'],
              ['Estabilidad estática neutra', 'Se queda en la nueva posición', 'Difícil de manejar en la práctica'],
              ['Estabilidad estática negativa', 'Se aleja más de la posición original', 'Algunos cazas de alta maniobrab. (requiere FBW)'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Estabilidad longitudinal — Punto neutro y margen estático</h3>
            <P>La estabilidad longitudinal (en cabeceo) depende de la posición relativa del CG y el <strong>punto neutro</strong> (NP, el punto donde actúa el incremento de sustentación cuando varía α):</P>
            <Eq>{`Margen estático (SM) = (NP − CG) / MAC × 100%

SM > 0: CG adelantado del NP → estable (avión tiende a picar)
SM < 0: CG retrasado del NP → inestable
SM típico en transporte civil: 5–15% MAC`}</Eq>
            <P>El estabilizador horizontal genera un momento de cabeceo que equilibra el momento del ala. Al variar el CG, el piloto (o el trimmador automático) ajusta el estabilizador para mantener el equilibrio.</P>
            <Note>Los aviones de transporte modernos con ACMS (Airworthiness Control Management System) monitorean continuamente el CG y pueden trasvasar combustible entre depósitos para optimizar el CG durante el vuelo, reduciendo la resistencia de trim (THS) → ahorro de combustible del 1–2%.</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Estabilidad lateral y direccional</h3>
            <DefList items={[
              { term: 'Estabilidad de diedro (lateral)', def: 'Al entrar en un alabeo, el ala descendente genera más sustentación que la ascendente → momento restaurador. El diedro positivo (puntas más altas que la raíz) contribuye positivamente.' },
              { term: 'Estabilidad direccional (de deriva)', def: 'Al generar un ángulo de derrape (β), el fuselaje y la deriva crean un momento que tiende a alinear la nariz con el flujo. La deriva (vertical tail) es el principal contribuyente.' },
              { term: 'Acoplamiento lateral-direccional', def: 'Las perturbaciones laterales y direccionales están acopladas. Los modos principales son: "Dutch roll" (oscilación amortiguada de alabeo y guiñada) y "spiral mode" (espiral lenta divergente o convergente).' },
            ]} />
          </section>

          <Solved n="8.6.A" title="Margen estático y posicionamiento del CG">
            {{
              q: <P>Un avión de transporte tiene MAC = 4.2 m, Punto neutro NP = 42% MAC y límites de CG de 15%–33% MAC. (a) Calcula el margen estático (SM) para CG en el límite delantero y trasero. (b) ¿Cuál configuración es más estable? ¿Cuál más eficiente en consumo?</P>,
              a: <>
                <P><strong>(a) SM con CG al 15% MAC (límite delantero):</strong></P>
                <Eq>{'SM_{fwd} = NP - CG = 42\\% - 15\\% = 27\\%\\ MAC'}</Eq>
                <P><strong>SM con CG al 33% MAC (límite trasero):</strong></P>
                <Eq>{'SM_{aft} = 42\\% - 33\\% = 9\\%\\ MAC'}</Eq>
                <P><strong>(b)</strong> CG delantero → mayor SM → <strong>más estable</strong> (mayor resistencia a perturbaciones, mayor estabilidad en turbulencia). CG trasero → menor SM → <strong>más eficiente</strong> en consumo (menor deflexión del THS para el trim → menor resistencia de trim → ~1-2% menos consumo). Los sistemas automáticos de trasvase de combustible buscan el CG óptimo según la fase de vuelo.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>Define estabilidad estática positiva, neutra y negativa. Da un ejemplo de aeronave para cada tipo.</P>,
              a: <><P><strong>R:</strong> <strong>Positiva:</strong> tras una perturbación, la aeronave tiende a volver al equilibrio original (avión de transporte comercial). <strong>Neutra:</strong> la aeronave se queda en la nueva posición perturbada sin volver ni alejarse más (difícil de pilotear, raro en diseño civil). <strong>Negativa:</strong> la perturbación se amplifica, alejándose del equilibrio (cazas de alta maniobrabilidad como el F-16, que requieren FBW para ser piloteables).</P></>
            },
            {
              n: 2,
              q: <P>¿Qué es el "Dutch roll" y cómo lo amortigua el sistema de un avión de transporte moderno?</P>,
              a: <><P><strong>R:</strong> El Dutch roll es una oscilación oscilatoria acoplada de alabeo y guiñada, típica en alas en flecha con poco diedro. Se manifiesta como un movimiento "de baile" de la cola del avión (guiñada + alabeo alternados). Puede ser incomoda o difícil de controlar. Los aviones de transporte llevan un <strong>Yaw Damper</strong>: un ordenador que detecta la velocidad de guiñada (con un giróscopo de guiñada) y actúa automáticamente el timón de dirección en sentido opuesto para amortiguar la oscilación antes de que el piloto la perciba. Sin yaw damper, algunos aviones (B747) tendrían Dutch roll pronunciado en crucero.</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué los aviones de ala alta (ATR 72, C-130) tienen mayor estabilidad de diedro sin necesitar un ángulo de diedro positivo en el ala?</P>,
              a: <><P><strong>R:</strong> En los aviones de ala alta, cuando el avión entra en un alabeo, el ala descendente "recoge" aire desde un ángulo efectivo más favorable (el fuselaje actúa como una canalización que dirige más flujo hacia el ala bajada), generando automáticamente más sustentación en esa ala y restaurando el nivel. Este "diedro geométrico" del fuselaje permite tener alas con menor o nulo diedro geométrico manteniendo estabilidad lateral adecuada. El efecto es el contrario en alas bajas (donde el fuselaje "bloquea" el flujo al ala baja), que necesitan más diedro geométrico.</P></>
            },
            {
              n: 4,
              q: <P>Si el CG de un avión está detrás del punto neutro (SM negativo), ¿qué ocurre y cómo lo gestiona un avión FBW como el A320?</P>,
              a: <><P><strong>R:</strong> Con SM negativo, cualquier perturbación de cabeceo se amplifica en lugar de amortiguarse: el avión es longitudinalmente inestable. Sin asistencia, sería imposible de pilotear manualmente de forma segura. El A320 en FBW normal law usa los ordenadores PRIM que detectan cualquier desviación y actúan automáticamente los elevadores para corrija la perturbación antes de que se amplifique. El resultado es un avión artificialmente estable que el piloto no puede distinguir de uno naturalmente estable. La ventaja: se permite el CG ligeramente más trasero de lo que la aerodinámica natural admitiría, reduciendo el consumo.</P></>
            },
            {
              n: 5,
              q: <P>¿Qué es la "spiral mode" (modo espiral) y por qué los aviones de transporte tienen esta inestabilidad ligera pero no es peligrosa en la práctica?</P>,
              a: <><P><strong>R:</strong> El modo espiral es un movimiento de largo período (varios minutos) en el que un alabeo no corregido lleva al avión a entrar lentamente en un espiral descendente. Si el modo es ligeramente divergente (inestable) el avión tarda varios minutos en llegar a ángulos de banco problemáticos. En la práctica, el piloto automático corrige cualquier alabeo de inmediato, y en vuelo manual el piloto nota el cambio de actitud mucho antes de que se vuelva crítico. Las regulaciones permiten una ligera inestabilidad del modo espiral (CS-25.181) siempre que el tiempo para alcanzar 20° de banco sea mayor de 20 segundos desde una perturbación inicial de 5°.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.7 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-07',
      title: '8.7 Superficies de control',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Superficies de control primarias</h3>
            <Table headers={['Superficie', 'Eje controlado', 'Movimiento', 'Efecto']} rows={[
              ['Alerón (aileron)', 'Longitudinal (roll)', 'Uno sube / el otro baja', 'Alabeo. Asimétrico en ambas alas.'],
              ['Timón de profundidad (elevator)', 'Lateral (pitch)', 'Sube o baja', 'Cabeceo. En la cola horizontal.'],
              ['Timón de dirección (rudder)', 'Vertical (yaw)', 'Izq. o der.', 'Guiñada. En la cola vertical.'],
            ]} />
            <Note>En aviones de alta velocidad (B747, A380), los alerones internos (inboard ailerons) se usan a alta velocidad para evitar la torsión alar (aileron reversal). Los alerones externos solo se usan a baja velocidad (flaps extendidos).</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Superficies de control secundarias</h3>
            <DefList items={[
              { term: 'Trim (compensador)', def: 'Pequeña superficie en el borde de salida del control primario. Reduce las fuerzas en el mando en la condición de vuelo seleccionada. En aviones grandes, el trimmador puede ser el propio estabilizador horizontal (Trimmable Horizontal Stabilizer, THS).' },
              { term: 'Servo tab', def: 'Tab que se mueve en sentido contrario al control. En aviones no asistidos hidráulicamente, el aerodinámico ayuda al piloto a mover la superficie grande.' },
              { term: 'Balance tab', def: 'Tab que mueve el aerodináfico para reducir la fuerza de mando. Puede ser mecánico (ligado geométricamente) o aerodinámico.' },
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Fly-By-Wire (FBW)</h3>
            <P>En los sistemas <strong>Fly-By-Wire</strong>, las superficies de control no están conectadas mecánicamente a los mandos del piloto. Las señales eléctricas van al ordenador de control de vuelo (FCMC/PRIM), que calcula la deflexión óptima y actúa los servos:</P>
            <DefList items={[
              { term: 'Ventajas', def: 'Protección de la envolvente de vuelo (impedimento automático de exceder α, g, velocidad). Optimización continua del trim. Reducción del peso del sistema de mandos. Mayor fiabilidad (redundancia eléctrica vs mecánica).' },
              { term: 'Redundancia', def: 'Los sistemas FBW de transporte civil tienen 3–4 canales de control independientes. A320: 7 computers (3 PRIM + 2 SEC + 2 FCDC). B777: 3 Primary Flight Computers + 3 ACEs (Actuator Control Electronics).' },
              { term: 'Certificación', def: 'EASA AMC 25.1309 exige una probabilidad de fallo catastrófico < 10⁻⁹ por hora de vuelo para sistemas FBW de transporte.' },
            ]} />
          </section>

          <Solved n="8.7.A" title="Deflexión de alerón y momento de alabeo">
            {{
              q: <P>Un A320 tiene alerones de envergadura efectiva b_ail = 4 m y distancia al eje de alabeo y = 6 m. A 250 kt (V = 128.6 m/s), ρ = 0.9 kg/m³, el coeficiente de momento de alabeo por grado de deflexión del alerón es ΔCl/Δδ = 0.003/°. El ala tiene S = 122.6 m² y b = 34 m. Si se deflecta el alerón 20°, calcula el momento de alabeo generado.</P>,
              a: <>
                <P>Coeficiente de momento de alabeo con 20° de deflexión:</P>
                <Eq>{'\\Delta C_l = 0.003 \\times 20 = 0.06'}</Eq>
                <P>Momento de alabeo:</P>
                <Eq>{'L_{roll} = \\frac{1}{2}\\rho V^2 S b \\Delta C_l = \\frac{1}{2}\\times0.9\\times128.6^2\\times122.6\\times34\\times0.06'}</Eq>
                <Eq>{'= 0.5\\times0.9\\times16538\\times122.6\\times34\\times0.06 = 1\\,977\\,000\\ \\text{N·m} \\approx 1.98\\ \\text{MN·m}'}</Eq>
                <P>Este enorme par de alabeo (casi 2 MN·m) demuestra por qué los actuadores hidráulicos de los alerones de un avión de transporte deben ser tan potentes, y por qué a alta velocidad solo se usan los alerones internos (menor brazo de momento, menor par y menor riesgo de torsión alar).</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la función del trim (compensador) en una superficie de control y cómo reduce la fatiga del piloto en vuelos largos?</P>,
              a: <><P><strong>R:</strong> El trim ajusta la posición neutral de la superficie de control de manera que el avión vuele en equilibrio sin que el piloto tenga que ejercer una fuerza continua en los mandos. Sin trim, el piloto debería sostener una fuerza constante (por ejemplo, hacia atrás en el stick para mantener la actitud de crucero si el CG está adelantado), causando fatiga muscular. El trim actúa como un pequeño control secundario que modifica el punto de equilibrio aerodinámico, liberando al piloto de esfuerzo mantenido.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué el B747 clásico tiene "alerones externos" (outboard ailerons) que se bloquean a alta velocidad y solo se usan con flaps extendidos?</P>,
              a: <><P><strong>R:</strong> Los alerones externos tienen un brazo de momento grande (lejos del fuselaje) → generan gran par, pero también grandes fuerzas aerodinámicas que torsionan el ala. A alta velocidad (ala rígida limitada en torsión), esta torsión puede causar "aileron reversal": el ala se tuerce en sentido contrario al deseado y el efecto es invertido (alabeo equivocado). Con flaps (baja velocidad), las cargas son menores y el reversal no ocurre. Los alerones internos, más cerca del fuselaje (estructura rígida), no generan esta torsión crítica.</P></>
            },
            {
              n: 3,
              q: <P>En el sistema FBW del A320, ¿qué es la "Normal Law" y cuáles son las protecciones que ofrece al piloto?</P>,
              a: <><P><strong>R:</strong> En Normal Law, los ordenadores PRIM interpretan los comandos del piloto como <strong>demandas de factor de carga</strong> (g), no como deflexiones directas de superficies. Las protecciones incluyen: (1) <strong>Alpha Protection</strong>: limita automáticamente el ángulo de ataque a α_max; (2) <strong>Alpha Floor</strong>: empuje a T/O automático si α supera un umbral crítico; (3) <strong>Load Factor Protection</strong>: limita a +2.5g/−1g; (4) <strong>Bank Angle Protection</strong>: limita el banco a 67° y restaura a 33° si el piloto suelta el sidestick; (5) <strong>Pitch Attitude Protection</strong>: limita cabeceo a +30°/−15°.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué ocurre con el control de la aeronave si el A320 degrada de Normal Law a Direct Law? ¿Cuándo ocurre esta degradación?</P>,
              a: <><P><strong>R:</strong> En <strong>Direct Law</strong>, los ordenadores transmiten directamente la posición del sidestick a la superficie de control (sin filtros de protección de envolvente). El piloto debe manejar el avión con sus habilidades reales, sin las protecciones automáticas. Ocurre si hay múltiples fallos de sistemas (tripla fallo de ADIRU, múltiples fallos de PRIM, etc.). El avión sigue siendo piloteable pero requiere mayor habilidad y atención del piloto, especialmente para no exceder los límites de la envolvente de vuelo.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué EASA exige una probabilidad de fallo catastrófico inferior a 10⁻⁹/hora de vuelo para los sistemas FBW? ¿Qué nivel de redundancia implica esto?</P>,
              a: <><P><strong>R:</strong> 10⁻⁹/h equivale a un fallo catastrófico cada 10⁹ horas de vuelo de la flota mundial. Con ~100 millones de horas de vuelo/año en aviación comercial, esto implica un fallo catastrófico cada 10 años en la flota global — un nivel de seguridad aceptable. Para lograr esta probabilidad con componentes individuales que fallan a 10⁻⁴–10⁻⁵/h, es necesario al menos <strong>triple redundancia independiente</strong> (3 canales) multiplicando las probabilidades: (10⁻⁴)³ = 10⁻¹². Con triple redundancia más un monitor (voter), se logra holgadamente el 10⁻⁹.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.8 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-08',
      title: '8.8 Limitaciones de velocidad',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">El diagrama V-n (envolvente de maniobra)</h3>
            <P>El diagrama V-n muestra los factores de carga (n) admisibles en función de la velocidad de vuelo. Define los límites estructurales de la aeronave:</P>
            <Table headers={['Velocidad', 'Denominación', 'Definición']} rows={[
              ['VS', 'Velocidad de pérdida', 'Mínima velocidad de vuelo nivelado. Varía con el peso.'],
              ['VA', 'Velocidad de maniobra (design maneuvering speed)', 'Máxima velocidad a la que se puede deflectar un control completamente sin dañar la estructura. VA = VS · √n_lim'],
              ['VB', 'Velocidad para turbulencia máxima', 'Velocidad de penetración en turbulencia severa (menor que VA en algunos aviones)'],
              ['VC / VMO', 'Velocidad de crucero / Máxima operativa', 'Velocidad normal de crucero. VMO: límite operativo de velocidad.'],
              ['VD / MMO', 'Velocidad de diseño en picado / Mach máx. op.', 'Velocidad máxima de la envolvente de diseño. 15–25% mayor que VMO/MMO'],
              ['VNE', 'Velocidad nunca exceder', 'Aviones no certificados FAR 25. Marcada en rojo en el ASI.'],
              ['VFE', 'Velocidad máxima con flaps extendidos', 'Los flaps sufren daños aerodinámicos si se sobrepasa.'],
              ['VLO / VLE', 'Velocidad maniobra tren / Extensión tren', 'Máxima velocidad para operar / volar con tren extendido.'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Factores de carga límite y últimos</h3>
            <Eq>{`Factor de carga límite:  n_lim  (100% de la carga de diseño)
Factor de carga último: n_ult = 1.5 · n_lim  (estructura no falla)

Categoría Normal (FAR/CS 23):  n = +3.8 / −1.52
Categoría Utility:              n = +4.4 / −1.76
Categoría Acrobática:           n = +6.0 / −3.0
Transporte (FAR/CS 25):         n = +2.5 / −1.0
Helicóptero (CS 29):            n = +3.5 / −1.0`}</Eq>
            <Warn>Superar el factor de carga límite no implica rotura inmediata (hay margen hasta n_ult) pero puede causar deformación permanente, inicio de grietas de fatiga o daños no visibles. Cualquier vuelo que exceda n_lim requiere una inspección de excedencia de carga (overload inspection) antes del siguiente vuelo.</Warn>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Flutter aeroelástico</h3>
            <P>El <strong>flutter</strong> es una oscilación autosostenida (divergente) que resulta del acoplamiento entre las deformaciones aeroelásticas de la estructura y las fuerzas aerodinámicas. Ocurre a partir de una velocidad crítica (velocidad de flutter, V_F):</P>
            <Eq>{`V_D (diseño en picado) > 1.2 · V_F  (margen de seguridad mínimo EASA)`}</Eq>
            <P>Para prevenir el flutter se utilizan: masas de balance en superficies de control (mass balance weights), estructuras rígidas en torsión y sistemas de monitorización de vibración. El análisis de flutter es obligatorio para la certificación de cualquier aeronave.</P>
          </section>

          <Solved n="8.8.A" title="Velocidad de maniobra VA y factor de carga límite">
            {{
              q: <P>Un avión de categoría Normal (CS-23) tiene Vs = 48 kt en configuración limpia y factor de carga límite n_lim = +3.8. (a) Calcula VA. (b) A 80 kt, ¿se puede deflectar bruscamente el elevador completamente sin riesgo estructural? (c) ¿Cuál es el n_ult?</P>,
              a: <>
                <P><strong>(a) Velocidad de maniobra:</strong></P>
                <Eq>{'V_A = V_s \\times \\sqrt{n_{lim}} = 48 \\times \\sqrt{3.8} = 48 \\times 1.949 = 93.6\\ \\text{kt}'}</Eq>
                <P><strong>(b) A 80 kt &lt; VA = 93.6 kt:</strong> <strong>Sí se puede deflectar</strong> el elevador completamente. Si el piloto aplica máximo cabeceo, el avión entrará en pérdida antes de alcanzar el factor de carga límite (el ala no puede generar suficiente sustentación para superar n_lim a esa velocidad). El ala protege la estructura.</P>
                <P><strong>(c) Factor de carga último:</strong></P>
                <Eq>{'n_{ult} = 1.5 \\times n_{lim} = 1.5 \\times 3.8 = 5.7'}</Eq>
                <P>La estructura no debe romperse hasta n = 5.7. Entre 3.8 y 5.7 puede haber deformación permanente pero no rotura catastrófica.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la diferencia entre VMO (Maximum Operating Speed) y VNE (Never Exceed Speed)? ¿Cuál aplica a los aviones certificados según CS-25?</P>,
              a: <><P><strong>R:</strong> <strong>VMO/MMO</strong> son los límites operativos de velocidad/Mach para aviones certificados según CS-25 (transporte). Los pilotos no deben superar VMO/MMO en operación normal. El sistema FBW del A320 impide superar VMO con los mandos. <strong>VNE</strong> aplica a aviones más ligeros (CS-23 Anexo A) y es la velocidad que nunca debe excederse bajo ninguna circunstancia (marcada en rojo en el ASI). En CS-25 no se usa VNE; se usa VD (velocidad de diseño en picado) que es el 115–125% de VMO.</P></>
            },
            {
              n: 2,
              q: <P>Un avión de acrobacia en una maniobra de pull-out (salida de picado) experimenta n = +4.5g. Los límites son +6g / −3g. ¿Requiere inspección tras el vuelo?</P>,
              a: <><P><strong>R:</strong> n = 4.5g &lt; n_lim = 6g → No se ha excedido el factor de carga límite → <strong>No requiere inspección de excedencia de carga</strong>. Si hubiera alcanzado o superado n_lim = 6g, se requeriría una inspección de estructura (overload inspection) antes del siguiente vuelo según el AMM del fabricante.</P></>
            },
            {
              n: 3,
              q: <P>¿Por qué la VFE (velocidad máxima con flaps extendidos) es significativamente menor que VMO? Describe los riesgos de superar VFE.</P>,
              a: <><P><strong>R:</strong> Los flaps están diseñados para bajas velocidades. Si se supera VFE: (1) <strong>Cargas aerodinámicas excesivas</strong> sobre los flaps → posible daño o avulsión de los flaps; (2) <strong>Cargas estructurales no certificadas</strong> en los rieles y actuadores de los flaps; (3) <strong>Sobrecarga de la estructura del ala</strong> (la distribución de presión con flaps no está diseñada para alta velocidad). El A320 tiene VFE diferentes para cada posición de flaps: flaps 1: VFE = 230 kt, flaps FULL: VFE = 177 kt.</P></>
            },
            {
              n: 4,
              q: <P>¿Qué es el flutter aeroelástico y cuáles son sus dos precondiciones físicas para que ocurra?</P>,
              a: <><P><strong>R:</strong> El flutter es una oscilación autosostenida (divergente) que ocurre cuando el trabajo realizado por las fuerzas aerodinámicas por ciclo de vibración es <strong>positivo</strong> (las fuerzas aerodinámicas amplifican la vibración en lugar de amortiguarla). Las dos precondiciones son: (1) <strong>Deformación elástica</strong>: la estructura debe ser suficientemente flexible para deformarse (flexión + torsión del ala); (2) <strong>Acoplamiento aerodinámico</strong>: la deformación debe modificar las fuerzas aerodinámicas de forma que alimenten la vibración. Por encima de V_flutter, la amortiguación aerodinámica es negativa → la vibración crece sin límite → rotura en segundos.</P></>
            },
            {
              n: 5,
              q: <P>Un A320 vuela a MMO = M 0.82. Si la velocidad del sonido a FL370 es 295 m/s, ¿cuál es la TAS (m/s y kt)? ¿Qué ocurre si el piloto desactiva el sistema de protección de velocidad y supera MMO?</P>,
              a: <><Eq>{'TAS = M \\times a = 0.82 \\times 295 = 241.9\\ \\text{m/s} = 470\\ \\text{kt}'}</Eq><P>Si se supera MMO: aparecen zonas de flujo supersónico local en el ala → ondas de choque → separación de la capa límite detrás del choque → <strong>Mach buffet</strong> (vibración), incremento brusco de resistencia, posible pérdida de eficiencia del timón (Mach tuck en aviones sin FBW) y riesgo de exceder VD/MD con posible daño estructural. El FBW del A320 impide fisicamente superar MMO en Normal Law.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.9 ──────────────────────────────────────────────────────────────────
    {
      id: 'm8-09',
      title: '8.9 Aerodinámica de alta velocidad',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Compresibilidad y número de Mach</h3>
            <P>A velocidades subsónicas moderadas (M inferior a 0.3–0.4), el aire puede tratarse como incompresible. A mayor velocidad, la compresibilidad del aire se vuelve significativa:</P>
            <Table headers={['Régimen', 'Mach', 'Características']} rows={[
              ['Subsónico', 'M < 0.75', 'Sin ondas de choque. C_D ≈ constante.'],
              ['Transsónico', '0.75 < M < 1.2', 'Aparecen zonas locales supersónicas y choques. C_D aumenta (drag divergence). Flujo muy complejo.'],
              ['Supersónico', '1.2 < M < 5', 'Ondas de choque adjuntas a la aeronave. Boom sónico.'],
              ['Hipersónico', 'M > 5', 'Efectos de disociación química. Reentrada orbital.'],
            ]} />
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Mach crítico y ondas de choque</h3>
            <Eq>{`M_crítico (M_cr): Mach del flujo libre al que aparecen
las primeras zonas de flujo local supersónico.
Típico ala de transporte sin flecha: M_cr ≈ 0.70–0.75

M_drag divergence (M_DD): Mach al que C_D aumenta bruscamente.
M_DD ≈ M_cr + 0.05–0.10

En el A320: VMO = 350 kt / MMO = 0.82
La ley de velocidad del FBW impide superar MMO`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Ala en flecha</h3>
            <P>La <strong>flecha alar</strong> (sweepback) incrementa el Mach crítico porque la componente de velocidad normal al borde de ataque es V·cos(Λ), siendo Λ el ángulo de flecha. Efectivamente reduce la velocidad relativa "vista" por el perfil:</P>
            <Eq>{`M_cr_flecha ≈ M_cr_recto / cos(Λ)
Λ = 35°: cos(35°) = 0.82 → aumento del 22% en M_cr`}</Eq>
            <P>La flecha también introduce inestabilidad lateral (diedro aerodinámico) y desplaza el centro de presión rearward con M, complicando el trim. Los aviones modernos usan alas de geometría supercrítica combinadas con la flecha para maximizar M_DD con mínima resistencia.</P>
          </section>

          <Solved n="8.9.A" title="Mach crítico y velocidad de crucero del A320">
            {{
              q: <P>El A320 tiene un ala supercrítica con flecha Λ = 25° y M_cr del perfil recto ≈ 0.70. (a) Estima el M_cr del ala en flecha. (b) MMO del A320 es M 0.82. ¿Hay margen entre M_cr estimado y MMO? (c) A FL350 (a = 295 m/s), ¿cuál es la TAS en crucero típico M 0.78?</P>,
              a: <>
                <P><strong>(a) M_cr con flecha:</strong></P>
                <Eq>{'M_{cr,flecha} \\approx \\frac{M_{cr,recto}}{\\cos\\Lambda} = \\frac{0.70}{\\cos 25°} = \\frac{0.70}{0.906} = 0.772'}</Eq>
                <P><strong>(b) Margen:</strong> M_cr ≈ 0.77 vs MMO = 0.82 → margen de 0.05 Mach. Este margen es necesario para evitar drag divergence a MMO. Los perfiles supercríticos modernos extienden adicionalmente M_DD a ~0.80, justificando MMO = 0.82.</P>
                <P><strong>(c) TAS en crucero M 0.78:</strong></P>
                <Eq>{'TAS = 0.78 \\times 295 = 230\\ \\text{m/s} = 447\\ \\text{kt}'}</Eq>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es el número de Mach y qué indica? Si el A320 vuela a TAS = 230 m/s a FL350 (a = 295 m/s), ¿cuál es su Mach?</P>,
              a: <><Eq>{'M = TAS/a = 230/295 = 0.78'}</Eq><P>El Mach es la relación entre la velocidad de vuelo y la velocidad del sonido en las mismas condiciones. M &lt; 1: subsónico; M = 1: sónico; M &gt; 1: supersónico.</P></>
            },
            {
              n: 2,
              q: <P>¿Por qué el Concorde necesitaba alas de delta sin flecha convencional para volar a M 2.04, mientras que el A320 usa alas en flecha?</P>,
              a: <><P><strong>R:</strong> A M 2, el ala en flecha convencional ya no puede elevar el M_cr suficientemente (incluso con Λ = 70°, se llega a ~M 1.1). El Concorde usó ala <strong>delta ogival</strong> (doble curvatura) con borde de ataque muy fino y afilado, que genera vórtices de borde de ataque a bajo coeficiente de arrastre en supersónico. A M 2, el ala delta es más eficiente que cualquier ala en flecha. El A320, diseñado para M 0.82, usa el ala en flecha porque es más eficiente en el régimen transsónico/subsónico de crucero comercial.</P></>
            },
            {
              n: 3,
              q: <P>¿Qué es el "drag divergence Mach" (M_DD) y cómo difiere del M_crítico? ¿En cuánto superan los perfiles supercríticos modernos al M_cr?</P>,
              a: <><P><strong>R:</strong> <strong>M_cr</strong> es el Mach al que aparece el primer punto de flujo local supersónico en el ala (C_D no cambia apreciablemente aún). <strong>M_DD</strong> es el Mach al que la resistencia aumenta bruscamente (generalmente definido como M donde dC_D/dM = 0.1). M_DD &gt; M_cr en 0.05–0.10. Los perfiles supercríticos modernos (Whitcomb) elevan M_DD en ~0.05–0.08 respecto a perfiles convencionales, gracias a su extradós aplanado que retarda la aparición del choque.</P></>
            },
            {
              n: 4,
              q: <P>Un avión supersónico militar vuela a M 1.8 a FL500. ¿En qué régimen aerodinámico opera? ¿Qué tipo de onda de choque se forma en el morro?</P>,
              a: <><P><strong>R:</strong> Opera en régimen <strong>supersónico</strong> (1.2 &lt; M &lt; 5). En el morro (nariz cónica o puntiaguda) se forma una <strong>onda de choque cónica oblicua</strong> (bow shock o cone shock). Esta onda forma un ángulo menor que 90° con la dirección de vuelo, y a diferencia del choque normal (que detiene el flujo a subsónico), el choque oblicuo solo reduce la velocidad y eleva la presión parcialmente. El "boom sónico" que se escucha en tierra es la intersección de esta onda con el suelo.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué los aviones de transporte comercial cruzan a M 0.78–0.85 en lugar de a velocidades mucho menores o mucho mayores? Relaciona con la resistencia de onda y el consumo.</P>,
              a: <><P><strong>R:</strong> Es el compromiso óptimo entre velocidad, eficiencia y resistencia. A menor M: el tiempo de vuelo aumenta, los costos de tripulación y mantenimiento se elevan, aunque el consumo de combustible por hora es menor. A mayor M (acercándose a M_DD ≈ 0.83–0.85): la resistencia de onda crece dramáticamente (C_D puede triplicarse), requiriendo mucho más empuje y combustible → el TSFC empeora drásticamente. El M óptimo de crucero (M 0.78–0.82) maximiza la productividad (velocidad × pasajeros) minimizando el consumo específico. Los motores turbofán también tienen su mejor TSFC en este rango de velocidades.</P></>
            },
          ]}/>
        </div>
      ),
    },
    // ── 8.10 ─────────────────────────────────────────────────────────────────
    {
      id: 'm8-10',
      title: '8.10 Aerodinámica del helicóptero',
      body: (
        <div className="course-ch-body">
          <section className="theory-section">
            <h3 className="theory-h3">Principio de sustentación del rotor</h3>
            <P>El rotor de un helicóptero es esencialmente un ala giratoria. Cada pala genera sustentación de la misma forma que un ala fija, pero la velocidad relativa del flujo varía a lo largo de la pala (mayor en la punta) y entre la pala que avanza y la que retrocede:</P>
            <Eq>{`Velocidad relativa en la pala:
v_pala(r) = ω · r  (solo en vuelo estacionario)
v_pala(r) = ω · r ± V_vuelo · sin(ψ)  (en avance)
ω  velocidad angular del rotor [rad/s]
r  radio desde el centro [m]
ψ  azimut de la pala [°]`}</Eq>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Disimetría de sustentación y compensación</h3>
            <P>En vuelo de avance, la pala que avanza (advancing blade) tiene mayor velocidad relativa y genera más sustentación que la pala que retrocede (retreating blade). Sin compensación, el helicóptero volaría con el lado de la pala que avanza levantado (<strong>disimetría de sustentación</strong>).</P>
            <P>La compensación se logra mediante la <strong>articulación de batimiento</strong> (flapping hinge): permite que la pala que avanza suba (reduciendo su ángulo de ataque efectivo) y la que retrocede baje (aumentando su ángulo de ataque), equilibrando la sustentación.</P>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Control del helicóptero</h3>
            <Table headers={['Control', 'Mando', 'Mecanismo']} rows={[
              ['Paso colectivo', 'Palanca colectiva (mano izq.)', 'Aumenta/reduce ángulo de ataque de todas las palas simultáneamente → sube/baja altitud'],
              ['Paso cíclico', 'Palanca cíclica (entre las piernas)', 'Varía el ángulo de pala cíclicamente → inclina el disco del rotor → movimiento horizontal'],
              ['Antipar (pedales)', 'Pedales de cola', 'Controla el par del rotor principal mediante el rotor de cola → guiñada'],
            ]} />
            <Note>El rotor de cola consume entre el 10–15% de la potencia del motor para compensar el par del rotor principal. Diseños alternativos como el NOTAR (No Tail Rotor, MD Helicopters) o los rotores coaxiales (Kamov) eliminan el rotor de cola con ventajas de seguridad y menor ruido.</Note>
          </section>
          <section className="theory-section">
            <h3 className="theory-h3">Autorotación</h3>
            <P>La <strong>autorotación</strong> es la maniobra de emergencia en la que el helicóptero desciende con el motor en avería manteniendo el rotor girando por el flujo de aire ascendente relativo. Permite un aterrizaje seguro sin motor:</P>
            <Eq>{`Velocidad de descenso en autorotación:
V_z ≈ 300–600 ft/min  (helicóptero ligero)
Al llegar al suelo: flare + aumento colectivo para frenar`}</Eq>
            <Warn>La autorotación requiere acción inmediata del piloto al fallar el motor: bajar el colectivo en menos de 2–3 segundos para evitar que el rotor pierda RPM. Un rotor con pocas RPM no puede generar sustentación suficiente para el flare final.</Warn>
          </section>

          <Solved n="8.10.A" title="Disimetría de sustentación en helicóptero en avance">
            {{
              q: <P>Un helicóptero vuela en avance a V_vuelo = 50 m/s. El rotor tiene ω = 25 rad/s y radio R = 6 m. Calcula la velocidad relativa en la punta de pala (a) en la posición de avance (ψ = 90°) y (b) en la posición de retroceso (ψ = 270°). Calcula la diferencia.</P>,
              a: <>
                <P>Velocidad en la punta por rotación:</P>
                <Eq>{'v_{rot} = \\omega \\times R = 25 \\times 6 = 150\\ \\text{m/s}'}</Eq>
                <P><strong>(a) Pala que avanza (ψ = 90°, velocidades se suman):</strong></P>
                <Eq>{'v_{avanza} = v_{rot} + V_{vuelo} = 150 + 50 = 200\\ \\text{m/s}'}</Eq>
                <P><strong>(b) Pala que retrocede (ψ = 270°, velocidades se restan):</strong></P>
                <Eq>{'v_{retrocede} = v_{rot} - V_{vuelo} = 150 - 50 = 100\\ \\text{m/s}'}</Eq>
                <P>Diferencia de velocidades: 200 − 100 = 100 m/s. Como la sustentación ∝ V², la pala que avanza genera (200/100)² = <strong>4 veces más sustentación</strong> que la que retrocede. Sin el articulado de batimiento, el helicóptero volaría con el lado de avance muy elevado.</P>
              </>
            }}
          </Solved>

          <Practice items={[
            {
              n: 1,
              q: <P>¿Cuál es la "zona de flujo reverso" en un rotor de helicóptero y en qué condición de vuelo es más crítica?</P>,
              a: <><P><strong>R:</strong> En la pala que retrocede, cerca de la raíz (r pequeño), la velocidad de la punta de pala hacia atrás puede ser menor que la velocidad de avance del helicóptero → el flujo sobre esa sección de pala es <strong>inverso</strong> (desde el borde de salida hacia el de ataque). Esta sección no genera sustentación útil. La zona de flujo reverso crece con la velocidad de avance. Es más crítica a alta velocidad de avance, donde puede abarcar una parte significativa del radio de la pala que retrocede, limitando la velocidad máxima del helicóptero (Vne).</P></>
            },
            {
              n: 2,
              q: <P>Explica los tres mandos del helicóptero (colectivo, cíclico y pedales) y cómo se usan en un despegue vertical.</P>,
              a: <><P><strong>R:</strong> En un despegue vertical: (1) <strong>Colectivo</strong> (mano izquierda) → se sube progresivamente para aumentar el ángulo de ataque de todas las palas simultáneamente → aumenta la sustentación del rotor hasta superar el peso; (2) <strong>Cíclico</strong> (entre piernas) → se mantiene neutro para que el disco del rotor esté horizontal y el helicóptero suba vertical sin desplazamiento; (3) <strong>Pedales</strong> → al aumentar el colectivo, el par del rotor principal también aumenta → se añade pedal (lado contrario al giro del rotor) para compensar el par con el rotor de cola y mantener la guiñada neutra.</P></>
            },
            {
              n: 3,
              q: <P>¿Cuánta potencia consume el rotor de cola de un helicóptero mediano y cómo afecta esto a la capacidad de carga útil?</P>,
              a: <><P><strong>R:</strong> El rotor de cola consume típicamente <strong>10–15% de la potencia total del motor</strong>. Para un helicóptero de 1000 kW, el rotor de cola absorbe 100–150 kW que no están disponibles para el rotor principal (sustentación + avance). Esto reduce directamente la carga útil máxima. Los diseños alternativos (NOTAR de MD Helicopters, rotores coaxiales de Kamov) eliminan este consumo, aumentando la eficiencia propulsiva y la carga útil en ~10–15%.</P></>
            },
            {
              n: 4,
              q: <P>¿Cuántos metros por segundo de velocidad de descenso vertical tiene un helicóptero ligero en autorotación y cuánto tiempo tiene el piloto desde el fallo del motor hasta el suelo si está a 300 m de altitud?</P>,
              a: <><P>Velocidad de descenso en autorotación ≈ 300–600 ft/min ≈ 1.5–3 m/s.</P><Eq>{'t = h/V_z = 300\\ \\text{m} / 2.5\\ \\text{m/s} = 120\\ \\text{s} = 2\\ \\text{min}'}</Eq><P>El piloto tiene aproximadamente 2 minutos para: reconocer el fallo, bajar el colectivo (&lt;2-3 s), seleccionar la zona de aterrizaje, posicionarse y realizar el flare final. Es una maniobra exigente pero practicable si se actúa inmediatamente.</P></>
            },
            {
              n: 5,
              q: <P>¿Por qué los helicópteros militares modernos (AH-64 Apache, NH90) usan rotores de palas de materiales compuestos en lugar de palas metálicas? Menciona ventajas específicas.</P>,
              a: <><P><strong>R:</strong> Las palas de materiales compuestos (CFRP/fibra de carbono + fibra de vidrio) ofrecen: (1) <strong>Mayor tolerancia a daños balísticos</strong>: un impacto de bala pequeño no se propaga catastróficamente como en el aluminio (el CFRP tiende a dañarse localmente); (2) <strong>Menor peso</strong>: densidad ~1.6 g/cm³ vs Al 2.7 g/cm³ → mayor carga útil; (3) <strong>Geometría aerodinámica optimizada</strong>: los compuestos permiten secciones de perfil variable, curvaturas complejas y twists imposibles de fabricar en metal; (4) <strong>Mayor fatiga life</strong>: sin los límites de ciclos de fatiga del metal → menor costo de mantenimiento (en helicópteros militares la vida de pala puede ser 10 000+ horas vs 3 000–5 000 h en metal).</P></>
            },
          ]}/>
        </div>
      ),
    },
  ],
};

export default m8;
