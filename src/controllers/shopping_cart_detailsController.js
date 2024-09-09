import Cart_detail from '../models/shopping_cart_detailsModel.js'

export const getAllCartDetails = async (req, res) => {
    try {
        const cartDetails = await Cart_detail.findAll();
        res.json(cartDetails);
    } catch (error) {
        console.error('Error al obtener los detalles de carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
export const getCartDetailById = async (req, res) => {
    const id_detalle = req.params.id;
    try {
        const cartDetail = await Cart_detail.findByPk(id_detalle);
        if(!cartDetail){
            res.status(404).json({ error: 'Detalle de carrito no encontrado' })
            return;
        }
        res.json(cartDetail);
    } catch (error) {
        console.error('Error al obtener el detalle del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getCartDetailByCart = async (req, res) => {
    const id_carrito = req.params.id;
    try {
        const cartDetail = await Cart_detail.findAll({ where: { id_carrito } });
        if(!cartDetail){
            res.status(404).json({ error: 'Detalles de carrito no encontrados' })
            return;
        }
        res.json(cartDetail);
    } catch (error) {
        console.error('Error al obtener los detalles del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getCartDetailByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const cartDetail = await Cart_detail.findAll({ where: { id_producto } });
        if(!cartDetail){
            res.status(404).json({ error: 'Detalles de carrito no encontrados' })
            return;
        }
        res.json(cartDetail);
    } catch (error) {
        console.error('Error al obtener los detalles del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createCartDetail = async (req, res) => {
    const { id_carrito, id_producto, cantidad, precio, descuento } = req.body;
    try {
        const newCartDetail = await Cart_detail.create({ 
            id_carrito, 
            id_producto, 
            cantidad,
            precio, 
            descuento 
        });
        res.status(201).json({id: newCartDetail.id_detalle, message: 'Detalles del carrito creado exitosamente'});
    } catch (error) {
        console.error('Error al crear el detalle del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateCartDetail = async (req, res) => {
    const id_detalle = req.params.id;
    const { id_carrito, id_producto, cantidad, precio, descuento } = req.body;
    try {
        const [updated] = await Cart_detail.update({
            id_carrito,
            id_producto,
            cantidad,
            precio,
            descuento
        }, { where: { id_detalle } });
        if(!updated) {
            res.status(404).json({ error: 'Detalle de carrito no encontrado' });
            return;
        }
        res.json({ message: 'Detalles del carrito actualizados exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el detalle del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteCartDetail = async (req, res) => {
    const id_detalle = req.params.id;
    try {
        const result = await Cart_detail.destroy({ where: { id_detalle } });
        if(result > 0){
            res.json({ message: 'Detalle de carrito eliminado exitosamente' })
        } else {
            res.status(404).json({ error: 'Detalle de carrito no encontrado' })
        }
    } catch (error) {
        console.error('Error al eliminar el detalle del carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

