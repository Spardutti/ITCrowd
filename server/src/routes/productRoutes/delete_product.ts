import { Router } from "express";
import { deleteProduct } from "../../controllers/productController/delete_product";

const router = Router();

router.delete("/delete", deleteProduct);

export { router };
