import { Router } from "express";
import { updateProduct } from "../../controllers/productController/put_product";
import passport from "passport";

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* UPDATE PRODUCT */
router.put("/product", jwtProtected, updateProduct);

export { router };
