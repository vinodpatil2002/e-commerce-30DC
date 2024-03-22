import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = Router();

router.get("/product", getProducts);

router.post("/product",createProduct)

router.route('/product/:id').delete(deleteProduct).put(updateProduct)

export default router;