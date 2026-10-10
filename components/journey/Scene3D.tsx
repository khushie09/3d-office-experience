'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { cameraPath, journey, lookPath, progressToU } from '@/lib/journey';
import { prefersReducedMotion } from '@/lib/motion';
import { Building } from './Building';
import { Campus } from './Campus';
import { Interior } from './Interior';

const BACKGROUND = '#e4e8e9';

function CameraRig() {
  const { camera, pointer } = useThree();
  const reduce = useMemo(() => prefersReducedMotion(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const aim = useMemo(() => new THREE.Vector3(), []);
  const started = useRef(false);

  useFrame((_, dt) => {
    const u = progressToU(journey.progress);
    cameraPath.getPointAt(u, target);
    lookPath.getPointAt(u, look);

    // Gentle pointer parallax so the building feels physically present.
    target.x += pointer.x * 0.5;
    target.y += pointer.y * 0.3;

    if (!started.current) {
      pos.copy(target);
      aim.copy(look);
      started.current = true;
    }

    // Critically damped follow, so the camera carries a little weight behind scroll.
    const k = reduce ? 1 : 1 - Math.exp(-dt * 4);
    pos.lerp(target, k);
    aim.lerp(look, k);
    camera.position.copy(pos);
    camera.lookAt(aim);
  });

  return null;
}

export function Scene3D({ onReady }: { onReady?: () => void }) {
  const lite = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.6]}
      shadows
      camera={{ fov: 32, near: 0.1, far: 500, position: [26, 10, 46] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(BACKGROUND);
        onReady?.();
      }}
    >
      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 110, 320]} />

      <hemisphereLight args={['#e6eef2', '#b5ada0', 0.9]} />
      <directionalLight
        position={[40, 70, 30]}
        intensity={2.3}
        color="#fff3e2"
        castShadow
        shadow-mapSize={[lite ? 1024 : 2048, lite ? 1024 : 2048]}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />

      <CameraRig />
      <Campus lite={lite} />
      <Building lite={lite} />
      <Interior lite={lite} />
    </Canvas>
  );
}
