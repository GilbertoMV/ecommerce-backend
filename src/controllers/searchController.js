import Search from '../models/searchModel.js';

export const getAllSearchs = async (req, res) => {
    try {
        const searches = await Search.findAll();
        res.json(searches);
    } catch (error) {
        console.error('Error al obtener las busquedas', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getSearchById = async (req, res) => {
    const id_busqueda = req.params.id;
    try {
        const search = await Search.findByPk(id_busqueda);
        if(!search) {
            res.status(404).json({ error: 'Búsqueda no encontrada' });
            return;
        }
        res.json(search);
    } catch (error) {
        console.error('Error al obtener la busqueda', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getSearchByUser = async (req,res ) => {
    const id_usuario = req.params.id;
    try {
        const search = await Search.findAll({ where: { id_usuario } });
        if(!search){
            return res.status(404).json({ error: 'Busquedas no encontradas' });
        }
        res.json(search);
    } catch (error) {
        console.error('Error al obtener las busquedas por usuario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const createSearch = async (req, res) => {
    const { id_usuario, termino_busqueda, fecha_hora} = req.body;
    try {
        const newSearch = await Search.create({
            id_usuario,
            termino_busqueda,
            fecha_hora
        });
        res.status(201).json({ id: newSearch.id_busqueda, message: 'Búsqueda creada exitosamente' });
    } catch (error) {
        console.error('Error al crear busqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateSearch = async (req, res) => {
    const id_busqueda = req.params.id;
    const { id_usuario, termino_busqueda, fecha_hora } = req.body;
    try {
        const [updated] = await Search.update({
            id_usuario,
            termino_busqueda,
            fecha_hora
        },{ where : { id_busqueda } });
        if(updated){
            res.json({ message: 'Busqueda actualizada con éxito'});
        }
        else{
            res.status(404).json({ error: 'Busqueda no encontrada'});
        }
    } catch (error) {
        console.error('Error al actualizar la busqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteSearch = async (req, res) => {
    const id_busqueda = req.params.id;
    try {
        const result = await Search.destroy({ where : { id_busqueda } });
        if(result > 0){
            res.json({ message: 'Búsqueda eliminada con éxito'});
        } else {
            res.status(404).json({ error: 'Busqueda no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la busqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};