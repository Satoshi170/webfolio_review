import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useSetLoginState } from "@/app/hooks/recoil/loginState/useSetLoginState";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { deleteAuthSignOut } from "@/app/libs/axios/auth/deleteAuthSignOut";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

export const useSignOut = () => {
  const router = useRouter();
  const { setLoginState } = useSetLoginState();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const signOutOperation = useCallback(async () => {
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

  return signOutOperation;
};
