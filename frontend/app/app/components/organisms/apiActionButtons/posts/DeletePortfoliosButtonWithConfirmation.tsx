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

import { useDeletePortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useDeletePortfoliosByIdOperation";

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign="center" w="full" m="auto">
          <ModalHeader>投稿削除確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>本当に削除しますか？</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr="3" onClick={handleConfirm}>
              削除
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

export default DeletePortfoliosButtonWithConfirmation;
