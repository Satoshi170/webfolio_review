"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import { useDeleteAuthSubmit } from "@/app/hooks/submits/auth/useDeleteAuthSubmit";

const AccountDeleteButtonWithConfirmation: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteAccount = useDeleteAuthSubmit();
  const handleConfirm = async () => {
    await deleteAccount();
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        アカウント削除
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign="center" w="full" m="auto">
          <ModalHeader>アカウント削除確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>本当にアカウントを削除しますか？</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr="3" onClick={handleConfirm}>
              はい
            </Button>
            <Button variant="ghost" onClick={onClose}>
              いいえ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountDeleteButtonWithConfirmation;
