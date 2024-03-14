import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { deleteArticle } from "../api/deleteArticle";

export const useDeleteArticle = () => {
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const { userData } = useGetLoginState();
  const router = useRouter();

  const deleteArticleOperation = useCallback(
    async (id: number) => {
      try {
        await deleteArticle(id);
        const redirectEndpoint = userData ? `/users/${userData.id}/articles` : "/";
        router.push(redirectEndpoint);
        setSuccessToast("投稿の削除に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [setSuccessToast, setErrorToast, router, userData]
  );

  return deleteArticleOperation;
};
