"use client";

import { Text } from "@chakra-ui/react";

const RequiredAsterisk: React.FC = () => {
  return (
    <Text as="span" color="red.500">
      *
    </Text>
  );
};

export default RequiredAsterisk;
