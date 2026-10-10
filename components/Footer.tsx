import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-paper">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 py-16 md:grid-cols-12 md:px-12 md:py-24">
        <div className="md:col-span-5">
          <p className="text-sm font-medium tracking-[0.3em]">NORTHLINE</p>
          <p className="mt-6 max-w-sm text-2xl leading-snug tracking-[-0.02em]">
            Architecture that moves you forward.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-2">Explore</p>
          <Link href="/" className="nav-link w-fit">Home</Link>
          <Link href="/spaces" className="nav-link w-fit">Spaces</Link>
          <Link href="/about" className="nav-link w-fit">About</Link>
          <Link href="/about#contact" className="nav-link w-fit">Contact</Link>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-graphite md:col-span-3">
          <p className="eyebrow mb-2">Contact</p>
          <p>[Street address, city — to be confirmed]</p>
          <p>[hello@example.com — placeholder]</p>
          <p>[+00 000 000 000 — placeholder]</p>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-6 text-xs text-graphite md:flex-row md:justify-between md:px-12">
          <span>© 2026 Northline. Placeholder brand name.</span>
          <span className="font-mono">Prototype building · dimensions in metres</span>
        </div>
      </div>
    </footer>
  );
}
