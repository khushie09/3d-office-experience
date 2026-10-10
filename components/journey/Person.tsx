import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Box, Sph } from './primitives';

export type Pose = 'stand' | 'walk' | 'talk' | 'sit' | 'type' | 'relax';
export type Pt = [number, number];

interface PersonProps {
  position?: [number, number, number];
  rotation?: number;
  pose?: Pose;
  palette?: number;
  /** World-space XZ waypoints. The person walks back and forth along them. */
  path?: Pt[];
  speed?: number;
  phase?: number;
  cast?: boolean;
}

interface Palette {
  shirt: string;
  pants: string;
  skin: string;
  hair: string;
}

export const PALETTES: Palette[] = [
  { shirt: '#3d4a57', pants: '#2a2d33', skin: '#c48a64', hair: '#2b1d14' },
  { shirt: '#e8e4dc', pants: '#5b5147', skin: '#8d5b3d', hair: '#101010' },
  { shirt: '#8a3b2e', pants: '#1f2a36', skin: '#e1b08c', hair: '#6b4a2c' },
  { shirt: '#6f7f5f', pants: '#3a3a3a', skin: '#f0c8a0', hair: '#3b2a20' },
  { shirt: '#2f4f5f', pants: '#d7d1c4', skin: '#a06a48', hair: '#1a1a1a' },
  { shirt: '#b9a48a', pants: '#33302b', skin: '#d9a883', hair: '#4a3b2e' },
  { shirt: '#c9c4bb', pants: '#2e3440', skin: '#7a4a30', hair: '#0f0f0f' },
  { shirt: '#4e6e6a', pants: '#4a4238', skin: '#e8bf9a', hair: '#8a6a3a' },
];

interface Mats {
  shirt: THREE.MeshStandardMaterial;
  pants: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  hair: THREE.MeshStandardMaterial;
  shoe: THREE.MeshStandardMaterial;
}

const cache = new Map<number, Mats>();

function getMats(i: number): Mats {
  const hit = cache.get(i);
  if (hit) return hit;
  const p = PALETTES[i % PALETTES.length];
  const mk = (c: string) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, metalness: 0 });
  const m: Mats = { shirt: mk(p.shirt), pants: mk(p.pants), skin: mk(p.skin), hair: mk(p.hair), shoe: mk('#1e1d1b') };
  cache.set(i, m);
  return m;
}

function pathLength(path: Pt[]): number {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
  }
  return total;
}

/** Ping-pong sampling of a polyline: walks to the end and back. */
function samplePath(path: Pt[], total: number, d: number) {
  const cycle = d % (2 * total);
  const forward = cycle <= total;
  const dist = forward ? cycle : 2 * total - cycle;
  const dir = forward ? 1 : -1;
  let acc = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const [ax, az] = path[i];
    const [bx, bz] = path[i + 1];
    const seg = Math.hypot(bx - ax, bz - az);
    if (acc + seg >= dist || i === path.length - 2) {
      const f = seg === 0 ? 0 : Math.min(1, (dist - acc) / seg);
      return { x: ax + (bx - ax) * f, z: az + (bz - az) * f, dx: (bx - ax) * dir, dz: (bz - az) * dir };
    }
    acc += seg;
  }
  return { x: path[0][0], z: path[0][1], dx: 0, dz: -1 };
}

/**
 * Low-poly person with natural proportions (about 1.75 m). Faces -Z by default.
 * Poses are restrained: seated figures sit still with a slight head movement,
 * standing figures breathe and turn their head, walking figures swing their limbs.
 */
