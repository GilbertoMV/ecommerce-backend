const bcrypt = require('bcrypt')
const { DB_NAME } = require("../db/config.js");
const { getConnection } = require("../db/db.js");

const createUser = async (userData) => {
    const connection = await getConnection();
    const hashContrasena = bcrypt.hashSync(userData.contrasena,10);
    userData.contrasena = hashContrasena;
    const [rows] = await connection.query('INSERT INTO '+DB_NAME+'.Usuarios SET ?', userData);
    return rows.insertId;
};

module.exports = {createUser}