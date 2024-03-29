"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import DeleteConfirmationModal from "@/app/components/organisms/modals/DeleteConfirmationModal";

import { useArticleData } from "../hooks/useArticleData";
import { useDeleteArticle } from "../hooks/useDeleteArticle";

const DeleteArticleButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteArticleOperation = useDeleteArticle();
  const { id } = useArticleData();
  const handleConfirm = async () => {
    await deleteArticleOperation(id);
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