export function Person({ position = [0, 0, 0], rotation = 0, pose = 'stand', palette = 0, path, speed = 1, phase = 0, cast = false }: PersonProps) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const mats = getMats(palette);
  const total = useMemo(() => (path ? pathLength(path) : 0), [path]);

  const seated = pose === 'sit' || pose === 'type' || pose === 'relax';
  const hipY = seated ? 0.52 : 0.85;
  const torsoY = seated ? 0.8 : 1.16;
  const headY = torsoY + 0.46;
  const shoulderY = torsoY + 0.2;
  const armRest = pose === 'type' ? 1.15 : seated ? 0.15 : 0.05;

  useFrame((state) => {
    const t = state.clock.elapsedTime + phase;
    const r = root.current;
    if (!r) return;

    let moving = pose === 'walk';
    if (path && path.length > 1) {
      const s = samplePath(path, total, t * speed);
      r.position.set(s.x, 0, s.z);
      r.rotation.y = Math.atan2(-s.dx, -s.dz);
      moving = true;
    }

    const lg = legL.current;
    const rg = legR.current;
    const la = armL.current;
    const ra = armR.current;
    const h = head.current;
    if (!lg || !rg || !la || !ra || !h) return;

    if (moving) {
      const w = Math.sin(t * speed * 5.6);
      lg.rotation.x = w * 0.45;
      rg.rotation.x = -w * 0.45;
      la.rotation.x = -w * 0.35;
      ra.rotation.x = w * 0.35;
      h.rotation.y = 0;
      return;
    }

    lg.rotation.x = 0;
    rg.rotation.x = 0;
    if (pose === 'type') {
      la.rotation.x = armRest + Math.sin(t * 9) * 0.04;
      ra.rotation.x = armRest + Math.sin(t * 9 + 1.3) * 0.04;
      h.rotation.y = Math.sin(t * 0.35) * 0.08;
      h.rotation.x = 0.12;
    } else if (pose === 'talk') {
      la.rotation.x = armRest;
      ra.rotation.x = -0.55 + Math.sin(t * 1.1) * 0.12;
      h.rotation.y = Math.sin(t * 0.55) * 0.22;
      h.rotation.x = 0;
    } else if (seated) {
      la.rotation.x = armRest;
      ra.rotation.x = armRest;
      h.rotation.y = Math.sin(t * 0.3) * 0.12;
      h.rotation.x = 0;
    } else {
      la.rotation.x = armRest + Math.sin(t * 1.4) * 0.02;
      ra.rotation.x = armRest - Math.sin(t * 1.4) * 0.02;
      h.rotation.y = Math.sin(t * 0.25) * 0.1;
      h.rotation.x = 0;
    }
  });

  return (
    <group ref={root} position={position} rotation={[0, rotation, 0]}>
      {/* Pelvis and torso */}
      <Box p={[0, hipY + 0.04, 0]} s={[0.4, 0.2, 0.24]} m={mats.pants} cast={cast} />
      <Box p={[0, torsoY, 0]} s={[0.42, 0.56, 0.24]} m={mats.shirt} cast={cast} />
      <Box p={[0, torsoY + 0.33, 0]} s={[0.1, 0.08, 0.1]} m={mats.skin} />

      {/* Head */}
      <group ref={head} position={[0, headY, 0]}>
        <Sph r={0.115} m={mats.skin} s={[1, 1.08, 1]} cast={cast} />
        <Box p={[0, 0.1, -0.01]} s={[0.24, 0.09, 0.24]} m={mats.hair} />
        <Box p={[0, 0.02, 0.1]} s={[0.24, 0.22, 0.06]} m={mats.hair} />
      </group>

      {/* Arms, pivot at shoulder */}
      <group ref={armL} position={[-0.29, shoulderY, 0]} rotation={[armRest, 0, 0]}>
        <Box p={[0, -0.29, 0]} s={[0.12, 0.58, 0.12]} m={mats.shirt} cast={cast} />
        <Box p={[0, -0.62, 0]} s={[0.1, 0.1, 0.1]} m={mats.skin} />
      </group>
      <group ref={armR} position={[0.29, shoulderY, 0]} rotation={[armRest, 0, 0]}>
        <Box p={[0, -0.29, 0]} s={[0.12, 0.58, 0.12]} m={mats.shirt} cast={cast} />
        <Box p={[0, -0.62, 0]} s={[0.1, 0.1, 0.1]} m={mats.skin} />
      </group>

      {/* Legs, pivot at hip */}
      {seated ? (
        <>
          <group ref={legL} position={[-0.11, hipY, 0]}>
            <Box p={[0, 0.02, 0.23]} s={[0.15, 0.12, 0.46]} m={mats.pants} />
            <Box p={[0, -0.25, 0.46]} s={[0.15, 0.46, 0.14]} m={mats.pants} />
            <Box p={[0, -0.5, 0.5]} s={[0.16, 0.05, 0.26]} m={mats.shoe} />
          </group>
          <group ref={legR} position={[0.11, hipY, 0]}>
            <Box p={[0, 0.02, 0.23]} s={[0.15, 0.12, 0.46]} m={mats.pants} />
            <Box p={[0, -0.25, 0.46]} s={[0.15, 0.46, 0.14]} m={mats.pants} />
            <Box p={[0, -0.5, 0.5]} s={[0.16, 0.05, 0.26]} m={mats.shoe} />
          </group>
        </>
      ) : (
        <>
          <group ref={legL} position={[-0.11, hipY, 0]}>
            <Box p={[0, -0.42, 0]} s={[0.15, 0.84, 0.16]} m={mats.pants} cast={cast} />
            <Box p={[0, -0.85, 0.04]} s={[0.16, 0.06, 0.26]} m={mats.shoe} />
          </group>
          <group ref={legR} position={[0.11, hipY, 0]}>
            <Box p={[0, -0.42, 0]} s={[0.15, 0.84, 0.16]} m={mats.pants} cast={cast} />
            <Box p={[0, -0.85, 0.04]} s={[0.16, 0.06, 0.26]} m={mats.shoe} />
          </group>
        </>
      )}
    </group>
  );
}
