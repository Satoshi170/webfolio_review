"use client";

import {
  Box,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer
} from "@chakra-ui/react";

import { SubmitButton } from "@/app/components/atoms/buttons";
import InputField from "@/app/components/molecules/fields/InputField";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import { operationStatusOptions } from "@/app/components/molecules/fields/SelectBoxField/options/operationStatusOptions";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

import { useUpdateArticleForm } from "../hooks/useUpdateArticleForm";

import type { ArticleData } from "../types/articleData";

interface Props {
  articleData: ArticleData;
}

const UpdateArticleButtonWithFormModal: React.FC<Props> = ({ articleData }) => {
  const {
    control,
    register,
    errors,
    isFormValid,
    handleFormSubmit,
    isLoading,
    isOpen,
    onOpen,
    onClose
  } = useUpdateArticleForm(articleData);

  return (
    <>
      <MenuItem onClick={onOpen}>修正する</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleFormSubmit}
          textAlign="center"
          w="full"
          m="auto"
        >
          <ModalHeader>投稿を修正する</ModalHeader>
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
                placeholder="pick"
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
            <SubmitButton
              isDisabled={!isFormValid}
              isLoading={isLoading}
              text="修正する"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateArticleButtonWithFormModal;
