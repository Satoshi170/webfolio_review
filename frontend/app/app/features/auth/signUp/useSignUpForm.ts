import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { postAuth } from "@/app/libs/axios/auth/postAuth";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { signUpValidationErrorMessages } from "./messages";
import { refinedSignUpSchema } from "./signUpSchema";

import type { PostAuthCredentials } from "@/app/types/axios/auth/postAuth";

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<PostAuthCredentials>({
    resolver: zodResolver(refinedSignUpSchema),
    mode: "onChange"
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = useCallback(
    async (params: PostAuthCredentials) => {
      setIsLoading(true);
      try {
        await postAuth(params);
        await checkLoginStatus();
        router.replace("/");
        setSuccessToast("アカウント作成に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        if (errorMessage === "Email has already been taken") {
          setError("email", {
            type: "manual",
            message: signUpValidationErrorMessages.usedEmail
          });
        } else {
          setErrorToast(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [checkLoginStatus, router, setError, setErrorToast, setSuccessToast]
  );

  return { register, handleSubmit, errors, isValid, onSubmit, isLoading };
};
