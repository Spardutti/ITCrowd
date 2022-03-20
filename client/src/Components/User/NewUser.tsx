import { Button, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNewUser } from "../../Api/User/post_user";
import FormLayout from "./FormLayout";

interface NewUserProps {}

const NewUser: React.FC<NewUserProps> = () => {
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

  const { mutateAsync, isLoading } = useNewUser();

  /* CREATES NEW USER */
  const newUser = async () => {
    const response = await mutateAsync(userInfo);

    if (response.status === 200) {
      toast.success("Account created succesfully");
      setUserInfo({
        username: "",
        password: "",
      });
      return;
    }
    toast.error(response.data.username);
  };

  return (
    <FormLayout>
      <Text textAlign={"center"} fontWeight="medium">
        Create account
      </Text>
      <Input
        autoComplete="off"
        my={1}
        name="username"
        value={userInfo.username}
        placeholder="Username"
        onChange={onChange}
        borderColor="black"
        bg="#fff"
      />

      <Input
        autoComplete="off"
        borderColor="black"
        name="password"
        value={userInfo.password}
        placeholder="Password"
        onChange={onChange}
        bg="#fff"
      />
      <HStack justify={"center"} mt={5}>
        <Button
          disabled={!userInfo.username || !userInfo.password ? true : false}
          colorScheme={"green"}
          isLoading={isLoading}
          onClick={newUser}
        >
          Sign up
        </Button>
      </HStack>
    </FormLayout>
  );
};

export default NewUser;
