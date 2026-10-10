'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-brass"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
