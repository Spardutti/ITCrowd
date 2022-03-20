import { Box, Button, FormLabel, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAllBrands } from "../../Api/Brands/get_brands";
import { useNewProduct } from "../../Api/Products/post_product";
import { Brand, Product } from "../../interface/interface";
import FormLayout from "../User/FormLayout";
import Select from "react-select";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    price: "",
    brand: {
      _id: "",
      name: "",
      logo_url: "",
    },
    image_url: "",
  });

  const [logo, setLogo] = useState<File>();
  const [token, setToken] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);

  /* TOGGLE FORM */
  const toggle = () => setShow(!show);

  /* UPDATE PRODUCT INFORMATION */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  /* PRODUCT LOGO */
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files?.[0]);
  };

  const { mutateAsync, isLoading } = useNewProduct();

  const { data } = useAllBrands();

  /* GET JWT TOKEN */
  useEffect(() => {
    const token = localStorage.getItem("itcrowd");
    if (token) {
      setToken(token);
    }
  }, []);

  /* GET BRANDS */
  useEffect(() => {
    if (data?.data) {
      const options: any = [];
      data.data.forEach((brand: Brand) => {
        options.push({ value: brand._id, label: brand.name });
      });
      setBrands(options);
    }
  }, [data]);

  /* CREATE PRODUCT */
  const queryClient = useQueryClient();
  const createProduct = async () => {
    if (logo) {
      const info = {
        product,
        token,
        brandId,
        logo,
      };
      const response = await mutateAsync(info);
      if (response.status === 200) {
        toast.success("Product created");
        setBrandId("");
        setProduct({
          ...product,
          name: "",
          description: "",
          price: "",
        });
        queryClient.invalidateQueries("products");
      }
      toggle();
    }
  };

  return show ? (
    <FormLayout>
      <Box bg="#DDD" p={5} borderRadius={"md"}>
        <Input
          name="name"
          value={product.name}
          onChange={onChange}
          placeholder="Product name"
          borderColor={"black"}
          my={1}
          bg="#fff"
        />
        <Input
          name="description"
          value={product.description}
          onChange={onChange}
          placeholder="Product description"
          borderColor={"black"}
          my={1}
          bg="#fff"
        />
        <Input
          name="price"
          value={product.price}
          onChange={onChange}
          placeholder="Product price"
          borderColor={"black"}
          my={1}
          bg="#fff"
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
          bg="#fff"
        />

        <Select
          placeholder="Select a brand"
          options={brands}
          onChange={(e: any) => setBrandId(e?.value)}
        />
        <HStack mt={1} justify="center">
          <Button
            colorScheme={"blue"}
            onClick={createProduct}
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
            Create Product
          </Button>
          <Button colorScheme={"red"} onClick={toggle}>
            Close
          </Button>
        </HStack>
      </Box>
    </FormLayout>
  ) : (
    <Button colorScheme={"blackAlpha"} onClick={toggle}>
      Add Product
    </Button>
  );
};

export default AddProduct;
