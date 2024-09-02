
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MainContentMultiplayer from '../components/MainContentMultiplayer';
import RoomSelection from '../components/RoomSelection';  
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Multiplayer = () => {
  const [gameId, setGameId] = useState(null);
  const [generatedGameId, setGeneratedGameId] = useState('');  
  const socketRef = useRef(null);  // Use a ref to store the socket instance
  const navigate = useNavigate();  

  useEffect(() => {
    // Initialize socket connection once when the component mounts
    const serverURL = 'https://mohans-crossword.vercel.app' || 'http://localhost:3001' || 'https://mohans-crossword-mohan-raj-loganathans-projects.vercel.app';
    const newSocket = io(serverURL, {
      withCredentials: true,
  });

  console.log(serverURL);
    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);  
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);  
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);  
    });

    // Set up the listener for game creation only once
    newSocket.on('gameCreated', (newGameId) => {
      console.log('Game Created Event Triggered');  
      console.log('Game Id: ', newGameId);
      setGameId(newGameId);
      setGeneratedGameId(newGameId);
      navigate(`/multiplayer?gameId=${newGameId}`); 
    });

    // Clean up the socket connection only if the component unmounts
    return () => {
      if (newSocket.connected) {
        console.log('Socket disconnected:', newSocket.id);  
        newSocket.disconnect();
      }
    };
  }, [navigate]);

  const handleCreateRoom = () => {
    console.log('Create Room Button Clicked');  
    if (socketRef.current) {
      console.log('Emitting createGame event');  
      socketRef.current.emit('createGame');
    } else {
      console.log('Socket not initialized');  
    }
  };

  const handleJoinRoom = (existingGameId) => {
    if (socketRef.current) {
      socketRef.current.emit('joinGame', existingGameId);
      socketRef.current.on('gameState', () => {
        setGameId(existingGameId);
        navigate(`/multiplayer?gameId=${existingGameId}`);  
      });
      socketRef.current.on('error', (message) => {
        alert(message);
      });
    }
  };

  if (!gameId) {
    return <RoomSelection onCreate={handleCreateRoom} onJoin={handleJoinRoom} generatedGameId={generatedGameId} />;
  }

  return (
    <div>
      <Header />
      <NavBar />
      <p>Your game Id is: {gameId}</p>
      <p>Please Copy this game Id and share it with your friend</p>
      <MainContentMultiplayer gameId={gameId} socket={socketRef.current} />
      <Footer />
    </div>
  );
};

export default Multiplayer;
