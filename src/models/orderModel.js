import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Orders = sequelize.define('Orders', {
  id_pedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_direccion_destino: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado'),
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.ENUM('Puntos', 'Efectivo', 'Paypal', 'TarjetaDebito', 'TarjetaCredito'),
    allowNull: false,
  }
  
}, {
  tableName: 'Pedidos',
  timestamps: false,
});

export default Orders;
