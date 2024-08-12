import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CrosswordGridMulti({ words, gridSize, gameId, socket }) { // Now using gameId and socket from props
    const [grid, setGrid] = useState(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(''))
    );
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [validatedCells, setValidatedCells] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Receive the user's unique ID
        socket.on('userId', (id) => {
            setUserId(id);
        });

        // Join the game room
        socket.emit('joinGame', gameId);

        // Receive the initial game state from the server
        socket.on('gameState', (state) => {
            if (state.grid.length > 0) {
                setGrid(state.grid);
            }
        });

        // Listen for updates to the grid from other players
        socket.on('updateGrid', ({ rowIndex, colIndex, value }) => {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.slice());
                newGrid[rowIndex][colIndex] = value;
                return newGrid;
            });
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [gameId, socket]);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const value = e.target.value.toUpperCase();
        socket.emit('inputChange', { gameId, rowIndex, colIndex, value });

        const key = e.nativeEvent.inputType;
        const isBackspace = key === 'deleteContentBackward';

        const newGrid = grid.map(row => row.slice());
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);

        const currentIndex = highlightedCells.indexOf(`${rowIndex}-${colIndex}`);

        if (isBackspace && currentIndex > 0) {
            const [prevRowIndex, prevColIndex] = highlightedCells[currentIndex - 1].split('-').map(Number);
            const prevInput = document.querySelector(`input[data-row="${prevRowIndex}"][data-col="${prevColIndex}"]`);
            if (prevInput) {
                prevInput.focus();
            }
        } else if (!isBackspace && currentIndex !== -1 && currentIndex < highlightedCells.length - 1) {
            const [nextRowIndex, nextColIndex] = highlightedCells[currentIndex + 1].split('-').map(Number);
            const nextInput = document.querySelector(`input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        const clue = highlightedCells[0].split('-').map(Number);
        const [startY, startX] = clue;
        const direction = highlightedCells.length > 1 && highlightedCells[1] > startX ? 'across' : 'down';
        const word = direction === 'across' ? grid[startY].slice(startX, startX + highlightedCells.length).join('') : grid.slice(startY, startY + highlightedCells.length).map(row => row[startX]).join('');
        validateWord(direction, startX, startY, word);
    };

    const handleClueClick = (direction, startX, startY, word) => {
        const newHighlightedCells = [];
        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                newHighlightedCells.push(`${startY}-${startX + i}`);
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                newHighlightedCells.push(`${startY + i}-${startX}`);
            }
        }
        setHighlightedCells(newHighlightedCells);
    };

    const validateWord = (direction, startX, startY, word) => {
        let isValid = true;
        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                if (grid[startY][startX + i] !== word[i]) {
                    isValid = false;
                    break;
                }
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                if (grid[startY + i][startX] !== word[i]) {
                    isValid = false;
                    break;
                }
            }
        }

        const newValidatedCells = { ...validatedCells };
        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                newValidatedCells[`${startY}-${startX + i}`] = isValid;
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                newValidatedCells[`${startY + i}-${startX}`] = isValid;
            }
        }
        setValidatedCells(newValidatedCells);
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
                        number={cellNumbers[`${rowIndex}-${colIndex}`]}
                        highlighted={highlightedCells.includes(`${rowIndex}-${colIndex}`)}
                        correct={validatedCells[`${rowIndex}-${colIndex}`] === true}
                        incorrect={validatedCells[`${rowIndex}-${colIndex}`] === false}
                    >
                        {cellNumbers[`${rowIndex}-${colIndex}`] && (
                            <CellNumber>{cellNumbers[`${rowIndex}-${colIndex}`]}</CellNumber>
                        )}
                        <CellInput
                            value={cell}
                            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                            disabled={!isCellEditable(rowIndex, colIndex)}
                            maxLength={1}
                            data-row={rowIndex}
                            data-col={colIndex}
                        />
                    </GridCell>
                ))}
            </Row>
        ));
    };

    const cellNumbers = {};
    const acrossClues = [];
    const downClues = [];
    let nextNumber = 1;

    words.forEach(({ word, startX, startY, direction, clue }) => {
        const cellKey = `${startY}-${startX}`;

        if (!cellNumbers[cellKey]) {
            cellNumbers[cellKey] = nextNumber++;
        }

        const number = cellNumbers[cellKey];

        if (direction === 'across') {
            acrossClues.push({ number, clue, word, startX, startY });
        } else {
            downClues.push({ number, clue, word, startX, startY });
        }
    });

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

export default CrosswordGridMulti;


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
    box-sizing: border-box;
    background-color: ${props => (props.correct ? '#a8e6cf' : props.incorrect ? '#ff8b94' : props.filled ? '#fff' : '#ccc')};
`;

const CellNumber = styled.span`
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 13px;
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