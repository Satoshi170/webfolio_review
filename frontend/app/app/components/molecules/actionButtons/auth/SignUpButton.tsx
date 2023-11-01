"use client";

import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

const SignUpButton: React.FC = () => {
  return (
    <Button
      as={NextLink}
      href="/auth/sign_up"
      colorScheme="messenger"
      sx={{ "&:hover": { textDecoration: "none" } }}
    >
      新規登録
    </Button>
  );
};

export default SignUpButton;
