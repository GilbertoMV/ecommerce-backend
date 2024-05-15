import { DB_NAME } from '../db/config.js'
import getConnection from '../db/db.js'

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

//Funcion para borrar productos por su ID
const deleteProduct = async(id)=>{
  const connection = await getConnection();
  const [rows] = await connection.query('DELETE FROM '+DB_NAME+'.CatalogoProductos WHERE id_producto = ?',[id])
  return rows.affectedRows;
}
export {
  deleteProduct,
  getAllProducts,
  getProductById
};
