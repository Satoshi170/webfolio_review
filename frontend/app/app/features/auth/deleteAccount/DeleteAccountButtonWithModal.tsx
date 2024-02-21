"use client";

import { Button, useDisclosure } from "@chakra-ui/react";

import DeleteConfirmationModal from "@/app/components/organisms/modals/DeleteConfirmationModal";

import { useDeleteAccount } from "./useDeleteAccount";

const DeleteAccountButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAccountOperation = useDeleteAccount();
  const handleConfirm = async () => {
    await deleteAccountOperation();
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

export default DeleteAccountButtonWithModal;
