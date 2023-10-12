import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/user",requireSignIn,getUserProfile);

export default router;
