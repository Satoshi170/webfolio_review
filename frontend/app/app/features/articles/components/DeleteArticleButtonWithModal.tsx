"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import DeleteConfirmationModal from "@/app/components/organisms/modals/DeleteConfirmationModal";

import { useDeleteArticle } from "../hooks/useDeleteArticle";

interface Props {
  articleId: number;
}

const DeleteArticleButtonWithModal: React.FC<Props> = ({ articleId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteArticleOperation = useDeleteArticle();
  const handleConfirm = async () => {
    await deleteArticleOperation(articleId);
    onClose();
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
        headerTitle="投稿削除確認"
        bodyContent="本当に削除しますか？"
      />
    </>
  );
};

export default DeleteArticleButtonWithModal;
