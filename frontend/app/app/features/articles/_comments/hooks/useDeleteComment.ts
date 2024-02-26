import { useCallback } from "react";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { deleteArticleComment } from "../api/deleteArticleComment";

export const useDeleteComment = () => {
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteComment = useCallback(
    async (articleId: number, commentId: number) => {
      try {
        await deleteArticleComment(articleId, commentId);
        window.location.reload();
        setSuccessToast("コメントの削除に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [setSuccessToast, setErrorToast]
  );

  return deleteComment;
};
