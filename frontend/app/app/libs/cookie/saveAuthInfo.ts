import Cookies from "js-cookie";

import type { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

export const saveAuthInfoFromHeader = (response: CustomAxiosResponse) => {
  const token = response.headers["access-token"];
  const client = response.headers["client"];
  const uid = response.headers["uid"];

  Cookies.set("access-token", token, { secure: true, sameSite: "lax" });
  Cookies.set("client", client, { secure: true, sameSite: "lax" });
  Cookies.set("uid", uid, { secure: true, sameSite: "lax" });
};
