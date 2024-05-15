import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    // Extrae el token de la cabecera Authorization, asumiendo que viene en formato "Bearer <token>"
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    // Verifica si el token está presente
    if (!token) {
        return res.status(403).json({ message: 'Se requiere token de autenticación' });
    }

    try {
        // Decodifica el token usando la clave secreta de JWT
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Imprime el objeto decodificado para depuración
        console.log("Token decodificado:", decoded);

        // Guarda la información del usuario decodificado en el objeto de solicitud
        req.user = decoded;
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        // Captura cualquier error relacionado con la verificación del token
        console.error("Error al verificar el token:", error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export { validateToken };
