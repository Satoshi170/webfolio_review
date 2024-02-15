import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { deleteAuth } from "@/app/libs/axios/auth/deleteAuth";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";
import { useCheckLogin } from "../../useCheckLogin";

export const useDeleteAuthOperation = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteAuthOperation = useCallback(async () => {
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

  return deleteAuthOperation;
};
