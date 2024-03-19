import { Router } from "express";
import { refreshToken, registerUser,login,logout, getUserInfo } from "../controllers/user.controller.js";
import {isAuthenticated } from "../middleware/auth.js";
const router = Router();

router.post('/register', registerUser);
router.post('/refresh_token', refreshToken);
router.post('/login', login);
router.post('/logout', logout);
router.get('/info',isAuthenticated,getUserInfo)

export default router;