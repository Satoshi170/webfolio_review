"use client";

import { Container } from "@chakra-ui/react";

import ToastWrapper from "./ToastWrapper";

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <Container as="main" maxW="container.xl" my="4" flex="1" display="flex">
      <ToastWrapper />
      {children}
    </Container>
  );
};

export default Main;
