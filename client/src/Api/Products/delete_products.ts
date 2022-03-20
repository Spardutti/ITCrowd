import { useMutation } from "react-query";
import axios from "axios";
import url from "../url";

/* DELETE PRODUCT */
const deleteProduct = (info: { token: string; id: string }) => {
  return axios
    .delete(`${url}/delete/${info.id}`, {
      headers: {
        Authorization: `Bearer ${info.token}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
};

const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};

export { useDeleteProduct };
