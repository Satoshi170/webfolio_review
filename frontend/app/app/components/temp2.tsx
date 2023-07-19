"use client";

import { Flex, Heading, Link, Icon, Box } from "@chakra-ui/react";
import { TfiBell } from "react-icons/tfi";
import { TiMessage } from "react-icons/ti";

const Header: React.FC = () => {
  return (
    <Flex
      as="nav"
      bg="gray.900"
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{ base: 2.5, md: 3.5 }}
    >
      <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>
        Webfolio-Review
      </Heading>
      <Flex gap="4">
        <Link>
          <Icon as={TiMessage} boxSize={12} />
        </Link>
        <Link>
          <Icon as={TfiBell} boxSize={12} />
        </Link>
        <Link>
          <Box borderRadius="full" boxSize="55px" backgroundColor="white" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
