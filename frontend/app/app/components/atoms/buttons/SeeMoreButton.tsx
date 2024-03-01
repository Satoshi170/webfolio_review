"use client";

import { Button } from "@chakra-ui/react";

import WithSignInAlert from "@/app/features/auth/accessControl/button/WithSignInAlert";

interface Props {
  onClick: () => void;
}

const SeeMoreButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick} w="full" textAlign="center" variant="link" my="3">
      もっと見る
    </Button>
  );
};

export default WithSignInAlert(SeeMoreButton);
