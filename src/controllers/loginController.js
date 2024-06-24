import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const user = await User.findOne({ where: { correo } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.estado_cuenta === '0') {
            return res.status(401).json({ message: 'Cuenta inactiva' });
        }

        const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.json({ message: 'Login exitoso', token });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
