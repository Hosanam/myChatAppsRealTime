import React, { useState } from 'react';

export const JoinRoom = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      onJoin(name.trim(), room.trim());
    } else {
      alert('Name and room are required');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Join Your Group</h2>
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        placeholder="Group"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button type="submit" style={{ width: '105%', padding: 10 }}>
        Join
      </button>
    </form>
  );
};
