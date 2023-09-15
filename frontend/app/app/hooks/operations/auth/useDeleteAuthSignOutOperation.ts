import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { DeleteAuthSignOut } from "@/app/libs/axios/auth/deleteAuthSignOut";
import { loginState } from "@/app/stores/atoms/loginState";
import { toastState } from "@/app/stores/atoms/toastState";

export const useDeleteAuthSignOutOperation = () => {
  const router = useRouter();
  const setLogin = useSetRecoilState(loginState);
  const setToast = useSetRecoilState(toastState);

  const deleteAuthSignOutOperation = async () => {
    try {
      await DeleteAuthSignOut();
      setLogin({ isLogin: false, data: null });
      router.replace("/auth/sign_in");
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

  return deleteAuthSignOutOperation;
};
