import Product_color from '../models/product_colorModel.js'

export const getAllProductColor = async (req,res) => {
    try {
        const productColor = await Product_color.findAll();
        res.json(productColor)
    } catch (error) {
        console.error('Error al obtener el color producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/* No es necesario p or el momento
export const getProductColorByColor = async (req,res) => {
    const id_color = req.params.id;
    try {
        const productColor = await Product_size.findAll({ where : {id_color } });
        if(!productColor){
            res.status(404).json({ error: 'No se encontro el color producto' });
            return;
        }
        res.json(productColor);
    } catch (error) {
        console.error('Error al obtener el color producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
*/
export const getProductColorByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const productColor = await Product_color.findAll({ where: { id_producto } });
        if(!productColor){
            res.status(404).json({ error: 'No se encontro el producto y sus colores' });
            return;
        }
        res.json(productColor);
    } catch (error) {
        console.error('Error al obtener el color producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createProductColor = async (req,res) => {
    const {id_producto,id_color} = req.body;
    try {
        const existingProductColor = await Product_color.findOne({where: {id_producto,id_color } });
        if (existingProductColor) {
            return res.status(400).json({ error: 'Ya existe un color asociado a este producto.' });
        }
        const newProductColor = await Product_color.create({
            id_producto,
            id_color
        });
        res.status(201)
        res.json(newProductColor,'Color producto creado exitosamente');
    } catch (error) {
        console.error('Error al crear el color producto', error);
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
export const deleteProductColor = async (req,res) => {
    const {id_color, id_producto} = req.params;
    try {
        const result = await Product_color.destroy({ where: { id_producto, id_color } });
        if(result > 0){
            res.json({ message: 'Color producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se encontro el color producto' });
        }
    } catch (error) {
        console.error('Error al eliminar el color producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
 //TODO: Por ahora fuera de servicio hasta al rato