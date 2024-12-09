import Address from "../models/addressModel.js"

export const getAllAddress = async (req,res) =>{
    try {
        const address = await Address.findAll();
        res.json(address);
      } catch (error) {
        console.error('Error al obtener las direcciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
};

export const getAddressById = async (req,res) => {
    const id_direccion = req.params.id;
    try {
        const address = await Address.findByPk(id_direccion);
        if (!address) {
          res.status(404).json({ error: 'Direccion no encontrada' });
          return;
        }
        res.json(address);
      } catch (error) {
        console.error('Error al obtener la direccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
};

export const getAddressByUser = async (req,res) => {
  const id_usuario = req.params.id
  try {
    const address = await Address.findAll({ where: {id_usuario} });
        if (!address) {
          res.status(404).json({ error: 'Direccion no encontrada' });
          return;
        }
        res.json(address);
  } catch (error) {
    console.error('Error al obtener la direccion:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const createAddress = async (req,res) => {
    const {id_usuario, nombre_completo,codigo_postal, estado, municipio, colonia, calle, num_exterior, num_interior, entre_calle1, entre_calle2, tipo_direccion, indicaciones, telefono_contacto} = req.body;
    try {
        const newAddress = await Address.create({
            id_usuario,
            nombre_completo, 
            codigo_postal,
            estado, 
            municipio, 
            colonia, 
            calle, 
            num_exterior, 
            num_interior, 
            entre_calle1, 
            entre_calle2, 
            tipo_direccion, 
            indicaciones, 
            telefono_contacto   
        });
        res.status(201).json({ id: newAddress.id_direccion, message: 'Direccion creada exitosamente'})
    } catch (error) {
        console.error('Error al crear la direccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateAddress = async (req, res) => {
    const id_direccion = req.params.id;
    const {id_usuario, nombre_completo, codigo_postal, estado, municipio, colonia, calle, num_exterior, num_interior, entre_calle1, entre_calle2, tipo_direccion, indicaciones, telefono_contacto} = req.body;
    try {
        const [updated] = await Address.update({
            id_usuario,
            nombre_completo,
            codigo_postal, 
            estado, 
            municipio, 
            colonia, 
            calle, 
            num_exterior, 
            num_interior, 
            entre_calle1, 
            entre_calle2, 
            tipo_direccion, 
            indicaciones, 
            telefono_contacto
        }, { where: { id_direccion }});
        if(updated) {
            res.json({ message: 'Direccion actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Direccion no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la direccion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteAddress = async (req,res) => {
  const id_direccion = req.params.id;
  try {
    const result = await Address.destroy({ where: { id_direccion } });
    if (result > 0) {
      res.json({ message: 'Direccion eliminada exitosamente' });
    } else {
        res.status(404).json({ error: 'Direccion no encontrada' });
    }
    } catch (error) {
      console.error('Error al eliminar la direccion:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};