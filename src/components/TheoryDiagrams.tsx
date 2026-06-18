/**
 * TheoryDiagrams.tsx
 * Diagramas SVG técnicos para los paneles de teoría.
 * Todos usan la paleta Apple light: azul #0071e3, gris #6e6e73, texto #1d1d1f
 */

const B  = '#0071e3'; // azul Apple
const R  = '#ff3b30'; // rojo
const G  = '#30d158'; // verde
const A  = '#ff9f0a'; // ámbar
const T  = '#1d1d1f'; // texto principal
const T2 = '#6e6e73'; // texto secundario
const S  = '#f5f5f7'; // surface
const BL = '#d2d2d7'; // borde

/* ═══════════════════════════════════════════════════════════════
   ROTOR — Tipos de desequilibrio
═══════════════════════════════════════════════════════════════ */
export function DiagramRotorTypes() {
  return (
    <svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* ── Estático ── */}
      <g transform="translate(50,0)">
        <text x="55" y="18" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>ESTÁTICO</text>
        {/* Eje */}
        <line x1="55" y1="25" x2="55" y2="180" stroke={BL} strokeWidth="2.5" strokeDasharray="5,3"/>
        {/* Disco */}
        <ellipse cx="55" cy="100" rx="42" ry="14" fill="none" stroke={B} strokeWidth="2"/>
        <rect x="13" y="86" width="84" height="28" rx="4" fill={S} stroke={B} strokeWidth="2"/>
        {/* Masa desequilibrada */}
        <circle cx="82" cy="100" r="8" fill={R}/>
        <text x="94" y="104" fontSize="9" fill={R} fontWeight="600">m</text>
        {/* Flecha fuerza */}
        <line x1="82" y1="100" x2="104" y2="78" stroke={R} strokeWidth="1.5" markerEnd="url(#arr)"/>
        <text x="106" y="76" fontSize="9" fill={R}>Fc</text>
        {/* Centro masa desplazado */}
        <circle cx="62" cy="100" r="4" fill={R} opacity="0.5"/>
        <text x="55" y="190" textAnchor="middle" fontSize="9" fill={T2}>Eje inercial ≠ eje geométrico</text>
      </g>

      {/* ── Dinámico (par puro) ── */}
      <g transform="translate(215,0)">
        <text x="55" y="18" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>DINÁMICO (PAR)</text>
        <line x1="55" y1="25" x2="55" y2="180" stroke={BL} strokeWidth="2.5" strokeDasharray="5,3"/>
        {/* Dos discos */}
        <rect x="13" y="60" width="84" height="22" rx="4" fill={S} stroke={B} strokeWidth="2"/>
        <rect x="13" y="118" width="84" height="22" rx="4" fill={S} stroke={B} strokeWidth="2"/>
        {/* Masas opuestas */}
        <circle cx="82" cy="71" r="7" fill={R}/>
        <circle cx="28" cy="129" r="7" fill={R}/>
        {/* Flechas opuestas */}
        <line x1="82" y1="71" x2="102" y2="55" stroke={R} strokeWidth="1.5" markerEnd="url(#arr)"/>
        <line x1="28" y1="129" x2="8" y2="145" stroke={R} strokeWidth="1.5" markerEnd="url(#arr)"/>
        <text x="55" y="190" textAnchor="middle" fontSize="9" fill={T2}>Centro de masa en el eje</text>
      </g>

      {/* ── Dinámico general ── */}
      <g transform="translate(380,0)">
        <text x="55" y="18" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>GENERAL</text>
        <line x1="55" y1="25" x2="55" y2="180" stroke={BL} strokeWidth="2.5" strokeDasharray="5,3"/>
        {/* Eje inercial inclinado */}
        <line x1="45" y1="35" x2="65" y2="170" stroke={A} strokeWidth="1.5" strokeDasharray="4,3"/>
        <rect x="13" y="75" width="84" height="22" rx="4" fill={S} stroke={B} strokeWidth="2"/>
        <rect x="13" y="125" width="84" height="22" rx="4" fill={S} stroke={B} strokeWidth="2"/>
        <circle cx="78" cy="86" r="7" fill={R}/>
        <circle cx="38" cy="136" r="6" fill={A}/>
        <text x="55" y="190" textAnchor="middle" fontSize="9" fill={T2}>Corrección en 2 planos</text>
      </g>

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/>
        </marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROTOR — Órbitas de cojinete diagnósticas
═══════════════════════════════════════════════════════════════ */
export function DiagramOrbitas() {
  return (
    <svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {[
        { x: 60,  label: 'Desequilibrio\npuro 1×',  rx: 30, ry: 18, rot: -20, color: B },
        { x: 185, label: 'Rozamiento\n2× rub',      rx: 28, ry: 16, rot: 0,   color: A, loop: true },
        { x: 310, label: 'Oil whirl\n<0.5×',        rx: 22, ry: 22, rot: 0,   color: R, spiral: true },
        { x: 435, label: 'Equilibrado\nresidual',   rx: 5,  ry: 5,  rot: 0,   color: G },
      ].map(({ x, label, rx, ry, rot, color }) => (
        <g key={x} transform={`translate(${x},80)`}>
          <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="none" stroke={color} strokeWidth="2.5"
            transform={`rotate(${rot})`}/>
          <circle cx="0" cy="0" r="2.5" fill={T2}/>
          {label.split('\n').map((l, i) => (
            <text key={i} x="0" y={70 + i * 13} textAnchor="middle" fontSize="10"
              fill={T2} fontWeight={i === 0 ? '600' : '400'}>{l}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BALANCEO — Diagrama vectorial (fasores)
═══════════════════════════════════════════════════════════════ */
export function DiagramVectorial() {
  return (
    <svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Ejes */}
      <line x1="20" y1="140" x2="360" y2="140" stroke={BL} strokeWidth="1"/>
      <line x1="190" y1="10"  x2="190" y2="270" stroke={BL} strokeWidth="1"/>
      {/* Círculo de referencia */}
      <circle cx="190" cy="140" r="100" fill="none" stroke={BL} strokeWidth="1" strokeDasharray="4,3"/>
      {/* V0 — vibración inicial */}
      <line x1="190" y1="140" x2="270" y2="80" stroke={B} strokeWidth="2.5" markerEnd="url(#bArr)"/>
      <text x="278" y="78" fontSize="11" fontWeight="700" fill={B}>V₀</text>
      {/* V1 — con masa de prueba */}
      <line x1="190" y1="140" x2="300" y2="165" stroke="#00b5d8" strokeWidth="2.5" markerEnd="url(#cArr)"/>
      <text x="308" y="168" fontSize="11" fontWeight="700" fill="#00b5d8">V₁</text>
      {/* E — efecto (V1-V0) */}
      <line x1="270" y1="80" x2="300" y2="165" stroke={A} strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#aArr)"/>
      <text x="292" y="122" fontSize="11" fontWeight="700" fill={A}>E</text>
      {/* Wc — corrección (opuesta a V0) */}
      <line x1="190" y1="140" x2="110" y2="200" stroke={G} strokeWidth="2.5" markerEnd="url(#gArr)"/>
      <text x="90" y="215" fontSize="11" fontWeight="700" fill={G}>Wc</text>
      {/* Ángulos */}
      <path d="M190,140 L220,140 A30,30 0 0,0 213,122" fill="none" stroke={B} strokeWidth="1.2"/>
      <text x="228" y="132" fontSize="9" fill={B}>φ₀</text>
      {/* Etiqueta origen */}
      <circle cx="190" cy="140" r="4" fill={T}/>
      <text x="196" y="155" fontSize="9" fill={T2}>Origen</text>

      <defs>
        <marker id="bArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={B}/></marker>
        <marker id="cArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#00b5d8"/></marker>
        <marker id="aArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={A}/></marker>
        <marker id="gArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={G}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ISA — Capas de la atmósfera
═══════════════════════════════════════════════════════════════ */
export function DiagramISALayers() {
  const layers = [
    { y: 20,  h: 55, label: 'Estratosfera alta',   alt: '32–47 km', temp: '+2.8 K/km', color: '#e8f4f0' },
    { y: 75,  h: 40, label: 'Estratosfera media',  alt: '20–32 km', temp: '+1.0 K/km', color: '#d6eef8' },
    { y: 115, h: 50, label: 'Tropopausa (isoterma)',alt:'11–20 km', temp: 'T = −56.5 °C', color: '#dde8f8' },
    { y: 165, h: 85, label: 'Troposfera',          alt: '0–11 km',  temp: '−6.5 K/km', color: '#e8f0fb' },
  ];

  // Perfil de temperatura simplificado (puntos x=temperatura mapeada, y=altitud)
  const tempLine = 'M 300,245 L 285,210 L 285,165 L 300,120 L 310,80 L 330,25';

  return (
    <svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Capas de color */}
      {layers.map(({ y, h, color }) => (
        <rect key={y} x="10" y={y} width="220" height={h} rx="0" fill={color}/>
      ))}
      <rect x="10" y="250" width="220" height="10" fill="#f0e8d8"/>

      {/* Líneas de separación */}
      {[75, 115, 165].map(y => (
        <line key={y} x1="10" y1={y} x2="230" y2={y} stroke={BL} strokeWidth="1" strokeDasharray="4,3"/>
      ))}
      {/* Etiquetas capas */}
      {layers.map(({ y, h, label, alt, temp }) => (
        <g key={y}>
          <text x="16" y={y + h / 2 - 5} fontSize="10" fontWeight="600" fill={T}>{label}</text>
          <text x="16" y={y + h / 2 + 8} fontSize="9" fill={T2}>{alt}</text>
          <text x="16" y={y + h / 2 + 20} fontSize="9" fill={B}>{temp}</text>
        </g>
      ))}
      <text x="16" y="257" fontSize="9" fill={T2}>MSL  0 km</text>

      {/* Eje de temperatura */}
      <line x1="270" y1="255" x2="270" y2="15" stroke={BL} strokeWidth="1.5"/>
      <line x1="255" y1="255" x2="415" y2="255" stroke={BL} strokeWidth="1.5"/>
      <text x="340" y="268" textAnchor="middle" fontSize="10" fill={T2}>Temperatura (°C)</text>
      {[[-60,'270'],[-40,'310'],[-20,'350'],['0','390'],['15','405']].map(([v, x]) => (
        <g key={x}>
          <line x1={+x} y1="252" x2={+x} y2="258" stroke={T2} strokeWidth="1"/>
          <text x={+x} y="266" textAnchor="middle" fontSize="8" fill={T2}>{v}</text>
        </g>
      ))}
      {/* Línea de temperatura */}
      <path d={tempLine} fill="none" stroke={R} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Puntos notables */}
      <circle cx="405" cy="245" r="4" fill={R}/>
      <text x="408" y="242" fontSize="8" fill={R}>15°C</text>
      <circle cx="285" cy="165" r="4" fill={R}/>
      <text x="288" y="162" fontSize="8" fill={R}>−56.5°C</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WyC — Envolvente CG Cessna 172S
═══════════════════════════════════════════════════════════════ */
export function DiagramCGEnvelope() {
  // Envolvente real C172S: CG vs Peso (lbs)
  // Puntos (CG in, Peso lbs): envelope simplificado
  const envelope = [
    [35.0, 1500], [35.0, 2550], [40.5, 2550], [47.3, 2200],
    [47.3, 1500], [35.0, 1500],
  ];
  // Mapeo: CG 33-50 in → x 60-360; Peso 1400-2700 lbs → y 220-20
  const mapX = (cg: number)  => 60 + (cg - 33) / 17 * 300;
  const mapY = (lb: number)  => 220 - (lb - 1400) / 1300 * 200;

  const path = envelope.map(([cg, lb], i) =>
    `${i === 0 ? 'M' : 'L'} ${mapX(cg)},${mapY(lb)}`
  ).join(' ');

  // Punto de ejemplo (piloto+copiloto, pasajeros traseros, 30 gal fuel)
  const exCG = 41.2; const exW = 2280;

  return (
    <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Ejes */}
      <line x1="60" y1="220" x2="380" y2="220" stroke={T} strokeWidth="1.5"/>
      <line x1="60" y1="220" x2="60"  y2="20"  stroke={T} strokeWidth="1.5"/>
      {/* Etiquetas ejes */}
      <text x="220" y="250" textAnchor="middle" fontSize="11" fill={T2}>CG (in del datum)</text>
      <text x="20" y="120" textAnchor="middle" fontSize="11" fill={T2} transform="rotate(-90,20,120)">Peso (lb)</text>
      {/* Grid */}
      {[35, 38, 41, 44, 47].map(cg => (
        <g key={cg}>
          <line x1={mapX(cg)} y1="220" x2={mapX(cg)} y2="20" stroke={BL} strokeWidth="0.8"/>
          <text x={mapX(cg)} y="232" textAnchor="middle" fontSize="9" fill={T2}>{cg}</text>
        </g>
      ))}
      {[1500, 1800, 2100, 2400, 2550].map(lb => (
        <g key={lb}>
          <line x1="60" y1={mapY(lb)} x2="380" y2={mapY(lb)} stroke={BL} strokeWidth="0.8"/>
          <text x="52" y={mapY(lb) + 4} textAnchor="end" fontSize="9" fill={T2}>{lb}</text>
        </g>
      ))}
      {/* MTOW */}
      <line x1="60" y1={mapY(2550)} x2="380" y2={mapY(2550)} stroke={R} strokeWidth="1.2" strokeDasharray="5,3"/>
      <text x="382" y={mapY(2550) + 4} fontSize="9" fill={R}>MTOW</text>
      {/* Envolvente rellena */}
      <path d={path} fill="rgba(0,113,227,0.08)" stroke={B} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Zona OK label */}
      <text x={mapX(41)} y={mapY(2000)} textAnchor="middle" fontSize="10" fontWeight="600" fill={B}>
        DENTRO DE
      </text>
      <text x={mapX(41)} y={mapY(2000) + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill={B}>
        ENVOLVENTE ✓
      </text>
      {/* Punto de ejemplo */}
      <circle cx={mapX(exCG)} cy={mapY(exW)} r="6" fill={G} stroke="white" strokeWidth="2"/>
      <text x={mapX(exCG) + 10} y={mapY(exW) - 6} fontSize="9" fill={G} fontWeight="600">
        Ejemplo: {exCG} in / {exW} lb
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RADAR — Geometría de la ecuación del radar
═══════════════════════════════════════════════════════════════ */
export function DiagramRadarGeometry() {
  return (
    <svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Radar tx/rx */}
      <rect x="10" y="70" width="70" height="44" rx="8" fill={S} stroke={B} strokeWidth="2"/>
      <text x="45" y="89" textAnchor="middle" fontSize="10" fontWeight="700" fill={B}>RADAR</text>
      <text x="45" y="103" textAnchor="middle" fontSize="9" fill={T2}>Pt · G · λ</text>

      {/* Ondas de propagación */}
      {[90, 120, 150].map((r, i) => (
        <path key={i} d={`M 80,92 Q ${80 + r * 0.6},${92 - r * 0.3} ${80 + r},92`}
          fill="none" stroke={B} strokeWidth="1.2" opacity={0.4 + i * 0.2}
          strokeDasharray="3,2"/>
      ))}

      {/* Flecha 4πR² */}
      <line x1="82" y1="85" x2="300" y2="70" stroke={B} strokeWidth="1.5" markerEnd="url(#rArr)" strokeDasharray="5,3"/>
      <text x="195" y="68" textAnchor="middle" fontSize="10" fill={B}>4πR² propagación</text>

      {/* Blanco (avión) */}
      <text x="318" y="78" fontSize="24">✈</text>
      <rect x="305" y="60" width="56" height="36" rx="6" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="333" y="108" textAnchor="middle" fontSize="9" fill={A}>σ (RCS)</text>

      {/* Flecha vuelta */}
      <line x1="360" y1="85" x2="500" y2="95" stroke={R} strokeWidth="1.5" markerEnd="url(#rArr2)" strokeDasharray="5,3"/>
      <text x="430" y="82" textAnchor="middle" fontSize="10" fill={R}>Señal reflejada</text>

      {/* Receptor */}
      <rect x="460" y="70" width="70" height="44" rx="8" fill={S} stroke={R} strokeWidth="2"/>
      <text x="495" y="89" textAnchor="middle" fontSize="10" fontWeight="700" fill={R}>RX</text>
      <text x="495" y="103" textAnchor="middle" fontSize="9" fill={T2}>Smin</text>

      {/* R label */}
      <line x1="82" y1="130" x2="360" y2="130" stroke={T2} strokeWidth="1"/>
      <line x1="82" y1="125" x2="82" y2="135" stroke={T2} strokeWidth="1"/>
      <line x1="360" y1="125" x2="360" y2="135" stroke={T2} strokeWidth="1"/>
      <text x="221" y="145" textAnchor="middle" fontSize="11" fontWeight="600" fill={T2}>R (alcance)</text>

      {/* Fórmula */}
      <text x="270" y="170" textAnchor="middle" fontSize="10" fill={T}>
        Pr = Pt · G² · λ² · σ / [(4π)³ · R⁴]
      </text>

      <defs>
        <marker id="rArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/></marker>
        <marker id="rArr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PITOT — Sistema Pitot-Estático
═══════════════════════════════════════════════════════════════ */
export function DiagramPitotSystem() {
  return (
    <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Avión (simplificado) */}
      <path d="M 30,100 Q 60,80 100,95 L 200,95 L 200,105 L 100,105 Q 60,120 30,100 Z"
        fill={S} stroke={BL} strokeWidth="2"/>
      {/* Tubo Pitot */}
      <line x1="200" y1="100" x2="280" y2="100" stroke={B} strokeWidth="4" strokeLinecap="round"/>
      <circle cx="280" cy="100" r="5" fill={B}/>
      <text x="260" y="90" fontSize="9" fill={B} fontWeight="600">Presión total Pt</text>
      {/* Toma estática */}
      <circle cx="150" cy="95" r="5" fill={A} stroke="white" strokeWidth="1.5"/>
      <text x="150" y="83" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">Toma estática Ps</text>

      {/* Tuberías */}
      <line x1="200" y1="97" x2="200" y2="140" stroke={B} strokeWidth="1.5"/>
      <line x1="150" y1="95"  x2="150" y2="140" stroke={A} strokeWidth="1.5"/>

      {/* Bloque instrumentos */}
      {[
        { x: 60,  label: 'Altímetro',  note: 'Ps → h',      c: A },
        { x: 160, label: 'Anemómetro', note: 'Pt−Ps → IAS', c: B },
        { x: 265, label: 'Variómetro', note: 'dPs/dt → VS', c: G },
        { x: 370, label: 'Machmeter',  note: 'Pt/Ps → M',   c: R },
      ].map(({ x, label, note, c }) => (
        <g key={x}>
          <rect x={x} y="152" width="80" height="36" rx="6" fill={S} stroke={c} strokeWidth="1.8"/>
          <text x={x + 40} y="167" textAnchor="middle" fontSize="9" fontWeight="600" fill={c}>{label}</text>
          <text x={x + 40} y="180" textAnchor="middle" fontSize="8" fill={T2}>{note}</text>
        </g>
      ))}
      {/* Conexiones hacia instrumentos */}
      <line x1="200" y1="140" x2="200" y2="152" stroke={B} strokeWidth="1.5"/>
      <line x1="200" y1="140" x2="100" y2="152" stroke={B} strokeWidth="1.2"/>
      <line x1="200" y1="140" x2="305" y2="152" stroke={B} strokeWidth="1.2"/>
      <line x1="200" y1="140" x2="410" y2="152" stroke={B} strokeWidth="1.2"/>
      <line x1="150" y1="140" x2="100" y2="152" stroke={A} strokeWidth="1.2"/>
      <line x1="150" y1="140" x2="305" y2="152" stroke={A} strokeWidth="1.2"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PITOT — Cadena de conversión de velocidades
═══════════════════════════════════════════════════════════════ */
export function DiagramSpeedChain() {
  const steps = [
    { label: 'IAS', sub: 'Lectura bruta',         c: T2 },
    { label: 'CAS', sub: '± errores posición',    c: B },
    { label: 'EAS', sub: '× √σ corrección ρ',     c: '#5e5ce6' },
    { label: 'TAS', sub: '÷ √σ velocidad real',   c: G },
    { label: 'GS',  sub: '± viento',              c: A },
  ];
  return (
    <svg viewBox="0 0 520 90" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {steps.map(({ label, sub, c }, i) => (
        <g key={i}>
          <rect x={10 + i * 102} y="10" width="88" height="60" rx="8"
            fill={S} stroke={c} strokeWidth="2"/>
          <text x={10 + i * 102 + 44} y="38" textAnchor="middle"
            fontSize="16" fontWeight="700" fill={c}>{label}</text>
          <text x={10 + i * 102 + 44} y="56" textAnchor="middle"
            fontSize="8" fill={T2}>{sub}</text>
          {i < steps.length - 1 && (
            <line x1={10 + i * 102 + 88} y1="40" x2={10 + (i + 1) * 102} y2="40"
              stroke={BL} strokeWidth="2" markerEnd="url(#sArr)"/>
          )}
        </g>
      ))}
      <defs>
        <marker id="sArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={BL}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FILTROS — Circuito RC + diagrama de Bode
═══════════════════════════════════════════════════════════════ */
export function DiagramRC() {
  return (
    <svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Circuito */}
      <line x1="20" y1="40"  x2="60" y2="40"  stroke={T} strokeWidth="2"/>
      {/* Resistor */}
      <rect x="60" y="30" width="60" height="20" rx="4" fill={S} stroke={T} strokeWidth="2"/>
      <text x="90" y="44" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>R</text>
      <line x1="120" y1="40" x2="155" y2="40" stroke={T} strokeWidth="2"/>
      {/* Capacitor */}
      <line x1="155" y1="20" x2="155" y2="60" stroke={T} strokeWidth="3"/>
      <line x1="165" y1="20" x2="165" y2="60" stroke={T} strokeWidth="3"/>
      <text x="160" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>C</text>
      <line x1="165" y1="40" x2="200" y2="40" stroke={T} strokeWidth="2"/>
      {/* Tierra capacitor */}
      <line x1="160" y1="60" x2="160" y2="80" stroke={T} strokeWidth="1.5"/>
      <line x1="148" y1="80" x2="172" y2="80" stroke={T} strokeWidth="2"/>
      <line x1="152" y1="85" x2="168" y2="85" stroke={T} strokeWidth="1.5"/>
      <line x1="156" y1="90" x2="164" y2="90" stroke={T} strokeWidth="1"/>
      {/* Vin */}
      <text x="14" y="36" textAnchor="end" fontSize="10" fill={B}>Vin</text>
      {/* Vout */}
      <text x="205" y="36" fontSize="10" fill={R}>Vout</text>
      {/* Fórmula fc */}
      <text x="160" y="115" textAnchor="middle" fontSize="11" fill={T2}>
        fc = 1/(2πRC)
      </text>
      {/* Texto paso bajo */}
      <text x="160" y="132" textAnchor="middle" fontSize="9" fill={T2}>
        Paso bajo: −20 dB/década
      </text>
    </svg>
  );
}

export function DiagramBode() {
  // Bode plot: log(f/fc) vs |H| en dB
  // f/fc: 0.01→100 en logscale
  // |H| = 1/sqrt(1+(f/fc)^2)
  const W = 320; const H = 160;
  const xScale = (lf: number) => 30 + (lf + 2) / 4 * (W - 50); // lf = log10(f/fc) ∈ [-2,2]
  const yScale = (db: number) => 20 + (0 - db) / 45 * (H - 40); // db ∈ [-45, 0]

  const curvePoints = [];
  for (let lf = -2; lf <= 2; lf += 0.05) {
    const r = Math.pow(10, lf);
    const db = -10 * Math.log10(1 + r * r);
    curvePoints.push(`${xScale(lf)},${yScale(db)}`);
  }
  const curvePath = 'M ' + curvePoints.join(' L ');

  // Asíntota
  const asym1 = `M ${xScale(-2)},${yScale(0)} L ${xScale(0)},${yScale(0)}`;
  const asym2 = `M ${xScale(0)},${yScale(0)} L ${xScale(2)},${yScale(-40)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Ejes */}
      <line x1="30" y1={yScale(0) + 5} x2={W - 20} y2={yScale(0) + 5} stroke={BL} strokeWidth="1"/>
      <line x1="30" y1="15" x2="30" y2={H - 20} stroke={T} strokeWidth="1.5"/>
      {/* Grid */}
      {[-3, -20, -40].map(db => (
        <g key={db}>
          <line x1="30" y1={yScale(db)} x2={W - 20} y2={yScale(db)} stroke={BL} strokeWidth="0.8" strokeDasharray="3,3"/>
          <text x="26" y={yScale(db) + 4} textAnchor="end" fontSize="8" fill={T2}>{db}</text>
        </g>
      ))}
      {[-2, -1, 0, 1, 2].map(lf => (
        <g key={lf}>
          <line x1={xScale(lf)} y1="15" x2={xScale(lf)} y2={H - 20} stroke={BL} strokeWidth="0.8" strokeDasharray="3,3"/>
          <text x={xScale(lf)} y={H - 8} textAnchor="middle" fontSize="8" fill={T2}>
            {lf < 0 ? `0.${Math.pow(10, -lf)}×fc` : lf === 0 ? 'fc' : `${Math.pow(10, lf)}×fc`}
          </text>
        </g>
      ))}
      {/* Punto fc: -3dB */}
      <circle cx={xScale(0)} cy={yScale(-3)} r="4" fill={R}/>
      <line x1={xScale(0)} y1={yScale(-3)} x2={xScale(0) + 40} y2={yScale(-3) - 8} stroke={R} strokeWidth="1"/>
      <text x={xScale(0) + 42} y={yScale(-3) - 6} fontSize="9" fill={R}>−3 dB</text>
      {/* Asíntotas */}
      <path d={asym1} fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="6,3"/>
      <path d={asym2} fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="6,3"/>
      {/* Curva real */}
      <path d={curvePath} fill="none" stroke={B} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Labels */}
      <text x="32" y="13" fontSize="9" fontWeight="600" fill={T}>|H| (dB)</text>
      <text x={W / 2} y={H} textAnchor="middle" fontSize="9" fill={T2}>Frecuencia</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANTENA — Diagrama de radiación polar
═══════════════════════════════════════════════════════════════ */
export function DiagramAntenaPattern() {
  const cx = 140; const cy = 130; const r = 90;
  // Lóbulo principal (cardioide modificada)
  const mainPoints = [];
  const sidePoints = [];
  for (let a = -90; a <= 90; a += 2) {
    const rad = (a * Math.PI) / 180;
    const g = Math.pow(Math.cos(rad), 3) * r;
    mainPoints.push(`${cx + g * Math.cos(rad)},${cy - g * Math.sin(rad)}`);
  }
  for (let a = 100; a <= 260; a += 2) {
    const rad = (a * Math.PI) / 180;
    const g = Math.abs(Math.cos(rad * 2)) * r * 0.18;
    sidePoints.push(`${cx + g * Math.cos(rad)},${cy - g * Math.sin(rad)}`);
  }
  return (
    <svg viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Círculos de referencia */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <circle key={f} cx={cx} cy={cy} r={f * r} fill="none" stroke={BL} strokeWidth="0.8"/>
      ))}
      {/* Líneas radiales */}
      {[0, 45, 90, 135].map(a => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={cx - r * Math.cos(rad)} y1={cy + r * Math.sin(rad)}
          x2={cx + r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
          stroke={BL} strokeWidth="0.8"/>;
      })}
      {/* Lóbulos laterales */}
      <path d={`M ${cx},${cy} L ${sidePoints.join(' L ')} Z`}
        fill="rgba(255,159,10,0.15)" stroke={A} strokeWidth="1.5"/>
      {/* Lóbulo principal */}
      <path d={`M ${cx},${cy} L ${mainPoints.join(' L ')} Z`}
        fill="rgba(0,113,227,0.12)" stroke={B} strokeWidth="2.5"/>
      {/* HPBW */}
      {[-30, 30].map(a => {
        const rad = (a * Math.PI) / 180;
        const g = Math.pow(Math.cos(rad), 3) * r;
        return <line key={a} x1={cx} y1={cy}
          x2={cx + g * Math.cos(rad)} y2={cy - g * Math.sin(rad)}
          stroke={R} strokeWidth="1.5" strokeDasharray="4,3"/>;
      })}
      <text x={cx + r * 0.8} y={cy - 25} fontSize="9" fill={R}>HPBW</text>
      {/* Antena */}
      <rect x={cx - 6} y={cy - 6} width="12" height="12" rx="3" fill={T}/>
      <line x1={cx} y1={cy + 6} x2={cx} y2={cy + 30} stroke={T} strokeWidth="3"/>
      {/* Labels */}
      <text x={cx + r + 5} y={cy + 4} fontSize="9" fill={T2}>0°</text>
      <text x={cx}           y="14"    textAnchor="middle" fontSize="9" fill={T2}>90°</text>
      {/* Info */}
      <text x="280" y="40"  fontSize="9" fontWeight="600" fill={B}>Lóbulo principal</text>
      <text x="280" y="55"  fontSize="9" fill={B}>G_max</text>
      <text x="280" y="75"  fontSize="9" fontWeight="600" fill={A}>Lóbulos laterales</text>
      <text x="280" y="90"  fontSize="9" fill={A}>SLL ≈ −13 dB</text>
      <text x="280" y="110" fontSize="9" fontWeight="600" fill={R}>HPBW (−3 dB)</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FILTROS RLC — circuito de segundo orden
═══════════════════════════════════════════════════════════════ */
export function DiagramRLC() {
  return (
    <svg viewBox="0 0 380 130" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Conductor superior */}
      <line x1="20" y1="40" x2="50" y2="40" stroke={T} strokeWidth="2"/>
      {/* Resistor R */}
      <rect x="50" y="30" width="48" height="20" rx="4" fill={S} stroke={T} strokeWidth="2"/>
      <text x="74" y="44" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>R</text>
      <line x1="98" y1="40" x2="128" y2="40" stroke={T} strokeWidth="2"/>
      {/* Inductor L (bobina) */}
      {[130,142,154,166].map(x => (
        <path key={x} d={`M ${x},40 Q ${x + 3},28 ${x + 6},40`} fill="none" stroke={T} strokeWidth="2"/>
      ))}
      <text x="155" y="70" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>L</text>
      <line x1="178" y1="40" x2="208" y2="40" stroke={T} strokeWidth="2"/>
      {/* Capacitor C */}
      <line x1="208" y1="20" x2="208" y2="60" stroke={T} strokeWidth="3"/>
      <line x1="218" y1="20" x2="218" y2="60" stroke={T} strokeWidth="3"/>
      <text x="213" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill={T}>C</text>
      <line x1="218" y1="40" x2="250" y2="40" stroke={T} strokeWidth="2"/>
      {/* Tierra */}
      <line x1="213" y1="60" x2="213" y2="90" stroke={T} strokeWidth="1.5"/>
      <line x1="200" y1="90" x2="226" y2="90" stroke={T} strokeWidth="2"/>
      <line x1="204" y1="95" x2="222" y2="95" stroke={T} strokeWidth="1.5"/>
      <line x1="208" y1="100" x2="218" y2="100" stroke={T} strokeWidth="1"/>
      {/* Vin / Vout */}
      <text x="14" y="36" textAnchor="end" fontSize="10" fill={B}>Vin</text>
      <text x="255" y="36" fontSize="10" fill={R}>Vout</text>
      {/* Fórmulas */}
      <text x="310" y="35" textAnchor="middle" fontSize="10" fill={T}>ω₀ = 1/√LC</text>
      <text x="310" y="52" textAnchor="middle" fontSize="10" fill={T}>Q = (1/R)√(L/C)</text>
      <text x="310" y="69" textAnchor="middle" fontSize="10" fill={B}>−40 dB/década</text>
    </svg>
  );
}
