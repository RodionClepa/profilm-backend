import express, { Express, Request, Response } from 'express';
import sequelize from './database/init.js';
import testRouter from './routes/test.routes.js';

const app: Express = express();
const port = 3000;

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    await sequelize.sync({ force: false });
    console.log('Database synced successfully!');

    console.log(sequelize.models);

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use("/api/movies", testRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})