import { Router } from "express";

const router = Router();

/* BRANDS */
import { router as postBrand } from "../routes/brandRoutes/post_brand";

router.use(postBrand);

/* PRODUCTS */
import { router as addProduct } from "../routes/productRoutes/post_product";
import { router as deleteProduct } from "../routes/productRoutes/delete_product";
import { router as getAllProducts } from "../routes/productRoutes/get_products";

router.use(getAllProducts);
router.use(addProduct);
router.use(deleteProduct);

export { router };
