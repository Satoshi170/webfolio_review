import { RecoilState, SetterOrUpdater } from "recoil";

import { LoginState, loginState } from "@/app/stores/atoms/loginState";
import { ToastState, toastState } from "@/app/stores/atoms/toastState";

export const mockSetToast = jest.fn() as SetterOrUpdater<ToastState>;
export const mockSetLogin = jest.fn() as SetterOrUpdater<LoginState>;

export const mockUseSetRecoilState = (atom: RecoilState<unknown>) => {
  switch (atom.key) {
    case loginState.key:
      return mockSetLogin;
    case toastState.key:
      return mockSetToast;
  }
  return jest.fn();
};
