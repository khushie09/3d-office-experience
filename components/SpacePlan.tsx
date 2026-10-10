import type { ReactNode } from 'react';
import type { PlanVariant } from '@/lib/content';

const rect = (x: number, y: number, w: number, h: number, rx = 0, dash = false) => (
  <rect key={`r${x}-${y}-${w}-${h}`} x={x} y={y} width={w} height={h} rx={rx} strokeDasharray={dash ? '4 6' : undefined} />
);
const dot = (x: number, y: number, r: number) => <circle key={`c${x}-${y}-${r}`} cx={x} cy={y} r={r} />;
const line = (x1: number, y1: number, x2: number, y2: number, dash = false) => (
  <line key={`l${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash ? '3 5' : undefined} />
);

const PLANS: Record<PlanVariant, ReactNode[]> = {
  lobby: [
    line(240, 20, 240, 300, true),
    rect(160, 196, 150, 30),
    rect(40, 80, 80, 28),
    rect(40, 200, 80, 28),
    rect(360, 80, 80, 28),
    rect(360, 200, 80, 28),
    dot(400, 260, 14),
    dot(80, 262, 14),
    rect(200, 292, 80, 8),
  ],
  open: [0, 1, 2].flatMap((r) =>
    [0, 1, 2, 3, 4, 5].flatMap((c) => [
      rect(44 + c * 70, 60 + r * 82, 46, 22),
      rect(54 + c * 70, 88 + r * 82, 26, 12, 6),
    ])
  ),
  private: [
    line(240, 20, 240, 300),
    line(20, 160, 460, 160),
    rect(44, 44, 80, 40),
    rect(56, 110, 50, 14, 4),
    rect(264, 44, 80, 40),
    rect(276, 110, 50, 14, 4),
    rect(44, 190, 80, 40),
    rect(56, 240, 50, 14, 4),
    rect(264, 190, 80, 40),
    rect(276, 240, 50, 14, 4),
    dot(160, 160, 4),
    dot(340, 160, 4),
  ],
  meeting: [
    rect(40, 40, 400, 240, 0, true),
    rect(120, 110, 240, 100, 14),
    ...[0, 1, 2, 3, 4, 5].flatMap((i) => [rect(128 + i * 36, 84, 22, 14, 4), rect(128 + i * 36, 212, 22, 14, 4)]),
  ],
  conference: [
    rect(40, 40, 400, 240),
    rect(180, 52, 120, 8),
    rect(100, 120, 280, 80, 10),
    ...[0, 1, 2, 3, 4].flatMap((i) => [rect(116 + i * 50, 100, 22, 14, 4), rect(116 + i * 50, 206, 22, 14, 4)]),
  ],
  lounge: [
    rect(150, 110, 240, 160, 0, true),
    rect(60, 230, 160, 46, 6),
    rect(60, 90, 46, 120, 6),
    dot(230, 190, 26),
    dot(420, 110, 16),
    line(150, 270, 390, 270, true),
  ],
  amenity: [
    rect(60, 50, 220, 30, 2),
    ...[0, 1, 2, 3].map((i) => dot(90 + i * 60, 110, 9)),
    dot(110, 190, 24),
    dot(220, 190, 24),
    dot(330, 190, 24),
    rect(330, 40, 110, 90),
    rect(60, 262, 380, 20, 0, true),
  ],
};

export function SpacePlan({ plan }: { plan: PlanVariant }) {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={`Schematic plan: ${plan}`}
      className="h-auto w-full text-graphite transition-colors duration-700 group-hover:text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    >
      <rect x="20" y="20" width="440" height="280" />
      {PLANS[plan]}
    </svg>
  );
}
