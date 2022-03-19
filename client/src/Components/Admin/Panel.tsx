import { Box, Button, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import AddBrand from "./AddBrand";

interface PanelProps {}

const Panel: React.FC<PanelProps> = () => {
  const AddProduct = () => {
    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    return <>{show ? <></> : <Button>Add Product</Button>}</>;
  };

  return (
    <Box>
      <AddBrand />
      <AddProduct />
    </Box>
  );
};

export default Panel;
