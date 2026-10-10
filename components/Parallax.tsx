'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in percent of the inner element. Keep below 4 so edges stay covered. */
  amount?: number;
}

export function Parallax({ children, className = '', amount = 3 }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        i,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: o, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, o);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={outer} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="scale-[1.08] will-change-transform">
        {children}
      </div>
    </div>
  );
}
