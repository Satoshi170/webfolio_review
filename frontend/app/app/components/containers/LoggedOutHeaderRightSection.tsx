"use client";

import { Button, Flex } from "@chakra-ui/react";

const LoggedOutHeaderRightSection: React.FC = () => {
  return (
    <Flex>
      <Button>ログイン</Button>
      <Button>サインイン</Button>
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
