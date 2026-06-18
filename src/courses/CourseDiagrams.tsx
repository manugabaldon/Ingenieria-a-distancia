/**
 * CourseDiagrams.tsx
 * Diagramas SVG para el temario LMA — estilo libro de física universitaria.
 * Paleta light mode: azul #0071e3, rojo #ff3b30, texto #1d1d1f
 */

const B   = '#0071e3';
const R   = '#ff3b30';
const G   = '#30d158';
const A   = '#ff9f0a';
const V   = '#5e5ce6';
const T   = '#1d1d1f';
const T2  = '#6e6e73';
const S   = '#f5f5f7';
const BL  = '#d2d2d7';

/* ═══════════════════════════════════════════════════════════════
   ÁTOMO DE BOHR — modelo simplificado
═══════════════════════════════════════════════════════════════ */
export function DiagramAtomo() {
  return (
    <svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Núcleo */}
      <circle cx="190" cy="130" r="22" fill={B} opacity="0.9"/>
      <text x="190" y="126" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">p⁺ n⁰</text>
      <text x="190" y="138" textAnchor="middle" fontSize="9" fill="white">NÚCLEO</text>

      {/* Órbitas */}
      <ellipse cx="190" cy="130" rx="55" ry="30" fill="none" stroke={BL} strokeWidth="1.2" strokeDasharray="4,3"/>
      <ellipse cx="190" cy="130" rx="90" ry="50" fill="none" stroke={BL} strokeWidth="1.2" strokeDasharray="4,3"/>
      <ellipse cx="190" cy="130" rx="130" ry="72" fill="none" stroke={BL} strokeWidth="1.2" strokeDasharray="4,3"/>

      {/* Capa K (2e) */}
      <circle cx="245" cy="130" r="7" fill={R}/>
      <circle cx="135" cy="130" r="7" fill={R}/>
      <text x="250" y="116" fontSize="9" fill={R} fontWeight="600">e⁻</text>

      {/* Capa L (8e — solo mostramos algunos) */}
      {[[280,130],[100,130],[190,80],[190,180],[248,98],[132,162]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill={A}/>
      ))}

      {/* Capa M — electrones de valencia (cobre: 1) */}
      <circle cx="320" cy="130" r="7" fill={G}/>
      <line x1="320" y1="130" x2="345" y2="110" stroke={G} strokeWidth="1.5"/>
      <text x="348" y="108" fontSize="9" fill={G} fontWeight="700">e⁻ libre</text>
      <text x="348" y="120" fontSize="8" fill={G}>(valencia)</text>

      {/* Leyenda */}
      <rect x="12" y="10" width="130" height="58" rx="8" fill={S} stroke={BL} strokeWidth="1"/>
      {[[R,'Capa K (n=1): 2 e⁻'],[A,'Capa L (n=2): 8 e⁻'],[G,'Capa M (n=3): 18 e⁻']].map(([c,l],i) => (
        <g key={i}>
          <circle cx="24" cy={24 + i*18} r="5" fill={c as string}/>
          <text x="34" y={28 + i*18} fontSize="8.5" fill={T}>{l}</text>
        </g>
      ))}

      {/* Etiqueta cobre */}
      <text x="190" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill={T2}>Cobre (Cu) — Z = 29 — 1 electrón de valencia</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAMPO ELÉCTRICO — líneas entre cargas opuestas
═══════════════════════════════════════════════════════════════ */
export function DiagramCampoElectrico() {
  return (
    <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Carga positiva */}
      <circle cx="100" cy="100" r="22" fill={R} opacity="0.9"/>
      <text x="100" y="105" textAnchor="middle" fontSize="20" fill="white" fontWeight="700">+</text>
      {/* Carga negativa */}
      <circle cx="280" cy="100" r="22" fill={B} opacity="0.9"/>
      <text x="280" y="106" textAnchor="middle" fontSize="20" fill="white" fontWeight="700">−</text>

      {/* Líneas de campo (arcos desde + hacia −) */}
      {[
        // línea recta central
        `M 122,100 L 258,100`,
        // arcos superiores
        `M 118,88 Q 190,45 262,88`,
        `M 110,78 Q 190,14 270,78`,
        // arcos inferiores
        `M 118,112 Q 190,155 262,112`,
        `M 110,122 Q 190,186 270,122`,
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={R} strokeWidth="1.4"
          markerEnd="url(#eFArrow)" opacity={0.7 + i * 0.06}/>
      ))}

      {/* Flechas en líneas */}
      <defs>
        <marker id="eFArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/>
        </marker>
      </defs>

      {/* Labels */}
      <text x="100" y="136" textAnchor="middle" fontSize="10" fill={R} fontWeight="600">+Q</text>
      <text x="280" y="136" textAnchor="middle" fontSize="10" fill={B} fontWeight="600">−Q</text>
      <text x="190" y="192" textAnchor="middle" fontSize="9" fill={T2}>Las líneas parten de (+) y terminan en (−). La densidad indica la intensidad del campo.</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEY DE OHM — circuito básico
═══════════════════════════════════════════════════════════════ */
export function DiagramOhm() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Batería */}
      <rect x="20" y="80" width="52" height="58" rx="8" fill={S} stroke={BL} strokeWidth="1.5"/>
      <line x1="30" y1="103" x2="62" y2="103" stroke={T} strokeWidth="3"/>
      <line x1="36" y1="113" x2="56" y2="113" stroke={T} strokeWidth="1.5"/>
      <text x="46" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill={B}>V</text>
      {/* + − */}
      <text x="44" y="93" textAnchor="middle" fontSize="14" fill={R} fontWeight="700">+</text>
      <text x="44" y="150" textAnchor="middle" fontSize="14" fill={B} fontWeight="700">−</text>

      {/* Conductores */}
      <line x1="46" y1="80" x2="46" y2="40" stroke={T} strokeWidth="2"/>
      <line x1="46" y1="40" x2="354" y2="40" stroke={T} strokeWidth="2"/>
      <line x1="354" y1="40" x2="354" y2="80" stroke={T} strokeWidth="2"/>
      <line x1="354" y1="138" x2="354" y2="180" stroke={T} strokeWidth="2"/>
      <line x1="354" y1="180" x2="46" y2="180" stroke={T} strokeWidth="2"/>
      <line x1="46" y1="138" x2="46" y2="180" stroke={T} strokeWidth="2"/>

      {/* Resistencia */}
      <rect x="285" y="68" width="80" height="30" rx="6" fill={S} stroke={T} strokeWidth="2"/>
      <text x="325" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill={T}>R</text>

      {/* Amperímetro */}
      <circle cx="200" cy="40" r="16" fill={S} stroke={V} strokeWidth="2"/>
      <text x="200" y="45" textAnchor="middle" fontSize="11" fontWeight="700" fill={V}>A</text>

      {/* Voltímetro */}
      <circle cx="354" cy="110" r="16" fill={S} stroke={R} strokeWidth="2"/>
      <text x="354" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill={R}>V</text>

      {/* Flechas de corriente */}
      <path d="M 130,40 L 150,40" stroke={B} strokeWidth="1.5" markerEnd="url(#iArr)"/>
      <text x="140" y="32" textAnchor="middle" fontSize="9" fill={B}>I →</text>

      {/* Fórmulas */}
      <rect x="80" y="80" width="155" height="70" rx="8" fill="#fff9e6" stroke={A} strokeWidth="1.5"/>
      <text x="157" y="102" textAnchor="middle" fontSize="13" fontWeight="800" fill={T}>V = I · R</text>
      <text x="157" y="118" textAnchor="middle" fontSize="10" fill={T2}>I = V / R</text>
      <text x="157" y="133" textAnchor="middle" fontSize="10" fill={T2}>R = V / I</text>
      <text x="157" y="144" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">Ley de Ohm (1827)</text>

      <defs>
        <marker id="iArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCUITOS SERIE Y PARALELO
