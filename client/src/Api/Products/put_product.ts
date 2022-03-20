import { useMutation } from "react-query";
import axios from "axios";
import url from "../url";
import { Product } from "../../interface/interface";

/* UPDATE PRODUCT */
const updateProduct = (info: {
  product: Product;
  logo: File;
  brandId: string;
  token: string;
  productId: string;
}) => {
  const { name, description, price } = info.product;

  let formData = new FormData();
  formData.append("logo", info.logo);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("brandId", info.brandId);
  formData.append("productId", info.productId);

  return axios({
    url: `${url}/product`,
    method: "PUT",
    data: formData,

    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
};

const useUpdateProduct = () => {
  return useMutation(updateProduct);
};

export { useUpdateProduct };
