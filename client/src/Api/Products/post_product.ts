import axios from "axios";
import { useMutation } from "react-query";
import { Product } from "../../interface/interface";
import url from "../url";

/* NEW PRODUCT */
const newProduct = (info: Product, logo: File) => {
  let formData = new FormData();

  formData.append("logo", logo);
  return axios({
    url: `${url}/product`,
    method: "POST",
    data: {
      formData,
      body: {
        price: info.price,
      },
    },
  });
};
