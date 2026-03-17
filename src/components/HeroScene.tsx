import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import Starfield from "./Starfield";
import CoreObject from "./CoreObject";

interface HeroSceneProps {
  scrollProgress: MotionValue<number>;
}

const HeroScene = ({ scrollProgress }: HeroSceneProps) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[5, 5, 5]} intensity={0.15} color="#ffffff" />
        <pointLight position={[-5, -5, -3]} intensity={0.08} color="#cccccc" />
        <Starfield count={5000} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
