import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";

/* GET ALL PRODUCTS */
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find({}).populate("brand");
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

/* GET PRODUCT BY ID */
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

export { getAllProducts, getProduct };
