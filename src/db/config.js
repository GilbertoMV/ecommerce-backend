const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'ecommerce';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_PORT = process.env.DB_PORT || 3306;
const SECRET_KEY = process.env.SECRET_KEY || 'clavesecreta'

module.exports = {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    SECRET_KEY
};
