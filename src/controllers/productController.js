import express from 'express'
import { getAllProducts, getProductById,deleteProduct, createProduct,updateProduct } from "../models/productModel.js"
import buildProductData from '../data/productData.js';

const router = express.Router();

//Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos del catálogo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Ruta para obtener el producto por su ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const productById = await getProductById(id);
    if(!productById){ //Si no encuentra producto devuelve error
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(productById) //Si lo encuentra lo manda a llamar en un JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})

//Ruta para eliminar producto
router.delete('/delete/:id', async(req,res)=>{
  const id = req.params.id;
  try {
    const deleteRows = await deleteProduct(id);
    if(deleteRows>0){
    res.json({message: 'Producto eliminado exitosamente'})
  }else{
    res.status(404).json({error:'Producto no encontrado'})
  }
  } catch (error) {
    console.error('Error al eliminar el producto',error);
    res.status(500).json({error:'Error interno del servidor'});
  }
})

//Ruta para crear productos
router.post('/create',async(req,res)=>{
  try {
    const productData = buildProductData(req);
    const productId = await createProduct(productData);
    res.status(201).json({id:productId,message:'Producto creado exitosamente'})
  } catch (error) {
    console.error('Error al crear usuario:',error);
    res.status(500).json({error:'Error interno del servidor'});
    
  }
});
 //Ruta para actualizar el usuario con ID
 router.put('/configurate/:id',async(req,res)=>{
  const id = req.params.id;
  const productData = buildProductData(req);
  try {
    const Update = await updateProduct(id,productData);
    if(Update>0){
      res.json({message:'Producto actualizado'});
    }else{
      res.status(404).json({error:'Producto no encontrado'});
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
 })
export default router;