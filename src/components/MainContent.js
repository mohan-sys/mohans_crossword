import React, { useState } from 'react';
import CrosswordGrid from './CrosswordGrid';
import styled from 'styled-components';

function MainContent() {
  const crosswordSets = [
    [
      // Set 1
      { word: 'WAVE', startX: 0, startY: 0, direction: 'across', clue: 'A disturbance that travels through space and matter' },
      { word: 'FIRE', startX: 0, startY: 2, direction: 'across', clue: 'A rapid oxidation process, releasing heat' },
      { word: 'EGG', startX: 0, startY: 4, direction: 'across', clue: 'An oval or round object laid by birds' },
      { word: 'MOON', startX: 0, startY: 6, direction: 'across', clue: 'A natural satellite of the Earth' },
      { word: 'BEAR', startX: 6, startY: 0, direction: 'down', clue: 'A large, heavy mammal with thick fur' },
      { word: 'TREE', startX: 8, startY: 0, direction: 'down', clue: 'A perennial plant with an elongated stem or trunk' },
      { word: 'RAIN', startX: 9, startY: 1, direction: 'down', clue: 'Water that falls from clouds in droplets' },
      { word: 'WIND', startX: 7, startY: 2, direction: 'down', clue: 'The perceptible natural movement of the air' }
    ],
    [
      // Set 2
      { word: 'SUN', startX: 0, startY: 0, direction: 'across', clue: 'The star at the center of our solar system' },
      { word: 'WATER', startX: 0, startY: 2, direction: 'across', clue: 'A colorless, transparent, odorless liquid' },
      { word: 'LION', startX: 0, startY: 4, direction: 'across', clue: 'A large wild animal of the cat family' },
      { word: 'EARTH', startX: 0, startY: 6, direction: 'across', clue: 'The planet we live on' },
      { word: 'TIGER', startX: 6, startY: 0, direction: 'down', clue: 'A large wild animal of the cat family with a yellow coat' },
      { word: 'LEAF', startX: 8, startY: 0, direction: 'down', clue: 'The green part of a plant that grows on a stem' },
      { word: 'SNOW', startX: 9, startY: 1, direction: 'down', clue: 'Frozen precipitation in the form of white flakes' },
      { word: 'BREEZE', startX: 7, startY: 2, direction: 'down', clue: 'A gentle wind' }
    ],
    [
      // Set 3
      { word: 'STAR', startX: 0, startY: 0, direction: 'across', clue: 'A massive, luminous sphere of plasma held together by gravity' },
      { word: 'OCEAN', startX: 0, startY: 2, direction: 'across', clue: 'A large body of salt water that covers most of the Earth' },
      { word: 'PANDA', startX: 0, startY: 4, direction: 'across', clue: 'A black-and-white bear-like mammal native to China' },
      { word: 'MARS', startX: 0, startY: 6, direction: 'across', clue: 'The fourth planet from the Sun' },
      { word: 'SHARK', startX: 6, startY: 0, direction: 'down', clue: 'A large, predatory fish known for its sharp teeth' },
      { word: 'FLOWER', startX: 8, startY: 0, direction: 'down', clue: 'The reproductive part of a flowering plant' },
      { word: 'CLOUD', startX: 9, startY: 1, direction: 'down', clue: 'A visible mass of condensed water vapor in the atmosphere' },
      { word: 'STORM', startX: 7, startY: 2, direction: 'down', clue: 'A violent disturbance of the atmosphere with strong winds' }
    ]
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [words, setWords] = useState(crosswordSets[currentSetIndex]);

  const loadNewGame = () => {
    const nextSetIndex = (currentSetIndex + 1) % crosswordSets.length;
    setCurrentSetIndex(nextSetIndex);
    setWords(crosswordSets[nextSetIndex]);
  };

  return (
    <MainContainer>
      <CrosswordGrid words={words} gridSize={10} />
      <ButtonContainer>
        <NewGameButton onClick={loadNewGame}>New Game</NewGameButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default MainContent;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const NewGameButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #007bff, #000);
  color: white;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #000);
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;