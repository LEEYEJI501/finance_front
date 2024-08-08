import SockJS from 'sockjs-client';

const socket = new SockJS('/api/socket');

socket.onopen = () => {
  console.log('Connected to the server');
};

socket.onmessage = (e) => {
  console.log('Message from server:', e.data);
};

socket.onclose = () => {
  console.log('Disconnected from the server');
};

export default socket;
