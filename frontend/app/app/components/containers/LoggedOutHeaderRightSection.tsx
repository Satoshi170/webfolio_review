"use client";

import { Button, Flex, Spacer, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const LoggedOutHeaderRightSection: React.FC = () => {
  return (
    <Flex align="center" data-testid="logged-out-header">
      <Link as={NextLink} href="/auth/sign_up">
        <Button
          as="a"
          colorScheme="messenger"
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          新規登録
        </Button>
      </Link>
      <Spacer mx="1" />
      <Link as={NextLink} href="/auth/sign_in">
        <Button
          as="a"
          colorScheme="messenger"
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          サインイン
        </Button>
      </Link>
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
