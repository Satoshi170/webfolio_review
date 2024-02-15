"use client";

import NextLink from "next/link";

import { Button } from "@chakra-ui/react";

interface Props {
  href: string;
  text: string;
}

const MessengerLinkButton: React.FC<Props> = ({ href, text }) => {
  return (
    <Button
      as={NextLink}
      href={href}
      colorScheme="messenger"
      sx={{ "&:hover": { textDecoration: "none" } }}
    >
      {text}
    </Button>
  );
};

export default MessengerLinkButton;
