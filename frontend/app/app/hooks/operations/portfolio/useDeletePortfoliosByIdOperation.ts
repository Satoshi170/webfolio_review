import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { deletePortfoliosById } from "@/app/libs/axios/portfolio/deletePortfoliosById";
import { toastState } from "@/app/stores/atoms/toastState";

export const useDeletePortfoliosByIdOperation = () => {
  const router = useRouter();
  const setToast = useSetRecoilState(toastState);

  const deletePortfoliosByIdOperation = useCallback(
    async (id: number) => {
      try {
        await deletePortfoliosById(id);
        router.refresh();
        setToast({
          message: "投稿の削除に成功しました",
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
    [router, setToast]
  );

  return deletePortfoliosByIdOperation;
};
