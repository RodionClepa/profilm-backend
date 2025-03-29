import { Sequelize } from '@sequelize/core';
import dotenv from 'dotenv';
import { PostgresDialect } from '@sequelize/postgres';
import { Movie } from '../models/Movie.models.js';

// Load .env variables
dotenv.config();

// Ensure environment variables are defined
const DB_NAME = process.env.POSTGRES_DB as string;
const DB_USER = process.env.POSTGRES_USER as string;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD as string;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.POSTGRES_PORT as string, 10) || 5432;

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    models: [Movie]
})

export default sequelize;
