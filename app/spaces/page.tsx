import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SPACES, type Space } from '@/lib/content';
import { SpacePlan } from '@/components/SpacePlan';
import { Reveal } from '@/components/Reveal';
import { FinalCall } from '@/components/FinalCall';

export const metadata = {
  title: 'Spaces — Northline',
  description: 'Reception, workspace, meeting rooms, lounge and amenities of the prototype building.',
};

export default function SpacesPage() {
  return (
    <main>
      <section className="px-6 pb-24 pt-44 md:px-12 md:pb-36 md:pt-56">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow">Spaces · 07 rooms</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
              Seven rooms, <span className="text-brass">one envelope.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-md leading-relaxed text-graphite">
              Every room is set on the same structural grid. The plans are schematic. Each room links back to its place
              in the building journey.
            </p>
          </Reveal>
        </div>
      </section>

      {SPACES.map((space, index) => (
        <SpaceRow key={space.id} space={space} index={index} />
      ))}

      <FinalCall />
    </main>
  );
}

function SpaceRow({ space, index }: { space: Space; index: number }) {
  const flip = index % 2 === 1;

  return (
    <section className="group border-t border-ink/15 px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-x-10">
        <div className={`md:row-start-1 ${flip ? 'md:col-span-7 md:col-start-6' : 'md:col-span-7 md:col-start-1'}`}>
          <Reveal>
            <div className="bg-stone p-6 md:p-12">
              <div className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.015]">
                <SpacePlan plan={space.plan} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.12}
          className={`md:row-start-1 md:self-end ${flip ? 'md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}`}
        >
          <p className="font-mono text-xs text-graphite">
            {String(index + 1).padStart(2, '0')} — {space.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.035em] md:text-5xl">{space.title}</h2>
          <p className="mt-6 leading-relaxed text-graphite">{space.body}</p>
          <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10 text-sm">
            {space.features.map((feature) => (
              <li key={feature} className="py-3">
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between gap-6 text-sm">
            <span className="font-mono text-xs text-graphite">Area [to be confirmed]</span>
            <Link
              href={`/#scene-${space.scene}`}
              className="inline-flex items-center gap-2 border-b border-ink pb-1 transition-colors duration-500 hover:border-brass hover:text-brass"
            >
              View in building <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
