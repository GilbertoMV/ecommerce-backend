const mysql = require("mysql2/promise");
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require("./config.js");

const connection = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

const getConnection = async () => await connection;

module.exports = {
    getConnection
};
