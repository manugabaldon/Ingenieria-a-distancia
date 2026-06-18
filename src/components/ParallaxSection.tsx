/**
 * ParallaxBg — fondo parallax de imagen única.
 * Colócalo como PRIMER hijo del contenedor con overflow-y:auto/scroll.
 * El contenedor debe tener position:relative.
 *
 * Cómo funciona:
 *  - La imagen está position:absolute, top:-40%, height:180%
 *    (margen extra para que el parallax no deje ver bordes vacíos).
 *  - Al hacer scroll, translateY(scrollTop * speed) desplaza la imagen
 *    HACIA ABAJO a medida que el usuario baja, dando sensación de profundidad.
 */
import { useRef, useEffect } from 'react';
import './ParallaxSection.css';

interface Props {
  imageUrl: string;
  /** Opacidad del velo blanco: 0 = imagen pura, 1 = blanco total */
  overlay?: number;
  /** Velocidad parallax: 0.3 suave → 0.6 intenso */
  speed?: number;
}

export default function ParallaxBg({
  imageUrl,
  overlay = 0.78,
  speed   = 0.38,
}: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg        = bgRef.current;
    if (!bg) return;

    // El scroll container es el padre directo de ParallaxBg
    const container = bg.parentElement as HTMLElement;

    const tick = () => {
      bg.style.transform = `translateY(${container.scrollTop * speed}px)`;
    };

    container.addEventListener('scroll', tick, { passive: true });
    tick(); // posición inicial

    return () => container.removeEventListener('scroll', tick);
  }, [speed]);

  return (
    <>
      <div
        ref={bgRef}
        className="pb-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="pb-overlay" style={{ opacity: overlay }} />
    </>
  );
}
