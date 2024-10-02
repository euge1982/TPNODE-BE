//Modelo de Pago

const { DataTypes } = require('sequelize');   //Importo DataTypes para definir tipos de datos
const sequelize = require('../database/database');   //Importo la base de datos
const User = require('./User');   //Importo el modelo de User

//Defino el modelo de Pago
const Payment = sequelize.define('Payment', {
  //Atributos del pago
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaCarga: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,   //Toma la fecha actual
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  formaPago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fechaEliminado: {
    type: DataTypes.DATE,
  }
});

//Se establece la relacion con el modelo de User
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Payment;   //Exporto el modelo