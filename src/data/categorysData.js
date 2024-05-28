function buildCategorysData(req){
    const{
        nombre,
        descripcion,
        url_imagen
    } = req.body;

    return{
        nombre,
        descripcion,
        url_imagen
    };
}

export default buildCategorysData;