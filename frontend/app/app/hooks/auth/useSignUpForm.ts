import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";
import { PostAuthCredentials } from "@/app/types/axios/auth/postAuth";

import { useCheckLogin } from "../useCheckLogin";

type SignUpFunction = (data: PostAuthCredentials) => Promise<void>;

export const useSignUpForm = (
  signUpFunction: SignUpFunction,
  onSuccessRoute: string,
  setError: UseFormSetError<PostAuthCredentials>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = async (data: PostAuthCredentials) => {
    setIsLoading(true);
    try {
      await signUpFunction(data);
      await checkLoginStatus();
      router.replace(onSuccessRoute);
      setToast({
        message: "アカウント作成に成功しました",
        status: "success",
        timestamp: Date.now()
      });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました";
      if (errorMessage === "Email has already been taken") {
        setError("email", {
          type: "manual",
          message: "このメールアドレスはすでに使用されています"
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
