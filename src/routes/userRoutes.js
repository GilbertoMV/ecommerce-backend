// routes/userRoutes.js
import express from 'express';
import { getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/delete/:id", deleteUser);
router.put("/configurate/:id", updateUser);

export default router;