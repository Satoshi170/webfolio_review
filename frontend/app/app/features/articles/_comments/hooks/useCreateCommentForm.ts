import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";

import { CommentSchema } from "./commentSchema";
import { useGetComments } from "./useGetComments";
import { postArticleComment } from "../api/postArticleComment";

import type { CommentParams } from "../types/api";

export const useCreateCommentForm = (id: number) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<CommentParams>({
    resolver: zodResolver(CommentSchema),
    mode: "onChange",
    defaultValues: { tagIds: [] }
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const { mutate } = useGetComments(id);

  const onSubmit = async (params: CommentParams) => {
    setIsLoading(true);
    try {
      const newComment = await postArticleComment(id, params);
      reset();
      setSuccessToast("コメントの作成に成功しました");
      await mutate((currentComments) => [newComment, ...(currentComments ?? [])], false);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
      setErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    control,
    errors,
    isLoading,
    isValid,
    handleSubmit,
    onSubmit
  };
};
