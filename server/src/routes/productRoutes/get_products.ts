import { Router } from "express";
import {
  getAllProducts,
  getProduct,
} from "../../controllers/productController/get_product";

const router = Router();

/* GET ALL PRODUCTS */
router.get("/", getAllProducts);

/* GET SINGLE PRODUCT */
router.get("/product", getProduct);

export { router };
