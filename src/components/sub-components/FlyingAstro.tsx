'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Text } from "@react-three/drei";

function NumberedAxes({ size = 5 }) {
  const labels = [];

  for (let i = -size; i <= size; i++) {
    if (i !== 0) {
      labels.push(
        <Text
          key={`x${i}`}
          position={[i, 0, 0]}
          fontSize={0.2}
          color="red"
        >
          {i}
        </Text>
      );
    }
  }

  for (let i = -size; i <= size; i++) {
    if (i !== 0) {
      labels.push(
        <Text
          key={`y${i}`}
          position={[0, i, 0]}
          fontSize={0.2}
          color="green"
        >
          {i}
        </Text>
      );
    }
  }

  for (let i = -size; i <= size; i++) {
    if (i !== 0) {
      labels.push(
        <Text
          key={`z${i}`}
          position={[0, 0, i]}
          fontSize={0.2}
          color="blue"
        >
          {i}
        </Text>
      );
    }
  }

  return (
    <>
      <axesHelper args={[size]} />
      {labels}
    </>
  );
}

// 📌 Component để animate camera theo scroll
const CameraAnimation = () => {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  useEffect(() => {
    // ✅ Vị trí khởi tạo của camera
    camera.position.set(1.55, 1.75, 1.2);
    camera.lookAt(0, 0.5, -0.5);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight; // 1 màn hình chiều cao
      const progress = Math.min(scrollY / maxScroll, 1); // clamp 0 → 1

      // ✅ Animate camera theo progress
      gsap.to(camera.position, {
        // di chuyển camera khi scroll
        x: 1.55 + progress * 4,   // dịch sang phải
        y: 1.75 - progress * 1.75,    // hạ xuống
        z: 1.2 + progress * 1.2,   // lùi ra
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          // đảm bảo camera luôn nhìn vào astronaut
          camera.lookAt(0, 0, 0);
        },
      });
    };

    // lắng nghe sự kiện scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera]);

  // OrbitControls để có thể xoay test bằng chuột
  return <OrbitControls ref={controls} enableZoom={true} />;
};

function Astronaut() {
  const { scene } = useGLTF("/models/astronaut.glb");
  const ref = useRef<THREE.Group>(null!);


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    console.log(progress)
    if (ref.current && progress === 1) {
      // Floating effect
      ref.current.position.y = Math.sin(t * 2) * 0.1;
      // Slow rotation
      // ref.current.rotation.y = t * 0.5;
    }
  });
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      // ✅ Scale nhỏ dần
      const targetScale = 4.5 - progress * 2; // 4.5 → 2.0

      // ✅ Position dịch chuyển (VD: bay lên cao & ra xa)
      const targetPos = {
        x: 0,
        y: 0, // từ 0 → 2 khi scroll hết 1 màn
        z: 1.5 + progress * 1.5, // từ 1.5 → 0
      };

      gsap.to(ref.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(ref.current.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={4.5}
      position={[0, 0, 1.5]}
    />
  );
}


export default function FlyingAstro() {
  return (
    <div className="astro-container fixed top-0 left-0 w-full h-screen z-0">
      <Canvas>
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Astronaut />

        {/* helper để debug */}
        <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} />
        <NumberedAxes />

        <CameraAnimation />
      </Canvas>
    </div>
  );
}
