import Category from '../models/categoryModel.js';

export const getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; // Cálculo del desplazamiento para la paginación

    // Parámetros de ordenación
    let sort = req.query.sort || 'id_categoria'; // Campo de ordenación por defecto
    const order = req.query.order || 'ASC'; 

    // Validación de campos válidos para ordenación
    const validSortFields = ['id_categoria', 'nombre']; 
    if (!validSortFields.includes(sort)) {
      sort = 'id_categoria'; 
    }

    // Consulta con paginación y ordenación
    const { count, rows } = await Category.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, order]] // Orden dinámico basado en los parámetros
    });

    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCategories: count,
      categories: rows
    });
  } catch (error) {
    console.error('Error al obtener las categorias:', error);
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