import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, correo, contrasena, fecha_nacimiento, estado_cuenta } = req.body;

    try {
        // verifica si el correo ya está registrado
        const existingUser = await User.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(409).json({ message: 'Correo electrónico ya registrado' });
        }

        // Crear nuevo usuario
        const newUser = await User.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            contrasena,
            fecha_nacimiento,
            fecha_registro: new Date(), // Fecha de registro actual
            estado_cuenta
        });

        res.status(201).json({ id: newUser.id_usuario, message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
