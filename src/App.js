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
            question: "The study of life and living organisms",
            answer: "Biology"
        },
        3: {
            question: "The force that attracts a body toward the center of the earth",
            answer: "Gravity"
        },
        5: {
            question: "The smallest particle of a chemical element that retains its chemical properties",
            answer: "Atom"
        },
        6: {
            question: "A large body of matter in space that orbits a star and does not produce light of its own",
            answer: "Planet"
        }
    },
    down: {
        1: {
            question: "A polygon with four equal sides and angles",
            answer: "Square"
        },
        2: {
            question: "The powerhouse of the cell",
            answer: "Mitochondria"
        },
        4: {
            question: "The process by which plants use sunlight to synthesize foods with the aid of chlorophyll",
            answer: "Photosynthesis"
        },
        5: {
            question: "The basic unit of a chemical element",
            answer: "Element"
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
