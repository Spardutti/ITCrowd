import { Router } from "express";
import { addProduct } from "../../controllers/productController/post_product";
import passport from "passport";

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* CREATE PRODUCT */
router.post("/product", jwtProtected, addProduct);

export { router };
