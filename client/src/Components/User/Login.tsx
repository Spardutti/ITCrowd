import { Button, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocalLogin } from "../../Api/User/post_user";
import { useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, isLoading } = useLocalLogin();

  const navigate = useNavigate();

  /* LOG IN */
  const login = async () => {
    const response = await mutateAsync(userInfo);
    if (response.status === 200) {
      localStorage.setItem("itcrowd", response.data.token);
      navigate("/products");
      return;
    }
  };

  return (
    <FormLayout>
      <Input
        name="username"
        value={userInfo.username}
        placeholder="Username"
        onChange={onChange}
      />

      <Input
        name="password"
        value={userInfo.password}
        placeholder="Password"
        onChange={onChange}
      />
      <Button isLoading={isLoading} onClick={login}>
        Login
      </Button>
    </FormLayout>
  );
};

export default Login;
