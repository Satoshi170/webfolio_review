"use client";

import { Button } from "@chakra-ui/react";

type SubmitButtonProps = {
  text: string;
  isLoading: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, text }) => {
  return (
    <Button
      mt="4"
      mx="auto"
      display="block"
      width="full"
      colorScheme="messenger"
      type="submit"
      isLoading={isLoading}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
