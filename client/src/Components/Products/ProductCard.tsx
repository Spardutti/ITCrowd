import {
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetUser } from "../../Api/User/get_user";
import { Product } from "../../interface/interface";
import ProductModal from "./ProductModal";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useDeleteProduct } from "../../Api/Products/delete_products";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import EditModal from "./EditModal";

/* RENDERS A CARD FOR EACH PRODUCT */
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image_url, price, brand } = product;
  const [user, setUser] = useState<{ isAdmin: false }>();
  const [token, setToken] = useState("");

  /* MODAL CONTROLLERS */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* EDIT MODAL */
  const {
    isOpen: isEdit,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  /* GET JWT TOKEN */
  useEffect(() => {
    const token = localStorage.getItem("itcrowd");
    if (token) setToken(token);
  }, []);

  /* GET USER DATA TO CHECK IF ISADMIN */
  const { data } = useGetUser(token);

  /* DELETE PRODUCT */
  const { mutateAsync, isLoading: isDeleting } = useDeleteProduct();
  const queryClient = useQueryClient();
  const deleteProduct = async () => {
    const info = {
      token,
      id: product._id,
    };
    const response = await mutateAsync(info);
    if (response.status === 200) {
      toast.success("Product deleted");
      queryClient.invalidateQueries("products");
    }
  };

  useEffect(() => {
    if (data) setUser(data.data);
  }, [data]);

  return (
    <VStack
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
        <HStack justify={"center"} onClick={(e) => e.stopPropagation()}>
          <Button
            colorScheme={"green"}
            leftIcon={<FaEdit />}
            onClick={onEditOpen}
          >
            Edit
          </Button>
          <Button
            colorScheme={"red"}
            leftIcon={<AiFillDelete />}
            onClick={deleteProduct}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </HStack>
      ) : null}
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
      {isEdit && (
        <EditModal
          isEdit={isEdit}
          onEditClose={onEditClose}
          product={product}
        />
      )}
    </VStack>
  );
};

export default ProductCard;
