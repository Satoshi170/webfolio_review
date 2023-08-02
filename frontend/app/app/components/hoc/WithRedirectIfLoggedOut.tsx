import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

const WithRedirectIfLoggedOut: (Component: NextPage<any>) => React.FC<any> = (
  Component
) => {
  const RedirectIfLoggedOut: React.FC<any> = (props) => {
    const router = useRouter();
    const { isLogin } = useRecoilValue(loginState);

    if (!isLogin) {
      router.push("/");
      return null;
    }
    return <Component {...props} />;
  };

  return RedirectIfLoggedOut;
};

export default WithRedirectIfLoggedOut;
