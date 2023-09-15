import axios from "axios";

import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import {
  DeleteAuthSignOutData,
  DeleteAuthSignOutErrorData
} from "@/app/types/axios/auth/deleteAuthSignOut";

import { removeAuthInfo } from "../../cookie/removeAuthInfo";

export const DeleteAuthSignOut = async (): Promise<void> => {
  try {
    await api.delete<DeleteAuthSignOutData>("/auth/sign_out", addAuthInfoToRequest({}));
    removeAuthInfo();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponseData = error.response.data as DeleteAuthSignOutErrorData;
      const errorMessage = errorResponseData.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
