//Controlador de Pago

const Payment = require('../models/Payment');   //Importo el modelo de Pagp
const DeletedPayment = require('../models/DeletedPayment');   //Importo el modelo de DeletedPayment

//Crear un nuevo pago
exports.createPayment = async (req, res) => {
  try {
    //Se obtienen los datos del body
    const { fechaPago, monto, formaPago, descripcion, ubicacion, userId } = req.body;

    //No es necesario verificar si el usuario es admin o super ya que lo hace el middleware de autenticacion

    //Se crea el nuevo pago
    const newPayment = await Payment.create({
      fechaPago,
      monto,
      formaPago,
      descripcion,
      ubicacion,
      userId,   //Usuario al que se le registra el pago
    });

    //Retornar el nuevo pago creado y status 201 (Creado)
    res.status(201).json(newPayment);
  } 
  catch (error) {
    //Si ocurre un error, retornar error 500 (Internal Server Error)
    res.status(500).json({ message: 'Error al crear el pago', error: error.message });
  }
};

//Obtener los pagos del usuario logueado o de un usuario especifico (si es admin o super)
exports.getPayments = async (req, res) => {
  try {
    const { userId } = req.query;   //Obtener el userId de los parametros de la URL

    //Si es un usuario comun, solo puede obtener sus propios pagos
    if (req.user.rol === 'usuario') {
      //Obtiene sus pagos activos
      const payments = await Payment.findAll({
        where: { userId: req.user.id, activo: true },   //Solo los pagos activos del usuario logueado
      });
      //Retorna los pagos y status 200 (OK)
      return res.status(200).json(payments);
    }

    //Si es admin o super, puede obtener los pagos de un usuario especifico (si se ingresa el userId)
    const payments = await Payment.findAll({
      where: { userId: userId || req.user.id, activo: true },   //Si no hay userId, devuelve los pagos del admin/super
    });
    //Retorna los pagos y status 200 (OK)
    res.status(200).json(payments);
  } 
  catch (error) {
    //Si ocurre un error, retorna error 500 (Internal Server Error)
    res.status(500).json({ message: 'Error al obtener los pagos', error: error.message });
  }
};

//Actualizar un pago (solo para admin o super)
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { fechaPago, monto, formaPago, descripcion, ubicacion } = req.body;

  //Verificar si el usuario es admin o super
  if (req.user.rol !== 'admin' && req.user.rol !== 'super') {
    return res.status(403).json({ message: 'No autorizado para actualizar pagos' });
  }

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    //En [updated] se obtiene el numero de registros actualizados
    const [updated] = await Payment.update(
      { fechaPago, monto, formaPago, descripcion, ubicacion },
      { where: { id } }
    );

    //Si se actualizo algo...
    if (updated) {
      return res.status(200).json({ message: 'Pago actualizado correctamente' });
    }

    //Si no se actualizo nada (aunque el pago existe)...
    return res.status (304).json({ message: 'El pago no se modifico' });
  } 
  catch (error) {
    //Si ocurre un error, retornar error 500 (Internal Server Error)
    res.status(500).json({ message: 'Error al actualizar el pago', error: error.message });
  }
};

//Desactivar un pago (solo para admin o super)
exports.deletePayment = async (req, res) => {
  const { id } = req.params;   //Obtener el id del pago a desactivar

  //No es necesario verificar si el usuario es admin o super ya que lo hace el middleware de autenticacion

  try {
    //Buscar el pago por su id
    const payment = await Payment.findByPk(id);

    //Verificar que el pago exista
    if (!payment) {
      //Si el pago no existe, retornar error 404 (Not Found)
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    //Verificar que el pago este activo
    if (!payment.activo) {
      //Si el pago no esta activo, retornar error 400 (Bad Request)
      return res.status(400).json({ message: 'El pago ya se encuentra desactivado' });
    }

    //Crear un registro en la tabla DeletedPayment
    await DeletedPayment.create({
      paymentId: payment.id,   //El id del pago
      eliminadoPor: req.user.id,    //El usuario que realizo la eliminacion
      FechaEliminado: new Date()   //Fecha de la eliminacion
    });

    //Actualizar el estado del pago en la tabla Payment
    await Payment.update(
      { activo: false },
      { where: { id } }
    );

    //Retornar el status 200 (OK) y el msj de que el pago se desactivo
    res.status(200).json({ message: 'Pago desactivado correctamente' });
  } 
  catch (error) {
    //Si ocurre un error, retornar error 500 (Internal Server Error)
    res.status(500).json({ message: 'Error al desactivar el pago', error: error.message });
  }
};