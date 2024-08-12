import React from 'react';
import CrosswordGridMulti from './CrosswordGridMulti';

function MainContentMultiplayer({gameId, socket}) {

  const words = [
    { word: 'WATER', startX: 0, startY: 0, direction: 'across', clue: 'The substance that forms clouds' },
    { word: 'LAVA', startX: 1, startY: 2, direction: 'across', clue: 'The hot stuff inside a volcano' },
    { word: 'YOLK', startX: 3, startY: 4, direction: 'across', clue: 'The yellow part of an egg' },
    { word: 'WARM', startX: 6, startY: 6, direction: 'across', clue: 'Opposite of cold' },
    { word: 'EARTH', startX: 2, startY: 8, direction: 'across', clue: 'The planet we live on' },
    { word: 'WHALE', startX: 0, startY: 0, direction: 'down', clue: 'The largest mammal' },
    { word: 'APPLE', startX: 2, startY: 1, direction: 'down', clue: 'Shiny red fruit' },
    { word: 'PLASMA', startX: 4, startY: 2, direction: 'down', clue: 'The liquid part of blood' },
    { word: 'ROCK', startX: 3, startY: 4, direction: 'down', clue: 'A hard, natural substance' },
    { word: 'GRAVITY', startX: 6, startY: 4, direction: 'down', clue: 'The force that pulls us down' },
    { word: 'OXYGEN', startX: 8, startY: 3, direction: 'down', clue: 'The gas we breathe' }
];
    
  return (
        < CrosswordGridMulti words = {words} gridSize = {10} gameId = {gameId} socket = {socket} />
  )
}




export default MainContentMultiplayer;
