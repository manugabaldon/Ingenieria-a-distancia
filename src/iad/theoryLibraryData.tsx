import type { ReactNode } from 'react';
import type { TheoryContent } from '../components/TheoryPanel';
import { P, Note, Mark, TheorySvg, Collapsible, DefList } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import {
  DiagramSistemasReferencia,
  DiagramVelocidadRelativa,
  DiagramAceleracionRelativa,
} from '../components/TheoryDiagrams';
import theoryGradiente from '../campos/theoryGradiente';
import theoryDivergenciaRotacional from '../campos/theoryDivergenciaRotacional';

// Colores de los términos, coherentes con DiagramAceleracionRelativa
const cG = '#30d158'; // origen
const cR = '#ff3b30'; // tangencial / centrípeta
const cB = '#0071e3'; // coriolis
const cM = '#af52de'; // relativa

function Term({ color, children }: { color: string; children: ReactNode }) {
  return <strong style={{ color }}>{children}</strong>;
}

// ─── Sistemas de referencia fijo y móvil ───────────────────────────────────
const theorySistemasReferencia: TheoryContent = {
  intro: (
    <>
      Cuando un punto <InlineMath>{'P'}</InlineMath> se mueve, su posición
      puede describirse desde dos "puntos de vista" distintos: uno{' '}
      <strong>fijo</strong> en el espacio y otro <strong>móvil</strong>, que a
      su vez se mueve respecto al fijo. Esta idea es la base de toda la
      cinemática del movimiento relativo: nos permite estudiar por separado el
      movimiento del punto y el movimiento del propio sistema de referencia
      que lo observa.
    </>
  ),
  sections: [
    {
      title: '1. Sistema fijo OXYZ y sistema móvil oxyz',
      body: (
        <>
          <TheorySvg caption="OXYZ es el sistema de referencia fijo, con origen O y vectores unitarios Ī, J̄, K̄. oxyz es el sistema móvil, con origen o y vectores unitarios ī, j̄, k̄. El punto P se puede localizar desde cualquiera de los dos.">
            <DiagramSistemasReferencia />
          </TheorySvg>
          <P>
            Se definen dos triedros (conjuntos de tres ejes perpendiculares):
          </P>
          <P>
            <Mark>Sistema fijo: OXYZ</Mark> — no se mueve, es la referencia
            "absoluta" desde la que se mide todo. Sus vectores unitarios son{' '}
            <InlineMath>{'\\vec{I}, \\vec{J}, \\vec{K}'}</InlineMath>.
          </P>
          <P>
            <Mark>Sistema móvil: oxyz</Mark> — se mueve (se traslada y/o gira)
            respecto al sistema fijo. Sus vectores unitarios son{' '}
            <InlineMath>{'\\vec{\\imath}, \\vec{\\jmath}, \\vec{k}'}</InlineMath>.
          </P>
        </>
      ),
    },
    {
      title: '2. Posición del punto P respecto a cada sistema',
      body: (
        <>
          <P>Respecto al sistema fijo, la posición de P es el vector:</P>
          <BlockMath>{'\\vec{R} = X\\,\\vec{I} + Y\\,\\vec{J} + Z\\,\\vec{K}'}</BlockMath>
          <P>Respecto al sistema móvil, la posición de P es el vector:</P>
          <BlockMath>{'\\vec{r} = x\\,\\vec{\\imath} + y\\,\\vec{\\jmath} + z\\,\\vec{k}'}</BlockMath>
          <P>
            <InlineMath>{'\\vec{R}'}</InlineMath> son las coordenadas de P
            "vistas desde fuera" (sistema fijo); <InlineMath>{'\\vec{r}'}</InlineMath>{' '}
            son las coordenadas de ese mismo punto P "vistas desde dentro" del
            sistema móvil.
          </P>
          <Note>
            Como se ve en el diagrama, los tres vectores están relacionados:
            si <InlineMath>{'\\vec{r}_0'}</InlineMath> es la posición del
            origen móvil <InlineMath>{'o'}</InlineMath> respecto al fijo{' '}
            <InlineMath>{'O'}</InlineMath>, entonces{' '}
            <InlineMath>{'\\vec{R} = \\vec{r}_0 + \\vec{r}'}</InlineMath>. Esta
            suma vectorial es la que luego permite relacionar la velocidad y
            la aceleración "vistas" desde cada sistema.
          </Note>
        </>
      ),
    },
    {
      title: '3. Movimiento absoluto, relativo y de arrastre',
      body: (
        <>
          <P>
            A partir de estos dos sistemas se definen tres tipos de
            movimiento:
          </P>
          <P>
            <Mark>Movimiento absoluto</Mark>: movimiento de{' '}
            <Mark>P</Mark> respecto a la referencia <Mark>fija</Mark>.
          </P>
          <P>
            <Mark>Movimiento relativo</Mark>: movimiento de{' '}
            <Mark>P</Mark> respecto a la referencia <Mark>móvil</Mark>.
          </P>
          <P>
            <Mark>Movimiento de arrastre</Mark>: movimiento de la
            referencia <Mark>móvil</Mark> respecto a la <Mark>fija</Mark>.
          </P>
          <Note>
            Un ejemplo para verlo claro: imagina una persona caminando dentro
            de un tren en marcha. El <strong>movimiento relativo</strong> es
            el de la persona respecto al vagón (lo que marcaría un podómetro).
            El <strong>movimiento de arrastre</strong> es el del propio tren
            respecto a las vías (lo que marca el velocímetro de la
            locomotora). Y el <strong>movimiento absoluto</strong> es el que
            vería alguien parado en el andén: la combinación de ambos —
            caminar dentro de un vagón que a su vez avanza.
          </Note>
        </>
      ),
    },
  ],
  references: [
    'Mecánica, Tema 2: Cinemática del movimiento relativo',
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
  ],
};

