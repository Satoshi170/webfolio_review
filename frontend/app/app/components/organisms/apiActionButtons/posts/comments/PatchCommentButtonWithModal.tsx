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

import { useCommentData } from "@/app/hooks/datas/useCommentData";
import { usePortfolioData } from "@/app/hooks/datas/usePortfolioData";
import { usePatchCommentForm } from "@/app/hooks/forms/portfolio/comment/usePatchCommentForm";
import SubmitButton from "@/app/components/atoms/SubmitButton";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import { commentTagOptions } from "@/app/components/molecules/fields/SelectBoxField/options/commentTagOptions";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

const PatchCommentButtonWithModal: React.FC = () => {
  const portfolioData = usePortfolioData();
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
  } = usePatchCommentForm(portfolioData.id, commentData);

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
