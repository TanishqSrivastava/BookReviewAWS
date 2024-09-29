import React from 'react';
import { Html } from '@react-three/drei';

const Page = ({ position, content, texture }) => {
  return (
    <group position={position}>
      {/* Page Background */}
      <mesh>
        <planeGeometry args={[0.9, 1.4]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Page Content */}
      <Html
        position={[0, 0, 0.01]} // Slightly above the page to prevent z-fighting
        transform
        occlude
        distanceFactor={1.5}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '5px',
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.2em', margin: 0 }}>{content}</p>
        </div>
      </Html>
    </group>
  );
};

export default Page;
