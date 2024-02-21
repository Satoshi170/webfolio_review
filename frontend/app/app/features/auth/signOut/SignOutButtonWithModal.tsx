"use client";

import { MenuItem, useDisclosure } from "@chakra-ui/react";

import DeleteConfirmationModal from "@/app/components/organisms/modals/DeleteConfirmationModal";

import { useSignOut } from "./useSignOut";

const SignOutButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = useSignOut();
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

export default SignOutButtonWithModal;
