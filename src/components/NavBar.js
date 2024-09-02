import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Component>
        <nav>
            <NavList>
                <NavItem><StyledLink to="/">Home</StyledLink></NavItem>
                <NavItem><StyledLink to="/">Single Player</StyledLink></NavItem>
                <NavItem><StyledLink to="/multiplayer">Online Multiplayer</StyledLink></NavItem>
            </NavList>
        </nav>
    </Component>
  )
}

export default NavBar;

const Component = styled.div`
  display: flex;
  text-align: center;
  height: 5vh;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  padding: 0 1rem;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  gap: 2rem; 

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 1rem; 
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

const StyledLink = styled(Link)`
  color: #333; /* Dark grey text */
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none; 
  font-weight: 500;
  transition: color 0.3s ease, background-color 0.3s ease; 

  &:hover {
    color: #000; 
    background-color: #e0e0e0;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem; 
    text-align: center;
    display: block;
    width: 100%; 
  }
`;
