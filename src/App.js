import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Home from './pages/Home';
import Multiplayer from './pages/Multiplayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    

  return (
    <Router>
      <div className="App">
        <Routes>
     
            <Route path="/" element={<Home />} />
            <Route path="/multiplayer" element ={<Multiplayer /> } />
         
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
