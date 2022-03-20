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
        <ModalHeader textAlign={"center"} fontWeight="bold" fontSize={30}>
          {name}
        </ModalHeader>
        <ModalBody textAlign={"center"}>
          <Image src={image_url} borderRadius="md" />
          <Text>{description}</Text>
          <Text>Price: {price}$</Text>
          <Text fontWeight={"medium"}>Brand</Text>
          <HStack justify="space-around">
            <Text>{brand.name}</Text>
            <Image src={brand.logo_url} h={100} borderRadius="md" />
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
