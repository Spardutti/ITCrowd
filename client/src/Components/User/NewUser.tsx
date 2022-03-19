import { Button, Input, Stack } from "@chakra-ui/react";
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
      <Button isLoading={isLoading} onClick={newUser}>
        hit me
      </Button>
    </FormLayout>
  );
};

export default NewUser;
