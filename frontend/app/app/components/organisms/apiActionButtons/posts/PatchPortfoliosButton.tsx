"use client";

import {
  Button,
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

import InputField from "@/app/components/molecules/fields/InputField";
import TextareaField from "@/app/components/molecules/fields/TextareaField";
import { usePatchPortfoliosByIdForm } from "@/app/hooks/forms/portfolio/usePatchPortfoliosByIdForm";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}

const PatchPostsByIdButton: React.FC<Props> = ({ portfolioData }) => {
  const {
    register,
    errors,
    isFormValid,
    handleFormSubmit,
    isLoading,
    isOpen,
    onOpen,
    onClose
  } = usePatchPortfoliosByIdForm(portfolioData);

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
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="messenger"
              mr="3"
              isDisabled={!isFormValid}
              isLoading={isLoading}
              type="submit"
            >
              修正する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PatchPostsByIdButton;
