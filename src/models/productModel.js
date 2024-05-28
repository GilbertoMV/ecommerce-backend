import getConnection from '../config/db.js'

// Función para obtener todos los productos del catálogo
const getAllProducts = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.CatalogoProductos');
  return rows;
};

// Función para obtener el producto por su ID
const getProductById = async (id) => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.CatalogoProductos WHERE id_producto = ?', [id]);
  return rows[0];
};

//Funcion para borrar productos por su ID
const deleteProduct = async(id)=>{
  const connection = await getConnection();
  const [rows] = await connection.query('DELETE FROM '+process.env.DB_NAME+'.CatalogoProductos WHERE id_producto = ?',[id])
  return rows.affectedRows;
}

//Funcion para crear un producto
const createProduct = async(productData)=>{
  const connection = await getConnection();
  const [rows] = await connection.query('INSERT INTO '+process.env.DB_NAME+'.CatalogoProductos SET ?', productData);
  return rows.insertId
}
//Funcion para editar un producto
const updateProduct = async (id,productData)=>{
  const connection = await getConnection();
  const [rows] = await connection.query('UPDATE '+process.env.DB_NAME+'.CatalogoProductos SET ? WHERE id_producto = ?',[productData,id]);
  return rows.affectedRows;
}


export {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
};
