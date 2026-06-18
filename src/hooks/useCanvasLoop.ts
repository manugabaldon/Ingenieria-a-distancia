import { useEffect, useRef, MutableRefObject } from 'react';

/**
 * Robust canvas animation loop.
 * - Single rAF loop that runs forever (never restarts mid-animation).
 * - drawFn is stored in a ref → always uses the latest version without
 *   restarting the loop when params change.
 * - Never calls React setState during the loop → no re-render interference.
 * - tRef is shared with the caller so they can read current time.
 * - onTick (optional) is called each frame for non-React display updates
 *   (e.g. update a DOM span directly).
 */
export function useCanvasLoop(
  drawFn: (t: number) => void,
  running: boolean,
  tRef: MutableRefObject<number>,
  onTick?: (t: number) => void,
  maxTime?: number
) {
  const drawRef  = useRef(drawFn);
  const tickRef  = useRef(onTick);
  const maxRef   = useRef(maxTime);
  const runRef   = useRef(running);
  const startRef = useRef(0);

  // Keep refs current on every render — no loop restart needed
  drawRef.current = drawFn;
  tickRef.current = onTick;
  maxRef.current  = maxTime;

  // Sync running → startRef when play/pause toggles
  useEffect(() => {
    runRef.current = running;
    if (running) {
      // Resume from where we left off
      startRef.current = performance.now() - tRef.current * 1000;
    }
  }, [running, tRef]);

  // Single perpetual loop — empty deps, mounts once
  useEffect(() => {
    let id: number;
    const loop = (now: number) => {
      if (runRef.current) {
        let t = (now - startRef.current) / 1000;
        if (maxRef.current !== undefined && t >= maxRef.current) {
          t = maxRef.current;
          runRef.current = false;         // auto-stop
        }
        tRef.current = t;
        drawRef.current(t);
        tickRef.current?.(t);
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
