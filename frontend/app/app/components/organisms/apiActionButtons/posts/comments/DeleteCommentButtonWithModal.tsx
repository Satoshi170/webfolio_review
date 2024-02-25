"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { useCommentData } from "@/app/hooks/datas/useCommentData";
import { useDeleteComment } from "@/app/hooks/operations/portfolio/comment/useDeleteComment";

import DeleteConfirmationModal from "../../../modals/DeleteConfirmationModal";

const DeleteCommentButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const articleData = useArticleData();
  const commentData = useCommentData();
  const deleteComment = useDeleteComment();
  const handleConfirm = async () => {
    await deleteComment(articleData.id, commentData.id);
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
