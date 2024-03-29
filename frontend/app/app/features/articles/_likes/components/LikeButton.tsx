"use client";

import { Button } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import WithSignInAlert from "@/app/features/auth/accessControl/button/WithSignInAlert";

interface Props {
  isLiked: boolean;
  totalLiked: number;
  onClick: () => void;
}

const LikeButton: React.FC<Props> = ({ isLiked, totalLiked, onClick }) => {
  return (
    <Button
      leftIcon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      aria-label="Send Like"
      onClick={onClick}
      variant="ghost"
      color={isLiked ? "red" : "gray.500"}
      p="1"
    >
      {totalLiked}
    </Button>
  );
};

export default WithSignInAlert(LikeButton);
