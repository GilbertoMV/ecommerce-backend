import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    if (!token) {
        return res.status(403).json({ message: 'Se requiere token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token decodificado:", decoded);  // Muestra el objeto JWT decodificado

        const userId = decoded.id;  // Asumiendo que el ID del usuario está almacenado en el token como 'id'
        console.log("UserID extraído del token:", userId);
        console.log("el tipo de dato es:", typeof(userId))  // Imprime el userId

        req.user = { id: userId };
        console.log(req.user.id)  // Guarda el userId en el objeto request para uso posterior
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error("Error al verificar el token:", error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


export { validateToken };
