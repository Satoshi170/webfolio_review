import { useCallback } from "react";

import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";

import { useSetLoginState } from "./recoil/loginState/useSetLoginState";

export const useCheckLogin = () => {
  const { setLoginState } = useSetLoginState();
  const defaultUserImage = "/defaultUserImage.png";

  const checkLoginStatus = useCallback(async () => {
    try {
      const responseData = await getAuthSessions();
      if (responseData.isLogin) {
        const { image } = responseData.data;
        setLoginState({
          isLogin: true,
          userData: { ...responseData.data, image: image || defaultUserImage }
        });
      } else {
        setLoginState({ isLogin: false, userData: null });
      }
    } catch (error) {
      setLoginState({ isLogin: false, userData: null });
    }
  }, [setLoginState]);
  return checkLoginStatus;
};
