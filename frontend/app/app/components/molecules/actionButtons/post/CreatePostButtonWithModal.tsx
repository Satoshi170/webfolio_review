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
  Spacer
} from "@chakra-ui/react";

import { usePostPortfoliosForm } from "@/app/hooks/forms/portfolio/usePostPortfoliosForm";

import InputField from "../../fields/InputField";
import TextareaField from "../../fields/TextareaField";

const CreatePostButtonWithModal: React.FC = () => {
  const {
    onClose,
    onOpen,
    isOpen,
    register,
    errors,
    isValid,
    handleFormSubmit,
    isLoading
  } = usePostPortfoliosForm();

  return (
    <>
      <Button onClick={onOpen} colorScheme="messenger">
        投稿を作成
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleFormSubmit}
          textAlign="center"
          w="full"
          m="auto"
        >
          <ModalHeader>投稿を作成する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputField
              name="title"
              label="タイトル"
              register={register}
              error={errors.title}
              isRequired={true}
            />
            <Spacer my="3" />
            <TextareaField
              name="content"
              label="本文"
              register={register}
              error={errors.content}
              isRequired={true}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="messenger"
              mr="3"
              isDisabled={!isValid}
              isLoading={isLoading}
              type="submit"
            >
              投稿する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostButtonWithModal;
