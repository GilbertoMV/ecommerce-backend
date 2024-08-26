import Colors from '../models/colorsModel.js';

export const getAllColors = async (req, res) => {
    try {
        const colors = await Colors.findAll();
        res.json(colors);
    } catch (error) {
        console.error('Error al obtener los colores',error);
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