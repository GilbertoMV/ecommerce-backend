const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express')
const { getUserByEmail } = require('../models/loginModel');
const { SECRET_KEY } = require('../db/config');

const router = express.Router();

router.post('/', async (req, res) => {
    const { correo, contrasena } = req.body; //Saca el correo y contraseña del POST
    const user = await getUserByEmail(correo); //Busca en la base de datos el correo que se mando en el POST y trae todos los datos de ese correo

    if (!user) { //Si no se encuentra manda error 404
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena); //Compara con el bcrypt la contraseña que se mando en el POST con la de la DB
    if (!isPasswordValid) { //En caso de no ser se manda el status 401 de no autorizado
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    //Si la contraseña esta bien generamos el token con el ID y lo firmamos con la llave secreta, esta puede estar guardada en el railway
    const token = jwt.sign({ id: user.id_usuario }, SECRET_KEY, { expiresIn: '7d' }); //Tiene expiracion (quiero ver si refrescarla o dejarlo sin tiempo
    res.json({ message: 'Login exitoso', token });
});

module.exports = router;