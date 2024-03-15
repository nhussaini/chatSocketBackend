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
  // Store the WebSocket connection associated with the username
  connectedUsers[username] = ws;
  sendUserList(ws);

  //Handle incoming messages
  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data);
      //send message to single user
      if (message.type === 'message' && message.to) {
        const recipientSocket = connectedUsers[message.to];
        if (recipientSocket) {
          // Send the message only to the intended recipient
          recipientSocket.send(JSON.stringify(message));
        } else {
          console.log(`Recipient ${message.to} is not connected.`);
        }
      }
      //send message to multiple users except itself
      if (message.type === 'broadcast') {
        const senderUserName = username;
        const broadcastMessage = message.data;
        // Send the broadcast message to all other connected users
        Object.entries(connectedUsers).forEach(
          ([user, userWs]: [string, WebSocket]) => {
            if (user !== senderUserName) {
              userWs.send(
                JSON.stringify({
                  type: 'message',
                  data: broadcastMessage,
                  userId: senderUserName,
                })
              );
            }
          }
        );
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
