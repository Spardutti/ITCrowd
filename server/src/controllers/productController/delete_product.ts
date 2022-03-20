import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";

/* DELETE PRODUCT */
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    res.status(200).json(`producte deleted ${product}`);
  } catch (error) {
    return next(error);
  }
};

export { deleteProduct };
