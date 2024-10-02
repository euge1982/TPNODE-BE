//Middleware para validar el token de autenticacion

const jwt = require('jsonwebtoken');   //Importo jwt
require('dotenv').config();   //Importo dotenv para usar variables de entorno

//Funcion para validar el token
const authMiddleware = (roles = []) => {   //Si no se especifica roles, se permiten todos
  //Funcion de interna
  return (req, res, next) => {
    //Obtiene el token del headers
    const authHeader = req.headers['authorization'];

    //Si no hay nada en el authorization, retornar error 403 (Forbidden) y corta la ejecucion
    if (!authHeader) return res.status(403).json({ message: 'Se requiere un Token' });

    //Si el authorization tiene un token, obtenerlo
    const token = authHeader.split(' ')[1];   //Obtiene solo el token despues de "Bearer"

    //Si no hay token, retornar error 403 (Forbidden) y corta la ejecucion
    if (!token) return res.status(403).json({ message: 'Se requiere un Token' });

    //Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      //Si hay un error, retornar error 403 (Forbidden) y corta la ejecucion
      if (err) return res.status(403).json({ message: 'Token inválido' });

      //Si hay un error, retornar error 401 (Unauthorized) y corta la ejecucion
      if (roles.length && !roles.includes(user.rol)) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      req.user = user;   //Guarda el usuario en la peticion
      next();   //Continua la ejecucion con lo que sigue
    });
  };
};

module.exports = authMiddleware;   //Exporta la funcion