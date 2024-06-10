import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
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
    }, { where: { id_producto } });
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
