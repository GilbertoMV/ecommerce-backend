import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Sizes = sequelize.define('Sizes',{
    id_talla:{
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
    tableName: 'Tallas',
    timestamps: false,
 });

 export default Sizes;