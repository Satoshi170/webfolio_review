import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

const WithRedirectIfLoggedIn: (Component: NextPage<any>) => React.FC<any> = (
  Component
) => {
  const RedirectIfLoggedIn: React.FC<any> = (props) => {
    const router = useRouter();
    const { isLogin } = useRecoilValue(loginState);

    if (isLogin) {
      router.push("/");
      return null;
    }
    return <Component {...props} />;
  };

  return RedirectIfLoggedIn;
};

export default WithRedirectIfLoggedIn;
