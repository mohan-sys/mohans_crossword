import React, { useState } from 'react';

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
    <div className="room-selection">
      <h2>Select Room</h2>
      <button onClick={handleCreate}>Create Room</button>
      {generatedGameId && (
        <div>
          <p>Room Created! Share this Game ID: <strong>{generatedGameId}</strong></p> 
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button onClick={handleJoin}>Join Room</button>
      </div>
    </div>
  );
}

export default RoomSelection;