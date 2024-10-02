//Archivo de rutas para el controlador de Pago

const express = require('express');   //Importo express para crear rutas
const router = express.Router();   //Crea el enrutador
const paymentController = require('../controllers/paymentController');   //Importo el controlador
const authMiddleware = require('../middlewares/authMiddleware');   //Importo el middleware de autenticacion

//Rutas
router.post('/', authMiddleware(['admin', 'super']), paymentController.createPayment);   //Crea un nuevo pago
router.get('/', authMiddleware(['admin', 'super', 'usuario']), paymentController.getPayments);   //Obtiene todos los pagos de un usuario
router.put('/:id', authMiddleware(['admin', 'super']), paymentController.updatePayment);   //Actualiza un pago
router.delete('/:id', authMiddleware(['admin', 'super']), paymentController.deletePayment);   //"Elimina" un pago, solo lo desactiva

module.exports = router;   //Exporta el enrutador