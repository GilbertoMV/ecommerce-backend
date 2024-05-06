const { DB_NAME } = require('../db/config.js');
const { getConnection } = require('../db/db.js');


async function getUserByEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM '+DB_NAME+'.Usuarios WHERE correo = ?', [email]);
    return rows[0];
}
module.exports = { getUserByEmail };