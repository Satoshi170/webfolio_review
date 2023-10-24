import { Box, chakra } from "@chakra-ui/react";

const CenteredBox = chakra(Box, {
  baseStyle: {
    h: "auto",
    mx: "auto",
    maxW: "lg",
    alignItems: "center"
  }
});

export default CenteredBox;
