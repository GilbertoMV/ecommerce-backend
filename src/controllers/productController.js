import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Obtén los parámetros 'sortBy' y 'order' de la solicitud
    let sort = req.query.sort;
    const order = req.query.order === 'ASC' ? 'ASC' : 'DESC'; // Orden por defecto a 'DESC'

    // Validar que 'sortBy' sea 'huella_carbono' o 'nombre'
    const validSortFields = ['huella_carbono', 'nombre','precio'];
    if (!validSortFields.includes(sort)) {
      sort = 'huella_carbono'; // Campo por defecto si no es válido
    }

    // Consulta con paginación y orden dinámico
    const { count, rows } = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, order]] // Orden dinámico basado en los parámetros validados
    });

    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalProducts: count,
      products: rows
    });
  } catch (error) {
    console.error('Error al obtener los productos del catálogo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProductById = async (req, res) => {
  const id_producto = req.params.id;
  try {
    const product = await Product.findByPk(id_producto);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProductByCategory = async (req, res) => {
  const id_categoria = req.params.id;
  try {
    const product = await Product.findAll({ where : { id_categoria} } );
    if(!product){
      res.status(404).json({ error: 'Producto(s) no encontrados' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto(s) por categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProductByUser = async (req, res) => {
  const id_usuario = req.params.id;
  try {
    const product = await Product.findAll({ where : { id_usuario } });
    if(!product){
      res.status(404).json({ error: 'Producto(s) no encontrados' });
      return;
    }
    res.json(product)
  } catch (error) {
    console.error('Error al obtener producto(s) por usuario', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createProduct = async (req, res) => {
  const { id_categoria, id_usuario,nombre,caracteristicas,descripcion,precio,existencias,huella_carbono,puntos_recompensa } = req.body;
  try {
    const newProduct = await Product.create({
      id_categoria, 
      id_usuario,
      nombre,
      caracteristicas,
      descripcion,
      precio,
      existencias,
      huella_carbono,
      puntos_recompensa
    });
    res.status(201).json({ id: newProduct.id_producto, message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateProduct = async (req, res) => {
  const id_producto = req.params.id;
  const {id_categoria, id_usuario,nombre,caracteristicas,descripcion,precio,existencias,huella_carbono,puntos_recompensa } = req.body;
  try {
    const [updated] = await Product.update({
      id_categoria,
      id_usuario,
       nombre,caracteristicas,
       descripcion,
       precio,
       existencias,
       huella_carbono,
       puntos_recompensa
    }, { where: { id_producto }});
    if (updated) {
      res.json({ message: 'Producto actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteProduct = async (req, res) => {
  const id_producto = req.params.id;
    try {
        const result = await Product.destroy({ where: { id_producto } });
        if (result > 0) {
          res.json({ message: 'Producto eliminado exitosamente' });
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
};