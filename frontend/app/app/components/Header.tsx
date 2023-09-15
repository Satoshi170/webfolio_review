"use client";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import LoggedInHeaderRightSection from "./containers/LoggedInHeaderRightSection";
import LoggedOutHeaderRightSection from "./containers/LoggedOutHeaderRightSection";
import { loginState } from "../stores/atoms/loginState";

const Header: React.FC = () => {
  const { isLogin } = useRecoilValue(loginState);
  return (
    <Box as="nav" bg="gray.900" color="gray.50">
      <Container maxW="container.xl">
        <Flex justify="space-between" py={{ base: 2.5, md: 3.5 }}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>
            Webfolio-Review
          </Heading>
          {isLogin ? <LoggedInHeaderRightSection /> : <LoggedOutHeaderRightSection />}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
