import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
// src/server.ts
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppErro';
import { errors } from 'celebrate';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Listenning on Port 3333');
});
