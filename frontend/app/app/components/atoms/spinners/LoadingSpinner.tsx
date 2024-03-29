"use client";

import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Flex h="full" justifyContent="center" alignItems="center">
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
