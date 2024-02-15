import { useEffect } from "react";

import { useRecoilState } from "recoil";

import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { loadingState } from "@/app/stores/atoms/loadingState";

import FullPageLoadingSpinner from "../atoms/FullPageLoadingSpinner";

interface Props {
  children: React.ReactNode;
}

const CheckLoginWrapper: React.FC<Props> = ({ children }) => {
  const checkLoginStatus = useCheckLogin();
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    setIsLoading(true);
    void checkLoginStatus().finally(() => setIsLoading(false));
  }, [checkLoginStatus, setIsLoading]);

  return isLoading ? <FullPageLoadingSpinner /> : <>{children}</>;
};

export default CheckLoginWrapper;