// ─── Velocidad en el movimiento relativo ───────────────────────────────────
const theoryVelocidadRelativa: TheoryContent = {
  intro: (
    <>
      Ya sabemos que <InlineMath>{'\\vec{R} = \\vec{r}_0 + \\vec{r}'}</InlineMath>{' '}
      relaciona la posición de <InlineMath>{'P'}</InlineMath> vista desde el
      sistema fijo y desde el móvil. Derivando esa igualdad respecto al tiempo
      obtenemos la <strong>velocidad</strong>, y al hacerlo aparecen dos
      vectores nuevos que describen cómo se mueve el propio sistema móvil: su{' '}
      <strong>velocidad de traslación</strong> <InlineMath>{'\\vec{v}_0'}</InlineMath>{' '}
      y su <strong>velocidad angular</strong> <InlineMath>{'\\vec{\\omega}'}</InlineMath>.
    </>
  ),
  sections: [
    {
      title: '1. Derivando la posición',
      body: (
        <>
          <TheorySvg caption="Mismo esquema de los sistemas fijo y móvil. Ahora R̄ y r̄ pasan a segundo plano (gris) y los protagonistas son v̄₀ (verde), la velocidad del origen móvil o, y ω̄ (rojo), la velocidad angular del sistema móvil.">
            <DiagramVelocidadRelativa />
          </TheorySvg>
          <P>
            Partimos de <InlineMath>{'\\vec{R} = \\vec{r}_0 + \\vec{r}'}</InlineMath>,
            escribiendo <InlineMath>{'\\vec{r}'}</InlineMath> en componentes
            del sistema móvil:
          </P>
          <BlockMath>{'\\vec{R} = \\vec{r}_0 + x\\,\\vec{\\imath} + y\\,\\vec{\\jmath} + z\\,\\vec{k}'}</BlockMath>
          <P>Derivamos respecto al tiempo, término a término:</P>
          <BlockMath>
            {'\\frac{d\\vec{R}}{dt} = \\frac{d\\vec{r}_0}{dt} + \\frac{dx}{dt}\\vec{\\imath} + x\\frac{d\\vec{\\imath}}{dt} + \\frac{dy}{dt}\\vec{\\jmath} + y\\frac{d\\vec{\\jmath}}{dt} + \\frac{dz}{dt}\\vec{k} + z\\frac{d\\vec{k}}{dt}'}
          </BlockMath>
          <Note>
            Los vectores unitarios del sistema móvil{' '}
            <InlineMath>{'\\vec{\\imath}, \\vec{\\jmath}, \\vec{k}'}</InlineMath>{' '}
            no son constantes: giran junto con el sistema móvil, así que
            también tienen derivada temporal. Para calcularla se usa la{' '}
            <Mark>fórmula de Poisson</Mark>:
          </Note>
          <BlockMath>{'\\frac{d\\vec{u}}{dt} = \\vec{\\omega} \\times \\vec{u}'}</BlockMath>
          <P>
            válida para cualquier vector unitario <InlineMath>{'\\vec{u}'}</InlineMath>{' '}
            ligado al sistema móvil, donde <InlineMath>{'\\vec{\\omega}'}</InlineMath>{' '}
            es la velocidad angular de ese sistema.
          </P>
        </>
      ),
    },
    {
      title: '2. Agrupando términos',
      body: (
        <>
          <P>Aplicando Poisson a los tres vectores unitarios:</P>
          <BlockMath>
            {'\\frac{d\\vec{R}}{dt} = \\frac{d\\vec{r}_0}{dt} + x\\,\\vec{\\omega}\\times\\vec{\\imath} + y\\,\\vec{\\omega}\\times\\vec{\\jmath} + z\\,\\vec{\\omega}\\times\\vec{k} + \\frac{dx}{dt}\\vec{\\imath} + \\frac{dy}{dt}\\vec{\\jmath} + \\frac{dz}{dt}\\vec{k}'}
          </BlockMath>
          <P>
            Los tres términos con <InlineMath>{'\\vec{\\omega}\\times'}</InlineMath>{' '}
            se sacan factor común, y se reconoce que{' '}
            <InlineMath>{'x\\vec{\\imath}+y\\vec{\\jmath}+z\\vec{k} = \\vec{r}'}</InlineMath>.
            Los tres últimos términos son, por definición, la derivada de{' '}
            <InlineMath>{'\\vec{r}'}</InlineMath> <em>tal como se ve desde el
            sistema móvil</em> (sin derivar sus vectores unitarios), que se
            llama velocidad relativa <InlineMath>{'\\vec{v}_r'}</InlineMath>:
          </P>
          <BlockMath>
            {'\\frac{d\\vec{R}}{dt} = \\frac{d\\vec{r}_0}{dt} + \\vec{\\omega}\\times\\vec{r} + \\vec{v}_r'}
          </BlockMath>
        </>
      ),
    },
    {
      title: '3. Velocidad absoluta = arrastre + relativa',
      body: (
        <>
          <P>
            <InlineMath>{'\\frac{d\\vec{r}_0}{dt}'}</InlineMath> es la
            velocidad de <strong>traslación del sistema móvil</strong>: la
            velocidad con la que se mueve el origen{' '}
            <InlineMath>{'o'}</InlineMath> respecto al fijo{' '}
            <InlineMath>{'O'}</InlineMath>. Se llama{' '}
            <InlineMath>{'\\vec{v}_0'}</InlineMath>.
          </P>
          <P>
            <InlineMath>{'\\vec{\\omega}\\times\\vec{r}'}</InlineMath> es la
            velocidad de <strong>rotación</strong> que tendría el punto{' '}
            <InlineMath>{'P'}</InlineMath> si estuviera fijo al sistema móvil,
            girando con él a velocidad angular <InlineMath>{'\\vec{\\omega}'}</InlineMath>.
          </P>
          <Note>
            Juntos, <InlineMath>{'\\vec{v}_0'}</InlineMath> y{' '}
            <InlineMath>{'\\vec{\\omega}\\times\\vec{r}'}</InlineMath> forman
            la <Mark>velocidad de arrastre</Mark>{' '}
            <InlineMath>{'\\vec{v}_{arr} = \\vec{v}_0 + \\vec{\\omega}\\times\\vec{r}'}</InlineMath>:
            es la velocidad que tendría <InlineMath>{'P'}</InlineMath> si en
            ese instante estuviera "pegado" al sistema móvil, sin moverse
            respecto a él.
          </Note>
          <P>La velocidad absoluta de P es entonces:</P>
          <BlockMath>{'\\vec{v} = \\vec{v}_{arr} + \\vec{v}_r'}</BlockMath>
          <P>
            suma de la velocidad de arrastre (cómo se mueve el sistema móvil
            en ese punto) y la velocidad relativa (cómo se mueve P dentro del
            sistema móvil).
          </P>
        </>
      ),
    },
  ],
  references: [
    'Mecánica, Tema 2: Cinemática del movimiento relativo',
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
  ],
};

