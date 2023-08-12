import axios from "axios";

import api from "@/app/libs/axios/api";
import { addAuthInfoToRequest } from "@/app/libs/cookie/loadAuthInfo";
import {
  DeleteAuthErrorData,
  DeleteAuthSuccessData
} from "@/app/types/axios/auth/deleteAuth";

import { removeAuthInfo } from "../../cookie/removeAuthInfo";

export const deleteAuth = async (): Promise<void> => {
  try {
    await api.delete<DeleteAuthSuccessData>("/auth", addAuthInfoToRequest({}));
    removeAuthInfo();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponseData = error.response.data as DeleteAuthErrorData;
      const errorMessage = errorResponseData.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
