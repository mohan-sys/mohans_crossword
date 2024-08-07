import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Component>
        <nav>
            <NavList>
                <NavItem><Link to="/">Home</Link></NavItem>
                <NavItem><Link to="/">New Game</Link></NavItem>
                <NavItem><Link to="/">Load Game</Link></NavItem>
                <NavItem><Link to="/multiplayer">Multiplayer</Link></NavItem>             
            </NavList>
        </nav>
    </Component>
  )
}

export default NavBar

const Component = styled.div`
    display: flex;
    text-align: center;
    height: 5vh;
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
`

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
    gap: 1rem;
`

const NavItem = styled(Link)`
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        text-decoration: none; 
    }
`;