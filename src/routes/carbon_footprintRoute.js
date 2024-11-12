import express from "express";

import {
    postProductData,
    getCarbonFootprint
} from '../controllers/carbon_footprintController.js'

const router = express.Router();


router.post('/', postProductData)
router.get('/getCarbonFootprint/:id', getCarbonFootprint)

export default router;