import React, { useState } from 'react';
import styled from 'styled-components';

function CrosswordGrid({ words, gridSize }) {

    const [grid, setGrid] = useState(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(''))
    );

    const [highlightedCells, setHighlightedCells] = useState([]);

    const cellNumbers = {};
    const acrossClues = [];
    const downClues = [];

    let nextNumber = 1;

    words.forEach(({word, startX, startY, direction, clue}) => {
        const cellKey = `${startY}-${startX}`;

        if(!cellNumbers[cellKey]){
            cellNumbers[cellKey] = nextNumber++;
        }

        const number = cellNumbers[cellKey];

        if( direction === 'across'){
            acrossClues.push({number, clue, word, startX, startY});
        }
        else {
            downClues.push({number, clue, word, startX, startY});
        }
    });
    
    const handleInputChange = (e, rowIndex, colIndex) => {
        const value = e.target.value.toUpperCase();
        if (value.length > 1) return;

        const newGrid = grid.map(row => row.slice());
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);

        const currentIndex = highlightedCells.indexOf(`${rowIndex}-${colIndex}`);
        if (currentIndex !== -1 && currentIndex < highlightedCells.length -1){
            const [nextRowIndex, nextColIndex] = highlightedCells[currentIndex +1].split('-').map(Number);
            const nextInput = document.querySelector(`input[data-row = "${nextRowIndex}"][data-col = "${nextColIndex}"]`);
            if (nextInput){
                nextInput.focus();
            }
        }
    };

    const handleClueClick = (direction, startX, startY, word) => {
        const newHighlightedCells = [];
        if (direction === 'across'){
            for(let i=0; i< word.length; i++){
                newHighlightedCells.push(`${startY}-${startX +i}`);
            }
        }
        else {
            for(let i=0;i< word.length; i++){
                newHighlightedCells.push(`${startY+i}-${startX}`)
            }
        }
        setHighlightedCells(newHighlightedCells);
    }

    const isCellEditable = (rowIndex, colIndex) => {
        return words.some(({ word, startX, startY, direction }) => {
            if (direction === 'across') {
                return rowIndex === startY && colIndex >= startX && colIndex < startX + word.length;
            } else {
                return colIndex === startX && rowIndex >= startY && rowIndex < startY + word.length;
            }
        });
    };

    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <Row key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <GridCell 
                        key={colIndex} 
                        filled={cell !== ''} 
                        number={cellNumbers[`${rowIndex}-${colIndex}`]}
                        highlighted = {highlightedCells.includes(`${rowIndex}-${colIndex}`)}
                    >
                        {cellNumbers[`${rowIndex}-${colIndex}`] && (
                            <CellNumber>{cellNumbers[`${rowIndex}-${colIndex}`]}</CellNumber>
                        )}
                        <CellInput
                            value={cell}
                            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                            disabled={!isCellEditable(rowIndex, colIndex)}
                            maxLength={1}
                            data-row = {rowIndex}
                            data-col = {colIndex}
                        />
                    </GridCell>
                ))}
            </Row>
        ));
    };

    return (
        <Container>
            <CluesContainer>
                <CluesList>
                    <h3>Across</h3>
                    {acrossClues.map(({ number, clue, startX, startY, word }) => (
                        <Clue key={number} onClick={() => handleClueClick('across', startX, startY, word)}>
                            {number}. {clue}
                        </Clue>
                    ))}
                </CluesList>
                <CluesList>
                    <h3>Down</h3>
                    {downClues.map(({ number, clue, startX, startY, word }) => (
                        <Clue key={number} onClick={() => handleClueClick('down', startX, startY, word)}>
                            {number}. {clue}
                        </Clue>
                    ))}
                </CluesList>
            </CluesContainer>
            <GridContainer>
                {renderGrid()}
            </GridContainer>
        </Container>
    );
}

export default CrosswordGrid;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
`;

const CluesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const CluesList = styled.div`
    margin-bottom: 20px;
`;

const Clue = styled.div`
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    border: 0.1rem solid #000;
    border-collapse: collapse;
`;

const GridCell = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    border: ${props => (props.highlighted ? '2px solid red' : '1px solid black')};
    border-collapse: collapse;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.filled ? '#fff' : '#ccc')};
    box-sizing: border-box;
`;

const CellNumber = styled.span`
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 12px;
    color: #000;
`;

const CellInput = styled.input`
    width: 100%;
    height: 100%;
    text-align: center;
    border: none;
    font-size: 20px;
    text-transform: uppercase;
    background-color: transparent;
    &:disabled {
        background-color: #eee;
        cursor: not-allowed;
    }
`;