import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Colores = sequelize.define('Color',{
    id_color:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
 },{
    tableName: 'Colores',
    timestamps: false,
 });

 export default Colores;