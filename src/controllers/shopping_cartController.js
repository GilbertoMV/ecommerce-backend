import Shopping_cart from '../models/shopping_cartModel.js'

export const getAllShopping_cart = async (req,res) => {
    try {
        const shopping_cart = await Shopping_cart.findAll();
        res.json(shopping_cart)
    } catch (error) {
        console.error('Error al obtener los carritos de compra:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getShopping_cartById = async (req,res) =>{
    const id_carrito = req.params.id;
    try {
        const shopping_cart = await Shopping_cart.findByPk(id_carrito);
        if(!shopping_cart){
            res.status(404).json({error: 'Carrito no encontrado' })
            return;
        }
        res.json(shopping_cart)
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getShopping_cartByUser = async (req,res) =>{
    const id_usuario = req.params.id;
    try {
        const shopping_cart = await Shopping_cart.findAll({where : { id_usuario } });
        if(!shopping_cart){
            res.status(404).json({error: 'Carritos no encontrados' })
            return;
        }
        res.json(shopping_cart)
    } catch (error) {
        console.error('Carrito(s) no encontrado(s)',error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteShopping_cart = async (req,res) => {
    const id_carrito = req.params.id;
    try {
        const result = await Shopping_cart.destroy({ where: { id_carrito } });
        if(result > 0) {
            res.json({ message: 'Carrito eliminado exitosamente'});
        }else{
            res.status(404).json({ error: 'Carrito no encontrado'});
        }
    } catch (error) {
        console.error('Error al eliminar el carrito:',error);
        res.status(500).json({ error: 'Error intterno del servidor'});
    }
};

export const createShopping_cart = async (req,res) =>{
    const {id_usuario, fecha_creacion, estado} = req.body;
    try {
        const newShopping_cart = await Shopping_cart.create({
            id_usuario,
            fecha_creacion,
            estado
        });
        res.status(201).json({ id: newShopping_cart.id_carrito, message: 'Carrito creado exitosamente'})
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateShopping_cart = async (req,res) => {
    const id_carrito = req.params.id;
    const {id_usuario, fecha_creacion, estado} = req.body;
    try {
        const [updated] = await Shopping_cart.update({
            id_usuario,
            fecha_creacion,
            estado
        }, { where: {id_carrito } });
        if(updated){
            res.json({ message: 'Carrito editado exitosamente'})
        }else{
            res.status(404).json({ error: 'Carrito no encontrado'})
        }
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
 
};