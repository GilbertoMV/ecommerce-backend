import Image from '../models/imageModel.js';

export const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.json(images);
    } catch (error) {
        console.error('Error al obtener las imágenes', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }  
};

export const getImageById = async (req, res) => {
    const id_imagen = req.params.id;
    try {
        const image = await Image.findByPk(id_imagen);
        if(!image){
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.json(image);
    } catch (error) {
        console.error('Error al obtener la imagen por ID', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getImageByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const image = await Image.findAll({ where: { id_producto } });
        if(!image){
            return res.status(404).json({ error: 'Imagenes no encontradas' });
        }
        res.json(image);
    } catch (error) {
        console.error('Error al obtener la imagen por usuario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createImage = async (req, res) => {
    const {id_producto, url_imagen, descripcion} = req.body;
    try {
        const newImage = await Image.create({
            id_producto,
            url_imagen,
            descripcion
        });
        res.status(201).json({ id:newImage.id_imagen, message:'Imagen creada con exito'})
    } catch (error) {
        console.error('Error al crear la imagen', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateImage = async (req, res) => {
    const id_imagen = req.params.id;
    const {id_producto, url_imagen, descripcion} = req.body;
   try {
    const [updated] = await Image.update({
        id_producto,
        url_imagen,
        descripcion
    },{ where : { id_imagen } });
    if(updated){
        res.json({ message: 'Imagen actualizada con éxito'});
    }
    else{
        res.status(404).json({ error: 'Imagen no encontrada'});
    }
   } catch (error) {
    console.error('Error al actualizar la imagen',error);
    res.status(500).json({ error: 'Error interno del servidor' });
   }
};

export const deleteImage = async (req, res) => {
    const id_imagen = req.params.id;
    try {
        const result = await Image.destroy({ where : { id_imagen } });
        if(result > 0){
            res.json({ message: 'Imagen eliminada con éxito'});
        }
        else{
            res.status(404).json({ error: 'Imagen no encontrada'});
        }
    } catch (error) {
        console.error('Error al eliminar la imagen', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};