import express from 'express'
import {getAllUsers, getUserById,deleteUser,updateUser} from '../models/userModel.js'
import buildUserData from '../userData.js'
import {validateToken} from '../middlewares/validateToken.js'
const router = express.Router();

//Ruta para obtener lo usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
    console.error("Error al obtener los usuarios:", error);
  }
});
// Ruta para obtener los datos del usuario logueado a partir de su token JWT
router.get("/me", validateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//Ruta para obtener el usuario por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userId = await getUserById(id);
    if (!userId) {
      //Si no se encuentra el usuario se manda error
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.json(userId); //si se encuentra se responde el ID como JSON
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Ruta para crear un usuario y asiganrle un ID
router.post("/register", async (req, res) => {
  try {
    //se declara la variable y se llama a la funcion buildUserData y se le pasa hacer la peticion y que debuelva el objeto con los valores
    const userData = buildUserData(req);
    // Pasas userData al modelo para crear el usuario.
    const userId = await createUser(userData);
    // Si todo es exitoso, envías una respuesta con el ID del usuario creado.
    res
      .status(201)
      .json({ id: userId, message: "Usuario registrado exitosamente" });
  } catch (error) {
    // Si hay un error, se captura y envía una respuesta de error.
    console.error("Error al crear el usuario:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
});

//Ruta para eliminar un usuario mediante ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id; // Obtienes el ID de la solicitud
  try {
    const deleteRows = await deleteUser(id); // deleteRows es igual a borrar las casillas de deleteUser
    if (deleteRows > 0) {
      //Si se llego a detectar que existe el id se borra el usuario y sus valores
      res.json({ message: "Usuario eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" }); //Si no devuelve que no se encontró el usuario
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error); // Error al eliminar el usuario si se llega a presentar
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//Ruta para actualizar un usuario mediante ID
router.put("/configurate/:id", async (req, res) => {
  const id = req.params.id; //Se obtiene el ID del usuario por el URL
  const userData = buildUserData(req);
  try {
    //Hacemos que Update obtenga updateUser y con ello ver si afecto una fila en el Model
    const Update = await updateUser(id, userData);
    //Si Update tiene algun cambio en su fila se mandar que el usuario se actualizo
    if (Update > 0) {
      res.json({ message: "Usuario actualizado exitosamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" }); //En caso contrario se manda un status de que paso
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});





export default router;
