"use client";

import { Flex, Spinner } from "@chakra-ui/react";

export const FullPageLoadingSpinner = () => {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
