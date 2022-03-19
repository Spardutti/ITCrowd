import { Button, HStack, Input } from "@chakra-ui/react";
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
          <Input placeholder="Brand name" name="brand" onChange={onBrand} />
          <Input type={"file"} name="logo" onChange={onImage} />
          <HStack>
            <Button isLoading={isLoading} onClick={createBrand}>
              Create
            </Button>
            <Button onClick={toggle}>Close</Button>
          </HStack>
        </FormLayout>
      ) : (
        <Button onClick={toggle}>Add Brand</Button>
      )}
    </>
  );
};

export default AddBrand;
