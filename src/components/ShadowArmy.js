import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ShadowArmyContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(10, 10, 46, 0.8) 0%, var(--primary-blue) 100%);
  overflow: hidden;
`;

const ArmyContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  z-index: 10;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  color: var(--gold);
  margin-bottom: 2rem;
  text-shadow: 
    0 0 10px var(--gold),
    0 0 20px var(--gold);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ShadowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ShadowSoldier = styled(motion.div)`
  background: rgba(83, 52, 131, 0.3);
  border: 2px solid var(--highlight-blue);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(83, 52, 131, 0.2), transparent);
    animation: shadowPulse 3s infinite;
  }
  
  @keyframes shadowPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }
`;

const SoldierIcon = styled.div`
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, var(--highlight-blue) 0%, transparent 70%);
  border-radius: 50%;
  margin: 0 auto 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background: var(--gold);
    border-radius: 50%;
    opacity: 0.8;
  }
`;

const SoldierName = styled.h3`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--silver);
  margin-bottom: 0.5rem;
`;

const SoldierPower = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  color: var(--gold);
  text-shadow: 0 0 5px var(--gold);
`;

const FloatingShadows = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingShadow = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, var(--highlight-blue) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(3px);
  opacity: 0.4;
`;

const ShadowArmy = ({ mousePosition }) => {
  const soldiers = [
    { name: "Shadow Knight", power: "S-Rank", id: 1 },
    { name: "Shadow Mage", power: "S-Rank", id: 2 },
    { name: "Shadow Archer", power: "S-Rank", id: 3 },
    { name: "Shadow Tank", power: "S-Rank", id: 4 },
    { name: "Shadow Assassin", power: "S-Rank", id: 5 },
    { name: "Shadow Healer", power: "S-Rank", id: 6 }
  ];

  const floatingShadows = [
    { x: 10, y: 20, size: 40, delay: 0 },
    { x: 80, y: 10, size: 60, delay: 1 },
    { x: 20, y: 80, size: 50, delay: 2 },
    { x: 90, y: 70, size: 30, delay: 3 },
    { x: 50, y: 30, size: 45, delay: 4 }
  ];

  const soldierVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <ShadowArmyContainer>
      <FloatingShadows>
        {floatingShadows.map((shadow, index) => (
          <FloatingShadow
            key={index}
            size={shadow.size}
            style={{
              left: `${shadow.x}%`,
              top: `${shadow.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay: shadow.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </FloatingShadows>

      <ArmyContent>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          SHADOW ARMY
        </SectionTitle>

        <ShadowGrid>
          {soldiers.map((soldier, index) => (
            <ShadowSoldier
              key={soldier.id}
              variants={soldierVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(83, 52, 131, 0.6)",
                transition: { duration: 0.3 }
              }}
              style={{
                x: (mousePosition.x - window.innerWidth / 2) * 0.015,
                y: (mousePosition.y - window.innerHeight / 2) * 0.015,
              }}
            >
              <SoldierIcon />
              <SoldierName>{soldier.name}</SoldierName>
              <SoldierPower>{soldier.power}</SoldierPower>
            </ShadowSoldier>
          ))}
        </ShadowGrid>
      </ArmyContent>
    </ShadowArmyContainer>
  );
};

export default ShadowArmy;
