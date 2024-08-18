import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactUs() {
  return (
    <ContactContainer>
        <Header />
        <NavBar />
      <h2>Contact Us</h2>
      <ContactList>
        <ContactItem>
          <h3>Mr. Mohan R Loganathan, B.E. ,M̅S̅c̅ (UK)</h3>
          <p>Email: mohan.loganathan.2024@uni.strath.ac.uk</p>
        </ContactItem>
        <ContactItem>
          <h3>Dr. Robert Atkey</h3>
          <p>Email: robert.atkey@strath.ac.uk</p>
        </ContactItem>
      </ContactList>
      <Footer />
    </ContactContainer>
  );
}

export default ContactUs;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
`;

const ContactList = styled.div`
  margin-top: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  h3 {
    margin-bottom: 10px;
  }
  p {
    margin: 0;
  }
`;