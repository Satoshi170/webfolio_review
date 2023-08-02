import { atom } from "recoil";

import { UserData } from "@/app/types/auth";

export interface LoggedInState {
  isLogin: true;
  data: UserData;
}
export interface LoggedOutState {
  isLogin: false;
  data: null;
}

export type LoginState = LoggedInState | LoggedOutState;

export const loginState = atom<LoginState>({
  key: "loginState",
  default: { isLogin: false, data: null }
});
