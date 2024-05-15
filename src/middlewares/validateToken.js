const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];  // Asumiendo que el token viene como 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: 'Se requiere token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;  // `decoded` ahora contiene el payload del token, incluido el ID del usuario
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
