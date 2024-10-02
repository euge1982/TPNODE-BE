//Modelo de Login

const { DataTypes } = require('sequelize');   //Importo DataTypes para definir tipos de datos
const sequelize = require('../database/database');   //Importo la base de datos
const User = require('./User');   //Importo el modelo de User

//Defino el modelo de Login
const Login = sequelize.define('Login', {
  //Atributos del login
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,   //No puede ser nulo
  },
  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,   //Toma la fecha actual
  }
});

//Se establece la relacion con el modelo de User
Login.belongsTo(User, { foreignKey: 'userId' });

module.exports = Login;   //Exporto el modelo