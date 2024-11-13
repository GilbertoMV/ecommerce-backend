import passport from 'passport';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/userModel.js'

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,  // Reemplaza con el Facebook App ID
  clientSecret: process.env.FACEBOOK_SECRET,  // Reemplaza con el Facebook App Secret
  callbackURL: process.env.FACEBOOK_CALLBACK,  // URL de retorno de Facebook
  profileFields: ['emails','name']
},async (accessToken, refreshToken, profile, callback) => {
  try {
    const facebookId = profile.id;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;

    // 1. Verificar si el id_facebook ya está en la base de datos
    const userFacebookId = await User.findOne({ where: { id_facebook: facebookId } });
    if (userFacebookId) {
      // Si el id_facebook ya existe, generamos un token con estado_cuenta e id_usuario
      const token = jwt.sign({
        id: userFacebookId.id_usuario,
        estado_cuenta: userFacebookId.estado_cuenta
      }, process.env.SECRET_KEY, { expiresIn: '30d' });
      return callback(null, { token });
    }

    // 2. Verificar si el correo ya existe en la base de datos
    const userEmail = await User.findOne({ where: { correo: email } });
    if (userEmail) {
      // Si el correo ya existe, actualizar el id_facebook y generar el token
      userEmail.id_facebook = facebookId;
      await userEmail.save();
      
      const token = jwt.sign({
        id: userEmail.id_usuario,
        estado_cuenta: userEmail.estado_cuenta
      }, process.env.SECRET_KEY, { expiresIn: '30d' });
      return callback(null, { token });
    }

    // 3. Si no existe ni el id_facebook ni el correo, crear un nuevo usuario
    const dummyPassword = `dummy${Math.random().toString(36).slice(-8)}`;  // Generar una contraseña aleatoria
    const hashedPassword = await bcrypt.hash(dummyPassword, 10);  // Hasheamos la contraseña

    const newUser = await User.create({
      nombre: firstName,
      apellido_paterno: lastName,
      correo: email,
      id_facebook: facebookId,
      contrasena: hashedPassword,  // Guardar la contraseña hasheada
      estado_cuenta: 1,  // O el estado por defecto que necesites
      fecha_nacimiento: new Date(),  // Ajusta la fecha de nacimiento según tu lógica
      fecha_registro: new Date(),
    });

    // Generar el token para el nuevo usuario
    const token = jwt.sign({
      id: newUser.id_usuario,
      estado_cuenta: newUser.estado_cuenta
    }, process.env.SECRET_KEY, { expiresIn: '30d' });
    console.log("token: "+token);
    return callback(null, { token });
  } catch (err) {
    return callback(err, false);
  }
}));
// Serialización del usuario para la sesión (si usas sesiones)
passport.serializeUser((user, callback) => {
  callback(null, user);
});

// Deserialización del usuario de la sesión
passport.deserializeUser( (user, callback) => {
    callback(null, user);
});
