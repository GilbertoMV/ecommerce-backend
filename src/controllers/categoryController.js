import Category from '../models/categoryModel.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getCategoryById = async (req, res) => {
  const id_categoria = req.params.id;
  try {
    const category = await Category.findByPk(id_categoria);
    if (!category) {
      res.status(404).json({ error: 'Categoría no encontrada' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteCategory = async (req, res) => {
  const id_categoria = req.params.id;
  try {
    const result = await Category.destroy({ where: { id_categoria } });
    if (result > 0) {
      res.json({ message: 'Categoría eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createCategory = async (req, res) => {
  const { nombre, descripcion,url_imagen } = req.body;
  try {
    const newCategory = await Category.create({
      nombre,
      descripcion,
      url_imagen
    });
    res.status(201).json({ id: newCategory.id_categoria, message: 'Categoría creada exitosamente' });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateCategory = async (req, res) => {
  const id_categoria = req.params.id;
  const { nombre, descripcion,url_imagen } = req.body;
  try {
    const [updated] = await Category.update({
      nombre,
      descripcion,
      url_imagen
    }, { where: { id_categoria } });
    if (updated) {
      res.json({ message: 'Categoría actualizada exitosamente' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};