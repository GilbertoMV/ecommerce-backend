import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(403).json({ message: 'Se requiere token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;  // Asumiendo que el ID del usuario está almacenado en el token como 'id'
        req.user = { id: userId };
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error("Error al verificar el token:", error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


export { validateToken };
