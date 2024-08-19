import React from 'react';
import CrosswordGrid from './CrosswordGrid';
import styled from 'styled-components';

function MainContent() {

  const words = [
    // Across Words
    { word: 'WAVE', startX: 0, startY: 0, direction: 'across', clue: 'A disturbance that travels through space and matter' }, 
    { word: 'FIRE', startX: 0, startY: 2, direction: 'across', clue: 'A rapid oxidation process, releasing heat' }, 
    { word: 'EGG', startX: 0, startY: 4, direction: 'across', clue: 'An oval or round object laid by birds' }, 
    { word: 'MOON', startX: 0, startY: 6, direction: 'across', clue: 'A natural satellite of the Earth' }, 

    // Down Words (Placed to the right to avoid intersections)
    { word: 'BEAR', startX: 6, startY: 0, direction: 'down', clue: 'A large, heavy mammal with thick fur' }, 
    { word: 'TREE', startX: 8, startY: 0, direction: 'down', clue: 'A perennial plant with an elongated stem or trunk' }, 
    { word: 'RAIN', startX: 9, startY: 1, direction: 'down', clue: 'Water that falls from clouds in droplets' }, 
    { word: 'WIND', startX: 7, startY: 2, direction: 'down', clue: 'The perceptible natural movement of the air' } 
  ];
    
  return (
    <MainContainer>
       < CrosswordGrid words = {words} gridSize = {10}/>
    </MainContainer>
       
  )
}




export default MainContent

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 20px;
    }
`;