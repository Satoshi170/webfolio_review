import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { deleteAuth } from "@/app/libs/axios/auth/deleteAuth";
import { toastState } from "@/app/stores/atoms/toastState";

import { useCheckLogin } from "../../useCheckLogin";

export const useDeleteAuthOperation = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const setToast = useSetRecoilState(toastState);

  const deleteAuthOperation = async () => {
    try {
      await deleteAuth();
      await checkLoginStatus();
      router.replace("/");
      setToast({
        message: "アカウントの削除に成功しました",
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

  return deleteAuthOperation;
};