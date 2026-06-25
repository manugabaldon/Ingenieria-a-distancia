import { useState, useRef, useCallback } from 'react';
import './App.css';
import ParallaxBg from './components/ParallaxSection';

// Courses
import CourseView from './courses/CourseView';
import m2  from './courses/m2/index';
import m3  from './courses/m3/index';
import m4  from './courses/m4/index';
import m8  from './courses/m8/index';
import m15 from './courses/m15/index';
import m16 from './courses/m16/index';
import m17 from './courses/m17/index';

// Aeronautics
import BalanceoHelice     from './aeronautics/BalanceoHelice';
import AtmosferaISA       from './aeronautics/AtmosferaISA';
import PesoYCentrado      from './aeronautics/PesoYCentrado';
import Conversiones       from './aeronautics/Conversiones';
import DesequilibrioRotor from './aeronautics/DesequilibrioRotor';

// Electronics
import RadarRangeEquation from './electronics/RadarRangeEquation';
import PitotEstatico      from './electronics/PitotEstatico';
import AntennaDesigner    from './electronics/AntennaDesigner';
import FiltrosAvionica    from './electronics/FiltrosAvionica';

// IAD — Ingeniería a Distancia
import IADView from './iad/IADView';
import iadVideos from './iad/videosData';

// Theory
import TheoryPanel, { TheoryContent } from './components/TheoryPanel';
import theoryRotor    from './theories/theoryRotor';
import theoryBalanceo from './theories/theoryBalanceo';
import theoryISA      from './theories/theoryISA';
import theoryWyC      from './theories/theoryWyC';
import theoryRadar    from './theories/theoryRadar';
import theoryPitot    from './theories/theoryPitot';
import theoryAntenna  from './theories/theoryAntenna';
import theoryFiltros  from './theories/theoryFiltros';

// ─── Imágenes por herramienta ───────────────────────────────────────────────
const TOOL_BG: Record<string, string> = {
  rotor:       'https://images.unsplash.com/photo-1569601811497-03a05e22d8e3?w=1400&q=75',
  balanceo:    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&q=75',
  wyc:         'https://images.unsplash.com/photo-1583470790950-7da77b8e69c1?w=1400&q=75',
  isa:         'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&q=75',
  conv:        'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=1400&q=75',
  radar:       'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1400&q=75',
  pitot:       'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=75',
  antenna:     'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=1400&q=75',
  filtros:     'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=75',
  'curso-lma': 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1400&q=75',
  'iad':       'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=75',
};

const HOME_BG = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80';

type ToolId =
  | 'home'
  | 'rotor' | 'balanceo' | 'wyc' | 'isa' | 'conv'
  | 'radar' | 'pitot' | 'antenna' | 'filtros'
  | 'curso-lma' | 'iad';

interface Tool {
  id: ToolId;
  icon: string;
  label: string;
  subtitle: string;
  section: string;
  description: string;
  tag?: 'free' | 'pro';
  theory?: TheoryContent;
}

