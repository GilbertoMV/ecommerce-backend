import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Product = sequelize.define('Product', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caracteristicas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false,
  },
  existencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  huella_carbono: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false,
  },
  puntos_recompensa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'CatalogoProductos',
  timestamps: false,
});

export default Product;