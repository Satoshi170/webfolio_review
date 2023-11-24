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
import CommentButton from "@/app/components/molecules/actionButtons/CommentButton";
import TextareaField from "@/app/components/molecules/fields/TextareaField";
import PostCardBody from "@/app/components/molecules/posts/PostCardBody";
import PostCardHeader from "@/app/components/molecules/posts/PostCardHeader";
import { usePostCommentForm } from "@/app/hooks/forms/portfolio/comment/usePostCommentForm";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}

const CreateCommentButtonWithModal: React.FC<Props> = ({ portfolioData }) => {
  const {
    register,
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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>コメントする</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <PostCardHeader portfolioData={portfolioData} />
              <PostCardBody portfolioData={portfolioData} />
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
