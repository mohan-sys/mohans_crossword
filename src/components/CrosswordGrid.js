import React from 'react';
import styled from 'styled-components';

function CrosswordGrid({crossword}) {

    const gridSize = 10;

    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

    const placeWord = (word, startX, startY, direction) => {
        for(let i = 0; i < word.length; i++){
            if(direction === 'across'){
                if(startX + i < gridSize){
                    grid[startY][startX + i] = word[i];
                }
            }
            else if(direction === 'down') {
                if (startY + i < gridSize) {
                    grid[startY + i][startX] = word[i];
                }
            }
        }
    };

    placeWord('BIOLOGY', 0, 0, 'across');
    placeWord('GRAVITY', 2, 2, 'across');
    placeWord('ATOM', 4, 4, 'across');
    placeWord('PLANET', 6, 6, 'across');
    placeWord('SQUARE', 0, 0, 'down');
    placeWord('MITOCHONDRIA', 1, 1, 'down');
    placeWord('PHOTOSYNTHESIS', 3, 3, 'down');
    placeWord('ELEMENT', 5, 5, 'down');

  return (
    <Container>       
            <CrosswordGrid1>
                {grid.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <GridCell key = {`${rowIndex}-${cellIndex}`} filled = {cell !== null}>
                            {cell}
                        </GridCell>
                    ))
                ))}
            </CrosswordGrid1>     
    </Container>
  )
}

export default CrosswordGrid

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

/* const CenterBox = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    width: 60%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: black;
`; */

const CrosswordGrid1 = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 40px);
    grid-template-rows: repeat(10, 40px);
    gap: 1px;
`

const GridCell = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background-color: ${props => props.filled ? '#fff' : '#ccc'};
`
