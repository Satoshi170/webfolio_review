"use client";

import { Box, Button, Spacer } from "@chakra-ui/react";

import { useEditMode } from "@/app/hooks/useEditMode";
import { SubmitButton } from "@/app/components/atoms";
import { InputField, SelectBoxField, TextareaField } from "@/app/components/molecules";

import { operationStatusOptions } from "../constants/operationStatusOptions";
import { useArticleData } from "../hooks/useArticleData";
import { useUpdateArticleForm } from "../hooks/useUpdateArticleForm";

const UpdateArticleForm: React.FC = () => {
  const articleData = useArticleData();
  const { setIsEditMode } = useEditMode();
  const {
    control,
    register,
    errors,
    isFormValid,
    handleSubmit,
    onSubmit,
    reset,
    isLoading
  } = useUpdateArticleForm(articleData);

  const cancel = () => {
    reset();
    setIsEditMode(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Spacer my="3" />
      <SubmitButton isDisabled={!isFormValid} isLoading={isLoading} text="修正する" />
      <Button onClick={cancel} variant="ghost">
        キャンセル
      </Button>
    </form>
  );
};

export default UpdateArticleForm;
