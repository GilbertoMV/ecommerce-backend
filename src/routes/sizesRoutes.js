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
router.post('/', createSizes);
router.put('/:id', updateSize );
router.delete('/:id', deleteSize);

export default router;