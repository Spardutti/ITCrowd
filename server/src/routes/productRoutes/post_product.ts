import { Router } from "express";
import { addProduct } from "../../controllers/productController/post_product";
import passport from "passport";
const upload = require("../../cloudinary/cloudinary");

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* CREATE PRODUCT */
router.post("/product", jwtProtected, upload.single("logo"), addProduct);

export { router };
