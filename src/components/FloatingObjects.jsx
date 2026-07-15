"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ type, position, scale, rotationOffset }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = rotationOffset.x + t * 0.15;
      meshRef.current.rotation.y = rotationOffset.y + t * 0.2;
    }
  });

  const material = useMemo(() => {
    return (
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={2}
        chromaticAberration={0.025}
        anisotropy={0.1}
        distortion={0.1}
        distortionScale={0.1}
        temporalDistortion={0.2}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#ffffff"
        transparent
        opacity={0.15}
      />
    );
  }, []);

  if (type === "sphere") {
    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <sphereGeometry args={[1, 32, 32]} />
          {material}
        </mesh>
      </Float>
    );
  }

  if (type === "cube" || type === "ai-chip") {
    const args = type === "ai-chip" ? [1, 0.2, 1] : [1, 1, 1];
    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <boxGeometry args={args} />
          {material}
        </mesh>
      </Float>
    );
  }

  if (type === "brackets" || type === "tags" || type === "closing-tags") {
    const text = type === "brackets" ? "{ }" : type === "tags" ? "< >" : "</>";
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={2}>
        <group position={position} scale={scale}>
          <Html center transform sprite>
            <div
              style={{
                fontSize: "4rem",
                fontWeight: "200",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "monospace",
                userSelect: "none",
                filter: "blur(2px)",
              }}
            >
              {text}
            </div>
          </Html>
        </group>
      </Float>
    );
  }

  return null;
}

export default function FloatingObjects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.25, filter: "blur(2px)" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />

        {/* Scattered 3D shapes */}
        <FloatingShape type="brackets" position={[-4, 2, -2]} scale={1.5} rotationOffset={new THREE.Vector3(0, 0, 0)} />
        <FloatingShape type="sphere" position={[5, 3, -5]} scale={1.2} rotationOffset={new THREE.Vector3(0.5, 0.5, 0)} />
        <FloatingShape type="tags" position={[4, -2, 0]} scale={1.2} rotationOffset={new THREE.Vector3(0, 0, 0)} />
        <FloatingShape type="cube" position={[-5, -3, -4]} scale={1.2} rotationOffset={new THREE.Vector3(1, 0.5, 0.5)} />
        <FloatingShape type="ai-chip" position={[0, -4, -2]} scale={1.5} rotationOffset={new THREE.Vector3(0.2, 0.8, 0.1)} />
        <FloatingShape type="closing-tags" position={[0, 4, -4]} scale={1.5} rotationOffset={new THREE.Vector3(0, 0, 0)} />
      </Canvas>
    </div>
  );
}
