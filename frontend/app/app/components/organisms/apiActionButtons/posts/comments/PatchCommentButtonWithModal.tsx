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

import SubmitButton from "@/app/components/atoms/SubmitButton";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import TextareaField from "@/app/components/molecules/fields/TextareaField";
import { useCommentData } from "@/app/hooks/datas/useCommentData";
import { usePortfolioData } from "@/app/hooks/datas/usePortfolioData";
import { usePatchCommentForm } from "@/app/hooks/forms/portfolio/comment/usePatchCommentForm";

const PatchCommentButtonWithModal: React.FC = () => {
  const portfolioData = usePortfolioData();
  const commentData = useCommentData();

  const {
    register,
    control,
    defaultTagIdsValue,
    tagOptions,
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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleFormSubmit}
          textAlign="center"
          w="full"
          m="auto"
        >
          <ModalHeader>コメントを修正する</ModalHeader>
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
              control={control}
              options={tagOptions}
              defaultValue={defaultTagIdsValue}
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
