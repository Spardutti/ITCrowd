import { Spinner, Stack } from "@chakra-ui/react";
import React from "react";

interface SpinnerProps {}

const LoadingSpinner: React.FC<SpinnerProps> = () => {
  return (
    <Stack justify={"center"} align="center" h="100vh" w="100vw">
      <Spinner size={"lg"} color="white" />
    </Stack>
  );
};

export default LoadingSpinner;
