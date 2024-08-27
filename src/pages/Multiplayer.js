import React, { useState, useEffect } from 'react';
import RoomSelection from './RoomSelection';
import io from 'socket.io-client';

const socket = io('https://mohans-crossword.vercel.app/api/socket.io', {
  path: '/api/socket.io',
  withCredentials: true
});

function Multiplayer() {
  const [gameId, setGameId] = useState(null);
  const [generatedGameId, setGeneratedGameId] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);

  const handleCreateRoom = () => {
    socket.emit('createGame');
  };

  const handleJoinRoom = (existingGameId) => {
    socket.emit('joinGame', existingGameId);
  };

  if (!gameId) {
    return <RoomSelection onCreate={handleCreateRoom} onJoin={handleJoinRoom} generatedGameId={generatedGameId} />;
  }

  return (
    <div>
      <p>Your game ID is: {gameId}</p>
      <p>Please copy this game ID and share it with your friend</p>
    </div>
  );
}

export default Multiplayer;