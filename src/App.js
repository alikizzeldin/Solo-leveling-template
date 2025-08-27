import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { animate } from 'animejs';
import Navigation from './components/Navigation';
import CharacterProfile from './components/CharacterProfile';
import AboutMenu from './components/AboutMenu';

const AppContainer = styled.div`
  min-height: 100vh;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  overflow-x: hidden;
  perspective: 1000px; /* Add 3D perspective */
  position: relative;
`;

const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  position: relative;
`;

const LeftPanel = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const RightPanel = styled(motion.div)`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  perspective: 1200px; /* Stronger perspective for 3D effect */
`;

const CharacterVisual = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d; /* Preserve 3D transforms */
  overflow: hidden; /* Prevent character from affecting layout */
`;

const CharacterImage = styled(motion.img)`
  height: 100vh;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(1px 0 0 #000) 
          drop-shadow(-1px 0 0 #000) 
          drop-shadow(0 1px 0 #000) 
          drop-shadow(0 -1px 0 #000);
  max-width: none;
  transition: filter 0.3s ease;
  transform: translateZ(0) rotateX(0deg) rotateY(0deg); /* Initial 3D transform */
  transform-style: preserve-3d; /* Preserve 3D for child elements */
  position: absolute; /* Position absolutely to prevent layout shifts */
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`;

const Particle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(1px);
  animation: float 6s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) scale(1);
      opacity: 0.2;
    }
    50% { 
      transform: translateY(-30px) scale(1.1);
      opacity: 0.6;
    }
  }
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0.8;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
`;

const SecondSlideVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.8;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
`;

const SecondSlide = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const SlideContent = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const CharacterImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SonJinImage = styled(motion.img)`
  height: 100vh;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(1px 0 0 #808080) 
          drop-shadow(-1px 0 0 #808080) 
          drop-shadow(0 1px 0 #808080) 
          drop-shadow(0 -1px 0 #808080);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ShirtLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: auto;
  z-index: 10;
  pointer-events: none;
  filter: grayscale(1) brightness(1.2) contrast(0.8)
          drop-shadow(0 0 2px rgba(192, 192, 192, 0.8))
          drop-shadow(0 0 4px rgba(192, 192, 192, 0.6))
          drop-shadow(0 0 6px rgba(192, 192, 192, 0.4))
          drop-shadow(0 0 8px rgba(192, 192, 192, 0.3));
  transition: transform 0.3s ease;
  animation: logoGlow 2s ease-in-out infinite alternate;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    filter: grayscale(1) brightness(1.2) contrast(0.8)
            drop-shadow(0 0 3px rgba(192, 192, 192, 0.9))
            drop-shadow(0 0 6px rgba(192, 192, 192, 0.7))
            drop-shadow(0 0 9px rgba(192, 192, 192, 0.5))
            drop-shadow(0 0 12px rgba(192, 192, 192, 0.4));
  }
  
  @keyframes logoGlow {
    0% {
      filter: grayscale(1) brightness(1.2) contrast(0.8)
              drop-shadow(0 0 2px rgba(192, 192, 192, 0.8))
              drop-shadow(0 0 4px rgba(192, 192, 192, 0.6))
              drop-shadow(0 0 6px rgba(192, 192, 192, 0.4))
              drop-shadow(0 0 8px rgba(192, 192, 192, 0.3));
    }
    100% {
      filter: grayscale(1) brightness(1.2) contrast(0.8)
              drop-shadow(0 0 3px rgba(192, 192, 192, 0.9))
              drop-shadow(0 0 6px rgba(192, 192, 192, 0.7))
              drop-shadow(0 0 9px rgba(192, 192, 192, 0.5))
              drop-shadow(0 0 12px rgba(192, 192, 192, 0.4));
    }
  }
`;

const StatusPanel = styled(motion.div)`
  flex: 1;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #333333 50%, #1a1a1a 75%, #000000 100%);
  border: 1px solid rgba(255, 255, 0, 0.3);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const StatusTitle = styled.h2`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--gold);
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px var(--gold);
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatusItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(255, 255, 0, 0.2);
  }
`;

const StatusValue = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px var(--gold);
`;

