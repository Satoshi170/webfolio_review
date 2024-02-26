"use client";

import { useState } from "react";

import { Flex, Image, Text } from "@chakra-ui/react";

interface Props {
  favicon: string | null;
  url: string;
}

const LinkCardURLText: React.FC<Props> = ({ favicon, url }) => {
  const [hasLoadError, setHasLoadError] = useState(false);

  return (
    <Flex align="center">
      {favicon && !hasLoadError && (
        <Image
          src={favicon}
          alt={url}
          onError={() => setHasLoadError(true)}
          objectFit="cover"
          maxH="1rem"
          mr="1"
        />
      )}
      <Text color="blackAlpha.900" fontSize="xs" noOfLines={1}>
        {url}
      </Text>
    </Flex>
  );
};

export default LinkCardURLText;
