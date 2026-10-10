import { Box, Cyl, M, Sph } from './primitives';

type V3 = [number, number, number];

/** Office desk, 2.4 × 1.1 m, facing -Z. The chair sits on the +Z side. */
export function Desk({ position, rotation = 0, lamp = true, accessories = true }: { position: V3; rotation?: number; lamp?: boolean; accessories?: boolean }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.74, 0]} s={[2.4, 0.05, 1.1]} m={M.oakLight} />
      <Box p={[-1.15, 0.37, 0]} s={[0.05, 0.72, 1.0]} m={M.metal} />
      <Box p={[0.85, 0.36, 0]} s={[0.5, 0.68, 1.0]} m={M.oakLight} />
      <Box p={[0, 1.12, -0.42]} s={[0.62, 0.36, 0.03]} m={M.screen} />
      <Box p={[0, 0.86, -0.42]} s={[0.06, 0.18, 0.06]} m={M.metal} />
      <Box p={[0, 0.78, -0.42]} s={[0.22, 0.02, 0.14]} m={M.metal} />
      <Box p={[0, 0.5, 0.85]} s={[0.55, 0.08, 0.55]} m={M.chair} />
      <Box p={[0, 0.9, 1.1]} s={[0.55, 0.7, 0.07]} m={M.chair} />
      {accessories && (
        <>
          <Box p={[0, 0.78, 0.12]} s={[0.42, 0.02, 0.14]} m={M.keyboard} />
          <Box p={[0.3, 0.78, 0.12]} s={[0.06, 0.02, 0.1]} m={M.keyboard} />
          <Cyl p={[0.6, 0.84, -0.25]} r={0.04} h={0.11} m={M.white} />
          <Box p={[0.6, 0.88, -0.25]} s={[0.09, 0.02, 0.09]} m={M.white} />
          <Box p={[-0.45, 0.76, 0.3]} s={[0.22, 0.02, 0.3]} m={M.teal} />
        </>
      )}
      {lamp && (
        <>
          <Cyl p={[-0.95, 0.77, -0.35]} r={0.08} h={0.02} m={M.metal} />
          <Box p={[-0.95, 1.0, -0.35]} s={[0.03, 0.46, 0.03]} m={M.metal} />
          <Box p={[-0.85, 1.22, -0.28]} s={[0.2, 0.08, 0.16]} m={M.warmLamp} />
        </>
      )}
    </group>
  );
}

/** Simplified desk for upper floors, seen through the glass. */
export function DeskSimple({ position, rotation = 0 }: { position: V3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.74, 0]} s={[2.4, 0.05, 1.1]} m={M.oakLight} />
      <Box p={[0, 0.37, 0.4]} s={[2.2, 0.72, 0.05]} m={M.metal} />
      <Box p={[0, 1.12, -0.42]} s={[0.62, 0.36, 0.03]} m={M.screen} />
      <Box p={[0, 0.5, 0.85]} s={[0.55, 0.08, 0.55]} m={M.chair} />
      <Box p={[0, 0.9, 1.1]} s={[0.55, 0.7, 0.07]} m={M.chair} />
    </group>
  );
}

/** Task chair, seat centre at origin, facing -Z (back on +Z). */
export function Chair({ position, rotation = 0, m = M.chair }: { position: V3; rotation?: number; m?: typeof M.chair }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.46, 0]} s={[0.5, 0.08, 0.5]} m={m} />
      <Box p={[0, 0.82, 0.24]} s={[0.5, 0.62, 0.06]} m={m} />
      <Cyl p={[0, 0.27, 0]} r={0.025} h={0.36} m={M.metal} />
      <Cyl p={[0, 0.07, 0]} r={0.26} h={0.04} m={M.metal} />
    </group>
  );
}

