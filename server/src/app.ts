require('dotenv').config();
import 'express-async-errors';

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './utils/errors/not-found-error';
import userRoute from './routes/users';
import deviceRouter from './routes/devices';

const app = express();
// app.set('trust proxy', true);
app.use(cors({ credentials: true }));
app.use(json());

app.use('/api', userRoute, deviceRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