═══════════════════════════════════════════════════════════════ */
export function DiagramSerieParalelo() {
  return (
    <svg viewBox="0 0 540 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* ── SERIE (izq) ── */}
      <text x="115" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill={T}>SERIE</text>

      {/* Batería */}
      <line x1="30" y1="40" x2="30" y2="60" stroke={T} strokeWidth="2"/>
      <line x1="18" y1="60" x2="42" y2="60" stroke={T} strokeWidth="2.5"/>
      <line x1="22" y1="68" x2="38" y2="68" stroke={T} strokeWidth="1.5"/>
      <line x1="30" y1="68" x2="30" y2="88" stroke={T} strokeWidth="2"/>

      {/* Loop serie */}
      <polyline points="30,40 30,28 200,28 200,160 30,160 30,88" fill="none" stroke={T} strokeWidth="2"/>

      {/* R1 */}
      <rect x="65" y="20" width="50" height="16" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="90" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₁</text>

      {/* R2 */}
      <rect x="135" y="20" width="50" height="16" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="160" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₂</text>

      {/* R3 */}
      <rect x="185" y="80" width="16" height="50" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="193" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₃</text>

      {/* Etiqueta */}
      <rect x="48" y="168" width="140" height="26" rx="6" fill="#fff0f0" stroke={R} strokeWidth="1"/>
      <text x="118" y="183" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">Rₜ = R₁ + R₂ + R₃</text>
      <text x="118" y="193" textAnchor="middle" fontSize="8" fill={T2}>I es igual en todos</text>

      {/* ── PARALELO (der) ── */}
      <text x="390" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill={T}>PARALELO</text>

      {/* Batería */}
      <line x1="280" y1="90" x2="280" y2="55" stroke={T} strokeWidth="2"/>
      <line x1="268" y1="55" x2="292" y2="55" stroke={T} strokeWidth="2.5"/>
      <line x1="272" y1="63" x2="288" y2="63" stroke={T} strokeWidth="1.5"/>
      <line x1="280" y1="63" x2="280" y2="88" stroke={T} strokeWidth="2"/>
      <polyline points="280,48 280,28 520,28 520,170 280,170 280,100" fill="none" stroke={T} strokeWidth="2"/>

      {/* Nodos */}
      <circle cx="350" cy="28" r="3" fill={T}/>
      <circle cx="350" cy="170" r="3" fill={T}/>

      {/* R1 paralelo */}
      <line x1="350" y1="28" x2="350" y2="58" stroke={T} strokeWidth="1.5"/>
      <rect x="338" y="58" width="24" height="52" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="350" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₁</text>
      <line x1="350" y1="110" x2="350" y2="170" stroke={T} strokeWidth="1.5"/>

      {/* R2 paralelo */}
      <line x1="420" y1="28" x2="420" y2="58" stroke={T} strokeWidth="1.5"/>
      <rect x="408" y="58" width="24" height="52" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="420" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₂</text>
      <line x1="420" y1="110" x2="420" y2="170" stroke={T} strokeWidth="1.5"/>

      {/* R3 paralelo */}
      <line x1="490" y1="28" x2="490" y2="58" stroke={T} strokeWidth="1.5"/>
      <rect x="478" y="58" width="24" height="52" rx="4" fill={S} stroke={T} strokeWidth="1.5"/>
      <text x="490" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>R₃</text>
      <line x1="490" y1="110" x2="490" y2="170" stroke={T} strokeWidth="1.5"/>

      {/* Etiqueta paralelo */}
      <rect x="290" y="178" width="220" height="18" rx="5" fill="#e8f5e9" stroke={G} strokeWidth="1"/>
      <text x="400" y="191" textAnchor="middle" fontSize="8.5" fill="#2e7d32" fontWeight="600">
        1/Rₜ = 1/R₁ + 1/R₂ + 1/R₃ — V igual en todos
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONDENSADOR — estructura y campo interno
═══════════════════════════════════════════════════════════════ */
export function DiagramCondensador() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Placas */}
      <rect x="150" y="30" width="14" height="140" rx="3" fill={R} opacity="0.8"/>
      <rect x="236" y="30" width="14" height="140" rx="3" fill={B} opacity="0.8"/>

      {/* Carga en placas */}
      {[50,70,90,110,130,150].map(y => (
        <g key={y}>
          <text x="152" y={y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">+</text>
          <text x="244" y={y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">−</text>
        </g>
      ))}

      {/* Campo eléctrico entre placas */}
      {[60,90,120,150].map(y => (
        <line key={y} x1="165" y1={y} x2="234" y2={y} stroke={A} strokeWidth="1.5" markerEnd="url(#cArr)"/>
      ))}
      <text x="200" y="25" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">E = V/d</text>

      {/* Dieléctrico */}
      <rect x="164" y="30" width="72" height="140" rx="0" fill={V} opacity="0.08"/>
      <text x="200" y="110" textAnchor="middle" fontSize="9" fill={V}>Dieléctrico</text>
      <text x="200" y="122" textAnchor="middle" fontSize="8" fill={V}>εᵣ</text>

      {/* Labels placas */}
      <text x="150" y="182" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">Placa +</text>
      <text x="250" y="182" textAnchor="middle" fontSize="9" fill={B} fontWeight="600">Placa −</text>

      {/* d — distancia */}
      <line x1="165" y1="185" x2="235" y2="185" stroke={T2} strokeWidth="1"/>
      <line x1="165" y1="180" x2="165" y2="190" stroke={T2} strokeWidth="1"/>
      <line x1="235" y1="180" x2="235" y2="190" stroke={T2} strokeWidth="1"/>
      <text x="200" y="198" textAnchor="middle" fontSize="9" fill={T2}>d</text>

      {/* Fórmulas */}
      <rect x="10" y="60" width="130" height="80" rx="8" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="75" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill={B}>C = Q / V</text>
      <text x="75" y="100" textAnchor="middle" fontSize="10" fill={T}>C = ε₀ εᵣ A / d</text>
      <text x="75" y="116" textAnchor="middle" fontSize="9" fill={T2}>[F] Faradio</text>
      <text x="75" y="130" textAnchor="middle" fontSize="8.5" fill={T2}>E = ½CV² [J]</text>

      {/* Conexiones */}
      <line x1="130" y1="100" x2="150" y2="100" stroke={B} strokeWidth="1.5"/>
      <line x1="250" y1="100" x2="290" y2="100" stroke={B} strokeWidth="1.5"/>

      <defs>
        <marker id="cArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={A}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAMPO MAGNÉTICO — regla de la mano derecha
═══════════════════════════════════════════════════════════════ */
export function DiagramCampoMagnetico() {
  return (
    <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Conductor (sección transversal) */}
      <circle cx="210" cy="110" r="28" fill={T} opacity="0.85"/>
      {/* Corriente entrante (punto = hacia el lector) */}
      <circle cx="210" cy="110" r="5" fill={A}/>
      <text x="210" y="148" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">I (saliente ⊙)</text>

      {/* Líneas de campo circulares */}
      {[50, 75, 105].map(r => (
        <circle key={r} cx="210" cy="110" r={r} fill="none" stroke={B} strokeWidth="1.5"
          strokeDasharray={r < 70 ? "none" : "none"}/>
      ))}

      {/* Flechas de campo */}
      {[
        [210, 60, 0],
        [260, 110, 90],
        [210, 160, 180],
        [160, 110, 270],
        [246, 75, 45],
        [246, 145, 135],
        [174, 145, 225],
        [174, 75, 315],
      ].map(([x, y, rot], i) => (
        <line key={i} x1={x} y1={(y as number) - 8} x2={x} y2={(y as number) + 8}
          transform={`translate(0,0) rotate(${rot}, ${x}, ${y})`}
          markerEnd="url(#mArr)" stroke={B} strokeWidth="1.5"/>
      ))}

      {/* Leyenda */}
      <text x="80" y="30" fontSize="11" fontWeight="700" fill={T}>Campo magnético de un conductor</text>
      <text x="80" y="46" fontSize="9" fill={T2}>Las líneas de B son círculos concéntricos</text>
      <text x="80" y="58" fontSize="9" fill={T2}>alrededor del conductor (regla mano derecha)</text>

      {/* B label */}
      <text x="318" y="110" fontSize="13" fontWeight="700" fill={B}>B</text>
      <line x1="258" y1="110" x2="302" y2="110" stroke={B} strokeWidth="1" strokeDasharray="3,2"/>

      {/* Fórmula */}
      <rect x="10" y="160" width="170" height="48" rx="8" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="95" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill={B}>B = μ₀I / (2πr)</text>
      <text x="95" y="198" textAnchor="middle" fontSize="9" fill={T2}>μ₀ = 4π × 10⁻⁷ T·m/A</text>

      <defs>
        <marker id="mArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CORRIENTE ALTERNA — forma de onda sinusoidal
═══════════════════════════════════════════════════════════════ */
export function DiagramCA() {
  const W = 460; const H = 180;
  const cx = (t: number) => 50 + (t / (2 * Math.PI)) * (W - 80);
  const cy = (v: number) => H / 2 - v * 60;

  const points = [];
  for (let t = 0; t <= 2 * Math.PI * 2; t += 0.05) {
    points.push(`${cx(t)},${cy(Math.sin(t))}`);
  }
  const path = 'M ' + points.join(' L ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Ejes */}
      <line x1="50" y1={H/2} x2={W-20} y2={H/2} stroke={BL} strokeWidth="1.5"/>
      <line x1="50" y1="15" x2="50" y2={H-15} stroke={T} strokeWidth="1.5"/>
      {/* Grid */}
      {[0.25, 0.5, 0.75, 1.0].map(t => (
        <line key={t} x1={cx(t * 2 * Math.PI * 2)} y1="15" x2={cx(t * 2 * Math.PI * 2)} y2={H-15}
          stroke={BL} strokeWidth="0.8" strokeDasharray="3,3"/>
      ))}
      {/* Curva */}
      <path d={path} fill="none" stroke={B} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Anotaciones */}
      <line x1="50" y1={cy(1)} x2={cx(0.5 * Math.PI)} y2={cy(1)} stroke={R} strokeWidth="1.2" strokeDasharray="4,3"/>
      <text x="38" y={cy(1) + 4} textAnchor="end" fontSize="9" fill={R} fontWeight="600">Vp</text>
      <line x1="50" y1={cy(-1)} x2={cx(1.5 * Math.PI)} y2={cy(-1)} stroke={R} strokeWidth="1.2" strokeDasharray="4,3"/>
      <text x="38" y={cy(-1) + 4} textAnchor="end" fontSize="9" fill={R} fontWeight="600">−Vp</text>
      {/* Vrms */}
      <line x1="55" y1={cy(0.707)} x2={W-25} y2={cy(0.707)} stroke={G} strokeWidth="1" strokeDasharray="5,3"/>
      <text x={W-22} y={cy(0.707) + 4} fontSize="9" fill={G} fontWeight="600">Vrms</text>
      {/* Periodo */}
      <path d={`M ${cx(0)} ${H-12} L ${cx(2*Math.PI)} ${H-12}`} fill="none" stroke={A} strokeWidth="1.5" markerEnd="url(#tArr)" markerStart="url(#tArr2)"/>
      <text x={cx(Math.PI)} y={H-3} textAnchor="middle" fontSize="9" fill={A} fontWeight="600">T = 1/f</text>
      {/* Labels */}
      <text x="52" y="13" fontSize="9" fontWeight="600" fill={T}>v(t)</text>
      <text x={W-18} y={H/2 + 4} fontSize="9" fill={T2}>t</text>
      <text x="55" y={H/2 - 4} fontSize="8" fill={T2}>0</text>
      {/* Fórmulas */}
      <text x={W*0.65} y="30" fontSize="10" fontWeight="700" fill={T}>v(t) = Vp · sen(ωt)</text>
      <text x={W*0.65} y="46" fontSize="9" fill={T2}>Vrms = Vp / √2 ≈ 0.707 Vp</text>
      <text x={W*0.65} y="62" fontSize="9" fill={T2}>f = 1/T  [Hz]   ω = 2πf [rad/s]</text>

      <defs>
        <marker id="tArr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={A}/></marker>
        <marker id="tArr2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={A}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRANSFORMADOR
═══════════════════════════════════════════════════════════════ */
export function DiagramTransformador() {
  return (
    <svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Núcleo de hierro */}
      <rect x="160" y="30" width="140" height="140" rx="8" fill="#e8eaf0" stroke={BL} strokeWidth="2"/>
      <rect x="185" y="55" width="90" height="90" rx="6" fill="white"/>

      {/* Bobinado primario */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={i} cx="170" cy={65 + i * 18} rx="12" ry="8"
          fill="none" stroke={R} strokeWidth="2.5"/>
      ))}
      <line x1="70" y1="71" x2="158" y2="71" stroke={T} strokeWidth="2"/>
      <line x1="70" y1="149" x2="158" y2="149" stroke={T} strokeWidth="2"/>

      {/* Bobinado secundario */}
      {[0,1,2].map(i => (
        <ellipse key={i} cx="290" cy={75 + i * 25} rx="12" ry="8"
          fill="none" stroke={B} strokeWidth="2.5"/>
      ))}
      <line x1="302" y1="75" x2="385" y2="75" stroke={T} strokeWidth="2"/>
      <line x1="302" y1="149" x2="385" y2="149" stroke={T} strokeWidth="2"/>

      {/* Fuente AC */}
      <circle cx="50" cy="110" r="20" fill={S} stroke={R} strokeWidth="2"/>
      <path d="M 38,110 Q 44,100 50,110 Q 56,120 62,110" fill="none" stroke={R} strokeWidth="1.8"/>
      <line x1="50" y1="90" x2="50" y2="71" stroke={T} strokeWidth="2"/>
      <line x1="50" y1="130" x2="50" y2="149" stroke={T} strokeWidth="2"/>

      {/* Carga */}
      <rect x="390" y="95" width="40" height="30" rx="5" fill={S} stroke={B} strokeWidth="2"/>
      <text x="410" y="114" textAnchor="middle" fontSize="9" fontWeight="600" fill={T}>Carga</text>
      <line x1="385" y1="75" x2="430" y2="75" stroke={T} strokeWidth="2"/>
      <line x1="385" y1="149" x2="430" y2="149" stroke={T} strokeWidth="2"/>
      <line x1="430" y1="75" x2="430" y2="95" stroke={T} strokeWidth="2"/>
      <line x1="430" y1="125" x2="430" y2="149" stroke={T} strokeWidth="2"/>

      {/* Labels */}
      <text x="90" y="62" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">N₁ vueltas</text>
      <text x="90" y="162" textAnchor="middle" fontSize="9" fill={R}>V₁ (entrada)</text>
      <text x="340" y="62" textAnchor="middle" fontSize="9" fill={B} fontWeight="600">N₂ vueltas</text>
      <text x="340" y="162" textAnchor="middle" fontSize="9" fill={B}>V₂ (salida)</text>

      {/* Fórmula */}
      <rect x="145" y="72" width="130" height="56" rx="8" fill="white"/>
      <text x="210" y="96" textAnchor="middle" fontSize="13" fontWeight="800" fill={T}>V₂/V₁ = N₂/N₁</text>
      <text x="210" y="112" textAnchor="middle" fontSize="9" fill={T2}>I₂/I₁ = N₁/N₂</text>
      <text x="210" y="124" textAnchor="middle" fontSize="9" fill={T2}>P₁ = P₂ (ideal)</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEMICONDUCTOR — unión P-N y diodo
═══════════════════════════════════════════════════════════════ */
export function DiagramDiodo() {
  return (
    <svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Región P */}
      <rect x="60" y="40" width="120" height="100" rx="6" fill="rgba(255,59,48,0.08)" stroke={R} strokeWidth="2"/>
      <text x="120" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill={R}>Tipo P</text>
      <text x="120" y="92" textAnchor="middle" fontSize="9" fill={R}>Portadores:</text>
      <text x="120" y="106" textAnchor="middle" fontSize="9" fill={R}>Huecos (h⁺)</text>
      {/* Huecos */}
      {[[80,120],[100,110],[140,125],[110,130],[150,112]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke={R} strokeWidth="1.5"/>
      ))}

      {/* Región N */}
      <rect x="240" y="40" width="120" height="100" rx="6" fill="rgba(0,113,227,0.08)" stroke={B} strokeWidth="2"/>
      <text x="300" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill={B}>Tipo N</text>
      <text x="300" y="92" textAnchor="middle" fontSize="9" fill={B}>Portadores:</text>
      <text x="300" y="106" textAnchor="middle" fontSize="9" fill={B}>Electrones (e⁻)</text>
      {/* Electrones */}
      {[[260,120],[285,112],[310,125],[330,115],[255,130]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={B} opacity="0.7"/>
      ))}

      {/* Unión PN — zona de depleción */}
      <rect x="178" y="40" width="64" height="100" rx="0" fill="rgba(94,92,230,0.1)" stroke={V} strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="210" y="95" textAnchor="middle" fontSize="8" fill={V} fontWeight="600">Zona de</text>
      <text x="210" y="107" textAnchor="middle" fontSize="8" fill={V} fontWeight="600">depleción</text>

      {/* Símbolo del diodo */}
      <text x="210" y="158" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Símbolo: </text>
      <line x1="265" y1="155" x2="285" y2="155" stroke={T} strokeWidth="2"/>
      <polygon points="285,148 285,162 300,155" fill={T}/>
      <line x1="300" y1="148" x2="300" y2="162" stroke={T} strokeWidth="2.5"/>
      <line x1="300" y1="155" x2="320" y2="155" stroke={T} strokeWidth="2"/>
      <text x="283" y="172" textAnchor="middle" fontSize="8" fill={T2}>Ánodo (+)</text>
      <text x="307" y="172" textAnchor="middle" fontSize="8" fill={T2}>Cátodo (−)</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRANSISTOR BJT — NPN
═══════════════════════════════════════════════════════════════ */
export function DiagramTransistor() {
  return (
    <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* ── Símbolo NPN ── */}
      {/* Base */}
      <line x1="80" y1="110" x2="140" y2="110" stroke={T} strokeWidth="2"/>
      <text x="60" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>B</text>
      <line x1="140" y1="70" x2="140" y2="150" stroke={T} strokeWidth="3"/>

      {/* Colector */}
      <line x1="140" y1="80" x2="190" y2="50" stroke={T} strokeWidth="2"/>
      <line x1="190" y1="50" x2="190" y2="20" stroke={T} strokeWidth="2"/>
      <text x="205" y="24" fontSize="10" fontWeight="700" fill={T}>C</text>
      {/* Flecha emisor (NPN: hacia afuera) */}
      <line x1="140" y1="140" x2="190" y2="170" stroke={T} strokeWidth="2"/>
      <line x1="190" y1="170" x2="190" y2="200" stroke={T} strokeWidth="2"/>
      {/* Flecha */}
      <polygon points="170,148 178,157 162,162" fill={T}/>
      <text x="205" y="200" fontSize="10" fontWeight="700" fill={T}>E</text>

      {/* Corrientes */}
      <path d="M 80,95 L 80,110" stroke={A} strokeWidth="1.5" markerEnd="url(#tArr3)"/>
      <text x="66" y="93" fontSize="9" fill={A} fontWeight="600">IB</text>
      <path d="M 190,30 L 190,50" stroke={R} strokeWidth="1.5" markerEnd="url(#tArr3)"/>
      <text x="202" y="42" fontSize="9" fill={R} fontWeight="600">IC</text>
      <path d="M 190,170 L 190,190" stroke={B} strokeWidth="1.5" markerEnd="url(#tArr3)"/>
      <text x="202" y="188" fontSize="9" fill={B} fontWeight="600">IE</text>

      {/* Regiones */}
      <rect x="230" y="20" width="170" height="170" rx="10" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="315" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Transistor NPN</text>

      <text x="315" y="70" textAnchor="middle" fontSize="9" fill={T2}>IE = IB + IC</text>
      <text x="315" y="88" textAnchor="middle" fontSize="9" fill={T2}>IC = β · IB</text>
      <text x="315" y="106" textAnchor="middle" fontSize="9" fill={T2}>β (hFE) ≈ 50–400</text>

      <text x="315" y="130" textAnchor="middle" fontSize="8" fontWeight="600" fill={B}>Regiones de trabajo:</text>
      <text x="315" y="146" textAnchor="middle" fontSize="8" fill={T2}>Corte: IB = 0 → IC ≈ 0 (abierto)</text>
      <text x="315" y="160" textAnchor="middle" fontSize="8" fill={T2}>Activa: amplificación lineal</text>
      <text x="315" y="174" textAnchor="middle" fontSize="8" fill={T2}>Saturación: IC max (cerrado)</text>

      <defs>
        <marker id="tArr3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={A}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   M2 FÍSICA — DIAGRAMAS SVG
═══════════════════════════════════════════════════════════════ */

/** Composición vectorial de fuerzas */
export function DiagramFuerzas() {
  return (
    <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="fArr" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={B}/>
        </marker>
        <marker id="fArrR" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={R}/>
        </marker>
        <marker id="fArrG" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={G}/>
        </marker>
        <marker id="fArrA" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={A}/>
        </marker>
      </defs>
      {/* ─── Origen ─── */}
      <circle cx="140" cy="160" r="5" fill={T}/>

      {/* F1 — horizontal */}
      <line x1="140" y1="160" x2="280" y2="160" stroke={B} strokeWidth="2.5" markerEnd="url(#fArr)"/>
      <text x="210" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill={B}>F₁</text>
      <text x="210" y="178" textAnchor="middle" fontSize="9" fill={B}>140 N →</text>

      {/* F2 — diagonal */}
      <line x1="140" y1="160" x2="230" y2="75" stroke={R} strokeWidth="2.5" markerEnd="url(#fArrR)"/>
      <text x="178" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill={R}>F₂</text>
      <text x="170" y="125" textAnchor="middle" fontSize="9" fill={R}>100 N ↗</text>

      {/* Ángulo α */}
      <path d="M 168,160 A 28,28 0 0,0 157,133" fill="none" stroke={A} strokeWidth="1.5"/>
      <text x="185" y="147" fontSize="9" fill={A} fontWeight="600">α = 53°</text>

      {/* Resultante (suma vectorial) */}
      <line x1="140" y1="160" x2="340" y2="90" stroke={G} strokeWidth="3" markerEnd="url(#fArrG)" strokeDasharray="none"/>
      <text x="265" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill={G}>R</text>

      {/* Líneas punteadas de paralelogramo */}
      <line x1="280" y1="160" x2="340" y2="90" stroke={BL} strokeWidth="1.2" strokeDasharray="5,4"/>
      <line x1="230" y1="75" x2="340" y2="90" stroke={BL} strokeWidth="1.2" strokeDasharray="5,4"/>

      {/* Componentes */}
      <line x1="140" y1="160" x2="340" y2="160" stroke={BL} strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="340" y1="160" x2="340" y2="90" stroke={BL} strokeWidth="1" strokeDasharray="3,3"/>
      <text x="340" y="175" textAnchor="middle" fontSize="9" fill={T2}>Rx</text>
      <text x="355" y="128" fontSize="9" fill={T2}>Ry</text>

      {/* Caja de fórmulas */}
      <rect x="10" y="10" width="200" height="100" rx="8" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="110" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Composición vectorial</text>
      <text x="110" y="50" textAnchor="middle" fontSize="9" fill={T2}>Fx = F·cosθ   Fy = F·sinθ</text>
      <text x="110" y="66" textAnchor="middle" fontSize="9" fill={T2}>Rx = ΣFx       Ry = ΣFy</text>
      <text x="110" y="82" textAnchor="middle" fontSize="9" fill={T2}>|R| = √(Rx² + Ry²)</text>
      <text x="110" y="98" textAnchor="middle" fontSize="9" fill={T2}>θR = arctan(Ry/Rx)</text>

      {/* Punto de aplicación */}
      <text x="140" y="175" textAnchor="middle" fontSize="9" fill={T2}>Origen</text>

      {/* Resultado numérico */}
      <rect x="310" y="190" width="140" height="58" rx="8" fill="#f0fff0" stroke={G} strokeWidth="1.2"/>
      <text x="380" y="210" textAnchor="middle" fontSize="9" fontWeight="700" fill={G}>Resultado</text>
      <text x="380" y="226" textAnchor="middle" fontSize="9" fill={T2}>Rx = 200 N, Ry = 80 N</text>
      <text x="380" y="242" textAnchor="middle" fontSize="9" fill={G} fontWeight="600">|R| = 215 N, θ = 21.8°</text>
    </svg>
  );
}

/** Tipos de palanca */
export function DiagramPalanca() {
  return (
    <svg viewBox="0 0 460 280" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="pArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/>
        </marker>
        <marker id="pArrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/>
        </marker>
      </defs>

      {/* ── 1ª clase ── */}
      <text x="230" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Palanca de 1ª clase — el fulcro está entre F y carga</text>
      <line x1="40" y1="44" x2="420" y2="44" stroke={T} strokeWidth="3" strokeLinecap="round"/>
      {/* Fulcro (triángulo) */}
      <polygon points="230,44 215,70 245,70" fill={T}/>
      {/* Esfuerzo */}
      <line x1="80" y1="44" x2="80" y2="14" stroke={R} strokeWidth="2" markerEnd="url(#pArr)"/>
      <text x="80" y="10" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">F↑ esfuerzo</text>
      {/* Carga */}
      <line x1="360" y1="44" x2="360" y2="74" stroke={B} strokeWidth="2" markerEnd="url(#pArrB)"/>
      <text x="360" y="84" textAnchor="middle" fontSize="9" fill={B} fontWeight="600">W↓ carga</text>
      {/* Distancias */}
      <text x="155" y="38" textAnchor="middle" fontSize="8" fill={R}>d_esfuerzo</text>
      <text x="295" y="38" textAnchor="middle" fontSize="8" fill={B}>d_carga</text>
      <text x="230" y="82" textAnchor="middle" fontSize="8" fill={T2}>Ej.: balancín de alerón</text>

      {/* ── 2ª clase ── */}
      <text x="230" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Palanca de 2ª clase — la carga entre fulcro y esfuerzo</text>
      <line x1="40" y1="140" x2="420" y2="140" stroke={T} strokeWidth="3" strokeLinecap="round"/>
      {/* Fulcro izquierda */}
      <polygon points="40,140 25,166 55,166" fill={T}/>
      {/* Carga en el centro */}
      <line x1="200" y1="140" x2="200" y2="170" stroke={B} strokeWidth="2" markerEnd="url(#pArrB)"/>
      <text x="200" y="180" textAnchor="middle" fontSize="9" fill={B} fontWeight="600">W↓</text>
      {/* Esfuerzo a la derecha */}
      <line x1="380" y1="140" x2="380" y2="110" stroke={R} strokeWidth="2" markerEnd="url(#pArr)"/>
      <text x="380" y="106" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">F↑</text>
      <text x="230" y="192" textAnchor="middle" fontSize="8" fill={T2}>VM &gt; 1 siempre — amplifica fuerza</text>

      {/* ── 3ª clase ── */}
      <text x="230" y="212" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Palanca de 3ª clase — el esfuerzo entre fulcro y carga</text>
      <line x1="40" y1="240" x2="420" y2="240" stroke={T} strokeWidth="3" strokeLinecap="round"/>
      {/* Fulcro izquierda */}
      <polygon points="40,240 25,266 55,266" fill={T}/>
      {/* Esfuerzo en el centro */}
      <line x1="180" y1="240" x2="180" y2="210" stroke={R} strokeWidth="2" markerEnd="url(#pArr)"/>
      <text x="180" y="206" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">F↑</text>
      {/* Carga a la derecha */}
      <line x1="380" y1="240" x2="380" y2="270" stroke={B} strokeWidth="2" markerEnd="url(#pArrB)"/>
      <text x="380" y="280" textAnchor="middle" fontSize="9" fill={B} fontWeight="600">W↓</text>
      <text x="230" y="272" textAnchor="middle" fontSize="8" fill={T2}>VM &lt; 1 — amplifica velocidad/recorrido. Ej.: varilla de mando</text>
    </svg>
  );
}

/** Gráficas cinemáticas MRU y MRUA */
export function DiagramCinematica() {
  const W = 460; const H = 240;
  // MRU: x=t línea, v=cte
  // MRUA: x=t² parabola, v=t línea
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* ─── Panel izquierdo: posición x(t) ─── */}
      <rect x="10" y="10" width="210" height="220" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="115" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Posición x(t)</text>

      {/* Ejes x(t) */}
      <line x1="40" y1="200" x2="210" y2="200" stroke={T} strokeWidth="1.5"/>
      <line x1="40" y1="40" x2="40" y2="200" stroke={T} strokeWidth="1.5"/>
      <text x="215" y="203" fontSize="8" fill={T2}>t</text>
      <text x="30" y="38" textAnchor="middle" fontSize="8" fill={T2}>x</text>

      {/* MRU — línea recta */}
      <line x1="40" y1="190" x2="200" y2="80" stroke={B} strokeWidth="2"/>
      <text x="205" y="78" fontSize="9" fill={B} fontWeight="600">MRU</text>
      <text x="110" y="130" textAnchor="middle" fontSize="8" fill={B}>v = cte</text>

      {/* MRUA — parábola (aproximada) */}
      <path d="M 40,198 Q 100,195 200,70" fill="none" stroke={R} strokeWidth="2"/>
      <text x="200" y="66" fontSize="9" fill={R} fontWeight="600">MRUA</text>
      <text x="80" y="175" textAnchor="middle" fontSize="8" fill={R}>a = cte</text>

      {/* ─── Panel derecho: velocidad v(t) ─── */}
      <rect x="240" y="10" width="210" height="220" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="345" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Velocidad v(t)</text>

      {/* Ejes v(t) */}
      <line x1="270" y1="200" x2="440" y2="200" stroke={T} strokeWidth="1.5"/>
      <line x1="270" y1="40" x2="270" y2="200" stroke={T} strokeWidth="1.5"/>
      <text x="445" y="203" fontSize="8" fill={T2}>t</text>
      <text x="260" y="38" textAnchor="middle" fontSize="8" fill={T2}>v</text>

      {/* MRU — horizontal */}
      <line x1="270" y1="130" x2="430" y2="130" stroke={B} strokeWidth="2"/>
      <text x="435" y="130" fontSize="9" fill={B} fontWeight="600">MRU</text>
      <text x="350" y="122" textAnchor="middle" fontSize="8" fill={B}>v₀</text>
      <text x="350" y="142" textAnchor="middle" fontSize="8" fill={B}>a = 0</text>

      {/* MRUA — recta con pendiente */}
      <line x1="270" y1="195" x2="430" y2="75" stroke={R} strokeWidth="2"/>
      <text x="435" y="73" fontSize="9" fill={R} fontWeight="600">MRUA</text>
      <text x="350" y="155" textAnchor="middle" fontSize="8" fill={R}>pendiente = a</text>

      {/* Área bajo v(t) = desplazamiento */}
      <path d="M 270,195 L 370,120 L 370,200 Z" fill={R} opacity="0.12"/>
      <text x="330" y="185" textAnchor="middle" fontSize="7.5" fill={R}>área = Δx</text>
    </svg>
  );
}

/** Movimiento circular — fuerzas en viraje de aeronave */
export function DiagramCircular() {
  return (
    <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="cArrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/>
        </marker>
        <marker id="cArrG" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={G}/>
        </marker>
        <marker id="cArrR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/>
        </marker>
        <marker id="cArrA" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={A}/>
        </marker>
      </defs>

      {/* Trayectoria circular */}
      <circle cx="200" cy="140" r="90" fill="none" stroke={BL} strokeWidth="1.5" strokeDasharray="6,4"/>
      <text x="200" y="248" textAnchor="middle" fontSize="9" fill={T2}>Trayectoria circular (radio r)</text>

      {/* Avión en posición superior */}
      {/* Simplificado como punto */}
      <circle cx="200" cy="50" r="8" fill={T} opacity="0.8"/>
      <text x="200" y="45" textAnchor="middle" fontSize="9" fill={T2}>aeronave</text>

      {/* Centro */}
      <circle cx="200" cy="140" r="4" fill={T}/>
      <text x="212" y="144" fontSize="9" fill={T2}>C</text>
      <line x1="200" y1="140" x2="200" y2="50" stroke={T2} strokeWidth="1" strokeDasharray="4,3"/>
      <text x="215" y="96" fontSize="9" fill={T2}>r</text>

      {/* Vector velocidad tangencial */}
      <line x1="200" y1="50" x2="280" y2="50" stroke={G} strokeWidth="2.5" markerEnd="url(#cArrG)"/>
      <text x="245" y="44" textAnchor="middle" fontSize="10" fontWeight="700" fill={G}>v</text>
      <text x="245" y="57" textAnchor="middle" fontSize="8" fill={G}>vt = ω·r</text>

      {/* Aceleración centrípeta (hacia centro) */}
      <line x1="200" y1="50" x2="200" y2="100" stroke={R} strokeWidth="2.5" markerEnd="url(#cArrR)"/>
      <text x="218" y="76" fontSize="10" fontWeight="700" fill={R}>ac</text>
      <text x="218" y="88" fontSize="8" fill={R}>= v²/r</text>

      {/* Ángulo de banco φ */}
      <text x="50" y="80" fontSize="11" fontWeight="700" fill={T}>Viraje coordinado:</text>
      <text x="50" y="98" fontSize="9" fill={T2}>Ángulo de banco φ</text>
      <text x="50" y="114" fontSize="9" fill={B} fontWeight="600">n = L/W = 1/cos(φ)</text>
      <text x="50" y="130" fontSize="9" fill={T2}>φ = 30° → n = 1.15g</text>
      <text x="50" y="146" fontSize="9" fill={T2}>φ = 45° → n = 1.41g</text>
      <text x="50" y="162" fontSize="9" fill={R} fontWeight="600">φ = 60° → n = 2.00g</text>
      <text x="50" y="178" fontSize="9" fill={T2}>φ = 75° → n = 3.86g</text>

      {/* Fuerza centrípeta */}
      <rect x="310" y="80" width="140" height="90" rx="8" fill="#fff9e6" stroke={A} strokeWidth="1.2"/>
      <text x="380" y="100" textAnchor="middle" fontSize="9" fontWeight="700" fill={T}>Fc = m·v²/r</text>
      <text x="380" y="116" textAnchor="middle" fontSize="9" fill={T2}>= m·ω²·r</text>
      <text x="380" y="132" textAnchor="middle" fontSize="9" fill={T2}>ω = 2π·f = v/r</text>
      <text x="380" y="148" textAnchor="middle" fontSize="8" fill={A}>ac = v²/r  [m/s²]</text>
      <text x="380" y="162" textAnchor="middle" fontSize="8" fill={A}>→ hacia el centro</text>
    </svg>
  );
}

/** Principio de Bernoulli — tubo Venturi / perfil alar */
export function DiagramBernoulli() {
  return (
    <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="bArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/>
        </marker>
        <marker id="bArrG" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={G}/>
        </marker>
      </defs>

      {/* ─── Tubo Venturi ─── */}
      <text x="230" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill={T}>Tubo Venturi — Ecuación de Bernoulli</text>

      {/* Pared superior del tubo */}
      <path d="M 20,50 L 140,50 Q 160,50 180,75 L 280,75 Q 300,75 320,50 L 440,50" fill="none" stroke={T} strokeWidth="2.5"/>
      {/* Pared inferior */}
      <path d="M 20,130 L 140,130 Q 160,130 180,105 L 280,105 Q 300,105 320,130 L 440,130" fill="none" stroke={T} strokeWidth="2.5"/>
      {/* Relleno (fluido) */}
      <path d="M 20,50 L 140,50 Q 160,50 180,75 L 280,75 Q 300,75 320,50 L 440,50 L 440,130 Q 300,130 280,105 L 180,105 Q 160,130 140,130 L 20,130 Z" fill={B} opacity="0.07"/>

      {/* Flechas de flujo — sección amplia (lentas) */}
      {[70, 90, 110].map(y => (
        <line key={y} x1="25" y1={y} x2="70" y2={y} stroke={B} strokeWidth="1.5" markerEnd="url(#bArr)"/>
      ))}
      <text x="30" y="148" fontSize="9" fill={B}>v₁ lenta</text>
      <text x="30" y="160" fontSize="9" fill={R}>p₁ alta</text>

      {/* Flechas — sección estrecha (rápidas) */}
      {[83, 90, 97].map(y => (
        <line key={y} x1="185" y1={y} x2="275" y2={y} stroke={G} strokeWidth="2" markerEnd="url(#bArrG)"/>
      ))}
      <text x="200" y="120" fontSize="9" fill={G} fontWeight="600">v₂ rápida</text>
      <text x="200" y="132" fontSize="9" fill={G}>p₂ baja ↓</text>

      {/* Manómetros (tubos piezométricos) */}
      {/* Manómetro izquierdo */}
      <line x1="80" y1="50" x2="80" y2="22" stroke={T} strokeWidth="1.5"/>
      <rect x="70" y="14" width="20" height="12" rx="3" fill={R} opacity="0.3"/>
      <text x="80" y="10" textAnchor="middle" fontSize="8" fill={R} fontWeight="600">p₁</text>

      {/* Manómetro estrecho */}
      <line x1="230" y1="75" x2="230" y2="50" stroke={T} strokeWidth="1.5"/>
      <rect x="220" y="42" width="20" height="12" rx="3" fill={G} opacity="0.3"/>
      <text x="230" y="38" textAnchor="middle" fontSize="8" fill={G} fontWeight="600">p₂</text>

      {/* A1 y A2 */}
      <line x1="60" y1="50" x2="60" y2="130" stroke={A} strokeWidth="1" strokeDasharray="3,3"/>
      <text x="45" y="93" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">A₁</text>
      <line x1="230" y1="75" x2="230" y2="105" stroke={A} strokeWidth="1" strokeDasharray="3,3"/>
      <text x="248" y="93" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">A₂</text>

      {/* Fórmulas */}
      <rect x="10" y="170" width="440" height="82" rx="8" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="230" y="190" textAnchor="middle" fontSize="11" fontWeight="800" fill={B}>p + ½ρv² + ρgh = constante</text>
      <text x="100" y="210" textAnchor="middle" fontSize="9" fill={T2}>Continuidad: A₁·v₁ = A₂·v₂</text>
      <text x="100" y="226" textAnchor="middle" fontSize="9" fill={R} fontWeight="600">A₂ &lt; A₁ → v₂ &gt; v₁ → p₂ &lt; p₁</text>
      <text x="340" y="210" textAnchor="middle" fontSize="9" fill={G} fontWeight="600">Sustentación del ala:</text>
      <text x="340" y="226" textAnchor="middle" fontSize="9" fill={T2}>v_extradós &gt; v_intradós → L = Δp·A</text>
      <text x="340" y="242" textAnchor="middle" fontSize="9" fill={T2}>L = ½ρv²·S·CL</text>
    </svg>
  );
}

/** Ciclo de Brayton — motor turbina de gas */
export function DiagramBrayton() {
  return (
    <svg viewBox="0 0 460 280" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="brArr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={B}/>
        </marker>
      </defs>

      {/* Diagrama P-V del ciclo de Brayton */}
      <text x="230" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill={T}>Ciclo de Brayton — Motor Turbina de Gas</text>

      {/* Ejes P-V */}
      <line x1="50" y1="240" x2="320" y2="240" stroke={T} strokeWidth="1.5"/>
      <line x1="50" y1="30" x2="50" y2="240" stroke={T} strokeWidth="1.5"/>
      <text x="325" y="243" fontSize="9" fill={T2}>V →</text>
      <text x="38" y="28" fontSize="9" fill={T2}>P ↑</text>

      {/* Puntos del ciclo */}
      {/* 1: baja P, grande V (entrada aire) */}
      {/* 2: alta P, pequeño V (salida compresor) */}
      {/* 3: alta P, pequeño V, alta T (salida cámara) */}
      {/* 4: baja P, grande V (salida turbina) */}

      {/* 1→2 Compresión adiabática */}
      <path d="M 240,215 Q 140,200 80,75" fill="none" stroke={B} strokeWidth="2.5" markerEnd="url(#brArr)"/>
      <text x="145" y="168" fontSize="9" fill={B} fontWeight="600">1→2</text>
      <text x="145" y="180" fontSize="8" fill={B}>Compresión</text>
      <text x="145" y="192" fontSize="8" fill={B}>adiabática</text>

      {/* 2→3 Adición de calor (isobara) */}
      <line x1="80" y1="75" x2="110" y2="60" stroke={R} strokeWidth="2.5" markerEnd="url(#brArr)"/>
      <text x="100" y="48" fontSize="9" fill={R} fontWeight="600">2→3 Calor QH</text>
      <text x="100" y="60" fontSize="8" fill={R}>p = cte</text>

      {/* 3→4 Expansión adiabática */}
      <path d="M 110,60 Q 200,100 270,180" fill="none" stroke={G} strokeWidth="2.5" markerEnd="url(#brArr)"/>
      <text x="215" y="105" fontSize="9" fill={G} fontWeight="600">3→4</text>
      <text x="215" y="118" fontSize="8" fill={G}>Expansión</text>
      <text x="215" y="130" fontSize="8" fill={G}>adiabática</text>

      {/* 4→1 Expulsión calor (isobara) */}
      <line x1="270" y1="180" x2="240" y2="215" stroke={A} strokeWidth="2.5" markerEnd="url(#brArr)"/>
      <text x="278" y="208" fontSize="9" fill={A} fontWeight="600">4→1 QL</text>

      {/* Etiquetas de puntos */}
      <circle cx="240" cy="215" r="5" fill={T}/><text x="248" y="218" fontSize="9" fill={T} fontWeight="700">1</text>
      <circle cx="80" cy="75" r="5" fill={T}/><text x="65" y="72" fontSize="9" fill={T} fontWeight="700">2</text>
      <circle cx="110" cy="60" r="5" fill={T}/><text x="118" y="58" fontSize="9" fill={T} fontWeight="700">3</text>
      <circle cx="270" cy="180" r="5" fill={T}/><text x="278" y="183" fontSize="9" fill={T} fontWeight="700">4</text>

      {/* Esquema del motor */}
      <rect x="330" y="30" width="120" height="240" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="390" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill={T}>Motor turbina</text>

      <text x="390" y="72" textAnchor="middle" fontSize="8" fill={B}>① Compresor</text>
      <rect x="350" y="78" width="80" height="16" rx="4" fill={B} opacity="0.2" stroke={B} strokeWidth="1"/>

      <text x="390" y="112" textAnchor="middle" fontSize="8" fill={R}>② Cámara comb.</text>
      <rect x="350" y="118" width="80" height="16" rx="4" fill={R} opacity="0.2" stroke={R} strokeWidth="1"/>

      <text x="390" y="152" textAnchor="middle" fontSize="8" fill={G}>③ Turbina</text>
      <rect x="350" y="158" width="80" height="16" rx="4" fill={G} opacity="0.2" stroke={G} strokeWidth="1"/>

      <text x="390" y="192" textAnchor="middle" fontSize="8" fill={A}>④ Tobera/escape</text>
      <rect x="350" y="198" width="80" height="16" rx="4" fill={A} opacity="0.2" stroke={A} strokeWidth="1"/>

      <rect x="340" y="220" width="100" height="40" rx="6" fill="white" stroke={B} strokeWidth="1"/>
      <text x="390" y="236" textAnchor="middle" fontSize="8" fontWeight="700" fill={B}>η = 1 − T₁/T₂</text>
      <text x="390" y="250" textAnchor="middle" fontSize="8" fill={T2}>Relación compr. 30:1→50:1</text>
    </svg>
  );
}

/** Transmisión de calor — conducción, convección, radiación */
export function DiagramCalor() {
  return (
    <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* ── CONDUCCIÓN (izquierda) ── */}
      <rect x="10" y="10" width="135" height="200" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="77" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Conducción</text>

      {/* Gradiente de temperatura */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={25 + i*20} y="50" width="18" height="80" rx="2"
          fill={`rgba(255,${Math.round(59 + i*35)},${Math.round(30 + i*50)},${0.7 - i*0.1})`}/>
      ))}
      <text x="30" y="148" fontSize="8" fill={R} fontWeight="600">TH</text>
      <text x="112" y="148" fontSize="8" fill={B} fontWeight="600">TC</text>

      {/* Flechas de calor */}
      {[65,90,115].map(y => (
        <line key={y} x1="30" y1={y} x2="120" y2={y} stroke={A} strokeWidth="1.5"
          markerEnd="url(#hArrA)" strokeDasharray="none"/>
      ))}

      <text x="77" y="172" textAnchor="middle" fontSize="8" fill={T2}>Q = k·A·ΔT/d</text>
      <text x="77" y="186" textAnchor="middle" fontSize="7.5" fill={T2}>Metal → buen conductor</text>
      <text x="77" y="200" textAnchor="middle" fontSize="7.5" fill={T2}>Aire → aislante</text>

      {/* ── CONVECCIÓN (centro) ── */}
      <rect x="160" y="10" width="135" height="200" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="227" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Convección</text>

      {/* Fluido convección: flechas circulares */}
      <path d="M 190,150 Q 190,80 227,60 Q 264,80 264,150" fill="none" stroke={R} strokeWidth="1.8"
        markerEnd="url(#hArrR)"/>
      <path d="M 264,150 Q 264,180 227,185 Q 190,180 190,150" fill="none" stroke={B} strokeWidth="1.8"
        markerEnd="url(#hArrB)"/>

      <text x="227" y="100" textAnchor="middle" fontSize="9" fill={R}>Fluido</text>
      <text x="227" y="114" textAnchor="middle" fontSize="9" fill={R}>caliente ↑</text>
      <text x="227" y="168" textAnchor="middle" fontSize="9" fill={B}>Fluido</text>
      <text x="227" y="180" textAnchor="middle" fontSize="9" fill={B}>frío ↓</text>
      <text x="227" y="200" textAnchor="middle" fontSize="8" fill={T2}>Q = h·A·ΔT</text>

      {/* ── RADIACIÓN (derecha) ── */}
      <rect x="310" y="10" width="140" height="200" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="380" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={T}>Radiación</text>

      {/* Sol / fuente caliente */}
      <circle cx="345" cy="90" r="22" fill={A} opacity="0.8"/>
      <text x="345" y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">T⁴</text>

      {/* Ondas de radiación */}
      {[0,1,2].map(i => (
        <path key={i} d={`M 368,${78 + i*12} Q ${390 + i*5},${82 + i*12} ${420 + i*3},${78 + i*12}`}
          fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="3,2"/>
      ))}

      {/* Cuerpo receptor */}
      <rect x="405" y="68" width="28" height="60" rx="4" fill={T} opacity="0.4"/>
      <text x="419" y="144" textAnchor="middle" fontSize="8" fill={T2}>receptor</text>

      <text x="380" y="172" textAnchor="middle" fontSize="8" fill={T2}>Q = ε·σ·A·T⁴</text>
      <text x="380" y="186" textAnchor="middle" fontSize="7.5" fill={T2}>σ = 5.67×10⁻⁸ W/(m²K⁴)</text>
      <text x="380" y="200" textAnchor="middle" fontSize="7.5" fill={T2}>No necesita medio material</text>

      <defs>
        <marker id="hArrA" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={A}/></marker>
        <marker id="hArrR" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={R}/></marker>
        <marker id="hArrB" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={B}/></marker>
      </defs>
    </svg>
  );
}

