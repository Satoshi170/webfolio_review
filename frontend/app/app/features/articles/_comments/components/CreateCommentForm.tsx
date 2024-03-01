"use client";

import { Box, Card, CardBody, CardFooter } from "@chakra-ui/react";

import SubmitButton from "@/app/components/atoms/buttons/SubmitButton";
import SelectBoxField from "@/app/components/molecules/fields/SelectBoxField";
import TextareaField from "@/app/components/molecules/fields/TextareaField";

import { commentTagOptions } from "./commentTagOptions";
import { useCreateCommentForm } from "../hooks/useCreateCommentForm";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articleData: ArticleData;
}

const CreateCommentForm: React.FC<Props> = ({ articleData }) => {
  const { register, control, isLoading, isValid, errors, handleFormSubmit } =
    useCreateCommentForm(articleData.id);

  return (
    <Card rounded="none" p="3">
      <form onSubmit={handleFormSubmit}>
        <CardBody>
          <TextareaField
            name="content"
            placeholder="コメントする"
            register={register}
            error={errors.content}
          />
          <Box my="3" w="50%">
            <SelectBoxField
              name="tagIds"
              options={commentTagOptions}
              placeholder="タグを選択(任意)"
              control={control}
              error={errors.tagIds}
              isMulti
            />
          </Box>
        </CardBody>
        <CardFooter>
          <SubmitButton text="投稿する" isLoading={isLoading} isDisabled={!isValid} />
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateCommentForm;
