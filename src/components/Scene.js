import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Text3D, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingText = ({ text, position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        position={position}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef();
  const count = 2000;
  
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }
    
    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  useFrame((state) => {
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
      />
      
      <ParticleField />
      
      <FloatingText 
        text="Портфолио" 
        position={[-2, 1, 0]} 
        color="#ff6b6b" 
      />
      <FloatingText 
        text="2024" 
        position={[2, -1, 0]} 
        color="#4ecdc4" 
      />
      
      <mesh position={[0, 0, -5]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial 
          color="#ff6b6b"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </>
  );
};

export default Scene; 