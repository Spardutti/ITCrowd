import axios from "axios";
import { useQuery } from "react-query";
import url from "../url";

/* GET ALL PRODUCTS */
const getAllProducts = (queries: { limit: string; skip: string }) => {
  return axios.get(`${url}?skip=${queries.skip}&limit=${queries.limit}`);
};

const useGetAllProducts = (queries: { limit: string; skip: string }) => {
  return useQuery(["products", queries], () => getAllProducts(queries));
};

/* GET PRODUCT BY ID */
const getProduct = (id: string) => {
  return axios.get(`${url}/product/${id}`).catch((error) => {
    throw error.response;
  });
};

const useGetProduct = (id: string) => {
  return useQuery(["product", id], () => getProduct(id), {
    enabled: false,
  });
};

export { useGetAllProducts, useGetProduct };
