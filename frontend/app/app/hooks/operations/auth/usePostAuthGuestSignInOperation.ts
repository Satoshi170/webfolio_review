import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { postAuthGuestSignIn } from "@/app/libs/axios/auth/postAuthGuestSignIn";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";
import { useCheckLogin } from "../../useCheckLogin";

export const usePostAuthGuestSignInOperation = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const postAuthGuestSignInOperation = useCallback(async () => {
    try {
      await postAuthGuestSignIn();
      await checkLoginStatus();
      router.replace("/");
      setSuccessToast("ゲストログインに成功しました");
    } catch (e) {
      const errorMessage = resolveErrorMessage(e);
      setErrorToast(errorMessage);
    }
  }, [router, setErrorToast, setSuccessToast, checkLoginStatus]);

  return postAuthGuestSignInOperation;
};