/** Reflexión total interna — fibra óptica */
export function DiagramFibra() {
  return (
    <svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="fibArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={A}/>
        </marker>
        <marker id="fibArrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/>
        </marker>
      </defs>

      {/* Núcleo de fibra óptica */}
      <rect x="20" y="80" width="420" height="50" rx="0" fill={B} opacity="0.12" stroke={B} strokeWidth="2"/>
      {/* Revestimiento */}
      <rect x="20" y="55" width="420" height="25" rx="0" fill={BL} opacity="0.5"/>
      <rect x="20" y="130" width="420" height="25" rx="0" fill={BL} opacity="0.5"/>

      {/* Labels */}
      <text x="230" y="74" textAnchor="middle" fontSize="8" fill={T2}>Revestimiento (n₂ &lt; n₁)</text>
      <text x="230" y="110" textAnchor="middle" fontSize="9" fontWeight="600" fill={B}>Núcleo (n₁)</text>
      <text x="230" y="148" textAnchor="middle" fontSize="8" fill={T2}>Revestimiento (n₂ &lt; n₁)</text>

      {/* Rayo de luz — reflecciones totales internas */}
      <line x1="30" y1="105" x2="120" y2="82" stroke={A} strokeWidth="2" markerEnd="url(#fibArr)"/>
      <line x1="120" y1="82" x2="210" y2="118" stroke={A} strokeWidth="2" markerEnd="url(#fibArr)"/>
      <line x1="210" y1="118" x2="300" y2="82" stroke={A} strokeWidth="2" markerEnd="url(#fibArr)"/>
      <line x1="300" y1="82" x2="390" y2="118" stroke={A} strokeWidth="2" markerEnd="url(#fibArr)"/>
      <line x1="390" y1="118" x2="440" y2="100" stroke={A} strokeWidth="2"/>

      {/* Ángulos de incidencia */}
      <path d="M 108,82 A 15,15 0 0,1 120,95" fill="none" stroke={T2} strokeWidth="1"/>
      <text x="112" y="100" fontSize="8" fill={T2}>θ &gt; θc</text>

      {/* Ley de Snell */}
      <rect x="10" y="10" width="200" height="38" rx="6" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="110" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={B}>Ley de Snell: n₁·sinθ₁ = n₂·sinθ₂</text>
      <text x="110" y="40" textAnchor="middle" fontSize="8" fill={T2}>θc = arcsin(n₂/n₁) — reflexión total interna</text>

      {/* Ventajas */}
      <rect x="220" y="10" width="230" height="38" rx="6" fill="#f0fff0" stroke={G} strokeWidth="1.2"/>
      <text x="335" y="26" textAnchor="middle" fontSize="8" fontWeight="600" fill={G}>Aviación: inmune a EMI, ligera,</text>
      <text x="335" y="40" textAnchor="middle" fontSize="8" fill={T2}>alta BW, no inflamable — AFDX B787</text>
    </svg>
  );
}

