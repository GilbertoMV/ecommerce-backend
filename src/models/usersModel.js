<<<<<<< HEAD:src/models/usersModel.js
const bcrypt = require("bcrypt")
const { DB_NAME } = require("../db/config.js");
const { getConnection } = require("../db/db.js");

const getAllUsers = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM '+DB_NAME+'.Usuarios');
    return rows;
}

const getUserById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM '+DB_NAME+'.Usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
}

const createUser = async (userData) => {
    const connection = await getConnection();
    const hashContrasena = bcrypt.hashSync(userData.contrasena,10);
    userData.contrasena = hashContrasena;
    const [rows] = await connection.query('INSERT INTO '+DB_NAME+'.Usuarios SET ?', userData);
    return rows.insertId;
};

const deleteUser = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM '+DB_NAME+'.Usuarios WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}

const updateUser = async (id, userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('UPDATE '+DB_NAME+'.Usuarios SET ? WHERE id_usuario = ?', [userData, id]);
    return rows.affectedRows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
=======
const { getConnection } = require("../db/db.js");

const getAllUsers = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Usuarios');
    return rows;
}

const getUserById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
}

const createUser = async (userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('INSERT INTO Usuarios SET ?', userData);
    return rows.insertId;
};

const deleteUser = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}

const updateUser = async (id, userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('UPDATE Usuarios SET ? WHERE id_usuario = ?', [userData, id]);
    return rows.affectedRows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
>>>>>>> 241279037794aaf7d2ed07b4e3b0681eb3b86e1b:models/usersModel.js
