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
        <NavButton onClick = { ()=> navigate('/privacy-policy')}>Privacy Policy</NavButton>
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
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  position: relative;  
  bottom: 0;
  left: 0;
  height: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: auto;
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
    text-align: center;
    margin: 10px 0;
  }
`;