/** Onda mecánica — longitud de onda, amplitud, período */
export function DiagramOnda() {
  const W = 460; const H = 180;
  const pts: string[] = [];
  for (let x = 30; x <= W - 30; x += 2) {
    const t = (x - 30) / (W - 60) * 4 * Math.PI;
    const y = H / 2 - Math.sin(t) * 55;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Eje x */}
      <line x1="30" y1={H/2} x2={W-20} y2={H/2} stroke={BL} strokeWidth="1.5"/>
      {/* Onda */}
      <polyline points={pts.join(' ')} fill="none" stroke={B} strokeWidth="2.5"/>

      {/* Amplitud */}
      <line x1="145" y1={H/2} x2="145" y2={H/2-55} stroke={R} strokeWidth="1.5" strokeDasharray="4,3"/>
      <line x1="141" y1={H/2} x2="149" y2={H/2} stroke={R} strokeWidth="1.5"/>
      <line x1="141" y1={H/2-55} x2="149" y2={H/2-55} stroke={R} strokeWidth="1.5"/>
      <text x="160" y={H/2-28} fontSize="10" fill={R} fontWeight="700">A</text>
      <text x="160" y={H/2-16} fontSize="8" fill={R}>amplitud</text>

      {/* Longitud de onda */}
      <line x1="30" y1={H-10} x2="145" y2={H-10} stroke={G} strokeWidth="1.5"
        markerEnd="url(#wArrG)" markerStart="url(#wArrG2)"/>
      <text x="88" y={H-1} textAnchor="middle" fontSize="9" fill={G} fontWeight="700">λ (longitud de onda)</text>

      {/* Período */}
      <line x1="30" y1="10" x2="145" y2="10" stroke={A} strokeWidth="1.5"
        markerEnd="url(#wArrA)"/>
      <text x="88" y="22" textAnchor="middle" fontSize="9" fill={A}>T = 1/f [s]</text>

      {/* Fórmula */}
      <rect x="280" y="20" width="170" height="60" rx="8" fill="#f0f8ff" stroke={B} strokeWidth="1.2"/>
      <text x="365" y="40" textAnchor="middle" fontSize="11" fontWeight="800" fill={B}>λ · f = v</text>
      <text x="365" y="56" textAnchor="middle" fontSize="9" fill={T2}>λ longitud [m] · f [Hz] = v [m/s]</text>
      <text x="365" y="72" textAnchor="middle" fontSize="9" fill={T2}>Sonido en aire: v = 340 m/s</text>

      {/* Dirección propagación */}
      <text x="280" y={H/2-2} fontSize="9" fill={T2}>propagación →</text>

      <defs>
        <marker id="wArrG" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={G}/></marker>
        <marker id="wArrG2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={G}/></marker>
        <marker id="wArrA" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={A}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   M4 ELECTRÓNICA — DIAGRAMAS SVG
═══════════════════════════════════════════════════════════════ */

/** Lazo de control PID — diagrama de bloques */
export function DiagramPID() {
  return (
    <svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <defs>
        <marker id="pidArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T}/>
        </marker>
        <marker id="pidArrR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={R}/>
        </marker>
        <marker id="pidArrG" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={G}/>
        </marker>
        <marker id="pidArrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/>
        </marker>
      </defs>

      {/* ─── Referencia (set-point) ─── */}
      <text x="14" y="93" fontSize="10" fontWeight="700" fill={T}>r(t)</text>
      <text x="10" y="106" fontSize="8" fill={T2}>consigna</text>
      <line x1="50" y1="90" x2="78" y2="90" stroke={T} strokeWidth="1.8" markerEnd="url(#pidArr)"/>

      {/* ─── Sumador (error) ─── */}
      <circle cx="88" cy="90" r="10" fill="white" stroke={T} strokeWidth="1.8"/>
      <text x="88" y="94" textAnchor="middle" fontSize="12" fill={T}>Σ</text>
      <text x="82" y="86" fontSize="8" fill={G} fontWeight="600">+</text>
      <text x="88" y="106" fontSize="8" fill={R} fontWeight="600">−</text>

      {/* Error */}
      <line x1="98" y1="90" x2="135" y2="90" stroke={T} strokeWidth="1.8" markerEnd="url(#pidArr)"/>
      <text x="116" y="83" textAnchor="middle" fontSize="9" fill={R} fontWeight="700">e(t)</text>
      <text x="116" y="104" textAnchor="middle" fontSize="8" fill={T2}>error</text>

      {/* ─── Controlador PID ─── */}
      <rect x="136" y="68" width="100" height="44" rx="8" fill="#fff9e6" stroke={A} strokeWidth="2"/>
      <text x="186" y="87" textAnchor="middle" fontSize="11" fontWeight="800" fill={T}>Controlador</text>
      <text x="186" y="102" textAnchor="middle" fontSize="9" fill={A} fontWeight="600">PID</text>
      <line x1="236" y1="90" x2="265" y2="90" stroke={T} strokeWidth="1.8" markerEnd="url(#pidArr)"/>
      <text x="250" y="83" textAnchor="middle" fontSize="9" fill={T2}>u(t)</text>

      {/* ─── Actuador ─── */}
      <rect x="266" y="70" width="80" height="40" rx="8" fill="#e8f5e9" stroke={G} strokeWidth="2"/>
      <text x="306" y="87" textAnchor="middle" fontSize="10" fontWeight="700" fill={G}>Actuador</text>
      <text x="306" y="100" textAnchor="middle" fontSize="8" fill={T2}>motor / válv.</text>
      <line x1="346" y1="90" x2="375" y2="90" stroke={T} strokeWidth="1.8" markerEnd="url(#pidArr)"/>

      {/* ─── Planta / Sistema ─── */}
      <rect x="376" y="70" width="80" height="40" rx="8" fill="#e8eaf6" stroke={B} strokeWidth="2"/>
      <text x="416" y="87" textAnchor="middle" fontSize="10" fontWeight="700" fill={B}>Planta</text>
      <text x="416" y="100" textAnchor="middle" fontSize="8" fill={T2}>sistema real</text>
      <line x1="456" y1="90" x2="500" y2="90" stroke={T} strokeWidth="1.8" markerEnd="url(#pidArr)"/>
      <text x="505" y="93" fontSize="10" fontWeight="700" fill={T}>y(t)</text>
      <text x="498" y="106" fontSize="8" fill={T2}>salida</text>

      {/* ─── Realimentación (feedback) ─── */}
      <line x1="478" y1="90" x2="478" y2="148" stroke={R} strokeWidth="1.8"/>
      <line x1="478" y1="148" x2="88" y2="148" stroke={R} strokeWidth="1.8"/>
      <line x1="88" y1="148" x2="88" y2="100" stroke={R} strokeWidth="1.8" markerEnd="url(#pidArrR)"/>

      {/* ─── Sensor ─── */}
      <rect x="320" y="130" width="80" height="28" rx="6" fill="white" stroke={R} strokeWidth="1.5"/>
      <text x="360" y="145" textAnchor="middle" fontSize="9" fontWeight="600" fill={R}>Sensor</text>
      <text x="360" y="156" textAnchor="middle" fontSize="7.5" fill={T2}>LVDT / encoder</text>

      {/* Leyenda PID */}
      <rect x="136" y="10" width="220" height="48" rx="6" fill="#f5f5f7" stroke={BL} strokeWidth="1"/>
      <text x="246" y="26" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={T}>u(t) = Kp·e + Ki·∫e dt + Kd·de/dt</text>
      <text x="246" y="40" textAnchor="middle" fontSize="8" fill={T2}>Kp: rapidez  |  Ki: error estático  |  Kd: amortiguación</text>
      <text x="246" y="54" textAnchor="middle" fontSize="7.5" fill={A}>Error → 0 en estado estacionario</text>
    </svg>
  );
}

/** Bus ARINC 429 — topología punto a punto */
export function DiagramBusARINC() {
  return (
    <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      <text x="260" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill={T}>Bus ARINC 429 — Topología Unidireccional</text>

      {/* ─── Transmisor (1 solo) ─── */}
      <rect x="20" y="60" width="100" height="50" rx="8" fill={B} opacity="0.15" stroke={B} strokeWidth="2"/>
      <text x="70" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill={B}>Transmisor</text>
      <text x="70" y="96" textAnchor="middle" fontSize="8.5" fill={B}>TX (1 único)</text>
      <text x="70" y="108" textAnchor="middle" fontSize="7.5" fill={T2}>FMC / ADC / Radio</text>

      {/* Bus lines (par trenzado) */}
      <line x1="120" y1="80" x2="220" y2="80" stroke={B} strokeWidth="2.5"/>
      <line x1="120" y1="90" x2="220" y2="90" stroke={R} strokeWidth="2.5"/>
      <text x="170" y="76" textAnchor="middle" fontSize="8" fill={B}>A (+)</text>
      <text x="170" y="99" textAnchor="middle" fontSize="8" fill={R}>B (−)</text>

      {/* Flecha dirección */}
      <path d="M 165,66 L 180,66" stroke={T} strokeWidth="1.5"
        markerEnd="url(#arinArr)"/>
      <text x="172" y="62" textAnchor="middle" fontSize="8" fill={T2}>→ datos</text>

      {/* ─── Receptores (hasta 20) ─── */}
      {[['EFIS', 36], ['FMS', 80], ['ACARS', 124], ['VOR Rcvr', 168]].map(([label, y], i) => (
        <g key={i}>
          {/* Línea desde bus al receptor */}
          <line x1="220" y1="85" x2="250" y2={y as number + 15} stroke={BL} strokeWidth="1.2"/>
          <rect x="250" y={y as number} width="110" height="30" rx="6"
            fill={G} opacity={0.15} stroke={G} strokeWidth="1.5"/>
          <text x="305" y={y as number + 13} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={G}>RX: {label}</text>
          <text x="305" y={y as number + 24} textAnchor="middle" fontSize="7.5" fill={T2}>receptor (1 de ≤20)</text>
        </g>
      ))}

      {/* Bus vertical */}
      <line x1="220" y1="60" x2="220" y2="195" stroke={T} strokeWidth="2" strokeDasharray="6,3"/>

      {/* Propiedades del bus */}
      <rect x="375" y="55" width="135" height="155" rx="8" fill={S} stroke={BL} strokeWidth="1.2"/>
      <text x="442" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill={T}>Características</text>
      <text x="442" y="90" textAnchor="middle" fontSize="8" fill={T2}>Velocidad: 12.5 / 100 kbps</text>
      <text x="442" y="104" textAnchor="middle" fontSize="8" fill={T2}>Par trenzado (diferencial)</text>
      <text x="442" y="118" textAnchor="middle" fontSize="8" fill={T2}>1 TX → hasta 20 RX</text>
      <text x="442" y="132" textAnchor="middle" fontSize="8" fill={T2}>Palabra: 32 bits</text>
      <text x="442" y="146" textAnchor="middle" fontSize="8" fill={T2}>Codificación BRZ</text>
      <text x="442" y="160" textAnchor="middle" fontSize="8" fill={R} fontWeight="600">Unidireccional:</text>
      <text x="442" y="173" textAnchor="middle" fontSize="7.5" fill={T2}>Para bidireccional</text>
      <text x="442" y="186" textAnchor="middle" fontSize="7.5" fill={T2}>se necesitan 2 buses</text>
      <text x="442" y="200" textAnchor="middle" fontSize="7.5" fill={G} fontWeight="600">Sin colisiones posibles</text>

      <defs>
        <marker id="arinArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T}/></marker>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SOLENOIDE — campo magnético
═══════════════════════════════════════════════════════════════ */
export function DiagramSolenoide() {
  return (
    <svg viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg" fontFamily="-apple-system,sans-serif">
      {/* Líneas de campo dentro */}
      {[55, 80, 105].map(y => (
        <line key={y} x1="60" y1={y} x2="360" y2={y} stroke={B} strokeWidth="1.2"
          strokeDasharray="none" markerEnd="url(#soArr)"/>
      ))}
      {/* Líneas de campo fuera (se curvan) */}
      <path d="M 360,80 Q 420,80 420,30 Q 420,-20 60,-20 Q -20,-20 -20,80 Q -20,180 60,180 Q 420,180 420,130 Q 420,80 360,80"
        fill="none" stroke={B} strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>

      {/* Espiras del solenoide */}
      {[80,105,130,155,180,205,230,255,280,305,330].map(x => (
        <ellipse key={x} cx={x} cy="80" rx="10" ry="40"
          fill="none" stroke={R} strokeWidth="2.2"/>
      ))}

      {/* Polo N y S */}
      <rect x="55" y="38" width="25" height="84" rx="4" fill={R} opacity="0.15" stroke={R} strokeWidth="1.5"/>
      <text x="67" y="83" textAnchor="middle" fontSize="11" fontWeight="800" fill={R}>N</text>
      <rect x="338" y="38" width="25" height="84" rx="4" fill={B} opacity="0.15" stroke={B} strokeWidth="1.5"/>
      <text x="350" y="83" textAnchor="middle" fontSize="11" fontWeight="800" fill={B}>S</text>

      {/* B label */}
      <text x="210" y="70" textAnchor="middle" fontSize="10" fontWeight="600" fill={B}>B = μ₀ n I</text>
      <text x="210" y="84" textAnchor="middle" fontSize="8" fill={T2}>n = N/L (espiras/metro)</text>

      {/* Corriente */}
      <text x="110" y="150" textAnchor="middle" fontSize="9" fill={R}>I →</text>
      <text x="310" y="150" textAnchor="middle" fontSize="9" fill={R}>← I</text>
      <text x="210" y="150" textAnchor="middle" fontSize="9" fill={T2}>Regla de la mano derecha: dedos = sentido I, pulgar = polo N</text>

      <defs>
        <marker id="soArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={B}/></marker>
      </defs>
    </svg>
  );
}
