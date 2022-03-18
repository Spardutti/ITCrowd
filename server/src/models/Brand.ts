import { Schema, model } from "mongoose";
import { Brand } from "../interface/interface";

const BrandSchema = new Schema<Brand>({
  name: String,
  logo_url: String,
});

export const BrandModel = model<Brand>("Brand", BrandSchema);
