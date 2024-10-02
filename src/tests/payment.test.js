// Test para el controlador de Pago

const { createPayment, getPayments, updatePayment, deletePayment } = require('../controllers/paymentController');   //Importo el controlador
const Payment = require('../models/Payment');   //Importo el modelo de Pago
const DeletedPayment = require('../models/DeletedPayment');   //Importo el modelo de DeletedPayment

//Mock de los modelos
jest.mock('../models/Payment');
jest.mock('../models/DeletedPayment');

//Prueba para el controlador de pago
describe('Payment Controller', () => {
  //Prueba para la creacion de un pago
  describe('createPayment', () => {
    test('debería crear un nuevo pago y retornar status 201', async () => {
      //Se obtienen los datos del body
      const req = {
        body: {
          fechaPago: '2024-10-01',
          monto: 100,
          formaPago: 'tarjeta',
          descripcion: 'Pago por servicios',
          ubicacion: 'ruta/al/archivo.pdf',
          userId: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la creacion del pago
      Payment.create.mockResolvedValue(req.body);
      //Se llama al controlador para crear el pago
      await createPayment(req, res);

      expect(Payment.create).toHaveBeenCalledWith(req.body);   //Se espera que Payment.create sea llamado con los datos del body
      expect(res.status).toHaveBeenCalledWith(201);   //Se espera que res.status sea llamado con 201
      expect(res.json).toHaveBeenCalledWith(req.body);   //Se espera que res.json sea llamado con los datos del body
    });

    //Prueba para la creacion de un pago
    test('debería retornar error 500 si ocurre un error al crear el pago', async () => {
      const req = { body: {} };   //Se obtienen los datos del body
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la creacion del pago
      Payment.create.mockRejectedValue(new Error('Error al crear el pago'));

      //Se llama al controlador para crear el pago
      await createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);   //Se espera que res.status sea llamado con 500  
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al crear el pago', error: 'Error al crear el pago' });   //Se espera que res.json sea llamado con los datos del body
    });
  });

  //Prueba para la obtencion de pagos
  describe('getPayments', () => {
    it('debería obtener los pagos del usuario logueado', async () => {
      //Mock de la petición y respuesta
      const req = {
        user: { id: 1, rol: 'usuario' },   //Simula el usuario autenticado
        query: { userId: 1 }   //Simula el query param userId
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      //Mock de los pagos
      const mockPayments = [{ id: 1, monto: 100, activo: true }];
        
      //Mock de la funcion findAll de Sequelize
      Payment.findAll = jest.fn().mockResolvedValue(mockPayments);
  
      //Llamada al controlador
      await getPayments(req, res);
  
      //Afirmaciones
      expect(Payment.findAll).toHaveBeenCalledWith({ where: { userId: req.user.id, activo: true } });   //Verifica que Payment.findAll sea llamado
      expect(res.status).toHaveBeenCalledWith(200);   //Verifica que res.status sea llamado con 200
      expect(res.json).toHaveBeenCalledWith(mockPayments);   //Verifica que res.json sea llamado con los datos del body
    });
  
    //Prueba para la obtencion de pagos
    test('debería retornar error 500 si ocurre un error al obtener los pagos', async () => {
      const req = {
        user: { id: 1, rol: 'usuario' },   //Simula el usuario autenticado
        query: { userId: 1 }   //Simula el query param userId
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      //Forzar un error
      Payment.findAll = jest.fn().mockRejectedValue(new Error('Error al obtener pagos'));
  
      //Llamada al controlador
      await getPayments(req, res);
  
      //Afirmaciones
      expect(res.status).toHaveBeenCalledWith(500);   //Verifica que res.status sea llamado con 500
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener los pagos', error: 'Error al obtener pagos' });   //Verifica que res.json sea llamado con los datos del body
    });
  });
  });

  //Prueba para la actualizacion de un pago
  describe('updatePayment', () => {
    
    test('debería actualizar un pago y retornar status 200', async () => {
      //Se obtienen los datos del body
      const req = {
        params: { id: 1 },
        body: { monto: 150 },
        user: { rol: 'admin' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la actualizacion del pago
      Payment.findByPk.mockResolvedValue({ id: 1 });
      //Se llama al controlador para actualizar el pago
      Payment.update.mockResolvedValue([1]);

      //Se llama al controlador para actualizar el pago
      await updatePayment(req, res);

      expect(Payment.update).toHaveBeenCalledWith({ monto: 150 }, { where: { id: 1 } });   //Se espera que Payment.update sea llamado con los datos del body
      expect(res.status).toHaveBeenCalledWith(200);   //Se espera que res.status sea llamado con 200
      expect(res.json).toHaveBeenCalledWith({ message: 'Pago actualizado correctamente' });   //Se espera que res.json sea llamado con los datos del body
    });

    //Prueba para la actualizacion de un pago
    test('debería retornar error 404 si el pago no existe', async () => {
      //Se obtienen los datos del body
      const req = {
        params: { id: 999 },
        body: {},
        user: { rol: 'admin' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la actualizacion del pago
      Payment.findByPk.mockResolvedValue(null);

      //Se llama al controlador para actualizar el pago
      await updatePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);   //Se espera que res.status sea llamado con 404
      expect(res.json).toHaveBeenCalledWith({ message: 'Pago no encontrado' });   //Se espera que res.json sea llamado con los datos del body
    });

    //Prueba para la actualizacion de un pago
    test('debería retornar error 500 si ocurre un error al actualizar el pago', async () => {
      //Se obtienen los datos del body
      const req = {
        params: { id: 1 },
        body: { monto: 150 },
        user: { rol: 'admin' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la actualizacion del pago
      Payment.findByPk.mockResolvedValue({ id: 1 });
      //Se llama al controlador para actualizar el pago
      Payment.update.mockRejectedValue(new Error('Error al actualizar el pago'));

      //Se llama al controlador para actualizar el pago
      await updatePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);   //Se espera que res.status sea llamado con 500
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al actualizar el pago', error: 'Error al actualizar el pago' });   //Se espera que res.json sea llamado con los datos del body
    });
  });

  //Prueba para la eliminacion de un pago
  describe('deletePayment', () => {
    test('debería desactivar un pago y registrar la eliminación en DeletedPayment', async () => {
      //Se obtienen los datos del body
      const req = {
        params: { id: 1 },
        user: { id: 2 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockPayment = { id: 1, activo: true };   //Se mockea el pago que se va a desactivar
      Payment.findByPk.mockResolvedValue(mockPayment);   //Se mockea el pago que se va a desactivar
      DeletedPayment.create.mockResolvedValue({});   //Se mockea la eliminacion del pago
      Payment.update.mockResolvedValue([1]);   //Se mockea la actualizacion del pago

      //Se llama al controlador para desactivar el pago
      await deletePayment(req, res);

      expect(DeletedPayment.create).toHaveBeenCalledWith({
        paymentId: mockPayment.id,
        eliminadoPor: req.user.id,
        FechaEliminado: expect.any(Date)
      });   //Se espera que DeletedPayment.create sea llamado
      expect(Payment.update).toHaveBeenCalledWith({ activo: false }, { where: { id: 1 } });   //Se espera que Payment.update sea llamado
      expect(res.status).toHaveBeenCalledWith(200);   //Se espera que res.status sea llamado con 200
      expect(res.json).toHaveBeenCalledWith({ message: 'Pago desactivado correctamente' });   //Se espera que res.json sea llamado con los datos del body
    });

    //Prueba para la eliminacion de un pago
    test('debería retornar error 404 si el pago no existe', async () => {
      //Se obtienen los datos del body
      const req = {
        params: { id: 999 },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la actualizacion del pago
      Payment.findByPk.mockResolvedValue(null);

      //Se llama al controlador para actualizar el pago
      await deletePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);   //Se espera que res.status sea llamado con 404
      expect(res.json).toHaveBeenCalledWith({ message: 'Pago no encontrado' });   //Se espera que res.json sea llamado con los datos del body
    });

    //Prueba para la eliminacion de un pago
    test('debería retornar error 500 si ocurre un error al desactivar el pago', async () => {
      //Se obtienen los datos de los params
      const req = { params: { id: 1 }, user: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      //Se mockea la actualizacion del pago
      Payment.findByPk.mockRejectedValue(new Error('Error al buscar pago'));

      //Se llama al controlador para actualizar el pago
      await deletePayment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);   //Se espera que res.status sea llamado con 500
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al desactivar el pago', error: 'Error al buscar pago' });   //Se espera que res.json sea llamado con los datos del body
    });
  });