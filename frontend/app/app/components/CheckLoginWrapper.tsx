import { useEffect } from "react";
import { useRecoilState } from "recoil";

import LoadingSpinner from "./containers/LoadingSpinner";
import { useCheckLogin } from "../hooks/useCheckLogin";
import { loadingState } from "../stores/atoms/loadingState";

const CheckLoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const checkLoginStatus = useCheckLogin();
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    setIsLoading(true);
    checkLoginStatus().finally(() => setIsLoading(false));
  }, [checkLoginStatus, setIsLoading]);

  return isLoading ? <LoadingSpinner /> : <>{children}</>;
};

export default CheckLoginWrapper;
