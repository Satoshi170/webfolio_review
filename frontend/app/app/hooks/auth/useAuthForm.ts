import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";
type AuthFunction<T> = (data: T) => Promise<void>;

export const useAuthForm = <T>(authFunction: AuthFunction<T>, onSuccessRoute: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();

  const onSubmit = async (data: T) => {
    setIsLoading(true);
    try {
      await authFunction(data);
      router.push(onSuccessRoute);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "予期せぬエラーが発生しました";
      setToast((prevToast) => ({
        ...prevToast,
        message: errorMessage,
        status: "error"
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
