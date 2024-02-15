import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";


import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import { PostAuthSignInFailedDataSchema } from "../../zod/apiErrorResponses/auth/postAuthSignInDataSchema";
import api from "../api";

import type { PostAuthSignInErrorData } from "@/app/types/axios/auth/postAuthSignIn";
import type { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

const generateErrorMessage = (responseData: PostAuthSignInErrorData) => {
  if (PostAuthSignInFailedDataSchema.safeParse(responseData).success) {
    return responseData.errors.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const postAuthGuestSignIn = async (): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth/guest/sign_in");
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PostAuthSignInErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
