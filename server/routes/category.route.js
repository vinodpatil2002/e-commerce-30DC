import { Router } from "express";
import { getCategory,createCategory,deleteCategory, updateCategory } from "../controllers/category.controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = Router();

router.route('/category').get(getCategory).post(isAuthenticated,authAdmin,createCategory)

router.route('/category/:id').delete(isAuthenticated,authAdmin,deleteCategory).put(isAuthenticated,authAdmin).put(updateCategory)

export default router;