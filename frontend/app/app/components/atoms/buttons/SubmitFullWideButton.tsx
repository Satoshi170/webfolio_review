"use client";

import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitFullWideButton: React.FC<Props> = ({
  text,
  isLoading,
  isDisabled
}) => {
  return (
    <Button
      mt="4"
      mx="auto"
      width="full"
      colorScheme="messenger"
      type="submit"
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {text}
    </Button>
  );
};
