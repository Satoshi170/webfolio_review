"use client";

import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import { useDeleteAuthSignOutOperation } from "@/app/hooks/operations/auth/useDeleteAuthSignOutOperation";

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign="center" w="full" m="auto">
          <ModalHeader>ログアウト確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>本当にログアウトしますか？</ModalBody>
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

export default SignOutButtonWithConfirmation;
