import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";
import { BrandModel } from "../../models/Brand";

/* UPDATE PRODUCT */
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, brandId, productId } = req.body;

    const brand = await BrandModel.findById(brandId);
    if (!brand) return res.status(404).json("brand not found");

    const product = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        name,
        description,
        image_url: req.file?.path,
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
