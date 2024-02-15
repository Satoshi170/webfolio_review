import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { deleteAuthSignOut } from "@/app/libs/axios/auth/deleteAuthSignOut";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetLoginState } from "../../recoil/loginState/useSetLoginState";
import { useSetToastState } from "../../recoil/toastState/useSetToastState";

export const useDeleteAuthSignOutOperation = () => {
  const router = useRouter();
  const { setLoginState } = useSetLoginState();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const deleteAuthSignOutOperation = useCallback(async () => {
    try {
      await deleteAuthSignOut();
      setLoginState({ isLogin: false, userData: null });
      router.replace("/auth/sign_in");
      setSuccessToast("ログアウトに成功しました");
    } catch (e) {
      const errorMessage = resolveErrorMessage(e);
      setErrorToast(errorMessage);
    }
  }, [router, setErrorToast, setSuccessToast, setLoginState]);

  return deleteAuthSignOutOperation;
};
