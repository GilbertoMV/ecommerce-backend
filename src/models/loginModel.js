import getConnection from '../config/db.js'


async function getUserByEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM '+process.env.DB_NAME+'.Usuarios WHERE correo = ?', [email]);
    return rows[0];
}
export default getUserByEmail;