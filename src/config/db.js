// config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config('.env');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Desactivar logs de Sequelize si no los necesitas
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Tiempo de espera antes de lanzar error
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000 // Aumenta el tiempo de espera de conexión
    }
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        throw error; // Propagar el error para manejarlo fuera de esta función si es necesario
    }
};

export { connectToDatabase, sequelize };
