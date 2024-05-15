import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../db/config.js'

//Nota next es para pasar al siguiente middleware
const validateToken = (req, res, next) => {
    //Se requiere que en el encabezado este el authorization y el token, si lo esta lo guarda en const token (el encabezado es parte del front)
    const token = req.headers['authorization']; 
    //Si no hay token se manda un 403 que es Acceso denegado prohibido
    if (!token) {
        return res.status(403).json({ message: 'Se requiere token de autenticación' });
    }

    try {
        //Lo que hace el jwt.verify es agarrar el token y la llave secreta, si el token es valido se decodifica y se guarda en el const 
        const decodificado = jwt.verify(token, SECRET_KEY);
        req.user = decodificado; // Guarda la informacion decodificada en el req.user para usarla luego si es necesaria
        next(); // Continúa con la siguiente función de middleware
    } catch (error) {
        //si el token no es valido se manda un 401
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export {
    validateToken
}