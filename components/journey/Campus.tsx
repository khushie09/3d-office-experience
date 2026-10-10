import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Bench, RoundTable } from './Furniture';
import { Person, type Pt } from './Person';
import { Box, Cyl, M, Sph, UNIT_BOX } from './primitives';

type V3 = [number, number, number];

/* Deterministic random so the garden is identical on every load. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noiseTexture(base: string, repeat: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const g = c.getContext('2d');
  if (g) {
    g.fillStyle = base;
    g.fillRect(0, 0, 256, 256);
    const r = rng(7);
    for (let i = 0; i < 2600; i++) {
      const v = r();
      g.fillStyle = v > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
      g.fillRect(r() * 256, r() * 256, 2 + r() * 3, 2 + r() * 3);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const BLOB = new THREE.IcosahedronGeometry(1, 1);
const TUFT = new THREE.ConeGeometry(0.12, 0.5, 4);
const FLOWER = new THREE.SphereGeometry(0.12, 6, 5);

interface Item {
  x: number;
  y: number;
  z: number;
  s: number;
  r?: number;
  c?: string;
  sx?: number;
}

/** One draw call for many repeated objects, with per-instance colour where given. */
function Instances({ items, geometry, material, castShadow = false }: { items: Item[]; geometry: THREE.BufferGeometry; material: THREE.Material; castShadow?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    items.forEach((it, i) => {
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set(0, it.r ?? 0, 0);
      dummy.scale.set(it.s * (it.sx ?? 1), it.s, it.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (it.c) mesh.setColorAt(i, col.set(it.c));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [items]);
  if (items.length === 0) return null;
  return <instancedMesh ref={ref} args={[geometry, material, items.length]} castShadow={castShadow} receiveShadow />;
}

/** A tree with a gently swaying canopy, pivoting at its base. */
function Tree({ x, z, s = 1, phase = 0, cast = true }: { x: number; z: number; s?: number; phase?: number; cast?: boolean }) {
  const canopy = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = canopy.current;
    if (!g) return;
    const t = state.clock.elapsedTime + phase;
    g.rotation.z = Math.sin(t * 0.7) * 0.012;
    g.rotation.x = Math.cos(t * 0.55) * 0.008;
  });
  return (
    <group position={[x, 0, z]} scale={s}>
      <Cyl p={[0, 1.1, 0]} r={0.14} h={2.2} m={M.bark} cast={cast} />
      <group ref={canopy}>
        <Sph p={[0, 3.0, 0]} r={1.6} m={M.leaf} cast={cast} />
        <Sph p={[0.9, 2.5, 0.3]} r={1.1} m={M.leafLight} cast={cast} />
        <Sph p={[-0.8, 2.7, -0.4]} r={1.2} m={M.leaf} cast={cast} />
      </group>
    </group>
  );
}

function Lamp({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <Cyl p={[0, 1.8, 0]} r={0.04} h={3.6} m={M.frame} />
      <Sph p={[0, 3.7, 0]} r={0.14} m={M.warmLamp} />
    </group>
  );
}

function Walk({ a, b, w = 1.6 }: { a: [number, number]; b: [number, number]; w?: number }) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len = Math.hypot(dx, dz);
  const theta = -Math.atan2(dz, dx);
  return <Box p={[(a[0] + b[0]) / 2, 0.015, (a[1] + b[1]) / 2]} s={[len, 0.03, w]} r={[0, theta, 0]} m={M.path} />;
}

const CAR_COLORS = ['#d9d7d2', '#2f3a44', '#8a2f2a', '#e7e4dd', '#4b5a52'];

