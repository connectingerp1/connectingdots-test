"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Extrude } from "@react-three/drei";
import styles from "@/styles/AnimatedLogo.module.css";

// 3D Circular Arc Component - only visible on hover
const CircularArc = ({
  radius,
  thickness,
  height,
  arcStart,
  arcEnd,
  color,
  rotationSpeed,
  initialRotation,
  position = [0, 0, 0]
}) => {
  const groupRef = useRef();

  // Create a curved shape for extrusion
  const shape = useMemo(() => {
    const arcShape = new THREE.Shape();

    // Calculate points for the arc shape
    const arcLength = arcEnd - arcStart;
    const segments = Math.max(24, Math.floor(arcLength * 20)); // Higher segment count for smoother curve

    // Create inner and outer points for the arc
    const innerRadius = radius - thickness / 2;
    const outerRadius = radius + thickness / 2;

    // Start at the inner radius
    arcShape.moveTo(
      innerRadius * Math.cos(arcStart),
      innerRadius * Math.sin(arcStart)
    );

    // Draw the inner arc
    for (let i = 0; i <= segments; i++) {
      const angle = arcStart + (arcLength * i) / segments;
      arcShape.lineTo(
        innerRadius * Math.cos(angle),
        innerRadius * Math.sin(angle)
      );
    }

    // Draw line to outer radius
    arcShape.lineTo(
      outerRadius * Math.cos(arcEnd),
      outerRadius * Math.sin(arcEnd)
    );

    // Draw the outer arc (going back)
    for (let i = segments; i >= 0; i--) {
      const angle = arcStart + (arcLength * i) / segments;
      arcShape.lineTo(
        outerRadius * Math.cos(angle),
        outerRadius * Math.sin(angle)
      );
    }

    // Close the shape
    arcShape.closePath();
    return arcShape;
  }, [radius, thickness, arcStart, arcEnd]);

  // Extrusion settings
  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: height,
      bevelEnabled: true,
      bevelThickness: thickness * 0.15,
      bevelSize: thickness * 0.08,
      bevelOffset: 0,
      bevelSegments: 5
    }),
    [height, thickness]
  );

  // Animation
  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate around the Z axis for ring rotation
    groupRef.current.rotation.z += rotationSpeed;

    // Add slight wobble for realism but maintain horizontal ring orientation
    groupRef.current.rotation.x = initialRotation.x + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    groupRef.current.rotation.y = initialRotation.y + Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[initialRotation.x, initialRotation.y, initialRotation.z]}
    >
      <Extrude args={[shape, extrudeSettings]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          reflectivity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </Extrude>
    </group>
  );
};

// 3D Component - Only rendered on hover
const AnimatedArcs = ({ isHovered }) => {
  if (!isHovered) return null;

  // Rings rotating around the logo like Saturn's rings
  return (
    <>
      {/* Outer arc - #2ea5f0 */}
      <CircularArc
        radius={1.2}  // Slightly reduced to prevent overflow
        thickness={0.18}
        height={0.18}
        arcStart={0}
        arcEnd={Math.PI}
        color="#2ea5f0" // Light blue - same as original
        rotationSpeed={0.01}
        initialRotation={{ x: 2.5, y: 0, z: 0 }}
        position={[0, 0, 0]} // Center position
      />

      {/* Middle arc - #1d4161 */}
      <CircularArc
        radius={1.0}  // Slightly reduced to prevent overflow
        thickness={0.18}
        height={0.18}
        arcStart={Math.PI / 4}
        arcEnd={5 * Math.PI / 4}
        color="#1d4161" // Dark blue - same as original
        rotationSpeed={-0.008}
        initialRotation={{ x: 2.4, y: 0, z: Math.PI / 4 }}
        position={[0, 0, 0]}
      />

      {/* Inner arc - #2ea5f0 */}
      <CircularArc
        radius={0.8}  // Slightly reduced to prevent overflow
        thickness={0.18}
        height={0.18}
        arcStart={Math.PI / 2}
        arcEnd={3 * Math.PI / 2}
        color="#2ea5f0" // Light blue - same as original
        rotationSpeed={0.013}
        initialRotation={{ x: 2.3, y: 0, z: Math.PI / 2 }}
        position={[0, 0, 0]}
      />

      {/* Lighting for better 3D effect */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#2ea5f0" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
    </>
  );
};

// Main AnimatedLogo component
const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  // Load 3D mode only when hovered for performance
  useEffect(() => {
    if (isHovered) {
      setIs3DLoaded(true);
    }
  }, [isHovered]);

  return (
    <div
      className={styles.logoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Original CSS-based lines (visible when not hovered) */}
      <div
        className={styles.linesContainer}
        style={{
          opacity: isHovered ? 0 : 1,
          // Set the visibility to hidden when not visible to improve performance
          visibility: isHovered ? "hidden" : "visible"
        }}
      >
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>

      {/* 3D Scene (visible on hover) */}
      {is3DLoaded && (
        <div
          className={styles.canvasContainer}
          style={{
            opacity: isHovered ? 1 : 0,
            // Keep the 3D scene rendered but invisible when not hovered
            visibility: isHovered ? "visible" : "hidden"
          }}
        >
          <Canvas
            camera={{
              position: [0, -1, 3.8],  // Moved camera slightly further out
              fov: 38,  // Decreased field of view to reduce edge distortion
              near: 0.1,
              far: 1000
            }}
            dpr={[1, 2]}
          >
            <AnimatedArcs isHovered={isHovered} />
          </Canvas>
        </div>
      )}

      {/* Center Arrow with up-down animation */}
      <div
        className={`${styles.centerArrow} ${isHovered ? styles.hovered : ""}`}
        style={{
          // Ensure the arrow is above the rings when hovered
          zIndex: isHovered ? 15 : 10
        }}
      >
        <Image
          src="/Navbar/arrow.png"
          alt="Connecting Dots Logo"
          width={180}
          height={180}
          priority={true}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;