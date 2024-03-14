import { useCallback } from "react";

import { reject } from "ramda";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useGetComments } from "./useGetComments";
import { deleteArticleComment } from "../api/deleteArticleComment";

import type { CommentData } from "../types";

export const useDeleteComment = (articleId: number) => {
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const { mutate } = useGetComments(articleId);
  const deleteComment = useCallback(
    async (commentId: number) => {
      try {
        await deleteArticleComment(articleId, commentId);
        await mutate((currentComments) => {
          if (!currentComments) return currentComments;

          return reject(
            (comment: CommentData) => comment.id === commentId,
            currentComments
          );
        }, false);
        setSuccessToast("コメントの削除に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [setSuccessToast, setErrorToast, mutate]
  );

  return deleteComment;
};
