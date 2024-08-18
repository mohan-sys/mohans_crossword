import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutDev() {
  return (
    <div>
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
          <a href="https://github.com/mohan-sys" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Links>
      </DeveloperInfo>
    </AboutContainer>
    <Footer />
    </div>
  );
}

export default AboutDev;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  padding: 20px;
  padding-top: 60px;
`;

const DeveloperInfo = styled.div`
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }
`;

const Links = styled.div`
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;