import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit; // Cálculo del desplazamiento para la paginación

    // Parámetros de ordenación
    let sort = req.query.sort || 'id_usuario'; // Campo de ordenación por defecto
    const order = req.query.order || 'ASC'; 

    // Validación de campos válidos para ordenación
    const validSortFields = ['id_usuario', 'nombre','estado_cuenta']; 
    if (!validSortFields.includes(sort)) {
      sort = 'id_usuario'; 
    }

    // Consulta con paginación y ordenación
    const { count, rows } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, order]] // Orden dinámico basado en los parámetros
    });

    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count,
      users: rows
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//obtener los datos del usuario mediante JWT
export const getUserInfo = async (req, res) =>  {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    console.log(user.id);
    if(!user) {
      res.status(404).json({error: "Usuario no encontrado"})
      return;
    }
    res.json(user);
  }catch(err){
    console.error("Error al obtener datos del usuario: " + err)
    res.status(500).json({error: "Error interno del servidor"})
  }
}

export const getUserById = async (req, res) => {
  const id_usuario = req.params.id;
  try {
    const user = await User.findByPk(id_usuario);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const id_usuario = req.params.id;
  try {
    const result = await User.destroy({ where: { id_usuario } });
    if (result > 0) {
      res.json({ message: "Usuario eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  const id_usuario = req.params.id;
  const { correo, ...userData } = req.body;

  try {
    // Verificar si el correo ya está registrado por otro usuario
    if (correo) {
      const existingUser = await User.findOne({ where: { correo } });
      if (existingUser && existingUser.id_usuario !== parseInt(id_usuario, 10)) {
        return res.status(409).json({ message: 'Correo electrónico ya registrado' });
      }
    }

    // Actualizar usuario
    const result = await User.update({ correo, ...userData }, { where: { id_usuario } });
    if (result[0] > 0) {
      res.json({ message: "Usuario actualizado exitosamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
  
};
