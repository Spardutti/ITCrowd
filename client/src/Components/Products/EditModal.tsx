import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { Brand, Product } from "../../interface/interface";
import { useAllBrands } from "../../Api/Brands/get_brands";
import Select from "react-select";
import { useUpdateProduct } from "../../Api/Products/put_product";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

interface EditModalProps {
  isEdit: boolean;
  onEditClose: () => void;
  product: Product;
}

const EditModal: React.FC<EditModalProps> = ({
  isEdit,
  onEditClose,
  product,
}) => {
  const [brands, setBrands] = useState([]);
  const [logo, setLogo] = useState<File>();
  const [brandId, setBrandId] = useState("");
  const [updateProduct, setUpdateProduct] = useState<Product>({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: {
      name: product.brand.name,
      logo_url: product.brand.logo_url,
    },
    image_url: product.image_url,
  });
  const [token, setToken] = useState("");

  /* GET BRANDS */
  const { data } = useAllBrands();
  useEffect(() => {
    if (data?.data) {
      const options: any = [];
      data.data.forEach((brand: Brand) => {
        options.push({ value: brand._id, label: brand.name });
      });
      setBrands(options);
    }
  }, [data]);

  /* PRODUCT LOGO */
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files?.[0]);
  };

  /* UPDATE PRODUCT INFORMATION */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateProduct({
      ...updateProduct,
      [e.target.name]: e.target.value,
    });
  };

  /* GET JWT TOKEN */
  useEffect(() => {
    const token = localStorage.getItem("itcrowd");
    if (token) {
      setToken(token);
    }
  }, []);

  /* UPDATE PRODUCT */
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useUpdateProduct();
  const update = async () => {
    if (logo) {
      const info = {
        product: updateProduct,
        token,
        brandId,
        logo,
        productId: product._id,
      };
      const response = await mutateAsync(info);
      if (response.status === 200) {
        toast.success("Product updated");
        setBrandId("");
        setUpdateProduct({
          ...product,
          name: "",
          description: "",
          price: "",
        });
        onEditClose();
        queryClient.invalidateQueries("products");
      }
    }
  };

  const { name, description, price } = updateProduct;
  return (
    <Modal isOpen={isEdit} onClose={onEditClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} fontWeight="bold" fontSize={30}>
          {name}{" "}
        </ModalHeader>
        <ModalBody textAlign={"center"}>
          <FormLabel m={0}>Name</FormLabel>
          <Input
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Product name"
            borderColor={"black"}
            my={1}
          />
          <FormLabel m={0}>Description</FormLabel>

          <Input
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Product description"
            borderColor={"black"}
            my={1}
          />
          <FormLabel m={0}>Price</FormLabel>

          <Input
            name="price"
            value={price}
            onChange={onChange}
            placeholder="Product price"
            borderColor={"black"}
            my={1}
            type="number"
          />
          <FormLabel m={0}>Product logo</FormLabel>
          <Input
            type="file"
            name="logo"
            onChange={onLogo}
            p={1}
            borderColor={"black"}
            my={1}
          />

          <Select
            placeholder="Select a brand"
            options={brands}
            onChange={(e: any) => setBrandId(e?.value)}
          />
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button
              colorScheme={"blue"}
              onClick={update}
              isLoading={isLoading}
              disabled={
                !product.name ||
                !product.description ||
                !product.price ||
                !logo ||
                !brandId
                  ? true
                  : false
              }
            >
              Update
            </Button>
            <Button colorScheme="red" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
