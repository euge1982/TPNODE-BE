//Archivo de rutas para el controlador de Pago

const express = require('express');   //Importo express para crear rutas
const router = express.Router();   //Crea el enrutador
const paymentController = require('../controllers/paymentController');   //Importo el controlador
const authMiddleware = require('../middlewares/authMiddleware');   //Importo el middleware de autenticacion

//Rutas
router.post('/', authMiddleware(), paymentController.createPayment);   //Crea un nuevo pago
router.get('/', authMiddleware(), paymentController.getPayments);   //Obtiene todos los pagos de un usuario
router.patch('/:id', authMiddleware(), paymentController.updatePayment);   //Actualiza un pago
router.delete('/:id', authMiddleware(), paymentController.deletePayment);   //"Elimina" un pago, solo lo desactiva
router.get('payment/deleted', authMiddleware(), paymentController.getDeletedPayments);   //Obtiene los pagos eliminados de un usuario
router.patch('payment/restore/:id', authMiddleware(), paymentController.restorePayment);   //Restaura un pago eliminado

module.exports = router;   //Exporta el enrutador