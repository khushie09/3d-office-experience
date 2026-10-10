import { BuildingDrawing } from '@/components/BuildingDrawing';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';
import { AMENITIES } from '@/lib/content';
import { ABOUT_FIGURES } from '@/lib/copy';

export const metadata = {
  title: 'About — Northline',
  description: 'Design philosophy, building highlights, amenities, figures and contact for the prototype office building.',
};

const PHILOSOPHY = [
  {
    title: 'Proportion first',
    body: 'The envelope is set on a regular steel mullion grid. Every room is measured against that grid, so the façade and the interior read as one composition.',
  },
  {
    title: 'Daylight as a material',
    body: 'Floors open to the glass on both long sides. Partitions stay low or transparent so that light reaches the middle of the plan.',
  },
  {
    title: 'Movement through rooms',
    body: 'The plan moves from public to private: a lobby on the axis, a long workspace, enclosed meeting rooms and a quieter lounge at the far end.',
  },
];

const HIGHLIGHTS = [
  'Glass envelope across three levels',
  'Entrance canopy and recessed glass doors',
  'Transparent meeting rooms with dark steel frames',
  'Lounge in timber and wool at the rear of the plan',
];

export default function AboutPage() {
  return (
    <main>
      <section className="px-6 pb-20 pt-44 md:px-12 md:pt-56">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-10">
            <p className="eyebrow">About</p>
            <h1 className="mt-8 text-[clamp(3rem,7.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
              A building made from <span className="text-brass">light, distance</span> and proportion.
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-7">
            <p className="text-lg leading-relaxed text-graphite">
              Northline is a placeholder studio name for this prototype. The building is a glass office designed around
              daylight, measured views and a clear sequence from arrival to work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Parallax className="bg-stone p-6 md:p-16">
            <BuildingDrawing />
          </Parallax>
          <p className="mt-4 font-mono text-xs text-graphite">
            Schematic axonometric. Proportions follow the 3D prototype. Not to scale.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Design philosophy</p>
            <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">
              Three decisions that shape every room.
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            {PHILOSOPHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
                <span className="font-mono text-xs text-graphite">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-graphite">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Building highlights</p>
            <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">What the prototype includes.</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <ul className="divide-y divide-ink/10 border-t border-ink/10">
              {HIGHLIGHTS.map((item, i) => (
                <li key={item} className="flex items-baseline gap-6 py-6 text-xl tracking-[-0.01em]">
                  <span className="font-mono text-xs text-graphite">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Office amenities</p>
            <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">Shared facilities.</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {AMENITIES.map((item) => (
                <li key={item} className="border-t border-ink/10 py-5 text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Sustainability</p>
            <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-5xl">Placeholder section.</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <p className="leading-relaxed text-graphite">
              No certifications, energy figures or environmental performance claims are made for this prototype. The design
              team will confirm which strategies apply. Candidates under review:
            </p>
            <ul className="mt-6 space-y-3 text-[15px]">
              <li>[Daylight simulation: to be confirmed]</li>
              <li>[Solar shading strategy for the glazed façade: to be confirmed]</li>
              <li>[Energy target and metering approach: to be confirmed]</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow">Facts and figures</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
            {ABOUT_FIGURES.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.08}>
                <p className="text-[clamp(3rem,6vw,6rem)] font-medium leading-none tracking-[-0.05em]">{fact.value}</p>
                <p className="mt-5 text-[15px]">{fact.label}</p>
                <p className="mt-2 font-mono text-[11px] leading-snug text-graphite">{fact.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-ink/15 px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-6xl">
              Visits, press and partnership enquiries.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="grid gap-10 md:col-span-6 md:col-start-7">
            <div>
              <p className="eyebrow mb-3">Address</p>
              <p className="text-lg">[Street address, city, postcode — to be confirmed]</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Email</p>
              <p className="text-lg">[hello@example.com — placeholder]</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Telephone</p>
              <p className="text-lg">[+00 000 000 000 — placeholder]</p>
            </div>
            <p className="text-sm leading-relaxed text-graphite">
              Guided visits are arranged in advance with the design team. Replace the placeholders above with confirmed
              details before publishing.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
