import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    // Verifica la presencia del token en los headers de autorización
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No se encontró el token de autenticación en los headers.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Se requiere token de autenticación. Formato debe ser Bearer [token].' });
    }

    try {
        // Verificando el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token verificado correctamente, ID del usuario:", decoded.id);
        
        // Asumiendo que el ID del usuario está almacenado en el token como 'id'
        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ message: 'El token no contiene el ID del usuario requerido.' });
        }

        req.user = { id: userId };
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error("Error al verificar el token:", error);
        // Proporcionando más detalles sobre el tipo de error de JWT
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.', details: error.message });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado.', details: 'Por favor, vuelva a iniciar sesión.' });
        } else {
            return res.status(500).json({ message: 'Error interno al procesar el token.', details: error.message });
        }
    }
};

export { validateToken };
