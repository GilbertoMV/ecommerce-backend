import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Product_color = sequelize.define('Product_color',{
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    id_color:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    }
},{
    tableName: 'ProductoColores',
    timestamps: false,
});

export default Product_color;