import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

export const useGetLoginState = () => {
  const { userData, isLogin } = useRecoilValue(loginState);

  return { userData, isLogin };
};
