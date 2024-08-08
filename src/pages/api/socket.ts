import { NextApiRequest, NextApiResponse } from 'next';
import SockJS from 'sockjs';
import { Server } from 'http';

let sockServer: SockJS.Server;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).send('Socket not found');
    return;
  }

  if (!sockServer) {
    console.log('Setting up SockJS server');

    sockServer = SockJS.createServer();

    sockServer.on('connection', (conn) => {
      console.log('Client connected');

      conn.on('data', (message) => {
        console.log('Message received:', message);
        conn.send('Message received');
      });

      conn.on('close', () => {
        console.log('Client disconnected');
      });
    });

    const httpServer: Server = res.socket.server;

    sockServer.installHandlers(httpServer, { prefix: '/api/socket' });

    res.socket.server.sockServer = sockServer;
  } else {
    console.log('SockJS server already running');
  }

  res.end();
}
