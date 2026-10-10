// Samples the camera path and reports any eye-level sample inside a full-height wall.
// Run with: node scripts/check-camera-path.mjs
import fs from 'fs';
import * as THREE from 'three';
const src = fs.readFileSync(new URL('../lib/journey.ts', import.meta.url).pathname, 'utf8');
const block = src.slice(src.indexOf('const WAYPOINTS'), src.indexOf('];', src.indexOf('const WAYPOINTS')));
const wps = [...block.matchAll(/pos: \[([^\]]+)\], look: \[([^\]]+)\]/g)].map(m => m[1].split(',').map(Number));
const pos = [...block.matchAll(/pos: \[([^\]]+)\]/g)].map(m => m[1].split(',').map(Number));
const curve = new THREE.CatmullRomCurve3(pos.map(p => new THREE.Vector3(...p)), false, 'centripetal');
// Solid footprints [x0,x1,z0,z1] (opaque furniture and walls; glass and open floor are passable)
const solid = [
  // reception counter & core
  [-2.5, 2.5, -8.05, -6.95], [6.5, 10.7, -9, -1],
  // workspace desks (2.4 x 1.1) + chairs (0.55 deep, behind +0.85)
  ...[[-7.5,-15],[-4,-15],[-0.5,-15],[-7.5,-19],[-4,-19],[-0.5,-19],[-7.5,-23],[-4,-23],[-0.5,-23],[-7.5,-27],[-4,-27],[-0.5,-27]].flatMap(([x,z]) => [[x-1.2,x+1.2,z-0.55,z+0.55],[x-0.3,x+0.3,z+0.6,z+1.1]]),
  // meeting room back walls
  [3.5, 8.5, -18.56, -18.44], [3, 10, -29.06, -28.94],
  // private office partitions
  [-6.08, -5.92, -43, -31], [-1.08, -0.92, -43, -31], [-11, -1, -37.08, -36.92],
  // cafe north wall, office furniture
  [1, 11, -31.6, -31.4], [-9.5, -8.5, -36.2, -34.8], [-10.8, -8.9, -36.9, -36.6], [-3.5-1.2, -3.5+1.2, -36, -35], [-10.8,-10.3,-34.2,-33],
  // meeting room tables
  [4.6, 7.4, -16.6, -15.4], [4, 9, -26.8, -25.2],
  // lounge & cafe furniture
  [-7.6, -4.4, -46.5, -45.1], [-7.6, -4.4, -51.8, -50.6], [-6.6, -5.4, -49.1, -47.9],
  [4.45, 5.55, -36.55, -35.45], [4.45, 5.55, -41.55, -40.45], [7.45, 8.55, -46.55, -45.45], [4.45, 5.55, -48.55, -47.45],
  [9.6, 10.6, -46.3, -37.7],
  // rear & sides
  [-11, -10.6, -51.5, -48], [-12, -11, -60, 60], [11, 12, -60, 60],
];
const tall = [[-2.5,2.5,-8.05,-6.95]].slice(0,0);
const walls = [[6.5,10.7,-9,-1],[3.5,8.5,-18.56,-18.44],[3,10,-29.06,-28.94],[-6.08,-5.92,-43,-31],[-1.08,-0.92,-43,-31],[-11,-1,-37.08,-36.92],[1,11,-31.6,-31.4],[-10.8,-10.3,-34.2,-33],[-11,-10.6,-51.5,-48]];
const insideSolid = (x, z) => walls.some(([a, b, c, d]) => x > a && x < b && z > c && z < d);
const samples = 4000;
let bad = [];
let minClear = Infinity;
for (let i = 0; i <= samples; i++) {
  const t = i / samples;
  const p = curve.getPointAt(t);
  if (p.y < 1.2 || p.y > 1.9) continue; // only the eye band inside the building
  if (p.x > -11 && p.x < 11 && p.z < 0 && p.z > -53 && insideSolid(p.x, p.z)) bad.push([t.toFixed(3), p.x.toFixed(2), p.y.toFixed(2), p.z.toFixed(2)]);
}
console.log('waypoints', wps.length, 'violations', bad.length);
console.log(bad.slice(0, 20).map(b => b.join(' ')).join('\n'));
