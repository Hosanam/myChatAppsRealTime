import React, { useState } from 'react';
import { JoinRoom } from './components/Join';
import { Chat } from './components/Chat';

const App = () => {
  const [user, setUser] = useState({ name: '', room: '' });

  const handleJoin = (name, room) => {
    setUser({ name, room });
  };

  return (
    <div>
      {user.name && user.room ? (
        <Chat name={user.name} room={user.room} />
      ) : (
        <JoinRoom onJoin={handleJoin} />
      )}
    </div>
  );
};

export default App;
