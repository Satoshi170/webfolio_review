"use client";

import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitButton: React.FC<Props> = ({ text, isLoading, isDisabled }) => {
  return (
    <Button
      colorScheme="messenger"
      isDisabled={isDisabled}
      isLoading={isLoading}
      type="submit"
    >
      {text}
    </Button>
  );
};
