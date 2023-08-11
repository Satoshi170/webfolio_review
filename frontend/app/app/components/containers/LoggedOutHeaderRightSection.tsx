"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

const LoggedOutHeaderRightSection: React.FC = () => {
  return (
    <Flex align="center">
      <Button
        as={NextLink}
        href="/auth/sign_up"
        colorScheme="messenger"
        sx={{ "&:hover": { textDecoration: "none" } }}
      >
        新規登録
      </Button>
      <Spacer mx="1" />
      <Button
        as={NextLink}
        href="/auth/sign_in"
        colorScheme="messenger"
        sx={{ "&:hover": { textDecoration: "none" } }}
      >
        サインイン
      </Button>
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
