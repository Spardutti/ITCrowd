import { NextFunction, Response, Request } from "express";
import { BrandModel } from "../../models/Brand";

/* GET ALL BRANDS */
const getAllBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await BrandModel.find({});
    res.status(200).json(brands);
  } catch (error) {
    return next(error);
  }
};

/* GET SINGLE BRAND */
const getBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const brand = await BrandModel.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    return next(error);
  }
};

export { getAllBrands, getBrand };
