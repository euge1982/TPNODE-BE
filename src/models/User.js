//Modelo de User

const { DataTypes } = require('sequelize');   //Importo DataTypes para definir tipos de datos
const sequelize = require('../database/database');   //Importo la base de datos

//Defino el modelo de User
const User = sequelize.define('User', {
  //Atributos del user
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('super', 'admin', 'usuario'),   //Seleccion de roles
    defaultValue: 'usuario',   //Rol por defecto es usuario (que es el usuario comun)
  }
});

module.exports = User;   //Exporto el modelo