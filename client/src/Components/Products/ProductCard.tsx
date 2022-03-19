import { Box, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Product } from "../../interface/interface";
import ProductModal from "./ProductModal";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image_url, price, brand } = product;

  /* MODAL CONTROLLERS */
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={400}
      h={300}
      bg="#fafafa"
      p={5}
      m={10}
      borderRadius="lg"
      onClick={onOpen}
    >
      <Image src={image_url} w={400} h={200} borderRadius="lg" />
      <Heading textAlign={"center"}>{name}</Heading>
      <Text textAlign={"center"}>{brand.name}</Text>
      <Text textAlign={"center"}>Price: {price}$</Text>
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </Box>
  );
};

export default ProductCard;
