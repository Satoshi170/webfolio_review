import axios from "axios";

import { PostAuthCredentials, PostAuthErrorData } from "@/app/types/axios/auth/postAuth";
import { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const postAuth = async (credentials: PostAuthCredentials): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponseData = error.response.data as PostAuthErrorData;
      const errorMessage = errorResponseData.errors.fullMessages.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
