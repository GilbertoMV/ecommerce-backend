import express from 'express'
import createUser from '../models/registerModel.js'
import buildUserData from '../userData.js'

const router = express.Router();
//Ruta para crear un usuario y asiganrle un ID
router.post("/", async (req, res) => {
    try {
      //se declara la variable y se llama a la funcion buildUserData y se le pasa hacer la peticion y que debuelva el objeto con los valores
      const userData = buildUserData(req);
      // Pasas userData al modelo para crear el usuario.
      const userId = await createUser(userData);
      // Si todo es exitoso, envías una respuesta con el ID del usuario creado.
      res.status(201).json({ id: userId, message: "Usuario registrado exitosamente" });
    } catch (error) {
      // Si hay un error, se captura y envía una respuesta de error.
      console.error("Error al crear el usuario:", error);
      if (error.message === "El correo ya está registrado") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  });

export default router;