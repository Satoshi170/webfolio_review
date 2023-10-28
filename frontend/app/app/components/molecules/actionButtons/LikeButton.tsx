"use client";

import { IconButton } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import WithSignInAlert from "../../HOCs/buttons/WithSignInAlert";

interface Props {
  isLiked: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<Props> = ({ isLiked, onClick }) => {
  return (
    <IconButton
      aria-label="Send Like"
      onClick={onClick}
      variant="ghost"
      icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      color={isLiked ? "red" : "gray.500"}
    />
  );
};

export default WithSignInAlert(LikeButton);
