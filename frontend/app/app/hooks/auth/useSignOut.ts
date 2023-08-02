import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { DeleteAuthSignOut } from "@/app/libs/axios/auth/deleteAuthSignOut";
import { toastState } from "@/app/stores/atoms/toastState";

import { useCheckLogin } from "../useCheckLogin";

export const useSignOut = () => {
  const router = useRouter();
  const setToast = useSetRecoilState(toastState);
  const checkLoginStatus = useCheckLogin();

  const logout = async () => {
    try {
      await DeleteAuthSignOut();
      await checkLoginStatus();
      router.push("/");
      setToast({
        message: "ログアウトに成功しました",
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

  return logout;
};
