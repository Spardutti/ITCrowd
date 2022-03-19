import { useQuery } from "react-query";
import axios from "axios";
import url from "../url";

/* GET CURRENT USEr */
const getUser = (token: string) => {
  return axios.get(`${url}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const useGetUser = (token: string) => {
  return useQuery(["user", token], () => getUser(token));
};

export { useGetUser };
