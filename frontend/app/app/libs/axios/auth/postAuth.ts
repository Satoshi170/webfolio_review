import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import { PostAuthFailedDataSchema } from "../../zod/apiErrorResponses/auth/postAuthDataSchema";
import api from "../api";

import type {
  PostAuthCredentials,
  PostAuthErrorData
} from "@/app/types/axios/auth/postAuth";
import type { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

const generateErrorMessage = (responseData: PostAuthErrorData) => {
  if (PostAuthFailedDataSchema.safeParse(responseData).success) {
    return responseData.errors.fullMessages.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const postAuth = async (credentials: PostAuthCredentials): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PostAuthErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
