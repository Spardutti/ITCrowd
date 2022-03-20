import {
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
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
import { motion } from "framer-motion";

/* RENDERS A CARD FOR EACH PRODUCT */
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image_url, price } = product;
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

  const buttonSize = useBreakpointValue(["xs", "sm", "md"]);
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: -5,
        transition: { duration: 0.3 },
      }}
    >
      <VStack
        /*      */
        w={[150, 200, 250, 300, 400]}
        maxH={[300, 400]}
        bg="#DDD"
        py={5}
        px={2}
        m={[2, 5, 10]}
        borderRadius="lg"
        onClick={onOpen}
        cursor="pointer"
      >
        <Stack align={"center"} justify="center" h={200}>
          <Image
            src={image_url}
            maxW={[150, 200, 250, 350]}
            maxH={150}
            borderRadius="lg"
          />
        </Stack>
        <Heading
          fontSize={name.length > 16 ? [13, 20] : [20, 20]}
          textAlign={"center"}
          h={[5, 10]}
        >
          {name}
        </Heading>
        <Text textAlign={"center"}>Price: {price}$</Text>
        {user && user.isAdmin ? (
          <HStack justify={"center"} onClick={(e) => e.stopPropagation()}>
            <Button
              colorScheme={"green"}
              leftIcon={<FaEdit />}
              onClick={onEditOpen}
              size={buttonSize}
            >
              Edit
            </Button>
            <Button
              size={buttonSize}
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
    </motion.div>
  );
};

export default ProductCard;
