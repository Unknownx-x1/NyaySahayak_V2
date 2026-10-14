"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line, Float } from "@react-three/drei";
import * as THREE from "three";

// Individual Paper Folio Plane Component
function PaperFolio({
  position,
  rotation,
  scale = [1.8, 2.4, 0.02],
  title,
  label,
  accentColor = "#E3DCD0",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  title: string;
  label: string;
  accentColor?: string;
}) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Paper Sheet Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Top Border / Red Tape Seal */}
      <mesh position={[0, scale[1] / 2 - 0.05, 0.015]}>
        <boxGeometry args={[scale[0] * 0.9, 0.04, 0.01]} />
        <meshStandardMaterial color={accentColor} roughness={0.5} />
      </mesh>

      {/* Title Annotation */}
      <Text
        position={[-scale[0] / 2 + 0.15, scale[1] / 2 - 0.25, 0.02]}
        fontSize={0.11}
        color="#121417"
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/sourceserif4/v8/neIIzCioA3PqWf6gHnO3WhO4637y.woff"
      >
        {title}
      </Text>

      {/* Monospace Provenance Label */}
      <Text
        position={[-scale[0] / 2 + 0.15, scale[1] / 2 - 0.45, 0.02]}
        fontSize={0.075}
        color="#6A7280"
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al03184w.woff"
      >
        {label}
      </Text>

      {/* Abstract Simulated Text Lines */}
      {[-0.7, -0.9, -1.1, -1.3].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.015]}>
          <boxGeometry args={[scale[0] * 0.8, 0.02, 0.005]} />
          <meshStandardMaterial color="#E8E2D5" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function CaseRelationshipScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle damped rotation
  useFrame(({ clock, pointer }) => {
    if (reducedMotion || !groupRef.current) return;
    const t = clock.getElapsedTime();
    // Soft, deliberate oscillation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.25 + Math.sin(t * 0.2) * 0.08,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.15 + Math.cos(t * 0.2) * 0.05,
      0.03
    );
  });

  // Connecting line coordinates between documents, evidence and legal issues
  const linePoints1: [number, number, number][] = [
    [-2.2, 0.2, 0.1],
    [-0.5, 0.8, 0.3],
    [0.8, 1.2, 0.2],
  ];

  const linePoints2: [number, number, number][] = [
    [0.8, 1.2, 0.2],
    [2.2, 0.4, 0.1],
  ];

  const linePoints3: [number, number, number][] = [
    [-0.5, 0.8, 0.3],
    [0.2, -1.1, 0.1],
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Subtle ambient lighting simulating a warm legal chamber desk */}
      <ambientLight intensity={0.85} color="#FFFDF9" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#FFF9EE"
      />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#E8E2D5" />

      {/* Floating assembly container */}
      <Float
        speed={reducedMotion ? 0 : 0.8}
        rotationIntensity={reducedMotion ? 0 : 0.1}
        floatIntensity={reducedMotion ? 0 : 0.2}
      >
        {/* Node 1: Paper Book Petition */}
        <PaperFolio
          position={[-2.4, 0.2, 0]}
          rotation={[0.05, 0.25, -0.04]}
          scale={[1.7, 2.3, 0.02]}
          title="PAPER BOOK VOL. 1"
          label="SLP (C) 4589/2024"
          accentColor="#121417"
        />

        {/* Node 2: Extracted Exhibit P-4 */}
        <PaperFolio
          position={[-0.4, 0.9, 0.4]}
          rotation={[-0.08, -0.15, 0.02]}
          scale={[1.5, 2.0, 0.02]}
          title="EXHIBIT P-4 (POSTAL)"
          label="PAGE 142 [210.5, 72.0]"
          accentColor="#B83A24" // Vermilion evidence seal
        />

        {/* Node 3: Landmark Judicial Precedent */}
        <PaperFolio
          position={[2.3, 0.4, 0]}
          rotation={[0.04, -0.22, 0.05]}
          scale={[1.7, 2.2, 0.02]}
          title="VIDYA DROLIA (2021)"
          label="2 SCC 1 • RATIO ¶79"
          accentColor="#1B5E20" // Verified Sage
        />

        {/* Node 4: Framed Legal Issue Dossier */}
        <PaperFolio
          position={[0.2, -1.2, 0.2]}
          rotation={[0.12, 0.05, -0.02]}
          scale={[1.6, 1.8, 0.02]}
          title="ISSUE #1: MORATORIUM"
          label="IBC SEC. 14 / ARBITRATION"
          accentColor="#8C6200" // Amber Contested
        />

        {/* Forensic Connecting Threads */}
        <Line
          points={linePoints1}
          color="#B83A24"
          lineWidth={1.5}
          dashed
          dashScale={20}
          dashSize={0.5}
          gapSize={0.25}
        />
        <Line
          points={linePoints2}
          color="#1B5E20"
          lineWidth={1.5}
          dashed
          dashScale={20}
          dashSize={0.5}
          gapSize={0.25}
        />
        <Line
          points={linePoints3}
          color="#8C6200"
          lineWidth={1.2}
          dashed
          dashScale={20}
          dashSize={0.5}
          gapSize={0.25}
        />

        {/* Forensic Coordinate Hub Annotations */}
        <mesh position={[-0.5, 0.8, 0.45]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#B83A24" emissive="#B83A24" emissiveIntensity={0.2} />
        </mesh>

        <mesh position={[0.8, 1.2, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1B5E20" emissive="#1B5E20" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}
