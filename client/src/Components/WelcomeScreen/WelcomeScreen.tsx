import { Box } from "@chakra-ui/react";
import React from "react";
import Admin from "../User/Admin";
import Login from "../User/Login";
import NewUser from "../User/NewUser";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return (
    <Box>
      <Box w={400}>
        <NewUser />
        <Login />
        <Admin />
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
