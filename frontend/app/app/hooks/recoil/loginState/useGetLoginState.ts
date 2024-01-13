import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

export const useGetLoginState = () => {
  const state = useRecoilValue(loginState);

  return state;
};
