import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  return (
    <PageContainer>
        <Header />
        <NavBar />
        <ContactContainer>
            <h2>Privacy Policy</h2>
            <ContactList>
                <ContactItem>
                <p>
                  My name is Mr. Mohan Raj Loganathan and I am a MSc Advanced Computer Science student at the
                  Department of Computer and Information Sciences at the University of Strathclyde. I am leading a
                  dissertation project focused on singleplayer and multiplayer crossword based web-app.   
                </p>
                <p>
                  This study's purpose is to learn from the knowledge, expertise and insight of various professional
                  stakeholders to help identify key user requirements for the web application's development. The online
                  form (the only form of data collection) helps to clearly understand the needs and responses of the
                  users after playing the crossword game. The feedback received from the user will be useful in fixing
                  bugs and developing changes in the application to create a better version of the existing application.
                </p>
                </ContactItem>
            </ContactList>
        </ContactContainer>
        <Footer />
    </PageContainer>
  );
}

export default PrivacyPolicy;

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

const ContactContainer = styled.div`
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

const ContactList = styled.div`
  margin-top: 20px;
  animation: ${fadeInUp} 1.2s ease-out;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  animation: ${fadeInUp} 1.4s ease-out;

  h3 {
    margin-bottom: 10px;
    font-size: 1.8rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 0;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;