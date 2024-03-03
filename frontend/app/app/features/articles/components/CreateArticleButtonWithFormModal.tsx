"use client";

import {
  Box,
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

import {
  InputField,
  SelectBoxField,
  TextareaField
} from "@/app/components/molecules/fields";

import { operationStatusOptions } from "../constants/operationStatusOptions";
import { useCreateArticleForm } from "../hooks/useCreateArticleForm";

const CreateArticleButtonWithFormModal: React.FC = () => {
  const {
    onClose,
    onOpen,
    isOpen,
    control,
    register,
    errors,
    isValid,
    handleFormSubmit,
    isLoading
  } = useCreateArticleForm();

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
            <Spacer my="3" />
            <InputField
              name="portfolioSiteUrl"
              label="ポートフォリオサイトURL"
              register={register}
              error={errors.portfolioSiteUrl}
              isRequired={true}
            />
            <Box w="50%" my="3">
              <SelectBoxField
                name="operationStatus"
                label="運用状況"
                options={operationStatusOptions}
                control={control}
                error={errors.operationStatus}
              />
            </Box>
            <Spacer my="3" />
            <InputField
              name="repositoryUrl"
              label="リポジトリURL"
              register={register}
              error={errors.repositoryUrl}
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

export default CreateArticleButtonWithFormModal;
