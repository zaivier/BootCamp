import 'reflect-metadata';
import express from 'express';
// src/server.ts
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppErro';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// app.use((err: Error, request: Request, response: response, _: NextFunction) => {
//   if (err instanceof AppError) {
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//     });
//   }
// });

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Listenning on Port 3333');
});
