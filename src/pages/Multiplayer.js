import React, { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MainContentMultiplayer from '../components/MainContentMultiplayer';
import RoomSelection from '../components/RoomSelection';  // Import RoomSelection component
import io from 'socket.io-client';

const socket = io('http://localhost:3001',{
    withCredentials: true
});

const Multiplayer = () => {
  const [gameId, setGameId] = useState(null);
  const [generatedGameId, setGeneratedGameId] = useState('');  // State to hold the generated game ID

  const handleCreateRoom = () => {
    console.log('create room buttom clicked');
    socket.emit('createGame');

    socket.on('gameCreated', (newGameId) => {
        console.log('Game Id: ', newGameId);
      setGameId(newGameId);
      setGeneratedGameId(newGameId);  // Store the generated game ID for displaying
    });
  };

  const handleJoinRoom = (existingGameId) => {
    socket.emit('joinGame', existingGameId);
    socket.on('gameState', () => {
      setGameId(existingGameId);
    });
    socket.on('error', (message) => {
      alert(message);
    });
  };

  if (!gameId) {
    return <RoomSelection onCreate={handleCreateRoom} onJoin={handleJoinRoom} generatedGameId={generatedGameId} />;  // Pass generatedGameId to RoomSelection
  }

  return (
    <div>
      <Header />
      <NavBar />
      <p>Your game Id is: {gameId}</p> 
      <p>Please Copy this game Id and share it with your friend</p>
      <MainContentMultiplayer gameId={gameId} socket={socket} />
      <Footer />
    </div>
  );
};

export default Multiplayer;