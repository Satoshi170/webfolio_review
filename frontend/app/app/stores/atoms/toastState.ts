import { atom } from "recoil";

export interface ToastState {
  message: string;
  status: "success" | "error";
  timestamp: number | null;
}

export const toastState = atom<ToastState>({
  key: "toastState",
  default: {
    message: "",
    status: "success",
    timestamp: null
  }
});
