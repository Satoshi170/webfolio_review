"use client";

import { Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <Container as="main" maxW="container.xl" my="4" flex="1">
      {children}
    </Container>
  );
};

export default Main;
