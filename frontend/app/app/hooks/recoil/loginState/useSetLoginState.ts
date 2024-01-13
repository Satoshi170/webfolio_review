import { useSetRecoilState } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

export const useSetLoginState = () => {
  const setLoginState = useSetRecoilState(loginState);

  return { setLoginState };
};
