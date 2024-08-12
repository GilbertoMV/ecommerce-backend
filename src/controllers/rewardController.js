import Reward from "../models/rewardModel.js"

export const getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.findAll();
        res.json(rewards);
    } catch (error) {
        console.error("Error al obtener recompensa(s)", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getRewardById = async (req, res) => {
    const id_recompensa_recibida = req.params.id;
    try {
        const reward = await Reward.findByPk(id_recompensa_recibida);
        if (!reward) {
            res.status(404).json({ error: "Recompensa no encontrada" });
            return;
        }
        res.json(reward);
    } catch (error) {
        console.error("Error al obtener recompensa por ID", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getRewardByUser = async (req,res) => {
    const id_usuario = req.params.id;
    try {
        const reward = await Reward.findAll({ where: { id_usuario } });
        if(!reward){
            res.status(404).json({ error: 'recompensa(s) no encontrados' });
            return;
        }
        res.json(reward);
    } catch (error) {
        console.error('Error al obtener recompensa(s)', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getRewardByOrder = async (req,res) => {
    const id_pedido = req.params.id;
    try {
        const reward = await Reward.findAll({ where: { id_pedido } });
        if(!reward){
            res.status(404).json({ error: 'Recompensa(s) no encontradas' });
            return;
        }
        res.json(reward);
    } catch (error) {
        console.error('Error al obtener recompensa(s)',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createReward = async (req, res) => {
    const { id_usuario, id_pedido, puntos_recibidos} = req.body
    try {
        const newReward = await Reward.create({
            id_usuario,
            id_pedido,
            puntos_recibidos
        });
        res.status(201).json({ id:newReward.id_recompensas, message: 'Recompensa creada exitosamente'})
    } catch (error) {
        console.error('Error al crear envio', error);
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
};

export const updateReward = async (req, res) => {
    const id_recompensa_recibida = req.params.id;
    const { id_usuario, id_pedido, puntos_recibidos } = req.body;
    try {
        const [updated] = await Reward.update({
            id_usuario,
            id_pedido,
            puntos_recibidos
        }, { where: { id_recompensa_recibida } });
        if(updated){
            res.json({ message: 'Recompensa actualizada exitosamente' });
        }
        else {
            res.status(404).json({ error: 'Recompensa no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar recompensa', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteReward = async (req, res) => {
    const id_recompensa_recibida = req.params.id;
    try {
        const result = await Reward.destroy({ where: { id_recompensa_recibida } });
        if(result > 0){
            res.json({ message: 'Recompensa eliminada' });
        }
        else {
            res.status(404).json({ error: 'Recompensa no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar recompensa', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};