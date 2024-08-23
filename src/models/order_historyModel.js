import { DataTypes} from "sequelize";
import { sequelize } from "../config/db.js";

const History_order = sequelize.define('History_order',{
    id_historial:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    id_pedido:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    estado_anterior:{
        type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado'),
        allowNull: true,
    },
    estado_nuevo:{
        type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado'),
        allowNull: true,
    },
    fecha_hora_cambio:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    motivo_cambio:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    tableName: 'HistorialPedidos',
    timestamps: false,
 });

 export default History_order;