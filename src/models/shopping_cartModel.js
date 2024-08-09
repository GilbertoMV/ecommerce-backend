import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Shopping_cart = sequelize.define('Shopping_cart',{
    id_carrito:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    fecha_creacion:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    estado:{
        type:DataTypes.ENUM('Activo', 'Inactivo', 'Comprado', 'Abandonado'),
        allowNull:false
    },
},{
    tableName: 'CarritoCompras',
    timestamps:false,
});

export default Shopping_cart;