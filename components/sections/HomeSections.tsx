import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Parallax } from '@/components/Parallax';
import { SpacePlan } from '@/components/SpacePlan';
import { BuildingDrawing } from '@/components/BuildingDrawing';
import { AMENITIES } from '@/lib/content';

function Heading({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <p className="eyebrow">{label}</p>
      <h2 className="mt-6 text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.04em]">{children}</h2>
    </>
  );
}

export function WorkspaceShowcase() {
  const points = [
    'Desks aligned to the façade grid, so every seat has a view of the glass.',
    'Daylight decides the desk layout. Partitions stay low where they can.',
    'Monitor and standing-desk specification [to be confirmed].',
  ];
  return (
    <section className="border-t border-ink/15 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Heading label="Workspace">
            Open rows, <span className="text-brass">occupied</span> by people who need to focus.
          </Heading>
          <p className="mt-8 max-w-md leading-relaxed text-graphite">
            The main floor keeps long lines of sight, with desks grouped in rows and pendant lights over the aisles. Storage
            sits against the solid walls, so the glass stays clear.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
          <div className="bg-stone p-8 md:p-12">
            <SpacePlan plan="open" />
          </div>
          <ul className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
            {points.map((p) => (
              <li key={p} className="py-5 text-[15px] leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function CollaborationSection() {
  const rooms = [
    { plan: 'meeting' as const, title: 'Meeting rooms', body: 'Glass-walled rooms for small teams, with a display on the solid wall and a table for six.' },
    { plan: 'conference' as const, title: 'Conference room', body: 'A larger room for reviews and presentations, with seats for ten around a long table.' },
    { plan: 'lounge' as const, title: 'Lounge', body: 'Sofas, timber and warm light for informal talks, away from the desks.' },
  ];
  return (
    <section className="border-t border-ink/15 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="max-w-3xl">
          <Heading label="Collaboration">
            Rooms for <span className="text-brass">focus</span>, rooms for discussion.
          </Heading>
        </Reveal>
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {rooms.map((room, i) => (
            <Reveal key={room.title} delay={i * 0.1}>
              <div className="bg-stone p-6">
                <SpacePlan plan={room.plan} />
              </div>
              <h3 className="mt-7 text-2xl font-medium tracking-[-0.02em]">{room.title}</h3>
              <p className="mt-3 leading-relaxed text-graphite">{room.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AmenitiesSection() {
  return (
    <section className="border-t border-ink/15 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Heading label="Amenities">
            Everyday <span className="text-brass">places</span> to pause.
          </Heading>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-7 md:col-start-6">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {AMENITIES.map((item, i) => (
              <li key={item} className="flex items-baseline gap-5 border-t border-ink/10 py-6 text-[15px]">
                <span className="font-mono text-xs text-graphite">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-md leading-relaxed text-graphite">
            The café sits on the corridor between the offices and the meeting rooms. The lounge is at the far end of the plan,
            so the walk to it is part of the day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  const notes = [
    { t: 'Proportion', b: 'A regular steel mullion grid sets the rhythm of the façade and of the rooms behind it.' },
    { t: 'Structure', b: 'Ceiling beams run across the plan under each floor slab, so the structure is visible inside.' },
    { t: 'Material', b: 'Oak, lacquer, wool and steel, used in small amounts so that the glass stays the main material.' },
  ];
  return (
    <section className="border-t border-ink/15 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Heading label="Architecture">
            A building you can <span className="text-brass">read</span> from the street.
          </Heading>
          <div className="mt-12 space-y-8">
            {notes.map((n) => (
              <div key={n.t} className="border-t border-ink/10 pt-6">
                <h3 className="text-lg font-medium">{n.t}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{n.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <Parallax className="bg-stone p-6 md:p-12">
            <BuildingDrawing />
          </Parallax>
          <p className="mt-4 font-mono text-xs text-graphite">Schematic axonometric. Not to scale.</p>
        </div>
      </div>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="border-t border-ink/15 px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="eyebrow">Closing</p>
          <p className="mt-10 max-w-5xl text-[clamp(2rem,4.6vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            The garden, the lobby, the desks and the lounge form one continuous sequence. It was designed to be{' '}
            <span className="text-brass">walked through</span>.
          </p>
          <div className="mt-14 flex flex-wrap gap-8">
            <Link href="/spaces" className="btn-ghost">
              Explore the spaces <ArrowUpRight size={14} />
            </Link>
            <Link href="/about" className="btn-ghost">
              Read about the building <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
