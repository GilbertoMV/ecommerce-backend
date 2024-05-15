import bcrypt from 'bcrypt'
import getConnection from "../db/db.js"

const getAllUsers = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.Usuarios');
    return rows;
}

const getUserById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.Usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
}

const deleteUser = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM '+process.env.DB_NAME+'.Usuarios WHERE id_usuario = ?', [id]);
    return rows.affectedRows;
}

const updateUser = async (id, userData) => {
    const connection = await getConnection();
    const hashContrasena = bcrypt.hashSync(userData.contrasena,10);
    userData.contrasena = hashContrasena;
    const [rows] = await connection.query('UPDATE '+process.env.DB_NAME+'.Usuarios SET ? WHERE id_usuario = ?', [userData, id]);
    return rows.affectedRows;
}

export {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
};