import { Container, chakra } from "@chakra-ui/react";

const CenteredBox = chakra(Container, {
  baseStyle: {
    h: "auto",
    mx: "auto",
    maxW: "container.lg"
  }
});

export default CenteredBox;
