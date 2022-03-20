import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Admin from "../User/Admin";
import Login from "../User/Login";
import NewUser from "../User/NewUser";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return (
    <VStack justify={"center"} align="center" h={"100vh"}>
      <Box bg={"#f1f1f1"} borderRadius="md">
        <Admin />
        <Login />
        <NewUser />
      </Box>
    </VStack>
  );
};

export default WelcomeScreen;
