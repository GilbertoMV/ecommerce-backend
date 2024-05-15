import bcrypt from 'bcrypt'
import getConnection from "../db/db.js"

const createUser = async (userData) => {
    const connection = await getConnection();
    const hashContrasena = bcrypt.hashSync(userData.contrasena,10);
    userData.contrasena = hashContrasena;
    const [rows] = await connection.query('INSERT INTO '+process.env.DB_NAME+'.Usuarios SET ?', userData);
    return rows.insertId;
};

export default createUser