import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { patchAuth } from "@/app/libs/axios/auth/patchAuth";
import { PatchAuthParams } from "@/app/types/axios/auth/patchAuth";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";
import { useCheckLogin } from "../../useCheckLogin";

export const usePatchAuthOperation = () => {
  const router = useRouter();
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const checkLoginStatus = useCheckLogin();

  const patchAuthOperation = useCallback(
    async (params: PatchAuthParams) => {
      try {
        await patchAuth(params);
        await checkLoginStatus();
        router.refresh();
        setSuccessToast("アカウント情報の更新に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      }
    },
    [checkLoginStatus, router, setErrorToast, setSuccessToast]
  );

  return patchAuthOperation;
};
