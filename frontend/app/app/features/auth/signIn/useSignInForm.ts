import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { signInValidationErrorMessages } from "./messages";
import { signInSchema } from "./signInSchema";

import type { PostAuthSignInCredentials } from "@/app/types/axios/auth/postAuthSignIn";

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<PostAuthSignInCredentials>({
    resolver: zodResolver(signInSchema),
    mode: "onChange"
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = useCallback(
    async (params: PostAuthSignInCredentials) => {
      setIsLoading(true);
      try {
        await postAuthSignIn(params);
        await checkLoginStatus();
        router.replace("/");
        setSuccessToast("ログインに成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        if (errorMessage.includes("Invalid login credentials. Please try again.")) {
          setError("password", {
            type: "manual",
            message: signInValidationErrorMessages.invalidParams
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
