const express = require('express');
const { getAllProducts, getProductById } = require("../models/productModel");

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

module.exports = router;