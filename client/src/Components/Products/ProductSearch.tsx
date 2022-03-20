import { Modal, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import {
  useGetAllProducts,
  useGetProduct,
} from "../../Api/Products/get_products";
import ProductModal from "./ProductModal";

interface ProductSearchProps {}

interface Data {
  key: string;
  value: string;
}

interface Product {
  _id: string;
  name: string;
}

const ProductSearch: React.FC<ProductSearchProps> = () => {
  const pagination = {
    skip: "0",
    limit: "0",
  };

  /* PRODUCTS FOR SEARCH BARD */
  const [products, setProducts] = useState<Data[]>([]);

  const [productId, setProductId] = useState("");

  /* MODAL CONTROLLER */
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: allProducts, isLoading } = useGetAllProducts(pagination);

  const {
    data: productInfo,
    isLoading: isProduct,
    refetch,
  } = useGetProduct(productId);

  useEffect(() => {
    if (allProducts) {
      const arr: any[] = [];
      allProducts.data.forEach((elem: Product) => {
        arr.push({
          key: elem._id,
          value: elem.name,
        });
        setProducts(arr);
      });
    }
  }, [allProducts]);

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId]);

  return (
    <>
      <ReactSearchBox
        data={products}
        placeholder="Search products"
        onChange={(e) => null}
        onSelect={(e) => {
          setProductId(e.item.key);
          onOpen();
        }}
        clearOnSelect={true}
      />
      {productInfo && (
        <ProductModal
          isOpen={isOpen}
          onClose={onClose}
          product={productInfo.data}
        />
      )}
    </>
  );
};

export default ProductSearch;
