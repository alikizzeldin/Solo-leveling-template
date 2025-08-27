import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
`;

const CharacterImage = styled(motion.div)`
  width: 400px;
  height: 600px;
  position: relative;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    width: 300px;
    height: 450px;
  }
`;

const CharacterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px var(--glow-color));
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 4rem;
  font-weight: 900;
  color: var(--gold);
  text-shadow: 
    0 0 10px var(--gold),
    0 0 20px var(--gold),
    0 0 30px var(--gold);
  margin-bottom: 1rem;
  letter-spacing: 0.2em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--silver);
  text-shadow: 0 0 10px var(--silver);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ShadowText = styled(motion.span)`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--highlight-blue);
  text-shadow: 
    0 0 10px var(--highlight-blue),
    0 0 20px var(--highlight-blue);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatsPreview = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
  text-shadow: 0 0 10px var(--gold);
`;

const StatLabel = styled.div`
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: var(--silver);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(2px);
`;

const HeroSection = ({ mousePosition, isLoaded }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const characterVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const floatingOrbs = [
    { x: 10, y: 20, delay: 0 },
    { x: 80, y: 10, delay: 0.5 },
    { x: 20, y: 80, delay: 1 },
    { x: 90, y: 70, delay: 1.5 }
  ];

  return (
    <HeroContainer>
      <BackgroundElements>
        {floatingOrbs.map((orb, index) => (
          <FloatingOrb
            key={index}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </BackgroundElements>

      <HeroContent>
        <CharacterImage
          variants={characterVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          style={{
            x: (mousePosition.x - window.innerWidth / 2) * 0.05,
            y: (mousePosition.y - window.innerHeight / 2) * 0.05,
          }}
        >
          <CharacterImg src="/assets/sung jin woo.png" alt="Sung Jin Woo" />
        </CharacterImage>

        <TitleContainer>
          <MainTitle
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            SUNG JIN WOO
          </MainTitle>
          
          <Subtitle
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            THE SHADOW MONARCH
          </Subtitle>
          
          <ShadowText
            variants={titleVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            ARISE
          </ShadowText>
        </TitleContainer>

        <StatsPreview
          variants={titleVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <StatItem>
            <StatValue>∞</StatValue>
            <StatLabel>Shadows</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>S</StatValue>
            <StatLabel>Rank</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>100%</StatValue>
            <StatLabel>Win Rate</StatLabel>
          </StatItem>
        </StatsPreview>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
