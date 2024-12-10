import Cart_detail from '../models/shopping_cart_detailsModel.js'
import Image from '../models/imageModel.js'
import Product from '../models/productModel.js'


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
    const { id } = req.params;

    try {
        const cartDetails = await Cart_detail.findAll({
            where: { id_carrito: id },
            include: [
                {
                    model: Product,
                    attributes: ['id_producto', 'nombre', 'descripcion', 'precio', 'huella_carbono', 'puntos_recompensa'],
                    include: [
                        {
                            model: Image,
                            attributes: ['url_imagen']
                        }
                    ]
                }
            ]
        });

        if (cartDetails.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para este carrito' });
        }

        const products = cartDetails.map(detail => {
            const product = detail.Product;
            const quantity = detail.cantidad;
            const firstImage = product.Images?.[0]?.url_imagen || null;
            const precioTotal = parseFloat(product.precio) * quantity;

            return {
                id_detalle: detail.id_detalle, // Agregamos el ID del detalle
                id_producto: product.id_producto,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio_unitario: parseFloat(product.precio),
                precio_total: precioTotal.toFixed(2), // Formatear a 2 decimales
                huella_carbono: product.huella_carbono,
                puntos_recompensas: product.puntos_recompensa,
                cantidad: quantity,
                imagen: firstImage
            };
        });

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
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
        // Verificar si el producto ya existe en el carrito
        const existingCartDetail = await Cart_detail.findOne({
            where: { id_carrito, id_producto }
        });

        if (existingCartDetail) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            existingCartDetail.cantidad += cantidad; // Sumar la cantidad
            // Si es necesario, también podrías actualizar el precio o el descuento si varían
            existingCartDetail.precio = precio * existingCartDetail.cantidad;
            existingCartDetail.descuento = descuento;
            
            await existingCartDetail.save(); // Guardar los cambios en la base de datos
            
            return res.status(200).json({
                message: 'Cantidad actualizada exitosamente en el carrito'
            });
        } else {
            // Si el producto no existe en el carrito, crear un nuevo detalle de carrito
            const newCartDetail = await Cart_detail.create({
                id_carrito,
                id_producto,
                cantidad,
                precio,
                descuento
            });
            return res.status(201).json({
                id: newCartDetail.id_detalle,
                message: 'Producto agregado al carrito exitosamente'
            });
        }
    } catch (error) {
        console.error('Error al crear o actualizar el detalle del carrito', error);
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

