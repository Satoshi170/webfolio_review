import { useRecoilValue } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

export const useGetToastState = () => {
  const { status, message, timestamp } = useRecoilValue(toastState);

  return { status, message, timestamp };
};