const TOOLS: Tool[] = [
  {
    id: 'iad', icon: '📡', section: 'Ingeniería a Distancia',
    label: 'Ingeniería a Distancia', subtitle: 'UNED · Ejercicios resueltos en vídeo',
    description: 'Canal de YouTube donde resuelvo ejercicios de Ingeniería Electrónica Industrial (UNED). Cada entrada incluye el vídeo, la teoría y un simulador interactivo del problema.',
    tag: 'free',
  },
  {
    id: 'rotor', icon: '⚙', section: 'Aeronáutica',
    label: 'Desequilibrio de rotor', subtitle: 'Estático / dinámico',
    description: 'Simula desequilibrio estático y dinámico. Visualiza vibración de cojinetes, órbitas y fuerzas centrífugas en tiempo real.',
    tag: 'free', theory: theoryRotor,
  },
  {
    id: 'balanceo', icon: '⚖', section: 'Aeronáutica',
    label: 'Balanceo de hélice', subtitle: 'Método vectorial — plano único',
    description: 'Calcula la masa y ángulo de corrección a partir de dos mediciones de vibración. Método vectorial (AMM 61-20 / EASA Part-66).',
    tag: 'free', theory: theoryBalanceo,
  },
  {
    id: 'wyc', icon: '✈', section: 'Aeronáutica',
    label: 'Peso y Centrado', subtitle: 'Envolvente CG — Cessna 172S',
    description: 'Introduce pesos en cada estación y comprueba si el CG queda dentro de la envolvente de vuelo según el POH.',
    tag: 'free', theory: theoryWyC,
  },
  {
    id: 'isa', icon: '🌍', section: 'Aeronáutica',
    label: 'Atmósfera ISA', subtitle: 'T, P, ρ, a a cualquier altitud',
    description: 'Calcula las propiedades del aire según la Atmósfera Estándar Internacional (ISA) en troposfera y estratosfera.',
    tag: 'free', theory: theoryISA,
  },
  {
    id: 'conv', icon: '🔄', section: 'Aeronáutica',
    label: 'Conversiones aeronáuticas', subtitle: 'Velocidad, presión, temperatura…',
    description: 'Convierte entre unidades aeronáuticas: kt, ft, nm, inHg, hPa, °C/K/°F y más.',
    tag: 'free',
  },
  {
    id: 'radar', icon: '📡', section: 'Electrónica Aeronáutica',
    label: 'Ecuación del Radar', subtitle: 'Alcance máximo & diagrama de cobertura',
    description: 'Calcula el alcance máximo (Rmax) con la radar range equation. Ajusta potencia, ganancia, frecuencia y RCS del blanco.',
    tag: 'free', theory: theoryRadar,
  },
  {
    id: 'pitot', icon: '💨', section: 'Electrónica Aeronáutica',
    label: 'Sistema Pitot-Estático', subtitle: 'IAS → CAS → TAS → Mach',
    description: 'Convierte presión dinámica en velocidades aerodinámicas con corrección de compresibilidad e ISA.',
    tag: 'free', theory: theoryPitot,
  },
  {
    id: 'antenna', icon: '🔭', section: 'Electrónica Aeronáutica',
    label: 'Diseño de Antena', subtitle: 'Friis, HPBW, diagrama polar',
    description: 'Calcula ganancia, ancho de haz, apertura efectiva y enlace de radio (ecuación de Friis). Diagrama de radiación polar interactivo.',
    tag: 'free', theory: theoryAntenna,
  },
  {
    id: 'filtros', icon: '〜', section: 'Electrónica Aeronáutica',
    label: 'Filtros para Aviónica', subtitle: 'Bode — RC / RLC, presets ARINC/ILS/GPS',
    description: 'Diseña filtros RC y RLC con diagrama de Bode (módulo y fase). Presets reales: sensor pitot, ARINC 429, VOR/ILS, ADS-B, GPS.',
    tag: 'free', theory: theoryFiltros,
  },
  {
    id: 'curso-lma', icon: '🎓', section: 'Formación LMA / EASA Part-66',
    label: 'Temario oficial LMA', subtitle: 'M3 · M4 — Electricidad y Electrónica',
    description: 'Temario completo para la Licencia de Mecánico de Aeronave (LMA) en las especialidades de Electricidad (M3) y Electrónica (M4), siguiendo el programa oficial EASA Part-66.',
    tag: 'free',
  },
];

const sections = [...new Set(TOOLS.map(t => t.section))];

