const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['https://mohans-crossword-efmoanxnk-mohan-raj-loganathans-projects.vercel.app'],
    credentials: true
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mohans-crossword-efmoanxnk-mohan-raj-loganathans-projects.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
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

const port = process.env.PORT || 3000;  // Use the port provided by Vercel or default to 3001
server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});