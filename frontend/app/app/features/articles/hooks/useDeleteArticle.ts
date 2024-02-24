import { useCallback } from "react";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { deleteArticle } from "../api/deleteArticle";

export const useDeleteArticle = () => {
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteArticleOperation = useCallback(
    async (id: number) => {
      try {
        await deleteArticle(id);
        window.location.reload();
        setSuccessToast("投稿の削除に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [setSuccessToast, setErrorToast]
  );

  return deleteArticleOperation;
};
