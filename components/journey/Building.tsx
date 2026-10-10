import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Box, M } from './primitives';
import { DeskSimple } from './Furniture';

export const W = 22;
export const H = 12;
export const D = 52;

const frontX = Array.from({ length: 15 }, (_, i) => -W / 2 + (i * W) / 14).filter((x) => Math.abs(x) > 2.4);
const sideZ = Array.from({ length: 21 }, (_, i) => -(i * D) / 20);
const UPPER_DESKS: [number, number][] = [
  [-6, -16],
  [-2, -16],
  [2, -16],
  [6, -16],
  [-6, -30],
  [-2, -30],
  [2, -30],
  [6, -30],
];

function makeReflectionTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const g = canvas.getContext('2d');
  if (!g) return new THREE.Texture();
  g.clearRect(0, 0, 256, 512);
  const bands: [number, number, number][] = [
    [30, 28, 0.2],
    [92, 22, 0.07],
    [150, 40, 0.14],
    [220, 16, 0.05],
  ];
  for (const [x, w, a] of bands) {
    g.fillStyle = `rgba(255,255,255,${a})`;
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x + w, 0);
    g.lineTo(x + w - 120, 512);
    g.lineTo(x - 120, 512);
    g.closePath();
    g.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** The glass envelope, structure, roof and entrance. Interior fit-out lives in Interior.tsx. */
export function Building({ lite = false }: { lite?: boolean }) {
  const reflection = useMemo(() => makeReflectionTexture(), []);
  useEffect(() => () => reflection.dispose(), [reflection]);

  const upper = lite ? UPPER_DESKS.slice(0, 4) : UPPER_DESKS;

  return (
    <group>
      {/* Mullion grid, front and back */}
      {frontX.map((x) => (
        <Box key={`f${x}`} p={[x, H / 2, 0]} s={[0.1, H, 0.14]} m={M.frame} cast />
      ))}
      {frontX.map((x) => (
        <Box key={`b${x}`} p={[x, H / 2, -D]} s={[0.1, H, 0.14]} m={M.frame} cast />
      ))}
      {/* Mullion grid, sides */}
      {sideZ.map((z) => (
        <Box key={`l${z}`} p={[-W / 2, H / 2, z]} s={[0.14, H, 0.1]} m={M.frame} cast />
      ))}
      {sideZ.map((z) => (
        <Box key={`r${z}`} p={[W / 2, H / 2, z]} s={[0.14, H, 0.1]} m={M.frame} cast />
      ))}

      {/* Transoms at each floor line */}
      {[4, 8, H].map((y) => (
        <group key={`t${y}`}>
          <Box p={[0, y, 0]} s={[W, 0.14, 0.16]} m={M.frame} cast />
          <Box p={[0, y, -D]} s={[W, 0.14, 0.16]} m={M.frame} cast />
          <Box p={[-W / 2, y, -D / 2]} s={[0.16, 0.14, D]} m={M.frame} cast />
          <Box p={[W / 2, y, -D / 2]} s={[0.16, 0.14, D]} m={M.frame} cast />
        </group>
      ))}

      {/* Floor slabs and roof */}
      <Box p={[0, 4, -D / 2]} s={[W + 0.5, 0.4, D + 0.5]} m={M.slab} cast />
      <Box p={[0, 8, -D / 2]} s={[W + 0.5, 0.4, D + 0.5]} m={M.slab} cast />
      <Box p={[0, H + 0.3, -D / 2]} s={[W + 0.8, 0.6, D + 0.8]} m={M.slab} cast />

      {/* Glass envelope */}
      <mesh position={[0, H / 2, 0]} material={M.glass}>
        <planeGeometry args={[W, H]} />
      </mesh>
      <mesh position={[0, H / 2, -D]} rotation={[0, Math.PI, 0]} material={M.glass}>
        <planeGeometry args={[W, H]} />
      </mesh>
      <mesh position={[W / 2, H / 2, -D / 2]} rotation={[0, Math.PI / 2, 0]} material={M.glass}>
        <planeGeometry args={[D, H]} />
      </mesh>
      <mesh position={[-W / 2, H / 2, -D / 2]} rotation={[0, -Math.PI / 2, 0]} material={M.glass}>
        <planeGeometry args={[D, H]} />
      </mesh>

      {/* Sky reflection on the front and back façades */}
      <mesh position={[0, H / 2, 0.06]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={reflection} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh position={[0, H / 2, -D - 0.06]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={reflection} transparent opacity={0.6} depthWrite={false} />
      </mesh>

      {/* Stone service volume projecting from the east façade, for articulation */}
      <Box p={[12.1, 6, -18]} s={[2.2, 12, 12]} m={M.stone} cast />
      <Box p={[12.1, 12.3, -18]} s={[2.4, 0.4, 12.2]} m={M.slab} cast />

      {/* Ground-floor interior floor */}
      <Box p={[0, 0.01, -D / 2]} s={[W, 0.02, D]} m={M.oak} />

      {/* Entrance: frame, glass leaves and steel canopy */}
      <Box p={[-2.3, 1.6, 0.05]} s={[0.12, 3.2, 0.16]} m={M.frame} cast />
      <Box p={[2.3, 1.6, 0.05]} s={[0.12, 3.2, 0.16]} m={M.frame} cast />
      <Box p={[0, 3.2, 0.05]} s={[4.6, 0.12, 0.16]} m={M.frame} />
      <Box p={[-1.15, 1.6, 0.03]} s={[2.2, 3.2, 0.03]} m={M.glass} />
      <Box p={[1.15, 1.6, 0.03]} s={[2.2, 3.2, 0.03]} m={M.glass} />
      <Box p={[0, 3.8, 2]} s={[7.2, 0.4, 4.4]} m={M.frame} cast />

      {/* Upper-floor workstations, visible through the glass */}
      {[4.2, 8.2].flatMap((y) => upper.map(([x, z]) => <DeskSimple key={`u${y}-${x}-${z}`} position={[x, y, z]} />))}
    </group>
  );
}
