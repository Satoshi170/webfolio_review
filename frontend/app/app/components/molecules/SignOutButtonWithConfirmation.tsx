"use client";

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import { useSignOut } from "@/app/hooks/auth/useSignOut";

const SignOutButtonWithConfirmation: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = useSignOut();
  const handleConfirm = async () => {
    await signOut();
    onClose();
  };

  return (
    <>
      <Link
        onClick={onOpen}
        w="full"
        h="full"
        sx={{ "&:hover": { textDecoration: "none" } }}
      >
        ログアウト
      </Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
