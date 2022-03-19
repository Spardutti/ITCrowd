export interface Product {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand: {
    name: string;
    logo_url: string;
  };
}
