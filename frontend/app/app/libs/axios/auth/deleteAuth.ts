import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import {
  DeleteAuthErrorData,
  DeleteAuthSuccessData
} from "@/app/types/axios/auth/deleteAuth";

import { removeAuthInfo } from "../../cookie/removeAuthInfo";
import { UnauthorizedResponseDataSchema } from "../../zod/apiErrorResponses/auth/responseDataSchema";

const generateErrorMessage = (responseData: DeleteAuthErrorData) => {
  if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
    return responseData.errors.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const deleteAuth = async (): Promise<void> => {
  try {
    await api.delete<DeleteAuthSuccessData>("/auth", addAuthInfoToRequest({}));
    removeAuthInfo();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as DeleteAuthErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