/** Sofa, facing +Z by default. Length along X. */
export function Sofa({ position, rotation = 0, length = 2.2, m = M.sofaA }: { position: V3; rotation?: number; length?: number; m?: typeof M.sofaA }) {
  const half = length / 2;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.2, 0]} s={[length, 0.4, 0.9]} m={m} />
      <Box p={[0, 0.6, -0.36]} s={[length, 0.48, 0.2]} m={m} />
      <Box p={[-half + 0.09, 0.5, 0]} s={[0.18, 0.3, 0.9]} m={m} />
      <Box p={[half - 0.09, 0.5, 0]} s={[0.18, 0.3, 0.9]} m={m} />
      <Box p={[-length / 4, 0.46, 0.06]} s={[length / 2 - 0.2, 0.1, 0.7]} m={M.cushion} />
      <Box p={[length / 4, 0.46, 0.06]} s={[length / 2 - 0.2, 0.1, 0.7]} m={M.cushion} />
    </group>
  );
}

export function Armchair({ position, rotation = 0 }: { position: V3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.2, 0]} s={[0.9, 0.4, 0.9]} m={M.sofaB} />
      <Box p={[0, 0.6, -0.36]} s={[0.9, 0.48, 0.2]} m={M.sofaB} />
      <Box p={[-0.42, 0.5, 0]} s={[0.1, 0.3, 0.9]} m={M.sofaB} />
      <Box p={[0.42, 0.5, 0]} s={[0.1, 0.3, 0.9]} m={M.sofaB} />
    </group>
  );
}

export function CoffeeTable({ position }: { position: V3 }) {
  return (
    <group position={position}>
      <Box p={[0, 0.4, 0]} s={[1.2, 0.05, 0.7]} m={M.oak} />
      <Box p={[-0.5, 0.2, -0.25]} s={[0.05, 0.4, 0.05]} m={M.darkWood} />
      <Box p={[0.5, 0.2, -0.25]} s={[0.05, 0.4, 0.05]} m={M.darkWood} />
      <Box p={[-0.5, 0.2, 0.25]} s={[0.05, 0.4, 0.05]} m={M.darkWood} />
      <Box p={[0.5, 0.2, 0.25]} s={[0.05, 0.4, 0.05]} m={M.darkWood} />
      <Box p={[0.1, 0.46, 0.05]} s={[0.3, 0.12, 0.22]} m={M.book1} />
    </group>
  );
}

/** Round table with four optional chairs at N, E, S, W. */
export function RoundTable({ position, chairs = [true, true, true, true], chairM = M.chair, tableM = M.oakLight, radius = 0.55 }: { position: V3; chairs?: boolean[]; chairM?: typeof M.chair; tableM?: typeof M.oakLight; radius?: number }) {
  const off = radius + 0.3;
  const spots: { p: V3; r: number }[] = [
    { p: [0, 0, -off], r: Math.PI },
    { p: [off, 0, 0], r: Math.PI / 2 },
    { p: [0, 0, off], r: 0 },
    { p: [-off, 0, 0], r: -Math.PI / 2 },
  ];
  return (
    <group position={position}>
      <Cyl p={[0, 0.74, 0]} r={radius} h={0.05} m={tableM} />
      <Cyl p={[0, 0.36, 0]} r={0.06} h={0.72} m={M.metal} />
      <Cyl p={[0, 0.02, 0]} r={0.3} h={0.04} m={M.metal} />
      {spots.map((s, i) => (chairs[i] ? <Chair key={i} position={s.p} rotation={s.r} m={chairM} /> : null))}
    </group>
  );
}

export function Bookshelf({ position, rotation = 0, width = 1.8 }: { position: V3; rotation?: number; width?: number }) {
  const shelves = [0.25, 0.8, 1.35, 1.9];
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 1.05, 0]} s={[width, 2.1, 0.04]} m={M.darkWood} />
      <Box p={[-width / 2 + 0.02, 1.05, 0.18]} s={[0.04, 2.1, 0.36]} m={M.darkWood} />
      <Box p={[width / 2 - 0.02, 1.05, 0.18]} s={[0.04, 2.1, 0.36]} m={M.darkWood} />
      {shelves.map((y) => (
        <group key={y}>
          <Box p={[0, y, 0.18]} s={[width, 0.03, 0.36]} m={M.darkWood} />
          <Box p={[-width * 0.3, y + 0.2, 0.2]} s={[0.1, 0.36, 0.2]} m={M.book1} />
          <Box p={[-width * 0.22, y + 0.2, 0.2]} s={[0.08, 0.32, 0.2]} m={M.book2} />
          <Box p={[-width * 0.14, y + 0.2, 0.2]} s={[0.12, 0.3, 0.2]} m={M.book3} />
          <Box p={[width * 0.12, y + 0.2, 0.2]} s={[0.09, 0.34, 0.2]} m={M.book4} />
          <Box p={[width * 0.22, y + 0.2, 0.2]} s={[0.1, 0.28, 0.2]} m={M.book1} />
        </group>
      ))}
    </group>
  );
}

