import Cookies from "js-cookie";

export const removeAuthInfo = () => {
  Cookies.remove("access-token", { secure: true, sameSite: "lax" });
  Cookies.remove("client", { secure: true, sameSite: "lax" });
  Cookies.remove("uid", { secure: true, sameSite: "lax" });
};
