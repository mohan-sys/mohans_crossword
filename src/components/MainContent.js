import React from 'react';
import styled from 'styled-components';
import CrosswordGrid from './CrosswordGrid';

function MainContent() {

  const words = [
    { word: 'BIOLOGY', startX: 0, startY: 0, direction: 'across', clue: 'Study of living organisms' },
    { word: 'GRAVITY', startX: 2, startY: 2, direction: 'across', clue: 'Force that attracts a body toward the center of the earth' },
    { word: 'ATOM', startX: 4, startY: 4, direction: 'across', clue: 'Basic unit of a chemical element' },
    { word: 'PLANET', startX: 6, startY: 6, direction: 'across', clue: 'A celestial body moving in an elliptical orbit around a star' },
    { word: 'SQUARE', startX: 0, startY: 0, direction: 'down', clue: 'A shape with four equal straight sides and four right angles' },
    { word: 'MITOCHONDRIA', startX: 1, startY: 1, direction: 'down', clue: 'Powerhouse of the cell' },
    { word: 'PHOTOSYNTHESIS', startX: 3, startY: 3, direction: 'down', clue: 'Process by which green plants use sunlight to synthesize foods' },
    { word: 'ELEMENT', startX: 5, startY: 5, direction: 'down', clue: 'A substance that cannot be broken down into simpler substances' }
];
    
  return (
        < CrosswordGrid words = {words} gridSize = {10}/>
  )
}




export default MainContent

const Container = styled.div`
    width = 100vw;
    height = 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    padding-bottom: 29px;
`