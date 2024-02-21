"use client";

import NextLink from "next/link";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import LoggedInHeaderRightSection from "./rightSections/loggedIn";
import LoggedOutHeaderRightSection from "./rightSections/loggedOut";

const Header: React.FC = () => {
  const { isLogin } = useGetLoginState();

  return (
    <Box as="nav" bg="gray.900" color="gray.50">
      <Container maxW="container.xl">
        <Flex justify="space-between" py={{ base: 2.0, md: 3.0 }} alignItems="center">
          <Heading as={NextLink} href="/" fontSize={{ base: "2xl", md: "3xl" }}>
            Webfolio-Review
          </Heading>
          {isLogin ? <LoggedInHeaderRightSection /> : <LoggedOutHeaderRightSection />}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
