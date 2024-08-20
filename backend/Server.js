const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const corsOptions = {
  origin: [
    'https://mohans-crossword.vercel.app/api', // Your backend URL
    'http://localhost:3000', // Local development URL (optional)
  ],
  credentials: true,
  Headers : ["Access-Control-Allow-Origin"],
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://mohans-crossword.vercel.app/api', // Your backend URL
      'http://localhost:3000', // Local development URL (optional)
    ],
    methods: ["GET", "POST"],
    Headers : ["Access-Control-Allow-Origin"],
    credentials: true
  }
});

let gameState = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('createGame', () => {
    const gameId = uuidv4();  // Generate a unique game ID
    console.log(`Game created with ID: ${gameId} by user: ${socket.id}`);
    socket.join(gameId);
    gameState[gameId] = { grid: Array(10).fill().map(() => Array(10).fill('')), users: [] };
    gameState[gameId].users.push(socket.id);
    socket.emit('gameCreated', gameId);  // Send the gameId to the user who created the game
  });

  socket.on('joinGame', (gameId) => {
    if (gameState[gameId]) {
      socket.join(gameId);
      gameState[gameId].users.push(socket.id);
      socket.emit('gameState', gameState[gameId]);  // Send the current game state to the user
    } else {
      socket.emit('error', 'Game not found');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}`);
    // Handle disconnection cleanup logic if necessary
    for (const gameId in gameState) {
      gameState[gameId].users = gameState[gameId].users.filter(user => user !== socket.id);
      if (gameState[gameId].users.length === 0) {
        delete gameState[gameId];  // Clean up game if no users are left
        console.log(`Game ${gameId} deleted due to no users`);
      }
    }
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});