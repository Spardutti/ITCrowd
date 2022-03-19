import { useMutation } from "react-query";
import axios from "axios";
import url from "../url";

/* NEW BRAND */
const newBrand = (info: { name: string; token: string | null; logo: File }) => {
  let formData = new FormData();
  formData.append("logo", info.logo);
  formData.append("name", info.name);

  return axios({
    url: `${url}/brand`,
    method: "POST",
    data: formData,
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  }).catch((error) => {
    throw error.response;
  });
};

const useNewBrand = () => {
  return useMutation(newBrand);
};

export { useNewBrand };
