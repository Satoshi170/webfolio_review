import { useSetRecoilState } from "recoil";

import { getSessions } from "@/app/libs/axios/auth/getSessions";

import { loginState } from "../stores/atoms/loginState";

export const useCheckLogin = () => {
  const setLogin = useSetRecoilState(loginState);

  const checkLoginStatus = async () => {
    try {
      const response = await getSessions();
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
