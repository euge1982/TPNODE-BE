//Controlador de User

const User = require('../models/User');   //Importo el modelo de User
const Login = require('../models/Login');   //Importo el modelo de Login
const jwt = require('jsonwebtoken');   //Importo jwt
const bcrypt = require('bcrypt');   //Importo bcrypt

//Funcion para registrar un nuevo usuario
exports.register = async (req, res) => {
  //Tomo el nombre, el correo, la contraseña y el rol del body de la peticion
  const { nombre, correo, contraseña, rol } = req.body;

  //Verificar si el correo ya existe
  const user = await User.findOne({ where: { correo } });
  
  //Si el correo ya existe...Retorna error 409 (Conflict)
  if (user) {
    return res.status(409).json({ message: 'El correo ya existe' });
  }

  //Si el correo no existe, se crea el usuario
  const hashedPassword = await bcrypt.hash(contraseña, 10);   //Encriptar la contraseña
  //Se crea el nuevo usuario
  const newUser = await User.create({
    nombre,
    correo,
    contraseña: hashedPassword,
    rol,
  });

  //Se retorna el usuario creado y el status 201 (Creado)
  res.status(201).json(newUser);
};

//Funcion para iniciar sesion
exports.login = async (req, res) => {
  //Tomo el correo y la contraseña del body de la peticion
  const { correo, contraseña } = req.body;

  //Verificar si el correo y la contraseña son correctos
  const user = await User.findOne({ where: { correo } });   //Se busca el usuario
  //Si el usuario no existe o la contraseña no es correcta
  if (!user || !await bcrypt.compare(contraseña, user.contraseña)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  //Generar el token si el usuario y la contraseña son correctas
  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
  
  //Registrar el login en la base de datos (Tabla Login)
  await Login.create({ userId: user.id });

  //Retornar el token y un status 200 (OK)
  res.status(200).json({ token });
};