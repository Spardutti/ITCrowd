import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalLogin } from "../../Api/User/post_user";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const { mutateAsync: local, isLoading: isLocal } = useLocalLogin();
  const { mutateAsync: guest, isLoading: isGuest } = useLocalLogin();

  const navigate = useNavigate();

  const adminLogin = async () => {
    const adminInfo = {
      username: "admin",
      password: "12345",
    };
    const response = await local(adminInfo);
    if (response.status === 200) {
      localStorage.setItem("itcrowd", response.data.token);
      navigate("/products");
    }
  };

  const guestLogin = async () => {
    const guestInfo = {
      username: "guest",
      password: "12345",
    };
    const response = await guest(guestInfo);
    if (response.status === 200) {
      localStorage.setItem("itcrowd", response.data.token);
      navigate("/products");
    }
  };

  return (
    <VStack justify={"center"} mt={5}>
      <Text fontWeight={"medium"} textAlign={"center"}>
        Log in with our demo accounts
      </Text>
      <HStack>
        <Button colorScheme={"blue"} isLoading={isLocal} onClick={adminLogin}>
          Admin
        </Button>
        <Button colorScheme={"blue"} isLoading={isGuest} onClick={guestLogin}>
          Guest
        </Button>
      </HStack>
    </VStack>
  );
};

export default Admin;
