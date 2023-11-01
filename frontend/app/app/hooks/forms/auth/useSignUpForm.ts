import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { postAuth } from "@/app/libs/axios/auth/postAuth";
import { refinedSignUpSchema } from "@/app/libs/zod/formValidations/auth/signUpSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import { PostAuthCredentials } from "@/app/types/axios/auth/postAuth";

import { useCheckLogin } from "../../useCheckLogin";

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
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();
  const checkLoginStatus = useCheckLogin();

  const onSubmit = async (params: PostAuthCredentials) => {
    setIsLoading(true);
    try {
      await postAuth(params);
      await checkLoginStatus();
      router.replace("/");
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

  return { register, handleSubmit, errors, isValid, onSubmit, isLoading };
};
