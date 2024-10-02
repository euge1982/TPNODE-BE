//Archivo principal del servidor

//Importaciones
const express = require('express');   //Importa express
const sequelize = require('./src/database/database');   //Importa la base de datos
const userRoutes = require('./src/routes/user');   //Importa las rutas del controlador de User
const paymentRoutes = require('./src/routes/payment');   //Importa las rutas del controlador de Pago
const cors = require('cors');   //Importa cors para permitir peticiones CORS
require('dotenv').config();   //Importa dotenv para usar variables de entorno

//Se configura el servidor
const app = express();   //Crea el servidor
app.use(cors());   //Permite peticiones CORS
app.use(express.json());   //Permite peticiones JSON
app.use('/api/users', userRoutes);   //Usa las rutas del controlador de User
app.use('/api/payments', paymentRoutes);    //Usa las rutas del controlador de Pago

const PORT = process.env.PORT || 3000;   //Puerto del servidor

//Sincroniza la base de datos y arranca el servidor
sequelize.sync().then(() => {   
  //Arranca el servidor
  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
})
.catch(err => {
  //Si hay un error al sincronizar la base de datos, termina el proceso
  console.error('Error al sincronizar la base de datos:', err);
  process.exit(1);   //Termina el proceso
});

module.exports = app;   //Exporta el servidor