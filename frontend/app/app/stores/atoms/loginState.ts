import { atom } from "recoil";

import { UserData } from "@/app/types/auth";

export interface Login {
  isLogin: boolean;
  data: UserData | null;
}

export const loginState = atom<Login>({
  key: "loginState",
  default: { isLogin: false, data: null }
});
