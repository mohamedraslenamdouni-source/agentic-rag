import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/assets/the_universe.glb')
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0003
      groupRef.current.rotation.y += 0.0006
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  )
}

function GradientBackground() {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0001
      meshRef.current.rotation.y += 0.0002
    }
  })

  return (
    <mesh ref={meshRef} scale={[500, 500, 500]} position={[0, 0, -100]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        side={THREE.BackSide}
        emissive="#3d3d5c"
        emissiveIntensity={1.2}
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3d3d5c 0%, #5a4a7a 50%, #3d4d66 100%)' }}
      camera={{ position: [0, 0, 30], fov: 50 }}
      gl={{ 
        antialias: true, 
        toneMapping: THREE.ACESFilmicToneMapping, 
        toneMappingExposure: 2.0,
        alpha: true
      }}
    >
      {/* Gradient Background Sphere */}
      <GradientBackground />

      {/* Rich Ambient Lighting - Highly Increased */}
      <ambientLight intensity={1.8} color="#e8dcc8" />

      {/* CORE BRIGHT LIGHT - Intense Central Glow */}
      <pointLight 
        position={[0, 0, 10]} 
        intensity={3.5} 
        color="#ffffff" 
        distance={300} 
        decay={0.5}
      />

      {/* Primary Warm Golden Light - Main Illumination */}
      <pointLight 
        position={[20, 15, 10]} 
        intensity={3.2} 
        color="#ffd4a3" 
        distance={280} 
        decay={0.8}
      />

      {/* Secondary Warm Light - Fill Light */}
      <pointLight 
        position={[-15, 10, -20]} 
        intensity={2.5} 
        color="#f4d3a8" 
        distance={220} 
        decay={0.9}
      />

      {/* Directional Light - Key Light */}
      <directionalLight 
        position={[15, 20, 10]} 
        intensity={2.8} 
        color="#fff5e6"
      />

      {/* Front Accent Light - Bright */}
      <pointLight 
        position={[0, 5, 15]} 
        intensity={2.5} 
        color="#ffffff" 
        distance={200} 
        decay={1.0}
      />

      {/* Accent Light - Rim/Edge Light */}
      <pointLight 
        position={[0, -20, 5]} 
        intensity={2.0} 
        color="#f0e6d2" 
        distance={180} 
        decay={1.1}
      />

      {/* Warm Top Light */}
      <pointLight 
        position={[0, 30, 0]} 
        intensity={2.2} 
        color="#ffebd6" 
        distance={200}
      />

      {/* Back Light - Separation */}
      <pointLight 
        position={[-20, -10, -15]} 
        intensity={1.5} 
        color="#dcc9b6" 
        distance={150}
      />

      {/* Upper Left Bright Light */}
      <pointLight 
        position={[25, 25, 5]} 
        intensity={2.0} 
        color="#fffacd" 
        distance={200} 
        decay={0.9}
      />

      {/* Lower Right Bright Light */}
      <pointLight 
        position={[-25, -15, -10]} 
        intensity={1.8} 
        color="#ffffff" 
        distance={180} 
        decay={1.0}
      />

      {/* Background Stars - Warm White */}
      <Stars 
        radius={400} 
        depth={250} 
        count={2000} 
        factor={10} 
        saturation={0.15} 
        fade 
        speed={0.08} 
      />

      {/* 3D Model */}
      <Suspense fallback={<LoadingFallback />}>
        <Model />
      </Suspense>

      {/* Interactive Controls */}
      <OrbitControls 
        enableZoom={true} 
        autoRotate={true} 
        autoRotateSpeed={0.5} 
        enablePan={true}
        enableRotate={true}
      />
    </Canvas>
  )
}
