import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(83, 52, 131, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(192, 192, 192, 0.03) 0%, transparent 50%);
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.3;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(83, 52, 131, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`;

const BackgroundEffects = ({ mousePosition }) => {
  const orbs = [
    { x: 10, y: 20, size: 60, color: 'rgba(83, 52, 131, 0.4)', delay: 0 },
    { x: 85, y: 15, size: 40, color: 'rgba(255, 215, 0, 0.3)', delay: 2 },
    { x: 25, y: 75, size: 80, color: 'rgba(192, 192, 192, 0.2)', delay: 4 },
    { x: 75, y: 80, size: 50, color: 'rgba(83, 52, 131, 0.3)', delay: 6 },
    { x: 50, y: 50, size: 30, color: 'rgba(255, 215, 0, 0.2)', delay: 8 }
  ];

  return (
    <BackgroundContainer>
      <BackgroundGradient />
      
      {orbs.map((orb, index) => (
        <FloatingOrb
          key={index}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <GlowEffect
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </BackgroundContainer>
  );
};

export default BackgroundEffects;
