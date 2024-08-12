import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Reward = sequelize.define('Reward', {
    id_recompensa_recibida:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    puntos_recibidos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'RecompensasCompras',
    timestamps: false,
});

export default Reward