import React, { useState } from 'react';
import styled from 'styled-components';

function CrosswordGrid({ words, gridSize }) {

    const [grid, setGrid] = useState(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(''))
    );

    const [highlightedCells, setHighlightedCells] = useState([]);
    const [validatedCells, setValidatedCells] = useState({});

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

    const clearPuzzle = () => {
        const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
        setGrid(newGrid);
        setValidatedCells({});
    };

    const revealPuzzle = () => {
        const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
        const newValidatedCells = {};
    
        words.forEach(({ word, startX, startY, direction }) => {
            if (direction === 'across') {
                for (let i = 0; i < word.length; i++) {
                    newGrid[startY][startX + i] = word[i];
                    newValidatedCells[`${startY}-${startX + i}`] = true;
                }
            } else if (direction === 'down') {
                for (let i = 0; i < word.length; i++) {
                    newGrid[startY + i][startX] = word[i];
                    newValidatedCells[`${startY + i}-${startX}`] = true;
                }
            }
        });
    
        setGrid(newGrid);
        setValidatedCells(newValidatedCells);
    };

    const handleRevealPuzzle = () => {
        if (window.confirm("Are you sure you want to reveal all the answers?")) {
            revealPuzzle();
        }
    };

    const revealFirstLetters = () => {
        const newGrid = [...grid];
        const newValidatedCells = { ...validatedCells };
    
        words.forEach(({ word, startX, startY, direction }) => {
            if (direction === 'across') {
                newGrid[startY][startX] = word[0];
                newValidatedCells[`${startY}-${startX}`] = true;
            } else if (direction === 'down') {
                newGrid[startY][startX] = word[0];
                newValidatedCells[`${startY}-${startX}`] = true;
            }
        });
    
        setGrid(newGrid);
        setValidatedCells(newValidatedCells);
    };

    const handleEasyMode = () => {
        if (window.confirm("Do you want to switch to Easy Mode? It will reveal the first letter of all the answers.")) {
            revealFirstLetters();
        }
    };

    const handleInputChange = (e, rowIndex, colIndex) => {
        const value = e.target.value.toUpperCase();
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
                <ButtonContainer>
                    <ClearButton onClick={clearPuzzle}>Clear Puzzle</ClearButton>
                    <EasyModeButton onClick={handleEasyMode}>Easy Mode</EasyModeButton>
                    <RevealButton onClick={handleRevealPuzzle}>Reveal Puzzle</RevealButton>
                    <CheckButton onClick={validateAllWords}>Check Puzzle</CheckButton>
                </ButtonContainer>
            </GridContainer>
        </Container>
    );
}

export default CrosswordGrid;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: auto;
    width: 100vw;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #f0f0f0;
    overflow: auto;

    @media (max-width: 668px) {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
`;

const CluesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 20px;
        width: 100%;
    }

    animation: fadeIn 1s ease-in-out;

    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;

const CluesList = styled.div`
    margin-bottom: 20px;
`;

const Clue = styled.div`
    margin-bottom: 5px;
    cursor: pointer;
    color: #333;

    &:hover {
        text-decoration: underline;
        color: #000;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    animation: fadeIn 1s ease-in-out;

    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
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
    background-color: ${props => (props.$correct ? '#a8e6cf' : props.$incorrect ? '#ff8b94' : props.$filled ? 'white' : '#eee')};

    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
    }

    animation: fadeIn 1s ease-in-out;

    @keyframes fadeIn {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
`;

const CellNumber = styled.span`
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 12px;
    color: #333; 

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
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
        background-color: grey;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

const ClearButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #ff0000, #000);
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #c82333, #000);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
    }
`;

const EasyModeButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #28a745, #000);
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #218838, #000);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
    }
`;

const RevealButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #ffc107, #000);
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #e0a800, #000);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
    }
`;

const CheckButton = styled.button`
    margin-top: 20px;
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

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;