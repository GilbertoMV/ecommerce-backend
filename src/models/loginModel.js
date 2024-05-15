import { DB_NAME } from '../db/config.js'
import getConnection from '../db/db.js'


async function getUserByEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM '+DB_NAME+'.Usuarios WHERE correo = ?', [email]);
    return rows[0];
}
export default getUserByEmail;