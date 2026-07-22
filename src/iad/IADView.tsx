import { useState } from 'react';
import type { ReactNode } from 'react';
import TheoryPanel from '../components/TheoryPanel';
import ExerciseGuide from './ExerciseGuide';
import videos, { type IADVideo } from './videosData';
import theoryEntries, { type TheoryEntry } from './theoryLibraryData';
import './IADView.css';

type Tab = 'video' | 'solution' | 'theory' | 'exercise' | 'simulator';

/** "Cinemática del punto" → "cinematica-del-punto" (para las rutas #estudia/...) */
const ACCENTS: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n',
  Á: 'a', É: 'e', Í: 'i', Ó: 'o', Ú: 'u', Ü: 'u', Ñ: 'n',
};
function slugify(s: string): string {
  return s
    .split('').map(ch => ACCENTS[ch] ?? ch).join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
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
    <div className="iad-detail">
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

// ─── Detalle de una subsección de teoría ────────────────────────────────────────
function TheoryDetail({ entry, onBack }: { entry: TheoryEntry; onBack: () => void }) {
  return (
    <div className="iad-detail">
      <button className="iad-back" onClick={onBack}>← Teoría</button>

      <div className="iad-detail-header">
        <span className="iad-subject-badge">{entry.subject}</span>
        <h2>{entry.title}</h2>
        <p className="iad-detail-desc">{entry.summary}</p>
        <span className="iad-detail-ref">{entry.topic}</span>
      </div>

      <TheoryPanel content={entry.content} />
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

// ─── Card de teoría ─────────────────────────────────────────────────────────────
function TheoryCard({ entry, onClick }: { entry: TheoryEntry; onClick: () => void }) {
  return (
    <div className="iad-card iad-theory-card" onClick={onClick}>
      <div className="iad-theory-card-icon">📘</div>
      <div className="iad-card-body">
        <h3 className="iad-card-title">{entry.title}</h3>
        <p className="iad-card-desc">{entry.summary}</p>
        <span className="chip chip-theory">Teoría</span>
      </div>
    </div>
  );
}

// ─── Nivel 0: todas las asignaturas ──────────────────────────────────────────────
function SubjectsLevel({
  subjects, go, extra,
}: {
  subjects: string[]; go: (parts: string[]) => void; extra?: ReactNode;
}) {
  return (
    <div className="iad-home">
      <div className="iad-hero">
        <div className="iad-hero-icon">📡</div>
        <h2>Ingeniería a Distancia</h2>
        <p className="iad-hero-sub">
          Canal de YouTube donde resuelvo ejercicios de la carrera de
          <strong> Ingeniería Electrónica Industrial</strong>.
          Cada tema incluye la teoría y los ejercicios resueltos, con vídeo,
          desarrollo completo y un simulador interactivo.
        </p>
        <a
          className="iad-yt-btn"
          href="https://www.youtube.com/@ingenieriaadistancia?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ Suscríbete en YouTube
        </a>
      </div>

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
            return (
              <div
                key={subject}
                className="iad-card iad-theory-card"
                onClick={() => go([slugify(subject)])}
              >
                <div className="iad-theory-card-icon">📚</div>
                <div className="iad-card-body">
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

      {extra}
    </div>
  );
}

// ─── Nivel 1: temas de una asignatura ────────────────────────────────────────────
function TemasLevel({
  subject, subjectSlug, temas, go,
}: {
  subject: string; subjectSlug: string; temas: string[]; go: (parts: string[]) => void;
}) {
  return (
    <div className="iad-home">
      <button className="iad-back" onClick={() => go([])}>← Asignaturas</button>

      <div className="iad-subject-group">
        <h3 className="iad-subject-title">{subject}</h3>
        <div className="iad-grid">
          {temas.map(tema => {
            const theoryCount = theoryEntries.filter(e => e.subject === subject && e.tema === tema).length;
            const exerciseCount = videos.filter(v => v.subject === subject && v.tema === tema).length;
            return (
              <div
                key={tema}
                className="iad-card iad-theory-card"
                onClick={() => go([subjectSlug, slugify(tema)])}
              >
                <div className="iad-theory-card-icon">🗂️</div>
                <div className="iad-card-body">
                  <h3 className="iad-card-title">{tema}</h3>
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

// ─── Nivel 2: portada de un tema — las dos rutas Teoría / Ejercicios ────────────
function TemaHomeLevel({
  subject, subjectSlug, tema, temaSlug, go,
}: {
  subject: string; subjectSlug: string; tema: string; temaSlug: string; go: (parts: string[]) => void;
}) {
  const theoryCount = theoryEntries.filter(e => e.subject === subject && e.tema === tema).length;
  const exerciseCount = videos.filter(v => v.subject === subject && v.tema === tema).length;

  return (
    <div className="iad-home">
      <button className="iad-back" onClick={() => go([subjectSlug])}>← {subject}</button>

      <div className="iad-subject-group">
        <h3 className="iad-subject-title">{tema}</h3>
        <div className="iad-route-grid">
          <div
            className={`iad-route-card${theoryCount === 0 ? ' iad-route-empty' : ''}`}
            onClick={() => theoryCount > 0 && go([subjectSlug, temaSlug, 'teoria'])}
          >
            <span className="iad-route-icon">📖</span>
            <h3>Teoría</h3>
            <p>{theoryCount > 0 ? `${theoryCount} entrada${theoryCount !== 1 ? 's' : ''}` : 'Próximamente'}</p>
          </div>
          <div
            className={`iad-route-card${exerciseCount === 0 ? ' iad-route-empty' : ''}`}
            onClick={() => exerciseCount > 0 && go([subjectSlug, temaSlug, 'ejercicios'])}
          >
            <span className="iad-route-icon">📝</span>
            <h3>Ejercicios resueltos</h3>
            <p>{exerciseCount > 0 ? `${exerciseCount} ejercicio${exerciseCount !== 1 ? 's' : ''}` : 'Próximamente'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nivel 3a: lista de teoría de un tema ────────────────────────────────────────
function TeoriaListLevel({
  subject, subjectSlug, tema, temaSlug, go,
}: {
  subject: string; subjectSlug: string; tema: string; temaSlug: string; go: (parts: string[]) => void;
}) {
  const entries = theoryEntries.filter(e => e.subject === subject && e.tema === tema);
  const topics = [...new Set(entries.map(e => e.topic))];

  return (
    <div className="iad-home">
      <button className="iad-back" onClick={() => go([subjectSlug, temaSlug])}>← {tema}</button>

      <div className="iad-subject-group">
        <h3 className="iad-subject-title">📖 Teoría · {tema}</h3>
        {topics.map(topic => {
          const topicEntries = entries.filter(e => e.topic === topic);
          return (
            <div key={topic} className="iad-topic-group">
              <h4 className="iad-topic-title">
                {topic}
                <span className="iad-topic-count">{topicEntries.length}</span>
              </h4>
              <div className="iad-grid">
                {topicEntries.map(e => (
                  <TheoryCard key={e.id} entry={e} onClick={() => go([subjectSlug, temaSlug, 'teoria', e.id])} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Nivel 3b: lista de ejercicios de un tema ────────────────────────────────────
function EjerciciosListLevel({
  subject, subjectSlug, tema, temaSlug, go,
}: {
  subject: string; subjectSlug: string; tema: string; temaSlug: string; go: (parts: string[]) => void;
}) {
  const items = videos.filter(v => v.subject === subject && v.tema === tema);
  const topics = [...new Set(items.map(v => v.topic))];

  return (
    <div className="iad-home">
      <button className="iad-back" onClick={() => go([subjectSlug, temaSlug])}>← {tema}</button>

      <div className="iad-subject-group">
        <h3 className="iad-subject-title">📝 Ejercicios resueltos · {tema}</h3>
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
                  <VideoCard key={v.id} video={v} onClick={() => go([subjectSlug, temaSlug, 'ejercicios', v.id])} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vista principal: enrutador por segmentos de path ───────────────────────────
export default function IADView({
  path,
  onNavigate,
  extra,
}: {
  /** Segmentos tras '#estudia/', p. ej. "mecanica/cinematica/teoria/velocidad-movimiento-relativo" */
  path: string | null;
  onNavigate: (path: string | null) => void;
  /** Contenido extra mostrado solo en el nivel raíz (p. ej. el aviso del Temario LMA) */
  extra?: ReactNode;
}) {
  const segments = (path ?? '').split('/').filter(Boolean);
  const go = (parts: string[]) => onNavigate(parts.length ? parts.join('/') : null);

  const subjects = [...new Set([...videos, ...theoryEntries].map(x => x.subject))];
  const subjectSlug = segments[0];
  const subject = subjectSlug ? subjects.find(s => slugify(s) === subjectSlug) : undefined;

  if (!subject) {
    return <SubjectsLevel subjects={subjects} go={go} extra={extra} />;
  }

  const temas = [...new Set([
    ...videos.filter(v => v.subject === subject).map(v => v.tema),
    ...theoryEntries.filter(e => e.subject === subject).map(e => e.tema),
  ])];
  const temaSlug = segments[1];
  const tema = temaSlug ? temas.find(t => slugify(t) === temaSlug) : undefined;

  if (!tema) {
    return <TemasLevel subject={subject} subjectSlug={subjectSlug} temas={temas} go={go} />;
  }

  const section = segments[2];
  const itemId = segments[3];

  if (section === 'teoria') {
    const entry = itemId
      ? theoryEntries.find(e => e.id === itemId && e.subject === subject && e.tema === tema)
      : undefined;
    if (entry) {
      return <TheoryDetail entry={entry} onBack={() => go([subjectSlug, temaSlug, 'teoria'])} />;
    }
    return <TeoriaListLevel subject={subject} subjectSlug={subjectSlug} tema={tema} temaSlug={temaSlug} go={go} />;
  }

  if (section === 'ejercicios') {
    const video = itemId
      ? videos.find(v => v.id === itemId && v.subject === subject && v.tema === tema)
      : undefined;
    if (video) {
      return <VideoDetail video={video} onBack={() => go([subjectSlug, temaSlug, 'ejercicios'])} />;
    }
    return <EjerciciosListLevel subject={subject} subjectSlug={subjectSlug} tema={tema} temaSlug={temaSlug} go={go} />;
  }

  return <TemaHomeLevel subject={subject} subjectSlug={subjectSlug} tema={tema} temaSlug={temaSlug} go={go} />;
}
