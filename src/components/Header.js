import React from 'react';
import styled, {keyframes} from 'styled-components';

function Header() {
  return (
    <Component>
        <Title> Mohans' Crossword</Title>
    </Component>
  )
}

export default Header

const fadeInAndScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Component = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 8vh; 
  background: linear-gradient(90deg, #e0e0e0, #f5f5f5); 

  @media (max-width: 768px) {
    height: 10vh; 
  }

  @media (max-width: 480px) {
    height: 12vh; 
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333; 
  animation: ${fadeInAndScale} 1.5s ease-out;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Modern, clean font */

  @media (max-width: 768px) {
    font-size: 2rem; 
  }

  @media (max-width: 480px) {
    font-size: 1.5rem; 
  }
`;