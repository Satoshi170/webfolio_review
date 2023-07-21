import { atom } from "recoil";

interface Toast {
  message: string;
  status: "success" | "error";
}

export const toastState = atom<Toast>({
  key: "toastState",
  default: {
    message: "",
    status: "success"
  }
});
