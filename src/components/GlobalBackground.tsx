import { Canvas } from "@react-three/fiber";
import Starfield from "./Starfield";
import BlackHole from "./BlackHole";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.2} color="#ffffff" />

        <BlackHole />
        <Starfield count={5000} />
      </Canvas>
    </div>
  );
};

export default GlobalBackground;
