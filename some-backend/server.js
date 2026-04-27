import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db/index.js';
import mongoose from 'mockgoose';
import { errorHandler } from './middlewares/index.js';
import { userRouter, bookRouter } from './routers/index.js';

const app = express();
const port = process.env.PORT || 8912;

app.use(express.json(), cookieParser());
app.use(
  // cors({
  //   credentials: true,
  //   origin: process.env.CLIENT_URL,
  // })
  cors()
);

app.get('/', async (_req, res) => {
  // const { ok } = await mongoose.connection.db.admin().ping();
  // if (!ok) throw new Error('DB is unconnected', { cause: 503 });
  res.json({ msg: 'Running' });
});

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use('/{*splat}', (req, _res) => {
  throw new Error(`URL unavailable; you used ${req.originalUrl}`, {
    cause: 404,
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    chalk.bgGreen(` Personal Library API listening on port ${port} `)
  );
});
