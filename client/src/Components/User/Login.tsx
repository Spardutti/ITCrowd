import { Button, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocalLogin } from "../../Api/User/post_user";
import { useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";
import toast from "react-hot-toast";

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
    toast.error(response.data);
  };

  return (
    <FormLayout>
      <Text textAlign={"center"} fontWeight="medium">
        Log in
      </Text>
      <Input
        name="username"
        value={userInfo.username}
        placeholder="Username"
        onChange={onChange}
        borderColor="black"
        my={1}
      />

      <Input
        name="password"
        value={userInfo.password}
        placeholder="Password"
        onChange={onChange}
        bg="#fafafa"
        borderColor="black"
      />
      <HStack justify={"center"} mt={5}>
        <Button
          disabled={!userInfo.username || !userInfo.password ? true : false}
          colorScheme={"green"}
          isLoading={isLoading}
          onClick={login}
        >
          Login
        </Button>
      </HStack>
    </FormLayout>
  );
};

export default Login;
