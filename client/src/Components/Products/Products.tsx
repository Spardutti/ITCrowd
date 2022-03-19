import React, { useState } from "react";
import { useGetAllProducts } from "../../Api/Products/get_products";
import { Product } from "../../interface/interface";
import ProductCard from "./ProductCard";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const [pagination, setPagination] = useState({
    limit: "4",
    skip: "2",
  });
  const { data, isLoading } = useGetAllProducts(pagination);

  if (isLoading) return <p>loading</p>;

  if (data) console.log(data);
  return (
    <div>
      {data?.data.map((elem: Product, index: number) => {
        return <ProductCard product={elem} key={index} />;
      })}
    </div>
  );
};

export default Products;
