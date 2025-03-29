import express, { Express, Request, Response } from 'express';
import sequelize from './database/init.js';

const app: Express = express();
const port = 3000;

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!11!=');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})