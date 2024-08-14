import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function CrosswordGridMulti({ words, gridSize, gameId, socket }) {
    const [grid, setGrid] = useState(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(''))
    );
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [validatedCells, setValidatedCells] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
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
            socket.off('gameState');
            socket.off('updateGrid');
            socket.disconnect();
        };
    }, [gameId, socket]);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const value = e.target.value.toUpperCase();
        socket.emit('inputChange', { gameId, rowIndex, colIndex, value });  // Emit the change to the server

        const newGrid = grid.map(row => row.slice());
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);

        const currentIndex = highlightedCells.indexOf(`${rowIndex}-${colIndex}`);

        // Move to the next cell in the highlighted word
        if (currentIndex !== -1 && currentIndex < highlightedCells.length - 1) {
            const [nextRowIndex, nextColIndex] = highlightedCells[currentIndex + 1].split('-').map(Number);
            const nextInput = document.querySelector(`input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (e, rowIndex, colIndex) => {
        const currentIndex = highlightedCells.indexOf(`${rowIndex}-${colIndex}`);
        let nextInput;

        if (e.key === 'ArrowRight' && currentIndex < highlightedCells.length - 1) {
            const [nextRowIndex, nextColIndex] = highlightedCells[currentIndex + 1].split('-').map(Number);
            nextInput = document.querySelector(`input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const [prevRowIndex, prevColIndex] = highlightedCells[currentIndex - 1].split('-').map(Number);
            nextInput = document.querySelector(`input[data-row="${prevRowIndex}"][data-col="${prevColIndex}"]`);
        } else if (e.key === 'ArrowDown' && currentIndex < highlightedCells.length - 1) {
            const [nextRowIndex, nextColIndex] = highlightedCells[currentIndex + 1].split('-').map(Number);
            nextInput = document.querySelector(`input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            const [prevRowIndex, prevColIndex] = highlightedCells[currentIndex - 1].split('-').map(Number);
            nextInput = document.querySelector(`input[data-row="${prevRowIndex}"][data-col="${prevColIndex}"]`);
        }

        if (nextInput) {
            nextInput.focus();
            const value = nextInput.value;
            nextInput.setSelectionRange(value.length, value.length); // Place the cursor at the end of the text
            e.preventDefault(); // Prevent default cursor movement
        }
    };

    const handleClueClick = (direction, startX, startY, word) => {
        const newHighlightedCells = [];
        let firstCell = null;

        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                const cellId = `${startY}-${startX + i}`;
                newHighlightedCells.push(cellId);
                if (i === 0) firstCell = cellId;
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                const cellId = `${startY + i}-${startX}`;
                newHighlightedCells.push(cellId);
                if (i === 0) firstCell = cellId;
            }
        }
        setHighlightedCells(newHighlightedCells);

        // Automatically focus the first cell of the word
        if (firstCell) {
            const [firstRowIndex, firstColIndex] = firstCell.split('-').map(Number);
            const firstInput = document.querySelector(`input[data-row="${firstRowIndex}"][data-col="${firstColIndex}"]`);
            if (firstInput) {
                firstInput.focus();
            }
        }
    };

    const validateAllWords = () => {
        const newValidatedCells = { ...validatedCells };

        words.forEach(({ word, startX, startY, direction }) => {
            let isValid = true;

            if (direction === 'across') {
                for (let i = 0; i < word.length; i++) {
                    const expectedChar = word[i];
                    const userInputChar = grid[startY][startX + i];

                    if (userInputChar !== expectedChar) {
                        isValid = false;
                    }

                    newValidatedCells[`${startY}-${startX + i}`] = isValid;
                }
            } else if (direction === 'down') {
                for (let i = 0; i < word.length; i++) {
                    const expectedChar = word[i];
                    const userInputChar = grid[startY + i][startX];

                    if (userInputChar !== expectedChar) {
                        isValid = false;
                    }

                    newValidatedCells[`${startY + i}-${startX}`] = isValid;
                }
            }
        });

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
                        $filled={cell !== ''}
                        $highlighted={highlightedCells.includes(`${rowIndex}-${colIndex}`)}
                        $correct={validatedCells[`${rowIndex}-${colIndex}`] === true}
                        $incorrect={validatedCells[`${rowIndex}-${colIndex}`] === false}
                    >
                        {cellNumbers[`${rowIndex}-${colIndex}`] && (
                            <CellNumber>{cellNumbers[`${rowIndex}-${colIndex}`]}</CellNumber>
                        )}
                        <CellInput
                            value={cell}
                            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
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
                <CheckButton onClick={validateAllWords}>Check Puzzle</CheckButton>
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
    border: ${props => (props.$highlighted ? '2px solid red' : '1px solid black')};
    border-collapse: collapse;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: ${props => (props.$correct ? '#a8e6cf' : props.$incorrect ? '#ff8b94' : props.$filled ? '#fff' : '#ccc')};
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

const CheckButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    &:hover {
        background-color: #0056b3;
    }
`;