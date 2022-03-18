import { Router } from "express";
import { getAllProducts } from "../../controllers/productController/get_product";

const router = Router();

/* GET ALL PRODUCTS */
router.get("/", getAllProducts);

export { router };
