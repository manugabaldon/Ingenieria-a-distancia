import {
  CourseModule,
  Section, Sub, P, Eq, EqI, Fig, SvgFig, Grid,
  Example, Note, Warn, Concept, Aviation, DefList, Table, Summary,
  Solved, Practice,
} from '../CourseView';

import {
  DiagramFuerzas, DiagramPalanca, DiagramCinematica,
  DiagramCircular, DiagramBernoulli, DiagramBrayton,
  DiagramCalor, DiagramFibra, DiagramOnda,
} from '../CourseDiagrams';

// ── Unsplash images (aeronáutica + física) ───────────────────────────────────
const IMG = {
  materiales:  'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=900&q=80',
  estructura:  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
  fuerzas:     'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=900&q=80',
  palanca:     'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  pista:       'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=900&q=80',
  viraje:      'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=900&q=80',
  reactor:     'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=900&q=80',
  climbing:    'https://images.unsplash.com/photo-1583470790950-7da77b8e69c1?w=900&q=80',
  hidraulico:  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
  ala:         'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80',
  turbina:     'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=900&q=80',
  thermal:     'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=900&q=80',
  fibraOptica: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=900&q=80',
  ndt:         'https://images.unsplash.com/photo-1581091870621-1c5e3a40ae38?w=900&q=80',
};

