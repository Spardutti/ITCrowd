import {
  newUser,
  localLogin,
} from "../../controllers/userController/post_user";
import { Router } from "express";
const router = Router();

/* CREATES LOCAL USER */
router.post("/newUser", newUser);

/* LOGIN LOCAL USER */
router.post("/localUser", localLogin);

export { router };
