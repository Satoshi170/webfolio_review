"use client";

import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const SeeMoreButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick} w="full" textAlign="center" variant="link" my="3">
      もっと見る
    </Button>
  );
};
