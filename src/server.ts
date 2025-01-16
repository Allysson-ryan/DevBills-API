import express, { json } from 'express';
import { routes } from './routes';
import 'dotenv/config';
import cors from 'cors';
import { setupMongo } from './database';
import { errorHandler } from './middleware/error.handler.middleware';

setupMongo().then(() => {
  const app = express();

  // Configuração do CORS
  app.use(
    cors({
      origin: process.env.FRONT_URL, // URL do seu frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    }),
  );

  app.use(json());
  app.use(routes);
  app.use(errorHandler);

  const port = process.env.PORT || 3334;
  app.listen(port, () => console.log(`🚀 App is running on port ${port}!`));
});

// import express, { json } from 'express';
// import { routes } from './routes';
// import 'dotenv/config';
// import cors from 'cors';
// import { setupMongo } from './database';
// import { errorHandler } from './middleware/error.handler.middleware';

// setupMongo().then(() => {
//   const app = express();

//   app.use(
//     cors({
//       origin: process.env.FRONT_URL,
//     }),
//   );
//   app.use(json());
//   app.use(routes);
//   app.use(errorHandler);

//   app.listen(3333, () => console.log('🚀 App is running at 3333!'));
// });
