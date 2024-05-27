function buildProductData(req){
    const {
        id_producto,
        id_categoria,
        id_usuario,
        nombre,
        caracteristicas,
        descripcion,
        precio,
        existencias,
        huella_carbono,
        puntos_recompensa
    } = req.body;
    return {
        id_producto,
        id_categoria,
        id_usuario,
        nombre,
        caracteristicas,
        descripcion,
        precio,
        existencias,
        huella_carbono,
        puntos_recompensa
    };
}

export default buildProductData