// ─── Aceleración en el movimiento relativo ─────────────────────────────────
const theoryAceleracionRelativa: TheoryContent = {
  intro: (
    <>
      Igual que antes derivamos <InlineMath>{'\\vec{R} = \\vec{r}_0 + \\vec{r}'}</InlineMath>{' '}
      para obtener la velocidad, ahora derivamos otra vez —respecto al
      tiempo— la expresión de la velocidad{' '}
      <InlineMath>{'\\vec{v} = \\vec{v}_{arr} + \\vec{v}_r'}</InlineMath> para
      obtener la <strong>aceleración</strong>. Al volver a derivar aparece un
      término completamente nuevo, sin análogo en la velocidad: la{' '}
      <Term color={cB}>aceleración de Coriolis</Term>.
    </>
  ),
  sections: [
    {
      title: '1. Derivando la velocidad otra vez',
      body: (
        <>
          <TheorySvg caption="Mismo esquema de los sistemas fijo y móvil. Ahora ā₀ (verde) es la aceleración del origen móvil o, y ω̇̄ (rojo) es la aceleración angular del sistema móvil. En P aparecen v̄_r (azul) y ā_r (magenta), velocidad y aceleración relativas.">
            <DiagramAceleracionRelativa />
          </TheorySvg>
          <P>
            Partimos de{' '}
            <InlineMath>{'\\dfrac{d\\vec{R}}{dt} = \\dfrac{d\\vec{r}_0}{dt} + \\vec{\\omega}\\times\\vec{r} + \\vec{v}_r'}</InlineMath>{' '}
            y derivamos otra vez respecto al tiempo. Los tres términos vuelven
            a depender del tiempo (<InlineMath>{'\\vec{r}_0'}</InlineMath>,{' '}
            <InlineMath>{'\\vec{\\omega}'}</InlineMath>,{' '}
            <InlineMath>{'\\vec{r}'}</InlineMath> y{' '}
            <InlineMath>{'\\vec{v}_r'}</InlineMath> cambian con el tiempo), así
            que hay que aplicar la regla del producto a cada uno:
          </P>
          <BlockMath>
            {'\\frac{d^2\\vec{R}}{dt^2} = \\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times\\frac{d\\vec{r}}{dt} + \\frac{d\\vec{v}_r}{dt}'}
          </BlockMath>
          <Note>
            Al igual que antes, <InlineMath>{'d\\vec{r}/dt'}</InlineMath> y{' '}
            <InlineMath>{'d\\vec{v}_r/dt'}</InlineMath> hay que desarrollarlos
            en componentes del sistema móvil (aplicando otra vez la fórmula de
            Poisson a <InlineMath>{'\\vec{\\imath}, \\vec{\\jmath}, \\vec{k}'}</InlineMath>)
            para llegar a la expresión final. Es un desarrollo largo pero
            mecánico — aquí está completo por si interesa reproducirlo.
          </Note>
          <Collapsible summary="Ver desarrollo completo en componentes">
            <P>
              Escribimos <InlineMath>{'\\vec{r} = x\\vec{\\imath}+y\\vec{\\jmath}+z\\vec{k}'}</InlineMath>{' '}
              y <InlineMath>{'\\vec{v}_r = v_{rx}\\vec{\\imath}+v_{ry}\\vec{\\jmath}+v_{rz}\\vec{k}'}</InlineMath>,
              y derivamos cada componente y cada vector unitario:
            </P>
            <BlockMath>
              {'\\frac{d^2\\vec{R}}{dt^2} = \\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times\\frac{d}{dt}(x\\vec{\\imath}+y\\vec{\\jmath}+z\\vec{k}) + \\frac{d}{dt}(v_{rx}\\vec{\\imath}+v_{ry}\\vec{\\jmath}+v_{rz}\\vec{k})'}
            </BlockMath>
            <P>Aplicando la regla del producto término a término:</P>
            <BlockMath>
              {'{}=\\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times\\Big(\\frac{dx}{dt}\\vec{\\imath}+\\frac{dy}{dt}\\vec{\\jmath}+\\frac{dz}{dt}\\vec{k} + x\\frac{d\\vec{\\imath}}{dt}+y\\frac{d\\vec{\\jmath}}{dt}+z\\frac{d\\vec{k}}{dt}\\Big)+{}'}
            </BlockMath>
            <BlockMath>
              {'{}+\\frac{dv_{rx}}{dt}\\vec{\\imath}+\\frac{dv_{ry}}{dt}\\vec{\\jmath}+\\frac{dv_{rz}}{dt}\\vec{k} + v_{rx}\\frac{d\\vec{\\imath}}{dt}+v_{ry}\\frac{d\\vec{\\jmath}}{dt}+v_{rz}\\frac{d\\vec{k}}{dt}'}
            </BlockMath>
            <P>
              El primer paréntesis es{' '}
              <InlineMath>{'\\vec{v}_r'}</InlineMath> más los tres términos con
              Poisson (<InlineMath>{'d\\vec{\\imath}/dt=\\vec{\\omega}\\times\\vec{\\imath}'}</InlineMath>,
              etc.); la fila de abajo es{' '}
              <InlineMath>{'\\vec{a}_r'}</InlineMath> más otros tres términos
              con Poisson. Sustituyendo:
            </P>
            <BlockMath>
              {'{}=\\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times\\vec{v}_r + \\vec{\\omega}\\times(x\\,\\vec{\\omega}\\times\\vec{\\imath}+y\\,\\vec{\\omega}\\times\\vec{\\jmath}+z\\,\\vec{\\omega}\\times\\vec{k}) +{}'}
            </BlockMath>
            <BlockMath>
              {'{}+\\vec{a}_r + v_{rx}\\,\\vec{\\omega}\\times\\vec{\\imath}+v_{ry}\\,\\vec{\\omega}\\times\\vec{\\jmath}+v_{rz}\\,\\vec{\\omega}\\times\\vec{k}'}
            </BlockMath>
            <P>
              En el segundo término con <InlineMath>{'\\vec{\\omega}\\times'}</InlineMath>{' '}
              se saca <InlineMath>{'\\vec{\\omega}\\times'}</InlineMath> factor
              común y se reconoce{' '}
              <InlineMath>{'x\\vec{\\imath}+y\\vec{\\jmath}+z\\vec{k}=\\vec{r}'}</InlineMath>;
              en la última fila se reconoce{' '}
              <InlineMath>{'v_{rx}\\vec{\\imath}+v_{ry}\\vec{\\jmath}+v_{rz}\\vec{k}=\\vec{v}_r'}</InlineMath>{' '}
              otra vez, así que ese término también es{' '}
              <InlineMath>{'\\vec{\\omega}\\times\\vec{v}_r'}</InlineMath>:
            </P>
            <BlockMath>
              {'{}=\\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times\\vec{v}_r + \\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r}) + \\vec{a}_r + \\vec{\\omega}\\times\\vec{v}_r'}
            </BlockMath>
            <P>
              Quedan dos términos <InlineMath>{'\\vec{\\omega}\\times\\vec{v}_r'}</InlineMath>{' '}
              iguales, que se suman en <InlineMath>{'2\\vec{\\omega}\\times\\vec{v}_r'}</InlineMath>:
            </P>
            <BlockMath>
              {'\\frac{d^2\\vec{R}}{dt^2} = \\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + 2\\,\\vec{\\omega}\\times\\vec{v}_r + \\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r}) + \\vec{a}_r'}
            </BlockMath>
          </Collapsible>
        </>
      ),
    },
    {
      title: '2. Agrupando términos',
      body: (
        <>
          <P>El resultado, ya agrupado, tiene cinco términos:</P>
          <BlockMath>
            {'\\vec{a} = \\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + 2\\,\\vec{\\omega}\\times\\vec{v}_r + \\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r}) + \\vec{a}_r'}
          </BlockMath>
          <DefList
            items={[
              {
                term: <Term color={cG}>d²r̄₀/dt²</Term>,
                def: 'aceleración del origen móvil o respecto al fijo O.',
              },
              {
                term: <Term color={cR}>dω̄/dt × r̄</Term>,
                def: 'aceleración tangencial: aparece porque la velocidad angular ω̄ del sistema móvil no es constante.',
              },
              {
                term: <Term color={cB}>2ω̄ × v̄_r</Term>,
                def: 'aceleración de Coriolis: el término nuevo, sin análogo en la velocidad.',
              },
              {
                term: <Term color={cR}>ω̄ × (ω̄ × r̄)</Term>,
                def: 'aceleración normal (centrípeta) debida al giro del sistema móvil respecto al fijo.',
              },
              {
                term: <Term color={cM}>ā_r</Term>,
                def: 'aceleración relativa: la aceleración de P vista desde dentro del sistema móvil, sin derivar sus vectores unitarios.',
              },
            ]}
          />
          <Note>
            La <Term color={cB}>aceleración de Coriolis</Term> no existía en
            la velocidad porque ahí solo derivábamos una vez. Al derivar dos
            veces, el término <InlineMath>{'\\vec{\\omega}\\times\\vec{v}_r'}</InlineMath>{' '}
            aparece por <em>dos</em> caminos distintos —una vez al derivar{' '}
            <InlineMath>{'\\vec{r}'}</InlineMath> y otra al derivar{' '}
            <InlineMath>{'\\vec{v}_r'}</InlineMath>— y por eso se suman en{' '}
            <InlineMath>{'2\\vec{\\omega}\\times\\vec{v}_r'}</InlineMath>.
          </Note>
        </>
      ),
    },
    {
      title: '3. Aceleración absoluta = arrastre + relativa + Coriolis',
      body: (
        <>
          <P>
            Los tres términos que solo dependen de cómo se mueve el sistema
            móvil (no de cómo se mueve P dentro de él) se agrupan en la{' '}
            <Mark>aceleración de arrastre</Mark>: es la aceleración que
            tendría <InlineMath>{'P'}</InlineMath> si estuviera "pegado" al
            sistema móvil, sin moverse respecto a él.
          </P>
          <BlockMath>
            {'\\vec{a}_{arr} = \\frac{d^2\\vec{r}_0}{dt^2} + \\frac{d\\vec{\\omega}}{dt}\\times\\vec{r} + \\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r})'}
          </BlockMath>
          <P>
            El término de Coriolis se deja aparte, porque —a diferencia de la
            velocidad— no puede meterse ni en la aceleración de arrastre ni
            en la relativa: depende de <strong>ambas a la vez</strong> (de
            la rotación de arrastre <InlineMath>{'\\vec{\\omega}'}</InlineMath>{' '}
            y de la velocidad relativa <InlineMath>{'\\vec{v}_r'}</InlineMath>):
          </P>
          <BlockMath>{'\\vec{a}_c = 2\\,\\vec{\\omega}\\times\\vec{v}_r'}</BlockMath>
          <P>La aceleración absoluta de P es entonces:</P>
          <BlockMath>{'\\vec{a} = \\vec{a}_{arr} + \\vec{a}_r + \\vec{a}_c'}</BlockMath>
          <Note>
            Ejemplo clásico de Coriolis: una persona caminando en línea recta
            hacia el centro de un tiovivo en marcha. Vista desde el tiovivo
            (relativo), camina en línea recta a velocidad{' '}
            <InlineMath>{'v_r'}</InlineMath> constante — su{' '}
            <InlineMath>{'\\vec{a}_r'}</InlineMath> es nula. Pero vista desde
            fuera (absoluta), su trayectoria se curva: esa curvatura extra,
            que no viene ni del giro del tiovivo por sí solo ni de cómo
            camina la persona por sí sola, es precisamente{' '}
            <InlineMath>{'\\vec{a}_c'}</InlineMath>.
          </Note>
        </>
      ),
    },
  ],
  references: [
    'Mecánica, Tema 2: Cinemática del movimiento relativo',
    'Beer & Johnston — Mecánica vectorial para ingenieros: Dinámica (Ed. 12)',
    'Meriam & Kraige — Engineering Mechanics: Dynamics',
  ],
};

