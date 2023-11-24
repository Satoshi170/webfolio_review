import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { deletePortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/deletePortfoliosByIdCommentsById";
import { toastState } from "@/app/stores/atoms/toastState";

export const useDeleteComment = () => {
  const setToast = useSetRecoilState(toastState);

  const deleteComment = useCallback(
    async (portfolioId: number, commentId: number) => {
      try {
        await deletePortfoliosByIdComments(portfolioId, commentId);
        window.location.reload();
        setToast({
          message: "コメントの削除に成功しました",
          status: "success",
          timestamp: Date.now()
        });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
        setToast({
          message: errorMessage,
          status: "error",
          timestamp: Date.now()
        });
      }
    },
    [setToast]
  );

  return deleteComment;
};
