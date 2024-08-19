import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
  return (
    <FooterContainer>
        <NavButton onClick = { ()=> navigate('/about-dev')}>About Dev</NavButton>
        <NavButton onClick = { ()=> navigate('/contact-us')}>Contact Us</NavButton>
        <NavButton onClick = { ()=> navigate('/feedback')}>Leave a Feedback</NavButton>
        <NavButton onClick = { ()=> window.location.href = '#'}>Privacy Policy</NavButton>
        <Copyrights>© 2024 Mohan's Crossword</Copyrights>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    position: fixed;
    bottom: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }
`;

const NavButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        text-decoration: underline;
        color: #ccc; /* Lighten the color on hover */
    }

    @media (max-width: 768px) {
        margin: 5px 0;
    }
`;

const Copyrights = styled.div`
    font-size: 0.9rem;
    text-align: right;
    margin: 0 10px;

    @media (max-width: 768px) {
        text-align: left;
        margin-top: 10px;
    }
`;