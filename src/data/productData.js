function buildProductData(req){
    const {
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