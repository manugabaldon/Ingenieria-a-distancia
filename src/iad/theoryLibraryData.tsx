import type { TheoryContent } from '../components/TheoryPanel';
import { P, Note, Mark, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import {
  DiagramSistemasReferencia,
  DiagramVelocidadRelativa,
} from '../components/TheoryDiagrams';

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

// ─── Catálogo de teoría (crecerá con más temas/subsecciones) ──────────────
export interface TheoryEntry {
  id: string;
  subject: string;
  /** Tema dentro de la asignatura */
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
    topic: 'Cinemática del movimiento relativo',
    title: 'Velocidad en el movimiento relativo',
    summary:
      'Derivación de R̄ = r̄₀ + r̄ con la fórmula de Poisson para llegar a ' +
      'v̄ = v̄_arr + v̄_r, distinguiendo la velocidad de traslación v̄₀, la ' +
      'velocidad angular ω̄ y la velocidad relativa v̄_r.',
    content: theoryVelocidadRelativa,
  },
];

export default theoryEntries;
