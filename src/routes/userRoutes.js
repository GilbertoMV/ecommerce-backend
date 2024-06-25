// routes/userRoutes.js
import express from 'express';
import { getAllUsers, getUserById, deleteUser, updateUser, getUserInfo } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/me", getUserInfo);
router.delete("/delete/:id", deleteUser);
router.put("/configurate/:id", updateUser);

export default router;
