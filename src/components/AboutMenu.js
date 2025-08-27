import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const MenuContainer = styled(motion.div)`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 20;
  pointer-events: none;
`;

const MenuTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TitleDot = styled.div`
  width: 12px;
  height: 12px;
  background: var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--gold);
`;

const TitleText = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: auto;
`;

const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? 'var(--gold)' : 'rgba(255, 255, 255, 0.7)'};
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  padding: 0.5rem 0;
  text-align: right;
  transition: all 0.15s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: ${props => props.active ? '8px' : '0px'};
    height: 2px;
    background: var(--gold);
    transition: width 0.15s ease;
  }
  
  &:hover {
    color: var(--gold);
    transform: translateX(-2px);
  }
`;

const AboutMenu = ({ activeSection, setActiveSection }) => {
  const { scrollYProgress } = useScroll();
  const menuItems = [
    'AFFILIATION',
    'STATUS', 
    'RELATIONSHIPS',
    'SKILLS',
    'TROOPS',
    'WEAPONS & EQS'
  ];

  // Transform values for the menu to follow scroll
  const menuY = useTransform(scrollYProgress, [0, 1], [-200, window.innerHeight - 100]);
  const menuOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0, 0, 1]);
  const menuScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <MenuContainer
      style={{ 
        y: menuY, 
        opacity: menuOpacity, 
        scale: menuScale 
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <MenuTitle>
        <TitleDot />
        <TitleText>ABOUT</TitleText>
      </MenuTitle>

      <MenuItems>
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            active={activeSection === item}
            onClick={() => setActiveSection(item)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuItems>
    </MenuContainer>
  );
};

export default AboutMenu;
