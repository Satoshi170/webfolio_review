"use client";

import { useState } from "react";

import { Box, Image } from "@chakra-ui/react";

interface LinkCardImageProps {
  image: string | null;
  url: string;
}

const LinkCardImage: React.FC<LinkCardImageProps> = ({ image, url }) => {
  const [hasError, setHasError] = useState(false);
  const widePercent = "35%";

  if (hasError || !image) {
    return <Box w={widePercent} h="full" bg="gray.400" />;
  }

  return (
    <Image
      w={widePercent}
      src={image}
      alt={url}
      objectFit="scale-down"
      onError={() => {
        setHasError(true);
      }}
    />
  );
};

export default LinkCardImage;
