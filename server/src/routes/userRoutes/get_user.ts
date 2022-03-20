import { Router } from "express";
import passport from "passport";
import { getUser } from "../../controllers/userController/get_user";

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET USER */
router.use("/user", jwtProtected, getUser);

export { router };
