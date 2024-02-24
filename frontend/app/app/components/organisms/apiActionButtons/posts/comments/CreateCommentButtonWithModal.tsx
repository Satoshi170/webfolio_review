"use client";

import {
  Card,
  CardFooter,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";

import ArticleCardBody from "@/app/features/articles/components/layouts/ArticleCard/body";
import ArticleCardHeader from "@/app/features/articles/components/layouts/ArticleCard/header";
import { usePostCommentForm } from "@/app/hooks/forms/portfolio/comment/usePostCommentForm";
import SubmitButton from "@/app/components/atoms/SubmitButton";
import CommentButton from "@/app/components/molecules/actionButtons/CommentButton";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import { commentTagOptions } from "@/app/components/molecules/fields/SelectBoxField/options/commentTagOptions";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}

const CreateCommentButtonWithModal: React.FC<Props> = ({ portfolioData }) => {
  const {
    register,
    control,
    isLoading,
    isValid,
    errors,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  } = usePostCommentForm(portfolioData.id);

  return (
    <>
      <CommentButton totalCommented={portfolioData.comments.length} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">コメントする</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <ArticleCardHeader articleData={portfolioData} />
              <ArticleCardBody articleData={portfolioData} />
              <CardFooter>
                <Stack w="full">
                  <Divider />
                  <form onSubmit={handleFormSubmit}>
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
                    <SubmitButton
                      text="コメントする"
                      isLoading={isLoading}
                      isDisabled={!isValid}
                    />
                  </form>
                </Stack>
              </CardFooter>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommentButtonWithModal;
