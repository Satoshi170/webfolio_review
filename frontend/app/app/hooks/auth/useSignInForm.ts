import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";
import { SignInCredentials } from "@/app/types/auth";

import { useCheckLogin } from "../useCheckLogin";

type SignInFunction = (data: SignInCredentials) => Promise<void>;

export const useSignInForm = (
  signUpFunction: SignInFunction,
  onSuccessRoute: string,
  setError: UseFormSetError<SignInCredentials>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = async (data: SignInCredentials) => {
    setIsLoading(true);
    try {
      await signUpFunction(data);
      await checkLoginStatus();
      router.push(onSuccessRoute);
      setToast({
        message: "ログインに成功しました",
        status: "success",
        timestamp: Date.now()
      });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました";
      if (errorMessage.includes("Invalid login credentials. Please try again.")) {
        setError("password", {
          type: "manual",
          message: "メールアドレスまたはパスワードが違います"
        });
      } else {
        setToast({
          message: errorMessage,
          status: "error",
          timestamp: Date.now()
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
