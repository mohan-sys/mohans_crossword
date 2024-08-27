import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://mohans-crossword.vercel.app/api/socket.io', {
  path: '/api/socket.io',
  withCredentials: true
});

function RoomSelection() {
  const [gameId, setGameId] = useState('');
  const [generatedGameId, setGeneratedGameId] = useState('');

  const handleCreateRoom = () => {
    socket.emit('createGame');
  };

  const handleJoinRoom = (existingGameId) => {
    socket.emit('joinGame', existingGameId);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} />
      <button onClick={() => handleJoinRoom(gameId)}>Join Room</button>
      {generatedGameId && <p>Generated Game ID: {generatedGameId}</p>}
    </div>
  );
}

export default RoomSelection;

const RoomSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: #000;
  font-family: 'Arial', sans-serif;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 3px;
  animation: fadeIn 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.8em;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  background: linear-gradient(135deg, #000, #333);
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  width: 200px;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #333, #000);
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1em;
    width: 180px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9em;
    width: 160px;
  }
`;

const GameId = styled.div`
  margin-bottom: 20px;
  font-size: 1.1em;
  text-align: center;
  animation: fadeIn 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
  }
`;

const JoinSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

const OrText = styled.span`
  margin-bottom: 10px;
  font-size: 1.2em;
  text-align: center;
  animation: fadeIn 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

const InputBox = styled.input`
  padding: 10px;
  font-size: 1.1em;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  text-align: center;
  border: 2px solid #000;
  background-color: #fff;
  color: #000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 1em;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.9em;
  }
`;