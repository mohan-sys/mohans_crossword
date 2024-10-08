import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactUs() {
  return (
    <PageContainer>
        <Header />
        <NavBar />
        <ContactContainer>
            <h2>Contact Us</h2>
            <ContactList>
                <ContactItem>
                    <h3>Mr. Mohan R Loganathan</h3>
                    <p>Email: mohan.loganathan.2024@uni.strath.ac.uk</p>
                </ContactItem>
                <ContactItem>
                    <h3>Dr. Robert Atkey</h3>
                    <p>Email: robert.atkey@strath.ac.uk</p>
                </ContactItem>
            </ContactList>
        </ContactContainer>
        <Footer />
    </PageContainer>
  );
}

export default ContactUs;

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