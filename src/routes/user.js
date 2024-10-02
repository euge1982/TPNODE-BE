//Archivo de rutas para el controlador de User

const express = require('express');   //Importo express para crear rutas
const router = express.Router();   //Crea el enrutador
const userController = require('../controllers/userController');   //Importo el controlador

//Rutas
router.post('/register', userController.register);   //Crea un nuevo usuario
router.post('/login', userController.login);   //El usuario se loguea

module.exports = router;   //Exporta el enrutador