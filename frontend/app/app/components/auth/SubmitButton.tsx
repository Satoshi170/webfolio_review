"use client";

import { Button } from "@chakra-ui/react";

type SubmitButtonProps = {
  text: string;
  isLoading: boolean;
  isDisabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, isLoading, isDisabled }) => {
  return (
    <Button
      mt="4"
      mx="auto"
      display="block"
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

export default SubmitButton;
