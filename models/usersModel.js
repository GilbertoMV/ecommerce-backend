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
