import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

export const useSetToastState = () => {
  const setToast = useSetRecoilState(toastState);

  const setSuccessToast = useCallback(
    (message: string) => {
      setToast({ message, status: "success", timestamp: Date.now() });
    },
    [setToast]
  );

  const setErrorToast = useCallback(
    (message: string) => {
      setToast({ message, status: "error", timestamp: Date.now() });
    },
    [setToast]
  );

  return { setSuccessToast, setErrorToast };
};
