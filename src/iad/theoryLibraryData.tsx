import type { TheoryContent } from '../components/TheoryPanel';
import { P, Note, Mark, TheorySvg } from '../components/TheoryPanel';
import { BlockMath, InlineMath } from '../components/Math';
import { DiagramSistemasReferencia } from '../components/TheoryDiagrams';

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
];

export default theoryEntries;
