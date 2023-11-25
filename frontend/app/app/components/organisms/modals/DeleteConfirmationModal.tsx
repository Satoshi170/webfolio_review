"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleConfirm: () => void;
  headerTitle: string;
  bodyContent: string;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  handleConfirm,
  headerTitle,
  bodyContent
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign="center" w="full" m="auto">
        <ModalHeader>{headerTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyContent}</ModalBody>
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
  );
};

export default DeleteConfirmationModal;
