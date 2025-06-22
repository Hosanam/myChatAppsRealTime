import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../socket';

export const Chat = ({ name, room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.connect();
    socket.emit('join', { name, room });

    socket.on('chatHistory', (history) => setMessages(history));
    socket.on('message', (message) => setMessages((prev) => [...prev, message]));

    return () => {
      socket.emit('leave', { name, room });
      socket.off('chatHistory');
      socket.off('message');
      socket.disconnect();
    };
  }, [name, room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('sendMessage', { message: input });
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Group: {room}</h2>

      <div
        style={{
          height: 400,
          overflowY: 'auto',
          marginBottom: 10,
          border: '1px solid #ccc',
          padding: 10,
          backgroundColor: '#f9f9f9',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.user?.toLowerCase() === name.toLowerCase();
          return (
            <div
              key={idx}
              style={{
                alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                backgroundColor: isCurrentUser ? '#d4f5dd' : '#e1e1e1',
                color: '#000',
                padding: '10px 15px',
                borderRadius: 20,
                maxWidth: '70%',
                marginBottom: 8,
                wordBreak: 'break-word',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: 5 }}>
                {msg.user === 'admin' ? 'Admin' : msg.user}
              </div>
              <div>{msg.text || msg.content}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 5,
            border: '1px solid #ccc',
            marginRight: 8,
            fontSize: 16,
          }}
          placeholder="Type a message"
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>
          Send
        </button>
      </form>
    </div>
  );
};
