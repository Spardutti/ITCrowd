import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Image,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Product } from "../../interface/interface";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { name, description, image_url, brand, price } = product;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"#DDD"}>
        <ModalHeader textAlign={"center"} fontWeight="bold" fontSize={30}>
          {name}
        </ModalHeader>
        <ModalBody textAlign={"center"}>
          <Stack justify={"center"} align="center">
            <Image src={image_url} borderRadius="md" />
          </Stack>
          <Text>{description}</Text>
          <Text>Price: {price}$</Text>
          <HStack justify="center">
            <Image src={brand.logo_url} maxH={200} borderRadius="md" />
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
