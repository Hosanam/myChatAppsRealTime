// test-client.js
import { io } from "socket.io-client";

const socket = io('http://localhost:3008');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('join', { name: 'tester', room: 'default' });
});

socket.on('message', (msg) => {
  console.log('Message:', msg);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
});
