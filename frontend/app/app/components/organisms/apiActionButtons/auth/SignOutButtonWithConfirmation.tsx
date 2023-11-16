"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import { useDeleteAuthSignOutOperation } from "@/app/hooks/operations/auth/useDeleteAuthSignOutOperation";

import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";

const SignOutButtonWithConfirmation: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = useDeleteAuthSignOutOperation();
  const handleConfirm = async () => {
    await signOut();
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>ログアウト</MenuItem>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleConfirm={handleConfirm}
        headerTitle="ログアウト確認"
        bodyContent="本当にログアウトしますか？"
      />
    </>
  );
};

export default SignOutButtonWithConfirmation;
