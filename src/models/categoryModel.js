import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Category = sequelize.define('Category', {
  id_categoria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url_imagen:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'CategoriasProductos',
  timestamps: false,
});

export default Category;
