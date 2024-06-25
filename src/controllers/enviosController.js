import Shipment from '../models/enviosModel.js';

export const getAllShipments = async (req,res) => {
try {
    const shipments = await Shipment.findAll();
    } catch (error) {
        console.error('Error al obtener los los envios', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }  
};

export const getShipmentById = async(req,res) => {
    const id_envio = req.params.id;
    try {
        const shipment = await Shipment.findByPk(id_envio);
        if(!shipment){
            res.status(404).json({ error: 'Envio no encontrado' });
             return;
            }
        }catch (error) {
            console.error('Error al obtener el envio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
    } 
        

};

export const deleteShipment = async (req,res) => {
    const id_envio = req.params.id;
    try {
        const result = await Shipment.destroy({ where: { id_envio }});
        if (result > 0){
            res.json({ message: 'Envio eliminado '});
        }else{
            res.status(404).json({ error: 'Envio no encontrado'})
        }
    } catch (error) {
        console.error('Error al eliminar el envio', error);
        res.status(500).json({ error: 'Error interno del servidor'});
    }
};

export const createShipment = async (req,res) => {
    const {id_pedido, proveedor, costo, tiempo_estimado_entrega, estado, tipo_envio} = req.body
    try {
        const newShipment = await Shipment.create({
            id_pedido,
            proveedor,
            costo,
            tiempo_estimado_entrega,
            estado,
            tipo_envio
        });
        res.status(201).json({ id: newShipment.id_envio, message: 'Envio creado exitosamente' });
    } catch (error) {
        console.error('Error al crear envio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });    
    }
};

export const updateShipment = async (req,res) =>{
    const id_envio = req.params.id;
    const {id_pedido, proveedor, costo, tiempo_estimado_entrega, estado, tipo_envio} = req.body
    try {
        const[updated] = await Shipment.update({
            tiempo_estimado_entrega,
            estado
        }, {where: { id_envio }});
        if(updated){
            res.json({ message: 'Envio actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
    } catch (error) {
        console.error('Error al actualizar el envio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};