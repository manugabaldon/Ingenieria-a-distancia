/**
 * SubjectArt.tsx — Fondos "plano de ingeniero" que aparecen al pasar el
 * cursor sobre una tarjeta de asignatura. Estilo blueprint (líneas claras
 * sobre azul oscuro), siempre con temática aeronáutica.
 */
import type { ComponentType } from 'react';

const BG          = '#0a1930';
const GRID        = '#16324f';
const LINE        = '#8ecae6';
const LINE_DIM     = '#3d5a80';
const FORCE_COLOR  = '#ff9f0a';
const ROT_COLOR    = '#7fffd4';

function polar(cx: number, cy: number, angleDeg: number, r: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/* ═══════════════════════════════════════════════════════════════
   MECÁNICA — Rotor de compresor: álabes, fuerzas F y rotación ω
   Plano de ingeniero: cuadrícula, líneas de eje, cuadro de título.
═══════════════════════════════════════════════════════════════ */
export function SubjectArtMecanica() {
  const cx = 300, cy = 210;
  const hubR = 36;
  const bladeRootR = 40;
  const bladeTipR = 150;
  const bladeCount = 9;
  const bladeHalfRoot = 9;
  const bladeHalfTip = 3;

  const bladeAngles = Array.from({ length: bladeCount }, (_, i) => (i * 360) / bladeCount);
  const forceAngles = [bladeAngles[0], bladeAngles[3]];

  const arcR = bladeTipR + 45;
  const arcStart = -20;
  const arcEnd = 70;
  const [arcX1, arcY1] = polar(cx, cy, arcStart, arcR);
  const [arcX2, arcY2] = polar(cx, cy, arcEnd, arcR);
  const [omegaX, omegaY] = polar(cx, cy, (arcStart + arcEnd) / 2, arcR + 18);

  return (
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" fontFamily="'SF Mono','Fira Code',monospace">
      <rect width="600" height="400" fill={BG} />
      <defs>
        <pattern id="subjectArtGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24,0 L0,0 0,24" fill="none" stroke={GRID} strokeWidth="0.6" />
        </pattern>
        <marker id="subjectArtForceArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={FORCE_COLOR} />
        </marker>
        <marker id="subjectArtRotArr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={ROT_COLOR} />
        </marker>
      </defs>
      <rect width="600" height="400" fill="url(#subjectArtGrid)" />

      {/* Líneas de eje (centerlines) */}
      <line x1="0" y1={cy} x2="600" y2={cy} stroke={LINE_DIM} strokeWidth="1" strokeDasharray="14,4,2,4" />
      <line x1={cx} y1="0" x2={cx} y2="400" stroke={LINE_DIM} strokeWidth="1" strokeDasharray="14,4,2,4" />

      {/* Álabes del rotor */}
      {bladeAngles.map(angle => (
        <path
          key={angle}
          d={`M ${bladeRootR},${-bladeHalfRoot} L ${bladeTipR},${-bladeHalfTip} L ${bladeTipR},${bladeHalfTip} L ${bladeRootR},${bladeHalfRoot} Z`}
          fill="rgba(142,202,230,0.14)"
          stroke={LINE}
          strokeWidth="1.3"
          transform={`translate(${cx} ${cy}) rotate(${angle})`}
        />
      ))}

      {/* Cubo (hub) con remaches */}
      <circle cx={cx} cy={cy} r={hubR} fill="#132a47" stroke={LINE} strokeWidth="2" />
      <circle cx={cx} cy={cy} r={hubR - 10} fill="none" stroke={LINE_DIM} strokeWidth="1" />
      {Array.from({ length: 6 }, (_, i) => {
        const [bx, by] = polar(cx, cy, i * 60, hubR - 5);
        return <circle key={i} cx={bx} cy={by} r="2.2" fill={LINE_DIM} />;
      })}

      {/* Vectores de fuerza (F) en dos álabes */}
      {forceAngles.map(angle => {
        const [x1, y1] = polar(cx, cy, angle, bladeTipR - 4);
        const [x2, y2] = polar(cx, cy, angle, bladeTipR + 46);
        const [lx, ly] = polar(cx, cy, angle, bladeTipR + 60);
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={FORCE_COLOR} strokeWidth="2.2" markerEnd="url(#subjectArtForceArr)" />
            <text x={lx} y={ly} fontSize="13" fontWeight="700" fill={FORCE_COLOR} textAnchor="middle">F</text>
          </g>
        );
      })}

      {/* Vector de rotación (ω) */}
      <path
        d={`M ${arcX1},${arcY1} A ${arcR},${arcR} 0 0 1 ${arcX2},${arcY2}`}
        fill="none" stroke={ROT_COLOR} strokeWidth="2.2" markerEnd="url(#subjectArtRotArr)"
      />
      <text x={omegaX} y={omegaY} fontSize="15" fontStyle="italic" fontWeight="700" fill={ROT_COLOR} textAnchor="middle">ω</text>

      {/* Cota de diámetro */}
      <line x1={cx - bladeTipR} y1={cy + 130} x2={cx + bladeTipR} y2={cy + 130} stroke={LINE_DIM} strokeWidth="1" />
      <line x1={cx - bladeTipR} y1={cy + 124} x2={cx - bladeTipR} y2={cy + 136} stroke={LINE_DIM} strokeWidth="1" />
      <line x1={cx + bladeTipR} y1={cy + 124} x2={cx + bladeTipR} y2={cy + 136} stroke={LINE_DIM} strokeWidth="1" />
      <text x={cx} y={cy + 148} fontSize="12" fill={LINE_DIM} textAnchor="middle">⌀ {bladeTipR * 2} mm</text>

      {/* Cuadro de título */}
      <g opacity="0.85">
        <rect x="418" y="328" width="164" height="54" fill="none" stroke={LINE_DIM} strokeWidth="1" />
        <line x1="418" y1="346" x2="582" y2="346" stroke={LINE_DIM} strokeWidth="1" />
        <text x="426" y="341" fontSize="10" fill={LINE}>ROTOR COMPRESOR</text>
        <text x="426" y="361" fontSize="9" fill={LINE_DIM}>ESC 1:5 · ÁLABES: {bladeCount}</text>
        <text x="426" y="374" fontSize="9" fill={LINE_DIM}>ANÁLISIS: F, ω</text>
      </g>
    </svg>
  );
}

export const SUBJECT_ART: Record<string, ComponentType> = {
  'Mecánica': SubjectArtMecanica,
};
