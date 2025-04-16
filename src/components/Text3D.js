import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const AnimatedText3D = ({ text, position, rotation, scale, color }) => {
  const meshRef = useRef();
  
  const [springs, api] = useSpring(() => ({
    position: position || [0, 0, 0],
    rotation: rotation || [0, 0, 0],
    scale: scale || 1,
    config: { mass: 1, tension: 170, friction: 26 }
  }));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <animated.mesh ref={meshRef} {...springs}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial color={color || "#ffffff"} />
        </Text3D>
      </Center>
    </animated.mesh>
  );
};

export default AnimatedText3D; 