export function FilingCabinet({ position, rotation = 0, width = 0.9 }: { position: V3; rotation?: number; width?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.7, 0]} s={[width, 1.4, 0.5]} m={M.metal} />
      <Box p={[0, 0.35, 0.26]} s={[width - 0.08, 0.02, 0.01]} m={M.frame} />
      <Box p={[0, 0.7, 0.26]} s={[width - 0.08, 0.02, 0.01]} m={M.frame} />
      <Box p={[0, 1.05, 0.26]} s={[width - 0.08, 0.02, 0.01]} m={M.frame} />
    </group>
  );
}

export function ConferenceTable({ position, length = 5, depth = 1.6 }: { position: V3; length?: number; depth?: number }) {
  return (
    <group position={position}>
      <Box p={[0, 0.75, 0]} s={[length, 0.06, depth]} m={M.oakLight} />
      <Box p={[-length / 2 + 0.2, 0.37, 0]} s={[0.1, 0.72, depth - 0.3]} m={M.metal} />
      <Box p={[length / 2 - 0.2, 0.37, 0]} s={[0.1, 0.72, depth - 0.3]} m={M.metal} />
    </group>
  );
}

/** Wall-mounted presentation display. Faces +Z. */
export function WallScreen({ position, width = 3.2, height = 1.6 }: { position: V3; width?: number; height?: number }) {
  return (
    <group position={position}>
      <Box p={[0, 0, 0]} s={[width + 0.12, height + 0.12, 0.05]} m={M.frame} />
      <Box p={[0, 0, 0.03]} s={[width, height, 0.03]} m={M.display} />
    </group>
  );
}

export function Plant({ position, scale = 1 }: { position: V3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Cyl p={[0, 0.2, 0]} r={0.27} h={0.4} m={M.pot} />
      <Sph p={[0, 0.85, 0]} r={0.5} m={M.leaf} />
      <Sph p={[0.2, 1.35, -0.1]} r={0.36} m={M.leafLight} />
      <Sph p={[-0.22, 1.2, 0.12]} r={0.3} m={M.leaf} />
    </group>
  );
}

export function PendantLamp({ position }: { position: V3 }) {
  const [x, y, z] = position;
  return (
    <group position={[x, y, z]}>
      <Box p={[0, 0.35, 0]} s={[0.01, 0.7, 0.01]} m={M.metal} />
      <Cyl p={[0, 0, 0]} r={0.18} h={0.14} m={M.chrome} />
      <Cyl p={[0, -0.07, 0]} r={0.16} h={0.02} m={M.lamp} />
    </group>
  );
}

export function CoffeeCounter({ position, length = 8.5 }: { position: V3; length?: number }) {
  return (
    <group position={position}>
      <Box p={[0, 0.5, 0]} s={[0.9, 1.0, length]} m={M.dark} />
      <Box p={[0, 1.02, 0]} s={[1.0, 0.05, length + 0.1]} m={M.oakLight} />
    </group>
  );
}

/** Bench for outdoor areas. Faces +Z. */
export function Bench({ position, rotation = 0 }: { position: V3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.45, 0]} s={[1.6, 0.08, 0.45]} m={M.darkWood} />
      <Box p={[0, 0.75, -0.22]} s={[1.6, 0.45, 0.06]} m={M.darkWood} />
      <Box p={[-0.65, 0.22, 0]} s={[0.08, 0.44, 0.4]} m={M.metal} />
      <Box p={[0.65, 0.22, 0]} s={[0.08, 0.44, 0.4]} m={M.metal} />
    </group>
  );
}
