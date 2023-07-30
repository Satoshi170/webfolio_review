import axios from "axios";

import api from "@/app/libs/axios/api";
import { addAuthInfoToRequest } from "@/app/libs/cookie/loadAuthInfo";
import { DeleteAuthSignOutData } from "@/app/types/axios/auth/deleteAuthSignOut";

import { removeAuthInfo } from "../../cookie/removeAuthInfo";

export const DeleteAuthSignOut = async (): Promise<DeleteAuthSignOutData> => {
  try {
    const response = await api.delete<DeleteAuthSignOutData>(
      "/auth/sign_out",
      addAuthInfoToRequest({})
    );
    removeAuthInfo();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
