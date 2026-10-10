import * as THREE from 'three';

export interface SceneCopy {
  label: string;
  title: string;
  body: string;
}

export const SCENES: SceneCopy[] = [
  {
    label: 'Campus',
    title: 'A glass building set in its own landscape.',
    body: 'Lawns, mature trees and stone paths frame the building before you reach the door.',
  },
  {
    label: 'Façade',
    title: 'Reflections move across the glass.',
    body: 'The façade mirrors the garden and the sky, so the building changes with the light through the day.',
  },
  {
    label: 'Entrance',
    title: 'Glass doors under a steel canopy.',
    body: 'Colleagues arrive along the stone path. The lobby is visible before the threshold.',
  },
  {
    label: 'Reception',
    title: 'Oak, lacquer and a single desk.',
    body: 'The reception desk sits on the entrance axis. Visitors wait on low sofas while the lobby fills with daylight.',
  },
  {
    label: 'Main workspace',
    title: 'Open rows, occupied desks.',
    body: 'Workstations run parallel to the façade, so every desk keeps a view of the glass and of the people around it.',
  },
  {
    label: 'Meeting rooms',
    title: 'Glass rooms, visible from the corridor.',
    body: 'Enclosed for focus and transparent for orientation. Presentation screens sit on solid walls.',
  },
  {
    label: 'Private office',
    title: 'Quiet work with storage close at hand.',
    body: 'Private offices have glazed fronts, solid walls for shelving and a desk placed for daylight.',
  },
  {
    label: 'Lounge',
    title: 'Timber, wool and softer light.',
    body: 'A place to talk, pause or read at the rear of the plan, away from the desks.',
  },
  {
    label: 'Café',
    title: 'Coffee, lunch and a shared table.',
    body: 'The café opens onto the corridor. Tables sit on a regular grid, with the counter along the solid wall.',
  },
  {
    label: 'Overview',
    title: 'Designed to be walked through.',
    body: 'From the garden to the lounge, each room was placed in relation to the rooms around it. Visit to see it in person.',
  },
];

export const SCENE_COUNT = SCENES.length;

type V3 = [number, number, number];

interface Waypoint {
  pos: V3;
  look: V3;
  /** When set, this waypoint is the camera frame for that scene index. */
  anchor?: number;
}

/*
 * Camera waypoints. Every transit point is placed in open floor space, in the
 * aisles and corridors, and never inside furniture or walls. Anchors mark the
 * framed moment for each scene; the scroll maps linearly between anchors.
 */
const WAYPOINTS: Waypoint[] = [
  { pos: [40, 13, 62], look: [-1, 4, -18], anchor: 0 },
  { pos: [17, 3.2, 12], look: [7, 5, -1], anchor: 1 },
  { pos: [1.2, 1.7, 10.5], look: [0.5, 1.7, -3], anchor: 2 },
  { pos: [0.5, 1.65, -1.5], look: [0, 1.6, -8] },
  { pos: [-4.5, 1.6, -3.2], look: [-1.5, 1.3, -12], anchor: 3 },
  { pos: [-2.25, 1.6, -12.2], look: [-2.25, 1.3, -20] },
  { pos: [-2.25, 1.7, -21], look: [-4.5, 1.1, -27], anchor: 4 },
  { pos: [-2.25, 1.6, -12.5], look: [3, 1.3, -16] },
  { pos: [2.4, 1.6, -12.5], look: [6, 1.3, -16] },
  { pos: [5.2, 1.6, -14.2], look: [6, 1.3, -18.2], anchor: 5 },
  { pos: [2.2, 1.6, -20], look: [0, 1.4, -30] },
  { pos: [1.0, 1.6, -29.5], look: [-6, 1.2, -33] },
  { pos: [-6, 1.6, -29.5], look: [-9, 1.2, -35] },
  { pos: [-8.8, 1.6, -32.3], look: [-9.2, 1.2, -36], anchor: 6 },
  { pos: [-5, 1.6, -29.6], look: [-2, 1.3, -34] },
  { pos: [0.2, 1.6, -30], look: [0.2, 1.3, -38] },
  { pos: [0.2, 1.6, -36], look: [0, 1.3, -42] },
  { pos: [0.2, 1.6, -44], look: [-4, 1.2, -48] },
  { pos: [-4.5, 1.6, -49], look: [-8, 1.0, -47], anchor: 7 },
  { pos: [0.2, 1.6, -46], look: [5, 1.2, -45] },
  { pos: [2.6, 1.6, -41], look: [9, 1.0, -46], anchor: 8 },
  { pos: [3.0, 1.6, -50.2], look: [4, 1.4, -58] },
  { pos: [4, 2.2, -57], look: [0, 3, -62] },
  { pos: [-14, 11, -70], look: [0, 4, -30] },
  { pos: [-42, 17, -38], look: [2, 4, -22], anchor: 9 },
];

export const cameraPath = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.pos)),
  false,
  'centripetal'
);

export const lookPath = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => new THREE.Vector3(...w.look)),
  false,
  'centripetal'
);

const SAMPLES = 1200;

/** Arc-length fraction (0..1) of each scene anchor along the camera path, so pacing stays even. */
function buildAnchorU(): number[] {
  const knotOfScene: number[] = [];
  WAYPOINTS.forEach((w, i) => {
    if (w.anchor !== undefined) knotOfScene[w.anchor] = i;
  });

  const cumulative: number[] = [0];
  let prev = cameraPath.getPoint(0);
  let total = 0;
  for (let j = 1; j <= SAMPLES; j++) {
    const p = cameraPath.getPoint(j / SAMPLES);
    total += p.distanceTo(prev);
    cumulative.push(total);
    prev = p;
  }

  return knotOfScene.map((knot) => {
    const j = Math.round((knot / (WAYPOINTS.length - 1)) * SAMPLES);
    return cumulative[j] / total;
  });
}

const ANCHOR_U = buildAnchorU();

/** Maps scroll progress (0..1) to an arc-length position on the camera path, anchored per scene. */
export function progressToU(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const span = SCENE_COUNT - 1;
  const x = clamped * span;
  const s = Math.min(span - 1, Math.floor(x));
  const f = x - s;
  return ANCHOR_U[s] + (ANCHOR_U[s + 1] - ANCHOR_U[s]) * f;
}

export const journey = { progress: 0 };
