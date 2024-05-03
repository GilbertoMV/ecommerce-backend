const { getConnection } = require('../db/db.js');

// Función para obtener todos los productos del catálogo
const getAllProducts = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM CatalogoProductos');
  return rows;
};

// Función para obtener el producto por su ID
const getProductById = async (id) => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM CatalogoProductos WHERE id_producto = ?', [id]);
  return rows[0];
};

module.exports = {
  getAllProducts,
  getProductById
};
