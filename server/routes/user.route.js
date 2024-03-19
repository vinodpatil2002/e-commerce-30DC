import { Router } from "express";
import { refreshToken, registerUser,login,logout } from "../controllers/user.controller.js";
const router = Router();

router.post('/register', registerUser);
router.post('/refresh_token', refreshToken);
router.post('/login', login);
router.post('/logout', logout);

export default router;