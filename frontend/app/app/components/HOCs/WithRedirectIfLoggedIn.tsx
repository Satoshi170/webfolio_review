import { useRouter } from "next/navigation";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import type { NextPage } from "next";

const WithRedirectIfLoggedIn = (Component: NextPage) => {
  const RedirectIfLoggedIn = () => {
    const router = useRouter();
    const { isLogin } = useGetLoginState();

    if (isLogin) {
      router.replace("/");
      return null;
    }
    return <Component />;
  };

  return RedirectIfLoggedIn;
};

export default WithRedirectIfLoggedIn;
