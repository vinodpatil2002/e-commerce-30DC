import { Router } from "express";
import { refreshToken, registerUser } from "../controllers/user.controller.js";
const router = Router();

router.post('/register', registerUser);
router.post('/refresh_token', refreshToken);

export default router;