import express from 'express';
import expressWs from 'express-ws';

const app = express();
app.use(express.json());

// Apply expressWs
expressWs(app);

// app.get('/', (_, res) => {
//   res.status(200).send('Welcome to SkillReactor');
// });

//store connected users
let connectedUsers: String[] = [];

(app as any).ws('/', (ws: any, req: any) => {
  const username: string = req.query.username;
  console.log('username->', username);
  // Log successful connection
  console.log(`WebSocket connection established for user: ${username}`);
  connectedUsers.push(username);
  console.log('connected users==>', connectedUsers);
  sendUserList(ws);
});

// Function to send the user list message to a specific client
function sendUserList(client: WebSocket) {
  const userListMessage = JSON.stringify({
    type: 'users',
    data: connectedUsers,
  });
  client.send(userListMessage);
}

export default app;

//keeping the below code for reference
// import express from 'express';

// const app = express();
// app.use(express.json());

// app.get('/', (_, res) => {
//   res.status(200).send("Welcome to SkillReactor");
// })

// export default app;
