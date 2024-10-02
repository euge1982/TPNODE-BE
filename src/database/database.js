//Archivo de configuracion de la base de datos

const { Sequelize } = require('sequelize');   //Importo Sequelize
require('dotenv').config();   //Importo dotenv para usar variables de entorno

//Se configura la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',   //Host de la base de datos
  dialect: 'mariadb',   //Dialecto de la base de datos
});

module.exports = sequelize;   //Exporto la base de datos