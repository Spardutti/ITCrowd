import { Router } from "express";
import { addProduct } from "../../controllers/productController/post_product";

const router = Router();

/* CREATE PRODUCT */
router.post("/product", addProduct);

export { router };
