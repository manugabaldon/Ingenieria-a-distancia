/** "Cinemática del punto" → "cinematica-del-punto" (para las rutas #estudia/...) */
const ACCENTS: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n',
  Á: 'a', É: 'e', Í: 'i', Ó: 'o', Ú: 'u', Ü: 'u', Ñ: 'n',
};

export function slugify(s: string): string {
  return s
    .split('').map(ch => ACCENTS[ch] ?? ch).join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}
