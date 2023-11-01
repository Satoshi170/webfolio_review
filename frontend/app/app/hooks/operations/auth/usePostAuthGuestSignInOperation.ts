import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { postAuthGuestSignIn } from "@/app/libs/axios/auth/postAuthGuestSignIn";
import { toastState } from "@/app/stores/atoms/toastState";

import { useCheckLogin } from "../../useCheckLogin";

export const usePostAuthGuestSignInOperation = () => {
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();
  const setToast = useSetRecoilState(toastState);

  const postAuthGuestSignInOperation = async () => {
    try {
      await postAuthGuestSignIn();
      await checkLoginStatus();
      router.replace("/");
      setToast({
        message: "ゲストログインに成功しました",
        status: "success",
        timestamp: Date.now()
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
      setToast({
        message: errorMessage,
        status: "error",
        timestamp: Date.now()
      });
    }
  };

  return postAuthGuestSignInOperation;
};
