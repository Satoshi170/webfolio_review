"use client";

import { Box, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer: React.FC = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const yearRange = currentYear === 2023 ? 2023 : `2023-${currentYear}`;

  return (
    <Box
      as="footer"
      bg="gray.900"
      color="gray.50"
      textAlign="center"
      data-testid="footer"
    >
      <Link
        as={NextLink}
        href="/"
        fontSize={{ base: "sm", md: "lg" }}
        padding={{ base: 2.5, md: 3.5 }}
      >
        Webfolio-Review
      </Link>
      <Text fontSize={{ base: "xs", md: "sm" }} padding={{ base: 1.0, md: 2.0 }}>
        ©{yearRange} Satoshi Inao
      </Text>
    </Box>
  );
};

export default Footer;
