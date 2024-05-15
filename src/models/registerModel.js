import bcrypt from 'bcrypt'
import { DB_NAME } from "../db/config.js"
import getConnection from "../db/db.js"

const createUser = async (userData) => {
    const connection = await getConnection();
    const hashContrasena = bcrypt.hashSync(userData.contrasena,10);
    userData.contrasena = hashContrasena;
    const [rows] = await connection.query('INSERT INTO '+DB_NAME+'.Usuarios SET ?', userData);
    return rows.insertId;
};

export default createUser