import express from 'express';
import {
    getAllProductSize,
    getProductSizeByProduct,
    createProductSize,
    deleteProductSize
    /*updateProductSize,
    getProductSizeBySize,*/
} from '../controllers/product_sizeController.js';

const router = express.Router();

router.get('/products', getAllProductSize);
router.get('/products/:id', getProductSizeByProduct);
router.post('/products', createProductSize);
router.delete('/:id_talla/products/:id_producto', deleteProductSize);
/* TODO: No es necesario por el momento
router.get('/:id/products/sizes', getProductSizeBySize);
router.put('/:id_talla/products/:id_producto', updateProductSize);*/

 export default router;