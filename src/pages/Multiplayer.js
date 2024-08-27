import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import NavBar from '../components/ NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const socket = io('https://mohans-crossword.vercel.app', {
  withCredentials: true,
  transports: ['polling'],
});

function Multiplayer() {
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState({ grid: Array(10).fill().map(() => Array(10).fill('')), users: [] });
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on('gameCreated', (gameId) => {
      setGameId(gameId);
    });

    socket.on('gameState', (gameState) => {
      setGameState(gameState);
    });

    socket.on('error', (error) => {
      setError(error);
    });
  }, [socket]);

  const handleCreateGame = () => {
    socket.emit('createGame');
  };

  const handleJoinGame = (gameId) => {
    socket.emit('joinGame', gameId);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Switch>
        <Route path="/create-game">
          <button onClick={handleCreateGame}>Create Game</button>
        </Route>
        <Route path="/join-game">
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" />
          <button onClick={() => handleJoinGame(uuidv4())}>Join Game</button>
        </Route>
        <Route path="/game">
          {gameId && (
            <div>
              <h1>Game ID: {gameId}</h1>
              <p>Game State:</p>
              <pre>{JSON.stringify(gameState, null, 2)}</pre>
            </div>
          )}
          {error && (
            <div>
              <h1>Error: {error}</h1>
            </div>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Multiplayer;