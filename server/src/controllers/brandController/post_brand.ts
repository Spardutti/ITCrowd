import { BrandModel } from "../../models/Brand";
import { Request, Response, NextFunction } from "express";

/* CREATES A BRAND */
export const addBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, logo_url } = req.body;
    const brand = new BrandModel({
      name,
      logo_url,
    });

    await brand.save();

    return res.status(200).json(brand);
  } catch (error) {
    return next(error);
  }
};
