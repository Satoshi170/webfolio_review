import { useCallback } from "react";

import { useSetLoginState } from "@/app/hooks/recoil/loginState/useSetLoginState";
import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";

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
