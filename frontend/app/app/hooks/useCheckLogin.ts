import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";

import { loginState } from "../stores/atoms/loginState";

export const useCheckLogin = () => {
  const setLogin = useSetRecoilState(loginState);
  const defaultUserImage = "/defaultUserImage.png";

  const checkLoginStatus = useCallback(async () => {
    try {
      const responseData = await getAuthSessions();
      if (responseData.isLogin) {
        const { name, image } = responseData.data;
        setLogin({ isLogin: true, data: { name, image: image || defaultUserImage } });
      } else {
        setLogin({ isLogin: false, data: null });
      }
    } catch (error) {
      setLogin({ isLogin: false, data: null });
    }
  }, [setLogin]);

  return checkLoginStatus;
};
