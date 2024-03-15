import express, { Request } from 'express';
import expressWs from 'express-ws';

import WebSocket from 'ws';

const app = express();
app.use(express.json());

// Apply expressWs
// expressWs(app);
const wsInstance = expressWs(app);

// app.get('/', (_, res) => {
//   res.status(200).send('Welcome to SkillReactor');
// });

//store connected users
// let connectedUsers: String[] = [];
const connectedUsers: { [key: string]: WebSocket } = {};

wsInstance.app.ws('/', (ws: WebSocket, req: Request) => {
  const username: string = req.query.username as string;
  console.log('username->', username);
  // Log successful connection
  console.log(`WebSocket connection established for user: ${username}`);
  // connectedUsers.push(username);
  // Store the WebSocket connection associated with the username
  connectedUsers[username] = ws;
  console.log('connected users==>', connectedUsers);
  sendUserList(ws);

  //Handle incoming messages
  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data);
      console.log('incoming message=>', message);
      if (message.type === 'message' && message.to) {
        const recipientSocket = connectedUsers[message.to];
        if (recipientSocket) {
          // Send the message only to the intended recipient
          recipientSocket.send(JSON.stringify(message));
        } else {
          console.log(`Recipient ${message.to} is not connected.`);
        }
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});

// Function to send the user list message to a specific client
function sendUserList(socket: WebSocket) {
  const userListMessage = JSON.stringify({
    type: 'users',
    data: Object.keys(connectedUsers),
  });
  socket.send(userListMessage);
}

export default app;
