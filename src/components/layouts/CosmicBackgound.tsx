"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import React, { useRef } from "react";

function Stars() {
  const ref = useRef<THREE.Points>(null!);

  // tạo buffer geometry với nhiều điểm
  const starCount = 10000;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000; // trải đều ra không gian
  }

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005; // xoay chậm
      ref.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
          args={[starCount as unknown as THREE.TypedArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation
        color="white"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function CosmicBackgound() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "black",
      }}
    >
      {/* ánh sáng mờ */}
      <ambientLight intensity={0.2} />
      {/* field sao */}
      <Stars />
      {/* điều khiển camera nếu muốn xoay thử */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
