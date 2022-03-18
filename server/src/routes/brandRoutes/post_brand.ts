import { Router } from "express";
import { addBrand } from "../../controllers/brandController/post_brand";
import passport from "passport";

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* CREATE BRAND */
router.post("/brand", jwtProtected, addBrand);

export { router };
