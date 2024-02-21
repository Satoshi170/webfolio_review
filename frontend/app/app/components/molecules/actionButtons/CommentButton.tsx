"use client";

import { Button } from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";

import WithSignInAlert from "@/app/features/auth/accessControl/button/WithSignInAlert";

interface Props {
  onClick: () => void;
  totalCommented: number;
}

const CommentButton: React.FC<Props> = ({ onClick, totalCommented }) => {
  return (
    <Button
      leftIcon={<BiComment />}
      aria-label="Send Comment"
      onClick={onClick}
      variant="ghost"
      color="gray.500"
      p="1"
    >
      {totalCommented}
    </Button>
  );
};

export default WithSignInAlert(CommentButton);
