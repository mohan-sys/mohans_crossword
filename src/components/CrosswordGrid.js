import React, { useState } from 'react';
import styled from 'styled-components';

function CrosswordGrid({ words, gridSize }) {

    const [grid, setGrid] = useState(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(''))
    );


    const cellNumbers = {};
    const acrossClues = [];
    const downClues = [];

    words.forEach(({ word, startX, startY, direction, clue, number }) => {
        cellNumbers['${startY}-${startX}'] = number;
        if (direction === 'across') {
            acrossClues.push({ number, clue, word });
        } else {
            downClues.push({ number, clue, word });
        }
    });

    const handleInputChange = (e, rowIndex, colIndex) => {
        const value = e.target.value.toUpperCase();
        if (value.length > 1) return;

        const newGrid = grid.map(row => row.slice());
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);
    };

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
                        number={cellNumbers['${rowIndex}-${colIndex}']}
                    >
                        {cellNumbers['${rowIndex}-${colIndex}'] && (
                            <CellNumber>{cellNumbers['${rowIndex}-${colIndex}']}</CellNumber>
                        )}
                        <CellInput
                            value={cell}
                            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                            disabled={!isCellEditable(rowIndex, colIndex)}
                            maxLength={1}
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
                    {acrossClues.map(({ number, clue }) => (
                        <Clue key={number}>{number}. {clue}</Clue>
                    ))}
                </CluesList>
                <CluesList>
                    <h3>Down</h3>
                    {downClues.map(({ number, clue }) => (
                        <Clue key={number}>{number}. {clue}</Clue>
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
`;

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
`;

const GridCell = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    border: 1px solid #000;
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