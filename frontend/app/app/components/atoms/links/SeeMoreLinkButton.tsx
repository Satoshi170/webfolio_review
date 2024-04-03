"use client";
import NextLink from "next/link";

import { Button } from "@chakra-ui/react";

interface Props {
  href: string;
}

export const SeeMoreLinkButton: React.FC<Props> = ({ href }) => {
  return (
    <Button as={NextLink} href={href} w="full" textAlign="center" variant="link" my="3">
      もっと見る
    </Button>
  );
};
