import { Box, Button, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import AddBrand from "./AddBrand";
import AddProduct from "./AddProduct";

interface PanelProps {}

const Panel: React.FC<PanelProps> = () => {
  return (
    <HStack>
      <AddBrand />
      <AddProduct />
    </HStack>
  );
};

export default Panel;
