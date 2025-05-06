import express, { json } from 'express';
import { routes } from './routes';
import 'dotenv/config';
import cors from 'cors';
import { setupMongo } from './database';
import { errorHandler } from './middleware/error.handler.middleware';

const app = express();

const frontUrl = process.env.FRONT_URL?.replace(/\/$/, '');

app.use(
  cors({
    origin: frontUrl,
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use(json());
app.use(routes);
app.use(errorHandler);

// Conecta ao Mongo sem `listen()`
setupMongo().catch((err) => {
  console.error('Erro ao conectar com o MongoDB:', err);
});

export default app;
