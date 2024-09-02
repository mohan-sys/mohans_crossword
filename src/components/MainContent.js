import React, { useState } from 'react';
import CrosswordGrid from './CrosswordGrid';
import styled from 'styled-components';

function MainContent() {
  const [gameIndex, setGameIndex] = useState(0);

  const crosswordSets = [
    [
      // First set of words
      { word: 'WAVE', startX: 1, startY: 1, direction: 'across', clue: 'A disturbance that travels through space and matter' },
      { word: 'FIRE', startX: 0, startY: 7, direction: 'across', clue: 'A rapid oxidation process, releasing heat' },
      { word: 'EGG', startX: 3, startY: 7, direction: 'down', clue: 'An oval or round object laid by birds' },
      { word: 'MOON', startX: 3, startY: 5, direction: 'across', clue: 'A natural satellite of the Earth' },
      { word: 'BEAR', startX: 4, startY: 0, direction: 'down', clue: 'A large, heavy mammal with thick fur' },
      { word: 'TREE', startX: 8, startY: 1, direction: 'down', clue: 'A perennial plant with an elongated stem or trunk' },
      { word: 'RAIN', startX: 9, startY: 5, direction: 'down', clue: 'Water that falls from clouds in droplets' },
      { word: 'WIND', startX: 6, startY: 3, direction: 'down', clue: 'The perceptible natural movement of the air' },
    ],
    [
      // Second set of words
      { word: 'SUN', startX: 0, startY: 0, direction: 'across', clue: 'The star at the center of our solar system' },
      { word: 'EARTH', startX: 3, startY: 2, direction: 'across', clue: 'The planet we live on' },
      { word: 'SEA', startX: 0, startY: 0, direction: 'down', clue: 'A large body of saltwater' },
      { word: 'WIND', startX: 5, startY: 8, direction: 'across', clue: 'Air in motion relative to the surface of the earth' },
      { word: 'MARS', startX: 4, startY: 1, direction: 'down', clue: 'The red planet' },
      { word: 'TREE', startX: 6, startY: 2, direction: 'down', clue: 'A perennial plant with an elongated stem or trunk' },
      { word: 'RAIN', startX: 9, startY: 1, direction: 'down', clue: 'Water that falls from clouds in droplets' },
      { word: 'BIRD', startX: 8, startY: 5, direction: 'down', clue: 'A warm-blooded egg-laying vertebrate animal' },
    ],
    [
      // Third set of words
      { word: 'STAR', startX: 0, startY: 2, direction: 'across', clue: 'A luminous point in the night sky' },
      { word: 'FIRE', startX: 3, startY: 0, direction: 'down', clue: 'A rapid oxidation process, releasing heat' },
      { word: 'EGG', startX: 0, startY: 4, direction: 'down', clue: 'An oval or round object laid by birds' },
      { word: 'MOON', startX: 6, startY: 8, direction: 'across', clue: 'A natural satellite of the Earth' },
      { word: 'PLANET', startX: 6, startY: 1, direction: 'down', clue: 'A celestial body orbiting a star' },
      { word: 'TREE', startX: 8, startY: 0, direction: 'down', clue: 'A perennial plant with an elongated stem or trunk' },
      { word: 'RAIN', startX: 9, startY: 5, direction: 'down', clue: 'Water that falls from clouds in droplets' },
      { word: 'WIND', startX: 4, startY: 4, direction: 'across', clue: 'The perceptible natural movement of the air' },
    ],
  ];

  const words = crosswordSets[gameIndex];

  const handleNewGame = () => {
    setGameIndex((prevIndex) => (prevIndex + 1) % crosswordSets.length);
  };

  return (
    <MainContainer>
      <ContentWrapper>
        
        <CrosswordGrid words={words} gridSize={10} />
        
        <BottomBox>
          <div>
            <p>Little tip:</p>
            <p>Click on the Hint and let it do the magic of taking you to the corresponding grid.</p>
            <p>Desktop users can effortlessly glide through the crossword by using the arrow keys to navigate between cells.</p>
          </div>
          <NewGameButton onClick={handleNewGame}>New Game</NewGameButton>
        </BottomBox>
      </ContentWrapper>
    </MainContainer>
  );
}

export default MainContent;

const BottomBox = styled.div`
  display: flex;
  
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewGameButton = styled.button`
  padding: 8px 16px;  
  height: 15px; 
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #c0c0c0, #808080);
  color: white;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  animation: fadeIn 1s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #a9a9a9, #696969);
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;