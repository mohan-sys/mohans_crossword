import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Component>
        <nav>
            <NavList>
                <NavItem><StyledLink to="/">Home</StyledLink></NavItem>
                <NavItem><StyledLink to="/multiplayer">Multiplayer</StyledLink></NavItem>
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
  background-color: #f5f5f5; /* Light grey background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 0 1rem; /* Add padding for smaller screens */

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
  gap: 2rem; /* Increase gap for more modern spacing */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    gap: 1rem; /* Reduce gap on smaller screens */
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%; /* Make the items take full width on smaller screens */
  }
`;

const StyledLink = styled(Link)`
  color: #333; /* Dark grey text */
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none; 
  font-weight: 500; /* Slightly bolder text for emphasis */
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    color: #000; /* Change text to black on hover */
    background-color: #e0e0e0; /* Light grey background on hover */
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem; /* Increase padding on smaller screens */
    text-align: center;
    display: block;
    width: 100%; /* Ensure full width for better touch targets */
  }
`;
