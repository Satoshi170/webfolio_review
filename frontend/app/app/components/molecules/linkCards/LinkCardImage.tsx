"use client";

import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

interface LinkCardImageProps {
  image: string | null;
  url: string;
  isLoading?: boolean;
}

const LinkCardImage: React.FC<LinkCardImageProps> = ({
  image,
  url,
  isLoading = false
}) => {
  const [hasError, setHasError] = useState(false);
  const widePercent = "30%";

  if (isLoading || hasError || !image) {
    return <Box w={widePercent} h="full" bg="gray.400" />;
  }

  return (
    <Image
      w={widePercent}
      h="full"
      src={image}
      alt={url}
      objectFit="cover"
      onError={() => {
        setHasError(true);
      }}
    />
  );
};

export default LinkCardImage;
