import express, { Express, Request, Response } from 'express';
import sequelize from './database/init.js';
import movieRouter from './routes/movie.routes.js';
import tvRouter from './routes/tv.routes.js';
import genresRouter from './routes/genre.routes.js';
import { initializeGenres } from './database/seeders.js';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

try {
  console.log(
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    process.env.POSTGRES_DB,
    process.env.DB_HOST,
    process.env.POSTGRES_PORT
  );
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  await sequelize.sync({ force: false });
  console.log('Database synced successfully!');

  console.log(sequelize.models);

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

async function startServer() {

  await initializeGenres();

  app.use(cors(corsOptions))

  app.use("/api/movies", movieRouter);
  app.use("/api/tv", tvRouter);
  app.use("/api/genres", genresRouter);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!');
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startServer();