import { Router } from "express";
import {
  getBrand,
  getAllBrands,
} from "../../controllers/brandController/get_brand";

const router = Router();

/* GET ALL BRANDS */
router.get("/brands", getAllBrands);

/* GET BRAND */
router.get("/brand", getBrand);

export { router };
