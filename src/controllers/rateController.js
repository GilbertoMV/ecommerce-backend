import Rates from '../models/rateModel.js'

export const getAllRates = async (req, res) => {
    try {
        const rate = await Rates.findAll()
        res.json(rate)
    } catch (error) {
        console.error('Error al obtener valoracion(es)',error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
};

export const getRateById = async (req, res) => {
    const id_valoraciones = req.params.id;
    try {
        const rate = await Rates.findByPk(id_valoraciones)
        if(!rate){
            return res.status(404).json({ error: 'Valoracion no encontrada' })
        }
        res.json(rate)
    } catch (error) {
        console.error('Error al obtener valoracion',error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
};

export const getRateByUser = async (req,res) => {
    const id_usuario = req.params.id;
    try {
        const rate = await Rates.findAll({ where: { id_usuario } });
        if(!rate){
            return res.status(404).json({ error: 'Valoraciones no encontradas' })
        }
        res.json(rate)
    } catch (error) {
        console.error('Error al obtener valoraciones',error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
};

export const getRateByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const rate = await Rates.findAll({ where: { id_producto } });
        if(!rate){
            return res.status(404).json({ error: 'Valoraciones no encontradas' })
        }
        res.json(rate)
    } catch (error) {
        console.error('Error al obtener valoraciones',error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
};

export const createRate = async (req, res) => {
    const {id_producto, id_usuario, comentario, fecha_hora, calificacion} = req.body;
    try {
        const newRate = await Rates.create({
            id_producto,
            id_usuario,
            comentario,
            fecha_hora,
            calificacion
        });
        res.status(201).json({ id: newRate.id_valoraciones, message: 'Valoracion creada exitosamente' })
    } catch (error) {
        console.error('Error al crear valoraciones',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateRate = async (req, res) => {
    const id_valoraciones = req.params.id;
    const { id_producto, id_usuario, comentario, calificacion } = req.body;
    try {
        const [updated] = await Rates.update({
            id_producto,
            id_usuario,
            comentario,
            calificacion
        }, { where: { id_valoraciones } });
        if(!updated){
            return res.status(404).json({ error: 'Valoracion no encontrada' })
        }
        res.json({ message: 'Valoracion actualizada exitosamente' })
    } catch (error) {
        console.error('Error al actualizar valoracion',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteRate = async (req, res) => {
    const id_valoraciones = req.params.id;
    try {
        const result = await Rates.destroy({ where: { id_valoraciones } });
        if(result > 0){
            res.json({ message: 'Valoracion eliminada exitosamente' })
        } else {
            res.status(404).json({ error: 'Valoracion no encontrada' })
        }
    } catch (error) {
        console.error('Error al eliminar valoracion',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};