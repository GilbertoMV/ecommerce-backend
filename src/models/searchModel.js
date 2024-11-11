import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Search = sequelize.define('Search',{
    id_busqueda:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    termino_busqueda:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_hora:{
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName: 'BusquedaUsuario',
    timestamps: false,
 });

 export default Search;