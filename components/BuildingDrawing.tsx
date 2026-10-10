/* Schematic axonometric of the prototype building. Proportions follow the 3D model. Not to scale. */

const L = 60;
const D = 30;
const H = 24;
const S = 5;
const C = Math.cos(Math.PI / 6);
const OX = 380;
const OY = 110;

type Pt = [number, number];

function P(x: number, y: number, z: number): Pt {
  return [(x - z) * C * S + OX, (x + z) * 0.5 * S - y * S + OY];
}

function pts(list: Pt[]): string {
  return list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');
}

function seg(a: Pt, b: Pt) {
  return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
}

export function BuildingDrawing() {
  const mullionsFront = Array.from({ length: 25 }, (_, i) => (i * L) / 24);
  const mullionsSide = Array.from({ length: 13 }, (_, i) => (i * D) / 12);
  const floors = [0, H / 3, (2 * H) / 3, H];

  return (
    <svg viewBox="0 0 760 460" className="h-auto w-full" role="img" aria-label="Schematic axonometric of the glass office building">
      <polygon points={pts([P(-10, 0, -10), P(L + 10, 0, -10), P(L + 10, 0, D + 10), P(-10, 0, D + 10)])} fill="#e4e0d7" />
      <polygon points={pts([P(0, 0, D), P(L, 0, D), P(L, H, D), P(0, H, D)])} fill="#d9e1e3" />
      <polygon points={pts([P(L, 0, 0), P(L, 0, D), P(L, H, D), P(L, H, 0)])} fill="#c7d1d4" />
      <polygon points={pts([P(24, 0, D), P(30, 0, D), P(30, 8, D), P(24, 8, D)])} fill="#2b2f33" opacity="0.75" />

      {mullionsFront.map((x) => (
        <line key={`mf${x}`} {...seg(P(x, 0, D), P(x, H, D))} stroke="#2b2f33" strokeWidth="0.6" />
      ))}
      {mullionsSide.map((z) => (
        <line key={`ms${z}`} {...seg(P(L, 0, z), P(L, H, z))} stroke="#2b2f33" strokeWidth="0.6" />
      ))}
      {floors.map((y) => (
        <g key={`fl${y}`}>
          <line {...seg(P(0, y, D), P(L, y, D))} stroke="#2b2f33" strokeWidth="1.4" />
          <line {...seg(P(L, y, 0), P(L, y, D))} stroke="#2b2f33" strokeWidth="1.4" />
        </g>
      ))}
      <polygon points={pts([P(0, H, D), P(L, H, D), P(L, H, 0), P(0, H, 0)])} fill="none" stroke="#2b2f33" strokeWidth="1.4" />
    </svg>
  );
}
