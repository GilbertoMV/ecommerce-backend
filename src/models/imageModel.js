import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Image = sequelize.define('Image', {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'ImagenesProducto',
  timestamps: false
});

export default Image;