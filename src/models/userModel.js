import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_materno:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento:{
    type: DataTypes.DATE,
    allowNull:false,
  },
  fecha_registro:{
    type: DataTypes.DATE,
    allowNull:false,
  },
  estado_cuenta:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, 
{
  tableName: 'Usuario',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.contrasena) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    },
  },
});

export default User;
