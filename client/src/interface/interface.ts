export interface Product {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  price: string;
  brand: {
    _id: string;
    name: string;
    logo_url: string;
  };
}

export interface Brand {
  _id: string;
  name: string;
  logo_url: string;
}
