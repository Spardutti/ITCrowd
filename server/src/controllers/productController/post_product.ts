import { ProductModel } from "../../models/Products";
import { Request, Response, NextFunction } from "express";
import { BrandModel } from "../../models/Brand";

/* CREATE A PRODUCT */
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, image_url, price, brandId } = req.body;
    const brand = await BrandModel.findById(brandId);
    if (!brand) return res.status(404).json("Brand not found");

    const product = new ProductModel({
      name,
      description,
      image_url,
      price,
      brand,
    });
    await product.save();

    res.status(500).json(product);
  } catch (error) {
    return next(error);
  }
};

export { addProduct };
