import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer>
        <NavButton onClick = { ()=> window.location.href = '#'}>About Dev</NavButton>
        <NavButton onClick = { ()=> window.location.href = '#'}>Contact Us</NavButton>
        <NavButton onClick = { ()=> window.location.href = '#'}>Leave a Feedback</NavButton>
        <NavButton onClick = { ()=> window.location.href = '#'}>Privacy Policy</NavButton>
        <Copyrights>© 2024 Mohan's Crossword</Copyrights>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    position: fixed;
    bottom: 0;
`

const NavButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    curson: pointer;
    margin: 0 10px;
    &: hover {
        text-decoration: underline;
    }
`

const Copyrights = styled.div`
    font-size: 0.9 rem;
    text-align: right;
    margin: 0 10px;
`