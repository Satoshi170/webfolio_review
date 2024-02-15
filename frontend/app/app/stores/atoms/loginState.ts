import { atom } from "recoil";

import type { UserData } from "@/app/types/auth";

export interface LoggedInState {
  isLogin: true;
  userData: UserData;
}
export interface LoggedOutState {
  isLogin: false;
  userData: null;
}

export type LoginState = LoggedInState | LoggedOutState;

export const loginState = atom<LoginState>({
  key: "loginState",
  default: { isLogin: false, userData: null }
});
