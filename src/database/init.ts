import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

// Ensure environment variables are defined
const DB_NAME = process.env.POSTGRES_DB as string;
const DB_USER = process.env.POSTGRES_USER as string;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD as string;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.POSTGRES_PORT as string, 10) || 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    logging: false,
});

export default sequelize;
