import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 110px;
  width: auto;
  object-fit: contain;
  margin-top: 50px;
  margin-left: 20px;
`;



const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-left: 2rem;
  margin-top: 45px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-family: 'DragonForce', 'Arial', sans-serif;
  font-weight: normal;
  font-size: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: var(--gold);
    transform: translateY(-1px);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: border-color 0.2s ease;
  
  &:focus-within {
    border-color: var(--gold);
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 0.9rem;
  width: 150px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;



const SignUpButton = styled.button`
  background: linear-gradient(45deg, var(--gold), #ffed4e);
  color: #0a0a2e;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Navigation = () => {
  return (
    <NavContainer>
      <LogoSection>
        <Logo src="/assets/Logo.png" alt="Solo Leveling Logo" />
        <NavLinks>
          <NavLink>Home</NavLink>
          <NavLink>Characters</NavLink>
          <NavLink>Help</NavLink>
        </NavLinks>
      </LogoSection>

      <RightSection>
        <SearchContainer>
          <SearchInput placeholder="Search Here..." />
        </SearchContainer>
        <SignUpButton>Sign Up</SignUpButton>
      </RightSection>
    </NavContainer>
  );
};

export default Navigation;
