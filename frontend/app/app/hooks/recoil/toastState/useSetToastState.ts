import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
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

  const setUnexpectedErrorToast = useCallback(() => {
    setErrorToast(UNEXPECTED_ERROR_MESSAGE);
  }, [setErrorToast]);

  return { setSuccessToast, setErrorToast, setUnexpectedErrorToast };
};
