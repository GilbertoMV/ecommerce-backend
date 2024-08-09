import Order from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
    try {
        const order = await Order.findAll();
        res.json(order);
    } catch (error) {
        console.error('Error al obtener los pedidos',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getOrderByUser = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const order = await Order.findAll({ where: {id_usuario} });
        if(!order){
            res.status(404).json({ error: 'pedido(s) no encontrados' });
            return;
        }
        res.json(order);
    } catch (error) {
        console.error('Error al obtener pedido(s)',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getOrderById = async (req, res) => {
    const id_pedido = req.params.id;
    try {
        const order = await Order.findByPk(id_pedido);
        if(!order){
            res.status(404).json({ error: 'Pedido no encontrado' });
            return;
        }
        res.json(order);
    } catch (error) {
        console.error('Error al obtener pedido(s)',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteOrder = async (req, res) => {
    const id_pedido = req.params.id;
    try {
        const result = await Order.destroy({ where: { id_pedido } });
        if(result > 0) {
            res.json({ message: 'Pedido eliminado exitosamente'}).status(204);
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createOrder = async (req, res) => {
    const { id_usuario, id_direccion_destino, fecha_hora, estado, metodo_pago } = req.body;
    try {
        const newOrder = await Order.create({
            id_usuario,
            id_direccion_destino,
            fecha_hora,
            estado,
            metodo_pago
        });
        res.status(201).json({id:newOrder.id_pedido,message: 'Pedido creado exitosamente'});
    } catch (error) {
        console.error('Error al crear pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateOrder = async (req, res) => {
    const id_pedido = req.params.id;
    const { id_usuario, id_direccion_destino, fecha_hora, estado, metodo_pago } = req.body;
    try {
        const [updated] = await Order.update({
            id_usuario,
            id_direccion_destino,
            fecha_hora,
            estado,
            metodo_pago
        }, { where: { id_pedido } });
        if(updated) {
            res.status(200).send( {message: 'Pedido actualizado exitosamente'});
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};