export default function App() {
  const [active, setActive]         = useState<ToolId>('home');
  const [showTheory, setShowTheory] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  // Ejercicio IAD a abrir directamente (deep-link desde la home)
  const [pendingExercise, setPendingExercise] = useState<string | null>(null);

  // Temporizador para cerrar el menú al salir con el cursor
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMenuOpen(true);
  };
  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setMenuOpen(false), 300);
  }, []);
  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const handleNav = (id: ToolId) => {
    setActive(id);
    setShowTheory(false);
    setMenuOpen(false);
    setPendingExercise(null);
  };

  // Abre la sección IAD directamente en un ejercicio concreto
  const openExercise = (exerciseId: string) => {
    setActive('iad');
    setPendingExercise(exerciseId);
    setShowTheory(false);
    setMenuOpen(false);
  };

  const current = TOOLS.find(t => t.id === active);

  // Hook de navegación global para preview/testing
  if (typeof window !== 'undefined') {
    (window as any).__nav = handleNav;
  }

  return (
    <div className="app">

      {/* ══════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════ */}
      <header className="header">

        {/* Botón hamburguesa — abre el menú flotante */}
        <div
          className={`hamburger-wrap${menuOpen ? ' is-open' : ''}`}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          <button
            className="hamburger-btn"
            onClick={() => menuOpen ? setMenuOpen(false) : openMenu()}
            aria-label="Menú de navegación"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* ── MENÚ FLOTANTE ── */}
          {menuOpen && (
            <nav
              className="floating-menu"
              onMouseEnter={cancelHide}
              onMouseLeave={scheduleHide}
            >
              {/* Inicio */}
              <div
                className={`fm-item${active === 'home' ? ' active' : ''}`}
                onClick={() => handleNav('home')}
              >
                <span className="fm-icon">⌂</span>
                <span className="fm-label">Inicio</span>
              </div>

              {/* Secciones y herramientas */}
              {sections.map(section => (
                <div key={section}>
                  <div className="fm-section">{section}</div>
                  {TOOLS.filter(t => t.section === section).map(tool => (
                    <button
                      key={tool.id}
                      className={`fm-item${active === tool.id ? ' active' : ''}`}
                      onClick={() => handleNav(tool.id)}
                    >
                      <span className="fm-icon">{tool.icon}</span>
                      <span className="fm-text">
                        <span className="fm-label">{tool.label}</span>
                        <span className="fm-sub">{tool.subtitle}</span>
                      </span>
                      {tool.tag === 'free' && <span className="tag-free">Free</span>}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="header-logo">
          <span className="header-logo-icon">✈</span>
          <h1>AeroTech Tools</h1>
        </div>
        <span className="header-badge">Beta</span>
        <span className="header-tagline">Suite técnica · Aeronáutica &amp; Electrónica</span>
      </header>

      {/* ══════════════════════════════════════════════
          CONTENIDO PRINCIPAL — sin sidebar fijo
      ══════════════════════════════════════════════ */}
      <main className="main">

        {/* ════ HOME ════ */}
        {active === 'home' ? (
          <div className="home">
            <ParallaxBg imageUrl={HOME_BG} overlay={0.76} speed={0.40} />

            <div className="home-content">

              {/* ── HERO — Ingeniería a Distancia ── */}
              <div className="home-hero">
                <span className="home-hero-eyebrow">UNED · Ejercicios resueltos</span>
                <span className="home-hero-icon">📡</span>
                <h2>Ingeniería a <em>Distancia</em></h2>
                <p className="home-hero-sub">
                  Resuelvo en vídeo ejercicios de Ingeniería Electrónica Industrial,
                  con teoría y un simulador interactivo de cada problema. Aprende
                  paso a paso y repasa con desarrollos completos.
                </p>
                <div className="home-hero-cta">
                  <button className="hero-btn-primary" onClick={() => handleNav('iad')}>
                    Ver ejercicios
                  </button>
                  <a
                    className="hero-btn-secondary"
                    href="https://www.youtube.com/@ingenieriaadistancia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ▶ Suscríbete en YouTube
                  </a>
                </div>
                <div className="home-stats">
                  <div className="home-stat">
                    <div className="home-stat-val">{iadVideos.length}</div>
                    <div className="home-stat-lbl">
                      {iadVideos.length === 1 ? 'Ejercicio resuelto' : 'Ejercicios resueltos'}
                    </div>
                  </div>
                  <div className="home-stat">
                    <div className="home-stat-val">3</div>
                    <div className="home-stat-lbl">Recursos por ejercicio</div>
                  </div>
                  <div className="home-stat">
                    <div className="home-stat-val">9</div>
                    <div className="home-stat-lbl">Herramientas técnicas</div>
                  </div>
                  <div className="home-stat">
                    <div className="home-stat-val">100%</div>
                    <div className="home-stat-lbl">Gratuito</div>
                  </div>
                </div>
              </div>

              <div className="home-divider" />

              {/* ── INGENIERÍA A DISTANCIA (principal) ── */}
              <div className="home-section-wrap">
                <div className="home-section-header">
                  <div className="home-section-icon elec">📡</div>
                  <span className="home-section-eyebrow">Ingeniería a Distancia</span>
                </div>
                <h2 className="home-section-title">Ejercicios resueltos paso a paso</h2>
                <p className="home-section-subtitle">
                  Cada ejercicio incluye el vídeo de la resolución, el desarrollo
                  completo, la teoría y un simulador interactivo del problema.
                </p>
                <div className="home-cards">
                  {iadVideos.map(v => (
                    <div key={v.id} className="home-card" onClick={() => openExercise(v.id)}>
                      <span className="home-card-icon">📐</span>
                      <h3>{v.title}</h3>
                      <p>{v.description}</p>
                      <div className="home-card-tags">
                        <span className="tag-curso">{v.exerciseRef}</span>
                        {v.Solution  && <span className="tag-theory">Solución</span>}
                        {v.Simulator && <span className="tag-free">Simulador</span>}
                        {v.youtubeId
                          ? <span className="tag-theory">Vídeo</span>
                          : <span className="tag-curso">Vídeo pronto</span>}
                      </div>
                      <span className="home-card-cta">Abrir ejercicio →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="home-divider" />

              {/* ── Esencia AeroTech: herramientas técnicas (secundario) ── */}
              <div className="home-section-wrap home-section-secondary">
                <span className="home-hero-eyebrow">También en AeroTech ✈</span>
                <h2 className="home-section-title">Herramientas técnicas de aeronáutica y aviónica</h2>
                <p className="home-section-subtitle">
                  Suite de cálculo y simulación conforme a EASA Part-66, además del
                  temario oficial LMA. La base aeronáutica del proyecto.
                </p>
              </div>

              {/* ── AERONÁUTICA ── */}
              <div className="home-section-wrap">
                <div className="home-section-header">
                  <div className="home-section-icon aero">✈</div>
                  <span className="home-section-eyebrow">Aeronáutica</span>
                </div>
                <h2 className="home-section-title">Cálculo y simulación de vuelo</h2>
                <p className="home-section-subtitle">
                  Herramientas para análisis estructural, rendimiento y sistemas
                  de aeronave conformes con EASA Part-66.
                </p>
                <div className="home-cards">
                  {TOOLS.filter(t => t.section === 'Aeronáutica').map(tool => (
                    <div key={tool.id} className="home-card" onClick={() => handleNav(tool.id)}>
                      <span className="home-card-icon">{tool.icon}</span>
                      <h3>{tool.label}</h3>
                      <p>{tool.description}</p>
                      <div className="home-card-tags">
                        {tool.tag === 'free' && <span className="tag-free">Gratis</span>}
                        {tool.theory        && <span className="tag-theory">Teoría</span>}
                      </div>
                      <span className="home-card-cta">Abrir herramienta →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="home-divider" />

              {/* ── ELECTRÓNICA ── */}
              <div className="home-section-wrap">
                <div className="home-section-header">
                  <div className="home-section-icon elec">📡</div>
                  <span className="home-section-eyebrow">Electrónica Aeronáutica</span>
                </div>
                <h2 className="home-section-title">Sistemas de aviónica y señales</h2>
                <p className="home-section-subtitle">
                  Diseño y análisis de sistemas electrónicos embarcados: radar,
                  antenas, Pitot-estático y filtros para aviónica.
                </p>
                <div className="home-cards">
                  {TOOLS.filter(t => t.section === 'Electrónica Aeronáutica').map(tool => (
                    <div key={tool.id} className="home-card" onClick={() => handleNav(tool.id)}>
                      <span className="home-card-icon">{tool.icon}</span>
                      <h3>{tool.label}</h3>
                      <p>{tool.description}</p>
                      <div className="home-card-tags">
                        {tool.tag === 'free' && <span className="tag-free">Gratis</span>}
                        {tool.theory        && <span className="tag-theory">Teoría</span>}
                      </div>
                      <span className="home-card-cta">Abrir herramienta →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="home-divider" />

              {/* ── LMA ── */}
              <div className="home-section-wrap">
                <div className="home-section-header">
                  <div className="home-section-icon curso">🎓</div>
                  <span className="home-section-eyebrow">Formación LMA / EASA Part-66</span>
                </div>
                <h2 className="home-section-title">Temario oficial completo</h2>
                <p className="home-section-subtitle">
                  Módulos M2 a M17 siguiendo el programa oficial para la
                  Licencia de Mecánico de Aeronave.
                </p>
                <div className="home-cards">
                  {TOOLS.filter(t => t.section === 'Formación LMA / EASA Part-66').map(tool => (
                    <div
                      key={tool.id}
                      className={`home-card ${tool.id === 'curso-lma' ? 'home-card-featured' : ''}`}
                      onClick={() => handleNav(tool.id)}
                    >
                      {tool.id === 'curso-lma' ? (
                        <>
                          <span className="home-card-icon">{tool.icon}</span>
                          <div className="card-featured-right">
                            <h3>{tool.label}</h3>
                            <p>{tool.description}</p>
                            <div className="home-card-tags" style={{ marginTop: '12px' }}>
                              <span className="tag-free">Gratis</span>
                              <span className="tag-curso">7 módulos · 75 capítulos</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="home-card-icon">{tool.icon}</span>
                          <h3>{tool.label}</h3>
                          <p>{tool.description}</p>
                          <div className="home-card-tags">
                            {tool.tag === 'free' && <span className="tag-free">Gratis</span>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* /home-content */}
          </div>

        /* ════ HERRAMIENTA ACTIVA ════ */
        ) : current ? (
          <>
            <div
              className="sim-header"
              style={{ backgroundImage: `url(${TOOL_BG[current.id] ?? ''})` }}
            >
              <div className="sim-header-inner">
                <div>
                  <h2>{current.icon} {current.label}</h2>
                  <p>{current.description}</p>
                </div>
                {current.theory && (
                  <button
                    className={`theory-toggle-btn ${showTheory ? 'active' : ''}`}
                    onClick={() => setShowTheory(s => !s)}
                  >
                    {showTheory ? '⚙ Herramienta' : '📖 Teoría'}
                  </button>
                )}
              </div>
            </div>

            {showTheory && current.theory ? (
              <TheoryPanel content={current.theory} />
            ) : (
              <>
                {active === 'rotor'     && <DesequilibrioRotor />}
                {active === 'balanceo'  && <BalanceoHelice />}
                {active === 'wyc'       && <PesoYCentrado />}
                {active === 'isa'       && <AtmosferaISA />}
                {active === 'conv'      && <Conversiones />}
                {active === 'radar'     && <RadarRangeEquation />}
                {active === 'pitot'     && <PitotEstatico />}
                {active === 'antenna'   && <AntennaDesigner />}
                {active === 'filtros'   && <FiltrosAvionica />}
                {active === 'curso-lma' && <CourseView modules={[m2, m3, m4, m8, m15, m16, m17]} />}
                {active === 'iad'       && (
                  <IADView
                    key={pendingExercise ?? 'channel'}
                    initialExerciseId={pendingExercise}
                  />
                )}
              </>
            )}
          </>
        ) : null}

      </main>
    </div>
  );
}
