import { Router } from "express";
import { refreshToken, registerUser,login,logout, getUserInfo } from "../controllers/user.controller.js";
import {isAuthenticated } from "../middleware/auth.js";
const router = Router();

router.post('/register', registerUser);
router.get('/refresh_token', refreshToken);
router.post('/login', login);
router.get('/logout', logout);
router.get('/info',isAuthenticated,getUserInfo)

export default router;