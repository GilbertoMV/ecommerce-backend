import History_order from "../models/order_historyModel.js";

export const getAllHistoryOrders = async (req, res) => {
    try {
        const historyOrders = await History_order.findAll();
        res.json(historyOrders);
    } catch (error) {
        console.error('Error al obtener el historial de pedidos', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
 };

export const getHistoryOrderById = async (req, res) => {
    const id_historial = req.params.id;
    try {
        const historyOrder = await History_order.findByPk(id_historial);
        if(!historyOrder){
            res.status(404).json({ error: 'No se encontró el historial de pedido' });
            return;
        }
        res.json(historyOrder);
    } catch (error) {
        console.error('Error al obtener historial del pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
 };


 export const getHistoryOrderByUser = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const historyOrders = await History_order.findAll({ where: { id_usuario } });
        if(!historyOrders){
            res.status(404).json({ error: 'No se encontró el historial de pedido(s)'});
            return;
        }
        res.json(historyOrders);
    } catch (error) {
        console.error('Error al obtener historial pedido(s)',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getHistoryOrderByProduct = async (req, res) => {
    const id_pedido = req.params.id;
    try {
        const historyOrders = await History_order.findAll({ where : { id_pedido } });
        if(!historyOrders){
            res.status(404).json({ error: 'No se encontró el historial de pedido(s)' });
            return;
        }
        res.json(historyOrders);
    } catch (error) {
        console.error('Error al obtener historial de pedido(s)',error);
        res.status(500).json({ error: 'Error interno del servidor' });    
    }
};

export const createHistoryOrder = async (req, res) => {
    const {id_pedido, id_usuario, estado_nuevo, fecha_hora_cambio, motivo_cambio} = req.body;
    try {
        const newHistoryOrder = await History_order.create({
            id_pedido, 
            id_usuario, 
            estado_nuevo, 
            fecha_hora_cambio, 
            motivo_cambio
        });
        res.status(201).json({id: newHistoryOrder.id_historial, message: 'Historial de pedido creado exitosamente'});
    } catch (error) {
        console.error('Error al crear el historial del pedido', error);
        res.status(500).json({ error: 'Error interno del servidor' });        }
};

export const updateHistoryOrder = async (req, res) => {
    const id_historial = req.params.id;
    const { estado_nuevo, fecha_hora_cambio, motivo_cambio} = req.body;
    try {
        const historyOrder = await History_order.findOne({ where: { id_historial } });
        if (!historyOrder) {
            return res.status(404).json({ error: 'No se encontró el historial de pedido' });
        }

        // Usar el estado_nuevo actual como estado_anterior
        const estado_anterior = historyOrder.estado_nuevo;
        const[updated] = await History_order.update({
            estado_anterior,
            estado_nuevo, 
            fecha_hora_cambio, 
            motivo_cambio
        }, { where : {id_historial}});
        if(!updated){
            res.status(404).json({ error: 'No se encontró el historial de pedido' });
            return;
        }
        res.json({ message: 'Historial de pedido actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el historial del pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteHistoryOrder = async (req, res) => {
    const id_historial = req.params.id;
    try {
        const result = await History_order.destroy({ where : { id_historial }});
        if(result > 0){
            res.json({ message: 'Historial eliminado'})
        }else{
            res.status(404).json({ error: 'No se encontró el historial de pedido' });
        }
    } catch (error) {
        console.error('Error al eliminar el historial del pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};