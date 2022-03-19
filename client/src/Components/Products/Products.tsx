import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetAllProducts } from "../../Api/Products/get_products";
import { Product } from "../../interface/interface";
import ProductCard from "./ProductCard";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const [pagination, setPagination] = useState({
    limit: "3",
    skip: "0",
  });
  const { data, isLoading } = useGetAllProducts(pagination);

  const fetchMore = () => {
    let limit = parseInt(pagination.limit);
    limit += limit;
    setPagination({
      ...pagination,
      limit: limit.toString(),
    });
  };

  if (isLoading) return <p>loading</p>;

  return (
    <div>
      {data?.data.map((elem: Product, index: number) => {
        return <ProductCard product={elem} key={index} />;
      })}
      <Button isLoading={isLoading} onClick={fetchMore}>
        More
      </Button>
    </div>
  );
};

export default Products;
