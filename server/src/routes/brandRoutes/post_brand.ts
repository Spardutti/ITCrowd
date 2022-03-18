import { Router } from "express";
import { addBrand } from "../../controllers/brandController/post_brand";

const router = Router();

/* CREATE BRAND */
router.post("/brand", addBrand);

export { router };
