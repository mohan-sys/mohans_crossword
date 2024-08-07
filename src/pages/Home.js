import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';

const Home = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;