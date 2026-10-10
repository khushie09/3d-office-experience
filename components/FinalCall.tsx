import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

export function FinalCall() {
  return (
    <section className="border-t border-ink/15 px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="eyebrow">Visit</p>
          <h2 className="mt-6 text-[clamp(2.6rem,6vw,6.25rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            Walk the building <span className="text-brass">in person.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="self-end md:col-span-3 md:col-start-10">
          <p className="leading-relaxed text-graphite">
            Visits are arranged with the design team. A guided walk covers the lobby, the open workspace and the
            meeting rooms.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/about#contact" className="btn-primary">
              Book a visit <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
