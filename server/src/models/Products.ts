import { Schema, model } from "mongoose";
import { Product } from "../interface/interface";

const ProductSchema = new Schema<Product>({
  name: String,
  description: String,
  image_url: String,
  price: Number,
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
});

export const ProductModel = model<Product>("Product", ProductSchema);
