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

export const getProductSizeBySize = async (req,res) => {
    const id_talla = req.params.id;
    try {
        const productSize = await Product_size.findByPk(id_talla);
        if(!productSize){
            res.status(404).json({ error: 'No se encontro la talla del producto' });
            return;
        }
        res.json(productSize);
    } catch (error) {
        console.error('Error al obtener la talla del producto', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getProductSizeByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const productSize = await Product_size.findByPk(id_producto);
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
 //TODO: Por ahora fuera de servicio hasta al rato