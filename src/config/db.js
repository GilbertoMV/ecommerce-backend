import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config('.env');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const connectToDatabase = async () => {
    await sequelize.authenticate();
};

export { connectToDatabase, sequelize };
