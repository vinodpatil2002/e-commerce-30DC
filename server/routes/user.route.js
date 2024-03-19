import { Router } from "express";
import { refreshToken, registerUser,login } from "../controllers/user.controller.js";
const router = Router();

router.post('/register', registerUser);
router.post('/refresh_token', refreshToken);
router.post('/login', login);

export default router;