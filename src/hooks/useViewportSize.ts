import { useEffect, useState } from 'react';

export interface ViewportSize {
  width: number;
  height: number;
}

const defaultSize: ViewportSize = {
  width: typeof window !== 'undefined' ? window.innerWidth : 1440,
  height: typeof window !== 'undefined' ? window.innerHeight : 900,
};

/**
 * Live window dimensions for responsive canvas / panel scaling.
 */
export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(defaultSize);

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}
