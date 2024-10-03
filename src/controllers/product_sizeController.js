import Product_size from '../models/product_sizeModel.js'

export const getAllProductSize = async (req,res) => {
    try {
        const productSize = await Product_size.findAll();
        res.json(productSize)
    } catch (error) {
        console.error('Error al obtener las tallas del producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/* No es necesaria 
export const getProductSizeBySize = async (req,res) => {
    const id_talla = req.params.id;
    try {
        const productSize = await Product_size.findAll({ where : {id_talla } });
        if(!productSize){
            res.status(404).json({ error: 'No se encontro la talla del producto' });
            return;
        }
        res.json(productSize);
    } catch (error) {
        console.error('Error al obtener la talla del producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}; */

export const getProductSizeByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const productSize = await Product_size.findAll({ where: { id_producto } });
        if(!productSize){
            res.status(404).json({ error: 'No se encontro el producto en estas tallas' });
            return;
        }
        res.json(productSize);
    } catch (error) {
        console.error('Error al obtener el producto en las tallas', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createProductSize = async (req,res) => {
    const {id_producto,id_talla} = req.body;
    try {
        const existingProductSize = await Product_size.findOne({where: {id_producto,id_talla } });
        if (existingProductSize) {
            return res.status(400).json({ error: 'Ya existe una talla asociada a este producto.' });
        }
        const newProductSize = await Product_size.create({
            id_producto,
            id_talla
        });
        res.status(201)
        res.json(newProductSize,'Talla producto creado exitosamente');
    } catch (error) {
        console.error('Error al crear la talla producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/* TODO: El metodo update queda fuera por inconsistencia e inservibilidad
export const updateProductSize = async (req,res) => {
    const {id_producto, id_talla} = req.params;
    try {
        const [updated] = await Product_size.update({
            id_talla: id_talla,     // Actualizar con el mismo id_talla
            id_producto: id_producto // Actualizar con el mismo id_producto
        }, { where: { 
            id_talla: id_talla,     // Actualizar con el mismo id_talla
            id_producto: id_producto // Actualizar con el mismo id_producto
             } });
        if(updated){
            res.status(200).json({ message: 'Talla producto actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se encontro el producto en estas tallas' });
        }
    } catch(error){
        console.error('Error al actualizar talla producto',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}*/
export const deleteProductSize = async (req,res) => {
    const {id_talla, id_producto} = req.params;
    try {
        const result = await Product_size.destroy({ where: { id_talla, id_producto } });
        if(result > 0){
            res.json({ message: 'Talla producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se encontro el producto en estas tallas' });
        }
    } catch (error) {
        console.error('Error al eliminar la talla producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
 //TODO: Por ahora fuera de servicio hasta al rato