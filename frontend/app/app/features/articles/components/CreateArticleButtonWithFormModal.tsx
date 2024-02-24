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

import InputField from "@/app/components/molecules/fields/InputField";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import { operationStatusOptions } from "@/app/components/molecules/fields/SelectBoxField/options/operationStatusOptions";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

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
            <InputField
              name="portfolioSiteUrl"
              label="ポートフォリオサイトURL"
              register={register}
              error={errors.portfolioSiteUrl}
              isRequired={true}
            />
            <SelectBoxField
              name="operationStatus"
              label="運用状況"
              options={operationStatusOptions}
              placeholder="pick"
              control={control}
              error={errors.operationStatus}
            />
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
