import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Feedback() {
  return (
    <PageContainer>
        <Header />
        <NavBar />
        <FeedbackContainer>
            <h2>Leave Your Feedback</h2>
            <p>We value your feedback! Please click the link below to fill out our feedback form:</p>
            <FeedbackLink href="https://strathsci.qualtrics.com/jfe/form/SV_2hPgH75huXJHn3U" target="_blank" rel="noopener noreferrer">
                Go to Feedback Form
            </FeedbackLink>
        </FeedbackContainer>
        <Footer />
    </PageContainer>
  );
}

export default Feedback;

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

const FeedbackContainer = styled.div`
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

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    animation: ${fadeInUp} 1.2s ease-out;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    animation: ${fadeInUp} 1.4s ease-out;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FeedbackLink = styled.a`
  padding: 10px 20px;
  background: linear-gradient(135deg, #007bff, #000); /* Blue to black gradient */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${fadeInUp} 1.6s ease-out;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #000); /* Darker blue to black on hover */
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;