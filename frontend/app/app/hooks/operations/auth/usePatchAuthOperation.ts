import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { patchAuth } from "@/app/libs/axios/auth/patchAuth";
import { toastState } from "@/app/stores/atoms/toastState";
import { PatchAuthParams } from "@/app/types/axios/auth/patchAuth";

import { useCheckLogin } from "../../useCheckLogin";

export const usePatchAuthOperation = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const setToast = useSetRecoilState(toastState);

  const patchAuthOperation = async (params: PatchAuthParams) => {
    try {
      await patchAuth(params);
      await checkLoginStatus();
      router.refresh();
      setToast({
        message: "アカウント情報の更新に成功しました",
        status: "success",
        timestamp: Date.now()
      });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました";
      setToast({
        message: errorMessage,
        status: "error",
        timestamp: Date.now()
      });
    }
  };

  return patchAuthOperation;
};
