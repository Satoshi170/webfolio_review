import { useRecoilValue } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

export const useGetToastState = () => {
  const state = useRecoilValue(toastState);

  return state;
};
