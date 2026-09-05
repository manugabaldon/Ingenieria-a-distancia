import { useState } from 'react';
import TheoryPanel from '../components/TheoryPanel';
import ExerciseGuide from './ExerciseGuide';
import videos, { type IADVideo } from './videosData';
import theoryEntries, { type TheoryEntry } from './theoryLibraryData';
import { slugify } from './slug';
import { SUBJECT_ART } from './SubjectArt';
import './IADView.css';

type Tab = 'video' | 'solution' | 'theory' | 'exercise' | 'simulator';

/** Herramienta de Simula/Calcula enlazable desde una asignatura (ver App.tsx). */
export interface IADToolLink {
  id: string;
  icon: string;
  label: string;
  subtitle: string;
  section: string;
}

// ─── Detalle de un ejercicio (vídeo/solución/ejercicio/teoría/simulador) ────────
function VideoDetail({ video, onBack }: { video: IADVideo; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('video');

  const tabs: { id: Tab; label: string; available: boolean }[] = [
    { id: 'video',     label: '📺 Vídeo',      available: true },
    { id: 'solution',  label: '📄 Solución',   available: !!video.Solution },
    { id: 'exercise',  label: '📝 Ejercicio',  available: !!video.exerciseGuide },
    { id: 'theory',    label: '📖 Teoría',     available: !!video.theory },
    { id: 'simulator', label: '⚙ Simulador',   available: !!video.Simulator },
  ];

  return (
    <div className="iad-detail iad-detail-nested">
      <button className="iad-back" onClick={onBack}>← Ejercicios resueltos</button>

      <div className="iad-detail-header">
        <span className="iad-subject-badge">{video.subject}</span>
        <h2>{video.title}</h2>
        <p className="iad-detail-desc">{video.description}</p>
        <span className="iad-detail-ref">{video.topic} · Ejercicio {video.exerciseRef} · {video.date}</span>
      </div>

      <div className="iad-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`iad-tab${tab === t.id ? ' active' : ''}${!t.available ? ' disabled' : ''}`}
            onClick={() => t.available && setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="iad-tab-content">
        {tab === 'video' && (
          <div className="iad-video-wrap">
            {video.youtubeId ? (
              <iframe
                className="iad-yt-iframe"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allowFullScreen
              />
            ) : (
              <div className="iad-coming-soon">
                <span className="iad-cs-icon">🎬</span>
                <h3>Vídeo próximamente</h3>
                <p>
                  Este ejercicio está resuelto — el vídeo se publicará en el canal
                  <strong> Ingeniería a Distancia</strong> en YouTube en breve.
                </p>
                <p className="iad-cs-hint">
                  Mientras tanto, explora la teoría y el simulador interactivo.
                </p>
              </div>
            )}
          </div>
        )}

        {tab === 'solution' && video.Solution && (
          <video.Solution />
        )}

        {tab === 'exercise' && video.exerciseGuide && (
          <ExerciseGuide
            title={video.exerciseGuide.title}
            intro={video.exerciseGuide.intro}
            steps={video.exerciseGuide.steps}
          />
        )}

        {tab === 'theory' && video.theory && (
          <TheoryPanel content={video.theory} />
        )}

        {tab === 'simulator' && video.Simulator && (
          <video.Simulator />
        )}
      </div>
    </div>
  );
}

// ─── Card de vídeo ─────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }: { video: IADVideo; onClick: () => void }) {
  return (
    <div className="iad-card" onClick={onClick}>
      <div className="iad-card-thumb">
        {video.youtubeId ? (
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
            alt={video.title}
          />
        ) : (
          <div className="iad-card-thumb-placeholder">
            <span>🎬</span>
            <span className="iad-soon-badge">Próximamente</span>
          </div>
        )}
      </div>
      <div className="iad-card-body">
        <div className="iad-card-meta">
          <span className="iad-subject-badge sm">{video.subject}</span>
          <span className="iad-ref-badge">{video.exerciseRef}</span>
          <span className="iad-date">{video.date}</span>
        </div>
        <h3 className="iad-card-title">{video.title}</h3>
        <p className="iad-card-desc">{video.description}</p>
        <div className="iad-card-chips">
          {video.theory    && <span className="chip chip-theory">Teoría</span>}
          {video.Simulator && <span className="chip chip-sim">Simulador</span>}
          {video.youtubeId && <span className="chip chip-yt">YouTube</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Grid de ejercicios de un tema, agrupados por subtema (sin cabecera propia) ──
function ExerciseTopicGrid({ items, onOpen }: { items: IADVideo[]; onOpen: (id: string) => void }) {
  const topics = [...new Set(items.map(v => v.topic))];
  return (
    <>
      {topics.map(topic => {
        const topicItems = items.filter(v => v.topic === topic);
        return (
          <div key={topic} className="iad-topic-group">
            <h4 className="iad-topic-title">
              {topic}
              <span className="iad-topic-count">{topicItems.length}</span>
            </h4>
            <div className="iad-grid">
              {topicItems.map(v => (
                <VideoCard key={v.id} video={v} onClick={() => onOpen(v.id)} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── Navegación entre varias entradas de teoría de un mismo tema ────────────────
function TheoryEntryNav({
  entries, activeId, onSelect,
}: {
  entries: TheoryEntry[]; activeId: string | undefined; onSelect: (id: string) => void;
}) {
  const topics = [...new Set(entries.map(e => e.topic))];
  return (
    <div className="iad-entry-nav">
      {topics.map(topic => (
        <div key={topic} className="iad-entry-group">
          {topics.length > 1 && <span className="iad-entry-group-label">{topic}</span>}
          <div className="iad-entry-pills">
            {entries.filter(e => e.topic === topic).map(e => (
              <button
                key={e.id}
                className={`iad-entry-pill${e.id === activeId ? ' active' : ''}`}
                onClick={() => onSelect(e.id)}
              >
                {e.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Nivel 0: todas las asignaturas ──────────────────────────────────────────────
function SubjectsLevel({
  subjects, go,
}: {
  subjects: string[]; go: (parts: string[]) => void;
}) {
  return (
    <div className="iad-home">
      <div className="iad-subject-group">
        <h3 className="iad-subject-title">Asignaturas</h3>
        <div className="iad-grid">
          {subjects.map(subject => {
            const temaCount = new Set([
              ...videos.filter(v => v.subject === subject).map(v => v.tema),
              ...theoryEntries.filter(e => e.subject === subject).map(e => e.tema),
            ]).size;
            const theoryCount = theoryEntries.filter(e => e.subject === subject).length;
            const exerciseCount = videos.filter(v => v.subject === subject).length;
            const Art = SUBJECT_ART[subject];
            return (
              <div
                key={subject}
                className="iad-card iad-subject-card"
                onClick={() => go([slugify(subject)])}
              >
                {Art && (
                  <>
                    <div className="iad-subject-card-art"><Art /></div>
                    <div className="iad-subject-card-scrim" />
                  </>
                )}
                <div className="iad-subject-card-body">
                  <div className="iad-theory-card-icon">📚</div>
                  <h3 className="iad-card-title">{subject}</h3>
                  <p className="iad-card-desc">
                    {temaCount} tema{temaCount !== 1 ? 's' : ''}
                  </p>
                  <div className="iad-card-chips">
                    {theoryCount > 0 && <span className="chip chip-theory">{theoryCount} teoría</span>}
                    {exerciseCount > 0 && <span className="chip chip-sim">{exerciseCount} ejercicios</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Nivel 1: espacio de una asignatura — archivador de temas + página de teoría ──
function SubjectWorkspace({
  subject, subjectSlug, temas, tema, temaSlug, section, itemId, go, tools, onOpenTool,
}: {
  subject: string; subjectSlug: string; temas: string[]; tema: string; temaSlug: string;
  section: string | undefined; itemId: string | undefined;
  go: (parts: string[]) => void;
  tools: IADToolLink[]; onOpenTool: (id: string) => void;
}) {
  const theoryForTema = theoryEntries.filter(e => e.subject === subject && e.tema === tema);
  const exercisesForTema = videos.filter(v => v.subject === subject && v.tema === tema);
  const relatedTools = tools.filter(t => t.section === subject);
  const hasTheory = theoryForTema.length > 0;

  const mode: 'teoria' | 'ejercicios' =
    section === 'ejercicios' ? 'ejercicios' : (hasTheory ? 'teoria' : 'ejercicios');

  const entry = mode === 'teoria'
    ? (theoryForTema.find(e => e.id === itemId) ?? theoryForTema[0])
    : undefined;
  const video = mode === 'ejercicios' && itemId
    ? exercisesForTema.find(v => v.id === itemId)
    : undefined;

  return (
    <div className="iad-home iad-workspace">
      <button className="iad-back" onClick={() => go([])}>← Asignaturas</button>
      <span className="iad-subject-badge iad-workspace-subject">{subject}</span>

      <div className="iad-archivador">
        {temas.map(t => (
          <button
            key={t}
            className={`iad-archivador-tab${t === tema ? ' active' : ''}`}
            onClick={() => go([subjectSlug, slugify(t)])}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="iad-workspace-panel">
        <div className="iad-tabs iad-workspace-tabs">
          {hasTheory && (
            <button
              className={`iad-tab${mode === 'teoria' ? ' active' : ''}`}
              onClick={() => go([subjectSlug, temaSlug])}
            >
              📖 Teoría
            </button>
          )}
          {exercisesForTema.length > 0 && (
            <button
              className={`iad-tab${mode === 'ejercicios' ? ' active' : ''}`}
              onClick={() => go([subjectSlug, temaSlug, 'ejercicios'])}
            >
              📝 Ejercicios
            </button>
          )}
          {relatedTools.map(t => (
            <button key={t.id} className="iad-tab iad-tab-tool" onClick={() => onOpenTool(t.id)}>
              {t.icon} {t.label} →
            </button>
          ))}
        </div>

        {mode === 'teoria' && entry && (
          <>
            {theoryForTema.length > 1 && (
              <TheoryEntryNav
                entries={theoryForTema}
                activeId={entry.id}
                onSelect={(id) => go([subjectSlug, temaSlug, 'teoria', id])}
              />
            )}
            <div className="iad-entry-header">
              <h2>{entry.title}</h2>
              <p className="iad-detail-desc">{entry.summary}</p>
            </div>
            <TheoryPanel content={entry.content} />
          </>
        )}

        {mode === 'ejercicios' && (
          video ? (
            <VideoDetail video={video} onBack={() => go([subjectSlug, temaSlug, 'ejercicios'])} />
          ) : (
            <ExerciseTopicGrid
              items={exercisesForTema}
              onOpen={(id) => go([subjectSlug, temaSlug, 'ejercicios', id])}
            />
          )
        )}
      </div>
    </div>
  );
}

// ─── Vista principal: enrutador por segmentos de path ───────────────────────────
export default function IADView({
  path, onNavigate, tools, onOpenTool,
}: {
  /** Segmentos tras '#estudia/', p. ej. "campos-y-ondas/analisis-vectorial/teoria/gradiente" */
  path: string | null;
  onNavigate: (path: string | null) => void;
  /** Herramientas de Simula/Calcula enlazables por asignatura (ver App.tsx). */
  tools: IADToolLink[];
  onOpenTool: (id: string) => void;
}) {
  const segments = (path ?? '').split('/').filter(Boolean);
  const go = (parts: string[]) => onNavigate(parts.length ? parts.join('/') : null);

  const subjects = [...new Set([...videos, ...theoryEntries].map(x => x.subject))];
  const subjectSlug = segments[0];
  const subject = subjectSlug ? subjects.find(s => slugify(s) === subjectSlug) : undefined;

  if (!subject) {
    return <SubjectsLevel subjects={subjects} go={go} />;
  }

  const temas = [...new Set([
    ...videos.filter(v => v.subject === subject).map(v => v.tema),
    ...theoryEntries.filter(e => e.subject === subject).map(e => e.tema),
  ])];
  const temaSlug = segments[1];
  // Sin tema en la URL (o inválido) → el primero, directo, sin pantalla intermedia.
  const tema = (temaSlug && temas.find(t => slugify(t) === temaSlug)) || temas[0];

  return (
    <SubjectWorkspace
      subject={subject}
      subjectSlug={subjectSlug}
      temas={temas}
      tema={tema}
      temaSlug={slugify(tema)}
      section={segments[2]}
      itemId={segments[3]}
      go={go}
      tools={tools}
      onOpenTool={onOpenTool}
    />
  );
}
