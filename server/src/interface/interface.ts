import { ObjectId } from "mongoose";

export interface Product {
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand: ObjectId;
}

export interface Brand {
  name: string;
  logo_url: string;
}
