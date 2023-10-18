import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";
import { signInSchema } from "@/app/libs/zod/formValidations/auth/signInSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import { PostAuthSignInCredentials } from "@/app/types/axios/auth/postAuthSignIn";

import { useCheckLogin } from "../../useCheckLogin";

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
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = async (params: PostAuthSignInCredentials) => {
    setIsLoading(true);
    try {
      await postAuthSignIn(params);
      await checkLoginStatus();
      router.replace("/");
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

  return { register, handleSubmit, errors, isValid, onSubmit, isLoading };
};
