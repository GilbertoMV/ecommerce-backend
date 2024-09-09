import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"

const Cart_detail = sequelize.define('Cart_detail',{
    id_detalle:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_carrito:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio:{
        type: DataTypes.DECIMAL(6,2),
        allowNull: false,
    },
    descuento:{
        type: DataTypes.DECIMAL(6,2),
        allowNull: false,
    }
},{
    tableName: 'DetallesCarrito',
    timestamps: false,
 });

 export default Cart_detail;