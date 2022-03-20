import { Router } from "express";
import { updateProduct } from "../../controllers/productController/put_product";
import passport from "passport";
const upload = require("../../cloudinary/cloudinary");

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* UPDATE PRODUCT */
router.put("/product", jwtProtected, upload.single("logo"), updateProduct);

export { router };
