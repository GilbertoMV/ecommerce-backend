function buildUserData(req) {
    //Se manda a una solicitud HTTP (req.body), que dentro tiene todo lo que pide del POST
    const {
         nombre,
         apellido_paterno,
         apellido_materno,
         correo,
         contrasena,
         fecha_nacimiento,
         estado_cuenta 
        } = req.body;

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
export default buildUserData