import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Rates = sequelize.define('Rates',{
    id_valoraciones: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comentario:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    fecha_hora:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    calificacion:{
        type: DataTypes.DECIMAL(3,2),
        allowNull: false,
    }
},{
    tableName: 'Valoraciones',
    timestamps: false,
});

export default Rates;