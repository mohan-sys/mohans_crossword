import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutDev() {
  return (
    <PageContainer>
      <Header />
      <NavBar />
      <AboutContainer>
        <h2>About the Developer</h2>
        <DeveloperInfo>
          <h3>Mohan R Loganathan</h3>
          <p>Full Stack Developer with a passion for creating interactive web applications.</p>
          <Links>
            <a href="https://www.linkedin.com/in/mohanrajloganathan/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            
          </Links>
        </DeveloperInfo>
      </AboutContainer>
      <Footer />
    </PageContainer>
  );
}

export default AboutDev;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DeveloperInfo = styled.div`
  margin-top: 20px;
  max-width: 600px;
  width: 100%;
  animation: ${fadeInUp} 1.2s ease-out;

  h3 {
    margin-bottom: 10px;
    font-size: 1.8rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin-bottom: 20px;
    font-size: 1.2rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1.4s ease-out;

  a {
    margin: 10px;
    text-decoration: none;
    color: #007bff;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    &:hover {
      text-decoration: underline;
      color: #0056b3;
    }
  }
`;