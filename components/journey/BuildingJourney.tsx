'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { journey, SCENES, SCENE_COUNT } from '@/lib/journey';
import { hasWebGL, prefersReducedMotion } from '@/lib/motion';
import { scrollToY } from '@/lib/scroll';
import { HeroHeadline } from './HeroHeadline';

const Scene3D = dynamic(() => import('./Scene3D').then((m) => m.Scene3D), { ssr: false });

/** Scroll position at which a given scene is fully framed. */
function sceneScrollY(section: HTMLElement, index: number): number {
  const top = section.getBoundingClientRect().top + window.scrollY;
  const range = section.offsetHeight - window.innerHeight;
  return top + (range * index) / (SCENE_COUNT - 1);
}

type Support = 'pending' | 'webgl' | 'static';

export function BuildingJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [support, setSupport] = useState<Support>('pending');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSupport(hasWebGL() ? 'webgl' : 'static');
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: prefersReducedMotion() ? true : 0.6,
        onUpdate: (self) => {
          journey.progress = self.progress;
          setActive(Math.round(self.progress * (SCENE_COUNT - 1)));
          if (heroRef.current) {
            const fade = Math.min(1, self.progress * 14);
            gsap.set(heroRef.current, { autoAlpha: 1 - fade, y: -fade * 48 });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Deep links such as /#scene-3 jump to that point in the building.
  useEffect(() => {
    const match = window.location.hash.match(/^#scene-(\d)$/);
    const section = sectionRef.current;
    if (!match || !section) return;
    const index = Math.min(SCENE_COUNT - 1, Number(match[1]));
    const id = window.setTimeout(() => window.scrollTo({ top: sceneScrollY(section, index) }), 80);
    return () => window.clearTimeout(id);
  }, []);

  const goToScene = (index: number) => {
    const section = sectionRef.current;
    if (section) scrollToY(sceneScrollY(section, index));
  };

  const loaded = support === 'static' || ready;

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-label="Building journey"
      className="relative h-[880vh] bg-paper"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0">
          {support === 'webgl' && <Scene3D onReady={() => setReady(true)} />}
          {support === 'static' && (
            <div className="grid h-full place-items-center px-6 text-center text-sm text-graphite">
              The 3D building needs WebGL, which this device does not provide. The scene text and the index on the right
              still describe each room.
            </div>
          )}
        </div>

        {!loaded && (
          <div className="absolute inset-0 grid place-items-center bg-paper">
            <span className="eyebrow">Preparing the building</span>
          </div>
        )}

        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-x-6 bottom-14 z-10 md:inset-x-12 md:bottom-20"
        >
          <p className="eyebrow mb-8">Corporate architecture · Prototype building</p>
          <HeroHeadline lines={['Architecture', 'that moves', 'you forward.']} accent="moves" />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-[15px] leading-relaxed text-graphite">
              A glass office designed around daylight, long sightlines and rooms that change character as you move
              through them.
            </p>
            <p className="eyebrow">Scroll to enter the building</p>
          </div>
        </div>

        <nav
          aria-label="Building scenes"
          className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:right-12 md:flex"
        >
          {SCENES.map((scene, i) => (
            <button
              key={scene.label}
              type="button"
              onClick={() => goToScene(i)}
              aria-label={`Go to ${scene.label}`}
              aria-current={active === i ? 'step' : undefined}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`font-mono text-[11px] transition-colors duration-500 ${
                  active === i ? 'text-ink' : 'text-graphite/60 group-hover:text-graphite'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`block h-px transition-all duration-700 ${active === i ? 'w-10 bg-ink' : 'w-4 bg-ink/30'}`}
              />
            </button>
          ))}
        </nav>

        {SCENES.map((scene, i) =>
          i === 0 ? null : (
            <div
              key={scene.label}
              aria-hidden={active !== i}
              className={`absolute bottom-12 left-6 right-6 z-10 transition-[opacity,transform] duration-[900ms] ease-out-expo md:bottom-20 md:left-12 md:right-auto md:w-[min(36rem,42vw)] ${
                active === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
              }`}
            >
              <p className="eyebrow">
                {String(i + 1).padStart(2, '0')} / {String(SCENE_COUNT).padStart(2, '0')} · {scene.label}
              </p>
              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.03em]">
                {scene.title}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-graphite">{scene.body}</p>
              {i === SCENE_COUNT - 1 && (
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link href="/about#contact" className="btn-primary">
                    Book a visit <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/spaces" className="btn-ghost">
                    Explore the spaces
                  </Link>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