function Car({ position, rotation = 0, color = '#d9d7d2' }: { position: V3; rotation?: number; color?: string }) {
  const paint = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.45 }), [color]);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.5, 0]} s={[4.3, 0.6, 1.9]} m={paint} cast />
      <Box p={[-0.1, 1.05, 0]} s={[2.3, 0.55, 1.7]} m={M.screen} cast />
      {[
        [1.35, 0.95],
        [1.35, -0.95],
        [-1.35, 0.95],
        [-1.35, -0.95],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.32, z]} rotation={[Math.PI / 2, 0, 0]} scale={[0.32, 0.22, 0.32]}>
          <cylinderGeometry args={[1, 1, 1, 12]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function UmbrellaTable({ position, chairs }: { position: V3; chairs: boolean[] }) {
  return (
    <group position={position}>
      <RoundTable position={[0, 0, 0]} chairs={chairs} chairM={M.darkWood} tableM={M.white} radius={0.5} />
      <Cyl p={[0, 1.4, 0]} r={0.03} h={2.3} m={M.metal} />
      <mesh position={[0, 2.6, 0]}>
        <coneGeometry args={[1.3, 0.5, 16]} />
        <meshStandardMaterial color="#e9e4da" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Terrace() {
  return (
    <group>
      <Box p={[21.5, 0.1, -14]} s={[9, 0.2, 8]} m={M.stone} />
      <UmbrellaTable position={[19, 0, -13]} chairs={[true, true, true, true]} />
      <UmbrellaTable position={[24, 0, -16.5]} chairs={[true, false, true, true]} />
      <Person position={[19, 0, -12.15]} pose="sit" palette={1} phase={0.4} />
      <Person position={[19.85, 0, -13]} rotation={Math.PI / 2} pose="sit" palette={4} phase={1.5} />
      <Person position={[18.15, 0, -13]} rotation={-Math.PI / 2} pose="sit" palette={0} phase={2.2} />
      <Person position={[24, 0, -15.65]} rotation={Math.PI} pose="sit" palette={6} phase={0.9} />
      <Person position={[24.85, 0, -16.5]} rotation={Math.PI / 2} pose="sit" palette={7} phase={2.8} />
      <Person position={[22.5, 0, -6.5]} rotation={-Math.PI / 2} pose="talk" palette={2} phase={1.1} />
      <Person position={[23.6, 0, -6.5]} rotation={Math.PI / 2} pose="talk" palette={5} phase={0.2} />
    </group>
  );
}

function Pond() {
  const stones = useMemo(() => {
    const out: Item[] = [];
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      out.push({ x: 20 + Math.cos(a) * 6.6, y: 0.1, z: -60 + Math.sin(a) * 6.6, s: 0.5, r: -a });
    }
    return out;
  }, []);
  return (
    <group>
      <Cyl p={[20, 0.005, -60]} r={6} h={0.02} m={M.water} />
      <Instances items={stones} geometry={UNIT_BOX} material={M.stone} />
    </group>
  );
}

const LOOP_POND: Pt[] = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return [20 + Math.cos(a) * 9.5, -60 + Math.sin(a) * 9.5] as Pt;
});

const WALKERS_A: Pt[] = [
  [-30, 30],
  [-14, 20],
  [-3, 9],
  [0, 1],
  [-1, -2.5],
];
const WALKERS_B: Pt[] = [
  [30, 30],
  [14, 18],
  [4, 8],
  [2, 0.8],
  [3, -3],
];
const STROLL_C: Pt[] = [
  [-22, 6],
  [-18, 10],
  [-8, 14],
  [-3, 9],
  [-10, 4],
];
const CARPARK_F: Pt[] = [
  [-34, 18],
  [-34, 28],
  [-24, 38],
  [-24, 20],
];

/**
 * The outdoor campus. Lawns, paths, trees, planting, a driveway with parked cars,
 * benches, a terrace and a pond. Repeated plants are instanced for performance.
 */
