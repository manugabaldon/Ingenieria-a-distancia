import { useState } from 'react';
import TheoryPanel from '../components/TheoryPanel';
import ExerciseGuide from './ExerciseGuide';
import videos, { type IADVideo } from './videosData';
import './IADView.css';

type Tab = 'video' | 'solution' | 'theory' | 'exercise' | 'simulator';

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
      <button className="iad-back" onClick={onBack}>← Volver al canal</button>

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

// ─── Vista principal ───────────────────────────────────────────────────────────
export default function IADView({ initialExerciseId }: { initialExerciseId?: string | null } = {}) {
  const [selected, setSelected] = useState<IADVideo | null>(
    () => (initialExerciseId ? videos.find(v => v.id === initialExerciseId) ?? null : null),
  );

  if (selected) {
    return <VideoDetail video={selected} onBack={() => setSelected(null)} />;
  }

  const subjects = [...new Set(videos.map(v => v.subject))];

  return (
    <div className="iad-home">
      <div className="iad-hero">
        <div className="iad-hero-icon">📡</div>
        <h2>Ingeniería a Distancia</h2>
        <p className="iad-hero-sub">
          Canal de YouTube donde resuelvo ejercicios de la carrera de
          <strong> Ingeniería Electrónica Industrial</strong>.
          Cada entrada incluye el vídeo de la resolución, la teoría relacionada
          y un simulador interactivo del problema.
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

      {subjects.map(subject => {
        const subjectVideos = videos.filter(v => v.subject === subject);
        const topics = [...new Set(subjectVideos.map(v => v.topic))];
        return (
          <div key={subject} className="iad-subject-group">
            <h3 className="iad-subject-title">{subject}</h3>
            {topics.map(topic => {
              const topicVideos = subjectVideos.filter(v => v.topic === topic);
              return (
                <div key={topic} className="iad-topic-group">
                  <h4 className="iad-topic-title">
                    {topic}
                    <span className="iad-topic-count">{topicVideos.length}</span>
                  </h4>
                  <div className="iad-grid">
                    {topicVideos.map(v => (
                      <VideoCard key={v.id} video={v} onClick={() => setSelected(v)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
