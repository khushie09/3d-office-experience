'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

/** Re-mounts on every route change, giving pages a refined fade-in transition. */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', clearProps: 'transform,opacity' },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
