import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { postAuthGuestSignIn } from "@/app/libs/axios/auth/postAuthGuestSignIn";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useCheckLogin } from "../userSession/useCheckLogin";

export const useGuestLogin = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const GuestLoginOperation = useCallback(async () => {
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

  return GuestLoginOperation;
};
