import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {

    

  return (
    <div className="App">
      < Header/>
      < NavBar />
      <MainContent  />
      < Footer />
    </div>
  );
}

export default App;
