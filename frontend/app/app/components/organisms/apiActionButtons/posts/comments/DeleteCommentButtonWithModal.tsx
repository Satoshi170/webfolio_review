"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import { useCommentData } from "@/app/hooks/datas/useCommentData";
import { usePortfolioData } from "@/app/hooks/datas/usePortfolioData";
import { useDeleteComment } from "@/app/hooks/operations/portfolio/comment/useDeleteComment";

import DeleteConfirmationModal from "../../../modals/DeleteConfirmationModal";

const DeleteCommentButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const portfolioData = usePortfolioData();
  const commentData = useCommentData();
  const deleteComment = useDeleteComment();
  const handleConfirm = async () => {
    await deleteComment(portfolioData.id, commentData.id);
    onClose;
  };

  return (
    <>
      <MenuItem onClick={onOpen} color="red">
        削除
      </MenuItem>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleConfirm={handleConfirm}
        headerTitle="コメント削除確認"
        bodyContent="本当に削除しますか？"
      />
    </>
  );
};

export default DeleteCommentButtonWithModal;
