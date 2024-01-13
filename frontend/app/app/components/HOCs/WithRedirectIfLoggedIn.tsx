import { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

const WithRedirectIfLoggedIn: (Component: NextPage<any>) => React.FC<any> = (
  Component
) => {
  const RedirectIfLoggedIn: React.FC<any> = (props) => {
    const router = useRouter();
    const { isLogin } = useGetLoginState();

    if (isLogin) {
      router.replace("/");
      return null;
    }
    return <Component {...props} />;
  };

  return RedirectIfLoggedIn;
};

export default WithRedirectIfLoggedIn;
