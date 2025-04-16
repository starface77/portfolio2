import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 600px;
  background: #000;
  position: relative;
`;

const ProjectCard = ({ position, title, description, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial color={color} />
        <Text
          position={[0, 0.5, 0.11]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        <Text
          position={[0, -0.5, 0.11]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {description}
        </Text>
      </mesh>
    </Float>
  );
};

const Portfolio3D = () => {
  const projects = [
    {
      title: "Web App",
      description: "React + Node.js",
      position: [-3, 0, 0],
      color: "#ff3333"
    },
    {
      title: "Mobile App",
      description: "React Native",
      position: [0, 0, 0],
      color: "#33ff33"
    },
    {
      title: "Desktop App",
      description: "Electron",
      position: [3, 0, 0],
      color: "#3333ff"
    }
  ];

  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </Canvas>
    </Container>
  );
};

export default Portfolio3D; 