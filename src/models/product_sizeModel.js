import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product_size = sequelize.define('Product_size',{
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    id_talla:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    }
},{
    tableName: 'ProductoTallas',
    timestamps: false,
});

export default Product_size;