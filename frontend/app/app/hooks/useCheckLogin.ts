import { useSetRecoilState } from "recoil";

import { sessions } from "@/app/libs/axios/auth/sessions";

import { loginState } from "../stores/atoms/loginState";

export const useCheckLogin = () => {
  const setLogin = useSetRecoilState(loginState);

  const checkLoginStatus = async () => {
    try {
      const response = await sessions();
      if (response.isLogin) {
        setLogin({ isLogin: true, data: response.data });
      } else {
        setLogin({ isLogin: false, data: null });
      }
    } catch (error) {
      setLogin({ isLogin: false, data: null });
    }
  };

  return checkLoginStatus;
};
