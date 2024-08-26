import express from 'express'
import {
    getAllsizes,
    getSizesById,
    createSizes,
    updateSize,
    deleteSize
} from '../controllers/sizesController.js';

const router = express.Router();

router.get('/', getAllsizes );
router.get('/:id', getSizesById);
router.post('/create', createSizes);
router.put('/configurate/:id', updateSize );
router.delete('/delete/:id', deleteSize);

export default router;