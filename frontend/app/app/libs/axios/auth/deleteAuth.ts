import axios from "axios";

import api from "@/app/libs/axios/api";
import { addAuthInfoToRequest } from "@/app/libs/cookie/loadAuthInfo";
import { DeleteAuthSuccessData } from "@/app/types/axios/auth/deleteAuth";

import { removeAuthInfo } from "../../cookie/removeAuthInfo";

export const deleteAuth = async (): Promise<void> => {
  try {
    await api.delete<DeleteAuthSuccessData>("/auth", addAuthInfoToRequest({}));
    removeAuthInfo();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
