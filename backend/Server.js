const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "Post"],
        credentials: true
    }
});
    

let gameState = {};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('createGame', () => {
        const gameId = uuidv4();  // Generate a unique game ID
        socket.join(gameId);
        gameState[gameId] = { grid: Array(10).fill().map(() => Array(10).fill('')), users: [] };
        gameState[gameId].users.push(socket.id);
        socket.emit('gameCreated', gameId);  // Send the gameId to the user who created the game
    });

    socket.on('joinGame', (gameId) => {
        if (gameState[gameId]) {
            socket.join(gameId);
            gameState[gameId].users.push(socket.id);
            socket.emit('gameState', gameState[gameId]);
        } else {
            socket.emit('error', 'Game not found');
        }
    });

    socket.on('inputChange', ({ gameId, rowIndex, colIndex, value }) => {
        if (gameState[gameId]) {
            gameState[gameId].grid[rowIndex][colIndex] = value;
            io.to(gameId).emit('updateGrid', { rowIndex, colIndex, value });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        for (const gameId in gameState) {
            gameState[gameId].users = gameState[gameId].users.filter(user => user !== socket.id);
        }
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});