import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";

interface Query {
  limit: string;
}

/* GET ALL PRODUCTS */
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit: number = parseInt(req.query.limit as string);
    const skip: number = parseInt(req.query.skip as string);

    const products = await ProductModel.find({})
      .populate("brand")
      .skip(skip)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

/* GET PRODUCT BY ID */
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

export { getAllProducts, getProduct };
