import { HStack } from "@chakra-ui/react";
import React from "react";
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
