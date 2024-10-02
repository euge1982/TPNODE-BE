//Pruebas para el controlador de User

const request = require('supertest');   //Utilizado para hacer solicitudes HTTP a la app
const bcrypt = require('bcrypt');   //Utilizado para encriptar la contraseña
const jwt = require('jsonwebtoken');   //Utilizado para generar un token
const app = require('../../server');   //Utilizado para iniciar el servidor
const User = require('../models/User');   //Utilizado para el modelo de User
const Login = require('../models/Login');   //Utilizado para el modelo de Login

//Mock de los modelos para pruebas
jest.mock('bcrypt');   //Mock de bcrypt para pruebas
jest.mock('jsonwebtoken');   //Mock de jsonwebtoken para pruebas

//Prueba para el controlador de User
describe('User Controller', () => {
  /*afterEach(() => {
    jest.clearAllMocks();   // Limpia los mocks después de cada prueba
  });*/

  describe('POST /register', () => {
    test('debería registrar un nuevo usuario', async () => {
      
      User.findOne = jest.fn().mockResolvedValue(null);   //Mock de User.findOne para devolver null (no hay usuarios con ese correo)
      
      bcrypt.hash.mockResolvedValue('hashedPassword');   //Mock de bcrypt.hash para devolver una contraseña encriptada
      
      //Mock de User.create para simular la creacion del usuario
      User.create = jest.fn().mockResolvedValue({
        id: 8,
        nombre: 'Juan',
        correo: 'juan8@example.com',
        rol: 'usuario',
      });
      
      const response = await request(app)
        .post('/api/users/register')
        .send({
          nombre: 'Juan',
          correo: 'juan8@example.com',
          contraseña: 'password123',
          rol: 'usuario',
        });
      
      //Verifica que el usuario se haya creado correctamente
      expect(response.status).toBe(201);   //Espera status 201 (Creado)
      expect(response.body.nombre).toBe('Juan');   //Verifica que el nombre sea correcto
      expect(User.findOne).toHaveBeenCalledWith({ where: { correo: 'juan8@example.com' } });   //Verifica que User.findOne sea llamado con el correo
      expect(User.create).toHaveBeenCalled();   //Verifica que User.create sea llamado
    });

    test('debería devolver un error si el correo ya está registrado', async () => {
      //Mock de User.findOne para devolver un usuario existente
      User.findOne = jest.fn().mockResolvedValue({
        id: 8,
        nombre: 'Juan',
        correo: 'juan8@example.com',
      });

      const response = await request(app)
        .post('/api/users/register')
        .send({
          nombre: 'Juan',
          correo: 'juan8@example.com',
          contraseña: 'password123',
          rol: 'usuario',
        });
      
      expect(response.status).toBe(409);   //Espera status 409 (Conflicto)
      expect(response.body.message).toBe('El correo ya existe');   //Verifica que el error sea 'El correo ya existe'
    });
  });

  //Prueba para el controlador de Login
  describe('POST /login', () => {
    test('debería hacer login correctamente con credenciales válidas', async () => {
      //Mock de User.findOne para devolver un usuario
      User.findOne = jest.fn().mockResolvedValue({
        id: 8,
        nombre: 'Juan',
        correo: 'juan8@example.com',
        contraseña: 'hashedPassword',
        rol: 'usuario',
      });
      //Mock de bcrypt.compare para simular que la contraseña es válida
      bcrypt.compare.mockResolvedValue(true);
      //Mock de jwt.sign para devolver un token simulado
      jwt.sign.mockReturnValue('mockToken');
      //Mock de Login.create para registrar el login del usuario
      Login.create = jest.fn().mockResolvedValue({});

      //Simula una petición HTTP POST al controlador de Login
      const response = await request(app)
        .post('/api/users/login')
        .send({
          correo: 'juan8@example.com',
          contraseña: 'password123',
        });

      expect(response.status).toBe(200);   //Espera status 200 (OK)
      expect(response.body.token).toBe('mockToken');   //Verifica que el token sea el correcto
      expect(User.findOne).toHaveBeenCalledWith({ where: { correo: 'juan8@example.com' } });   //Verifica que User.findOne sea llamado con el correo
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');   //Verifica que bcrypt.compare sea llamado con la contraseña
      expect(jwt.sign).toHaveBeenCalledWith({ id: 8, rol: 'usuario' }, process.env.JWT_SECRET);   //Verifica que jwt.sign sea llamado con el token
      expect(Login.create).toHaveBeenCalledWith({ userId: 8 });   //Verifica que Login.create sea llamado
    });

    test('debería devolver un error si las credenciales son inválidas', async () => {
      //Mock de User.findOne para devolver null (usuario no encontrado)
      User.findOne = jest.fn().mockResolvedValue(null);
      //Simula una petición HTTP POST al controlador de Login
      const response = await request(app)
        .post('/api/users/login')
        .send({
          correo: 'juan8@example.com',
          contraseña: 'wrongpassword',
        });

      expect(response.status).toBe(401);   //Espera status 401 (No autorizado)
      expect(response.body.message).toBe('Credenciales inválidas');   //Verifica que el error sea 'Credenciales inválidas'
    });
  });
});
