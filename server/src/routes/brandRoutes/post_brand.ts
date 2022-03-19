import { Router } from "express";
import { addBrand } from "../../controllers/brandController/post_brand";
import passport from "passport";
const upload = require("../../cloudinary/cloudinary");

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* CREATE BRAND */
router.post("/brand", jwtProtected, upload.single("logo"), addBrand);

export { router };
