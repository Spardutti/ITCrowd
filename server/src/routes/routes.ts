import { Router } from "express";

const router = Router();

/* BRANDS */
import { router as postBrand } from "../routes/brandRoutes/post_brand";
import { router as getBrand } from "../routes/brandRoutes/get_brand";

router.use(getBrand);
router.use(postBrand);

/* PRODUCTS */
import { router as addProduct } from "../routes/productRoutes/post_product";
import { router as deleteProduct } from "../routes/productRoutes/delete_product";
import { router as getAllProducts } from "../routes/productRoutes/get_products";
import { router as updateProduct } from "../routes/productRoutes/put_product";

router.use(updateProduct);
router.use(getAllProducts);
router.use(addProduct);
router.use(deleteProduct);

/* USER */
import { router as postUser } from "../routes/userRoutes/post_user";
import { router as getUser } from "../routes/userRoutes/get_user";

router.use(getUser);
router.use(postUser);

export { router };
