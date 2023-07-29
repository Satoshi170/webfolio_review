import { useSetRecoilState } from "recoil";

import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";

import { loginState } from "../stores/atoms/loginState";

export const useCheckLogin = () => {
  const setLogin = useSetRecoilState(loginState);

  const checkLoginStatus = async () => {
    try {
      const response = await getAuthSessions();
      if (response.data.isLogin) {
        setLogin({ isLogin: true, data: response.data.data });
      } else {
        setLogin({ isLogin: false, data: null });
      }
    } catch (error) {
      setLogin({ isLogin: false, data: null });
    }
  };

  return checkLoginStatus;
};
