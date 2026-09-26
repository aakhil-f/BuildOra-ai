import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Monolith({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetX = state.pointer.y * -0.25;
    const targetY = (reduced ? 0 : t * 0.18) + state.pointer.x * 0.45;
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.rotation.y += (targetY - g.rotation.y) * (1 - Math.exp(-3 * dt));
    if (!reduced) g.position.y = Math.sin(t * 0.6) * 0.08;
    if (core.current && !reduced) core.current.rotation.z = t * 0.3;
  });
  const steel = { color: "#b9bcc2", metalness: 1, roughness: 0.22 };
  const dark = { color: "#55585e", metalness: 1, roughness: 0.3 };
  return (
    <group ref={group}>
      <RoundedBox args={[0.42, 3.6, 0.42]} radius={0.05} rotation-z={Math.PI / 4}>
        <meshStandardMaterial {...steel} />
      </RoundedBox>
      <RoundedBox args={[0.42, 3.6, 0.42]} radius={0.05} rotation-z={-Math.PI / 4}>
        <meshStandardMaterial {...dark} />
      </RoundedBox>
      <mesh ref={core}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#dfe1e5" metalness={1} roughness={0.12} flatShading />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.75, 0.018, 16, 160]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh rotation-x={Math.PI / 2.6} rotation-y={0.4}>
        <torusGeometry args={[2.15, 0.008, 12, 160]} />
        <meshStandardMaterial {...dark} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ mobile }: { mobile: boolean }) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 0, 6.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} />
      <Environment resolution={256}>
        <Lightformer intensity={5} position={[0, 5, -2]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.5} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} />
        <Lightformer intensity={0.8} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 0.5, 1]} />
      </Environment>
      <Monolith reduced={reduced} />
      {!reduced && <Sparkles count={mobile ? 30 : 70} scale={[7, 5, 4]} size={1.6} speed={0.25} color="#c8cad0" opacity={0.5} />}
    </Canvas>
  );
}
