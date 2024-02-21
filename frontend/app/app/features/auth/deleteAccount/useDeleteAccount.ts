import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { deleteAuth } from "@/app/libs/axios/auth/deleteAuth";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useCheckLogin } from "../userSession/useCheckLogin";

export const useDeleteAccount = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteAccountOperation = useCallback(async () => {
    try {
      await deleteAuth();
      await checkLoginStatus();
      router.replace("/");
      setSuccessToast("アカウントの削除に成功しました");
    } catch (e) {
      const errorMessage = resolveErrorMessage(e);
      setErrorToast(errorMessage);
    }
  }, [checkLoginStatus, router, setErrorToast, setSuccessToast]);

  return deleteAccountOperation;
};
