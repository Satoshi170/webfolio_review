import { useRouter } from "next/navigation";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import type { NextPage } from "next";

const WithRedirectIfLoggedOut = (Component: NextPage) => {
  const RedirectIfLoggedOut = () => {
    const router = useRouter();
    const { isLogin } = useGetLoginState();

    if (!isLogin) {
      router.replace("/auth/sign_in");
      return null;
    }
    return <Component />;
  };

  return RedirectIfLoggedOut;
};

export default WithRedirectIfLoggedOut;
