import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetUser } from "../../Api/User/get_user";
import { Product } from "../../interface/interface";
import ProductModal from "./ProductModal";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image_url, price, brand } = product;
  const [user, setUser] = useState<{ isAdmin: false }>();
  const [token, setToken] = useState("");
  /* MODAL CONTROLLERS */
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem("itcrowd");
    if (token) setToken(token);
  }, []);
  const { data, isLoading } = useGetUser(token);

  useEffect(() => {
    if (data) setUser(data.data);
  }, [data]);

  return (
    <Box
      w={400}
      h={400}
      bg="#fafafa"
      p={5}
      m={10}
      borderRadius="lg"
      onClick={onOpen}
    >
      <Image src={image_url} w={350} h={200} borderRadius="lg" />
      <Heading textAlign={"center"}>{name}</Heading>
      <Text textAlign={"center"}>{brand.name}</Text>
      <Text textAlign={"center"}>Price: {price}$</Text>
      {user && user.isAdmin ? (
        <HStack>
          <Button>Delete</Button>
          <Button>Edit</Button>
        </HStack>
      ) : null}
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </Box>
  );
};

export default ProductCard;