const m2: CourseModule = {
  id: 'm2',
  code: 'M2',
  title: 'Física',
  subtitle: 'Mecánica, termodinámica y ondas',
  icon: '⚛',
  license: 'B1 · B2',
  description: 'Fundamentos de física aplicada a la aeronáutica. Exigido por EASA Part-66 para B1 y B2.',
  chapters: [

    // ════════════════════════════════════════════════════════════════
    // 2.1  LA MATERIA Y SUS PROPIEDADES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-01',
      title: '2.1 La materia y sus propiedades',
      body: (
        <>
          <Grid>
            <Fig src={IMG.materiales} alt="Materiales aeronáuticos" height={200}
              caption={<><strong>Figura 2.1</strong> Materiales compuestos de CFRP y aluminio en estructura aeronáutica. Los aviones modernos combinan sólidos metálicos con compuestos de fibra de carbono, y fluidos como el combustible y el aceite hidráulico.</>}
            />
            <Fig src={IMG.estructura} alt="Estructura de aeronave" height={200}
              caption={<><strong>Figura 2.2</strong> Sección transversal de ala en proceso de fabricación. El conocimiento de las propiedades de los materiales —densidad, resistencia, dilatación térmica— es fundamental para el técnico de mantenimiento.</>}
            />
          </Grid>

          <Section title="Estados de la materia">
            <P>La materia existe en cuatro estados fundamentales. Los tres relevantes en aeronáutica son:</P>
            <Table headers={['Estado', 'Forma', 'Volumen', 'Compresibilidad', 'Ejemplo aeronáutico']} rows={[
              ['Sólido', 'Propia', 'Propio', 'Casi nula', 'Estructura, fuselaje, tren de aterrizaje'],
              ['Líquido', 'Del recipiente', 'Propio', 'Muy baja', 'Combustible, aceite, fluido hidráulico'],
              ['Gas', 'Del recipiente', 'Del recipiente', 'Alta', 'Aire, gases de escape, N₂ (neumáticos)'],
            ]} />
          </Section>

          <Section title="Propiedades físicas fundamentales">
            <DefList items={[
              { term: 'Masa m  [kg]', def: 'Cantidad de materia. Invariante con la posición. No confundir con peso.' },
              { term: 'Peso W  [N]', def: <>Fuerza gravitatoria: <EqI>{'W = m \\cdot g'}</EqI>. Varía con g (menor en altitud). En aviación se usa con masa en W&B.</> },
              { term: 'Densidad ρ  [kg/m³]', def: <>Masa por unidad de volumen: <EqI>{'\\rho = m/V'}</EqI>. Agua: 1000 kg/m³. Aluminio 2024-T3: 2780 kg/m³. Acero inox: 7900 kg/m³.</> },
              { term: 'Densidad relativa (SG)', def: 'Cociente ρ_material / ρ_agua. Adimensional. Avgas: SG ≈ 0.72 (≈ 6 lb/US gal). Jet A-1: SG ≈ 0.80.' },
              { term: 'Presión p  [Pa]', def: <>Fuerza por unidad de área: <EqI>{'p = F/A'}</EqI>. 1 Pa = 1 N/m². 1 atm = 101 325 Pa = 14.7 psi = 29.92 inHg.</> },
              { term: 'Temperatura T  [K, °C]', def: 'Medida de la energía cinética media de las partículas. T[K] = T[°C] + 273.15. 0 K = cero absoluto.' },
            ]} />
          </Section>

          <Section title="Cambios de estado y calor latente">
            <P>Los cambios de estado ocurren a temperatura y presión constantes, absorbiendo o liberando <strong>calor latente</strong>:</P>
            <Eq>{`Q = m \\cdot L \\quad [\\text{J}] \\qquad L_{f,\\text{agua}} = 334 000\\ \\text{J/kg} \\qquad L_{v,\\text{agua}} = 2.26 \\times 10^6\\ \\text{J/kg}`}</Eq>
            <Warn>El congelamiento del agua en estructuras aeronáuticas es crítico: la expansión al congelarse (~9% de volumen) puede romper tuberías, bloquear válvulas y comprometer estructuras. Los fluidos hidráulicos y el combustible contienen aditivos anticongelantes.</Warn>
          </Section>

          <Summary items={[
            'Los tres estados de la materia en aviación: sólido (estructura), líquido (combustible/aceite) y gas (aire/escape).',
            'ρ = m/V [kg/m³]. El aluminio es 3× más ligero que el acero, por eso domina en estructuras aéreas.',
            'p = F/A [Pa]. 1 atm = 101 325 Pa = 14.7 psi = 29.92 inHg.',
            'El calor latente provoca cambios de estado sin variación de temperatura (fusión, vaporización).',
          ]} />

          <Solved n="2.1.A" title="Masa de combustible Jet A-1 en un depósito"
            q={<P>Un depósito de ala contiene <strong>650 litros</strong> de Jet A-1 (SG = 0,800). Calcular la masa en kg y el peso en N.</P>}
            a={<><Eq>{'\\rho = SG \\times \\rho_{agua} = 0.800 \\times 1000 = 800\\ \\text{kg/m}^3'}</Eq><Eq>{'m = \\rho \\cdot V = 800 \\times 0.650 = 520\\ \\text{kg} \\qquad W = mg = 520 \\times 9.81 = 5101\\ \\text{N}'}</Eq><P>El depósito pesa <strong>520 kg</strong> (≈ 1146 lb). Siempre verificar que el W&B permanece dentro de la envolvente con este peso añadido.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Una pieza de aluminio 2024-T3 tiene dimensiones 200 × 100 × 15 mm. Calcular su masa (ρ = 2780 kg/m³).</P>,
              hint: <span>Calcular el volumen en m³ primero.</span>,
              a: <><Eq>{'V = 0.200 \\times 0.100 \\times 0.015 = 3{,}0 \\times 10^{-4}\\ \\text{m}^3'}</Eq><Eq>{'m = 2780 \\times 3{,}0 \\times 10^{-4} = 0{,}834\\ \\text{kg} = 834\\ \\text{g}'}</Eq><P><strong>R: 834 g</strong></P></>,
            },
            {
              n: 2,
              q: <P>Convertir 1013,25 hPa a psi y a inHg. (1 atm = 14,696 psi = 29,921 inHg)</P>,
              a: <><P>1013,25 hPa = 1 atm → <strong>14,696 psi</strong> y <strong>29,921 inHg</strong></P></>,
            },
            {
              n: 3,
              q: <P>El punto de congelación del Jet A-1 es −47 °C. Convertirlo a Kelvin y a Fahrenheit.</P>,
              a: <><Eq>{'T[K] = -47 + 273.15 = 226.15\\ \\text{K}'}</Eq><Eq>{'T[°F] = (-47 \\times 1.8) + 32 = -52.6°F'}</Eq><P><strong>R: 226,15 K y −52,6 °F</strong></P></>,
            },
            {
              n: 4,
              q: <P>¿Por qué el agua al congelarse puede romper tuberías de aluminio? ¿Qué solución usa la industria aeronáutica?</P>,
              a: <P><strong>R:</strong> Al congelarse, el agua <em>aumenta</em> su volumen ~9 %. En una tubería cerrada, este aumento genera presiones que superan la resistencia del material. La industria añade <strong>aditivos anticongelantes</strong> al fluido hidráulico (Skydrol) y al combustible, y usa calefacción en las zonas críticas.</P>,
            },
            {
              n: 5,
              q: <P>Una pieza de titanio ocupa 500 cm³ y tiene una masa de 2250 g. ¿Es consistente con la densidad típica del titanio (ρ ≈ 4500 kg/m³)?</P>,
              a: <><Eq>{'\\rho = m/V = 2.250 / (500 \\times 10^{-6}) = 4500\\ \\text{kg/m}^3 \\checkmark'}</Eq><P><strong>R:</strong> Sí, coincide exactamente. El titanio es preferido en zonas calientes del motor porque pesa la mitad que el acero para la misma resistencia.</P></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.2  ESTÁTICA — FUERZAS Y EQUILIBRIO
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-02',
      title: '2.2 Estática — Fuerzas y equilibrio',
      body: (
        <>
          <Fig src={IMG.fuerzas} alt="Aeronave en viraje" height={200}
            caption={<><strong>Figura 2.3</strong> Las cuatro fuerzas del vuelo: Sustentación (L), Peso (W), Empuje (T) y Resistencia (D). En vuelo nivelado y constante, L = W y T = D. El análisis vectorial de estas fuerzas es la base de toda la aerodinámica.</>}
          />

          <Section title="Fuerza como vector">
            <P>Una fuerza es una magnitud vectorial definida por <strong>módulo, dirección y sentido</strong>. La unidad SI es el Newton (N): la fuerza que imprime a 1 kg una aceleración de 1 m/s².</P>
            <P><strong>Composición de fuerzas coplanares:</strong> la resultante se obtiene sumando vectorialmente. Para dos fuerzas F₁ y F₂ con ángulo α entre ellas:</P>
            <Eq>{'|R| = \\sqrt{F_1^2 + F_2^2 + 2F_1 F_2 \\cos\\alpha}'}</Eq>
            <P>Descomposición en componentes rectangulares (método más útil en la práctica):</P>
            <Eq>{'F_x = F \\cos\\theta \\qquad F_y = F \\sin\\theta \\\\ R_x = \\sum F_x \\qquad R_y = \\sum F_y \\\\ |R| = \\sqrt{R_x^2 + R_y^2} \\qquad \\theta_R = \\arctan\\left(\\frac{R_y}{R_x}\\right)'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.4</strong> Composición vectorial de dos fuerzas. F₁ (azul) y F₂ (rojo) se suman mediante el método del paralelogramo para obtener la resultante R (verde). Las líneas punteadas muestran las componentes rectangulares Rx y Ry.</>}>
            <DiagramFuerzas />
          </SvgFig>

          <Example n="2.1" title="Composición de fuerzas en un punto de anclaje"
            given={<P>Dos cables ejercen sobre un punto de anclaje: <EqI>{'F_1 = 800\\ \\text{N}'}</EqI> horizontal y <EqI>{'F_2 = 600\\ \\text{N}'}</EqI> a 90° (vertical). Calcular la resultante.</P>}
            solution={
              <>
                <Eq>{'|R| = \\sqrt{800^2 + 600^2} = \\sqrt{640000 + 360000} = \\sqrt{1000000} = 1000\\ \\text{N}'}</Eq>
                <Eq>{'\\theta_R = \\arctan\\left(\\frac{600}{800}\\right) = \\arctan(0.75) = 36.87°'}</Eq>
                <P>La resultante es 1000 N a 36.87° de la horizontal. La estructura de anclaje debe soportar 1000 N en esa dirección.</P>
              </>
            }
          />

          <Section title="Condiciones de equilibrio estático">
            <P>Un cuerpo está en <strong>equilibrio estático</strong> cuando la resultante de fuerzas y momentos es cero:</P>
            <Eq>{'\\sum \\vec{F} = 0 \\implies \\sum F_x = 0 \\text{ y } \\sum F_y = 0 \\qquad \\sum M = 0'}</Eq>
            <DefList items={[
              { term: 'Estable', def: 'Al perturbar, vuelve a la posición original. CG bajo el punto de apoyo. Un avión estable estáticamente tiende a volver al vuelo nivelado.' },
              { term: 'Inestable', def: 'Al perturbar, se aleja más. CG sobre el punto de apoyo. Requiere control activo (aviones de combate inestables aumentan la maniobrabilidad).' },
              { term: 'Indiferente', def: 'Al perturbar, se queda en la nueva posición. Esfera sobre plano horizontal.' },
            ]} />
          </Section>

          <Section title="Momento de una fuerza">
            <P>El momento (torque) de una fuerza F respecto a un punto O es el producto de la fuerza por la distancia perpendicular (brazo de momento):</P>
            <Eq>{'M = F \\cdot d \\qquad [\\text{N·m}]'}</Eq>
            <Note>El peso y centrado de una aeronave es aplicación directa: <EqI>{'M_{total} = \\sum (W_i \\cdot d_i)'}</EqI>, <EqI>{'CG = M_{total}/W_{total}'}</EqI>. Ver herramienta de Peso y Centrado.</Note>
          </Section>

          <Summary items={[
            'La fuerza es un vector: módulo, dirección y sentido. Unidad: Newton (N).',
            'Composición vectorial: Rx = ΣFx, Ry = ΣFy, |R| = √(Rx² + Ry²).',
            'Equilibrio estático: ΣF = 0 y ΣM = 0 simultáneamente.',
            'Momento = F × d (brazo perpendicular). Base del cálculo de peso y centrado.',
          ]} />

          <Solved n="2.2.A" title="Resultante aerodinámica — L y D"
            q={<P>Un ala genera <strong>L = 12 000 N</strong> (vertical) y <strong>D = 1500 N</strong> (horizontal hacia atrás). Calcular la resultante aerodinámica y su ángulo con la vertical.</P>}
            a={<><Eq>{'R = \\sqrt{L^2 + D^2} = \\sqrt{12000^2 + 1500^2} = \\sqrt{146250000} = 12093\\ \\text{N}'}</Eq><Eq>{'\\theta = \\arctan\\!\\left(\\frac{D}{L}\\right) = \\arctan\\!\\left(\\frac{1500}{12000}\\right) = 7.1°\\ \\text{de la vertical}'}</Eq><P>La resultante aerodinámica es <strong>12 093 N a 7,1° de la vertical</strong>. Este ángulo es la razón de planeo (L/D = 8 en este caso).</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Dos fuerzas actúan sobre un herraje: F₁ = 600 N a 0° (horizontal) y F₂ = 800 N a 90° (vertical). Calcular la resultante y su ángulo con la horizontal.</P>,
              a: <><Eq>{'R = \\sqrt{600^2 + 800^2} = 1000\\ \\text{N} \\qquad \\theta = \\arctan(800/600) = 53.1°'}</Eq><P><strong>R: 1000 N a 53,1° de la horizontal.</strong></P></>,
            },
            {
              n: 2,
              q: <P>Un avión de 18 000 N en vuelo nivelado tiene D = 8 % del peso. ¿Qué empuje mínimo necesita el motor?</P>,
              a: <><P>En vuelo nivelado: T = D = 0,08 × 18 000 = <strong>1440 N</strong>.</P></>,
            },
            {
              n: 3,
              q: <P>Una junta estructural soporta una tracción de 25 kN a 20° de la horizontal. Calcular las componentes Fx y Fy.</P>,
              a: <><Eq>{'F_x = 25000 \\cos 20° = 23490\\ \\text{N} \\qquad F_y = 25000 \\sin 20° = 8550\\ \\text{N}'}</Eq></>,
            },
            {
              n: 4,
              q: <P>Para calcular el CG de un avión se usan momentos. Si el motor (2000 N) está a 0,8 m del datum y el pasajero (750 N) a 2,1 m, ¿dónde queda el CG?</P>,
              hint: <span>CG = M_total / W_total</span>,
              a: <><Eq>{'CG = \\frac{2000 \\times 0.8 + 750 \\times 2.1}{2000 + 750} = \\frac{1600 + 1575}{2750} = \\frac{3175}{2750} = 1.155\\ \\text{m del datum}'}</Eq></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.3  ESTÁTICA — PALANCAS Y MÁQUINAS SIMPLES
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-03',
      title: '2.3 Estática — Palancas y máquinas simples',
      body: (
        <>
          <Fig src={IMG.palanca} alt="Sistema de mandos de vuelo" height={195}
            caption={<><strong>Figura 2.5</strong> Sistema de mandos de vuelo mecánicos. Las varillas de mando, los balancines y los cables actúan como palancas de distinto tipo para transmitir las entradas del piloto a las superficies de control, modificando la fuerza y el recorrido.</>}
          />

          <Section title="Principio de la palanca">
            <P>Una palanca está en equilibrio cuando la suma de momentos respecto al <strong>fulcro</strong> (punto de apoyo) es cero:</P>
            <Eq>{'F_{\\text{esfuerzo}} \\cdot d_{\\text{esf}} = F_{\\text{carga}} \\cdot d_{\\text{carga}} \\qquad VM = \\frac{F_{\\text{carga}}}{F_{\\text{esf}}} = \\frac{d_{\\text{esf}}}{d_{\\text{carga}}}'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.6</strong> Los tres tipos de palanca según la posición del fulcro (F) relativa al esfuerzo (E) y la carga (C). En aviación se utilizan los tres tipos en los sistemas de mandos de vuelo.</>}>
            <DiagramPalanca />
          </SvgFig>

          <Table headers={['Tipo', 'Posición del fulcro', 'VM', 'Ejemplo aeronáutico']} rows={[
            ['1ª clase', 'Entre esfuerzo y carga', 'Puede ser >1, =1 o <1', 'Balancín de mando de alerón'],
            ['2ª clase', 'Carga entre fulcro y esfuerzo', 'Siempre >1', 'Carretilla (no común en aviación)'],
            ['3ª clase', 'Esfuerzo entre fulcro y carga', 'Siempre <1 (amplifica movimiento)', 'Varilla de mando, musculatura del piloto'],
          ]} />

          <Section title="Plano inclinado, polea y engranajes">
            <Eq>{'\\text{Plano inclinado: } VM = L/h \\qquad F = W \\sin\\theta \\\\ \\text{Polea: } VM = \\text{núm. segmentos que soportan la carga} \\\\ \\text{Engranajes: } i = n_1/n_2 = Z_2/Z_1 = T_2/T_1'}</Eq>
            <Note>Las cajas de reducción de las hélices emplean engranajes epicíclicos para reducir las altas RPM del motor a RPM más bajas y eficientes en la hélice, manteniendo el par alto. Una relación típica es 2:1 (motor 2600 RPM → hélice 1300 RPM).</Note>
          </Section>

          <Example n="2.2" title="Cálculo de ventaja mecánica en balancín"
            given={<P>Un balancín (palanca 1ª clase) tiene brazo de esfuerzo 0.35 m y brazo de carga 0.12 m. ¿Cuánta fuerza debe ejercer el piloto para vencer una fuerza de 450 N en la superficie de control?</P>}
            solution={
              <>
                <Eq>{'VM = \\frac{d_{\\text{esf}}}{d_{\\text{carga}}} = \\frac{0.35}{0.12} = 2.92'}</Eq>
                <Eq>{'F_{\\text{esf}} = \\frac{F_{\\text{carga}}}{VM} = \\frac{450}{2.92} = 154\\ \\text{N}'}</Eq>
                <P>El piloto necesita solo 154 N, frente a los 450 N en la superficie. La palanca multiplica la fuerza 2.92 veces.</P>
              </>
            }
          />

          <Summary items={[
            'Principio de la palanca: F·d_esf = W·d_carga. VM = F_carga / F_esf.',
            '3 clases según posición del fulcro. En aviación se usan las 3 clases en los mandos de vuelo.',
            'Engranajes: i = n₁/n₂ = Z₂/Z₁. Reducción de RPM → aumento de par.',
          ]} />

          <Solved n="2.3.A" title="Caja reductora de hélice"
            q={<P>Un motor de pistón gira a <strong>2700 RPM</strong>. La caja reductora tiene relación 1,8:1. Calcular las RPM de la hélice y el par en el eje de la hélice si el motor entrega 150 N·m.</P>}
            a={<><Eq>{'n_{hélice} = \\frac{n_{motor}}{i} = \\frac{2700}{1.8} = 1500\\ \\text{RPM}'}</Eq><Eq>{'T_{hélice} = T_{motor} \\times i = 150 \\times 1.8 = 270\\ \\text{N·m}'}</Eq><P>La hélice gira a <strong>1500 RPM</strong> y recibe <strong>270 N·m</strong> de par (se multiplica el par al reducir RPM).</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un balancín (palanca 1ª clase) tiene brazos de 0,25 m y 0,10 m. Si la carga en el brazo corto es 500 N, ¿qué fuerza mínima hay que ejercer?</P>,
              a: <><Eq>{'F = 500 \\times \\frac{0.10}{0.25} = 200\\ \\text{N}'}</Eq><P><strong>R: 200 N</strong> — la palanca amplifica la fuerza 2,5 veces.</P></>,
            },
            {
              n: 2,
              q: <P>¿Qué tipo de palanca es el pedal del freno de un avión? ¿Tiene VM &gt; 1 o &lt; 1? Justifica.</P>,
              a: <P><strong>R:</strong> Es una palanca de <strong>2ª clase</strong> (la carga, el punto de presión del freno, está entre el fulcro y el esfuerzo del piloto). VM &gt; 1, amplifica la fuerza del piloto. Permite al piloto generar grandes fuerzas de frenado con un esfuerzo moderado.</P>,
            },
            {
              n: 3,
              q: <P>Un gato hidráulico tiene pistón pequeño de 2 cm² y pistón grande de 80 cm². Si se aplica 200 N en el pistón pequeño, ¿qué fuerza levanta el pistón grande?</P>,
              a: <><Eq>{'F_2 = F_1 \\times \\frac{A_2}{A_1} = 200 \\times \\frac{80}{2} = 8000\\ \\text{N}'}</Eq><P><strong>R: 8000 N</strong> (≈ 815 kg). Ventaja mecánica = 40.</P></>,
            },
            {
              n: 4,
              q: <P>Una caja de engranajes tiene piñón de 18 dientes y corona de 54 dientes. El piñón gira a 3000 RPM. ¿A qué velocidad gira la corona?</P>,
              a: <><Eq>{'n_2 = n_1 \\times \\frac{Z_1}{Z_2} = 3000 \\times \\frac{18}{54} = 1000\\ \\text{RPM}'}</Eq></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.4  CINEMÁTICA — MOVIMIENTO LINEAL
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-04',
      title: '2.4 Cinemática — Movimiento lineal',
      body: (
        <>
          <Fig src={IMG.pista} alt="Aeronave en carrera de despegue" height={195}
            caption={<><strong>Figura 2.7</strong> Aeronave en carrera de despegue. La aceleración es casi constante durante el rodaje (MRUA), hasta alcanzar la velocidad de rotación (Vr). El cálculo de la distancia de despegue aplica directamente las ecuaciones de MRUA.</>}
          />

          <Section title="Magnitudes cinemáticas">
            <DefList items={[
              { term: 'Posición x  [m]', def: 'Localización del móvil respecto a un origen.' },
              { term: 'Desplazamiento Δx  [m]', def: 'Variación de posición: Δx = x_f − x_i. Es un vector.' },
              { term: 'Velocidad v  [m/s]', def: <>Tasa de cambio de posición: <EqI>{'v = dx/dt'}</EqI>. Velocidad media: <EqI>{'v_m = \\Delta x / \\Delta t'}</EqI>.</> },
              { term: 'Aceleración a  [m/s²]', def: <>Tasa de cambio de velocidad: <EqI>{'a = dv/dt'}</EqI>.</> },
            ]} />
          </Section>

          <SvgFig caption={<><strong>Figura 2.8</strong> Gráficas x(t) y v(t) para MRU y MRUA. En el MRU, x(t) es lineal y v(t) es constante. En el MRUA, x(t) es parabólica y v(t) es lineal con pendiente igual a la aceleración. El área bajo v(t) representa el desplazamiento.</>}>
            <DiagramCinematica />
          </SvgFig>

          <Section title="MRU y MRUA">
            <Sub title="Movimiento Rectilíneo Uniforme (MRU — a = 0)">
              <Eq>{'x(t) = x_0 + v \\cdot t \\qquad v = \\text{constante}'}</Eq>
            </Sub>
            <Sub title="Movimiento Rectilíneo Uniformemente Acelerado (MRUA — a = constante)">
              <Eq>{'v(t) = v_0 + a \\cdot t \\\\ x(t) = x_0 + v_0 t + \\tfrac{1}{2}a t^2 \\\\ v^2 = v_0^2 + 2a\\Delta x \\qquad (\\text{sin tiempo})'}</Eq>
            </Sub>
          </Section>

          <Example n="2.3" title="Distancia de despegue"
            given={<P>Una aeronave acelera uniformemente desde reposo hasta <EqI>{'V_r = 70\\ \\text{kt} = 36.0\\ \\text{m/s}'}</EqI> con aceleración media <EqI>{'a = 2.5\\ \\text{m/s}^2'}</EqI>. ¿Cuánto tarda y qué pista necesita?</P>}
            solution={
              <>
                <Eq>{'t = \\frac{V_r - 0}{a} = \\frac{36.0}{2.5} = 14.4\\ \\text{s}'}</Eq>
                <Eq>{'d = \\frac{V_r^2}{2a} = \\frac{36.0^2}{2 \\times 2.5} = \\frac{1296}{5} = 259\\ \\text{m}'}</Eq>
                <P>La aeronave necesita 259 m de pista para alcanzar la velocidad de rotación en 14.4 s. A esto hay que añadir la distancia de rotación y ascenso hasta 35 ft (10.7 m) para obtener la TODR completa.</P>
              </>
            }
          />

          <Section title="Movimiento parabólico (proyectil)">
            <P>Composición de MRU horizontal y MRUA vertical (caída libre):</P>
            <Eq>{'x(t) = v_0 \\cos\\alpha \\cdot t \\\\ y(t) = v_0 \\sin\\alpha \\cdot t - \\tfrac{1}{2}g t^2 \\\\ R = \\frac{v_0^2 \\sin 2\\alpha}{g} \\quad (\\alpha = 45° \\to R_{\\max}) \\qquad H = \\frac{v_0^2 \\sin^2\\alpha}{2g}'}</Eq>
            <Aviation title="Aplicación aeronáutica">
              El tiro parabólico se aplica en: trayectorias de eyección de cargas (lanzamiento de auxilio), separación de etapas en cohetes y análisis de impactos en FOD (Foreign Object Damage). El cálculo de la distancia donde caerá un objeto desprendido de una aeronave en vuelo usa las ecuaciones de proyectil.
            </Aviation>
          </Section>

          <Summary items={[
            'MRU: x = x₀ + v·t (v constante, a = 0).',
            'MRUA: v = v₀ + a·t y x = x₀ + v₀t + ½at². La gráfica v(t) es una recta de pendiente a.',
            'v² = v₀² + 2a·Δx — muy útil cuando no se conoce el tiempo.',
            'Proyectil: movimiento independiente en x (MRU) e y (MRUA con a = −g).',
          ]} />

          <Solved n="2.4.A" title="Aterrizaje — carrera de frenado"
            q={<P>Un avión toca pista a <strong>Vref = 65 kt = 33,5 m/s</strong> y frena con deceleración media <strong>a = −2,8 m/s²</strong>. ¿Cuánto mide la carrera de aterrizaje hasta detenerse?</P>}
            a={<><Eq>{'v^2 = v_0^2 + 2a\\Delta x \\implies 0 = 33.5^2 + 2(-2.8)\\Delta x'}</Eq><Eq>{'\\Delta x = \\frac{33.5^2}{2 \\times 2.8} = \\frac{1122.25}{5.6} = 200\\ \\text{m}'}</Eq><P>La carrera de frenado es <strong>200 m</strong>. A esto hay que añadir la distancia de transición aire-tierra (flare) para obtener la LDR total.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un avión acelera en pista desde reposo con a = 3 m/s². ¿Qué velocidad alcanza tras 400 m de carrera? Dar el resultado en m/s y en kt (1 kt = 0,5144 m/s).</P>,
              hint: <span>Usa v² = v₀² + 2aΔx con v₀ = 0.</span>,
              a: <><Eq>{'v = \\sqrt{2 \\times 3 \\times 400} = \\sqrt{2400} = 49.0\\ \\text{m/s} = 95.2\\ \\text{kt}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>Un helicóptero sube verticalmente a velocidad constante de 4 m/s. ¿Qué altitud alcanza en 2 minutos?</P>,
              a: <><Eq>{'h = v \\cdot t = 4 \\times 120 = 480\\ \\text{m} \\approx 1575\\ \\text{ft}'}</Eq></>,
            },
            {
              n: 3,
              q: <P>Un avión cruza a 240 kt (TAS) en vuelo horizontal. ¿Cuántos minutos tarda en recorrer 100 NM?</P>,
              a: <><Eq>{'t = \\frac{d}{v} = \\frac{100\\ \\text{NM}}{240\\ \\text{kt}} = 0.417\\ \\text{h} = 25\\ \\text{min}'}</Eq></>,
            },
            {
              n: 4,
              q: <P>Se lanza un objeto desde un avión en vuelo nivelado a 300 m de altitud y 100 m/s de velocidad horizontal. ¿Qué distancia horizontal recorre hasta impactar?</P>,
              hint: <span>Tiempo de caída libre: h = ½gt²</span>,
              a: <><Eq>{'t = \\sqrt{2h/g} = \\sqrt{600/9.81} = 7.82\\ \\text{s}'}</Eq><Eq>{'x = v_x \\cdot t = 100 \\times 7.82 = 782\\ \\text{m}'}</Eq></>,
            },
            {
              n: 5,
              q: <P>¿Cuál es el espacio de frenado de un avión que toca pista a 55 m/s con deceleración de 3,5 m/s²? ¿Y el tiempo hasta detenerse?</P>,
              a: <><Eq>{'\\Delta x = v_0^2/(2a) = 55^2/7 = 432\\ \\text{m} \\qquad t = v_0/a = 55/3.5 = 15.7\\ \\text{s}'}</Eq></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.5  CINEMÁTICA — MOVIMIENTO CIRCULAR Y ROTACIÓN
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-05',
      title: '2.5 Cinemática — Movimiento circular y rotación',
      body: (
        <>
          <Fig src={IMG.viraje} alt="Aeronave en viraje coordinado" height={195}
            caption={<><strong>Figura 2.9</strong> Aeronave en viraje coordinado. El ala inclinada produce la componente horizontal de la sustentación que proporciona la fuerza centrípeta necesaria para el giro. El ángulo de banco φ determina el factor de carga n.</>}
          />

          <Section title="Magnitudes angulares">
            <DefList items={[
              { term: 'Ángulo θ  [rad]', def: 'θ = s/r (arco/radio). 1 vuelta = 2π rad = 360°.' },
              { term: 'Velocidad angular ω  [rad/s]', def: <>{'ω = dθ/dt = 2πf = 2πn/60'}, donde n está en RPM.</> },
              { term: 'Aceleración angular α  [rad/s²]', def: <>{'α = dω/dt'}.</> },
            ]} />
            <P>Relación con magnitudes lineales (r = radio):</P>
            <Eq>{'v_t = \\omega r \\qquad a_t = \\alpha r \\qquad a_c = \\omega^2 r = v^2/r \\quad (\\text{centrípeta, hacia el centro})'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.10</strong> Movimiento circular de una aeronave en viraje. El vector velocidad v es siempre tangente a la trayectoria. La aceleración centrípeta ac apunta hacia el centro del giro. El factor de carga n = 1/cosφ.</>}>
            <DiagramCircular />
          </SvgFig>

          <Section title="Factor de carga en viraje coordinado">
            <P>En un viraje coordinado con ángulo de banco φ:</P>
            <Eq>{'n = \\frac{L}{W} = \\frac{1}{\\cos\\varphi} \\qquad F_c = W \\tan\\varphi \\qquad R = \\frac{v^2}{g \\tan\\varphi}'}</Eq>
            <Table headers={['φ (banco)', 'n (factor carga)', 'Fc / W', 'R (radio con v = 100 kt)']} rows={[
              ['0°', '1.00g', '0', '∞'],
              ['30°', '1.15g', '0.58', '7900 m'],
              ['45°', '1.41g', '1.00', '3900 m'],
              ['60°', '2.00g', '1.73', '1950 m'],
              ['75°', '3.86g', '3.73', '800 m'],
            ]} />
            <Warn>Los aviones de aviación general están certificados para +3.8g/−1.52g (categoría Normal). Superar los límites puede causar daño permanente por fatiga aunque no sea inmediatamente visible. Requiere inspección según AMM.</Warn>
          </Section>

          <Section title="Par e inercia de rotación">
            <Eq>{'M = I \\cdot \\alpha \\qquad (\\text{análogo rotacional de } F = ma) \\\\ I = \\sum m_i r_i^2 \\quad \\text{Disco: } I = \\tfrac{1}{2}mR^2 \\quad \\text{Cilindro hueco: } I = \\tfrac{1}{2}m(R_1^2+R_2^2)'}</Eq>
            <Note>El momento de inercia de los rotores de turbina es importante para calcular los tiempos de aceleración. Un rotor con gran I tarda más en responder a cambios de potencia (lag de motor), crítico en procedimientos de go-around donde se necesita potencia máxima rápidamente.</Note>
          </Section>

          <Summary items={[
            'ω = 2πn/60 [rad/s]. vt = ω·r. ac = v²/r = ω²r (centrípeta, hacia el centro).',
            'En viraje: n = 1/cosφ. A 60° de banco: n = 2g. A 75°: n = 3.86g.',
            'M = I·α (análogo rotacional de F = ma). I = ½mR² para disco macizo.',
          ]} />

          <Solved n="2.5.A" title="Radio de viraje y factor de carga"
            q={<P>Un avión vuela a <strong>180 kt TAS = 92,6 m/s</strong> en viraje coordinado a <strong>φ = 45°</strong>. Calcular el radio de giro y el factor de carga.</P>}
            a={<><Eq>{'n = 1/\\cos 45° = 1/0.707 = 1.41\\ g'}</Eq><Eq>{'R = \\frac{v^2}{g\\tan\\varphi} = \\frac{92.6^2}{9.81 \\times \\tan 45°} = \\frac{8574.8}{9.81} = 874\\ \\text{m}'}</Eq><P>Radio de viraje = <strong>874 m</strong>. Factor de carga = <strong>1,41 g</strong>. Los ocupantes sienten un peso aparente 41% mayor al normal.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un motor de turbina gira a 15 000 RPM. Convertir a rad/s y calcular la velocidad tangencial en el extremo de un álabe de radio r = 0,30 m.</P>,
              a: <><Eq>{'\\omega = 2\\pi \\times 15000/60 = 1571\\ \\text{rad/s} \\qquad v_t = \\omega r = 1571 \\times 0.30 = 471\\ \\text{m/s}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>Un avión de 2500 kg realiza un viraje coordinado a 60° de banco a 150 kt. ¿Cuánta sustentación extra debe generar respecto al vuelo nivelado?</P>,
              a: <><Eq>{'n = 1/\\cos 60° = 2 \\implies L = n \\times W = 2 \\times 24525 = 49050\\ \\text{N}'}</Eq><P>La sustentación extra es: 49 050 − 24 525 = <strong>24 525 N</strong> (el doble del peso).</P></>,
            },
            {
              n: 3,
              q: <P>Un rotor de helicóptero tiene I = 120 kg·m². Si el motor aplica un par M = 360 N·m neto, ¿cuánto tarda en pasar de 0 a 300 RPM?</P>,
              hint: <span>α = M/I; luego ω final / α = t</span>,
              a: <><Eq>{'\\alpha = M/I = 360/120 = 3\\ \\text{rad/s}^2 \\qquad \\omega_f = 2\\pi \\times 300/60 = 31.4\\ \\text{rad/s}'}</Eq><Eq>{'t = \\omega_f/\\alpha = 31.4/3 = 10.5\\ \\text{s}'}</Eq></>,
            },
            {
              n: 4,
              q: <P>¿A qué ángulo de banco máximo puede virar un avión certificado en categoría Normal (n_max = +3,8 g)?</P>,
              a: <><Eq>{'\\cos\\varphi = 1/n = 1/3.8 \\implies \\varphi = \\arccos(0.263) = 74.8°'}</Eq><P><strong>R: ≈ 75° de banco</strong> es el límite estructural en categoría Normal.</P></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.6  DINÁMICA — LEYES DE NEWTON
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-06',
      title: '2.6 Dinámica — Leyes de Newton',
      body: (
        <>
          <Fig src={IMG.reactor} alt="Motor a reacción con gases de escape" height={195}
            caption={<><strong>Figura 2.11</strong> Motor a reacción expulsando gases. La 3ª Ley de Newton es el principio de funcionamiento: los gases se expulsan hacia atrás con gran momento, y la aeronave recibe la reacción hacia adelante (empuje). Este es el fundamento de la propulsión a reacción.</>}
          />

          <Section title="Las tres leyes de Newton">
            <Concept title="1ª Ley — Inercia">
              Todo cuerpo permanece en reposo o en movimiento rectilíneo uniforme si la fuerza resultante es nula. La inercia es la resistencia al cambio de estado. En aviación: un avión en vuelo nivelado y uniforme tiene ΣF = 0.
            </Concept>
            <Eq>{'\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{constante}'}</Eq>

            <Concept title="2ª Ley — Ley Fundamental de la Dinámica">
              La fuerza neta sobre un cuerpo es igual a su masa por su aceleración. Es la herramienta de cálculo central de la mecánica.
            </Concept>
            <Eq>{'\\vec{F} = m \\cdot \\vec{a} \\qquad [\\text{N} = \\text{kg} \\cdot \\text{m/s}^2]'}</Eq>

            <Concept title="3ª Ley — Acción y Reacción">
              Para cada fuerza de acción existe una fuerza de reacción igual en módulo, opuesta en sentido, de la misma naturaleza. Base del vuelo a reacción: los gases expulsados hacia atrás crean el empuje hacia adelante.
            </Concept>
            <Eq>{'\\vec{F}_{12} = -\\vec{F}_{21}'}</Eq>
          </Section>

          <Section title="Cantidad de movimiento e impulso">
            <Eq>{'\\vec{p} = m \\vec{v} \\quad [\\text{kg·m/s}] \\qquad J = F \\Delta t = \\Delta p \\quad [\\text{N·s}]'}</Eq>
            <P>Conservación del momento: si <EqI>{'\\sum F_{ext} = 0 \\Rightarrow p_{total} = \\text{constante}'}</EqI>.</P>
            <Aviation title="Impulso y empuje en motores a reacción">
              El empuje de un motor a reacción se calcula con la variación de momento del fluido de trabajo: <EqI>{'T = \\dot{m}(v_{salida} - v_{entrada})'}</EqI>. Un motor con <EqI>{'\\dot{m} = 100\\ \\text{kg/s}'}</EqI> y diferencia de velocidad de 300 m/s produce 30 000 N (≈ 6 740 lbf) de empuje.
            </Aviation>
          </Section>

          <Section title="Rozamiento">
            <Eq>{'F_r = \\mu \\cdot N \\qquad \\mu_s > \\mu_k \\quad (\\text{estático} > \\text{cinético})'}</Eq>
            <Table headers={['Superficies', 'μs típico', 'Aplicación aeronáutica']} rows={[
              ['Goma-asfalto seco', '0.7–0.8', 'Frenado en pista seca — distancia normal'],
              ['Goma-asfalto mojado', '0.4–0.5', 'Pista húmeda — riesgo de aquaplaning'],
              ['Goma-hielo', '0.05–0.10', 'Pista contaminada — SNOWTAM / NOTAM'],
              ['Metal-metal (sin lubricar)', '0.3–0.5', 'Diseño de trenes y frenos'],
            ]} />
          </Section>

          <Example n="2.4" title="Empuje necesario para el despegue"
            given={<P>Avión de 1500 kg debe acelerar a <EqI>{'a = 2.5\\ \\text{m/s}^2'}</EqI>. La resistencia aerodinámica durante el rodaje es 800 N. ¿Qué empuje mínimo necesita?</P>}
            solution={
              <>
                <Eq>{'F_{neta} = m \\cdot a = 1500 \\times 2.5 = 3750\\ \\text{N}'}</Eq>
                <Eq>{'T_{min} = F_{neta} + D = 3750 + 800 = 4550\\ \\text{N}'}</Eq>
                <P>El motor debe producir al menos 4550 N de empuje para garantizar la aceleración requerida.</P>
              </>
            }
          />

          <Summary items={[
            '1ª Ley: sin fuerza neta, v = constante (reposo o MRU).',
            '2ª Ley: F = m·a. Base de todos los cálculos de dinámica.',
            '3ª Ley: acción = −reacción. Fundamento de la propulsión a reacción.',
            'Impulso J = F·Δt = Δp. Empuje en chorro: T = ṁ·Δv.',
          ]} />

          <Solved n="2.6.A" title="Deceleración en frenado de emergencia"
            q={<P>Un avión de <strong>12 000 kg</strong> aterriza a 70 m/s y se detiene en <strong>900 m</strong> con frenado máximo. Calcular la fuerza media de frenado.</P>}
            a={<><Eq>{'v^2 = v_0^2 + 2a\\Delta x \\implies a = \\frac{0 - 70^2}{2 \\times 900} = \\frac{-4900}{1800} = -2.72\\ \\text{m/s}^2'}</Eq><Eq>{'F_{freno} = m|a| = 12000 \\times 2.72 = 32640\\ \\text{N} \\approx 32.6\\ \\text{kN}'}</Eq><P>La fuerza de frenado equivale a <strong>3,33 toneladas de fuerza</strong>. Por eso los frenos de las aeronaves usan discos de carbono/carbono con refrigeración activa.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un turbofán expulsa 280 kg/s de gases a 450 m/s. El aire entra a 80 m/s. Calcular el empuje bruto del motor.</P>,
              a: <><Eq>{'T = \\dot{m}(v_{salida} - v_{entrada}) = 280 \\times (450 - 80) = 280 \\times 370 = 103600\\ \\text{N} \\approx 103.6\\ \\text{kN}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>Un avión de 9000 kg debe acelerar de 0 a 80 m/s en 35 s. La resistencia en tierra es 2000 N. ¿Qué empuje necesita?</P>,
              a: <><Eq>{'a = 80/35 = 2.29\\ \\text{m/s}^2 \\qquad T = ma + D = 9000 \\times 2.29 + 2000 = 20610 + 2000 = 22610\\ \\text{N}'}</Eq></>,
            },
            {
              n: 3,
              q: <P>¿Por qué los aviones de combate FBW son intencionadamente <em>inestables</em> estáticamente? ¿Qué ventaja operacional tiene?</P>,
              a: <P><strong>R:</strong> Un avión inestable responde más rápido a los mandos (menor inercia de corrección). El FBW compensa la inestabilidad a 50-200 veces por segundo, permitiendo maniobras imposibles con diseños estables. Mejora la maniobrabilidad combat.</P>,
            },
            {
              n: 4,
              q: <P>Un pájaro de 2,5 kg choca con el parabrisas a 90 m/s relativa. El parabrisas lo detiene en 8 ms. Calcular la fuerza media del impacto.</P>,
              hint: <span>F = Δp / Δt</span>,
              a: <><Eq>{'F = \\frac{m \\Delta v}{\\Delta t} = \\frac{2.5 \\times 90}{0.008} = 28125\\ \\text{N} \\approx 28.1\\ \\text{kN}'}</Eq><P>¡Equivalente a 2,87 toneladas de fuerza durante 8 ms. Por eso los parabrisas certificados resisten impactos de 1,8 kg a 300 kt (CS 25.631).</P></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.7  TRABAJO, ENERGÍA Y POTENCIA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-07',
      title: '2.7 Trabajo, energía y potencia',
      body: (
        <>
          <Fig src={IMG.climbing} alt="Aeronave trepando" height={195}
            caption={<><strong>Figura 2.12</strong> Aeronave en ascenso. Durante el climb, el motor convierte energía química (combustible) en energía mecánica: parte en energía cinética (velocidad) y parte en energía potencial (altitud). La eficiencia de esta conversión define el rendimiento del motor.</>}
          />

          <Section title="Trabajo mecánico">
            <Eq>{'W = F \\cdot d \\cdot \\cos\\theta \\quad [\\text{J} = \\text{N·m}] \\qquad \\theta = 90° \\Rightarrow W = 0 \\text{ (fuerza centrípeta)}'}</Eq>
          </Section>

          <Section title="Energía mecánica">
            <DefList items={[
              { term: 'Ec (cinética)', def: <>Energía del movimiento: <EqI>{'E_c = \\tfrac{1}{2}mv^2'}</EqI>. Duplicar velocidad → cuadruplicar Ec. Relevante en análisis de impactos (bird strike, FOD).</> },
              { term: 'Ep (potencial gravitatoria)', def: <>Energía almacenada por posición: <EqI>{'E_p = mgh'}</EqI>. Base del vuelo planeado: altitud se convierte en velocidad.</> },
              { term: 'Ep (elástica)', def: <>Energía almacenada por deformación: <EqI>{'E_p = \\tfrac{1}{2}kx^2'}</EqI>. Amortiguadores de tren, muelles de válvulas.</> },
            ]} />
            <Eq>{'E_c + E_p = \\text{constante} \\quad (\\text{sin rozamiento}) \\\\ \\tfrac{1}{2}mv^2 + mgh = \\text{constante}'}</Eq>
          </Section>

          <Example n="2.5" title="Velocidad en el impacto — análisis de bird strike"
            given={<P>Un pájaro de <EqI>{'m = 1.8\\ \\text{kg}'}</EqI> vuela a la misma altitud que una aeronave a <EqI>{'v_{rel} = 250\\ \\text{kt} = 128.6\\ \\text{m/s}'}</EqI> de velocidad relativa. ¿Qué energía cinética representa el impacto?</P>}
            solution={
              <>
                <Eq>{'E_c = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2} \\times 1.8 \\times 128.6^2 = 14\\ 890\\ \\text{J} \\approx 14.9\\ \\text{kJ}'}</Eq>
                <P>¡Equivalente a la energía de un objeto de 1 ton cayendo desde 850 m! Por eso las estructuras aeronáuticas deben certificarse para resistir impactos de aves según JAR/CS 25.631.</P>
              </>
            }
          />

          <Section title="Potencia y rendimiento">
            <Eq>{'P = W/t = F \\cdot v \\quad [\\text{W}] \\\\ 1\\ \\text{HP} = 745.7\\ \\text{W} \\qquad 1\\ \\text{CV} = 735.5\\ \\text{W} \\qquad \\eta = \\frac{P_{\\text{útil}}}{P_{\\text{entrada}}} \\times 100\\%'}</Eq>
            <Aviation title="Potencia en turbohélice">
              Un motor turbohélice de 1000 SHP (Shaft HorsePower) produce 746 kW en el eje. Con rendimiento de hélice del 85%, entrega 634 kW de potencia de empuje. La potencia disponible decrece con la altitud porque el aire es menos denso.
            </Aviation>
          </Section>

          <Summary items={[
            'W = F·d·cosθ [J]. Si θ = 90°, el trabajo es cero (ej.: fuerza centrípeta).',
            'Ec = ½mv². Ep = mgh. En ausencia de rozamiento, Ec + Ep = constante.',
            'P = W/t = F·v [W]. 1 HP = 745.7 W.',
            'η = P_útil / P_entrada × 100%. Ninguna máquina real tiene η = 100%.',
          ]} />

          <Solved n="2.7.A" title="Trabajo para subir a nivel de crucero"
            q={<P>Un avión de <strong>m = 70 000 kg</strong> sube desde el nivel del mar hasta <strong>FL350 (10 668 m)</strong>. Calcular el trabajo contra la gravedad y la potencia media si el ascenso dura <strong>25 min</strong>.</P>}
            a={<><Eq>{'W_{grav} = mgh = 70000 \\times 9.81 \\times 10668 = 7.32 \\times 10^9\\ \\text{J} = 7.32\\ \\text{GJ}'}</Eq><Eq>{'P_{media} = W/t = \\frac{7.32 \\times 10^9}{25 \\times 60} = 4.88 \\times 10^6\\ \\text{W} = 4.88\\ \\text{MW}'}</Eq><P>La potencia gravitacional media es <strong>4,88 MW</strong>. El motor produce mucha más potencia total — la diferencia cubre la energía cinética, las pérdidas aerodinámicas y el consumo de combustible.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un motor de pistón de 180 HP (caballos de vapor) tiene rendimiento propulsivo del 78 %. ¿Cuánta potencia útil entrega al eje de la hélice en kW?</P>,
              a: <><Eq>{'P_{útil} = 180 \\times 745.7 \\times 0.78 = 180 \\times 581.6 = 104690\\ \\text{W} \\approx 104.7\\ \\text{kW}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>¿Cuánta energía cinética tiene un avión de 8500 kg volando a 250 kt (128,6 m/s)?</P>,
              a: <><Eq>{'E_c = \\tfrac{1}{2}mv^2 = 0.5 \\times 8500 \\times 128.6^2 = 70.3\\ \\text{MJ}'}</Eq></>,
            },
            {
              n: 3,
              q: <P>Un avión planeador desciende desde 2000 m a 0 m sin motor. Si su masa es 600 kg y su eficiencia aerodinámica (L/D) es 35:1, ¿cuántos km puede planear?</P>,
              hint: <span>Ep inicial = mgh; distancia = altitud × L/D</span>,
              a: <><P>Distancia = 2000 m × 35 = <strong>70 km</strong>. La energía potencial se convierte completamente en trabajo contra la resistencia aerodinámica.</P></>,
            },
            {
              n: 4,
              q: <P>El tubo pitot de un avión consume 100 W para calefacción en vuelo durante 4 horas. ¿Cuánta energía en Wh y en J consume? ¿Qué corriente toma del bus de 28 V?</P>,
              a: <><Eq>{'E = 100 \\times 4 = 400\\ \\text{Wh} = 1.44\\ \\text{MJ} \\qquad I = P/V = 100/28 = 3.57\\ \\text{A}'}</Eq></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.8  PRESIÓN E HIDROSTÁTICA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-08',
      title: '2.8 Presión e hidrostática',
      body: (
        <>
          <Fig src={IMG.hidraulico} alt="Sistema hidráulico aeronáutico" height={195}
            caption={<><strong>Figura 2.13</strong> Actuador hidráulico de superficie de control. El fluido a alta presión transmite la fuerza mediante el Principio de Pascal, multiplicando enormemente la fuerza aplicada por el sistema de control. Los sistemas modernos operan a 3000–5000 psi.</>}
          />

          <Section title="Presión en fluidos estáticos">
            <Eq>{'p = F/A \\quad [\\text{Pa}] \\qquad p_{hidrostática} = p_0 + \\rho g h'}</Eq>
            <Concept title="Principio de Pascal">
              Una presión aplicada en cualquier punto de un fluido confinado incompresible se transmite íntegramente e igualmente a todos los puntos del fluido. Base de los sistemas hidráulicos aeronáuticos.
            </Concept>
          </Section>

          <Section title="Sistemas hidráulicos — amplificación de Pascal">
            <Eq>{'\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\cdot \\frac{A_2}{A_1}'}</Eq>
            <Example n="2.6" title="Amplificación hidráulica en actuador"
              given={<P>Un sistema hidráulico tiene presión de 3000 psi (207 bar = 20.7 MPa). El actuador del alerón tiene un émbolo de <EqI>{'A = 8\\ \\text{cm}^2 = 8 \\times 10^{-4}\\ \\text{m}^2'}</EqI>. ¿Qué fuerza ejerce?</P>}
              solution={
                <>
                  <Eq>{'F = p \\cdot A = 20.7 \\times 10^6 \\times 8 \\times 10^{-4} = 16\\ 560\\ \\text{N} \\approx 1\\ 690\\ \\text{kgf}'}</Eq>
                  <P>El actuador ejerce más de 1.7 toneladas de fuerza sobre la superficie de control, permitiendo gobernar incluso a altas velocidades.</P>
                </>
              }
            />
            <P>Los sistemas hidráulicos aeronáuticos operan a <strong>3000 psi</strong> (207 bar) en sistemas convencionales y hasta <strong>5000 psi</strong> (345 bar) en sistemas modernos (A380, B787). El fluido es Skydrol (éster fosfato) o aceite MIL-H-5606.</P>
            <Warn>Skydrol es corrosivo para la piel y los ojos. El contacto requiere EPI (guantes de nitrilo, gafas). Incompatible con fluidos hidráulicos minerales — nunca mezclar. El AMM especifica el fluido admisible.</Warn>
          </Section>

          <Section title="Principio de Arquímedes">
            <Eq>{'E = \\rho_{fluido} \\cdot g \\cdot V_{sumergido} \\quad [\\text{N}] \\qquad \\text{Flota si } E \\geq W \\Rightarrow \\rho_{cuerpo} \\leq \\rho_{fluido}'}</Eq>
            <Note>Aerostática: un globo flota cuando el peso del volumen de aire desplazado supera al peso total. Helio: ρ = 0.164 kg/m³ vs aire: ρ = 1.225 kg/m³ → empuje neto ≈ 1.06 N/m³. Para 1 ton de payload se necesitan ~943 m³ de helio.</Note>
          </Section>

          <Summary items={[
            'p = F/A [Pa]. La presión hidrostática aumenta con la profundidad: p = p₀ + ρgh.',
            'Pascal: la presión se transmite íntegramente en un fluido confinado → F₂ = F₁·(A₂/A₁).',
            'Sistemas hidráulicos: 3000–5000 psi. Fluido Skydrol (incompatible con aceites minerales).',
            'Arquímedes: empuje = ρ_fluido·g·V_sumergido. El cuerpo flota si ρ_cuerpo ≤ ρ_fluido.',
          ]} />

          <Solved n="2.8.A" title="Sistema hidráulico — cálculo de fuerza"
            q={<P>El sistema hidráulico del tren de aterrizaje opera a <strong>3000 psi = 207 bar</strong>. El cilindro hidráulico tiene diámetro de <strong>6 cm</strong>. Calcular la fuerza máxima que ejerce el actuador.</P>}
            a={<><Eq>{'A = \\pi r^2 = \\pi \\times (0.03)^2 = 2.827 \\times 10^{-3}\\ \\text{m}^2'}</Eq><Eq>{'F = p \\times A = 20.7 \\times 10^6 \\times 2.827 \\times 10^{-3} = 58518\\ \\text{N} \\approx 58.5\\ \\text{kN}'}</Eq><P>El actuador ejerce <strong>58,5 kN</strong> (≈ 5,97 toneladas de fuerza), más que suficiente para extender y bloquear el tren.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>La presión en el fondo de un depósito de combustible lleno de Jet A-1 (ρ = 800 kg/m³) de altura h = 0,8 m es p = p₀ + ρgh. ¿Cuánto vale esa presión hidrostática extra en Pa y en psi?</P>,
              a: <><Eq>{'\\Delta p = 800 \\times 9.81 \\times 0.8 = 6278\\ \\text{Pa} \\approx 0.91\\ \\text{psi}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>Un sistema hidráulico de 5000 psi (345 bar) tiene un pistón de área A₁ = 0,5 cm² y un actuador de A₂ = 15 cm². ¿Qué fuerza ejerce el actuador?</P>,
              a: <><Eq>{'F_2 = p \\times A_2 = 34.5 \\times 10^6 \\times 15 \\times 10^{-4} = 51750\\ \\text{N} \\approx 51.8\\ \\text{kN}'}</Eq></>,
            },
            {
              n: 3,
              q: <P>¿Puede flotar un dirigible lleno de helio si su volumen total (casco + gas) es 5000 m³ y su peso total es 45 000 N? (ρ_aire = 1,225 kg/m³)</P>,
              a: <><Eq>{'E = \\rho_{aire} \\times g \\times V = 1.225 \\times 9.81 \\times 5000 = 60071\\ \\text{N}'}</Eq><P>E = 60 071 N &gt; W = 45 000 N → <strong>Sí flota</strong>. Empuje neto = 15 071 N (≈ 1,54 toneladas de carga útil).</P></>,
            },
            {
              n: 4,
              q: <P>Si se mezcla Skydrol (éster fosfato) con aceite hidráulico mineral MIL-H-5606 por error, ¿qué riesgo existe? ¿Qué procedimiento establece el AMM?</P>,
              a: <P><strong>R:</strong> Son <strong>incompatibles</strong>. La mezcla degrada las juntas de goma neopreno del Skydrol y puede provocar fugas en todo el sistema. El AMM exige purgar completamente el sistema, inspeccionar todas las juntas y rellenar solo con el fluido especificado en el CMM.</P>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.9  DINÁMICA DE FLUIDOS — BERNOULLI
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-09',
      title: '2.9 Dinámica de fluidos — Bernoulli',
      body: (
        <>
          <Fig src={IMG.ala} alt="Perfil alar en vuelo" height={195}
            caption={<><strong>Figura 2.14</strong> Perfil aerodinámico en vuelo. Las líneas de corriente se comprimen sobre el extradós, aumentando la velocidad y disminuyendo la presión. La diferencia de presión entre extradós e intradós genera la sustentación: L = ½ρv²·S·CL.</>}
          />

          <Section title="Ecuación de continuidad">
            <P>Para un fluido incompresible en flujo estacionario, el caudal se conserva. Si la sección varía, varía la velocidad:</P>
            <Eq>{'A_1 v_1 = A_2 v_2 = Q = \\text{constante} \\quad [\\text{m}^3/\\text{s}] \\qquad A \\downarrow \\Rightarrow v \\uparrow'}</Eq>
          </Section>

          <Section title="Ecuación de Bernoulli">
            <P>Para flujo estacionario, incompresible y sin viscosidad, la energía total por unidad de volumen es constante a lo largo de una línea de corriente:</P>
            <Eq>{'p + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\text{constante} \\quad [\\text{Pa}]'}</Eq>
            <P>Simplificada (mismo nivel h) — base del tubo de Pitot:</P>
            <Eq>{'p_{estática} + \\tfrac{1}{2}\\rho v^2 = p_0 \\quad (p_{total} = \\text{cte}) \\qquad v \\uparrow \\Rightarrow p_{estática} \\downarrow'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.15</strong> Tubo Venturi. Al reducirse la sección (A₂ &lt; A₁), la velocidad aumenta (v₂ &gt; v₁) y la presión disminuye (p₂ &lt; p₁), conforme predice Bernoulli. Los manómetros muestran la diferencia de presión. Este mismo principio genera la sustentación aerodinámica.</>}>
            <DiagramBernoulli />
          </SvgFig>

          <Example n="2.7" title="Velocidad TAS desde presión dinámica"
            given={<P>Un tubo de Pitot mide <EqI>{'q = p_0 - p = 2450\\ \\text{Pa}'}</EqI> de presión dinámica. La densidad del aire es <EqI>{'\\rho = 0.905\\ \\text{kg/m}^3'}</EqI> (FL100 ISA). ¿Cuál es la TAS?</P>}
            solution={
              <>
                <Eq>{'v = \\sqrt{\\frac{2q}{\\rho}} = \\sqrt{\\frac{2 \\times 2450}{0.905}} = \\sqrt{5414} = 73.6\\ \\text{m/s} = 143\\ \\text{kt}'}</Eq>
                <P>La TAS es 143 kt. La IAS indicada sería menor, ya que el instrumento asume densidad ISA a nivel del mar (ρ₀ = 1.225 kg/m³).</P>
              </>
            }
          />

          <Section title="Viscosidad y capa límite">
            <P>Los fluidos reales tienen <strong>viscosidad</strong>: en la superficie del sólido el fluido tiene velocidad cero (no deslizamiento), creando un gradiente: la <strong>capa límite</strong>.</P>
            <Eq>{'\\tau = \\mu \\frac{dv}{dy} \\quad [\\text{Pa}] \\qquad Re = \\frac{\\rho v L}{\\mu} \\quad Re < 2300: \\text{laminar} \\quad Re > 4000: \\text{turbulento}'}</Eq>
            <Note>La transición laminar-turbulento tiene enorme impacto en la resistencia. El flujo laminar genera menos resistencia de fricción pero es más susceptible a la separación. Los perfiles NACA 6x están diseñados para mantener capa límite laminar sobre mayor parte de la cuerda.</Note>
          </Section>

          <Summary items={[
            'Continuidad: A₁v₁ = A₂v₂. Sección menor → velocidad mayor.',
            'Bernoulli: p + ½ρv² + ρgh = cte. Mayor velocidad → menor presión estática.',
            'Tubo Pitot: q = ½ρv² → TAS = √(2q/ρ). Mide presión dinámica.',
            'Re = ρvL/μ. Re < 2300: laminar. Re > 4000: turbulento.',
          ]} />

          <Solved n="2.9.A" title="Sustentación desde datos de Pitot"
            q={<P>Un avión de <strong>m = 1200 kg</strong> vuela en crucero. El Pitot mide <strong>q = 1800 Pa</strong> de presión dinámica en ISA MSL (ρ = 1,225 kg/m³). Superficie alar S = 16 m². Verificar si hay equilibrio con CL = 1,0.</P>}
            a={<><Eq>{'v = \\sqrt{2q/\\rho} = \\sqrt{2 \\times 1800/1.225} = \\sqrt{2939} = 54.2\\ \\text{m/s} = 105\\ \\text{kt}'}</Eq><Eq>{'L = q \\cdot S \\cdot C_L = 1800 \\times 16 \\times 1.0 = 28800\\ \\text{N}'}</Eq><Eq>{'W = mg = 1200 \\times 9.81 = 11772\\ \\text{N} \\qquad L > W \\implies \\text{el avión está subiendo}'}</Eq><P>L &gt; W: con ese CL y esa velocidad el avión asciende. En crucero nivelado reduciría CL o velocidad hasta que L = W = 11 772 N.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>La presión dinámica en vuelo es q = ½ρv². A FL100 en ISA (ρ = 0,905 kg/m³) y TAS = 200 kt (102,9 m/s), calcular q en Pa.</P>,
              a: <><Eq>{'q = \\tfrac{1}{2} \\times 0.905 \\times 102.9^2 = 0.5 \\times 0.905 \\times 10588 = 4791\\ \\text{Pa}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>En un tubo Venturi, la sección pasa de A₁ = 80 cm² a A₂ = 20 cm². Si v₁ = 15 m/s, ¿cuál es v₂?</P>,
              a: <><Eq>{'v_2 = v_1 \\times A_1/A_2 = 15 \\times 80/20 = 60\\ \\text{m/s}'}</Eq><P>La velocidad se <strong>cuadriplicó</strong> al reducir la sección a ¼. Por Bernoulli, la presión disminuyó.</P></>,
            },
            {
              n: 3,
              q: <P>Un avión IAS = 120 kt a FL80 (ρ = 1,002 kg/m³). Si el altímetro indica ISA MSL (ρ₀ = 1,225 kg/m³), ¿cuánto mayor es la TAS real?</P>,
              hint: <span>TAS/IAS = √(ρ₀/ρ)</span>,
              a: <><Eq>{'TAS = IAS \\times \\sqrt{\\rho_0/\\rho} = 120 \\times \\sqrt{1.225/1.002} = 120 \\times 1.106 = 132.7\\ \\text{kt}'}</Eq></>,
            },
            {
              n: 4,
              q: <P>Un perfil alar tiene extradós con v = 90 m/s e intradós con v = 70 m/s. ρ = 1,225 kg/m³. Calcular la diferencia de presión y la sustentación si S = 20 m².</P>,
              a: <><Eq>{'\\Delta p = \\tfrac{1}{2}\\rho(v_{ext}^2 - v_{int}^2) = 0.5 \\times 1.225 \\times (8100-4900) = 1960\\ \\text{Pa}'}</Eq><Eq>{'L = \\Delta p \\times S = 1960 \\times 20 = 39200\\ \\text{N} \\approx 4\\ \\text{ton}'}</Eq></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.10  TERMODINÁMICA — TEMPERATURA Y CALOR
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-10',
      title: '2.10 Termodinámica — Temperatura y calor',
      body: (
        <>
          <Fig src={IMG.thermal} alt="Medición de temperatura en motor" height={195}
            caption={<><strong>Figura 2.16</strong> Instrumentación de temperatura en un motor aeronáutico. El EGT (Exhaust Gas Temperature) es el parámetro más crítico del motor de turbina. Su medición precisa con termopares (efecto Seebeck) protege el motor de sobretemperaturas que causarían daño en álabes.</>}
          />

          <Section title="Temperatura y escalas">
            <Eq>{'T[\\text{K}] = T[°\\text{C}] + 273.15 \\qquad T[°\\text{F}] = T[°\\text{C}] \\times \\tfrac{9}{5} + 32 \\\\ T[°\\text{R}] = T[°\\text{F}] + 459.67 \\qquad °\\text{C} = (°\\text{F} - 32) / 1.8'}</Eq>
            <Note>La escala Kelvin es la única correcta para cálculos termodinámicos (ISA, eficiencia de ciclos). Nunca usar °C o °F en fórmulas termodinámicas sin convertir primero a K.</Note>
          </Section>

          <Section title="Calor y capacidad calorífica">
            <Eq>{'Q = m \\cdot c \\cdot \\Delta T \\quad [\\text{J}] \\\\ c_{\\text{aire}} \\approx 1005\\ \\text{J/(kg·K)} \\quad c_{\\text{agua}} = 4186 \\quad c_{\\text{Al}} \\approx 897 \\quad c_{\\text{acero}} \\approx 490\\ \\text{J/(kg·K)}'}</Eq>
            <P>En los gases ideales hay dos calores específicos: a presión constante cp y a volumen constante cv:</P>
            <Eq>{'\\gamma = c_p / c_v = 1.4 \\quad (\\text{aire diatómico}) \\qquad c_p - c_v = R = 287\\ \\text{J/(kg·K)}'}</Eq>
          </Section>

          <Section title="Dilatación térmica">
            <Eq>{'\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T \\quad (\\text{lineal}) \\qquad \\Delta V \\approx 3\\alpha \\cdot V_0 \\cdot \\Delta T \\quad (\\text{volumétrica}) \\\\ \\alpha_{\\text{Al}} = 23.1 \\times 10^{-6}/°\\text{C} \\quad \\alpha_{\\text{acero}} = 11\\text{–}13 \\times 10^{-6}/°\\text{C} \\quad \\alpha_{\\text{Ti}} = 8.6 \\times 10^{-6}/°\\text{C}'}</Eq>
            <Example n="2.8" title="Dilatación del eje de turbina"
              given={<P>Un eje de titanio de <EqI>{'L_0 = 1.2\\ \\text{m}'}</EqI> pasa de 20°C a 450°C durante operación. ¿Cuánto se dilata?</P>}
              solution={
                <>
                  <Eq>{'\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T = 8.6 \\times 10^{-6} \\times 1.2 \\times 430 = 4.44\\ \\text{mm}'}</Eq>
                  <P>El eje se dilata 4.44 mm. Las holguras de diseño del motor deben acomodar esta expansión para evitar roces que causarían daño catastrófico.</P>
                </>
              }
            />
            <P>La diferencia en α entre materiales distintos genera <strong>esfuerzos térmicos</strong> al cambiar de temperatura. Crítico en juntas bimetálicas y en estructuras compuestas metálico-CFRP del B787.</P>
          </Section>

          <Summary items={[
            'T[K] = T[°C] + 273.15. Usar siempre Kelvin en fórmulas termodinámicas.',
            'Q = m·c·ΔT [J]. El calor específico del aire (cp = 1005 J/kg·K) es mayor que el del acero.',
            'γ = cp/cv = 1.4 para el aire. cp − cv = R = 287 J/(kg·K).',
            'ΔL = α·L₀·ΔT. El aluminio dilata ~3× más que el titanio. Crítico en motores y estructuras mixtas.',
          ]} />

          <Solved n="2.10.A" title="Calor necesario para calentar combustible"
            q={<P>Un avión tiene <strong>4200 kg de Jet A-1</strong> en depósitos a −30 °C al aterrizar. ¿Cuánta energía se necesita para calentarlo a 15 °C? (c_JetA1 ≈ 2000 J/kg·K)</P>}
            a={<><Eq>{'Q = m \\cdot c \\cdot \\Delta T = 4200 \\times 2000 \\times (15 - (-30)) = 4200 \\times 2000 \\times 45'}</Eq><Eq>{'Q = 378\\ 000\\ 000\\ \\text{J} = 378\\ \\text{MJ} \\approx 105\\ \\text{kWh}'}</Eq><P>Este calentamiento ocurre naturalmente durante el vuelo gracias al intercambiador combustible-aceite, que enfría el aceite del motor mientras calienta el combustible.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Convertir las siguientes temperaturas: (a) ISA MSL 15 °C a K y °F. (b) Temperatura de álabe de turbina 1700 °C a K. (c) −56,5 °C (tropopausa ISA) a K y °F.</P>,
              a: <><P>(a) 288,15 K; 59 °F. (b) 1973,15 K. (c) 216,65 K; −69,7 °F.</P></>,
            },
            {
              n: 2,
              q: <P>Un eje de acero de L₀ = 2 m se calienta de 20 °C a 350 °C. ¿Cuánto se dilata? (α_acero = 12×10⁻⁶/°C)</P>,
              a: <><Eq>{'\\Delta L = 12 \\times 10^{-6} \\times 2 \\times 330 = 7.92 \\times 10^{-3}\\ \\text{m} = 7.92\\ \\text{mm}'}</Eq></>,
            },
            {
              n: 3,
              q: <P>Un motor de pistón enfría el aceite con el aire exterior (T_aire = 5 °C). El aceite entra al radiador a 120 °C. Si el caudal es 2 kg/s y c_aceite = 1900 J/kg·K, ¿qué potencia disipa el radiador si el aceite sale a 80 °C?</P>,
              a: <><Eq>{'P = \\dot{m} \\cdot c \\cdot \\Delta T = 2 \\times 1900 \\times (120 - 80) = 2 \\times 1900 \\times 40 = 152000\\ \\text{W} = 152\\ \\text{kW}'}</Eq></>,
            },
            {
              n: 4,
              q: <P>¿Por qué la escala Kelvin es obligatoria en los cálculos de la ISA pero no en una simple conversión de temperatura entre escalas? Da un ejemplo donde usar °C daría un resultado incorrecto.</P>,
              a: <P><strong>R:</strong> En fórmulas con cocientes de temperatura (leyes de gases: pV = mRT; eficiencia de Brayton: η = 1−T₁/T₂), si T = 0 °C el denominador sería cero. Ejemplo: si T₁ = 0 °C y T₂ = 200 °C, η = 1 − 0/200 = 1 (¡100% eficiencia!), absurdo. Con Kelvin: η = 1 − 273,15/473,15 = 42,3 %, correcto.</P>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.11  TERMODINÁMICA — LEYES Y CICLO DE BRAYTON
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-11',
      title: '2.11 Termodinámica — Leyes y ciclos de gas',
      body: (
        <>
          <Fig src={IMG.turbina} alt="Interior de turbina de gas" height={195}
            caption={<><strong>Figura 2.17</strong> Álabes de la turbina de alta presión de un motor turbofan. Operan a temperaturas superiores a 1700°C, por encima del punto de fusión del material base (aleación de níquel). Solo es posible gracias a la refrigeración interna por aire comprimido — una aplicación directa de la termodinámica.</>}
          />

          <Section title="Leyes de los gases perfectos">
            <Eq>{'p V = n R_u T = m R T \\\\ R_u = 8.314\\ \\text{J/(mol·K)} \\quad R_{\\text{aire}} = 287.05\\ \\text{J/(kg·K)} \\\\ \\text{Boyle (T=cte): } pV = \\text{cte} \\qquad \\text{Charles (p=cte): } V/T = \\text{cte} \\qquad \\text{Gay-Lussac (V=cte): } p/T = \\text{cte}'}</Eq>
          </Section>

          <Section title="Leyes de la Termodinámica">
            <DefList items={[
              { term: '0ª Ley', def: 'Si A y B están en equilibrio térmico con C, entonces A y B lo están entre sí. Define la temperatura.' },
              { term: '1ª Ley (Conservación)', def: <>El calor aportado se convierte en trabajo más variación de energía interna: <EqI>{'Q = \\Delta U + W'}</EqI>. La energía total se conserva.</> },
              { term: '2ª Ley (Entropía)', def: 'El calor fluye espontáneamente del cuerpo más caliente al más frío. La eficiencia de cualquier máquina térmica es menor del 100%. La entropía de un sistema aislado siempre crece.' },
              { term: '3ª Ley', def: 'La entropía de un cristal perfecto a 0 K es cero. Imposible alcanzar el cero absoluto.' },
            ]} />
          </Section>

          <Section title="Ciclo de Brayton — Motor de turbina de gas">
            <P>El ciclo termodinámico ideal del motor turbina de gas es el <strong>ciclo de Brayton</strong>, compuesto por:</P>
            <Table headers={['Proceso', 'Descripción', 'Componente']} rows={[
              ['1→2 Compresión adiabática', 'Aire comprimido sin intercambio de calor', 'Compresor'],
              ['2→3 Adición de calor (p=cte)', 'Combustión: T aumenta a presión constante', 'Cámara de combustión'],
              ['3→4 Expansión adiabática', 'Gases se expanden generando trabajo', 'Turbina + tobera'],
              ['4→1 Enfriamiento (p=cte)', 'Gases expulsados; entra aire fresco', 'Escape (ciclo abierto)'],
            ]} />
            <Eq>{'\\eta_{Brayton} = 1 - \\frac{T_1}{T_2} = 1 - \\left(\\frac{p_1}{p_2}\\right)^{(\\gamma-1)/\\gamma} \\qquad \\text{Mayor relación compresión} \\Rightarrow \\text{mayor } \\eta'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.18</strong> Diagrama P-V del ciclo de Brayton ideal y esquema funcional del motor. 1→2: compresión adiabática (compresor). 2→3: adición de calor a presión constante (cámara de combustión). 3→4: expansión adiabática (turbina/tobera). 4→1: rechazo de calor. Los motores modernos tienen relaciones de compresión de 30:1 a 50:1.</>}>
            <DiagramBrayton />
          </SvgFig>

          <Summary items={[
            'pV = mRT (gas ideal). R_aire = 287 J/(kg·K).',
            '1ª Ley: Q = ΔU + W. La energía se conserva.',
            '2ª Ley: imposible transferir calor del frío al caliente sin trabajo externo. η_real < 100%.',
            'Ciclo Brayton: η = 1 − (p₁/p₂)^((γ−1)/γ). Mayor relación de compresión → mayor eficiencia.',
          ]} />

          <Solved n="2.11.A" title="Temperatura tras compresión adiabática"
            q={<P>El compresor de un motor turbina tiene relación de compresión <strong>rp = p₂/p₁ = 30</strong>. T₁ = 288 K (ISA MSL). Calcular la temperatura de salida del compresor (γ = 1,4).</P>}
            a={<><Eq>{'T_2 = T_1 \\times \\left(\\frac{p_2}{p_1}\\right)^{(\\gamma-1)/\\gamma} = 288 \\times 30^{0.4/1.4} = 288 \\times 30^{0.286}'}</Eq><Eq>{'30^{0.286} = e^{0.286 \\ln 30} = e^{0.286 \\times 3.401} = e^{0.973} = 2.646'}</Eq><Eq>{'T_2 = 288 \\times 2.646 = 762\\ \\text{K} = 489°C'}</Eq><P>El aire sale del compresor a <strong>489 °C</strong> antes de entrar a la cámara de combustión. La eficiencia del ciclo: η = 1 − 288/762 = <strong>62 %</strong>.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un neumático de avión a 20 °C tiene una presión de 12 bar. Si la temperatura sube a 60 °C en el frenado, ¿cuál será la nueva presión? (Ley de Gay-Lussac, V = cte)</P>,
              a: <><Eq>{'p_2 = p_1 \\times T_2/T_1 = 12 \\times 333.15/293.15 = 12 \\times 1.136 = 13.64\\ \\text{bar}'}</Eq><P>La presión sube un 13,6 %. Los neumáticos aeronáuticos se rellenan con N₂ para reducir la variación de presión con la temperatura.</P></>,
            },
            {
              n: 2,
              q: <P>Describe los 4 procesos del ciclo de Brayton en un turborreactor e indica qué parámetro aumenta, se mantiene o disminuye en cada uno (T, p, v).</P>,
              a: <P>(1→2) <strong>Compresor</strong>: p↑, T↑, v↓ (compresión adiabática). (2→3) <strong>Combustión</strong>: p=cte, T↑↑, v↑ (calor a presión constante). (3→4) <strong>Turbina+Tobera</strong>: p↓, T↓, v↑ (expansión adiabática). (4→1) <strong>Escape</strong>: p↓ a presión ambiente, ciclo abierto.</P>,
            },
            {
              n: 3,
              q: <P>Un cilindro de nitrógeno contiene gas a 15 °C y 200 bar. Se calienta a 50 °C (volumen constante). ¿A qué presión llega? ¿Hay riesgo de sobrepresión si el cilindro está certificado a 250 bar?</P>,
              a: <><Eq>{'p_2 = 200 \\times 323.15/288.15 = 224.3\\ \\text{bar} < 250\\ \\text{bar}'}</Eq><P>No hay riesgo en este caso. Sin embargo, si el cilindro estuviera en un incendio (T &gt; 350 °C), p &gt; 450 bar → <strong>riesgo de explosión</strong>.</P></>,
            },
            {
              n: 4,
              q: <P>¿Qué ocurre con la eficiencia del ciclo de Brayton si la relación de compresión sube de 20:1 a 40:1? Calcular ambas eficiencias (γ = 1,4, T₁ = 288 K).</P>,
              a: <><Eq>{'\\eta_{20} = 1 - 20^{-0.286} = 1 - 0.406 = 59.4\\%'}</Eq><Eq>{'\\eta_{40} = 1 - 40^{-0.286} = 1 - 0.344 = 65.6\\%'}</Eq><P>Subir la relación de compresión de 20 a 40 mejora la eficiencia en <strong>+6,2 puntos</strong>.</P></>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.12  TRANSMISIÓN DE CALOR
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-12',
      title: '2.12 Transmisión de calor',
      body: (
        <>
          <SvgFig caption={<><strong>Figura 2.19</strong> Los tres mecanismos de transmisión de calor. Conducción: a través del sólido (gradiente de temperatura). Convección: mediante movimiento del fluido (forzada o natural). Radiación: ondas electromagnéticas (infrarrojas), no necesita medio material.</>}>
            <DiagramCalor />
          </SvgFig>

          <Section title="Conducción">
            <P>Transferencia de calor a través de un sólido por contacto directo entre partículas:</P>
            <Eq>{'\\frac{Q}{t} = k \\cdot A \\cdot \\frac{\\Delta T}{d} \\quad [\\text{W}] \\\\ k_{\\text{Cu}} = 385 \\quad k_{\\text{Al}} = 205 \\quad k_{\\text{acero}} = 50 \\quad k_{\\text{CFRP}} = 5\\text{–}100 \\quad k_{\\text{aire}} = 0.025\\ \\text{W/(m·K)}'}</Eq>
          </Section>

          <Section title="Convección y radiación">
            <DefList items={[
              { term: 'Convección natural', def: <>El fluido caliente sube (ρ menor). <EqI>{'Q/t = h \\cdot A \\cdot \\Delta T'}</EqI>. Refrigeración de aviónica instalada verticalmente.</> },
              { term: 'Convección forzada', def: 'Un ventilador o el flujo RAM air mueve el fluido. Mayor h → más eficiente. Refrigeración de aviónica con aire de impacto (RAM air duct).' },
              { term: 'Radiación', def: <>No necesita medio material. <EqI>{'Q/t = \\varepsilon \\sigma A T^4'}</EqI>, σ = 5.67×10⁻⁸ W/(m²·K⁴). Dominante a altas temperaturas (toberas, álabes de turbina).</> },
            ]} />
            <Note>La gestión térmica es crítica en aviónica moderna. La concentración de equipos en la aviónics bay obliga a sistemas de refrigeración activos: ciclos de aire, intercambiadores calor combustible-aceite, o sistemas de refrigeración por líquido en aeronaves de nueva generación (B787, A380).</Note>
          </Section>

          <Example n="2.9" title="Flujo de calor a través de la pared del fuselaje"
            given={<P>Pared de aluminio de <EqI>{'d = 3\\ \\text{mm}'}</EqI> y <EqI>{'A = 2\\ \\text{m}^2'}</EqI>. Diferencia de temperatura <EqI>{'\\Delta T = 50°\\text{C}'}</EqI> (interior cabina vs exterior). k_Al = 205 W/(m·K). ¿Flujo de calor?</P>}
            solution={
              <>
                <Eq>{'\\dot{Q} = k \\frac{A \\cdot \\Delta T}{d} = 205 \\times \\frac{2 \\times 50}{0.003} = 6\\ 833\\ 333\\ \\text{W} \\approx 6.8\\ \\text{MW}'}</Eq>
                <P>¡Este flujo enorme muestra por qué los aviones necesitan aislamiento: sin la capa de aislante (k ≈ 0.03 W/m·K, análoga al aire), la pérdida de calor a través de la estructura sería completamente inviable.</P>
              </>
            }
          />

          <Summary items={[
            'Conducción: Q/t = k·A·ΔT/d. El aluminio conduce 8× mejor que el acero, el aire apenas conduce.',
            'Convección: Q/t = h·A·ΔT. Forzada (ventilador) es más eficiente que natural.',
            'Radiación: Q/t = εσAT⁴. Dominante a altas temperaturas. No necesita medio material.',
          ]} />

          <Solved n="2.12.A" title="Pérdida de calor a través del fuselaje"
            q={<P>La cabina tiene T_int = 24 °C y exterior T_ext = −55 °C (FL350). La pared del fuselaje tiene: aluminio 3 mm (k = 205 W/m·K) + aislante 25 mm (k = 0,04 W/m·K). Área A = 1 m². Calcular el flujo de calor.</P>}
            a={<><P>Resistencias térmicas en serie:</P><Eq>{'R_{Al} = d/kA = 0.003/(205 \\times 1) = 1.46 \\times 10^{-5}\\ \\text{K/W}'}</Eq><Eq>{'R_{ais} = 0.025/(0.04 \\times 1) = 0.625\\ \\text{K/W}'}</Eq><Eq>{'\\dot{Q} = \\frac{\\Delta T}{R_{total}} = \\frac{79}{0.625} \\approx 126\\ \\text{W/m}^2'}</Eq><P>El aislante domina completamente la resistencia. Sin él serían <strong>5,4 MW/m²</strong>. El aislamiento reduce la pérdida en factor 43 000.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un intercambiador calor-aceite tiene área A = 0,5 m² y coeficiente convectivo h = 800 W/m²·K. El aceite entra a 130 °C y el combustible a 10 °C. ¿Qué potencia transfiere?</P>,
              a: <><Eq>{'P = h \\cdot A \\cdot \\Delta T = 800 \\times 0.5 \\times 120 = 48000\\ \\text{W} = 48\\ \\text{kW}'}</Eq></>,
            },
            {
              n: 2,
              q: <P>Los álabes de turbina emiten como cuerpo negro a T = 1200 K. Calcular la potencia radiada por m² (ε = 0,85, σ = 5,67×10⁻⁸ W/m²·K⁴).</P>,
              a: <><Eq>{'P/A = \\varepsilon \\sigma T^4 = 0.85 \\times 5.67 \\times 10^{-8} \\times 1200^4 = 0.85 \\times 117.9 \\times 10^3 = 100.2\\ \\text{kW/m}^2'}</Eq></>,
            },
            {
              n: 3,
              q: <P>¿Por qué el cobre (k = 385 W/m·K) se usa en conectores y barras colectoras pero no en la estructura del avión? ¿Qué material se usa estructuralmente y por qué?</P>,
              a: <P><strong>R:</strong> El cobre es excelente conductor eléctrico pero tiene densidad 8900 kg/m³ (muy pesado). La estructura usa <strong>aluminio</strong> (ρ = 2700 kg/m³, 3× más ligero) con buena conductividad eléctrica y excelente relación resistencia/peso.</P>,
            },
            {
              n: 4,
              q: <P>¿Cuál de los tres mecanismos de transmisión de calor (conducción, convección, radiación) domina en: (a) un radiador de aceite, (b) los álabes de turbina, (c) el cableado eléctrico dentro del fuselaje?</P>,
              a: <P>(a) <strong>Convección forzada</strong> (fluido en movimiento). (b) <strong>Radiación</strong> (T muy alta, 1200 K+). (c) <strong>Convección natural</strong> (el cable calienta el aire circundante que sube por densidad).</P>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.13  ÓPTICA — LUZ Y FIBRA ÓPTICA
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-13',
      title: '2.13 Óptica — Luz y fibra óptica',
      body: (
        <>
          <Fig src={IMG.fibraOptica} alt="Cables de fibra óptica" height={195}
            caption={<><strong>Figura 2.20</strong> Cables de fibra óptica iluminados. Cada fibra guía la luz mediante reflexión total interna. En aviación, la fibra óptica conecta sistemas críticos de aviónica con las ventajas de inmunidad electromagnética, ligereza y gran ancho de banda. El B787 usa redes de fibra óptica AFDX.</>}
          />

          <Section title="Naturaleza y propagación de la luz">
            <P>La luz es una onda electromagnética transversal que se propaga en el vacío a:</P>
            <Eq>{'c = 3 \\times 10^8\\ \\text{m/s} \\qquad \\lambda \\cdot f = c \\\\ \\text{Espectro visible: } \\lambda \\approx 380\\ \\text{nm (violeta)} \\to 750\\ \\text{nm (rojo)}'}</Eq>
          </Section>

          <Section title="Reflexión y refracción — Ley de Snell">
            <Eq>{'\\text{Reflexión: } \\theta_i = \\theta_r \\\\ \\text{Snell: } n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2 \\qquad n_{vacío} = 1,\\ n_{vidrio} \\approx 1.5 \\\\ \\text{Reflexión total interna: } \\theta > \\theta_c = \\arcsin(n_2/n_1)'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.21</strong> Reflexión total interna en una fibra óptica. El rayo de luz (amarillo) que incide con ángulo θ mayor que el ángulo crítico θc queda completamente confinado en el núcleo. La diferencia de índices de refracción entre núcleo (n₁) y revestimiento (n₂ &lt; n₁) es la clave del funcionamiento.</>}>
            <DiagramFibra />
          </SvgFig>

          <Table headers={['Ventaja vs cable eléctrico', 'Relevancia aeronáutica']} rows={[
            ['Inmune a interferencias electromagnéticas (EMI)', 'Sistemas críticos junto a motores y radar'],
            ['Muy ligero y flexible', 'A380: 500 km de cable — ahorro masivo de peso'],
            ['Ancho de banda muy alto (Gbps)', 'Buses AFDX/ARINC 664 en A380, B787'],
            ['No genera chispa', 'Seguridad en zonas de combustible'],
            ['Sin corrosión', 'Larga vida útil en ambiente húmedo'],
          ]} />

          <Note>El Boeing 787 Dreamliner usa extensamente fibra óptica en su red de datos (networking) y sensores de temperatura distribuidos en la estructura CFRP para detectar daños. El bus AFDX (ARINC 664 Parte 7) opera a 100 Mbps full-duplex.</Note>

          <Summary items={[
            'c = 3×10⁸ m/s. λ·f = c. Espectro visible: 380–750 nm.',
            'Snell: n₁·sinθ₁ = n₂·sinθ₂. Reflexión total interna si θ > θc = arcsin(n₂/n₁).',
            'Fibra óptica: guía la luz por reflexión total interna. Inmune a EMI, ligera, alta BW.',
            'AFDX (ARINC 664): bus de datos en fibra óptica a 100 Mbps usado en A380/B787.',
          ]} />

          <Solved n="2.13.A" title="Ángulo crítico de fibra óptica"
            q={<P>Una fibra óptica tiene núcleo n₁ = 1,52 y revestimiento n₂ = 1,41. Calcular el ángulo crítico de reflexión total interna.</P>}
            a={<><Eq>{'\\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right) = \\arcsin\\!\\left(\\frac{1.41}{1.52}\\right) = \\arcsin(0.9276) = 68.1°'}</Eq><P>Todo rayo que incida con θ &gt; <strong>68,1°</strong> queda completamente confinado en el núcleo. La apertura numérica (NA) de la fibra es NA = √(n₁² − n₂²) = √(2,31 − 1,99) = 0,57.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Un rayo de luz pasa del vidrio (n₁ = 1,5) al aire (n₂ = 1,0) con ángulo de incidencia 30°. Calcular el ángulo de refracción. ¿Se produce reflexión total?</P>,
              a: <><Eq>{'\\sin\\theta_2 = (n_1/n_2)\\sin\\theta_1 = 1.5 \\times \\sin 30° = 1.5 \\times 0.5 = 0.75 \\implies \\theta_2 = 48.6°'}</Eq><P>Refracción normal (θ_c = arcsin(1/1,5) = 41,8°; como 30° &lt; 41,8°, no hay reflexión total).</P></>,
            },
            {
              n: 2,
              q: <P>Una fibra de plástico tiene n₁ = 1,49, n₂ = 1,42. ¿Cuál es su ángulo crítico? ¿Es mayor o menor que el de la fibra del ejercicio anterior?</P>,
              a: <><Eq>{'\\theta_c = \\arcsin(1.42/1.49) = \\arcsin(0.953) = 72.4°'}</Eq><P>Mayor que 68,1° → acepta rayos en un cono más estrecho (apertura numérica menor).</P></>,
            },
            {
              n: 3,
              q: <P>¿Qué longitud de onda (nm) corresponde a la señal láser infrarroja de 193 THz usada en comunicaciones por fibra óptica? (c = 3×10⁸ m/s)</P>,
              a: <><Eq>{'\\lambda = c/f = 3 \\times 10^8 / (193 \\times 10^{12}) = 1.554 \\times 10^{-6}\\ \\text{m} = 1554\\ \\text{nm}'}</Eq><P>Infrarrojo cercano — invisible al ojo humano. Nunca mirar directamente a una fibra activa.</P></>,
            },
            {
              n: 4,
              q: <P>Cita dos ventajas concretas de usar fibra óptica en lugar de cable de par trenzado en el bus de datos del B787 Dreamliner.</P>,
              a: <P><strong>R:</strong> (1) <strong>Inmunidad a EMI/HIRF</strong>: la fibra no es susceptible a interferencias electromagnéticas de motores, radar o rayos. (2) <strong>Menor peso</strong>: la fibra pesa ~60 g/m vs ~200 g/m del cable blindado equivalente. En 500 km de cableado total, el ahorro es enorme.</P>,
            },
          ]} />
        </>
      ),
    },

    // ════════════════════════════════════════════════════════════════
    // 2.14  ONDAS MECÁNICAS Y SONIDO
    // ════════════════════════════════════════════════════════════════
    {
      id: 'm2-14',
      title: '2.14 Ondas mecánicas y sonido',
      body: (
        <>
          <Fig src={IMG.ndt} alt="Inspección ultrasónica en aeronave" height={195}
            caption={<><strong>Figura 2.22</strong> Técnico realizando inspección por ultrasonidos (UT) en estructura de ala. Los ultrasonidos penetran en el material y se reflejan en defectos internos (grietas, delaminaciones). Es el método más usado en END aeronáutico para estructuras de CFRP y aleaciones metálicas. Rango típico: 1–15 MHz.</>}
          />

          <Section title="Ondas mecánicas — características">
            <P>Una onda mecánica es una perturbación que se propaga a través de un medio material transfiriendo energía sin transportar materia.</P>
            <DefList items={[
              { term: 'Onda longitudinal', def: 'Las partículas oscilan en la dirección de propagación. El sonido es una onda longitudinal de presión.' },
              { term: 'Onda transversal', def: 'Las partículas oscilan perpendicularmente a la dirección de propagación. Ondas en cuerdas, ondas EM.' },
            ]} />
            <Eq>{'\\lambda \\cdot f = v_{prop} \\qquad T = 1/f \\quad [\\text{s}] \\qquad \\omega = 2\\pi f \\quad [\\text{rad/s}]'}</Eq>
          </Section>

          <SvgFig caption={<><strong>Figura 2.23</strong> Onda mecánica sinusoidal. La amplitud A es el desplazamiento máximo. La longitud de onda λ es la distancia entre dos crestas consecutivas. El período T = 1/f es el tiempo de un ciclo completo. El área bajo v(t) representa el desplazamiento.</>}>
            <DiagramOnda />
          </SvgFig>

          <Section title="Sonido y decibelios">
            <Eq>{'v_{sonido} = \\sqrt{\\gamma R T} = 20.05 \\sqrt{T\\ [\\text{K}]}\\ \\text{m/s} \\qquad a_0 = 340.3\\ \\text{m/s a 15°C (ISA MSL)} \\\\ SPL = 20 \\log_{10}\\!\\left(\\frac{p}{p_{ref}}\\right)\\ [\\text{dB}] \\qquad p_{ref} = 20\\ \\mu\\text{Pa}'}</Eq>
            <Table headers={['Fuente', 'SPL [dB]', 'Efecto']} rows={[
              ['Umbral audición', '0 dB', 'Mínimo perceptible'],
              ['Conversación normal', '60 dB', 'Cómodo'],
              ['Motor pistón en test', '100 dB', 'Protección auditiva obligatoria'],
              ['Motor a reacción (cerca)', '130–140 dB', 'Daño auditivo inmediato'],
            ]} />
            <Warn>La exposición a niveles superiores a 85 dB sin protección durante 8 h causa daño auditivo irreversible. En rampa aeroportuaria: siempre usar protectores auditivos homologados (EN 352-1). Los técnicos LMA tienen alta exposición al ruido — obligación legal de protección.</Warn>
          </Section>

          <Section title="Efecto Doppler y ultrasonidos en END">
            <Eq>{'f_{obs} = f_{fuente} \\cdot \\frac{v \\pm v_{obs}}{v \\mp v_{fuente}} \\qquad \\text{Acercamiento: } f_{obs} \\uparrow \\qquad \\text{Alejamiento: } f_{obs} \\downarrow'}</Eq>
            <DefList items={[
              { term: 'Inspección UT (Ultrasonidos)', def: 'Detecta grietas internas, delaminaciones en CFRP, fallos de unión. Rango típico: 1–15 MHz. Obligatorio según EASA AMC 20-29.' },
              { term: 'Phased Array UT', def: 'Array de múltiples piezoeléctricos — enfoca y escanea el haz electrónicamente. Mayor cobertura y resolución que UT convencional. Estándar creciente en aeronáutica.' },
            ]} />
            <Aviation title="Número de Mach">
              El número de Mach relaciona la velocidad de la aeronave con la velocidad del sonido local: M = v/a. A altitudes elevadas, el aire es más frío (menor T) y a es menor, por lo que el mismo M equivale a menor TAS. El Mach de crucero del B787 es M = 0.85, equivalente a unos 900 km/h en crucero.
            </Aviation>
          </Section>

          <Summary items={[
            'λ·f = v_prop. Onda longitudinal (sonido) vs. transversal (cuerda, EM).',
            'v_sonido = 20.05·√T [m/s, T en K]. A 15°C (ISA): a₀ = 340.3 m/s.',
            'SPL = 20·log(p/p_ref) [dB]. Protección auditiva obligatoria sobre 85 dB.',
            'Ultrasonidos (UT): 1–15 MHz. Detecta defectos internos en CFRP y metales — END aeronáutico.',
          ]} />

          <Solved n="2.14.A" title="Número de Mach a altitud de crucero"
            q={<P>Un avión cruza a FL350 en ISA. T = −56,5 °C = 216,65 K. TAS = 470 kt = 241,7 m/s. Calcular la velocidad del sonido local y el número de Mach.</P>}
            a={<><Eq>{'a = 20.05\\sqrt{T} = 20.05\\sqrt{216.65} = 20.05 \\times 14.72 = 295.1\\ \\text{m/s}'}</Eq><Eq>{'M = v/a = 241.7/295.1 = 0.819'}</Eq><P>El avión vuela a <strong>Mach 0,82</strong>. Cada ½ kt de TAS que cambia equivale a ~0,0017 Mach a esta altitud. El mach de diseño del A320 en MMO es 0,82.</P></>}
          />

          <Practice items={[
            {
              n: 1,
              q: <P>Calcular la velocidad del sonido en ISA MSL (T = 288,15 K) y en la tropopausa (T = 216,65 K). ¿Cuánto más lento viaja el sonido en la tropopausa?</P>,
              a: <><Eq>{'a_{MSL} = 20.05\\sqrt{288.15} = 340.3\\ \\text{m/s} \\qquad a_{tropo} = 20.05\\sqrt{216.65} = 295.1\\ \\text{m/s}'}</Eq><P>El sonido viaja <strong>45 m/s más lento</strong> en la tropopausa (−13,2 %).</P></>,
            },
            {
              n: 2,
              q: <P>Un técnico está expuesto a 92 dB de ruido junto a motores en marcha. ¿Cuántas horas puede trabajar sin protección auditiva según el criterio de 85 dB/8h? (cada 3 dB se reduce el tiempo permitido a la mitad)</P>,
              a: <><P>92 − 85 = 7 dB extra. Tiempo = 8 h / 2^(7/3) = 8 / 5,04 = <strong>1,6 horas</strong> máximo. En la práctica, siempre usar protección en rampa.</P></>,
            },
            {
              n: 3,
              q: <P>Un sensor de ultrasonidos UT opera a f = 5 MHz. Calcular la longitud de onda en aluminio (v_Al = 6400 m/s) y en CFRP (v_CFRP = 3000 m/s). ¿Qué tamaño de defecto puede detectar mínimamente?</P>,
              a: <><Eq>{'\\lambda_{Al} = v/f = 6400/5\\times10^6 = 1.28\\ \\text{mm} \\qquad \\lambda_{CFRP} = 3000/5\\times10^6 = 0.6\\ \\text{mm}'}</Eq><P>El defecto mínimo detectable es ~λ/2: <strong>0,64 mm en Al</strong> y <strong>0,30 mm en CFRP</strong>.</P></>,
            },
            {
              n: 4,
              q: <P>¿Por qué se dice que las ondas sonoras son longitudinales mientras que las ondas de radio son transversales? ¿Pueden ambas propagarse en el vacío?</P>,
              a: <P><strong>R:</strong> El sonido es <strong>longitudinal</strong> (las moléculas de aire oscilan en la dirección de propagación: zonas de compresión y rarefacción). Las ondas de radio son <strong>transversales</strong> (campo eléctrico y magnético oscilan perpendicularmente a la propagación). El sonido <strong>NO</strong> se propaga en el vacío (necesita medio material). Las ondas de radio <strong>SÍ</strong> (son ondas electromagnéticas, se propagan a c en el vacío).</P>,
            },
            {
              n: 5,
              q: <P>Un avión se acerca a Mach 1,0 en vuelo horizontal. ¿Qué fenómeno físico impide superar esta velocidad en un avión subsónico convencional? ¿Qué rediseño permite el vuelo supersónico?</P>,
              a: <P><strong>R:</strong> Al acercarse a M = 1, las ondas de presión generadas por el avión no pueden "escapar" hacia adelante (la velocidad del sonido es la velocidad de propagación de perturbaciones). Se forma una <strong>onda de choque</strong> que aumenta drásticamente la resistencia (drag de onda). Para vuelo supersónico se necesita: geometría de ala en flecha o delta, bordes de ataque afilados, fuselaje area-ruled (regla de las áreas de Whitcomb) y motores con postcombustión.</P>,
            },
          ]} />
        </>
      ),
    },
  ],
};

export default m2;
