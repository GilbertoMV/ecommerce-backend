import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Shipment = sequelize.define('Shipment',{
    id_envios:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    id_pedido:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    provedor:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    costo:{
        type:DataTypes.DECIMAL(5,2),
        allowNull:false,
    },
    tiempo_estimado_entrega:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    tipo_envio:{
        type:DataTypes.ENUM('Lento','Rapido','RecogerEnTienda'),
        allowNull:false,
    },
},{
    tableName: 'Envios',
    timestamps:false,
});

export default Shipment;