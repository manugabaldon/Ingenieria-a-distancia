export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  color: string,
  label?: string,
  lineWidth = 2
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return;

  const angle = Math.atan2(dy, dx);
  const headLen = Math.min(14, len * 0.35);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - 0.4), y2 - headLen * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - headLen * Math.cos(angle + 0.4), y2 - headLen * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const offset = 14;
    const nx = -Math.sin(angle);
    const ny = Math.cos(angle);
    ctx.fillText(label, x2 + nx * offset, y2 + ny * offset);
  }

  ctx.restore();
}

export function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, ox: number, oy: number, scale: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
  ctx.lineWidth = 1;

  const step = scale;
  for (let x = ox % step; x < w; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = oy % step; y < h; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();

  // Labels
  ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('x', w - 12, oy - 8);
  ctx.textAlign = 'right';
  ctx.fillText('y', ox - 8, 12);

  ctx.restore();
}

export function toCanvas(x: number, y: number, ox: number, oy: number, scale: number) {
  return { cx: ox + x * scale, cy: oy - y * scale };
}
