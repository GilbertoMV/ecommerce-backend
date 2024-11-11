import express from 'express';
import {
    getAllSearchs,
    getSearchById,
    getSearchByUser,
    createSearch,
    updateSearch,
    deleteSearch
} from '../controllers/searchController.js';

const router = express.Router();

router.get('/', getAllSearchs);
router.get('/:id', getSearchById);
router.get('/user/:id', getSearchByUser);
router.post('/', createSearch);
router.put('/:id', updateSearch);
router.delete('/:id', deleteSearch);

export default router;