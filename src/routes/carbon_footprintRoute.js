import express from "express";

import {
    getCarbonFootprint
} from '../controllers/carbon_footprintController.js'

const router = express.Router();


router.post('/', getCarbonFootprint)

export default router;