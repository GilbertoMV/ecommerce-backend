import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Address = sequelize.define('Address', {
    id_direccion: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    codigo_postal: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    municipio: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    colonia: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    calle: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    num_exterior: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    num_interior: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    entre_calle1: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    entre_calle2: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    tipo_direccion:{
        type: DataTypes.ENUM('Laboral', 'Residencial'),
        allowNull:false,
    },
    indicaciones:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    telefono_contacto:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    tableName: 'Direcciones',
    timestamps: false,
});

export default Address;