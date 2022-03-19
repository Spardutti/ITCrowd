import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAllBrands } from "../../Api/Brands/get_brands";
import { useNewProduct } from "../../Api/Products/post_product";
import { Brand, Product } from "../../interface/interface";
import FormLayout from "../User/FormLayout";
import Select from "react-select";

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    price: "0",
    brand: {
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
  const createProduct = async () => {
    if (logo) {
      const info = {
        product,
        token,
        brandId,
        logo,
      };
      const response = await mutateAsync(info);
    }
  };

  return show ? (
    <FormLayout>
      <Input
        name="name"
        value={product.name}
        onChange={onChange}
        placeholder="Product name"
      />
      <Input
        name="description"
        value={product.description}
        onChange={onChange}
        placeholder="Product description"
      />
      <Input
        name="price"
        value={product.price}
        onChange={onChange}
        placeholder="Product price"
      />
      <Input type="file" name="logo" onChange={onLogo} />
      {/*      <select>
        {brands.map((brand: Brand) => {
          return (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          );
        })}
      </select> */}
      <Select options={brands} onChange={(e: any) => setBrandId(e?.value)} />
      <HStack>
        <Button onClick={createProduct} isLoading={isLoading}>
          Create Product
        </Button>
        <Button onClick={toggle}>Close</Button>
      </HStack>
    </FormLayout>
  ) : (
    <Button onClick={toggle}>Add Product</Button>
  );
};

export default AddProduct;
