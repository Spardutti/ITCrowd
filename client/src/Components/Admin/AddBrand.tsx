import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNewBrand } from "../../Api/Brands/post_brand";
import FormLayout from "../User/FormLayout";
import { useQueryClient } from "react-query";

interface AddBrandProps {}

interface Brand {
  name: string;
  token: string;
  img: File | undefined;
}

const AddBrand: React.FC<AddBrandProps> = () => {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState<Brand>({
    name: "",
    token: "",
    img: undefined,
  });

  const toggle = () => setShow(!show);

  useEffect(() => {
    const token = localStorage.getItem("itcrowd");
    if (token) {
      setBrand({
        ...brand,
        token: token,
      });
    }
  }, []);

  const { mutateAsync, isLoading } = useNewBrand();

  /* MODAL CONTROLS */
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({
      ...brand,
      name: e.target.value,
    });
  };

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({
      ...brand,
      img: e.target.files?.[0],
    });
  };

  /* CREATE A NEW BRAND */
  const queryClient = useQueryClient();
  const createBrand = async () => {
    if (brand.img) {
      const info = { name: brand.name, token: brand.token, logo: brand.img };
      const response = await mutateAsync(info);
      if (response.status === 200) {
        toast.success("Brand Created");
        onClose();
        queryClient.invalidateQueries("brands");
      }
    }
  };

  const modalSize = useBreakpointValue(["xs", "md"]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent bg="#DDD" p={5} pt={10}>
          <ModalBody textAlign={"center"}>
            <Box borderRadius={"md"}>
              <Input
                autoComplete="off"
                placeholder="Brand name"
                name="brand"
                onChange={onBrand}
                borderColor="black"
                my={1}
                bg="#fff"
              />
              <FormLabel m={0}>Brand Logo</FormLabel>
              <Input
                pt={1}
                type={"file"}
                name="logo"
                onChange={onImage}
                borderColor="black"
                bg="#fff"
              />
              <HStack pt={3}>
                <Button
                  colorScheme={"blue"}
                  isLoading={isLoading}
                  onClick={createBrand}
                  disabled={!brand.name || !brand.img ? true : false}
                >
                  Create
                </Button>
                <Button colorScheme={"red"} onClick={onClose}>
                  Close
                </Button>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Button colorScheme={"blackAlpha"} onClick={onOpen}>
        Add Brand
      </Button>
    </>
  );
};

export default AddBrand;
