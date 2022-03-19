import axios from "axios";
import { useMutation } from "react-query";
import { Product } from "../../interface/interface";
import url from "../url";

/* NEW PRODUCT */
const newProduct = (info: {
  product: Product;
  logo: File;
  brandId: string;
  token: string;
}) => {
  const { name, description, price } = info.product;

  let formData = new FormData();
  formData.append("logo", info.logo);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("brandId", info.brandId);

  return axios({
    url: `${url}/product`,
    method: "POST",
    data: formData,

    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
};

const useNewProduct = () => {
  return useMutation(newProduct);
};

export { useNewProduct };
