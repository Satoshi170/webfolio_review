import { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

const WithRedirectIfLoggedOut: (Component: NextPage<any>) => React.FC<any> = (
  Component
) => {
  const RedirectIfLoggedOut: React.FC<any> = (props) => {
    const router = useRouter();
    const { isLogin } = useGetLoginState();

    if (!isLogin) {
      router.replace("/auth/sign_in");
      return null;
    }
    return <Component {...props} />;
  };

  return RedirectIfLoggedOut;
};

export default WithRedirectIfLoggedOut;
