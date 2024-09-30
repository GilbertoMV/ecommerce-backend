import express from 'express';
import {
    getAllImages,
    getImageById,
    getImageByProduct,
    createImage,
    updateImage,
    deleteImage
} from '../controllers/imageController.js'

const router = express.Router();

router.get('/', getAllImages);
router.get('/:id', getImageById);
router.get('/product/:id', getImageByProduct);
router.post('/', createImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

export default router;