export function Campus({ lite = false }: { lite?: boolean }) {
  const lawnTex = useMemo(() => noiseTexture('#8a9b6a', 60), []);

  const trees: [number, number, number, number][] = useMemo(() => {
    const base: [number, number, number, number][] = [
      [-16, 6, 1.1, 0],
      [-24, -4, 1.25, 1],
      [-18, -16, 1, 2],
      [-30, -26, 1.3, 3],
      [-22, -44, 1.15, 4],
      [-16, -38, 0.95, 5],
      [-34, 8, 1.2, 6],
      [-34, -12, 1, 7],
      [28, 6, 1.2, 8],
      [24, -4, 1.05, 9],
      [30, -18, 1.25, 10],
      [28, -34, 1.1, 11],
      [18, -36, 1, 12],
      [26, -48, 1.2, 13],
      [2, -76, 1.2, 14],
      [-8, -70, 1, 15],
      [10, -68, 1.1, 16],
      [30, -62, 1.2, 17],
      [-30, -62, 1.25, 18],
      [-26, -68, 1, 19],
    ];
    return lite ? base.filter((_, i) => i % 2 === 0) : base;
  }, [lite]);

  const { shrubs, tufts, flowers } = useMemo(() => {
    const r = rng(42);
    const excluded: [number, number, number, number][] = [
      [-12.5, 12.5, -53, 1.5], // building footprint with margin (x0,x1,z0,z1)
      [-33, -19, -27, -5], // neighbouring block
      [36, 52, -25, -3],
      [15.5, 27.5, -22, -6], // terrace
      [-30, -22.5, 12, 60], // driveway
      [-37, -19, 15, 37], // car park
      [0, 14, -1, 15], // plaza
    ];
    const inside = (x: number, z: number) =>
      excluded.some(([x0, x1, z0, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1) ||
      Math.hypot(x - 20, z + 60) < 8.5 ||
      Math.hypot(x - 20, z + 60) > 45;
    const sample = (count: number, minS: number, maxS: number) => {
      const out: Item[] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 40) {
        const x = -70 + r() * 140;
        const z = -78 + r() * 110;
        if (x < -40 || x > 40 || z > 32) continue;
        if (inside(x, z)) continue;
        out.push({ x, y: 0.4, z, s: minS + r() * (maxS - minS), r: r() * Math.PI });
      }
      return out;
    };
    const shrubItems = sample(lite ? 70 : 150, 0.5, 0.9);
    const tuftItems = sample(lite ? 260 : 520, 0.45, 0.8).map((t) => ({ ...t, y: 0.22 }));
    const flowerColors = ['#e7b8c0', '#f2e3a1', '#ffffff', '#c97b6b', '#b48ad0'];
    const flowerItems: Item[] = [];
    const flowerCount = lite ? 120 : 260;
    for (let i = 0; i < flowerCount; i++) {
      const side = r() < 0.5 ? -1 : 1;
      const x = side * (12.6 + r() * 1.2);
      const z = -3 - r() * 46;
      flowerItems.push({ x, y: 0.14, z, s: 0.8 + r() * 0.5, c: flowerColors[Math.floor(r() * flowerColors.length)] });
    }
    return { shrubs: shrubItems, tufts: tuftItems, flowers: flowerItems };
  }, [lite]);

  return (
    <group>
      {/* Ground and paving */}
      <mesh position={[0, -0.05, 0]} scale={[400, 0.1, 400]} geometry={UNIT_BOX}>
        <meshStandardMaterial map={lawnTex} roughness={1} />
      </mesh>
      <Box p={[0, 0.01, 7]} s={[24, 0.02, 14]} m={M.plaza} />
      <Box p={[-26, 0.012, 36]} s={[7, 0.02, 60]} m={M.asphalt} />
      <Box p={[-28, 0.012, 25]} s={[16, 0.02, 20]} m={M.asphalt} />

      {/* Walking paths */}
      <Walk a={[-12, 8]} b={[-12, 22]} />
      <Walk a={[-2, 10]} b={[-14, 22]} />
      <Walk a={[-14, 22]} b={[-30, 30]} />
      <Walk a={[2, 10]} b={[14, 22]} />
      <Walk a={[14, 22]} b={[30, 30]} />
      <Walk a={[-6, 14]} b={[-18, 16]} w={1.2} />
      <Walk a={[13.5, 3]} b={[13.5, -2]} w={1.2} />

      {/* Parked cars */}
      {[18.5, 21.7, 24.9, 28.1].map((z, i) => (
        <Car key={z} position={[-28, 0, z]} rotation={Math.PI / 2} color={CAR_COLORS[i % CAR_COLORS.length]} />
      ))}
      <Car position={[-34.2, 0, 30]} rotation={0} color="#2f3a44" />

      {/* Trees */}
      {trees.map(([x, z, s, phase]) => (
        <Tree key={`${x}-${z}`} x={x} z={z} s={s} phase={phase} />
      ))}

      {/* Planting */}
      <Instances items={shrubs} geometry={BLOB} material={M.hedge} castShadow={!lite} />
      <Instances items={tufts} geometry={TUFT} material={M.leafLight} />
      <Instances items={flowers} geometry={FLOWER} material={M.flower} />
      <Box p={[-12.7, 0.12, -26]} s={[1.2, 0.24, 48]} m={M.soil} />
      <Box p={[12.7, 0.12, -26]} s={[1.2, 0.24, 48]} m={M.soil} />

      {/* Outdoor furniture, lamps and the pond */}
      <Bench position={[-14, 0, -2]} rotation={Math.PI} />
      <Person position={[-14, 0, -2.6]} rotation={Math.PI} pose="sit" palette={3} phase={0.6} />
      <Bench position={[16, 0, 18]} rotation={-Math.PI / 2} />
      <Bench position={[-18, 0, 26]} rotation={Math.PI / 2} />
      <Lamp x={-6} z={4} />
      <Lamp x={6} z={4} />
      <Lamp x={-22} z={22} />
      <Lamp x={22} z={22} />
      <Lamp x={13.5} z={-30} />
      <Lamp x={13.5} z={-8} />
      <Terrace />
      <Pond />

      {/* Neighbouring volumes for context */}
      <Box p={[-26, 10, -16]} s={[12, 20, 20]} m={M.contextA} cast />
      <Box p={[44, 13, -14]} s={[14, 26, 18]} m={M.contextB} cast />

      {/* People walking the campus and the entrance */}
      <Person path={WALKERS_A} speed={0.9} palette={0} phase={0} cast />
      <Person path={WALKERS_B} speed={0.85} palette={2} phase={1} cast />
      <Person path={STROLL_C} speed={0.7} palette={5} phase={2} cast />
      <Person path={CARPARK_F} speed={0.8} palette={1} phase={3} cast />
      {!lite && <Person path={LOOP_POND} speed={0.55} palette={4} phase={0.5} cast />}
      {!lite && <Person path={[...LOOP_POND].reverse()} speed={0.5} palette={7} phase={4} cast />}
    </group>
  );
}
