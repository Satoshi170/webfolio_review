"use client";

import { Button, Flex, Spacer } from "@chakra-ui/react";

const LoggedOutHeaderRightSection: React.FC = () => {
  return (
    <Flex align="center">
      <Button as="a" href="/auth/sign_up" colorScheme="messenger">
        新規登録
      </Button>
      <Spacer mx="1" />
      <Button as="a" href="/auth/sign_in" colorScheme="messenger">
        サインイン
      </Button>
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
