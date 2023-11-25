"use client";

import { Button, useDisclosure } from "@chakra-ui/react";

import { useDeleteAuthOperation } from "@/app/hooks/operations/auth/useDeleteAuthOperation";

import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";

const AccountDeleteButtonWithConfirmation: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAuthOperation = useDeleteAuthOperation();
  const handleConfirm = async () => {
    await deleteAuthOperation();
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        アカウント削除
      </Button>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleConfirm={handleConfirm}
        headerTitle="アカウント削除確認"
        bodyContent="本当にアカウントを削除しますか？"
      />
    </>
  );
};

export default AccountDeleteButtonWithConfirmation;
