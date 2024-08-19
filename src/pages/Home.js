import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import styled from 'styled-components';

const Home = () => {
    return (
      <HomeContainer>
        <Header />
        <NavBar />
        <ContentWrapper>
          <MainContent />
        </ContentWrapper>
        <Footer />
      </HomeContainer>
    );
  };
  
  export default Home;
  
  const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  flex: 1;

`;