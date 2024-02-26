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

import SubmitButton from "@/app/components/atoms/SubmitButton";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

import { commentTagOptions } from "./commentTagOptions";
import CommentButton from "./layouts/CommentButton";
import ArticleCardBody from "../../components/layouts/ArticleCard/body";
import ArticleCardHeader from "../../components/layouts/ArticleCard/header";
import { useCreateCommentForm } from "../hooks/useCreateCommentForm";

import type { ArticleData } from "@/app/features/articles/types/articleData";

interface Props {
  articleData: ArticleData;
}

const CreateCommentButtonWithFormModal: React.FC<Props> = ({ articleData }) => {
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
  } = useCreateCommentForm(articleData.id);

  return (
    <>
      <CommentButton totalCommented={articleData.comments.length} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">コメントする</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <ArticleCardHeader articleData={articleData} />
              <ArticleCardBody articleData={articleData} />
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

export default CreateCommentButtonWithFormModal;
