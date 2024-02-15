import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";


import { removeAuthInfo } from "../../cookie/removeAuthInfo";
import { DeleteAuthSignOutFailedDataSchema } from "../../zod/apiErrorResponses/auth/deleteAuthSignOutDataSchema";

import type {
  DeleteAuthSignOutData,
  DeleteAuthSignOutErrorData
} from "@/app/types/axios/auth/deleteAuthSignOut";

const generateErrorMessage = (responseData: DeleteAuthSignOutErrorData) => {
  if (DeleteAuthSignOutFailedDataSchema.safeParse(responseData).success) {
    return responseData.errors.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const deleteAuthSignOut = async (): Promise<void> => {
  try {
    await api.delete<DeleteAuthSignOutData>("/auth/sign_out", addAuthInfoToRequest({}));
    removeAuthInfo();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as DeleteAuthSignOutErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