const StatusLabel = styled.div`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

function App() {
  const [activeSection, setActiveSection] = useState('AFFILIATION');
  const characterRef = useRef(null);
  const animationRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight / 2;
    };

    // Start the animation loop with enhanced 3D effects
    const animateCharacter = () => {
      if (characterRef.current) {
        const deltaX = (mouseX - centerX) * 0.03;
        const deltaY = (mouseY - centerY) * 0.02;
        
        // Calculate 3D rotation based on mouse position
        const rotateY = deltaX * 0.8; // Horizontal rotation
        const rotateX = -deltaY * 0.4; // Vertical rotation (inverted for natural feel)
        
        // Calculate depth effect based on distance from center
        const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const translateZ = distanceFromCenter * 0.1; // Depth effect
        
        // Calculate scale based on distance for depth perception
        const scale = 1 + (distanceFromCenter * 0.0001);
        
        // Use anime.js for smooth 3D movement
        animate(characterRef.current, {
          translateX: deltaX,
          translateY: deltaY,
          translateZ: translateZ,
          rotateX: rotateX,
          rotateY: rotateY,
          scale: scale,
          duration: 1000,
          easing: 'easeOutCubic'
        });
      }
      requestAnimationFrame(animateCharacter);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animateCharacter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateParticles = () => {
    const particles = [];
    // Only 2 particles for maximum performance
    for (let i = 0; i < 2; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: `hsl(${Math.random() * 30 + 15}, 100%, 60%)`,
        delay: Math.random() * 3
      });
    }
    return particles;
  };

  // Scroll transforms for first slide components
  const firstCharacterOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0, 0, 0]);
  const firstCharacterScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0.4]);
  const firstCharacterY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -50, -100, -150]);
  const shadowMonarchOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [1, 0, 0, 0]);
  const shadowMonarchY = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, -30, -60, -90]);
  
  // Scroll transforms for second slide components
  const secondSlideOpacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 1, 1]);
  const secondSlideY = useTransform(scrollYProgress, [0.5, 0.8, 1], [100, 0, 0]);
  const characterImageOpacity = useTransform(scrollYProgress, [0.6, 0.9, 1], [0, 1, 1]);
  const characterImageScale = useTransform(scrollYProgress, [0.6, 0.9, 1], [0.8, 1, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.65, 0.85, 0.9, 1], [0, 1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0.65, 0.85, 0.9, 1], [0.7, 1, 1, 0.7]);
  const logoY = useTransform(scrollYProgress, [0.65, 0.85, 0.9, 1], [30, 0, 0, -30]);
  const statusPanelOpacity = useTransform(scrollYProgress, [0.7, 0.95, 1], [0, 1, 1]);
  const statusPanelY = useTransform(scrollYProgress, [0.7, 0.95, 1], [50, 0, 0]);

  return (
    <AppContainer>
      <VideoBackground 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        poster="/assets/BG.png"
      >
        <source src="/assets/BG.mp4" type="video/mp4" />
      </VideoBackground>
      <Navigation />
      
      <MainContent>
        <LeftPanel
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CharacterProfile />
        </LeftPanel>

        <RightPanel
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <CharacterVisual>
            <CharacterImage 
              ref={characterRef}
              src="/assets/sung jin woo.png" 
              alt="Sung Jin Woo"
              style={{ 
                opacity: firstCharacterOpacity, 
                scale: firstCharacterScale, 
                y: firstCharacterY 
              }}
            />
            
            <ParticleContainer>
              {generateParticles().map((particle) => (
                <Particle
                  key={particle.id}
                  color={particle.color}
                  delay={particle.delay}
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`
                  }}
                />
              ))}
            </ParticleContainer>
          </CharacterVisual>
          
          <AboutMenu 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />
        </RightPanel>
      </MainContent>

      <SecondSlide>
        <SecondSlideVideo 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster="/assets/BG.png"
        >
          <source src="/assets/BG.mp4" type="video/mp4" />
        </SecondSlideVideo>
        <SlideContent style={{ opacity: secondSlideOpacity, y: secondSlideY }}>
          <CharacterImageContainer>
            <SonJinImage 
              src="/assets/son jing.png" 
              alt="Son Jin"
              style={{ opacity: characterImageOpacity, scale: characterImageScale }}
            />
            <ShirtLogo 
              src="/assets/Logo.png" 
              alt="Solo Leveling Logo"
              style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
            />
          </CharacterImageContainer>
          
          <StatusPanel
            style={{ opacity: statusPanelOpacity, y: statusPanelY }}
          >
            <StatusTitle>STATUS</StatusTitle>
            <StatusGrid>
              <StatusItem>
                <StatusValue>SSS</StatusValue>
                <StatusLabel>Rank</StatusLabel>
              </StatusItem>
              <StatusItem>
                <StatusValue>∞</StatusValue>
                <StatusLabel>Power</StatusLabel>
              </StatusItem>
              <StatusItem>
                <StatusValue>100%</StatusValue>
                <StatusLabel>Win Rate</StatusLabel>
              </StatusItem>
              <StatusItem>
                <StatusValue>999</StatusValue>
                <StatusLabel>Level</StatusLabel>
              </StatusItem>
              <StatusItem>
                <StatusValue>S+</StatusValue>
                <StatusLabel>Class</StatusLabel>
              </StatusItem>
              <StatusItem>
                <StatusValue>MAX</StatusValue>
                <StatusLabel>Potential</StatusLabel>
              </StatusItem>
            </StatusGrid>
          </StatusPanel>
        </SlideContent>
      </SecondSlide>
    </AppContainer>
  );
}

export default App;
