//Modelo de DeletedPayment

const { DataTypes } = require('sequelize');   //Importo DataTypes para definir tipos de datos
const sequelize = require('../database/database');   //Importo la base de datos 
const Payment = require('./Payment');   //Importa el modelo de Payment
const User = require('./User');   //Importa el modelo de User

//Defino el modelo de DeletedPayment
const DeletedPayment = sequelize.define('DeletedPayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Payment,
      key: 'id'
    },
    onDelete: 'CASCADE'   //Si un pago se elimina de la tabla Payment, se eliminara de esta tabla tambien
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,   //Quien lo elimino (id del usuario)
    references: {
      model: User, 
      key: 'id'
    }
  },
  FechaEliminado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'DeletedPayment'
});

DeletedPayment.belongsTo(Payment, { foreignKey: 'paymentId', onDelete: 'CASCADE' });   //Se establece la relacion con el modelo de Payment

module.exports = DeletedPayment;  //Exporto el modelo
