const express = require('express');
const {
     getAllUsers,getUserById,deleteUser,updateUser} = require('../models/userModel');
const {buildUserData} = require('../userData.js')
const router = express.Router();

//Ruta para obtener lo usuarios
router.get('/', async (req,res)=>{
    try {
        const users = await getAllUsers();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        console.error('Error al obtener los usuarios:', error);
    }
});

//Ruta para obtener el usuario por ID
router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const userId = await getUserById(id);
        if(!userId){ //Si no se encuentra el usuario se manda error
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(userId); //si se encuentra se responde el ID como JSON
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

//Ruta para eliminar un usuario mediante ID
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;  // Obtienes el ID de la solicitud
    try {
        const deleteRows = await deleteUser(id); // deleteRows es igual a borrar las casillas de deleteUser
        if (deleteRows > 0) { //Si se llego a detectar que existe el id se borra el usuario y sus valores
            res.json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });  //Si no devuelve que no se encontró el usuario
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error); // Error al eliminar el usuario si se llega a presentar
        res.status(500).json({ error: 'Error interno del servidor' });  
    }
});
//Ruta para actualizar un usuario mediante ID
router.put('/configurate/:id', async(req,res)=>{
    const id = req.params.id; //Se obtiene el ID del usuario por el URL
    const userData = buildUserData(req);
    try {
        //Hacemos que Update obtenga updateUser y con ello ver si afecto una fila en el Model
        const Update = await updateUser(id,userData);
        //Si Update tiene algun cambio en su fila se mandar que el usuario se actualizo
        if(Update >0){
            res.json({ message: 'Usuario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' }); //En caso contrario se manda un status de que paso
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})


module.exports = router;
