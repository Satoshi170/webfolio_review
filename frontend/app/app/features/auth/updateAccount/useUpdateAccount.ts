import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { patchAuth } from "@/app/libs/axios/auth/patchAuth";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import type { PatchAuthParams } from "@/app/types/axios/auth/patchAuth";

export const useUpdateAccount = () => {
  const router = useRouter();
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const checkLoginStatus = useCheckLogin();

  const updateAccount = useCallback(
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

  return { updateAccount };
};
