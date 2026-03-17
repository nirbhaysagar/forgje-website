import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

interface CoreObjectProps {
  scrollProgress: MotionValue<number>;
}

const CubeSatPart = ({ 
  position, 
  rotation, 
  scale = [1, 1, 1], 
  color, 
  opacity = 1, 
  wireframe = false,
  children
}: any) => (
  <mesh position={position} rotation={rotation} scale={scale}>
    {children}
    <meshBasicMaterial 
      color={color} 
      transparent={opacity < 1}
      opacity={opacity} 
      wireframe={wireframe}
    />
  </mesh>
);

const CoreObject = ({ scrollProgress }: CoreObjectProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollProgress.get();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0.2, 0.8, s);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.2, s);
    }
  });

  // Scroll-driven offsets
  const s = scrollProgress.get();
  const explodeFactor = s * 3.5;
  const panelExplode = s * 2.5;
  const pcbSeparation = s * 1.5;

  return (
    <group ref={groupRef}>
      {/* Chassis - Corner Rails */}
      <group>
        {[
          [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]
        ].map((pos, i) => (
          <CubeSatPart 
            key={`rail-${i}`}
            position={[
              pos[0] * (0.6 + explodeFactor), 
              pos[1] * (0.6 + explodeFactor), 
              pos[2] * (0.6 + explodeFactor)
            ]}
            color="#444444"
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
          </CubeSatPart>
        ))}
        {/* Frame Connecting Sticks (simplified) */}
        <CubeSatPart 
          position={[0, 0.6 + explodeFactor, 0.6 + explodeFactor]}
          color="#333333"
        >
          <boxGeometry args={[1.2, 0.05, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, -(0.6 + explodeFactor), 0.6 + explodeFactor]}
          color="#333333"
        >
          <boxGeometry args={[1.2, 0.05, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, 0.6 + explodeFactor, -(0.6 + explodeFactor)]}
          color="#333333"
        >
          <boxGeometry args={[1.2, 0.05, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, -(0.6 + explodeFactor), -(0.6 + explodeFactor)]}
          color="#333333"
        >
          <boxGeometry args={[1.2, 0.05, 0.05]} />
        </CubeSatPart>
      </group>

      {/* Solar Panels */}
      <group>
        {/* Front/Back Panels */}
        <CubeSatPart 
          position={[0, 0, 0.65 + panelExplode]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, 0, -(0.65 + panelExplode)]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
        {/* Side Panels */}
        <CubeSatPart 
          position={[0.65 + panelExplode, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[-(0.65 + panelExplode), 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
        {/* Top/Bottom Panels */}
        <CubeSatPart 
          position={[0, 0.65 + panelExplode, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, -(0.65 + panelExplode), 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color="#1a3a6a"
          opacity={0.9}
        >
          <boxGeometry args={[1, 1, 0.05]} />
        </CubeSatPart>
      </group>

      {/* Internal PCB Stack */}
      <group>
        {[0, 1, 2].map((i) => (
          <group key={`pcb-${i}`} position={[0, (i - 1) * (0.3 + pcbSeparation), 0]}>
            <CubeSatPart 
              color="#1a5a2a"
              opacity={0.95}
            >
              <boxGeometry args={[0.8, 0.03, 0.8]} />
            </CubeSatPart>
            {/* Small components on PCB */}
            <CubeSatPart 
              position={[0.2, 0.05, 0.2]}
              color="#333333"
            >
              <boxGeometry args={[0.15, 0.1, 0.15]} />
            </CubeSatPart>
            <CubeSatPart 
              position={[-0.2, 0.05, -0.1]}
              color="#666666"
            >
              <cylinderGeometry args={[0.08, 0.08, 0.12]} />
            </CubeSatPart>
          </group>
        ))}
      </group>

      {/* Antennas */}
      <group>
        <CubeSatPart 
          position={[0, 0.6, 0.6]}
          rotation={[Math.PI / 4, 0, 0]}
          scale={[1, 1, 1 + s * 5]}
          color="#888888"
        >
          <cylinderGeometry args={[0.01, 0.01, 1]} />
        </CubeSatPart>
        <CubeSatPart 
          position={[0, -0.6, 0.6]}
          rotation={[-Math.PI / 4, 0, 0]}
          scale={[1, 1, 1 + s * 5]}
          color="#888888"
        >
          <cylinderGeometry args={[0.01, 0.01, 1]} />
        </CubeSatPart>
      </group>

      {/* Technical Glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5 * (1 - s)}
        color="#33ddff"
        distance={2}
      />
    </group>
  );
};

export default CoreObject;
