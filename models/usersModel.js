const { getConnection } = require("../db/db.js");

const getAllUsers = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Usuario');
    return rows;
}

const getUserById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM Usuario WHERE id_usuario = ?', [id]);
    return rows[0];
}

const createUser = async (userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('INSERT INTO Usuario SET ?', userData);
    return rows.insertId;
};

const deleteUser = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM Usuario WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}

const updateUser = async (id, userData) => {
    const connection = await getConnection();
    const [rows] = await connection.query('UPDATE Usuario SET ? WHERE id_usuario = ?', [userData, id]);
    return rows.affectedRows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
