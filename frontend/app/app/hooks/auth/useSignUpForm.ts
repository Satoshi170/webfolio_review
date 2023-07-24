import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";
import { SignUpCredentials } from "@/app/types/auth";

import { useCheckLogin } from "../useCheckLogin";

type SignUpFunction = (data: SignUpCredentials) => Promise<void>;

export const useSignUpForm = (
  signUpFunction: SignUpFunction,
  onSuccessRoute: string,
  setError: UseFormSetError<SignUpCredentials>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = async (data: SignUpCredentials) => {
    setIsLoading(true);
    try {
      await signUpFunction(data);
      await checkLoginStatus();
      router.push(onSuccessRoute);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました";
      if (errorMessage === "Email has already been taken") {
        setError("email", {
          type: "manual",
          message: "このメールアドレスはすでに使用されています"
        });
      } else {
        setToast((prevToast) => ({
          ...prevToast,
          message: errorMessage,
          status: "error",
          timestamp: Date.now()
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
