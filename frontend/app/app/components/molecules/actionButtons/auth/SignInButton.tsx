"use client";

import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

const SignInButton: React.FC = () => {
  return (
    <Button
      as={NextLink}
      href="/auth/sign_in"
      colorScheme="messenger"
      sx={{ "&:hover": { textDecoration: "none" } }}
    >
      サインイン
    </Button>
  );
};

export default SignInButton;