// ─── Catálogo de teoría (crecerá con más temas/subsecciones) ──────────────
export interface TheoryEntry {
  id: string;
  subject: string;
  /** Tema dentro de la asignatura, usado para la navegación (p. ej. "Cinemática") */
  tema: string;
  /** Subtema, más fino, mostrado como etiqueta (p. ej. "Cinemática del movimiento relativo") */
  topic: string;
  /** Título de la subsección */
  title: string;
  summary: string;
  content: TheoryContent;
}

const theoryEntries: TheoryEntry[] = [
  {
    id: 'sistemas-referencia',
    subject: 'Mecánica',
    tema: 'Cinemática',
    topic: 'Cinemática del movimiento relativo',
    title: 'Sistemas de referencia fijo y móvil',
    summary:
      'Cómo se localiza un punto P desde un sistema fijo OXYZ y un sistema móvil oxyz, ' +
      'y qué se entiende por movimiento absoluto, relativo y de arrastre.',
    content: theorySistemasReferencia,
  },
  {
    id: 'velocidad-movimiento-relativo',
    subject: 'Mecánica',
    tema: 'Cinemática',
    topic: 'Cinemática del movimiento relativo',
    title: 'Velocidad en el movimiento relativo',
    summary:
      'Derivación de R̄ = r̄₀ + r̄ con la fórmula de Poisson para llegar a ' +
      'v̄ = v̄_arr + v̄_r, distinguiendo la velocidad de traslación v̄₀, la ' +
      'velocidad angular ω̄ y la velocidad relativa v̄_r.',
    content: theoryVelocidadRelativa,
  },
  {
    id: 'aceleracion-movimiento-relativo',
    subject: 'Mecánica',
    tema: 'Cinemática',
    topic: 'Cinemática del movimiento relativo',
    title: 'Aceleración en el movimiento relativo',
    summary:
      'Derivando v̄ = v̄_arr + v̄_r otra vez se llega a ā = ā_arr + ā_r + ā_c, ' +
      'con el nuevo término de Coriolis ā_c = 2ω̄×v̄_r. El desarrollo completo ' +
      'en componentes queda en un desplegable aparte.',
    content: theoryAceleracionRelativa,
  },
  {
    id: 'gradiente',
    subject: 'Campos y Ondas',
    tema: 'Análisis vectorial',
    topic: 'Operadores diferenciales',
    title: 'El gradiente ∇V',
    summary:
      'Definición dV = ∇V·dr, significado geométrico (máximo crecimiento, ⟂ equipotenciales), ' +
      'derivada direccional, expresión en los tres sistemas vía el tensor métrico, E = −∇V y ' +
      'Poisson/Laplace, identidades y ejemplos resueltos. Notación del Equipo Docente (UNED).',
    content: theoryGradiente,
  },
  {
    id: 'divergencia-rotacional',
    subject: 'Campos y Ondas',
    tema: 'Análisis vectorial',
    topic: 'Operadores diferenciales',
    title: 'Divergencia y rotacional',
    summary:
      'Idea física (fuentes/sumideros vs. circulación), definiciones de ∇·A y ∇×A, teoremas de ' +
      'Gauss y Stokes, identidades ∇·(∇×A)=0 y ∇×(∇V)=0, divergencia en cilíndricas/esféricas y ' +
      'ejemplos resueltos. Notación del Equipo Docente (UNED).',
    content: theoryDivergenciaRotacional,
  },
];

export default theoryEntries;
