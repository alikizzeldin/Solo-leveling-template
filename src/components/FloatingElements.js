import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FloatingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.background};
  border-radius: ${props => props.borderRadius};
  filter: blur(${props => props.blur}px);
  opacity: ${props => props.opacity};
  box-shadow: ${props => props.shadow};
`;

const ShadowOrb = styled(FloatingElement)`
  background: radial-gradient(circle, var(--highlight-blue) 0%, transparent 70%);
  box-shadow: 0 0 20px var(--highlight-blue);
`;

const GoldSpark = styled(FloatingElement)`
  background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
  box-shadow: 0 0 15px var(--gold);
`;

const SilverMist = styled(FloatingElement)`
  background: radial-gradient(circle, var(--silver) 0%, transparent 70%);
  box-shadow: 0 0 10px var(--silver);
`;

const FloatingElements = ({ mousePosition }) => {
  const elements = [
    {
      id: 1,
      type: 'shadow',
      x: 15,
      y: 25,
      size: 80,
      opacity: 0.4,
      blur: 3,
      delay: 0
    },
    {
      id: 2,
      type: 'gold',
      x: 85,
      y: 15,
      size: 40,
      opacity: 0.6,
      blur: 2,
      delay: 0.5
    },
    {
      id: 3,
      type: 'silver',
      x: 25,
      y: 75,
      size: 60,
      opacity: 0.3,
      blur: 4,
      delay: 1
    },
    {
      id: 4,
      type: 'shadow',
      x: 75,
      y: 80,
      size: 100,
      opacity: 0.5,
      blur: 5,
      delay: 1.5
    },
    {
      id: 5,
      type: 'gold',
      x: 50,
      y: 50,
      size: 30,
      opacity: 0.7,
      blur: 1,
      delay: 2
    }
  ];

  const getElementComponent = (type) => {
    switch (type) {
      case 'shadow':
        return ShadowOrb;
      case 'gold':
        return GoldSpark;
      case 'silver':
        return SilverMist;
      default:
        return FloatingElement;
    }
  };

  return (
    <FloatingContainer>
      {elements.map((element) => {
        const ElementComponent = getElementComponent(element.type);
        
        return (
          <ElementComponent
            key={element.id}
            size={element.size}
            opacity={element.opacity}
            blur={element.blur}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              x: (mousePosition.x - window.innerWidth / 2) * 0.02,
              y: (mousePosition.y - window.innerHeight / 2) * 0.02,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [element.opacity, element.opacity * 1.5, element.opacity],
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </FloatingContainer>
  );
};

export default FloatingElements;
