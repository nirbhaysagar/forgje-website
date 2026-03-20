import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLACKHOLE_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 n) {
    vec2 d = vec2(0, 1);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(hash(b), hash(b + d.yx), f.x), mix(hash(b + d.xy), hash(b + d.yy), f.x), f.y);
  }

  float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += noise(n) * amplitude;
      n *= 2.1;
      amplitude *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Core Parameters (Gargantua Style)
    float horizonSize = 0.35;
    float photonRingRadius = horizonSize * 1.15;
    
    // 1. Accretion Disk (Horizontal Plain)
    // We warp the vertical coordinate to simulate lensing
    float diskThickness = 0.035;
    float diskWarp = abs(uv.y) * (1.1 + 0.5 * radius);
    float diskDist = abs(radius - (0.55 + 0.15 * diskWarp));
    
    // Disk Noise & Texture
    float noiseCoord = angle * 2.5 + uTime * 0.45;
    float diskNoise = fbm(vec2(noiseCoord, radius * 8.0 - uTime * 0.25));
    float diskGlow = exp(-diskDist * 18.0) * (0.8 + 0.25 * diskNoise);
    
    // 2. Gravitational Lensing Halo (The Arcs above/below)
    // Primary lensing arc
    float lensFactor = 0.55;
    float lensArcDist = abs(radius - (lensFactor + 0.35 * abs(uv.x)));
    float lensGlow = exp(-lensArcDist * 12.0) * (0.5 + 0.2 * diskNoise) * smoothstep(0.1, 0.4, abs(uv.x));
    
    // 3. Combined Disk Intensity
    float totalGlow = max(diskGlow, lensGlow);
    
    // Edge of event horizon mask
    float eventHorizonMask = smoothstep(horizonSize, horizonSize + 0.015, radius);
    
    // 4. Photon Ring (Ultra-hot thin line)
    float photonRing = exp(-abs(radius - photonRingRadius) * 120.0) * 2.0;
    
    // 5. Colors (Cinematic Palette: White-Hot -> Vibrant Orange -> Deep Red)
    vec3 coreColor = vec3(1.0, 0.98, 0.9);    // White hot
    vec3 midColor = vec3(1.0, 0.65, 0.2);     // Vibrant Orange
    vec3 outerColor = vec3(0.9, 0.2, 0.05);   // Deep Red/Amber
    
    vec3 finalColor = midColor * totalGlow;
    finalColor = mix(finalColor, coreColor, pow(totalGlow, 3.5) * 0.8);
    finalColor = mix(finalColor, outerColor, pow(1.0 - totalGlow, 2.0) * 0.3 * totalGlow);
    
    // Add Photon Ring to final
    finalColor += coreColor * photonRing * eventHorizonMask;
    
    // Subtle inner haze (Event Horizon glow bleed)
    float haze = exp(-abs(radius - horizonSize) * 12.0) * 0.45;
    finalColor += midColor * haze * eventHorizonMask;

    // Background Dust/Nebula feel
    float dust = fbm(uv * 6.0 + uTime * 0.08) * 0.08 * totalGlow;
    finalColor += outerColor * dust;

    // Alpha/Softening
    float alpha = (totalGlow + photonRing + haze) * eventHorizonMask;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(finalColor * eventHorizonMask, alpha);
  }
`;

const BLACKHOLE_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BlackHole = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Update mouse uniforms (smoothen)
      const targetMouseX = state.mouse.x; // range [-1, 1]
      const targetMouseY = state.mouse.y;
      material.uniforms.uMouse.value.x += (targetMouseX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetMouseY - material.uniforms.uMouse.value.y) * 0.05;

      // Slow orbital rotation
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.015;

      // Massive floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[14, 14, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={BLACKHOLE_VERTEX_SHADER}
        fragmentShader={BLACKHOLE_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default BlackHole;
