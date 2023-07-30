import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";

import { loginState } from "../stores/atoms/loginState";

export const useCheckLogin = () => {
  const setLogin = useSetRecoilState(loginState);

  const checkLoginStatus = useCallback(async () => {
    try {
      const responseData = await getAuthSessions();
      if (responseData.isLogin) {
        setLogin({ isLogin: true, data: responseData.data });
      } else {
        setLogin({ isLogin: false, data: null });
      }
    } catch (error) {
      setLogin({ isLogin: false, data: null });
    }
  }, [setLogin]);

  return checkLoginStatus;
};
