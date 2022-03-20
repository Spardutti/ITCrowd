import { Button, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../../Api/Products/get_products";
import { useGetUser } from "../../Api/User/get_user";
import { Product } from "../../interface/interface";
import Panel from "../Admin/Panel";
import LoadingSpinner from "../Reusable/LoadingSpinner";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const [pagination, setPagination] = useState({
    limit: "4",
    skip: "0",
  });
  const [token, setToken] = useState("");
  const [user, setUser] = useState<{ isAdmin: false }>();

  /* GET ALL PRODUCTS */
  const { data, isLoading } = useGetAllProducts(pagination);

  /* GET USER */
  const { data: userInfo, refetch } = useGetUser(token);

  /* GET CURRENT USER TO CHECK IF ADMIN */
  useEffect(() => {
    const localToken = localStorage.getItem("itcrowd");
    if (localToken) {
      setToken(localToken);
    }
    token && refetch();
  }, [token]);

  /* SETS THE USER INFO */
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo.data);
    }
  }, [userInfo]);

  /* FETCH MORE PRODUCTS */
  const fetchMore = () => {
    let limit = parseInt(pagination.skip);
    limit += 4;
    setPagination({
      ...pagination,
      skip: limit.toString(),
    });
  };

  /* PREVIOUS PAGE */
  const fetchLess = () => {
    let limit = parseInt(pagination.skip);
    limit -= 4;
    setPagination({
      ...pagination,
      skip: limit.toString(),
    });
  };

  /* FAKE LOGOUT  */
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("itcrowd");
    navigate("/");
  };

  return (
    <Stack align={"center"} p={10}>
      <Heading textAlign={"center"} color="#111" fontSize={50}>
        ITCrowd Departament Store
      </Heading>
      <ProductSearch />
      <HStack>
        {user?.isAdmin ? <Panel /> : null}
        <Button colorScheme={"blackAlpha"} onClick={logout}>
          Log out
        </Button>
      </HStack>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SimpleGrid gridTemplateColumns={"repeat(2, 6fr)"} pt={20}>
            {data?.data.map((elem: Product, index: number) => {
              return <ProductCard product={elem} key={index} />;
            })}
          </SimpleGrid>
          <HStack>
            {pagination.skip === "0" ? null : (
              <Button
                colorScheme={"blackAlpha"}
                isLoading={isLoading}
                onClick={fetchLess}
              >
                Prev
              </Button>
            )}
            {data?.data.length !== 4 ? null : (
              <Button
                colorScheme={"blackAlpha"}
                isLoading={isLoading}
                onClick={fetchMore}
              >
                Next
              </Button>
            )}
          </HStack>
        </>
      )}
    </Stack>
  );
};

export default Products;
