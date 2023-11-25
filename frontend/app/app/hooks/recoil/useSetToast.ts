import { useSetRecoilState } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

export const useSetToast = () => {
  const setToast = useSetRecoilState(toastState);

  const setSuccessToast = (message: string) => {
    setToast({ message: message, status: "success", timestamp: Date.now() });
  };

  const setErrorToast = (message: string) => {
    setToast({ message: message, status: "error", timestamp: Date.now() });
  };
  return { setSuccessToast, setErrorToast };
};
