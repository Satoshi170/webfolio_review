"use client";

import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { SubmitButton } from "@/app/components/atoms";
import { SelectBoxField, TextareaField } from "@/app/components/molecules/fields";

import { commentTagOptions } from "./commentTagOptions";
import { useCommentData } from "../hooks/useCommentData";
import { useUpdateCommentForm } from "../hooks/useUpdateCommentForm";

const PatchCommentButtonWithModal: React.FC = () => {
  const articleData = useArticleData();
  const commentData = useCommentData();

  const {
    register,
    control,
    errors,
    isFormValid,
    handleFormSubmit,
    isLoading,
    isOpen,
    onOpen,
    onClose
  } = useUpdateCommentForm(articleData.id, commentData);

  return (
    <>
      <MenuItem onClick={onOpen}>修正する</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleFormSubmit}>
          <ModalHeader textAlign="center">コメントを修正する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextareaField
              name="content"
              label="コメント"
              register={register}
              error={errors.content}
              isRequired={true}
            />
            <SelectBoxField
              name="tagIds"
              label="タグ"
              options={commentTagOptions}
              placeholder="タグを選択(任意)"
              control={control}
              error={errors.tagIds}
              isMulti
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

export default PatchCommentButtonWithModal;
