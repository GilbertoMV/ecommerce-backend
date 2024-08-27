import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"

const Order_detail = sequelize.define('Order_detail',{
    id_detalles_pedidos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_pedido:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    cantidad :{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario:{
        type: DataTypes.DECIMAL(6,2),
        allowNull: false,
    }
},{
    tableName: 'DetallesPedidos',
    timestamps: false
});

export default Order_detail;