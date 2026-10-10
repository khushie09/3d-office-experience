import * as THREE from 'three';

export const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
export const UNIT_CYL = new THREE.CylinderGeometry(1, 1, 1, 14);
export const UNIT_SPHERE = new THREE.SphereGeometry(1, 10, 8);

const std = (color: string, o: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0, ...o });

export const M = {
  plaster: std('#ece9e2', { roughness: 0.95 }),
  slab: std('#dcd7cd', { roughness: 0.9 }),
  ground: std('#8a9a6c', { roughness: 1 }),
  plaza: std('#d5d0c5', { roughness: 0.95 }),
  path: std('#cdc5b4', { roughness: 0.95 }),
  asphalt: std('#3b3d40', { roughness: 0.95 }),
  stone: std('#c9c2b3', { roughness: 0.9 }),
  frame: std('#2b2f33', { roughness: 0.32, metalness: 0.75 }),
  chrome: std('#c4c7cb', { roughness: 0.25, metalness: 0.8 }),
  oak: std('#b38f66', { roughness: 0.55 }),
  oakLight: std('#e3d6c1', { roughness: 0.5 }),
  darkWood: std('#4a382a', { roughness: 0.5 }),
  dark: std('#2c2a27', { roughness: 0.5 }),
  metal: std('#50565b', { roughness: 0.35, metalness: 0.6 }),
  chair: std('#43474c', { roughness: 0.6 }),
  screen: std('#1b1e22', { roughness: 0.25, metalness: 0.2 }),
  display: std('#1d2a31', { roughness: 0.2, emissive: '#2f4d5a', emissiveIntensity: 0.9 }),
  keyboard: std('#2a2d30', { roughness: 0.6 }),
  white: std('#f1efea', { roughness: 0.6 }),
  sofaA: std('#7b7266', { roughness: 0.95 }),
  sofaB: std('#b9ab94', { roughness: 0.95 }),
  cushion: std('#c8b59c', { roughness: 0.95 }),
  teal: std('#4e6e6a', { roughness: 0.9 }),
  rust: std('#9a5d3f', { roughness: 0.9 }),
  fabric: std('#8f8c86', { roughness: 0.95 }),
  wool: std('#8a8072', { roughness: 0.95 }),
  rug: std('#cdc2ae', { roughness: 1 }),
  book1: std('#7b3f35'),
  book2: std('#3e5563'),
  book3: std('#d1b68b'),
  book4: std('#55663f'),
  pot: std('#d6cfc1', { roughness: 0.8 }),
  leaf: std('#4d6e46', { roughness: 0.85 }),
  leafLight: std('#6f9057', { roughness: 0.85 }),
  hedge: std('#4f6b43', { roughness: 0.95 }),
  flower: std('#ffffff', { roughness: 0.7 }),
  soil: std('#4b3d31', { roughness: 1 }),
  bark: std('#5b4a3a', { roughness: 0.95 }),
  water: std('#4b6b75', { roughness: 0.08, metalness: 0.4 }),
  wood: std('#8a6a4a', { roughness: 0.7 }),
  umbrella: std('#e9e4da', { roughness: 0.9 }),
  glass: new THREE.MeshStandardMaterial({
    color: '#b9ccd3',
    transparent: true,
    opacity: 0.2,
    roughness: 0.06,
    metalness: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
  lamp: new THREE.MeshBasicMaterial({ color: '#fff4e0' }),
  warmLamp: new THREE.MeshBasicMaterial({ color: '#ffd9a0' }),
  exitGreen: new THREE.MeshBasicMaterial({ color: '#3fbf6a' }),
  contextA: std('#c9c4ba', { roughness: 0.9 }),
  contextB: std('#b7b5af', { roughness: 0.9 }),
};

type V3 = [number, number, number];

interface BoxProps {
  p?: V3;
  s?: V3;
  r?: V3;
  m: THREE.Material;
  cast?: boolean;
  receive?: boolean;
}

export function Box({ p = [0, 0, 0], s = [1, 1, 1], r = [0, 0, 0], m, cast = false, receive = true }: BoxProps) {
  return (
    <mesh position={p} rotation={r} scale={s} geometry={UNIT_BOX} material={m} castShadow={cast} receiveShadow={receive} />
  );
}

interface CylProps {
  p?: V3;
  r?: number;
  h?: number;
  m: THREE.Material;
  rot?: V3;
  cast?: boolean;
}

export function Cyl({ p = [0, 0, 0], r = 0.1, h = 1, m, rot = [0, 0, 0], cast = false }: CylProps) {
  return (
    <mesh position={p} rotation={rot} scale={[r, h, r]} geometry={UNIT_CYL} material={m} castShadow={cast} receiveShadow />
  );
}

export function Sph({ p = [0, 0, 0], r = 0.1, m, s = [1, 1, 1], cast = false }: { p?: V3; r?: number; m: THREE.Material; s?: V3; cast?: boolean }) {
  return (
    <mesh position={p} scale={[r * s[0], r * s[1], r * s[2]]} geometry={UNIT_SPHERE} material={m} castShadow={cast} receiveShadow />
  );
}
