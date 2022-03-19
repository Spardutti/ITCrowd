import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Box,
  HStack,
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
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Image src={image_url} />
          <Text>{description}</Text>
          <Text>Price: {price}$</Text>
          <HStack justify="space-around">
            <Text>{brand.name}</Text>
            <Image src={brand.logo_url} h={100} />
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
<p>hola</p>;
