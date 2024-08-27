import Order_detail from "../models/order_detailModel.js"

export const getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await Order_detail.findAll();
        res.json(orderDetails);
    } catch (error) {
        console.error('Error al obtener los detalles de pedidos',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getOrderDetailById = async (req, res) => {
    const id_detalles_pedidos = req.params.id;
    try {
        const orderDetail = await Order_detail.findByPk(id_detalles_pedidos);
        if(!orderDetail){
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' })
        }
        res.json(orderDetail);
    } catch (error) {
        console.error('Error al obtener el detalle del pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getOrderDetailByOrder = async (req,res) => {
    const id_pedido = req.params.id;
    try {
        const orderDetail = await Order_detail.findAll({ where: { id_pedido } });
        if(!orderDetail){
            res.status(404).json({ error: 'Detalles de pedido no encontrados' })
            return;
        }
        res.json(orderDetail);
    } catch (error) {
        console.error('Error al obtener el detalle del pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getOrderDetailByProduct = async (req,res) => {
    const id_producto = req.params.id;
    try {
        const orderDetail = await Order_detail.findAll({ where: { id_producto } });
        if(!orderDetail){
            res.status(404).json({ error: 'Detalle del pedido no encontrado' })
            return;
        }
        res.json(orderDetail);
    } catch (error) {
        console.error('Error al obtener el detalle del pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createOrderDetail = async (req, res) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    try {
        const newOrderDetail = await Order_detail.create({
            id_pedido,
            id_producto,
            cantidad,
            precio_unitario
        });
        res.status(201).json({ id: newOrderDetail.id_detalles_pedidos, message: 'Detalles de pedido creado exitosamente' });
    } catch (error) {
        console.error('Error al crear detalle de pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateOrderDetail = async (req, res) => {
    const id_detalles_pedidos = req.params.id;
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    try {
        const [updated] = await Order_detail.update({
            id_pedido,
            id_producto,
            cantidad,
            precio_unitario
        }, { where: { id_detalles_pedidos } });
        if(!updated){
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        res.json({ message: 'Detalle de pedido actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar detalle de pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteOrderDetail = async (req, res) => {
    const id_detalles_pedidos = req.params.id;
    try {
        const result = await Order_detail.destroy({ where: { id_detalles_pedidos } });
        if(result > 0){
            res.json({ message: 'Detalle de pedido eliminado exitosamente' })
        } else {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar detalle de pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};