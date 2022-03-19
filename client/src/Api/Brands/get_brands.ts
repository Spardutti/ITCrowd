import { useQuery } from "react-query";
import axios from "axios";
import url from "../url";

/* GET ALL BRANDS */
const allBrands = () => {
  return axios.get(`${url}/brands`).catch((error) => {
    throw error.response;
  });
};

const useAllBrands = () => {
  return useQuery("brands", allBrands);
};

export { useAllBrands };
