import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StatsContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 46, 0.8) 100%);
`;

const StatsContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  z-index: 10;
`;

const StatCard = styled(motion.div)`
  background: rgba(22, 33, 62, 0.8);
  border: 2px solid var(--highlight-blue);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(83, 52, 131, 0.3),
    inset 0 0 20px rgba(83, 52, 131, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const StatTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 0 0 10px var(--gold);
`;

const StatValue = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  font-weight: 900;
  color: var(--highlight-blue);
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 0 15px var(--highlight-blue);
`;

const StatDescription = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: var(--silver);
  text-align: center;
  line-height: 1.6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--highlight-blue));
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: progressShimmer 2s infinite;
  }
  
  @keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const StatsSection = ({ mousePosition }) => {
  const stats = [
    {
      title: "Shadow Soldiers",
      value: "∞",
      description: "Infinite shadow army under his command. Each shadow retains the original's power and skills.",
      progress: 100
    },
    {
      title: "Mana Control",
      value: "S+",
      description: "Mastery over shadow magic and mana manipulation. Can create and control shadows at will.",
      progress: 95
    },
    {
      title: "Combat Power",
      value: "MAX",
      description: "Unmatched physical and magical combat abilities. Can defeat any opponent with ease.",
      progress: 100
    },
    {
      title: "Shadow Extraction",
      value: "100%",
      description: "Perfect success rate in extracting shadows from defeated enemies. No failure possible.",
      progress: 100
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  return (
    <StatsContainer>
      <StatsContent>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(83, 52, 131, 0.5)",
              transition: { duration: 0.3 }
            }}
            style={{
              x: (mousePosition.x - window.innerWidth / 2) * 0.01,
              y: (mousePosition.y - window.innerHeight / 2) * 0.01,
            }}
          >
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </ProgressBar>
            <StatDescription>{stat.description}</StatDescription>
          </StatCard>
        ))}
      </StatsContent>
    </StatsContainer>
  );
};

export default StatsSection;
