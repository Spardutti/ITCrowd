import { useMutation } from "react-query";
import axios from "axios";
import url from "../url";

/* NEW USER */
const newUser = (userInfo: { username: string; password: string }) => {
  return axios
    .post(`${url}/newuser`, {
      username: userInfo.username,
      password: userInfo.password,
    })
    .catch((error) => {
      throw error.response;
    });
};

const useNewUser = () => {
  return useMutation(newUser);
};

/* LOCAL LOGIN */
const localLogin = (userInfo: { username: string; password: string }) => {
  return axios
    .post(`${url}/localuser`, {
      username: userInfo.username,
      password: userInfo.password,
    })
    .catch((error) => {
      throw error.response;
    });
};

const useLocalLogin = () => {
  return useMutation(localLogin);
};

export { useNewUser, useLocalLogin };
