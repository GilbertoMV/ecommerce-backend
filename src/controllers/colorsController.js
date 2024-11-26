import Colors from '../models/colorsModel.js';

export const getAllColors = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const offset = (page - 1) * limit; // Cálculo del desplazamiento para la paginación
  
      // Parámetros de ordenación
      let sort = req.query.sort || 'id_color'; // Campo de ordenación por defecto
      const order = req.query.order || 'ASC'; 
  
      // Validación de campos válidos para ordenación
      const validSortFields = ['id_color', 'nombre']; 
      if (!validSortFields.includes(sort)) {
        sort = 'id_color'; 
      }
  
      // Consulta con paginación y ordenación
      const { count, rows } = await Colors.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [[sort, order]] // Orden dinámico basado en los parámetros
      });
  
      res.status(200).json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalColors: count,
        colors: rows
      });
    } catch (error) {
      console.error('Error al obtener los colores:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

export const getColorById = async (req, res) => {
    const id_color = req.params.id;
    try {
        const color = await Colors.findByPk(id_color);
        if(!color){
            res.status(404).json({ message: 'Color no encontrado' });
            return;
        }
        res.json(color);
    } catch (error) {
        console.error('Error al obtener el color', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createColor = async (req, res) => {
    const { nombre } = req.body;
    const existingColor = await Colors.findOne({ where: { nombre } });
    try {
        if (existingColor) {
             res.status(409).json({ error: 'El color ya esta registrado' });
            return;
            }
        const newColor = await Colors.create({ nombre });
        res.status(201).json({id: newColor.id_color, message: 'Color creado con exito'});
    } catch (error) {
        console.error('Error al crear el color', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const updateColor = async (req, res) => {
    const id_color = req.params.id;
    const { nombre } = req.body;
    try {
        const [updated] = await Colors.update({ nombre }, { where: { id_color } });
        if(!updated){
            res.status(404).json({ message: 'Color no encontrado' });
            return;
        }
        res.json({ message: 'Color actualizado con exito' });
    } catch (error) {
        console.error('Error al actualizar el color', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const deleteColor = async (req, res) => {
    const id_color = req.params.id;
    try {
        const deleted = await Colors.destroy({ where: { id_color } });
        if(!deleted){
            res.status(404).json({ message: 'Color no encontrado' });
            return;
        }
        res.json({ message: 'Color eliminado con exito' });
    } catch (error) {
        console.error('Error al eliminar el color', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}