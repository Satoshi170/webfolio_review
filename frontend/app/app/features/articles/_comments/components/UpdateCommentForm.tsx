"use client";

import { Button } from "@chakra-ui/react";

import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { useEditMode } from "@/app/hooks/useEditMode";
import { SubmitButton } from "@/app/components/atoms";
import { SelectBoxField, TextareaField } from "@/app/components/molecules";

import { commentTagOptions } from "./commentTagOptions";
import { useCommentData } from "../hooks/useCommentData";
import { useUpdateCommentForm } from "../hooks/useUpdateCommentForm";

const UpdateCommentForm: React.FC = () => {
  const articleData = useArticleData();
  const commentData = useCommentData();
  const { setIsEditMode } = useEditMode();
  const {
    register,
    reset,
    control,
    errors,
    isFormValid,
    handleSubmit,
    onSubmit,
    isLoading
  } = useUpdateCommentForm(articleData.id, commentData);

  const cancel = () => {
    reset();
    setIsEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <SubmitButton isDisabled={!isFormValid} isLoading={isLoading} text="修正する" />
      <Button onClick={cancel} variant="ghost">
        キャンセル
      </Button>
    </form>
  );
};

export default UpdateCommentForm;
