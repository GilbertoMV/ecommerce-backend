const express = require('express');
const { getAllUsers, getUserById, createUser, deleteUser, udpateUser } = require('../models/usersModel.js');

const router = express.Router();

function buildUserData(req) {
    //Se manda a una solicitud HTTP (req.body), que dentro tiene todo lo que pide del POST
    const { nombre, apellido_paterno, apellido_materno, correo, contrasena, fecha_nacimiento, estado_cuenta } = req.body;
    const fecha_registro = new Date(); // Se crea fecha de registro
    //Se retorna un objeto que agrupa todos los valores con los solicitados en el req.body
    return {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena,
        fecha_nacimiento,
        fecha_registro,
        estado_cuenta
    };
}

//Ruta para obtener lo usuarios
router.get('/', async (req,res)=>{
    try {
        const users = await getAllUsers();
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        console.error('Error al obtener los productos del catálogo:', error);
    }
});

//Ruta para obtener el usuario por ID
router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const userId = await getUserById(id);
        if(!userId){ //Si no se encuentra el usuario se manda error
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(userId); //si se encuentra se responde como JSON
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})
//Ruta para crear un usuario y asiganrle un ID
router.post('/create', async (req, res) => { 
    try{
        //se declara la variable y se llama a la funcion buildUserData y se le pasa hacer la peticion y que debuelva el objeto con los valores 
        const userData = buildUserData(req);
        // Pasas userData al modelo para crear el usuario.
        const userId = await createUser(userData);
        // Si todo es exitoso, envías una respuesta con el ID del usuario creado.
        res.status(201).json({ id: userId, message: 'Usuario creado exitosamente' });
    } catch (error) {
        // Si hay un error, se captura y envía una respuesta de error.
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
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

router.put('/:id', async(req,res)=>{
    const id = req.params.id; //Se obtiene el ID del usuario por el URL
    const userData = buildUserData(req);
    try {
        const Update = await udpateUser(id,userData);
        if(Update >0){
            res.json({ message: 'Usuario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})


module.exports = router;
