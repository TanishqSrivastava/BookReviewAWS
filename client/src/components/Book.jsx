import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import Page from './Page';

const Book = ({ searchResults }) => {
  const groupRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // Load textures
  const coverTexture = useLoader(TextureLoader, '/textures/cover.jpg');
  const pageTexture = useLoader(TextureLoader, '/textures/page.jpg');

  // Spring for opening animation
  const { rotation } = useSpring({
    rotation: isOpen ? [0, Math.PI / 2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Trigger opening after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // Start opening after 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <animated.group ref={groupRef} rotation={rotation}>
      {/* Book Cover */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial map={coverTexture} />
      </mesh>

      {/* Book Pages */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Pages Content */}
      {isOpen && (
        <>
          {/* Left Page */}
          <Page
            position={[-0.45, 0, 0]}
            content={searchResults[0] || 'No Title'}
            texture={pageTexture}
          />
          {/* Right Page */}
          <Page
            position={[0.45, 0, 0]}
            content={searchResults[1] || ''}
            texture={pageTexture}
          />
        </>
      )}
    </animated.group>
  );
};

export default Book;
