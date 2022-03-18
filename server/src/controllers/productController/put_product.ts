import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";

/* UPDATE PRODUCT */
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, image_url, price, brand, id } = req.body;
  } catch (error) {}
};
