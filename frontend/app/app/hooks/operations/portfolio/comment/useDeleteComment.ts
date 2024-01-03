import { useCallback } from "react";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { deletePortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/deletePortfoliosByIdCommentsById";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

export const useDeleteComment = () => {
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteComment = useCallback(
    async (portfolioId: number, commentId: number) => {
      try {
        await deletePortfoliosByIdComments(portfolioId, commentId);
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
