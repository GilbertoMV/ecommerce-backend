const { DB_NAME } = require('../db/config.js');
const { getConnection } = require('../db/db.js');

// Función para obtener todos los productos del catálogo
const getAllProducts = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM '+DB_NAME+'.CatalogoProductos');
  return rows;
};

// Función para obtener el producto por su ID
const getProductById = async (id) => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM '+DB_NAME+'.CatalogoProductos WHERE id_producto = ?', [id]);
  return rows[0];
};

module.exports = {
  getAllProducts,
  getProductById
};