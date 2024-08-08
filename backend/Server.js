const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let gameState = {};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    const userId = uuidv4();
    socket.emit('userId', userId);

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        if (!gameState[gameId]) {
            gameState[gameId] = { grid: Array(10).fill().map(() => Array(10).fill('')), users: [] };
        }
        gameState[gameId].users.push(userId);
        socket.emit('gameState', gameState[gameId]);
    });

    socket.on('inputChange', ({ gameId, rowIndex, colIndex, value }) => {
        gameState[gameId].grid[rowIndex][colIndex] = value;
        io.to(gameId).emit('updateGrid', { rowIndex, colIndex, value });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        for (const gameId in gameState) {
            gameState[gameId].users = gameState[gameId].users.filter(user => user !== userId);
        }
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});