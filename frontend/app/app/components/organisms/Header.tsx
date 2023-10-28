"use client";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

import LoggedInHeaderRightSection from "../molecules/LoggedInHeaderRightSection";
import LoggedOutHeaderRightSection from "../molecules/LoggedOutHeaderRightSection";

const Header: React.FC = () => {
  const { isLogin } = useRecoilValue(loginState);
  return (
    <Box as="nav" bg="gray.900" color="gray.50">
      <Container maxW="container.xl">
        <Flex justify="space-between" py={{ base: 1.0, md: 3.0 }} alignItems="center">
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
