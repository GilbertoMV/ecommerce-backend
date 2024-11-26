import Order from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const offset = (page - 1) * limit; // Cálculo del desplazamiento para la paginación
  
      // Parámetros de ordenación
      let sort = req.query.sort || 'id_pedido'; // Campo de ordenación por defecto
      const order = req.query.order || 'ASC'; 
  
      // Validación de campos válidos para ordenación
      const validSortFields = ['id_pedido', 'id_usuario']; 
      if (!validSortFields.includes(sort)) {
        sort = 'id_pedido'; 
      }
  
      // Consulta con paginación y ordenación
      const { count, rows } = await Order.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [[sort, order]] // Orden dinámico basado en los parámetros
      });
  
      res.status(200).json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalOrders: count,
        orders: rows
      });
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
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