import { Box, chakra } from "@chakra-ui/react";

const RoundedCenteredBox = chakra(Box, {
  baseStyle: {
    flex: 1,
    m: "auto",
    maxW: "md",
    boxShadow: "md",
    p: "12",
    rounded: "md"
  }
});

export default RoundedCenteredBox;
