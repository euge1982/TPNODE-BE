//Archivo de configuracion de la base de datos

const { Sequelize } = require('sequelize');   //Importo Sequelize
require('dotenv').config();   //Importo dotenv para usar variables de entorno

//Se configura la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,   //Host de la base de datos
  dialect: 'mariadb',   //Dialecto de la base de datos
});

//Prueba de conexion a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexion exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); //finaliza la conexion sino puede conectarse
  }
})();

module.exports = sequelize;   //Exporto la base de datos