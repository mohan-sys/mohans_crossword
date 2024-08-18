import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Multiplayer from './pages/Multiplayer';
import Feedback from './pages/Feedback';
import ContactUs from './pages/Conatct';
import AboutDev from './pages/AboutDev';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-dev" element = {<AboutDev />} />
      </Routes>
    </Router>
  );
}

export default App;