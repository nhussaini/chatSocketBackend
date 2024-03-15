import express from 'express';
import expressWs from 'express-ws';

const app = express();
app.use(express.json());

// Apply expressWs
expressWs(app);

// app.get('/', (_, res) => {
//   res.status(200).send('Welcome to SkillReactor');
// });

(app as any).ws('/', (ws: any, req: any) => {
  const username: string = req.query.username;
  console.log('username->', username);
  // Log successful connection
  console.log(`WebSocket connection established for user: ${username}`);
});

export default app;

//keeping the below code for reference
// import express from 'express';

// const app = express();
// app.use(express.json());

// app.get('/', (_, res) => {
//   res.status(200).send("Welcome to SkillReactor");
// })

// export default app;
