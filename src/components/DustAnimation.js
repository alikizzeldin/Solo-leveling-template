import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const DustContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
`;

const DustParticle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(1px);
  opacity: ${props => props.opacity};
`;

const DustAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * 200 + 100, // Start from bottom
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: `rgba(${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 0.5 + 0.3})`,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          direction: Math.random() > 0.5 ? 1 : -1,
          amplitude: Math.random() * 100 + 50
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DustContainer>
      {particles.map((particle) => (
        <DustParticle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          opacity={particle.opacity}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0
          }}
          animate={{
            x: [
              particle.x,
              particle.x + particle.amplitude * particle.direction,
              particle.x - particle.amplitude * particle.direction,
              particle.x
            ],
            y: [
              particle.y,
              particle.y - 150,
              particle.y - 200,
              particle.y - 250
            ],
            opacity: [0, particle.opacity, particle.opacity * 0.7, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </DustContainer>
  );
};

export default DustAnimation;
