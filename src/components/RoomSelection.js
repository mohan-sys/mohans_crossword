import React, { useState } from 'react';
import styled from 'styled-components';

function RoomSelection({ onCreate, onJoin, generatedGameId }) {  // Accept the generatedGameId as a prop
  const [gameId, setGameId] = useState('');

  const handleCreate = () => {
    onCreate();
  };

  const handleJoin = () => {
    if (gameId.trim()) {
      onJoin(gameId.trim());
    }
  };

  return (
    <RoomSelectionContainer>
      <Title>SELECT ROOM</Title>
      <Button onClick={handleCreate}>Create Room</Button>
      {generatedGameId && (
        <GameId>
          <p>Room Created! Share this Game ID: <strong>{generatedGameId}</strong></p>
        </GameId>
      )}
      <JoinSection>
        <OrText>or</OrText>
        <InputBox
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <Button onClick={handleJoin}>Join Room</Button>
      </JoinSection>
    </RoomSelectionContainer>
  );
}

export default RoomSelection;

const RoomSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2em;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  width: 200px;

  &:hover {
    background-color: #444;
  }
`;

const GameId = styled.div`
  margin-bottom: 20px;
  font-size: 1em;
  text-align: center;
`;

const JoinSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;

const OrText = styled.span`
  margin-bottom: 10px;
  font-size: 1.2em;
  text-align: center;
`;

const InputBox = styled.input`
  padding: 10px;
  font-size: 1.1em;
  width: 200px;
  margin-bottom: 10px;
  text-align: center;
  border: 2px solid #fff;
  background-color: #000;
  color: #fff;
`;