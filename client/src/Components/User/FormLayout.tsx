import { Box } from "@chakra-ui/react";
import React from "react";

interface FormLayoutProps {}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <Box w={400} h={300} p={10} m={5} borderRadius="md">
      {children}
    </Box>
  );
};

export default FormLayout;
