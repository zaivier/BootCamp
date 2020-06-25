import express from 'express';
// src/server.ts
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Listenning on Port 3333');
});
