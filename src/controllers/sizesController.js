import Sizes from '../models/sizesModels.js';

export const getAllsizes = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const offset = (page - 1) * limit; // Cálculo del desplazamiento para la paginación
  
      // Parámetros de ordenación
      let sort = req.query.sort || 'id_talla'; // Campo de ordenación por defecto
      const order = req.query.order || 'ASC'; 
  
      // Validación de campos válidos para ordenación
      const validSortFields = ['id_talla', 'nombre']; 
      if (!validSortFields.includes(sort)) {
        sort = 'id_talla'; 
      }
  
      // Consulta con paginación y ordenación
      const { count, rows } = await Sizes.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [[sort, order]] // Orden dinámico basado en los parámetros
      });
  
      res.status(200).json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalSizes: count,
        sizes: rows
      });
    } catch (error) {
      console.error('Error al obtener las tallas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export const getSizesById = async (req, res) => {
    const id_talla = req.params.id;
    try {
        const size = await Sizes.findByPk(id_talla);
        if(!size){
            res.status(404).json({ message: 'Talla no encontrado' });
            return;
        }
        res.json(size);
    } catch (error) {
        console.error('Error al obtener la talla', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createSizes = async (req, res) => {
    const { nombre } = req.body;
    const existingSize = await Sizes.findOne({ where: { nombre } });
    try {
        if (existingSize) {
             res.status(409).json({ error: 'La talla ya esta registrado' });
            return;
            }
        const newSize = await Sizes.create({ nombre });
        res.status(201).json({id: newSize.id_talla, message: 'Talla creada con exito'});
    } catch (error) {
        console.error('Error al crear el Tallas', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateSize = async (req, res) => {
    const id_talla = req.params.id;
    const { nombre } = req.body;
    try {
        const [updated] = await Sizes.update({ nombre }, { where: { id_talla } });
        if(!updated){
            res.status(404).json({ message: 'Talla no encontrada' });
            return;
        }
        res.json({ message: 'Talla actualizada con exito' });
    } catch (error) {
        console.error('Error al actualizar la talla', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteSize = async (req, res) => {
    const id_talla = req.params.id;
    try {
        const deleted = await Sizes.destroy({ where: { id_talla } });
        if(!deleted){
            res.status(404).json({ message: 'Talla no encontrada' });
            return;
        }
        res.json({ message: 'Talla eliminada con exito' });
    } catch (error) {
        console.error('Error al eliminar la talla', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}