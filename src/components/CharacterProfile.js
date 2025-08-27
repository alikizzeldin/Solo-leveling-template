import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { animate } from 'animejs';

const ProfileContainer = styled.div`
  max-width: 600px;
`;

const RankSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const RankBadge = styled.div`
  background: linear-gradient(45deg, var(--gold), #ffed4e);
  color: #0a0a2e;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  }
`;

const RankText = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const TitleSection = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled(motion.h2)`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Name = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  margin: 0;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  transform-style: preserve-3d;
`;

const BioSection = styled(motion.div)`
  border: 1px solid rgba(83, 52, 131, 0.3);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  margin-top: 5rem;
`;

const BioParagraph = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CharacterProfile = () => {
  const { scrollYProgress } = useScroll();
  const bioRef = useRef(null);
  const rankRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  // Transform values for the name text to follow scroll
  const nameY = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * 0.8 + 4]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 1, 0.3]);
  
  // Transform values for the title text to follow scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [1, 0, 0, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, -30, -60, -90]);
  
  // Transform values for the bio section to follow scroll
  const bioOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 0, 0, 1]);
  const bioY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, -20, -40, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(currentScrollY / 300, 1); // Max effect at 300px scroll
      
      // Fade out components when scrolling down
      if (bioRef.current) {
        const targetOpacity = scrollDirection === 'down' ? 1 - scrollProgress : 1;
        animate(bioRef.current, {
          opacity: targetOpacity,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
      
      if (rankRef.current) {
        const targetOpacity = scrollDirection === 'down' ? 1 - scrollProgress : 1;
        animate(rankRef.current, {
          opacity: targetOpacity,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollDirection]);

  return (
    <ProfileContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <RankSection ref={rankRef}>
          <RankBadge>S</RankBadge>
          <RankText>RANK</RankText>
        </RankSection>

        <TitleSection>
          <Title style={{ opacity: titleOpacity, y: titleY }}>Shadow Monarch A.K.A</Title>
          <Name style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}>
            SUNG JIN WOO
          </Name>
        </TitleSection>

        <BioSection 
          ref={bioRef}
          style={{ opacity: bioOpacity, y: bioY }}
        >
          <BioParagraph>
            Sung Jin-Woo (성진우) is the protagonist of Solo Leveling. He was previously known as the World's Weakest Hunter and delved down the path of becoming the World's Strongest Hunter after he was Reawakened and became a Player.
          </BioParagraph>
          <BioParagraph>
            Jin-Woo was reawakened as a Player after surviving the Cartenon Temple and completing the secret quest "Courage of the Weak". The mysterious System has allowed Jin-Woo to limitless level up and increases his strength, unlike all hunters, who are unable to increase their strength unless reawakened.
          </BioParagraph>
        </BioSection>
      </motion.div>
    </ProfileContainer>
  );
};

export default CharacterProfile;
