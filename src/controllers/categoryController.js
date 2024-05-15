const express = require('express')
const {getAllCategorys,getCategoryById,deleteCategory} = require('../models/categoryModel.js');

const router = express.Router();

//Ruta para obtener todos las categorias
router.get('/', async (req,res) => {
    try {
        const categorys = await getAllCategorys();
        res.json(categorys);
    } catch (error) {
        console.error('Error al obtener las categorias',error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Ruta para obtener una categoria por ID
router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        //Mandamos a llamar a getCategoryById y guardamos la consulta categoryById
        const categoryById = await getCategoryById(id);
        if(!categoryById){ //Si no se regresa se manda error 404
            res.status(404).json({error:'Categoria no encontrada'});
            return;
        }
        res.json(categoryById) //Si se encuentra se manda en JSON
    } catch (error) {
        console.error('Error al obtener el producto:',error)
        res.status(500).json({error:'Error interno del servidor'})
    }
});

//Ruta para eliminar una categoria
router.delete('/delete/:id',async(res,req)=>{
    const id = req.params.id;
    try {
        const deleteRows = await deleteCategory(id);
        if(deleteRows>0){
            res.json({message:'Categoria eliminada exitosamente'});
        }else{
            res.status(404).json({error:'Categoria no encontrada'});
        }
    } catch (error) {
        console.error('Error al eliminar categoria',error);
        res.status(500).json({error:'Error interno del servidor'});
    }
})

//Ruta para configurar una categoria
module.exports = router;