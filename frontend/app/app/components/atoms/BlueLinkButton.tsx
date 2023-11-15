"use client";

import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
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
