import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'; 
import User from '../models/userModel.js'; 

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Servidor SMTP
  port: 465, // Puerto SMTP
  secure: true, // true para el puerto 465, false para otros puertos
  auth: {
    user: process.env.SOPORTE_USER, // Tu correo electrónico
    pass: process.env.SOPORTE_PASSWORD, // Tu contraseña
  },
});

// Controlador para "forgot password"
export const forgotPassword = async (req, res) => {
  const { correo } = req.body;

  try {
    // Busca el usuario por correo electrónico
    const user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token con el id_usuario
    const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.SECRET_KEY, {
      expiresIn: '30m', 
    });

    // Crea el enlace de restablecimiento de contraseña
    const resetLink = `localhost:4000/password/reset/${token}`;

    // Configura el correo electrónico
    const mailOptions = {
      from: 'Soporte.Koala@gmail.com',
      to: user.correo,
      subject: 'Restablecimiento de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: </p><a href="${resetLink}">${resetLink}</a>`,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo de restablecimiento de contraseña enviado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al enviar el correo', error });
  }
};

// Controlador para "reset password"
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { contrasena } = req.body;

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Busca el usuario por id_usuario
    const user = await User.findByPk(decoded.id_usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Hashea la nueva contraseña    
    user.contrasena = contrasena;
    // Guarda la nueva contraseña
    await user.save();
    console.log(user.contrasena);
    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la contraseña', error });
  }
};
