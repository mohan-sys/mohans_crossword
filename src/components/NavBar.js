import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Component>
        <nav>
            <NavList>
                <NavItem><StyledLink to="/">Home</StyledLink></NavItem>
                <NavItem><StyledLink to="/">New Game</StyledLink></NavItem>
                <NavItem><StyledLink to="/">Load Game</StyledLink></NavItem>
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
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
    gap: 1rem;
`;

const NavItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled(Link)`
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        text-decoration: underline;
    }
`;