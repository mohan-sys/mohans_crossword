import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {

    const crossword = {
        across: {
            1: {
                question: "The substance that forms clouds",
                answer: "WATER"
            },
            5: {
                question: "The hot stuff inside a volcano",
                answer: "LAVA"
            },
            6: {
                question: "The yellow part of an egg",
                answer: "YOLK"
            },
            7: {
                question: "Opposite of cold",
                answer: "WARM"
            },
            8: {
                question: "The planet we live on",
                answer: "EARTH"
            }
        },
        down: {
            1: {
                question: "Large body of saltwater",
                answer: "OCEAN"
            },
            2: {
                question: "Shiny red fruit",
                answer: "APPLE"
            },
            3: {
                question: "The gas we breathe",
                answer: "OXYGEN"
            },
            4: {
                question: "The force that pulls us down",
                answer: "GRAVITY"
            },
            5: {
                question: "To look at something closely",
                answer: "SEE"
            },
            6: {
                question: "The liquid part of blood",
                answer: "PLASMA"
            }
        }
    };

  return (
    <div className="App">
      < Header/>
      < NavBar />
      <MainContent crossword={crossword} />
      < Footer />
    </div>
  );
}

export default App;
