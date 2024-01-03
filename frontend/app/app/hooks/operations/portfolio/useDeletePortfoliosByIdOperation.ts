import { useCallback } from "react";

import { deletePortfoliosById } from "@/app/libs/axios/portfolio/deletePortfoliosById";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";

export const useDeletePortfoliosByIdOperation = () => {
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deletePortfoliosByIdOperation = useCallback(
    async (id: number) => {
      try {
        await deletePortfoliosById(id);
        window.location.reload();
        setSuccessToast("投稿の削除に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [setSuccessToast, setErrorToast]
  );

  return deletePortfoliosByIdOperation;
};
