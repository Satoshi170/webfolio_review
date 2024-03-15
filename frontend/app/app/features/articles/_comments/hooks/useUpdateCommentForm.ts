import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { equals, identity, reject, sortBy } from "ramda";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { useEditMode } from "@/app/hooks/useEditMode";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { CommentSchema } from "./commentSchema";
import { useGetComments } from "./useGetComments";
import { patchArticleComment } from "../api/patchArticleComment";
import { candidateTagData } from "../datas/tags";

import type { CommentData } from "../types";
import type { CommentFormParams, CommentParams } from "../types/api";

export const useUpdateCommentForm = (articleId: number, commentData: CommentData) => {
  const defaultTagIds = commentData.tags.map((item) => candidateTagData[item].toString());
  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<CommentFormParams>({
    resolver: zodResolver(CommentSchema),
    mode: "onChange",
    defaultValues: { content: commentData.content, tagIds: defaultTagIds }
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const { mutate } = useGetComments(articleId);
  const { setIsEditMode } = useEditMode();

  const isChange = () => {
    const isContentChanged = !(watch("content") == commentData.content);
    const isTagIdsChanged = (() => {
      const watchedTagIds = watch("tagIds") || [];
      const sortedWatchTagIds = sortBy(identity, watchedTagIds);

      return !equals(sortedWatchTagIds, defaultTagIds);
    })();

    return isContentChanged || isTagIdsChanged;
  };

  const isFormValid = isChange() && isValid;

  const onSubmit = useCallback(
    async (params: CommentFormParams) => {
      setIsLoading(true);
      const transformedParamsByZod = params as unknown as CommentParams;
      try {
        const newComment = await patchArticleComment(
          articleId,
          commentData.id,
          transformedParamsByZod
        );
        setSuccessToast("コメントの更新に成功しました");
        await mutate((currentComments) => {
          if (!currentComments) return currentComments;

          const other = reject(
            (comment: CommentData) => comment.id === commentData.id,
            currentComments
          );
          return [newComment, ...other];
        }, false);
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      } finally {
        setIsLoading(false);
        setIsEditMode(false);
      }
    },
    [commentData.id, articleId, mutate, setErrorToast, setSuccessToast, setIsEditMode]
  );

  return {
    register,
    reset,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
    isFormValid
  };
};
