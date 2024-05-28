import getConnection from '../config/db.js'

//Funcion para obtener todas las categorias
const getAllCategorys = async ()=>{
    const connection = await getConnection();
    const[rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.CategoriasProductos');
    return rows;
}

//Funcion para obtener la categoria por ID
const getCategoryById = async (id)=>{
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM '+process.env.DB_NAME+'.CategoriasProductos WHERE id_categoria = ?',[id]);
    return rows[0];
}
//Funcionar para eliminar categoria
const deleteCategory = async(id)=>{
    const connection = await getConnection();
    const [rows] = await connection.query('DELETE FROM '+process.env.DB_NAME+'.CatalogoProductos WHERE id_categoria = ?',[id])
    return rows.affectedRows;
}
//Funcion para crear una categoria
const createCategory = async(categorysData)=>{
    const connection = await getConnection();
    const [rows] = await connection.query('INSERT INTO '+process.env.DB_NAME+'.CategoriaProductos SET ?', categorysData);
    return rows.insertId
  }
  //Funcion para editar una categoria
  const updateCategory = async (id,categorysData)=>{
    const connection = await getConnection();
    const [rows] = await connection.query('UPDATE '+process.env.DB_NAME+'.CategoriasProductos SET ? WHERE id_categoria = ?',[categorysData,id]);
    return rows.affectedRows;
  }
export {
    getAllCategorys,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}