import { Router } from "express";
import { deleteProduct } from "../../controllers/productController/delete_product";
import passport from "passport";

const jwtProtected = passport.authenticate("jwt", { session: false });
const router = Router();

router.delete("/delete/:id", jwtProtected, deleteProduct);

export { router };
