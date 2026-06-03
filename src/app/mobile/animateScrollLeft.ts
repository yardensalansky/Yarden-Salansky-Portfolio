/** Ease-out cubic — similar to desktop canvas camera moves */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Smoothly animates `element.scrollLeft` (mobile canvas pan).
 */
export function animateScrollLeft(
  element: HTMLElement,
  to: number,
  durationMs: number,
  signal?: AbortSignal
): Promise<void> {
  const from = element.scrollLeft;
  const delta = to - from;
  if (Math.abs(delta) < 1.5) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const onAbort = () => {
      cancelAnimationFrame(rafId);
      reject(new DOMException('aborted', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort);

    const t0 = performance.now();
    let rafId = 0;

    const frame = (now: number) => {
      if (signal?.aborted) return;
      const t = Math.min(1, (now - t0) / durationMs);
      element.scrollLeft = from + delta * easeOutCubic(t);
      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      }
    };

    rafId = requestAnimationFrame(frame);
  });
}
