import React from 'react';
import styled from 'styled-components';

function NavBar() {
  return (
    <Component>
        <nav>
            <NavList>
                <NavItem>Home</NavItem>
                <NavItem>New Game</NavItem>
                <NavItem>Load Game</NavItem>
                <NavItem>Multiplayer</NavItem>               
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

const NavItem = styled.li`
    cursor: pointer;
    &:hover {
        text-decoratiom: underline;
    }
`