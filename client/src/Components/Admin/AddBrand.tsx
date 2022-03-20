import { Box, Button, FormLabel, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNewBrand } from "../../Api/Brands/post_brand";
import FormLayout from "../User/FormLayout";

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

  const createBrand = async () => {
    if (brand.img) {
      const info = { name: brand.name, token: brand.token, logo: brand.img };
      const response = await mutateAsync(info);
      if (response.status === 200) {
        toast.success("Brand Created");
        toggle();
      }
    }
  };

  return (
    <>
      {show ? (
        <FormLayout>
          <Box bg="#fafafa" p={5} borderRadius={"md"}>
            <Input
              placeholder="Brand name"
              name="brand"
              onChange={onBrand}
              borderColor="black"
              my={1}
            />
            <FormLabel m={0}>Brand Logo</FormLabel>
            <Input
              pt={1}
              type={"file"}
              name="logo"
              onChange={onImage}
              borderColor="black"
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
              <Button colorScheme={"red"} onClick={toggle}>
                Close
              </Button>
            </HStack>
          </Box>
        </FormLayout>
      ) : (
        <Button colorScheme={"orange"} onClick={toggle}>
          Add Brand
        </Button>
      )}
    </>
  );
};

export default AddBrand;
