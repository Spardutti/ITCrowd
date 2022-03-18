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
    const product = await ProductModel.findOneAndUpdate(
      id,
      {
        name,
        description,
        image_url,
        price,
        brand,
      },
      { new: true }
    );

    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

export { updateProduct };
