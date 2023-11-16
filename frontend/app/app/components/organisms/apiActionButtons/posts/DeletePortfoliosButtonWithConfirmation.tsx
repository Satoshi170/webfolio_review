"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import { useDeletePortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useDeletePortfoliosByIdOperation";

import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";

interface Props {
  id: number;
}

const DeletePortfoliosButtonWithConfirmation: React.FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deletePortfoliosByIdOperation = useDeletePortfoliosByIdOperation();
  const handleConfirm = async () => {
    await deletePortfoliosByIdOperation(id);
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

export default DeletePortfoliosButtonWithConfirmation;
