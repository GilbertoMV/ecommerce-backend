const { getConnection } = require("../db/db.js");

const getAllUsers = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuario');
    return rows;
}

const getUserById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    return rows[0];
}

const createUser = async (userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('INSERT INTO usuario SET ?', userData);
    return rows.insertId;
};

const deleteUser = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}

const updateUser = async (id, userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('UPDATE usuario SET ? WHERE id_usuario = ?', [userData, id]);
    return rows.affectedRows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
