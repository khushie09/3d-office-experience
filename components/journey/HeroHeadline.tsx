'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface HeroHeadlineProps {
  lines: string[];
  accent: string;
}

export function HeroHeadline({ lines, accent }: HeroHeadlineProps) {
  const root = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.hl-word', {
        yPercent: 110,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.09,
        delay: 0.25,
      });
      gsap.from('.hl-accent-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'expo.out',
        delay: 1.1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={root} className="text-[clamp(3.25rem,8.6vw,9rem)] font-medium leading-[0.94] tracking-[-0.045em]">
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <span key={li} className="block">
            {words.map((w, wi) => {
              const isAccent = w === accent;
              return (
                <span key={wi} className="inline-block overflow-hidden align-top">
                  <span className={`hl-word relative inline-block pb-[0.1em] ${isAccent ? 'text-brass' : ''}`}>
                    {w}
                    {isAccent && (
                      <span className="hl-accent-rule absolute inset-x-0 bottom-[0.03em] block h-[0.035em] bg-brass" />
                    )}
                  </span>
                  {wi < words.length - 1 && '\u00A0'}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
