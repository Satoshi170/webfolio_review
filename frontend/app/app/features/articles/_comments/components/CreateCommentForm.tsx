"use client";

import { Box, Card, CardBody, CardFooter } from "@chakra-ui/react";

import { SubmitButton } from "@/app/components/atoms";
import { SelectBoxField, TextareaField } from "@/app/components/molecules";

import { commentTagOptions } from "./commentTagOptions";
import { useArticleData } from "../../hooks/useArticleData";
import { useCreateCommentForm } from "../hooks/useCreateCommentForm";

const CreateCommentForm: React.FC = () => {
  const { id } = useArticleData();
  const { register, control, isLoading, isValid, errors, handleSubmit, onSubmit } =
    useCreateCommentForm(id);

  return (
    <Card rounded="none" p="3">
      <form onSubmit={handleSubmit(onSubmit)}>
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
